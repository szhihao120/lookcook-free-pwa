import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  outputDir: '../reports/evidence/playwright-results',
  reporter: [['list'], ['html', { outputFolder: '../reports/evidence/playwright-report', open: 'never' }]],
  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  webServer: {
    command: 'pnpm preview --host 127.0.0.1',
    port: 4173,
    reuseExistingServer: true
  },
  projects: [
    { name: 'mobile-360', use: { viewport: { width: 360, height: 800 }, isMobile: true, hasTouch: true } },
    { name: 'mobile-390', use: { ...devices['iPhone 13'] } },
    { name: 'mobile-430', use: { viewport: { width: 430, height: 932 }, isMobile: true, hasTouch: true } },
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } }
  ]
})
