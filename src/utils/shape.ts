import type { Shape, ShapeData } from "src/types";

export let id = 0;

export const findShapeById = (shapes: Shape[], id: number | undefined) =>
  shapes.find((shape) => shape.id === id);

export const createShape = (data: ShapeData): Shape => ({ ...data, id: id++ });
