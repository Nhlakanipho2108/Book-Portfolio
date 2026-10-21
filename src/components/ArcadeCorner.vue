<script setup>
import { nextTick, onBeforeUnmount, ref, watch } from 'vue';

import TicTacToe from './TicTacToe.vue';
import MemoryMatch from './MemoryMatch.vue';
import BugSquash from './BugSquash.vue';

const open = ref(false);
const tab = ref('connect');

/* ---------- Connect Four (you vs. computer) ---------- */
const ROWS = 6;
const COLS = 7;
const emptyBoard = () => Array.from({ length: ROWS }, () => Array(COLS).fill(0));
const board = ref(emptyBoard());
const c4Over = ref(false);
const c4Msg = ref('Your turn — you are orange');
const winCells = ref([]);
const thinking = ref(false);
let aiTimer;

function findWin(b, p) {
  const dirs = [[0, 1], [1, 0], [1, 1], [1, -1]];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (b[r][c] !== p) continue;
      for (const [dr, dc] of dirs) {
        const cells = [];
        for (let k = 0; k < 4; k++) {
          const rr = r + dr * k;
          const cc = c + dc * k;
          if (rr < 0 || rr >= ROWS || cc < 0 || cc >= COLS || b[rr][cc] !== p) break;
          cells.push(`${rr}-${cc}`);
        }
        if (cells.length === 4) return cells;
      }
    }
  }
  return null;
}

function dropRow(b, c) {
  for (let r = ROWS - 1; r >= 0; r--) if (!b[r][c]) return r;
  return -1;
}

function finish(p) {
  const w = findWin(board.value, p);
  if (w) {
    winCells.value = w;
    c4Over.value = true;
    c4Msg.value = p === 1 ? 'You win! 🎉' : 'The computer wins. Rematch?';
    return true;
  }
  if (board.value[0].every(Boolean)) {
    c4Over.value = true;
    c4Msg.value = "It's a draw.";
    return true;
  }
  return false;
}

function chooseAiColumn() {
  const open = [...Array(COLS).keys()].filter((c) => dropRow(board.value, c) >= 0);
  const tryCol = (c, p) => {
    const r = dropRow(board.value, c);
    board.value[r][c] = p;
    const win = !!findWin(board.value, p);
    board.value[r][c] = 0;
    return win;
  };
  for (const c of open) if (tryCol(c, 2)) return c;
  for (const c of open) if (tryCol(c, 1)) return c;
  // avoid handing the player a winning move, then prefer the centre
  const safe = open.filter((c) => {
    const r = dropRow(board.value, c);
    if (r === 0) return true;
    board.value[r][c] = 2;
    const gives = tryCol(c, 1);
    board.value[r][c] = 0;
    return !gives;
  });
  const pool = safe.length ? safe : open;
  return pool.sort((a, b) => Math.abs(a - 3) - Math.abs(b - 3) || Math.random() - 0.5)[0];
}

function play(c) {
  if (c4Over.value || thinking.value) return;
  const r = dropRow(board.value, c);
  if (r < 0) return;
  board.value[r][c] = 1;
  if (finish(1)) return;
  thinking.value = true;
  c4Msg.value = 'Computer is thinking…';
  aiTimer = setTimeout(() => {
    const ai = chooseAiColumn();
    board.value[dropRow(board.value, ai)][ai] = 2;
    thinking.value = false;
    if (!finish(2)) c4Msg.value = 'Your turn — you are orange';
  }, 450);
}

function resetC4() {
  clearTimeout(aiTimer);
  board.value = emptyBoard();
  winCells.value = [];
  c4Over.value = false;
  thinking.value = false;
  c4Msg.value = 'Your turn — you are orange';
}

/* ---------- Code Snake (eat HTML, CSS, Java, Python) ---------- */
const GRID_W = 16;
const GRID_H = 12;
const CELL = 24;
const WORDS = ['HTML', 'CSS', 'Java', 'Python'];
const COLORS = { HTML: '#d85c35', CSS: '#6595ef', Java: '#3e8b49', Python: '#26b9c5' };
const canvas = ref(null);
const snakeState = ref('idle');
const score = ref(0);
const best = ref(Number(localStorage.getItem('snakeBest') || 0));
const eaten = ref([]);
let snake, dir, nextDir, food, loop;

function placeFood() {
  let x, y;
  do {
    x = Math.floor(Math.random() * GRID_W);
    y = Math.floor(Math.random() * GRID_H);
  } while (snake.some((s) => s.x === x && s.y === y));
  food = { x, y, word: WORDS[Math.floor(Math.random() * WORDS.length)] };
}

function startSnake() {
  snake = [{ x: 5, y: 6 }, { x: 4, y: 6 }, { x: 3, y: 6 }];
  dir = { x: 1, y: 0 };
  nextDir = dir;
  score.value = 0;
  eaten.value = [];
  placeFood();
  snakeState.value = 'running';
  clearInterval(loop);
  loop = setInterval(tick, 150);
  draw();
}

function endSnake() {
  clearInterval(loop);
  snakeState.value = 'over';
  if (score.value > best.value) {
    best.value = score.value;
    localStorage.setItem('snakeBest', String(best.value));
  }
}

function tick() {
  dir = nextDir;
  const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
  const hit = head.x < 0 || head.y < 0 || head.x >= GRID_W || head.y >= GRID_H || snake.some((s) => s.x === head.x && s.y === head.y);
  if (hit) {
    draw();
    return endSnake();
  }
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    score.value++;
    eaten.value = [...eaten.value.slice(-5), food.word];
    placeFood();
  } else {
    snake.pop();
  }
  draw();
}

function steer(dx, dy) {
  if (snakeState.value !== 'running') return;
  if (dx === -dir.x && dy === -dir.y) return;
  nextDir = { x: dx, y: dy };
}

function draw() {
  const ctx = canvas.value?.getContext('2d');
  if (!ctx) return;
  ctx.clearRect(0, 0, GRID_W * CELL, GRID_H * CELL);
  ctx.fillStyle = '#fbf7ee';
  ctx.fillRect(0, 0, GRID_W * CELL, GRID_H * CELL);
  if (!snake) return;
  snake.forEach((s, i) => {
    ctx.fillStyle = i === 0 ? '#242126' : '#3e8b49';
    ctx.fillRect(s.x * CELL + 1, s.y * CELL + 1, CELL - 2, CELL - 2);
  });
  ctx.font = '600 12px "DM Mono", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const w = ctx.measureText(food.word).width + 10;
  const cx = Math.min(Math.max(food.x * CELL + CELL / 2, w / 2), GRID_W * CELL - w / 2);
  ctx.fillStyle = COLORS[food.word];
  ctx.fillRect(cx - w / 2, food.y * CELL + 3, w, CELL - 6);
  ctx.fillStyle = '#fff';
  ctx.fillText(food.word, cx, food.y * CELL + CELL / 2 + 1);
}

const keyMap = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0], w: [0, -1], s: [0, 1], a: [-1, 0], d: [1, 0] };
function onKey(e) {
  const m = keyMap[e.key];
  if (!m || snakeState.value !== 'running' || tab.value !== 'snake' || !open.value) return;
  e.preventDefault();
  steer(...m);
}

let touch;
function onTouchStart(e) {
  touch = e.touches[0];
}
function onTouchEnd(e) {
  if (!touch) return;
  const dx = e.changedTouches[0].clientX - touch.clientX;
  const dy = e.changedTouches[0].clientY - touch.clientY;
  if (Math.max(Math.abs(dx), Math.abs(dy)) < 20) return;
  if (Math.abs(dx) > Math.abs(dy)) steer(Math.sign(dx), 0);
  else steer(0, Math.sign(dy));
}

window.addEventListener('keydown', onKey);
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey);
  clearInterval(loop);
  clearTimeout(aiTimer);
});

// pause the snake whenever it is hidden so it never runs in the background
watch([open, tab], async () => {
  if (snakeState.value === 'running' && (!open.value || tab.value !== 'snake')) endSnake();
  if (open.value && tab.value === 'snake') {
    await nextTick();
    draw();
  }
});
</script>

<template>
  <section class="arcade" aria-label="Mini arcade">
    <button class="arcade-toggle" type="button" :aria-expanded="open" @click="open = !open">
      🎮 Take a break — mini arcade <span>{{ open ? '−' : '+' }}</span>
    </button>
    <div v-show="open" class="arcade-body">
      <div class="arcade-tabs" role="tablist">
        <button type="button" role="tab" :class="{ on: tab === 'connect' }" @click="tab = 'connect'">Connect Four</button>
        <button type="button" role="tab" :class="{ on: tab === 'snake' }" @click="tab = 'snake'">Code Snake</button>
        <button type="button" role="tab" :class="{ on: tab === 'ttt' }" @click="tab = 'ttt'">Tic-Tac-Toe</button>
        <button type="button" role="tab" :class="{ on: tab === 'memory' }" @click="tab = 'memory'">Memory</button>
        <button type="button" role="tab" :class="{ on: tab === 'bugs' }" @click="tab = 'bugs'">Bug Squash</button>
      </div>

      <TicTacToe v-if="open && tab === 'ttt'" />
      <MemoryMatch v-if="open && tab === 'memory'" />
      <BugSquash v-if="open && tab === 'bugs'" />

      <div v-show="tab === 'connect'" class="arcade-game">
        <p class="arcade-msg">{{ c4Msg }}</p>
        <div class="c4-board">
          <div v-for="c in COLS" :key="c" class="c4-col" role="button" tabindex="0" :aria-label="`Drop in column ${c}`" @click="play(c - 1)" @keydown.enter.prevent="play(c - 1)" @keydown.space.prevent="play(c - 1)">
            <span v-for="r in ROWS" :key="r" class="c4-cell" :class="[`p${board[r - 1][c - 1]}`, { win: winCells.includes(`${r - 1}-${c - 1}`) }]"></span>
          </div>
        </div>
        <button type="button" class="arcade-btn" @click="resetC4">New game</button>
      </div>

      <div v-show="tab === 'snake'" class="arcade-game">
        <p class="arcade-msg">
          <template v-if="snakeState === 'idle'">Eat HTML, CSS, Java &amp; Python. Arrow keys / WASD / swipe.</template>
          <template v-else-if="snakeState === 'over'">Game over — you ate {{ score }} languages.</template>
          <template v-else>Score {{ score }}</template>
          · Best {{ best }}
        </p>
        <canvas ref="canvas" class="snake-canvas" :width="GRID_W * CELL" :height="GRID_H * CELL" @touchstart.passive="onTouchStart" @touchend.passive="onTouchEnd"></canvas>
        <p v-if="eaten.length" class="snake-eaten">Last bites: {{ eaten.join(' · ') }}</p>
        <div class="snake-pad">
          <button type="button" aria-label="Up" @click="steer(0, -1)">▲</button>
          <button type="button" aria-label="Left" @click="steer(-1, 0)">◀</button>
          <button type="button" aria-label="Down" @click="steer(0, 1)">▼</button>
          <button type="button" aria-label="Right" @click="steer(1, 0)">▶</button>
        </div>
        <button type="button" class="arcade-btn" @click="startSnake">{{ snakeState === 'running' ? 'Restart' : 'Play' }}</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.arcade{margin:40px 56px 0;border:1px dashed #cfc3ae;background:var(--paper2);font-family:var(--mono)}
.arcade-toggle{width:100%;display:flex;justify-content:space-between;align-items:center;padding:12px 16px;border:0;background:none;font:13px var(--mono);color:var(--ink);cursor:pointer}
.arcade-body{padding:0 16px 18px;display:flex;flex-direction:column;align-items:center}
.arcade-tabs{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin-bottom:10px}
.arcade-tabs button,.arcade-btn,.snake-pad button{font:12px var(--mono);border:1px solid #cfc3ae;background:#fff9;padding:6px 12px;cursor:pointer;color:var(--ink)}
.arcade-tabs button.on{background:var(--orange);color:#fff;border-color:var(--orange)}
.arcade-game{display:flex;flex-direction:column;align-items:center;gap:10px;max-width:100%}
.arcade-msg{margin:0;font-size:12px;color:var(--muted);text-align:center}
.c4-board{display:flex;gap:4px;background:var(--blue);padding:6px;border-radius:8px}
.c4-col{display:flex;flex-direction:column;gap:4px;cursor:pointer;border-radius:6px}
.c4-col:hover,.c4-col:focus-visible{background:#fff3;outline:none}
.c4-cell{width:clamp(30px,8vw,40px);aspect-ratio:1;border-radius:50%;background:var(--paper2)}
.c4-cell.p1{background:var(--orange)}
.c4-cell.p2{background:#f4d35e}
.c4-cell.win{box-shadow:0 0 0 3px var(--ink)}
.snake-canvas{max-width:100%;height:auto;border:2px solid var(--ink);touch-action:none}
.snake-eaten{margin:0;font-size:11px;color:var(--muted)}
.snake-pad{display:flex;gap:6px}
@media(max-width:800px){.arcade{margin:30px 28px 0}}
</style>
