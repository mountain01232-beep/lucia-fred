// =====================================================================
//  エンディング：メッセージ → 思い出フォトギャラリー
// =====================================================================
import { CONFIG } from "./config.js?v=2";
import { ACTIVITIES } from "./activities.js?v=2";

let els = null;
let onReplay = null;
let page = 0;
let galleryIndex = 0;
let galleryItems = []; // ゲームで使った写真・動画すべて

// このゲームで使った写真・動画をすべて集める（重複は除く）
function collectGalleryItems() {
  const seen = new Set();
  const items = [];
  const add = (src) => {
    if (src && !seen.has(src)) {
      seen.add(src);
      items.push(src);
    }
  };
  Object.values(CONFIG.photos).forEach(add); // 表情写真
  ACTIVITIES.forEach((a) => {
    if (a.video) add(a.video);
    if (a.photo) add(a.photo);
    if (a.media) a.media.forEach((m) => add(m.video || m.photo));
    if (a.flip) a.flip.forEach(add);
  });
  return items;
}

export function initEnding(onReplayCb) {
  onReplay = onReplayCb;
  els = {
    img: document.getElementById("ending-img"),
    video: document.getElementById("ending-video"),
    text: document.getElementById("ending-text"),
    next: document.getElementById("btn-ending-next"),
    gallery: document.getElementById("gallery"),
    galleryHeading: document.getElementById("gallery-heading"),
    galleryFrame: document.querySelector(".gallery-frame"),
    galleryCounter: document.getElementById("gallery-counter"),
    prev: document.getElementById("gallery-prev"),
    nextG: document.getElementById("gallery-next"),
    replay: document.getElementById("btn-replay"),
  };

  els.next.addEventListener("click", advanceMessage);
  els.prev.addEventListener("click", () => moveGallery(-1));
  els.nextG.addEventListener("click", () => moveGallery(1));
  els.replay.addEventListener("click", () => onReplay && onReplay());
  els.replay.textContent = CONFIG.ending.replayButton;
}

export function startEnding() {
  page = 0;
  galleryIndex = 0;
  galleryItems = collectGalleryItems();
  // Fred へメッセージを語る Lucia の表示（動画 or 静止画）
  if (CONFIG.ending.video) {
    els.img.hidden = true;
    els.video.hidden = false;
    if (els.video.getAttribute("src") !== CONFIG.ending.video) {
      els.video.src = CONFIG.ending.video;
    }
    els.video.currentTime = 0;
    els.video.play().catch(() => {});
  } else {
    // 静止画で表示（動画は隠す）
    els.video.hidden = true;
    els.img.hidden = false;
    els.img.src = CONFIG.ending.photo || CONFIG.photos[CONFIG.ending.expression] || CONFIG.photos.love;
  }
  els.gallery.hidden = true;
  els.next.hidden = false;
  showMessage();
  confetti();
}

function showMessage() {
  els.text.textContent = CONFIG.ending.message[page];
}

function advanceMessage() {
  page++;
  if (page >= CONFIG.ending.message.length) {
    showGallery();
  } else {
    showMessage();
    confetti(14);
  }
}

function showGallery() {
  els.next.hidden = true;
  els.galleryHeading.textContent = CONFIG.ending.galleryHeading;
  els.gallery.hidden = false;
  renderGallery();
}

function renderGallery() {
  const src = galleryItems[galleryIndex];
  els.galleryFrame.innerHTML = "";
  let node;
  if (/\.(mp4|webm|mov)$/i.test(src)) {
    node = document.createElement("video");
    node.src = src;
    node.controls = true;
    node.playsInline = true;
    node.autoplay = true;
    node.loop = true;
  } else {
    node = document.createElement("img");
    node.src = src;
    node.alt = "memory";
  }
  els.galleryFrame.appendChild(node);
  els.galleryCounter.textContent = `${galleryIndex + 1} / ${galleryItems.length}`;
}

function moveGallery(dir) {
  const len = galleryItems.length;
  galleryIndex = (galleryIndex + dir + len) % len;
  renderGallery();
}

// 紙吹雪
export function confetti(count = 40) {
  const colors = ["#ff6fa5", "#ffce4d", "#7ad0ff", "#9be88a", "#c79bff"];
  for (let i = 0; i < count; i++) {
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = Math.random() * 100 + "vw";
    c.style.background = colors[i % colors.length];
    c.style.animationDuration = 2.5 + Math.random() * 2 + "s";
    c.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 5000);
  }
}
