<script lang="ts">
  import Input from "./input.svelte";

  export let name: string;
  export let value: string | number | undefined;
  export let type = "text";
  export let classes = "";
  export let direction: "column" | "row" = "row";
  $: directionClasses = direction === "column" ? "flex-col" : "";
</script>

<div class="flex items-center gap-2 {classes} {directionClasses}">
  <label class="w-28 whitespace-nowrap" for={name}>{name}</label>
  <Input {name} bind:value {type} on:input />
</div>
