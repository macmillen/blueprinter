<script lang="ts">
  import Dropdown from "./dropdown.svelte";
  import InputGroup from "./input-group.svelte";
  import type { Unit, Vector2D } from "./types";

  export let canvasSize: Vector2D;
  export let unit: Unit;
  export let aspectRatio: number;

  const options: Unit[] = ["cm", "m"];
</script>

<div class="mb-3 flex gap-2">
  <InputGroup
    type="number"
    direction="column"
    bind:value={canvasSize.x}
    name="canvas width"
    classes="w-28"
  />
  <InputGroup
    type="number"
    direction="column"
    bind:value={canvasSize.y}
    name="canvas height"
    classes="w-28"
  />
  <InputGroup
    type="number"
    direction="column"
    bind:value={aspectRatio}
    name="ratio"
    classes="w-28"
  />
  <div class="flex items-center gap-2 flex-col">
    <label class="w-28 whitespace-nowrap" for="unit">unit</label>
    <Dropdown name="unit" {options} bind:selected={unit} />
  </div>
</div>
