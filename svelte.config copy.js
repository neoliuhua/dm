// Tauri doesn't have a Node.js server to do proper SSR
// so we will use adapter-static to prerender the app (SSG)
// See: https://v2.tauri.app/start/frontend/sveltekit/ for more info
//import adapter from "@sveltejs/adapter-static";
// see: https://github.com/gornostay25/svelte-adapter-bun for more info
import adapter from "svelte-adapter-bun";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      out: "build",
      assets: true,
     // envPrefix: "MY_CUSTOM_",
      development: true,
      // precompress: true,
      precompress: {
        brotli: true,
        gzip: true,
        files: ["htm", "html"],
      },
      dynamic_origin: true,
      xff_depth: 1,
    }),
		  },
};

export default config;