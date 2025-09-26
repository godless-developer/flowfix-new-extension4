// esbuild.config.mjs
import { build } from "esbuild";

const mode = process.argv[2] ?? "prod";
const isDev = mode === "dev";

await build({
  entryPoints: ["src/pages/index.tsx"],
  outfile: "content.bundle.js",
  bundle: true,
  platform: "browser",
  format: "iife",
  globalName: "mfound",
  minify: !isDev,
  sourcemap: isDev,
  inject: ["./esbuild.react-shim.js"],
  define: {
    __DEV__: JSON.stringify(isDev),
    "process.env.NODE_ENV": JSON.stringify(
      isDev ? "development" : "production"
    ),
    "process.env.API_BASE_URL": JSON.stringify(
      "https://flowfix-local-backend.onrender.com"
    ),
  },
});

console.log(`Built (${isDev ? "dev" : "prod"})`);
