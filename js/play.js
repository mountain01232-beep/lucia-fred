// =====================================================================
//  あそぶ処理：ボタン生成・タップ反応・メーター上昇
// =====================================================================
import { CONFIG } from "./config.js?v=2";
import { ACTIVITIES } from "./activities.js?v=2";
import { renderMeter } from "./lovemeter.js?v=2";
import { showLine } from "./dialogue.js?v=2";

let state = null;
let onChange = null;
let els = null;
let flipTimer = null; // パラパラ漫画用のタイマー

export function initPlay(gameState, onChangeCb) {
  state = gameState;
  onChange = onChangeCb;
  els = {
    actions: document.getElementById("actions"),
    lucia: document.getElementById("lucia-img"),
    video: document.getElementById("lucia-video"),
    stage: document.getElementById("lucia-stage"),
    fx: document.getElementById("fx-layer"),
  };
  buildButtons();
}

// Lucia の表情写真を差し替える（他モジュールからも使う）。動画・パラパラは止める
export function setExpression(name) {
  const src = CONFIG.photos[name] || CONFIG.photos.normal;
  stopFlip();
  stopVideo();
  els.lucia.src = src;
}

// パラパラ漫画：複数の写真を一定間隔で切り替えてアニメっぽく見せる
function showFlip(frames, interval = 320) {
  stopVideo();
  stopFlip();
  let i = 0;
  els.lucia.src = frames[0];
  flipTimer = setInterval(() => {
    i = (i + 1) % frames.length;
    els.lucia.src = frames[i];
  }, interval);
}

function stopFlip() {
  if (flipTimer) {
    clearInterval(flipTimer);
    flipTimer = null;
  }
}

// 動画を表示して再生（おもちゃ遊びなど）
function showVideo(src) {
  stopFlip();
  if (els.video.getAttribute("src") !== src) els.video.src = src;
  els.lucia.hidden = true;
  els.video.hidden = false;
  els.video.currentTime = 0;
  els.video.play().catch(() => {}); // 自動再生が弾かれても落とさない
}

function stopVideo() {
  if (!els.video.hidden) {
    els.video.pause();
    els.video.hidden = true;
  }
  els.lucia.hidden = false;
}

// 指定した写真を表示（動画・パラパラは止める）
function showPhotoSrc(src) {
  stopFlip();
  stopVideo();
  els.lucia.src = src;
}

// その遊びで見せるメディアを1つ選ぶ（media配列があればランダム、なければ video/photo）
function pickMedia(a) {
  let list = a.media;
  if (!list) {
    if (a.video) list = [{ video: a.video }];
    else if (a.photo) list = [{ photo: a.photo }];
  }
  if (!list || !list.length) return null;
  return list[Math.floor(Math.random() * list.length)];
}

export function reactAnim() {
  els.stage.classList.remove("lucia-react");
  void els.stage.offsetWidth;
  els.stage.classList.add("lucia-react");
}

function buildButtons() {
  els.actions.innerHTML = "";
  ACTIVITIES.forEach((a) => {
    const b = document.createElement("button");
    b.className = "action-btn";
    b.textContent = a.label;
    b.addEventListener("click", () => doPlay(a));
    els.actions.appendChild(b);
  });
}

// 上昇は一律 +5%。gain が 0 の遊び（様子を伺う）は増減なし、
// マイナスの遊び（何もしてあげない）はその値のまま下がる。
function gainFor(a) {
  if (a.gain <= 0) return a.gain;
  return 5;
}

function doPlay(a) {
  if (state.revealed) return; // 200%演出後は操作ロック

  const g = gainFor(a);
  state.playCounts[a.id] = (state.playCounts[a.id] || 0) + 1;
  // 100%（スタート値）を下回らず、200%（ゴール）を超えない
  state.love = Math.max(CONFIG.startLove, Math.min(CONFIG.goalLove, state.love + g));

  if (a.flip) {
    showFlip(a.flip, a.flipInterval);
  } else {
    const m = pickMedia(a);
    if (m && m.video) showVideo(m.video);
    else if (m && m.photo) showPhotoSrc(m.photo);
    else setExpression(a.expression);
  }
  reactAnim();

  const line = a.lines[Math.floor(Math.random() * a.lines.length)];
  let suffix = "";
  if (g > 0) suffix = `　(Like +${g}%)`;
  else if (g < 0) suffix = `　(Like ${g}%)`;
  showLine(`${line}${suffix}`);

  const FX = { toy: "🧸", paw: "🐾", nap: "💤", sleep: "💤", sad: "💧", chair: "💕" };
  spawnHearts(FX[a.special] || "💗");
  renderMeter(state.love, { pop: true });

  onChange(); // セーブ＋しきい値チェック（main.js）
}

function spawnHearts(emoji) {
  for (let n = 0; n < 4; n++) {
    const s = document.createElement("span");
    s.className = "fx";
    s.textContent = emoji;
    s.style.left = 20 + Math.random() * 60 + "%";
    s.style.bottom = "20%";
    s.style.animationDelay = n * 0.08 + "s";
    els.fx.appendChild(s);
    setTimeout(() => s.remove(), 1200);
  }
}
