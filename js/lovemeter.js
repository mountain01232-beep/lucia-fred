// =====================================================================
//  ラブメーター（100% → 200%）の表示
// =====================================================================
import { CONFIG } from "./config.js?v=3";

let els = null;

export function initMeter() {
  els = {
    value: document.getElementById("meter-value"),
    fill: document.getElementById("meter-fill"),
    heart: document.getElementById("meter-heart"),
    name: document.querySelector(".meter-name"),
  };
  els.name.textContent = CONFIG.dogName;
}

export function renderMeter(love, { pop = false } = {}) {
  const span = CONFIG.goalLove - CONFIG.startLove;
  const pct = Math.max(0, Math.min(100, ((love - CONFIG.startLove) / span) * 100));
  els.fill.style.width = pct + "%";
  els.heart.style.left = pct + "%";
  els.value.textContent = Math.round(love) + "%";
  if (pop) {
    els.heart.classList.remove("meter-pop");
    void els.heart.offsetWidth; // リフロー強制でアニメ再生
    els.heart.classList.add("meter-pop");
  }
}
