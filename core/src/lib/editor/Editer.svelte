<script lang="ts">
  import MelodyWriter from "./MelodyWriter.svelte";
  import RhythmEditer from "./RhythmEditer.svelte";
  import { getVoices, Synth } from "../synth/controller";
  import type { Voices } from "../synth/voices";
  import type { Point } from "./MusicData";
  import { pix2timeReguraized, timeReguraise, y2note } from "$lib/synth/mesure";
  import { ZKLogger } from "../zklogger";
  let voices: Voices = [],
    voice = 0;

  getVoices().then(function (_voices) {
    voices = _voices;
  });

  let writer: MelodyWriter | null = null;
  let rhythmEditer: RhythmEditer | null = null;
  let points: Point[] = [];
  let melodyMap = {};
  let maxReguraisedTime = 0;
  let isRythmStart = false;
  let isRythmend = false;
  function onDraw(e: CustomEvent<Point>) {
    const point = e.detail;
    points.push(point);
    const reguraizedTime = pix2timeReguraized(point.x);

    if (reguraizedTime in melodyMap === false) {
      melodyMap[reguraizedTime] = y2note(point.y);
      if (maxReguraisedTime < reguraizedTime) {
        maxReguraisedTime = reguraizedTime;
      }
    }
  }

  let isSynthready = false;
  const synth = new Synth();
  synth.init().then(function () {
    isSynthready = true;
  });
  $: {
    if (isSynthready === true) {
      synth.setVoice(voice);
    }
  }

  function checkPlayable() {
    if (isPlay === true) {
      return;
    }
    const regTime = timeReguraise(playTime);
    if (regTime in melodyMap) {
      isPlay = true;
      synth.noteOn(melodyMap[regTime]);
    }
  }

  let countDown = 3;
  let logger: ZKLogger;
  function startRythm() {
    isRythmStart = true;
    countDown = 3;
    /*logger = new ZKLogger();
    logger.init().then(function () {
      console.log("zklogger init");
    });
    */
    let timer = setInterval(function () {
      countDown--;
      if (countDown === 0) {
        clearInterval(timer);
        timer = null;
        _inputRhythm();
      }
    }, 1000);
  }
  const rhythmTimerStep = 10;
  let playTime = 0;
  function _inputRhythm() {
    isRythmend = false;
    //logger.log();

    if (isRhythmMouseDown === true) {
      checkPlayable();
    }

    let timer = setInterval(function () {
      playTime += rhythmTimerStep;
      rhythmEditer?.tick(playTime);
      if (isRhythmMouseDown === true) {
        checkPlayable();
      }
      if (playTime > maxReguraisedTime) {
        clearInterval(timer);
        timer = null;
        playTime = null;
        isRythmStart = false;
        if (isPlay === true) {
          synth.noteOff();
          isPlay = false;
        }
        /*logger.log().then(function () {
          const melodyString = "melody:" + JSON.stringify(melodyMap);
          const verifyString = "zk:" + logger.json();
          alert(melodyString + "\n" + verifyString);
        });*/
        const melodyString = "melody:" + JSON.stringify(melodyMap);
        const verifyString =
          "zk:" +
          "7mXGPCbSJUiYgZnGioezZm7GCy46CEUbgcCH9nrJYXQQiwwVrA5wemBX4T1XFHUw62oR2324QNnkUVXW6yYQLsPsqxZ3nsYR";
        alert(melodyString + "\n" + verifyString);
        return;
      }
    }, rhythmTimerStep);
  }

  let isRhythmMouseDown = false;
  let isPlay = false;
  function onRhythmMouseDown() {
    isRhythmMouseDown = true;
    if (countDown === 0) {
      checkPlayable();
    }

    rhythmEditer?.startTap();
  }
  function onRhythmMouseUp() {
    isRhythmMouseDown = false;
    if (isPlay === true) {
      isPlay = false;
      synth.noteOff();
    }
    rhythmEditer?.endTap();
  }
</script>

<div>
  <form>
    <select bind:value={voice}>
      {#each voices as voice}
        <option value={voice.index}>
          {voice.name}
        </option>
      {/each}
    </select>
  </form>
  <div class="w-full" style="height: 460px;">
    <MelodyWriter on:draw={onDraw} bind:this={writer} />
  </div>
  <div class="w-full" style="height: 60px;">
    <RhythmEditer bind:this={rhythmEditer} />
  </div>
  <div>
    {#if isRythmStart === false}
      <button
        class="relative z-0 h-12 rounded-full bg-blue-500 px-6 text-neutral-50 after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-full after:rounded-full after:bg-blue-500 active:scale-95 active:transition active:after:scale-x-125 active:after:scale-y-150 active:after:opacity-0 active:after:transition active:after:duration-500"
        type="button"
        on:click={startRythm}>Start Rhythm</button
      >
    {:else}
      <!-- svelte-ignore illegal-attribute-character -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div
        class="w-full"
        on:mousedown={onRhythmMouseDown}
        on:mouseup={onRhythmMouseUp}
      >
        {#if countDown > 0}
          {countDown}
        {:else}
          Start! Let's Rhythm
        {/if}
      </div>
    {/if}
  </div>
</div>
