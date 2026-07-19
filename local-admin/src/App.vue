<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

interface Recipe {
  id: string
  title: string
  tags: string[]
  ingredients: Array<{ name: string }>
  reviewStatus: string
  copyrightStatus: string
  source: string
  license: string
  [key: string]: unknown
}
interface Pack { schemaVersion: number; dataVersion: string; generatedAt: string; license: string; count: number; recipes: Recipe[] }

const pack = ref<Pack | null>(null)
const query = ref('')
const selected = ref<Recipe | null>(null)
const message = ref('')
const filtered = computed(() => pack.value?.recipes.filter((recipe) => [recipe.title, recipe.id, ...recipe.tags, ...recipe.ingredients.map((item) => item.name)].join(' ').includes(query.value.trim())) ?? [])
const stats = computed(() => ({
  total: pack.value?.recipes.length ?? 0,
  reviewed: pack.value?.recipes.filter((item) => item.reviewStatus.includes('reviewed')).length ?? 0,
  licensed: pack.value?.recipes.filter((item) => item.license && item.copyrightStatus).length ?? 0
}))

onMounted(async () => {
  const response = await fetch('./data/recipes.v1.json')
  pack.value = await response.json()
})

function open(recipe: Recipe) {
  selected.value = structuredClone(recipe)
  message.value = ''
}

function saveDraft() {
  if (!pack.value || !selected.value) return
  const index = pack.value.recipes.findIndex((item) => item.id === selected.value?.id)
  if (index >= 0) pack.value.recipes[index] = structuredClone(selected.value)
  message.value = '已保存到本次浏览器会话；导出后才会形成文件。'
}

function importFile(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    try {
      const next = JSON.parse(String(reader.result)) as Pack
      if (!Array.isArray(next.recipes) || !next.dataVersion) throw new Error('缺少必要字段')
      pack.value = next
      selected.value = null
      message.value = `已导入 ${next.recipes.length} 道菜，请检查后导出。`
    } catch (error) {
      message.value = `导入失败：${error instanceof Error ? error.message : 'JSON 格式错误'}`
    }
  }
  reader.readAsText(file)
}

function exportPack() {
  if (!pack.value) return
  const data = { ...pack.value, count: pack.value.recipes.length, generatedAt: new Date().toISOString() }
  const link = document.createElement('a')
  link.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }))
  link.download = `lookcook-recipes-${data.dataVersion}.json`
  link.click()
  URL.revokeObjectURL(link.href)
}
</script>

<template>
  <div class="admin-shell">
    <aside>
      <div class="brand"><span>L</span><div><strong>LookCook</strong><small>本地菜谱工作台</small></div></div>
      <nav><button class="active">▦ 菜谱库</button><button disabled>◇ 食材词表 <em>P1</em></button><button disabled>✓ 审核队列 <em>P1</em></button></nav>
      <div class="local-note"><strong>仅本地运行</strong><p>没有账号、服务端、云数据库或自动上传。</p></div>
    </aside>
    <main>
      <header>
        <div><p>LOCAL RECIPE ADMIN</p><h1>菜谱库</h1></div>
        <div class="actions">
          <label class="button secondary">导入 JSON<input type="file" accept=".json,application/json" @change="importFile" /></label>
          <button class="button primary" @click="exportPack">导出数据包</button>
        </div>
      </header>
      <section class="stats">
        <div><small>菜谱总数</small><strong>{{ stats.total }}</strong><span>版本 {{ pack?.dataVersion }}</span></div>
        <div><small>已完成原型审核</small><strong>{{ stats.reviewed }}</strong><span>需人工终审后扩充</span></div>
        <div><small>来源许可完整</small><strong>{{ stats.licensed }}</strong><span>缺一项不得发布</span></div>
      </section>
      <section class="table-card">
        <div class="toolbar"><label>⌕ <input v-model="query" placeholder="搜索菜名、ID、食材或标签" /></label><span>{{ filtered.length }} 条记录</span></div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>菜谱</th><th>标签</th><th>主要食材</th><th>审核</th><th>许可</th><th></th></tr></thead>
            <tbody>
              <tr v-for="recipe in filtered" :key="recipe.id">
                <td><strong>{{ recipe.title }}</strong><small>{{ recipe.id }}</small></td>
                <td><span v-for="tag in recipe.tags.slice(0, 2)" :key="tag" class="tag">{{ tag }}</span></td>
                <td>{{ recipe.ingredients.slice(0, 3).map(item => item.name).join('、') }}</td>
                <td><span class="status good">已审核</span></td>
                <td><span class="status good">{{ recipe.license }}</span></td>
                <td><button class="edit" @click="open(recipe)">编辑</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
    <div v-if="selected" class="drawer-backdrop" @click.self="selected = null">
      <form class="drawer" @submit.prevent="saveDraft">
        <div class="drawer-title"><div><small>EDIT LOCAL DRAFT</small><h2>{{ selected.title }}</h2></div><button type="button" @click="selected = null">×</button></div>
        <label>菜谱名称<input v-model="selected.title" required /></label>
        <label>ID<input v-model="selected.id" disabled /></label>
        <label>来源<input v-model="selected.source" required /></label>
        <div class="two-cols"><label>许可<input v-model="selected.license" required /></label><label>版权状态<input v-model="selected.copyrightStatus" required /></label></div>
        <label>标签（逗号分隔）<input :value="selected.tags.join(', ')" @input="selected.tags = ($event.target as HTMLInputElement).value.split(/[,，]/).map(v => v.trim()).filter(Boolean)" /></label>
        <p class="message">{{ message }}</p>
        <button class="button primary wide" type="submit">保存本地草稿</button>
      </form>
    </div>
  </div>
</template>
