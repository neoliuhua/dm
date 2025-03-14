import path from 'path';
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [sveltekit(), tailwindcss()],
  // prevent vite from obscuring rust errors
  clearScreen: false,
  server: {
    fs: {
      allow: ['..']
    },
    port: 3000,
    // Tauri expects a fixed port, fail if that port is not available
    strictPort: true,
    // if the host Tauri is expecting is set, use it
    host: process.env.TAURI_DEV_HOST || false,
    hmr: process.env.TAURI_DEV_HOST
      ? {
          protocol: 'ws',
          host: process.env.TAURI_DEV_HOST,
          port: 3000,
        }
      : undefined,

    watch: {
      // tell vite to ignore watching `src-tauri`
      ignored: ['**/src-tauri/**',"**/node_modules/**"],
    },
  },
  resolve: {
    alias: {
      // 可选：创建别名方便导入
      '~static': path.resolve(__dirname, './static')
    }
  },
  // Env variables starting with the item of `envPrefix` will be exposed in tauri's source code through `import.meta.env`.
  envPrefix: ['VITE_', 'TAURI_ENV_*'],
  build: {
   // outDir: '../build', // Output files to the build folder as specified in tauri.conf.json
    // Tauri uses Chromium on Windows and WebKit on macOS and Linux
    target:
      process.env.TAURI_ENV_PLATFORM == 'windows'
        ? 'chrome110'
        : 'safari14',
    // don't minify for debug builds
    minify: !process.env.TAURI_ENV_DEBUG ? 'esbuild' : false,
    // produce sourcemaps for debug builds
    sourcemap: !!process.env.TAURI_ENV_DEBUG,
  },
});
