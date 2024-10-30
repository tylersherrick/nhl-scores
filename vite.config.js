// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/nhl-scores/', // replace 'your-repo-name' with your actual GitHub repo name
});
