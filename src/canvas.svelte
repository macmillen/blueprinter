<script lang="ts">
  import { afterUpdate, onMount } from "svelte";
  import { LineMeasure } from "./consts";
  import type { Vector2D, Rect, Shape, Unit } from "./types";
  import { getPosition } from "./utils/dom";
  import {
    diffPositions,
    mapUnitRect,
    mapUnitVector2D,
    subPositions,
    withinRect,
  } from "./utils/math";

  export let selectedShape: Shape | undefined;
  export let canvasSize: Vector2D;
  export let unit: Unit;
  export let aspectRatio: number;
  export let shapes: Shape[] = [];

  type X = {
    unitSize: Rect;
    pixelSize: Rect;
  } & Pick<Shape, "id" | "name">;

  $: mappedShapes = shapes.map<X>(({ id, name, x, y, w, h }) => ({
    id,
    name,
    pixelSize: mapUnitRect({ x, y, w, h }, aspectRatio),
    unitSize: { x, y, w, h },
  }));

  let canvas: HTMLCanvasElement;
  let mousePos: { x: number; y: number } = { x: 0, y: 0 };

  let dragData: {
    diff?: Vector2D | undefined;
    pos?: Vector2D | undefined;
  } = {};
  let draggedShapeId: number | undefined;

  export let onSelect: (selectedId: number | undefined) => void;
  export let onShapeMove: (selectedId: number, position: Vector2D) => void;

  const getFont = (size: number) => `${size}px Arial`;

  const clearCanvas = (ctx: CanvasRenderingContext2D | null) =>
    ctx?.clearRect(0, 0, canvas.width, canvas.height);

  const drawToCanvas = (
    ctx: CanvasRenderingContext2D | null,
    shapes: X[],
    selectedShape: Shape | undefined
  ) => {
    clearCanvas(ctx);
    shapes.forEach((shape) => {
      if (!ctx) return;
      const { id, name, pixelSize, unitSize } = shape;
      const { x, y, w, h } = pixelSize;

      const center = { x: x + w / 2, y: y + h / 2 };
      let textSize = 0;
      let textWidth = 0;
      let text = "";

      // Shape
      if (selectedShape?.id === id) {
        ctx.fillStyle = "#6ee7b7";
      } else {
        ctx.fillStyle = "#fff";
        ctx.strokeStyle = "#666";
        ctx.lineWidth = 5;
      }
      ctx.strokeRect(x, y, w, h);
      ctx.fillRect(x, y, w, h);

      ctx.fillStyle = "#000000";
      textSize = 18;
      ctx.font = getFont(textSize);
      textWidth = ctx.measureText(name).width;
      ctx.fillText(name, center.x - textWidth / 2, center.y + textSize / 2);

      // Width measure
      ctx.beginPath();
      ctx.lineWidth = LineMeasure.strokeW;
      ctx.moveTo(x, y - LineMeasure.gap);
      ctx.lineTo(x + w, y - LineMeasure.gap);
      ctx.moveTo(x + w, y - LineMeasure.gap - LineMeasure.sideH / 2);
      ctx.lineTo(x + w, y - LineMeasure.gap + LineMeasure.sideH / 2);
      ctx.moveTo(x, y - LineMeasure.gap - LineMeasure.sideH / 2);
      ctx.lineTo(x, y - LineMeasure.gap + LineMeasure.sideH / 2);
      ctx.stroke();
      textSize = 12;
      ctx.font = getFont(textSize);
      text = `w: ${unitSize.w}${unit}`;
      textWidth = ctx.measureText(text).width;
      ctx.fillText(text, center.x - textWidth / 2, y - 20);

      // Height measure
      ctx.beginPath();
      ctx.lineWidth = LineMeasure.strokeW;
      ctx.moveTo(x + w + LineMeasure.gap, y);
      ctx.lineTo(x + w + LineMeasure.gap, y + h);
      ctx.moveTo(x + w + LineMeasure.gap + LineMeasure.sideH / 2, y);
      ctx.lineTo(x + w + LineMeasure.gap - LineMeasure.sideH / 2, y);
      ctx.moveTo(x + w + LineMeasure.gap + LineMeasure.sideH / 2, y + h);
      ctx.lineTo(x + w + LineMeasure.gap - LineMeasure.sideH / 2, y + h);
      ctx.stroke();
      textSize = 12;
      ctx.font = getFont(textSize);
      text = `h: ${unitSize.h}${unit}`;
      textWidth = ctx.measureText(text).width;
      ctx.fillText(text, x + w + 20, y + h / 2 + textSize / 2);
    });
  };

  afterUpdate(() => {
    const ctx = canvas?.getContext("2d");
    drawToCanvas(ctx, mappedShapes, selectedShape);
  });

  onMount(() => {
    document.addEventListener("mousemove", (event) => {
      mousePos = { x: event.clientX, y: event.clientY };
    });
  });

  const getTargetPoint = () => {
    const canvasPos = getPosition(canvas);
    const targetPoint = {
      x: mousePos.x - canvasPos.x,
      y: mousePos.y - canvasPos.y,
    };
    return targetPoint;
  };

  const getHitShapeId = () => {
    let hitShapeId: number | undefined;
    let diff: Vector2D | undefined;
    const targetPoint = getTargetPoint();
    for (const { id, pixelSize } of mappedShapes) {
      const hit = withinRect(targetPoint, pixelSize);
      if (hit) {
        hitShapeId = id;
        diff = diffPositions(targetPoint, pixelSize);
      }
    }
    return { hitShapeId, diff };
  };

  const onClick = () => {
    const { hitShapeId } = getHitShapeId();
    onSelect(hitShapeId);
  };

  const onDragStart = () => {
    const { hitShapeId, diff } = getHitShapeId();
    if (selectedShape?.id === hitShapeId) {
      dragData = { diff };
      draggedShapeId = hitShapeId;
    }
  };

  const onDragEnd = () => {
    const { pos } = dragData;
    if (draggedShapeId != null && pos) {
      onShapeMove(draggedShapeId, mapUnitVector2D(pos, 1 / aspectRatio));
    }
    draggedShapeId = undefined;
  };

  const onMouseMove = () => {
    const { diff } = dragData;
    if (draggedShapeId != null && diff) {
      const t = getTargetPoint();
      const targetPoint = subPositions(t, diff);
      dragData = { diff, pos: targetPoint };
      onShapeMove(
        draggedShapeId,
        mapUnitVector2D(targetPoint, 1 / aspectRatio)
      );
    }
  };
</script>

<canvas
  bind:this={canvas}
  width={canvasSize.x}
  height={canvasSize.y}
  class="border-dashed border-4"
  style="width: {canvasSize.x + 8}px; height:{canvasSize.y + 8}px;"
  on:click={onClick}
  on:mousedown={onDragStart}
  on:mousemove={onMouseMove}
  on:mouseup={onDragEnd}
/>
