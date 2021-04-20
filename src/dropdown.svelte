<script lang="ts">
  export let options: string[];
  export let name: string;
  export let selected: string;
  $: console.log({ selected });
</script>

<select
  bind:value={selected}
  {name}
  class="w-full block py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
>
  {#each options as option}
    <option value={option}>
      {option}
    </option>
  {/each}
</select>
