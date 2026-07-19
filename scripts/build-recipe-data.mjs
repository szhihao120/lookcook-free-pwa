import { createHash } from 'node:crypto'
import { cp, mkdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { dataVersion, recipes } from '../recipe-data/source/recipes.seed.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'recipe-data', 'dist')
const publicData = path.join(root, 'app', 'public', 'data')
const covers = path.join(root, 'assets', 'covers')
const publicCovers = path.join(root, 'app', 'public', 'covers')
const adminData = path.join(root, 'local-admin', 'public', 'data')

await rm(dist, { recursive: true, force: true })
await rm(covers, { recursive: true, force: true })
await mkdir(dist, { recursive: true })
await mkdir(covers, { recursive: true })

const expanded = recipes.map((recipe) => ({
  schemaVersion: 1,
  ...recipe,
  coverImage: `covers/${recipe.id}.svg`,
  updatedAt: '2026-07-19T00:00:00.000Z',
  steps: recipe.steps.map((text, index) => ({
    order: index + 1,
    title: ['准备食材', '开始烹饪', '完成装盘'][Math.min(index, 2)],
    text,
    image: `covers/${recipe.id}.svg`
  }))
}))

const pack = {
  schemaVersion: 1,
  dataVersion,
  generatedAt: '2026-07-19T00:00:00.000Z',
  license: 'CC-BY-4.0',
  count: expanded.length,
  recipes: expanded
}

const packText = JSON.stringify(pack, null, 2)
const sha256 = createHash('sha256').update(packText).digest('hex')
const searchIndex = {
  schemaVersion: 1,
  dataVersion,
  items: expanded.map(({ id, title, aliases, pinyin, initials, tags, ingredients, summary }) => ({
    id, title, aliases, pinyin, initials, tags, summary,
    ingredients: ingredients.map((item) => item.name)
  }))
}
const manifest = {
  schemaVersion: 1,
  dataVersion,
  generatedAt: pack.generatedAt,
  minimumAppVersion: '0.1.0',
  count: expanded.length,
  packs: [{ id: 'core-v1', url: 'recipes.v1.json', sha256, bytes: Buffer.byteLength(packText), required: true }],
  searchIndex: { url: 'search-index.v1.json' },
  notices: ['P0 原创样例数据，仅作产品原型与功能验证。']
}

await writeFile(path.join(dist, 'recipes.v1.json'), packText)
await writeFile(path.join(dist, 'search-index.v1.json'), JSON.stringify(searchIndex, null, 2))
await writeFile(path.join(dist, 'manifest.json'), JSON.stringify(manifest, null, 2))

for (const recipe of expanded) {
  const [from, to] = recipe.colors
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="640" viewBox="0 0 960 640" role="img" aria-labelledby="t d">
  <title id="t">${recipe.title}原创插画封面</title><desc id="d">LookCook 脚本生成的抽象餐盘插画</desc>
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient><filter id="s"><feDropShadow dx="0" dy="20" stdDeviation="24" flood-opacity=".18"/></filter></defs>
  <rect width="960" height="640" rx="48" fill="url(#g)"/><circle cx="785" cy="100" r="170" fill="#fff" opacity=".12"/><circle cx="110" cy="560" r="210" fill="#fff" opacity=".09"/>
  <g filter="url(#s)"><ellipse cx="480" cy="337" rx="275" ry="200" fill="#fff7e9"/><ellipse cx="480" cy="337" rx="220" ry="151" fill="${from}" opacity=".34"/><circle cx="418" cy="315" r="74" fill="${to}" opacity=".92"/><circle cx="535" cy="365" r="87" fill="${from}" opacity=".84"/><circle cx="566" cy="284" r="54" fill="#fff2b0" opacity=".8"/><path d="M354 386c85-98 186-113 282-45-64 96-194 123-282 45Z" fill="#5f9362" opacity=".72"/></g>
  <text x="64" y="86" fill="#fff" font-family="system-ui,sans-serif" font-weight="800" font-size="34">LOOKCOOK · 今日好好吃饭</text>
  <text x="64" y="582" fill="#fff" font-family="system-ui,sans-serif" font-weight="900" font-size="70">${recipe.title}</text>
</svg>`
  await writeFile(path.join(covers, `${recipe.id}.svg`), svg)
}

for (const target of [publicData, adminData]) {
  await rm(target, { recursive: true, force: true })
  await mkdir(path.dirname(target), { recursive: true })
  await cp(dist, target, { recursive: true })
}
await rm(publicCovers, { recursive: true, force: true })
await mkdir(path.dirname(publicCovers), { recursive: true })
await cp(covers, publicCovers, { recursive: true })

console.log(`Built ${expanded.length} original recipes, data version ${dataVersion}, sha256 ${sha256.slice(0, 12)}…`)
