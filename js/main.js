// =====================================================================
//  Lucia のラブメーター大作戦 — エントリポイント
//  タイトル → あそぶ → （150%イベント）→ 200%演出 → エンディング
// =====================================================================
import { CONFIG } from "./config.js?v=4";
import { loadState, saveState, clearState, defaultState } from "./save.js?v=4";
import { initMeter, renderMeter } from "./lovemeter.js?v=4";
import { initDialogue, playSequence, hideDialogue } from "./dialogue.js?v=4";
import { initPlay, setExpression, reactAnim } from "./play.js?v=4";
import { nextEvent } from "./story.js?v=4";
import { initEnding, startEnding, confetti } from "./ending.js?v=4";

// 毎回ページを開いたら最初から（ラブメーター100%スタート）にする
clearState();
let state = defaultState();
let busy = false; // イベント再生中は多重発火を防ぐ

document.addEventListener("DOMContentLoaded", init);

function init() {
  initMeter();
  initDialogue();
  initPlay(state, onPlay);
  initEnding(handleReplay);
  setupTitle();
}

// ---------- 画面切り替え ----------
function showScreen(id) {
  document.querySelectorAll(".screen").forEach((s) => {
    s.classList.toggle("is-active", s.id === id);
  });
}

// ---------- タイトル ----------
function setupTitle() {
  document.getElementById("title-heading").textContent = CONFIG.title.heading;
  document.getElementById("title-sub").textContent = CONFIG.title.subheading;
  document.getElementById("title-intro").textContent = CONFIG.title.intro;
  document.getElementById("title-img").src = CONFIG.photos.happy;
  const startBtn = document.getElementById("btn-start");
  startBtn.textContent = CONFIG.title.startButton;
  startBtn.addEventListener("click", startGame);
  // 毎回開くたびに最初から始まるので「Start over」ボタンは常に非表示
  document.getElementById("btn-reset").hidden = true;
}

// ---------- あそぶ開始 ----------
function startGame() {
  // すでにクリア済みのセーブならエンディングへ
  if (state.revealed) {
    showScreen("screen-ending");
    startEnding();
    return;
  }
  showScreen("screen-game");
  setExpression("normal");
  reactAnim();
  renderMeter(state.love);
}

// ---------- あそぶたびに呼ばれる（play.js から） ----------
function onPlay() {
  saveState(state);
  if (busy) return;
  const ev = nextEvent(state);
  if (ev === "mid") runMidEvent();
  else if (ev === "reveal") runReveal();
}

// ---------- 中盤イベント（150%） ----------
async function runMidEvent() {
  busy = true;
  state.midEventShown = true;
  saveState(state);
  setExpression(CONFIG.midEvent.expression);
  reactAnim();
  await playSequence(CONFIG.midEvent.lines);
  hideDialogue();
  busy = false;
  // イベント中に 200% へ達していたら続けて発火
  if (nextEvent(state) === "reveal") runReveal();
}

// ---------- 200%到達 → 喋れるようになる演出 ----------
async function runReveal() {
  busy = true;
  state.revealed = true;
  saveState(state);
  confetti();
  setExpression(CONFIG.reveal.expression);
  reactAnim();
  await playSequence(CONFIG.reveal.lines);
  hideDialogue();
  busy = false;
  showScreen("screen-ending");
  startEnding();
}

// ---------- もういちど遊ぶ ----------
function handleReplay() {
  clearState();
  state = Object.assign(state, defaultState());
  hideDialogue();
  showScreen("screen-game");
  setExpression("normal");
  renderMeter(state.love);
}
