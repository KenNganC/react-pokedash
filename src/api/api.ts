const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
const PAGE_LIMIT = 20;

const fetchPokemonPage = async ({ pageParam = 0 }) => {
  const response = await fetch(
    `${BASE_URL}?limit=${PAGE_LIMIT}&offset=${pageParam}`
  );
  if (!response.ok) throw new Error("Failed to fetch list");
  const data = await response.json();

  const detailPromises = data.results.map(async (p) => {
    const res = await fetch(p.url);
    if (!res.ok) throw new Error(`Failed to fetch details for ${p.name}`);
    return res.json();
  });

  const detailedPokemon = await Promise.all(detailPromises);

  // Return data + cursor for next page
  return {
    results: detailedPokemon,
    nextOffset: data.next ? pageParam + PAGE_LIMIT : null,
  };
};

export { fetchPokemonPage };
