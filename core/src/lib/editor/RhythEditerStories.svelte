<script lang="ts">
  import RhythmEditer from "./RhythmEditer.svelte";
  let editer: RhythmEditer | null = null;
  let time = 0;
  let timer;
  const interval = 10;

  function onMount() {
    editer?.startTap();
    timer = setInterval(function () {
      time += interval;
      if (time > 3000) {
        editer?.endTap();
        clearInterval(timer);
        return;
      }
      editer?.tick(time);
    }, interval);
  }
</script>

<div style="width: 100%; height:300px;">
  <RhythmEditer bind:this={editer} on:mount={onMount}></RhythmEditer>
</div>
