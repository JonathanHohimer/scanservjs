import { defineConfig } from "vite";
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import path from "path";
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { VitePWA } from 'vite-plugin-pwa'
import packageJson from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  server: {
    proxy: {
      '/api': 'http://localhost:8080',
      '/api-docs': 'http://localhost:8080',
    }
  },
  plugins: [
    vue(),
    vuetify(),
    VueI18nPlugin({
      include: [path.resolve(__dirname, './src/locales/**')],
      compositionOnly: false
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'icons/*.png'],
      manifest: {
        name: 'scanservjs',
        short_name: 'scanservjs',
        description: 'SANE scanner nodejs web ui',
        display: 'standalone',
        scope: '/',
        start_url: '/#/scan',
        background_color: '#FFFFFF',
        theme_color: '#2196F3',
        icons: [
          { src: '/icons/android-chrome-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/icons/android-chrome-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: '/icons/android-chrome-maskable-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
          { src: '/icons/android-chrome-maskable-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        navigateFallback: null
      }
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true
      },
    }
  },
  define: {
    __PACKAGE_VERSION__: JSON.stringify(packageJson.version)
  },
});
