import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

const base = process.env.VITE_BASE_PATH || '/'

export default defineConfig({
  base,
  plugins: [
    vue(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png', 'covers/*.svg'],
      manifest: {
        name: 'LookCook 免费做菜助手',
        short_name: 'LookCook',
        description: '按手头食材找菜谱，不要登录，不要 API Key。',
        theme_color: '#f45d3f',
        background_color: '#fffaf2',
        display: 'standalone',
        start_url: '.',
        scope: '.',
        lang: 'zh-CN',
        orientation: 'portrait-primary',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      },
      workbox: {
        navigateFallback: 'index.html',
        globPatterns: ['**/*.{js,css,html,svg,json,woff2}'],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.includes('/data/'),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'lookcook-recipe-data',
              networkTimeoutSeconds: 3,
              expiration: { maxEntries: 12, maxAgeSeconds: 60 * 60 * 24 * 30 }
            }
          },
          {
            urlPattern: ({ url }) => url.pathname.includes('/covers/'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'lookcook-covers',
              expiration: { maxEntries: 80, maxAgeSeconds: 60 * 60 * 24 * 180 }
            }
          }
        ]
      },
      devOptions: { enabled: true }
    })
  ],
  test: {
    environment: 'node',
    include: ['tests/unit/**/*.test.ts']
  }
})
