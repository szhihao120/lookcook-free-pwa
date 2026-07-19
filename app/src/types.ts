export interface Ingredient {
  name: string
  amount: number
  unit: string
  note?: string
}

export interface RecipeStep {
  order: number
  title: string
  text: string
  image: string
}

export interface Recipe {
  schemaVersion: number
  id: string
  title: string
  aliases: string[]
  pinyin: string
  initials: string
  emoji: string
  colors: [string, string]
  summary: string
  tags: string[]
  nutritionTags: string[]
  time: number
  difficulty: string
  servings: number
  ingredients: Ingredient[]
  steps: RecipeStep[]
  author: string
  source: string
  license: string
  copyrightStatus: string
  reviewStatus: string
  coverImage: string
  updatedAt: string
}

export interface RecipePack {
  schemaVersion: number
  dataVersion: string
  generatedAt: string
  license: string
  count: number
  recipes: Recipe[]
}

export interface RecipeManifest {
  schemaVersion: number
  dataVersion: string
  generatedAt: string
  minimumAppVersion: string
  count: number
  packs: Array<{ id: string; url: string; sha256: string; bytes: number; required: boolean }>
  searchIndex: { url: string }
  notices: string[]
}

export interface HistoryEntry {
  recipeId: string
  viewedAt: number
}

export interface Recommendation {
  recipe: Recipe
  score: number
  matched: string[]
  missing: string[]
}
