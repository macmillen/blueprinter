<script>
  import Button from "./button/button.svelte";
  import AddIcon from "./icons/add-icon.svelte";
  import ClearIcon from "./icons/clear-icon.svelte";
  import DuplicateIcon from "./icons/duplicate-icon.svelte";

  export let onDuplicateShape: () => void;
  export let onNewShape: () => void;
  export let onClearCanvas: () => void;
</script>

<div class="bg-blue-600 px-9 py-2 flex items-center">
  <h2 class="text-white text-2xl">Blueprinter</h2>

  <span class="flex-grow" />

  <div class="gap-4 flex">
    <Button
      on:click={onNewShape}
      equalProportions
      status="transparent"
      size="xs"
    >
      <div class="flex justify-center flex-col items-center">
        <AddIcon classes="w-8 h-8 text-white" />
        <h2 class="text-white">New Shape</h2>
      </div>
    </Button>

    <Button
      on:click={onDuplicateShape}
      equalProportions
      status="transparent"
      size="xs"
    >
      <div class="flex justify-center flex-col items-center">
        <DuplicateIcon classes="w-8 h-8 text-white" />
        <h2 class="text-white">Duplicate Shape</h2>
      </div>
    </Button>

    <Button
      on:click={onClearCanvas}
      equalProportions
      status="transparent"
      size="xs"
    >
      <div class="flex justify-center flex-col items-center">
        <ClearIcon classes="w-8 h-8 text-white" />
        <h2 class="text-white">Clear Canvas</h2>
      </div>
    </Button>
  </div>
</div>
