import { LocalStorage } from "../consts";
import type { Shape, Unit, Vector2D } from "../types";

const getFromStorage = <T>(key: LocalStorage): T | null => {
  const cachedJson = localStorage.getItem(key);
  if (!cachedJson) return null;

  try {
    let parsedData = JSON.parse(cachedJson) as T;
    return parsedData;
  } catch (error) {
    return null;
  }
};

type LocalStorageData = {
  shapes: Shape[];
  canvasSize: Vector2D;
  aspectRatio: number;
  unit: Unit;
};

type Nullable<T> = { [K in keyof T]: T[K] | null };

export const getLocalStorageData = (): Nullable<LocalStorageData> => {
  return {
    shapes: getFromStorage<Shape[]>(LocalStorage.Shapes),
    aspectRatio: getFromStorage<number>(LocalStorage.AspectRatio),
    canvasSize: getFromStorage<Vector2D>(LocalStorage.CanvasSize),
    unit: getFromStorage<Unit>(LocalStorage.Unit),
  };
};

export const storeDataToLocalStorage = ({
  shapes,
  canvasSize,
  aspectRatio,
  unit,
}: LocalStorageData) => {
  localStorage.setItem(LocalStorage.Shapes, JSON.stringify(shapes));
  localStorage.setItem(LocalStorage.CanvasSize, JSON.stringify(canvasSize));
  localStorage.setItem(LocalStorage.Unit, JSON.stringify(unit));
  localStorage.setItem(LocalStorage.AspectRatio, JSON.stringify(aspectRatio));
};
