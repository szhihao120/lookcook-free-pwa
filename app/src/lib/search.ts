import type { Recipe, Recommendation } from '../types'

const normalize = (value: string) => value.toLowerCase().replace(/[\s·,，。.!！?？_-]/g, '')

export function searchRecipes(recipes: Recipe[], query: string): Recipe[] {
  const needle = normalize(query)
  if (!needle) return recipes
  return recipes
    .map((recipe) => {
      const fields = [
        recipe.title,
        ...recipe.aliases,
        recipe.pinyin,
        recipe.initials,
        recipe.summary,
        ...recipe.tags,
        ...recipe.ingredients.map((item) => item.name)
      ].map(normalize)
      const exactTitle = normalize(recipe.title) === needle ? 100 : 0
      const starts = fields.some((field) => field.startsWith(needle)) ? 40 : 0
      const includes = fields.filter((field) => field.includes(needle)).length * 8
      return { recipe, score: exactTitle + starts + includes }
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.recipe.time - b.recipe.time)
    .map((item) => item.recipe)
}

export function recommendRecipes(recipes: Recipe[], selected: string[]): Recommendation[] {
  const pantry = new Set(selected.map(normalize))
  if (!pantry.size) return []
  return recipes
    .map((recipe) => {
      const core = recipe.ingredients
        .map((item) => item.name)
        .filter((name) => !['食用油', '盐', '白糖', '清水', '生抽', '老抽', '淀粉', '香油', '黑胡椒'].includes(name))
      const matched = core.filter((name) => pantry.has(normalize(name)))
      const missing = core.filter((name) => !pantry.has(normalize(name)))
      const coverage = matched.length / Math.max(core.length, 1)
      const score = Math.round(coverage * 80 + matched.length * 12 - missing.length * 2 - recipe.time * 0.05)
      return { recipe, score, matched, missing }
    })
    .filter((item) => item.matched.length > 0)
    .sort((a, b) => b.score - a.score || a.missing.length - b.missing.length)
}

export function scaleAmount(amount: number, baseServings: number, targetServings: number) {
  const value = amount * targetServings / baseServings
  if (value < 10) return Math.round(value * 10) / 10
  return Math.round(value)
}
