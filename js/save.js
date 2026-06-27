// =====================================================================
//  セーブ / ロード（localStorage）
// =====================================================================
import { CONFIG } from "./config.js?v=4";

const KEY = "lucia_love_game_v1";

export function defaultState() {
  return {
    love: CONFIG.startLove,
    playCounts: {},     // { activityId: 回数 }
    midEventShown: false,
    revealed: false,
  };
}

export function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...defaultState(), ...JSON.parse(raw) };
  } catch (e) {
    /* localStorage が使えない環境でも動くように無視 */
  }
  return defaultState();
}

export function saveState(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch (e) {
    /* 保存できなくてもプレイは続けられる */
  }
}

export function clearState() {
  try {
    localStorage.removeItem(KEY);
  } catch (e) {
    /* noop */
  }
}
