<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import ModalBackground from "./modal-background.svelte";
  import ModalCenterHelper from "./modal-center-helper.svelte";
  import ModalContainer from "./modal-container.svelte";
  import ModalContent from "./modal-content.svelte";
  import ModalPositioner from "./modal-positioner.svelte";
  import type { ModalSize } from "./modal.consts";

  export let size: ModalSize;

  const dispatch = createEventDispatcher();
  const onBackgroundClick = () => dispatch("backgroundclick");
</script>

<ModalPositioner>
  <ModalContainer>
    <ModalBackground on:click={onBackgroundClick} />
    <ModalCenterHelper />

    <ModalContent {size}>
      <slot />
    </ModalContent>
  </ModalContainer>
</ModalPositioner>
