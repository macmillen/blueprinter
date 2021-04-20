export type Shape = {
  id: number;
} & ShapeData;

export type ShapeData = {
  name: string;
} & Rect;

export type Vector2D = {
  x: number;
  y: number;
};

export type Rect = {
  w: number;
  h: number;
} & Vector2D;

export type Unit = "cm" | "m";
