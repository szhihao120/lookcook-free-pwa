import { chromium } from '@playwright/test'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const base = process.env.LOOKCOOK_LIVE_URL
if (!base?.startsWith('https://') || !base.endsWith('/')) {
  throw new Error('LOOKCOOK_LIVE_URL must be an HTTPS URL ending with /')
}

const checks = {}
for (const endpoint of ['', 'manifest.webmanifest', 'data/manifest.json', 'sw.js']) {
  const response = await fetch(`${base}${endpoint}`, { redirect: 'follow' })
  checks[endpoint || 'index.html'] = { status: response.status, contentType: response.headers.get('content-type') }
  if (!response.ok) throw new Error(`${endpoint || 'index'} returned ${response.status}`)
}

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })
const page = await context.newPage()
await page.goto(`${base}#/recipes/tomato-scrambled-eggs`, { waitUntil: 'networkidle' })
await page.evaluate(() => navigator.serviceWorker.ready)
await page.reload({ waitUntil: 'networkidle' })
const title = await page.getByRole('heading', { name: '番茄炒蛋', level: 1 }).textContent()
const ingredientHeading = await page.getByRole('heading', { name: '食材清单' }).isVisible()
const controlled = await page.evaluate(() => Boolean(navigator.serviceWorker.controller))

const evidence = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', 'reports', 'evidence')
await mkdir(path.join(evidence, 'screenshots'), { recursive: true })
await page.screenshot({ path: path.join(evidence, 'screenshots', 'live-pages-recipe.png'), fullPage: true })
await context.close()
await browser.close()

const result = {
  checkedAt: new Date().toISOString(),
  base,
  checks,
  route: { url: `${base}#/recipes/tomato-scrambled-eggs`, title, ingredientHeading },
  serviceWorkerControlled: controlled,
  result: title === '番茄炒蛋' && ingredientHeading && controlled ? 'PASS' : 'FAIL'
}
await writeFile(path.join(evidence, 'live-pages-verification.json'), JSON.stringify(result, null, 2))
console.log(JSON.stringify(result, null, 2))
if (result.result !== 'PASS') process.exit(1)
