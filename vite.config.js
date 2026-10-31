import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    build: {
        outDir: path.join(projectRoot, 'assets/build'),
        emptyOutDir: false,
        rollupOptions: {
            input: path.join(projectRoot, 'src/fluent-icons.jsx'),
            output: {
                entryFileNames: 'fluent-icons.js',
                chunkFileNames: '[name]-[hash].js',
                assetFileNames: '[name]-[hash][extname]'
            }
        }
    }
});