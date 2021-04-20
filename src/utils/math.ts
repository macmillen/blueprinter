import type { Rect, Vector2D } from "src/types";

export const diffPositions = (pos1: Vector2D, pos2: Vector2D): Vector2D => {
  return {
    x: Math.abs(pos1.x - pos2.x),
    y: Math.abs(pos1.y - pos2.y),
  };
};

export const addPositions = (pos1: Vector2D, pos2: Vector2D): Vector2D => {
  return {
    x: pos1.x + pos2.x,
    y: pos1.y + pos2.y,
  };
};

export const subPositions = (pos1: Vector2D, pos2: Vector2D): Vector2D => {
  return {
    x: pos1.x - pos2.x,
    y: pos1.y - pos2.y,
  };
};

export const mapUnit = (size: Rect, ratio: number): Rect => {
  return {
    x: size.x * ratio,
    y: size.y * ratio,
    w: size.w * ratio,
    h: size.h * ratio,
  };
};
