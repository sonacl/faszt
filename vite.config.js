import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { copyFileSync } from 'fs'

export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'copy-speedtest-files',
      closeBundle() {
        copyFileSync('speedtest.js', 'dist/speedtest.js')
        copyFileSync('speedtest_worker.js', 'dist/speedtest_worker.js')
      },
    },
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  css: {
    postcss: './postcss.config.js',
  },
  publicDir: false,
})
