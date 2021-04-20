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

export const mapUnitRect = (size: Rect, ratio: number): Rect => {
  return {
    x: size.x * ratio,
    y: size.y * ratio,
    w: size.w * ratio,
    h: size.h * ratio,
  };
};

export const mapUnitVector2D = (size: Vector2D, ratio: number): Vector2D => {
  return {
    x: size.x * ratio,
    y: size.y * ratio,
  };
};

export const withinRect = (point: Vector2D, rect: Rect) => {
  return (
    point.x > rect.x &&
    point.x < rect.x + rect.w &&
    point.y > rect.y &&
    point.y < rect.y + rect.h
  );
};

export const uuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
