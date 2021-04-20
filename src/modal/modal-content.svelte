<script lang="ts">
  import type { ModalSize } from "./modal.consts";
  import { sizeMap } from "./modal.consts";

  export let size: ModalSize;

  $: sizeClasses = sizeMap[size];
</script>

<div
  style="max-height: 92vh; mask-image: radial-gradient(#fff,#000); -webkit-mask-image: -webkit-radial-gradient(#fff,#000);"
  class="inline-block bg-white rounded-lg text-left shadow-xl transform transition-all my-8 align-middle w-full overflow-y-scroll {sizeClasses}"
  role="dialog"
>
  <div class="bg-white p-4">
    <slot />
  </div>
</div>

<style>
  ::-webkit-scrollbar {
    background: rgb(220, 220, 220);
    height: 7px;
    width: 7px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgb(245, 245, 245);
    border-radius: 2px;
  }
  ::-webkit-scrollbar-thumb {
    background: rgb(245, 245, 245);
    border-radius: 2px;
  }
</style>
