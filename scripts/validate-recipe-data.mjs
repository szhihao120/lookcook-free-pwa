import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const pack = JSON.parse(await readFile(path.join(root, 'recipe-data', 'dist', 'recipes.v1.json'), 'utf8'))
const errors = []
const ids = new Set()
const required = ['id', 'title', 'summary', 'pinyin', 'initials', 'ingredients', 'steps', 'author', 'source', 'license', 'copyrightStatus', 'reviewStatus']

if (pack.count < 20 || pack.count > 30) errors.push(`P0 样例数量应为 20-30，当前为 ${pack.count}`)
for (const recipe of pack.recipes) {
  for (const field of required) if (!recipe[field] || recipe[field].length === 0) errors.push(`${recipe.id || 'unknown'} 缺少 ${field}`)
  if (ids.has(recipe.id)) errors.push(`重复 id: ${recipe.id}`)
  ids.add(recipe.id)
  if (recipe.ingredients.some((item) => typeof item.amount !== 'number' || item.amount <= 0)) errors.push(`${recipe.id} 食材用量无效`)
  if (recipe.steps.length < 3) errors.push(`${recipe.id} 步骤不足 3 条`)
  if (!recipe.coverImage.startsWith('covers/')) errors.push(`${recipe.id} 封面路径无效`)
}

if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}
console.log(`Validated ${pack.count} recipes: schema, provenance, amounts and steps are complete.`)
