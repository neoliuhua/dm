//import adapter from '@sveltejs/adapter-auto';
//auto only support some specific enviroments
// //import adapter from '@sveltejs/adapter-node';
import adapter from '@sveltejs/adapter-static';

import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	
	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter({
			pages: 'build', // 自定义输出目录
			assets: 'build',
			fallback: 'index.html' // may differ from host to host
		  }),
		  //自定义输出路径
		  paths: {
			base: '',
		  },
	},
		// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),
};

export default config;