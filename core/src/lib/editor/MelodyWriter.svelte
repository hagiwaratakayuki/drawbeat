<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import MelodyDisplay from "./MelodyDisplay.svelte";

  export let color = "black";
  const dispatcher = createEventDispatcher();
  let melodyDisplay: MelodyDisplay;
  let isMouseDown = false;
  let isMouseLeave = true;

  function onMouseDown(e: MouseEvent) {
    isMouseDown = true;
    _updateBasePosition(e);
  }
  function onMouseUp(e: MouseEvent) {
    isMouseDown = false;
  }

  function onMouseMove(e: MouseEvent) {
    if (isMouseDown === false || isMouseLeave === true) {
      return;
    }
    const { x, y } = _getMousePosition(e);
    const relPosition = melodyDisplay.draw(x, y, color);
    dispatcher("draw", relPosition);
  }
  function _getMousePosition(e: MouseEvent) {
    const rect = e.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return { x, y };
  }
  function _updateBasePosition(e: MouseEvent) {
    const { x, y } = _getMousePosition(e);
    melodyDisplay.updateBasePosition(x, y);
  }

  function onMouseOut(e: MouseEvent) {
    isMouseLeave = true;
  }
  function onMouseEnter(e: MouseEvent) {
    isMouseLeave = false;
    _updateBasePosition(e);
  }
</script>

<MelodyDisplay
  bind:this={melodyDisplay}
  on:mousedown={onMouseDown}
  on:mousemove={onMouseMove}
  on:mouseup={onMouseUp}
  on:mouseout={onMouseOut}
  on:mouseenter={onMouseEnter}
  on:mount
></MelodyDisplay>
