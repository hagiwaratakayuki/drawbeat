<script lang="ts">
  import { time2Pix } from "../synth/mesure";
  import RhythmDisplay from "./RhythmDisplay.svelte";
  import type { Beats } from "./MusicData";
  export let color = null;
  let isTap = false;
  let now = 0;
  let display: RhythmDisplay | null = null;
  export function startTap() {
    isTap = true;
    display?.updateBasePosition(now);
    display?.draw(now, color);
  }
  export function endTap() {
    isTap = false;
  }
  export function tick(time) {
    now = time2Pix(time);

    if (isTap === true) {
      display?.draw(now, color);
    }
    return now;
  }
  export function drawBeats(beats: Beats) {
    return display?.drawBeats(beats);
  }
</script>

<RhythmDisplay bind:this={display} on:mount></RhythmDisplay>
