import { Activity, Ruler, Weight, X } from "lucide-react";
import { type PokemonDetail } from "../../api/api";
import { STAT_ICONS, TYPE_COLORS } from "../../config";

const Drawer = ({
  pokemon,
  onClose,
  isOpen,
}: {
  pokemon: PokemonDetail | null;
  onClose: any;
  isOpen: boolean;
}) => {
  if (!pokemon) return null;

  return (
    <>
      {/* Backdrop for mobile */}
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full md:w-[450px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out border-l border-slate-100 overflow-hidden flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-white z-10">
          <div>
            <span className="text-sm font-bold text-slate-400">
              #{String(pokemon.id).padStart(3, "0")}
            </span>
            <h2 className="text-2xl font-black capitalize text-slate-800">
              {pokemon.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-slate-500" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
          {/* Hero Image */}
          <div className="flex justify-center mb-8 relative">
            <div className="w-64 h-64 relative z-10">
              <img
                src={
                  pokemon.sprites.other?.["official-artwork"]?.front_default ||
                  pokemon.sprites.front_default ||
                  ""
                }
                alt={pokemon.name}
                className="w-full h-full object-contain drop-shadow-xl animate-bounce-slow"
              />
            </div>
            {/* Background Circle */}
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full opacity-20 ${
                TYPE_COLORS[pokemon.types[0].type.name]
              }`}
            ></div>
          </div>

          {/* Types */}
          <div className="flex justify-center gap-2 mb-8">
            {pokemon.types.map((t) => (
              <span
                key={t.type.name}
                className={`text-sm uppercase font-bold px-4 py-1.5 rounded-full text-white shadow-sm ${
                  TYPE_COLORS[t.type.name] || "bg-gray-400"
                }`}
              >
                {t.type.name}
              </span>
            ))}
          </div>

          {/* Measurements */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-center flex-col">
              <div className="flex items-center gap-2 text-slate-400 mb-1">
                <Weight className="w-4 h-4" />
                <span className="text-xs font-bold uppercase">Weight</span>
              </div>
              <span className="text-xl font-bold text-slate-800">
                {pokemon.weight / 10} kg
              </span>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-center flex-col">
              <div className="flex items-center gap-2 text-slate-400 mb-1">
                <Ruler className="w-4 h-4" />
                <span className="text-xs font-bold uppercase">Height</span>
              </div>
              <span className="text-xl font-bold text-slate-800">
                {pokemon.height / 10} m
              </span>
            </div>
          </div>

          {/* Base Stats */}
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
            Base Stats
          </h3>
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 space-y-4">
            {pokemon.stats.map((stat) => {
              const Icon = STAT_ICONS[stat.stat.name] || Activity;
              const colorClass =
                stat.base_stat > 99
                  ? "bg-green-500"
                  : stat.base_stat > 50
                  ? "bg-yellow-500"
                  : "bg-red-500";

              return (
                <div key={stat.stat.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-medium text-slate-600 capitalize">
                        {stat.stat.name.replace("-", " ")}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-slate-800">
                      {stat.base_stat}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${colorClass} rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${Math.min(stat.base_stat, 100)}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Abilities */}
          <div className="mt-8">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
              Abilities
            </h3>
            <div className="flex flex-wrap gap-2">
              {pokemon.abilities.map((ability) => (
                <span
                  key={ability.ability.name}
                  className="px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-lg text-sm font-medium capitalize"
                >
                  {ability.ability.name.replace("-", " ")}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Drawer;
