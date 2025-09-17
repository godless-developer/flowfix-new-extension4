(function () {
  try {
    const ws = new WebSocket("ws://localhost:4000");
    ws.addEventListener("message", (e) => {
      if (e.data === "reload") {
        console.log("[DEV] Reloading page...");
        window.location.reload();
      }
    });
  } catch (err) {
    console.error("[DEV] LiveReload error:", err);
  }
})();
