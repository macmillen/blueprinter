<script lang="ts">
  import { fade } from "svelte/transition";
</script>

<div
  in:fade={{ duration: 300 }}
  out:fade={{ duration: 200 }}
  class="fixed inset-0 transition-opacity"
  aria-hidden="true"
  on:click
>
  <div class="absolute inset-0 bg-black opacity-40" />
</div>
