import { describe, expect, it } from 'vitest'
import { recommendRecipes, scaleAmount, searchRecipes } from '../../src/lib/search'
import type { Recipe } from '../../src/types'

const recipe = (partial: Partial<Recipe>): Recipe => ({
  schemaVersion: 1,
  id: 'tomato-eggs',
  title: '番茄炒蛋',
  aliases: ['西红柿炒鸡蛋'],
  pinyin: 'fanqiechaodan',
  initials: 'fqcd',
  emoji: '🍅',
  colors: ['#f00', '#ff0'],
  summary: '酸甜下饭的家常菜',
  tags: ['快手'],
  nutritionTags: ['含优质蛋白'],
  time: 12,
  difficulty: '简单',
  servings: 2,
  ingredients: [
    { name: '番茄', amount: 2, unit: '个' },
    { name: '鸡蛋', amount: 3, unit: '个' },
    { name: '盐', amount: 2, unit: '克' }
  ],
  steps: [
    { order: 1, title: '准备', text: '准备食材', image: 'cover.svg' },
    { order: 2, title: '炒制', text: '炒熟鸡蛋', image: 'cover.svg' },
    { order: 3, title: '完成', text: '混合出锅', image: 'cover.svg' }
  ],
  author: 'LookCook',
  source: 'original',
  license: 'CC-BY-4.0',
  copyrightStatus: 'original',
  reviewStatus: 'reviewed',
  coverImage: 'cover.svg',
  updatedAt: '2026-07-19T00:00:00Z',
  ...partial
})

describe('recipe search', () => {
  const recipes = [
    recipe({}),
    recipe({ id: 'potato', title: '青椒土豆丝', aliases: [], pinyin: 'qingjiaotudousi', initials: 'qjtds', ingredients: [{ name: '土豆', amount: 2, unit: '个' }, { name: '青椒', amount: 1, unit: '个' }] })
  ]

  it('matches Chinese recipe names and aliases', () => {
    expect(searchRecipes(recipes, '西红柿')[0]?.id).toBe('tomato-eggs')
  })

  it('matches full pinyin and initials', () => {
    expect(searchRecipes(recipes, 'fanqie')[0]?.id).toBe('tomato-eggs')
    expect(searchRecipes(recipes, 'qjtds')[0]?.id).toBe('potato')
  })

  it('matches ingredients', () => {
    expect(searchRecipes(recipes, '土豆')[0]?.id).toBe('potato')
  })
})

describe('ingredient recommendation', () => {
  it('ranks recipes by matched core ingredients', () => {
    const result = recommendRecipes([recipe({})], ['番茄', '鸡蛋'])
    expect(result[0].matched).toEqual(['番茄', '鸡蛋'])
    expect(result[0].missing).toEqual([])
  })
})

describe('serving scaling', () => {
  it('scales and rounds friendly quantities', () => {
    expect(scaleAmount(3, 2, 4)).toBe(6)
    expect(scaleAmount(15, 2, 3)).toBe(23)
  })
})
