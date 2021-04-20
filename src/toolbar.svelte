<script lang="ts">
  import InputGroup from "./input-group.svelte";
  import type { Vector2D } from "./types";

  export let canvasSize: Vector2D;
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
</div>
