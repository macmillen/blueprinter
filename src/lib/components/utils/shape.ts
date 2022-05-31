import type { Shape, ShapeData } from "../types";
import { uuid } from "./math";

export const findShapeById = (shapes: Shape[], id: string | undefined) =>
  shapes.find((shape) => shape.id === id);

export const createShape = (data: ShapeData): Shape => ({
  ...data,
  id: uuid(),
});
