import type { Size, Status } from "../common/types";

export type ButtonSize = Extract<Size, "xs" | "sm" | "md" | "lg" | "xl">;
export type ButtonStatus = Extract<
  Status,
  "warn" | "danger" | "success" | "info" | "basic" | "primary" | "transparent"
>;
