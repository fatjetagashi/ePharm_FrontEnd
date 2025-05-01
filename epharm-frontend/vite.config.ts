// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // ⬇️ makes "@/foo" point at "<project-root>/src/foo"
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
