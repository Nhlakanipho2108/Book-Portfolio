<script setup>
import { onBeforeUnmount, ref } from 'vue';

const HOLES = 9;
const DURATION = 20;
const active = ref(-1);
const kind = ref('bug');
const score = ref(0);
const timeLeft = ref(DURATION);
const state = ref('idle');
const best = ref(Number(localStorage.getItem('bugBest') || 0));
let spawn, clock;

function stop() {
  clearInterval(spawn);
  clearInterval(clock);
  active.value = -1;
}

function end() {
  stop();
  state.value = 'over';
  if (score.value > best.value) {
    best.value = score.value;
    localStorage.setItem('bugBest', String(best.value));
  }
}

function start() {
  stop();
  score.value = 0;
  timeLeft.value = DURATION;
  state.value = 'running';
  spawn = setInterval(() => {
    active.value = Math.floor(Math.random() * HOLES);
    kind.value = Math.random() < 0.2 ? 'feature' : 'bug';
  }, 700);
  clock = setInterval(() => {
    if (--timeLeft.value <= 0) end();
  }, 1000);
}

function hit(i) {
  if (state.value !== 'running' || i !== active.value) return;
  // squashing a feature costs points
  score.value = Math.max(0, score.value + (kind.value === 'bug' ? 1 : -2));
  active.value = -1;
}

onBeforeUnmount(stop);
</script>

<template>
  <div class="g">
    <p class="g-msg">
      <template v-if="state === 'idle'">Squash 🐛 bugs, spare ✨ features!</template>
      <template v-else-if="state === 'over'">Time! You squashed {{ score }}.</template>
      <template v-else>Score {{ score }} · {{ timeLeft }}s</template>
      · Best {{ best }}
    </p>
    <div class="holes">
      <button v-for="n in HOLES" :key="n" type="button" class="hole" :aria-label="active === n - 1 ? kind : 'Empty hole'" @click="hit(n - 1)">
        <span v-if="active === n - 1" class="critter">{{ kind === 'bug' ? '🐛' : '✨' }}</span>
      </button>
    </div>
    <button type="button" class="g-btn" @click="start">{{ state === 'running' ? 'Restart' : 'Play' }}</button>
  </div>
</template>

<style scoped>
.g{display:flex;flex-direction:column;align-items:center;gap:10px;font-family:var(--mono)}
.g-btn{font:12px var(--mono);border:1px solid #cfc3ae;background:#fff9;padding:6px 12px;cursor:pointer;color:var(--ink)}
.g-msg{margin:0;font-size:12px;color:var(--muted);text-align:center}
.holes{display:grid;grid-template-columns:repeat(3,68px);gap:8px}
.hole{height:68px;border:0;border-radius:50%;background:radial-gradient(#5b4636,#33271d);cursor:pointer;font-size:30px;display:grid;place-items:center}
.critter{animation:up .2s ease-out}
@keyframes up{from{transform:translateY(24px) scale(.4)}}
</style>
