import { expect, test } from '@playwright/test'

test('search, recommend, details, favorite and history work', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: /家里有什么/ })).toBeVisible()
  await page.getByRole('searchbox', { name: '搜索菜谱' }).fill('fqcd')
  await expect(page.getByRole('heading', { name: '番茄炒蛋' })).toBeVisible()

  await page.goto('/#/ingredients')
  await page.getByRole('button', { name: /番茄/ }).click()
  await page.getByRole('button', { name: /鸡蛋/ }).click()
  await page.getByRole('button', { name: /看看能做什么/ }).click()
  await expect(page.getByText(/已有 2 种 · 还缺 1 种/).first()).toBeVisible()
  await page.getByRole('heading', { name: '番茄炒蛋' }).click()
  await expect(page.getByRole('heading', { name: '食材清单' })).toBeVisible()
  await page.getByRole('button', { name: '收藏' }).click()
  await page.goto('/#/library')
  await expect(page.getByRole('heading', { name: '番茄炒蛋' })).toBeVisible()
})

test('manifest and service worker assets are published', async ({ request }) => {
  expect((await request.get('/manifest.webmanifest')).ok()).toBeTruthy()
  expect((await request.get('/data/manifest.json')).ok()).toBeTruthy()
  const sw = await request.get('/sw.js')
  expect(sw.ok()).toBeTruthy()
})
