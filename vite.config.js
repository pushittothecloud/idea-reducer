import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// For GitHub Pages project site
var base = process.env.GITHUB_PAGES
    ? '/idea-reducer/'
    : '/';
export default defineConfig({
    plugins: [react()],
    base: base,
});
