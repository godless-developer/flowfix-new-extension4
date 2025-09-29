import { build } from "esbuild";
import * as dotenv from "dotenv";

// 🟢 .env унших
dotenv.config();

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

    // 🟢 .env утгуудыг compile үе дээр орлуулна
    "process.env.NEXT_PUBLIC_API_BASE_URL": JSON.stringify(
      process.env.NEXT_PUBLIC_API_BASE_URL
    ),
    "process.env.NEXT_PUBLIC_OPENAI_KEY": JSON.stringify(
      process.env.NEXT_PUBLIC_OPENAI_KEY
    ),
  },
});

console.log(`Built (${isDev ? "dev" : "prod"})`);
