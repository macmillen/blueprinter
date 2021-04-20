<script lang="ts">
  import Canvas from "./canvas.svelte";
  import Taskbar from "./taskbar.svelte";
  import Toolbar from "./toolbar.svelte";
  import type { Vector2D, Shape, ShapeData, Unit } from "./types";
  import { createShape, findShapeById, id } from "./utils/shape";

  let aspectRatio = 50;
  let canvasSize: Vector2D = { x: 600, y: 600 };
  let unit: Unit = "cm";

  let shapes: Shape[] = [
    createShape({ name: "hallo", x: 1, y: 1, w: 1, h: 1 }),
    createShape({ name: "second", x: 3, y: 4, w: 1, h: 1 }),
  ];

  let selectedShapeId: number | undefined = 0;
  $: selectedShape = findShapeById(shapes, selectedShapeId);

  const createRect = (shape: ShapeData | undefined) => {
    if (!shape) return;
    const newShape = createShape({
      ...shape,
      x: shape.x + 20,
      y: shape.y + 20,
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

  const onNewShape = () =>
    createRect({ name: `Rect (${id})`, x: 1, y: 1, w: 1, h: 1 });

  const onDuplicateShape = () =>
    createRect(findShapeById(shapes, selectedShapeId));

  const onDeleteShape = () => {
    shapes = [...shapes.filter(({ id }) => id !== selectedShapeId)];
    selectedShapeId = shapes[0]?.id;
  };

  const onShapeMove = (selectedId: number, position: Vector2D) => {
    shapes = shapes.reduce<Shape[]>(
      (acc, shape) => [
        ...acc,
        shape.id === selectedId ? { ...shape, ...position } : shape,
      ],
      []
    );
  };

  const onSelectShapeId = (shape: Shape) => (selectedShapeId = shape.id);

  const onSelect = (selectedId: number | undefined) =>
    (selectedShapeId = selectedId);
</script>

<div class="grid grid-cols-12 h-full">
  <Taskbar
    {shapes}
    {selectedShape}
    {onChange}
    {onDuplicateShape}
    {onNewShape}
    {onSelectShapeId}
    {onDeleteShape}
  />

  <div class="col-span-9 flex flex-col items-center mt-3">
    <div>
      <Toolbar bind:canvasSize bind:unit bind:aspectRatio />
      <Canvas
        {shapes}
        {aspectRatio}
        {selectedShape}
        {onSelect}
        {onShapeMove}
        {canvasSize}
        {unit}
      />
    </div>
  </div>
</div>

<style>
  :global(body, html) {
    height: 100%;
  }
</style>
