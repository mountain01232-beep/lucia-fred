// =====================================================================
//  セリフ表示
//   showLine(text)        … あそびの反応など、1行をすぐ表示
//   playSequence(lines)   … 複数行を「タップでつぎへ」で順番に表示（Promise）
// =====================================================================

let boxEl = null;
let textEl = null;

export function initDialogue() {
  boxEl = document.getElementById("dialogue");
  textEl = document.getElementById("dialogue-text");
}

export function showLine(text) {
  boxEl.hidden = false;
  textEl.textContent = text;
}

export function hideDialogue() {
  boxEl.hidden = true;
}

// 複数行をタップで送る。終わると resolve する。
export function playSequence(lines) {
  return new Promise((resolve) => {
    boxEl.hidden = false;
    let i = 0;

    const overlay = document.createElement("div");
    overlay.className = "tap-overlay";
    overlay.style.cssText =
      "position:fixed;inset:0;z-index:40;display:flex;align-items:flex-end;" +
      "justify-content:center;padding-bottom:18px;cursor:pointer;";
    const hint = document.createElement("div");
    hint.textContent = "▶ Tap to continue";
    hint.style.cssText =
      "background:rgba(255,61,119,.9);color:#fff;font-weight:700;" +
      "padding:8px 18px;border-radius:999px;font-size:.85rem;" +
      "animation:bob 1.4s ease-in-out infinite;";
    overlay.appendChild(hint);

    const render = () => {
      textEl.textContent = lines[i];
    };
    render();

    overlay.addEventListener("click", () => {
      i++;
      if (i >= lines.length) {
        overlay.remove();
        resolve();
      } else {
        render();
      }
    });

    document.getElementById("app").appendChild(overlay);
  });
}
