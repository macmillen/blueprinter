<script lang="ts">
  import Canvas from "./canvas.svelte";
  import Navbar from "./navbar.svelte";
  import RightSidebar from "./right-sidebar.svelte";
  import LeftSidebar from "./left-sidebar.svelte";
  import type { Vector2D, Shape, ShapeData, Unit } from "./types";
  import { getLocalStorageData, storeDataToLocalStorage } from "./utils/cache";
  import { createShape, findShapeById } from "./utils/shape";

  const localStorageData = getLocalStorageData();

  let aspectRatio = localStorageData.aspectRatio ?? 50;
  let canvasSize: Vector2D = localStorageData.canvasSize ?? { x: 600, y: 600 };
  let unit: Unit = localStorageData.unit ?? "cm";

  let canvas: HTMLCanvasElement;

  let shapes: Shape[] = localStorageData.shapes ?? [
    createShape({ name: "hallo", x: 1, y: 1, w: 1, h: 1 }),
    createShape({ name: "second", x: 3, y: 4, w: 1, h: 1 }),
  ];
  $: storeDataToLocalStorage({ shapes, aspectRatio, canvasSize, unit });

  let selectedShapeId: string | undefined = shapes[0]?.id;
  $: selectedShape = findShapeById(shapes, selectedShapeId);

  const createRect = (shape: ShapeData) => {
    const newShape = createShape({
      ...shape,
      x: shape.x + (1 / aspectRatio) * 20,
      y: shape.y + (1 / aspectRatio) * 20,
    });
    shapes = [...shapes, newShape];
    selectedShapeId = newShape.id;
  };

  const onChange = (newShape: Shape | undefined) => {
    if (!selectedShape || !newShape) return;
    shapes = shapes.reduce<Shape[]>(
      (acc, shape) => [...acc, shape === selectedShape ? newShape : shape],
      []
    );
  };

  const onNewShape = () => createRect({ name: "Rect", x: 1, y: 1, w: 1, h: 1 });

  const onDuplicateShape = () => {
    const shapeToDuplicate = findShapeById(shapes, selectedShapeId);
    if (shapeToDuplicate) createRect(shapeToDuplicate);
  };

  const onDeleteShape = () => {
    shapes = [...shapes.filter(({ id }) => id !== selectedShapeId)];
    selectedShapeId = shapes[0]?.id;
  };

  const onShapeMove = (selectedId: string, position: Vector2D) => {
    shapes = shapes.reduce<Shape[]>(
      (acc, shape) => [
        ...acc,
        shape.id === selectedId ? { ...shape, ...position } : shape,
      ],
      []
    );
  };

  const onSelectShapeId = (shape: Shape) => (selectedShapeId = shape.id);

  const onSelect = (selectedId: string | undefined) =>
    (selectedShapeId = selectedId);

  const onClearCanvas = () => {
    shapes = [];
  };

  const onDownloadImage = () => {
    const image = canvas
      .toDataURL("image/png", 1.0)
      .replace("image/png", "image/octet-stream");
    const link = document.createElement("a");
    link.download = "sketch.png";
    link.href = image;
    link.click();
  };
</script>

<Navbar {onClearCanvas} {onDuplicateShape} {onNewShape} {onDownloadImage} />

<div class="grid grid-cols-12">
  <div
    class="col-span-2 overflow-y-auto"
    style="max-height: calc(100vh - 72px);"
  >
    <LeftSidebar
      {shapes}
      {selectedShape}
      {onChange}
      {onSelectShapeId}
      {onDeleteShape}
    />
  </div>

  <div class="col-span-8 flex flex-col items-center mt-8">
    <Canvas
      {shapes}
      {aspectRatio}
      {selectedShape}
      {onSelect}
      {onShapeMove}
      {canvasSize}
      {unit}
      bind:canvas
    />
  </div>

  <div class="col-span-2 flex flex-col gap-2 h-full max-h-screen px-6">
    <RightSidebar bind:canvasSize bind:unit bind:aspectRatio />
  </div>
</div>

<style>
  :global(body, html) {
    height: 100%;
  }
</style>
