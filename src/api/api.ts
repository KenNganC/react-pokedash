const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
const PAGE_LIMIT = 20;

interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
}

interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string | null;
  };
  types: Array<{
    slot: number;
    type: { name: string; url: string };
  }>;
}

const fetchPokemonPage = async ({ pageParam = 0 }) => {
  const response = await fetch(
    `${BASE_URL}?limit=${PAGE_LIMIT}&offset=${pageParam}`
  );
  if (!response.ok) throw new Error("Failed to fetch list");
  const data: PokemonListResponse = await response.json();

  const detailPromises = data.results.map(async (p) => {
    const res = await fetch(p.url);
    if (!res.ok) throw new Error(`Failed to fetch details for ${p.name}`);
    return res.json();
  });

  const detailedPokemon: PokemonDetail[] = await Promise.all(detailPromises);

  return {
    results: detailedPokemon,
    nextOffset: data.next ? pageParam + PAGE_LIMIT : null,
  };
};

export { fetchPokemonPage };
