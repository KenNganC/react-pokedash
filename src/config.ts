import { Zap, Shield, Activity, ArrowRight } from "lucide-react";

const TYPE_COLORS: Record<string, string> = {
  normal: "bg-gray-400",
  fire: "bg-red-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400 text-black",
  grass: "bg-green-500",
  ice: "bg-cyan-300 text-black",
  fighting: "bg-orange-700",
  poison: "bg-purple-500",
  ground: "bg-yellow-600",
  flying: "bg-indigo-400",
  psychic: "bg-pink-500",
  bug: "bg-lime-500",
  rock: "bg-yellow-800",
  ghost: "bg-purple-800",
  dragon: "bg-indigo-700",
  steel: "bg-gray-500",
  fairy: "bg-pink-300 text-black",
};

const STAT_ICONS = {
  hp: Activity,
  attack: Zap,
  defense: Shield,
  "special-attack": Zap,
  "special-defense": Shield,
  speed: ArrowRight,
} as const;

export { TYPE_COLORS, STAT_ICONS };
