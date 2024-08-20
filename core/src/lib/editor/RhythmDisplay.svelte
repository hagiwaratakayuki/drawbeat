<script lang="ts">
  import type { Beats, Lines } from "./MusicData";

  import { onMount, createEventDispatcher } from "svelte";

  const dispatcher = createEventDispatcher();

  export let width = 0;
  let height = 0;

  let canvas: HTMLCanvasElement;
  let context: CanvasRenderingContext2D;
  let x = 0;
  let isMount = false;
  const defaultColor = "black";
  onMount(function () {
    if (typeof window === "undefined") {
      return;
    }
    context = canvas.getContext("2d");
    if (width === 0) {
      width = canvas.parentElement?.clientWidth;
    }
    setColor(defaultColor);
    height = canvas.parentElement?.clientHeight;
    dispatcher("mount", {});
  });
  export function drawBeats(beats: Beats, color?: string) {
    if (!color === false) {
      setColor(color);
    }

    for (const { start, end } of beats) {
      let isFirst = true;

      _drawRect(_x, _y);
    }
  }
  export function updateBasePosition(_x) {
    x = _x;
  }
  export function draw(x, color) {
    if (!color === false) {
      setColor(color);
    }

    _drawRect(x);

    return x;
  }
  export function setColor(color) {
    if (typeof window === "undefined") {
      return;
    }
    context.fillStyle = color;
  }
  export function _drawRect(_x) {
    if (typeof window === "undefined") {
      return;
    }

    context.fillRect(x, 0, _x - x, height);
    updateBasePosition(_x);
  }
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<canvas bind:this={canvas} {width} {height}></canvas>
