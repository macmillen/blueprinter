<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let type = "text";
  export let name: string;
  export let value: string | number | undefined;
  export let classes = "";

  const getValueFromType = (type: string, value: string) => {
    switch (type) {
      case "number":
        return Number(value);
      case "text":
      default:
        return value;
    }
  };

  const dispatch = createEventDispatcher();
  const onChange = (value: string | number) => dispatch("input", value);

  const handleInput = (event: Event) => {
    const target = (event.target as unknown) as { type: string; value: string };
    value = getValueFromType(target.type, target.value);
    onChange(value);
  };
</script>

<input
  {type}
  {value}
  {name}
  on:input={handleInput}
  on:change={handleInput}
  class="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md {classes}"
/>
