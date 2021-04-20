import type { MappedSet } from "src/common/helpers";
import type { Size } from "src/common/types";

export type ModalSize = Extract<Size, "sm" | "md" | "lg">;
export const sizeMap: MappedSet<ModalSize> = {
  sm: "max-w-lg",
  md: "max-w-3xl",
  lg: "max-w-5xl",
};
