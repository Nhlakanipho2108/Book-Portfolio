<script setup>
import { computed, onBeforeUnmount, ref } from 'vue';

const LINES = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
const cells = ref(Array(9).fill(''));
const vsAi = ref(true);
const turn = ref('X');
const scores = ref({ X: 0, O: 0 });
let timer;

const winLine = computed(() => LINES.find(([a, b, c]) => cells.value[a] && cells.value[a] === cells.value[b] && cells.value[a] === cells.value[c]));
const draw = computed(() => !winLine.value && cells.value.every(Boolean));
const over = computed(() => !!winLine.value || draw.value);
const msg = computed(() => {
  if (winLine.value) return `${cells.value[winLine.value[0]]} wins! 🎉`;
  if (draw.value) return "It's a draw.";
  return vsAi.value && turn.value === 'O' ? 'Computer is thinking…' : `${turn.value}'s turn`;
});

function winnerOf(b) {
  const l = LINES.find(([x, y, z]) => b[x] && b[x] === b[y] && b[x] === b[z]);
  return l ? b[l[0]] : null;
}

function minimax(b, player) {
  const w = winnerOf(b);
  if (w) return w === 'O' ? 1 : -1;
  if (b.every(Boolean)) return 0;
  const scoresList = [];
  b.forEach((v, i) => {
    if (v) return;
    b[i] = player;
    scoresList.push(minimax(b, player === 'O' ? 'X' : 'O'));
    b[i] = '';
  });
  return player === 'O' ? Math.max(...scoresList) : Math.min(...scoresList);
}

function aiMove() {
  const b = [...cells.value];
  const empty = b.map((v, i) => (v ? -1 : i)).filter((i) => i >= 0);
  // play perfectly most of the time so the player can still win sometimes
  if (Math.random() < 0.25) return empty[Math.floor(Math.random() * empty.length)];
  let best = -2;
  let pick = empty[0];
  for (const i of empty) {
    b[i] = 'O';
    const s = minimax(b, 'X');
    b[i] = '';
    if (s > best) {
      best = s;
      pick = i;
    }
  }
  return pick;
}

function afterMove() {
  if (winLine.value) scores.value[cells.value[winLine.value[0]]]++;
  else turn.value = turn.value === 'X' ? 'O' : 'X';
}

function play(i) {
  if (cells.value[i] || over.value || (vsAi.value && turn.value === 'O')) return;
  cells.value[i] = turn.value;
  afterMove();
  if (vsAi.value && !over.value) {
    timer = setTimeout(() => {
      cells.value[aiMove()] = 'O';
      afterMove();
    }, 400);
  }
}

function reset() {
  clearTimeout(timer);
  cells.value = Array(9).fill('');
  turn.value = 'X';
}

function setMode(ai) {
  vsAi.value = ai;
  scores.value = { X: 0, O: 0 };
  reset();
}

onBeforeUnmount(() => clearTimeout(timer));
</script>

<template>
  <div class="g">
    <div class="g-row">
      <button type="button" :class="{ on: vsAi }" @click="setMode(true)">vs Computer</button>
      <button type="button" :class="{ on: !vsAi }" @click="setMode(false)">vs Friend</button>
    </div>
    <div class="g-score"><span>X: {{ scores.X }}</span><span>O: {{ scores.O }}</span></div>
    <p class="g-msg">{{ msg }}</p>
    <div class="ttt">
      <button v-for="(c, i) in cells" :key="i" type="button" :class="['ttt-cell', c, { win: winLine?.includes(i) }]" :aria-label="`Cell ${i + 1} ${c}`" @click="play(i)">{{ c }}</button>
    </div>
    <button type="button" class="g-btn" @click="reset">New round</button>
  </div>
</template>

<style scoped>
.g{display:flex;flex-direction:column;align-items:center;gap:10px;font-family:var(--mono)}
.g-row{display:flex;gap:8px}
.g-row button,.g-btn{font:12px var(--mono);border:1px solid #cfc3ae;background:#fff9;padding:6px 12px;cursor:pointer;color:var(--ink)}
.g-row button.on{background:var(--orange);color:#fff;border-color:var(--orange)}
.g-score{display:flex;gap:24px;font-size:13px}
.g-msg{margin:0;font-size:12px;color:var(--muted)}
.ttt{display:grid;grid-template-columns:repeat(3,64px);gap:6px;background:#b91c1c;padding:8px;border-radius:10px}
.ttt-cell{height:64px;border:0;border-radius:8px;background:#e7c9a5;font:700 30px var(--mono);cursor:pointer;transition:transform .15s}
.ttt-cell:hover:not(:disabled){transform:scale(1.06)}
.ttt-cell.X{color:var(--ink)}
.ttt-cell.O{color:#b91c1c}
.ttt-cell.win{background:#f4d35e;animation:pop .5s ease infinite alternate}
@keyframes pop{to{transform:scale(1.1)}}
</style>
