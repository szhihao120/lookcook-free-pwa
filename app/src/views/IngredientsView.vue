<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import PageHeader from '../components/PageHeader.vue'
import { useRecipeStore } from '../lib/store'

const store = useRecipeStore()
const router = useRouter()
const query = ref('')
const selected = ref<string[]>([...store.state.selectedIngredients])
const emojiMap: Record<string, string> = {
  番茄: '🍅', 鸡蛋: '🥚', 土豆: '🥔', 青椒: '🫑', 西兰花: '🥦', 蒜: '🧄',
  香菇: '🍄', 小青菜: '🥬', 豆腐: '◻️', 洋葱: '🧅', 胡萝卜: '🥕', 木耳: '🖤',
  芹菜: '🌿', 香干: '🟫', 黄瓜: '🥒', 鸡胸肉: '🍗', 玉米: '🌽', 排骨: '🥩',
  冬瓜: '🍈', 虾皮: '🦐', 紫菜: '🌊', 面条: '🍜', 大米: '🍚', 牛里脊: '🥩',
  虾仁: '🍤', 南瓜: '🎃', 山药: '🤍', 莲藕: '🪷', 豆角: '🫛', 白菜: '🥬'
}
const aliases: Record<string, string> = { 北豆腐: '豆腐', 鲜香菇: '香菇', 小青菜: '小青菜', 甜玉米: '玉米', 甜玉米粒: '玉米', 鸡腿肉: '鸡肉', 去骨鸡腿肉: '鸡肉', 鲜面条: '面条' }
const pantryBasics = new Set(['食用油', '盐', '白糖', '清水', '生抽', '老抽', '淀粉', '香油', '米醋', '黑胡椒', '姜', '小葱'])
const ingredients = computed(() => {
  const names = store.state.recipes.flatMap((recipe) => recipe.ingredients.map((item) => aliases[item.name] ?? item.name))
  return [...new Set(names)].filter((name) => !pantryBasics.has(name)).sort((a, b) => a.localeCompare(b, 'zh-CN'))
})
const filtered = computed(() => ingredients.value.filter((name) => name.includes(query.value.trim())))

function toggle(name: string) {
  selected.value = selected.value.includes(name) ? selected.value.filter((item) => item !== name) : [...selected.value, name]
}

function recommend() {
  store.setSelectedIngredients(selected.value)
  router.push('/recommendations')
}
</script>

<template>
  <div class="page narrow-page ingredients-page">
    <PageHeader eyebrow="STEP 1 OF 2" title="你手头有什么？" subtitle="选得越准，推荐越贴近。调味料不用选。" />
    <label class="search-box ingredient-search">
      <span>⌕</span><input v-model="query" type="search" placeholder="搜索食材" /><button v-if="query" @click="query = ''">×</button>
    </label>
    <div v-if="selected.length" class="selected-bar">
      <span>已选 {{ selected.length }} 种</span>
      <button @click="selected = []">清空</button>
      <div><button v-for="name in selected" :key="name" @click="toggle(name)">{{ name }} ×</button></div>
    </div>
    <section>
      <div class="section-heading"><div><p class="eyebrow">ALL INGREDIENTS</p><h2>常用食材</h2></div><small>{{ filtered.length }} 种</small></div>
      <div class="ingredient-grid">
        <button
          v-for="name in filtered"
          :key="name"
          :class="{ selected: selected.includes(name) }"
          :aria-pressed="selected.includes(name)"
          @click="toggle(name)"
        >
          <span>{{ emojiMap[name] || '🥣' }}</span><strong>{{ name }}</strong><i>{{ selected.includes(name) ? '✓' : '+' }}</i>
        </button>
      </div>
    </section>
    <div class="sticky-action">
      <button class="primary-button" :disabled="!selected.length" @click="recommend">
        看看能做什么 <span v-if="selected.length">({{ selected.length }})</span> →
      </button>
    </div>
  </div>
</template>
