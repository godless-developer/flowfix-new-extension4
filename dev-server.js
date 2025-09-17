const WebSocket = require("ws");
const chokidar = require("chokidar");

let PORT = 4444;

function startServer(port) {
  try {
    const wss = new WebSocket.Server({ port });
    console.log(`Dev server listening ws://localhost:${port}`);

    function broadcast(msg) {
      wss.clients.forEach((c) => {
        if (c.readyState === WebSocket.OPEN) c.send(msg);
      });
    }

    const watcher = chokidar.watch("./dist", { ignoreInitial: true });
    watcher.on("change", (path) => {
      console.log("File changed:", path);
      broadcast("reload");
    });
  } catch (err) {
    if (err.code === "EADDRINUSE") {
      console.warn(`Port ${port} in use, retrying on ${port + 1}...`);
      startServer(port + 1);
    } else {
      throw err;
    }
  }
}

startServer(PORT);
