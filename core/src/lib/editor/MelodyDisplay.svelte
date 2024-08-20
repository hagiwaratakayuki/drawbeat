<script lang="ts">
  import type { MelodyLines } from "./MusicData";

  import { onMount, createEventDispatcher } from "svelte";

  const dispatcher = createEventDispatcher();

  export let width = 0;
  export let height = 0;

  let canvas: HTMLCanvasElement;
  let context: CanvasRenderingContext2D;

  onMount(function () {
    if (typeof window === "undefined") {
      return;
    }
    context = canvas.getContext("2d");
    width = canvas.parentElement?.clientWidth;
    height = canvas.parentElement?.clientHeight;
    dispatcher("mount", {});
  });
  export function drawLines(lines: MelodyLines) {
    for (const line of lines) {
      let isFirst = true;
      _setColor(line.color);
      for (const { x, y } of line.points) {
        const _x = x * width;
        const _y = y * height;
        if (isFirst === true) {
          updateBasePosition(_x, _y);
          isFirst = false;
          continue;
        }
        _drawLine(_x, _y);
      }
    }
  }
  export function updateBasePosition(x, y) {
    context.moveTo(x, y);
  }
  export function draw(x, y, color) {
    _setColor(color);
    _drawLine(x, y);

    return { x, y: y / height };
  }
  export function _setColor(color) {
    if (typeof window === "undefined") {
      return;
    }
    context.strokeStyle = color;
  }
  export function _drawLine(x, y) {
    if (typeof window === "undefined") {
      return;
    }
    context.lineTo(x, y);
    context.stroke();
  }
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<canvas
  bind:this={canvas}
  {width}
  {height}
  on:mousedown
  on:mouseup
  on:mousemove
  on:mouseenter
  on:mouseout
></canvas>
