import { type PokemonDetail } from "../../api/api";
import { TYPE_COLORS } from "../../config";

const PokemonCard = ({
  pokemon,
  onClick,
}: {
  pokemon: PokemonDetail;
  onClick: (pokemon: PokemonDetail) => void;
}) => {
  return (
    <button
      onClick={() => onClick(pokemon)}
      className="group relative flex items-center bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md hover:border-red-200 transition-all text-left w-full overflow-hidden cursor-pointer hover:bg-slate-50"
    >
      <div className="relative z-10 w-20 h-20 shrink-0 bg-slate-100 rounded-lg flex items-center justify-center mr-4 group-hover:scale-105 transition-transform">
        <img
          src={pokemon.sprites.front_default || ""}
          alt={pokemon.name}
          className="w-full h-full object-contain pixelated"
          loading="lazy"
        />
      </div>

      <div className="relative z-10 flex-1 min-w-0">
        <span className="text-xs font-bold text-slate-400">
          #{String(pokemon.id).padStart(3, "0")}
        </span>
        <h3 className="text-lg font-bold text-slate-800 truncate capitalize mb-1 group-hover:text-red-600 transition-colors">
          {pokemon.name}
        </h3>

        <div className="flex flex-wrap gap-1">
          {pokemon.types.map((t) => (
            <span
              key={t.type.name}
              className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full text-white shadow-sm ${
                TYPE_COLORS[t.type.name] || "bg-gray-400"
              }`}
            >
              {t.type.name}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
};
export default PokemonCard;
