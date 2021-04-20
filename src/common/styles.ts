import type { MappedSet } from "./helpers";
import type { Gradient } from "./types";

export const globalGradientMap: MappedSet<Gradient> = {
  "green-blue": "from-green-400 to-blue-500",
  "purple-pink-red": "from-purple-400 via-pink-500 to-red-500",
  "blue-red": "from-blue-500 to-red-300",
};
