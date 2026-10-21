<script setup>
import { onBeforeUnmount, ref } from 'vue';

const WORDS = ['HTML', 'CSS', 'JS', 'Java', 'Python', 'Vue', 'Git', 'SQL'];
const colors = ['#d85c35', '#6595ef', '#e0b400', '#3e8b49', '#26b9c5', '#42b883', '#f05033', '#8a5cf5'];
const cards = ref([]);
const flipped = ref([]);
const moves = ref(0);
const best = ref(Number(localStorage.getItem('memoryBest') || 0));
const won = ref(false);
let lock = false;
let timer;

function shuffle() {
  const deck = WORDS.flatMap((w, i) => [0, 1].map((n) => ({ id: `${i}-${n}`, word: w, color: colors[i], matched: false })));
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  clearTimeout(timer);
  cards.value = deck;
  flipped.value = [];
  moves.value = 0;
  won.value = false;
  lock = false;
}

function flip(i) {
  const c = cards.value[i];
  if (lock || c.matched || flipped.value.includes(i)) return;
  flipped.value.push(i);
  if (flipped.value.length < 2) return;
  moves.value++;
  const [a, b] = flipped.value;
  if (cards.value[a].word === cards.value[b].word) {
    cards.value[a].matched = cards.value[b].matched = true;
    flipped.value = [];
    if (cards.value.every((x) => x.matched)) {
      won.value = true;
      if (!best.value || moves.value < best.value) {
        best.value = moves.value;
        localStorage.setItem('memoryBest', String(best.value));
      }
    }
  } else {
    lock = true;
    timer = setTimeout(() => {
      flipped.value = [];
      lock = false;
    }, 800);
  }
}

shuffle();
onBeforeUnmount(() => clearTimeout(timer));
</script>

<template>
  <div class="g">
    <p class="g-msg">{{ won ? `Matched all in ${moves} moves! 🎉` : `Moves ${moves}` }} · Best {{ best || '–' }}</p>
    <div class="mem">
      <button v-for="(c, i) in cards" :key="c.id" type="button" class="mem-card" :class="{ up: c.matched || flipped.includes(i), done: c.matched }" :style="{ '--c': c.color }" :aria-label="c.matched || flipped.includes(i) ? c.word : 'Hidden card'" @click="flip(i)">
        <span class="face">{{ c.matched || flipped.includes(i) ? c.word : '?' }}</span>
      </button>
    </div>
    <button type="button" class="g-btn" @click="shuffle">Shuffle</button>
  </div>
</template>

<style scoped>
.g{display:flex;flex-direction:column;align-items:center;gap:10px;font-family:var(--mono)}
.g-btn{font:12px var(--mono);border:1px solid #cfc3ae;background:#fff9;padding:6px 12px;cursor:pointer;color:var(--ink)}
.g-msg{margin:0;font-size:12px;color:var(--muted)}
.mem{display:grid;grid-template-columns:repeat(4,clamp(56px,16vw,72px));gap:6px}
.mem-card{height:clamp(48px,13vw,60px);border:0;border-radius:8px;background:var(--ink);color:#fff;font:600 13px var(--mono);cursor:pointer;transition:transform .2s,background .2s}
.mem-card.up{background:var(--c);transform:rotateY(0) scale(1.03)}
.mem-card.done{opacity:.65}
</style>
