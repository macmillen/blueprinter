import { RATIO } from "../consts";
import type { Rect, Shape, ShapeData } from "src/types";
import { mapUnit } from "./math";

export let id = 0;

export const findShapeById = (shapes: Shape[], id: number | undefined) =>
  shapes.find((shape) => shape.id === id);

export const createShape = (data: ShapeData): Shape => ({ ...data, id: id++ });

export const getConvertedShapeSize = (
  rect: Rect,
  ratio: number
): Pick<Shape, "unitSizes"> & Rect => {
  return { ...mapUnit(rect, ratio), unitSizes: rect };
};
