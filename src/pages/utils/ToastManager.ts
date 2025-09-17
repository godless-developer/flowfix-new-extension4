export function initToast(shadow: ShadowRoot) {
  const style = document.createElement("style");
  style.textContent = `
    .cf-toast {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      min-width: 260px;
      max-width: 360px;
      padding: 12px 14px;
      border-radius: 12px;
      // background: white;
      background: linear-gradient(to bottom left, #101522 55%, #492E6D);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      font-family: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
      opacity: 0;
      transform: translateY(-20px); /* 👈 доороос биш дээшээс гарч ирэх */
      transition: all 0.25s ease;
      pointer-events: auto;
      position: relative;
      color: white;
    }

    .cf-toast.show {
      opacity: 1;
      transform: translateY(0);
    }

    .cf-icon {
      flex-shrink: 0;
      font-size: 18px;
      font-weight: bold;
      font-family: sans-serif;
      line-height: 1;
      padding-top:14px;
    }

    .cf-body {
      flex-grow: 1;
    }

    .cf-title {
      font-size: 14px;
      font-weight: 600;
      font-family: "Inter", sans-serif;
      margin-bottom: 4px;
      color: #ffffffff;
    }

    .cf-text {
      font-size: 13px;
      font-family: "Inter", sans-serif;
      color: #a1a1a1ff;
    }

    .cf-close {
      background: none;
      border: none;
      font-size: 14px;
      color: #a1a1a1ff;
      cursor: pointer;
      position: absolute;
      top: 6px;
      right: 6px;
      transition: color 0.2s;
    }

    .cf-close:hover {
      color: #111;
    }

    .cf-toast.type-success {
      border-left: 8px solid #16a34a;
    }

    .cf-toast.type-error {
      border-left: 8px solid #dc2626;
    }

    .cf-toast.type-info {
      border-left: 8px solid #2563eb;
    }
  `;
  shadow.appendChild(style);

  const toastRoot = document.createElement("div");
  toastRoot.id = "cf-toasts-root";
  toastRoot.style.cssText = `
    position: fixed;
    top: 24px;          /* 👈 доороос биш дээрээс */
    right: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    z-index: 2147483647;
  `;
  shadow.appendChild(toastRoot);

  (shadow as any).showToast = function (
    msg: string,
    options: {
      title?: string;
      type?: "success" | "error" | "info";
      duration?: number;
    } = {}
  ) {
    const { title = "", type = "success", duration = 3000 } = options;
    const toast = document.createElement("div");
    toast.className = `cf-toast type-${type}`;
    toast.innerHTML = `
      <div class="cf-icon">${
        type === "success" ? "✓" : type === "error" ? "✕" : "i"
      }</div>
      <div class="cf-body">
        <div class="cf-title">${title}</div>
        <div class="cf-text">${msg}</div>
      </div>
      <button class="cf-close">✕</button>
    `;
    toastRoot.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add("show"));

    toast
      .querySelector(".cf-close")
      ?.addEventListener("click", () => hideToast(toast));

    if (duration > 0) setTimeout(() => hideToast(toast), duration);

    function hideToast(el: HTMLElement) {
      el.classList.remove("show");
      el.addEventListener("transitionend", () => el.remove(), { once: true });
    }
  };
}
