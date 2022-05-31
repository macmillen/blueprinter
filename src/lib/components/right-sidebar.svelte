<script lang="ts">
  import Dropdown from "./dropdown.svelte";
  import InputGroup from "./input-group.svelte";
  import SidebarHeader from "./sidebar-header.svelte";
  import type { Unit, Vector2D } from "./types";

  export let canvasSize: Vector2D;
  export let unit: Unit;
  export let aspectRatio: number;

  const options: Unit[] = ["cm", "m"];
</script>

<SidebarHeader>Global Settings</SidebarHeader>
<InputGroup type="number" bind:value={canvasSize.x} name="canvas w" />
<InputGroup type="number" bind:value={canvasSize.y} name="canvas h" />
<InputGroup type="number" bind:value={aspectRatio} name="ratio" />

<div class="flex items-center gap-2">
  <label class="w-28 whitespace-nowrap" for="unit">unit</label>
  <Dropdown name="unit" {options} bind:selected={unit} />
</div>
