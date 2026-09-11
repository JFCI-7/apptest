import { fileURLToPath } from 'node:url';
import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.js';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'happy-dom',
      include: ['src/**/*.test.ts'],
      root: fileURLToPath(new URL('./', import.meta.url)),
    },
  }),
);
