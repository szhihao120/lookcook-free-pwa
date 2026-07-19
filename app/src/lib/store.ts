import { computed, reactive } from 'vue'
import type { HistoryEntry, Recipe, RecipeManifest, RecipePack } from '../types'
import { fetchManifest, fetchRecipePack } from './data'
import { cacheData, listFavoriteIds, listHistory, readCache, setFavorite } from './db'

const state = reactive({
  recipes: [] as Recipe[],
  manifest: null as RecipeManifest | null,
  favorites: [] as string[],
  history: [] as HistoryEntry[],
  selectedIngredients: [] as string[],
  loading: true,
  error: '',
  dataSource: 'network' as 'network' | 'device-cache',
  lastCheckedAt: 0
})

async function load() {
  state.loading = true
  state.error = ''
  try {
    const manifest = await fetchManifest()
    const pack = await fetchRecipePack(manifest)
    state.manifest = manifest
    state.recipes = pack.recipes
    await cacheData('manifest', manifest)
    await cacheData('recipe-pack', pack)
    state.dataSource = 'network'
  } catch (error) {
    const pack = await readCache<RecipePack>('recipe-pack')
    const manifest = await readCache<RecipeManifest>('manifest')
    if (!pack || !manifest) throw error
    state.recipes = pack.recipes
    state.manifest = manifest
    state.dataSource = 'device-cache'
    state.error = '当前离线，已使用设备中的菜谱。'
  } finally {
    state.favorites = await listFavoriteIds()
    state.history = await listHistory()
    state.loading = false
  }
}

async function toggleFavorite(id: string) {
  const active = !state.favorites.includes(id)
  await setFavorite(id, active)
  state.favorites = await listFavoriteIds()
}

async function refreshHistory() {
  state.history = await listHistory()
}

async function checkForUpdates() {
  const current = state.manifest?.dataVersion
  const next = await fetchManifest(true)
  state.lastCheckedAt = Date.now()
  if (next.dataVersion === current) return false
  const pack = await fetchRecipePack(next)
  state.manifest = next
  state.recipes = pack.recipes
  await cacheData('manifest', next)
  await cacheData('recipe-pack', pack)
  return true
}

export function useRecipeStore() {
  return {
    state,
    favoriteRecipes: computed(() => state.recipes.filter((recipe) => state.favorites.includes(recipe.id))),
    historyRecipes: computed(() => state.history.map((entry) => state.recipes.find((recipe) => recipe.id === entry.recipeId)).filter(Boolean) as Recipe[]),
    load,
    toggleFavorite,
    refreshHistory,
    checkForUpdates,
    setSelectedIngredients(items: string[]) {
      state.selectedIngredients = items
    }
  }
}
