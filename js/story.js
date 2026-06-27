// =====================================================================
//  ストーリー進行：しきい値イベントの判定
// =====================================================================
import { CONFIG } from "./config.js?v=6";

// 今どのイベントを起こすべきか返す（"reveal" / null）
// ※途中（150%）の「200%にしよう」ガイダンスは出さない。最初の説明だけにする。
export function nextEvent(state) {
  if (!state.revealed && state.love >= CONFIG.goalLove) return "reveal";
  return null;
}
