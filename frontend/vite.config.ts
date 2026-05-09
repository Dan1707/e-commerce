import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

export default defineConfig({
	plugins: [vue(), vueDevTools(), tailwindcss()],
	resolve: {
		alias: [
			{
				find: '@/components',
				replacement: path.resolve(__dirname, 'src/shared/components'),
			},
			{
				find: '@/ui',
				replacement: path.resolve(__dirname, 'src/shared/components/ui'),
			},
			{
				find: '@/utils',
				replacement: path.resolve(__dirname, 'src/shared/lib/utils'),
			},
			{ find: '@/lib', replacement: path.resolve(__dirname, 'src/shared/lib') },
			{
				find: '@/composables',
				replacement: path.resolve(__dirname, 'src/shared/composables'),
			},
			{
				find: '@/types',
				replacement: path.resolve(__dirname, 'src/shared/types'),
			},
			{
				find: '@/api',
				replacement: path.resolve(__dirname, 'src/shared/api'),
			},
			{ find: '@', replacement: path.resolve(__dirname, 'src') },
		],
	},
})
