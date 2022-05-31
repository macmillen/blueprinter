<script lang="ts">
  import Button from "./button/button.svelte";
  import InputGroup from "./input-group.svelte";
  import SidebarHeader from "./sidebar-header.svelte";
  import type { Shape, ShapeData } from "./types";

  export let selectedShape: Shape | undefined;
  export let shapes: Shape[];

  export let onChange: (e: Shape | undefined) => void;
  export let onDeleteShape: () => void;
  export let onSelectShapeId: (shape: Shape) => void;

  const onInput = (data: Partial<ShapeData>) => {
    if (selectedShape) {
      onChange({ ...selectedShape, ...data });
    }
  };
</script>

<div class="flex flex-col gap-2 max-h-screen px-6">
  <SidebarHeader>Modify Shape</SidebarHeader>
  <InputGroup
    name="name"
    value={selectedShape?.name}
    on:input={({ detail: name }) => onInput({ name })}
  />
  <InputGroup
    type="number"
    name="x"
    value={selectedShape?.x}
    on:input={({ detail: x }) => onInput({ x })}
  />
  <InputGroup
    type="number"
    name="y"
    value={selectedShape?.y}
    on:input={({ detail: y }) => onInput({ y })}
  />
  <InputGroup
    type="number"
    name="w"
    value={selectedShape?.w}
    on:input={({ detail: w }) => onInput({ w })}
  />
  <InputGroup
    type="number"
    name="h"
    value={selectedShape?.h}
    on:input={({ detail: h }) => onInput({ h })}
  />

  <div>
    <SidebarHeader>Shapes</SidebarHeader>
    <ul>
      {#each shapes as shape}
        <li
          on:click={() => onSelectShapeId(shape)}
          class="pl-3 h-8 rounded my-1 cursor-pointer flex items-center {selectedShape?.id ===
          shape.id
            ? 'bg-green-300'
            : 'bg-gray-200'}"
        >
          {shape.name}
          {#if selectedShape?.id === shape.id}
            <span class="flex-grow" />
            <Button equalProportions size="sm" status="warn" on:click={onDeleteShape}>Delete</Button
            >
          {/if}
        </li>
      {/each}
    </ul>
  </div>
</div>
