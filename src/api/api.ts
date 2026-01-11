const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
const PAGE_LIMIT = 20;

interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
}
export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface APIResource {
  url: string;
}

// Pokemon Ability entry
export interface PokemonAbility {
  is_hidden: boolean;
  slot: number;
  ability: NamedAPIResource;
}

export interface PokemonTypeEntry {
  slot: number;
  type: NamedAPIResource;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
}

export interface PokemonSprites {
  back_default: string | null;
  back_shiny: string | null;
  front_default: string | null;
  front_shiny: string | null;
  other?: {
    dream_world: { front_default: string | null; front_female: string | null };
    home: {
      front_default: string | null;
      front_female: string | null;
      front_shiny: string | null;
    };
    "official-artwork": {
      front_default: string | null;
      front_shiny: string | null;
    };
  };
  versions?: Record<string, any>;
}

export interface PokemonDetail {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  is_default: boolean;
  order: number;
  abilities: PokemonAbility[];
  forms: NamedAPIResource[];
  game_indices: Array<{
    game_index: number;
    version: NamedAPIResource;
  }>;
  held_items: any[];
  location_area_encounters: string;
  moves: Array<{
    move: NamedAPIResource;
    version_group_details: Array<{
      level_learned_at: number;
      move_learn_method: NamedAPIResource;
      version_group: NamedAPIResource;
      order: number | null;
    }>;
  }>;
  past_types: Array<{
    generation: NamedAPIResource;
    types: PokemonTypeEntry[];
  }>;
  species: NamedAPIResource;
  sprites: PokemonSprites;
  cries: {
    latest: string | null;
    legacy: string | null;
  };
  stats: PokemonStat[];
  types: PokemonTypeEntry[];
}

const fetchPokemonPage = async ({ pageParam = 0 }) => {
  // for loading indicator demo
  await new Promise((resolve) => setTimeout(resolve, 1000));
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
