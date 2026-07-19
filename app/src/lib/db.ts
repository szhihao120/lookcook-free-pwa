import { openDB, type DBSchema } from 'idb'
import type { HistoryEntry, RecipeManifest, RecipePack } from '../types'

interface LookCookDB extends DBSchema {
  favorites: { key: string; value: { recipeId: string; createdAt: number } }
  history: { key: string; value: HistoryEntry; indexes: { 'by-viewedAt': number } }
  cache: { key: string; value: RecipePack | RecipeManifest | string }
}

const dbPromise = openDB<LookCookDB>('lookcook-local', 1, {
  upgrade(db) {
    db.createObjectStore('favorites', { keyPath: 'recipeId' })
    const history = db.createObjectStore('history', { keyPath: 'recipeId' })
    history.createIndex('by-viewedAt', 'viewedAt')
    db.createObjectStore('cache')
  }
})

export async function listFavoriteIds() {
  return (await (await dbPromise).getAllKeys('favorites')) as string[]
}

export async function setFavorite(recipeId: string, active: boolean) {
  const db = await dbPromise
  if (active) await db.put('favorites', { recipeId, createdAt: Date.now() })
  else await db.delete('favorites', recipeId)
}

export async function addHistory(recipeId: string) {
  const db = await dbPromise
  await db.put('history', { recipeId, viewedAt: Date.now() })
  const all = await db.getAllFromIndex('history', 'by-viewedAt')
  if (all.length > 50) {
    for (const old of all.slice(0, all.length - 50)) await db.delete('history', old.recipeId)
  }
}

export async function listHistory() {
  const entries = await (await dbPromise).getAllFromIndex('history', 'by-viewedAt')
  return entries.reverse()
}

export async function cacheData(key: string, value: RecipePack | RecipeManifest | string) {
  await (await dbPromise).put('cache', value, key)
}

export async function readCache<T>(key: string): Promise<T | undefined> {
  return (await (await dbPromise).get('cache', key)) as T | undefined
}
