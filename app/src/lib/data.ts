import type { RecipeManifest, RecipePack } from '../types'
import { withBase } from './paths'

export async function fetchManifest(cacheBust = false): Promise<RecipeManifest> {
  const suffix = cacheBust ? `?t=${Date.now()}` : ''
  const response = await fetch(`${withBase('data/manifest.json')}${suffix}`, { cache: cacheBust ? 'no-store' : 'default' })
  if (!response.ok) throw new Error(`菜谱清单加载失败：${response.status}`)
  return response.json()
}

export async function fetchRecipePack(manifest: RecipeManifest): Promise<RecipePack> {
  const pack = manifest.packs.find((item) => item.required) ?? manifest.packs[0]
  if (!pack) throw new Error('菜谱清单中没有可用数据包')
  const response = await fetch(withBase(`data/${pack.url}`))
  if (!response.ok) throw new Error(`菜谱包加载失败：${response.status}`)
  const data: RecipePack = await response.json()
  if (data.dataVersion !== manifest.dataVersion || data.count !== data.recipes.length) {
    throw new Error('菜谱包版本或数量校验失败')
  }
  return data
}
