import { sentryVitePlugin } from '@sentry/vite-plugin';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	return {
		plugins: [
			react(),
			basicSsl(),
			sentryVitePlugin({
				org: 'ast-cosnulting-b3036321f',
				project: 'javascript-react'
			})
		],

		server: {
			proxy: {
				'/api': {
					target: 'http://localhost:8080',
					changeOrigin: true
				}
			}
		},

		resolve: {
			alias: {
				'@app': path.resolve(__dirname, './src'),
				'@image': path.resolve(__dirname, './src/components/image-stock'),
				'@store': path.resolve(__dirname, './src/store'),
				'@components': path.resolve(__dirname, './src/components'),
				'@modules': path.resolve(__dirname, './src/modules'),
				'@pages': path.resolve(__dirname, './src/pages'),
				'@utils': path.resolve(__dirname, './src/utils'),
				'@bootstrap': path.resolve(__dirname, 'node_modules/bootstrap')
			}
		},

		build: {
			sourcemap: true
		}
	};
});
