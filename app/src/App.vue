<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { useRecipeStore } from './lib/store'

const route = useRoute()
const store = useRecipeStore()
const loadFailed = ref('')
const { needRefresh, offlineReady, updateServiceWorker } = useRegisterSW()

onMounted(async () => {
  try {
    await store.load()
  } catch (error) {
    loadFailed.value = error instanceof Error ? error.message : '菜谱加载失败'
  }
})

const nav = [
  { to: '/', name: 'home', icon: '⌂', label: '首页' },
  { to: '/ingredients', name: 'ingredients', icon: '⌕', label: '选食材' },
  { to: '/library', name: 'library', icon: '♡', label: '收藏' },
  { to: '/settings', name: 'settings', icon: '···', label: '设置' }
]
</script>

<template>
  <div class="app-shell">
    <header class="desktop-header">
      <RouterLink to="/" class="brand" aria-label="LookCook 首页">
        <span class="brand-mark">L</span>
        <span><strong>LookCook</strong><small>今日好好吃饭</small></span>
      </RouterLink>
      <nav aria-label="桌面导航">
        <RouterLink v-for="item in nav" :key="item.name" :to="item.to">{{ item.label }}</RouterLink>
      </nav>
      <span class="free-badge">永久免费 · 无需登录</span>
    </header>

    <main>
      <div v-if="store.state.loading" class="page-state">
        <span class="loader"></span>
        <strong>正在摆好今天的菜谱…</strong>
      </div>
      <div v-else-if="loadFailed" class="page-state error-state">
        <span class="state-emoji">🍽️</span>
        <strong>暂时没能打开菜谱</strong>
        <p>{{ loadFailed }}</p>
        <button class="primary-button" @click="store.load()">再试一次</button>
      </div>
      <RouterView v-else />
    </main>

    <nav class="bottom-nav" aria-label="主要导航">
      <RouterLink
        v-for="item in nav"
        :key="item.name"
        :to="item.to"
        :class="{ active: route.name === item.name || (item.name === 'ingredients' && route.name === 'recommendations') }"
      >
        <span>{{ item.icon }}</span>
        <small>{{ item.label }}</small>
      </RouterLink>
    </nav>

    <aside v-if="needRefresh" class="update-toast" role="status">
      <div><strong>新版本已准备好</strong><small>更新后立即使用最新功能</small></div>
      <button @click="updateServiceWorker(true)">立即更新</button>
    </aside>
    <aside v-else-if="offlineReady" class="update-toast ready-toast" role="status">
      <div><strong>离线菜谱已就绪</strong><small>断网也能继续查看</small></div>
      <button @click="offlineReady = false">知道了</button>
    </aside>
  </div>
</template>
