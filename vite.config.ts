import path from 'path';
import type { ServerOptions } from 'https';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        // allow connecting from other devices on LAN when DEV_HOST is provided; otherwise enable host detection
        host: env.DEV_HOST || true,
        port: Number(env.DEV_PORT || 3000),
        // enable HTTPS in dev if explicitly requested (helps test TLS on mobile). Use a trusted tunnel for public access.
        https: env.DEV_HTTPS === 'true' ? ({} as ServerOptions) : undefined,
        // HMR config: prefer secure websocket when running https
        hmr: env.DEV_HTTPS === 'true'
          ? { protocol: 'wss', host: env.DEV_HOST || undefined }
          : { protocol: 'ws' },
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
