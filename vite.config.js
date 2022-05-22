import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import nodePolyfills from 'rollup-plugin-polyfill-node';
const production = process.env.NODE_ENV === 'production';

export default defineConfig({
  plugins: [
    vue({
      script: {
        refSugar: true,
      },
    }),
     // ↓ Needed for development mode
     !production && nodePolyfills({
      include: ['node_modules/**/*.js', new RegExp('node_modules/.vite/.*js')]
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    open: true,
  },
  build: {
    rollupOptions: {
      plugins: [
        // ↓ Needed for build
        nodePolyfills()
      ]
    },
    // ↓ Needed for build if using WalletConnect and other providers
    commonjsOptions: {
      transformMixedEsModules: true
    }
  }
})
