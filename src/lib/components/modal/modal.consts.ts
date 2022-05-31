import type { MappedSet } from "../common/helpers";
import type { Size } from "../common/types";

export type ModalSize = Extract<Size, "sm" | "md" | "lg">;
export const sizeMap: MappedSet<ModalSize> = {
  sm: "max-w-lg",
  md: "max-w-3xl",
  lg: "max-w-5xl",
};
