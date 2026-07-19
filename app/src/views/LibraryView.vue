<script setup lang="ts">
import { ref } from 'vue'
import RecipeCard from '../components/RecipeCard.vue'
import { useRecipeStore } from '../lib/store'

const store = useRecipeStore()
const tab = ref<'favorites' | 'history'>('favorites')
</script>

<template>
  <div class="page narrow-page library-page">
    <header class="simple-header"><p class="eyebrow">YOUR KITCHEN NOTES</p><h1>我的菜谱</h1><p>只保存在当前设备，清理浏览器数据会一并删除。</p></header>
    <div class="segmented">
      <button :class="{ active: tab === 'favorites' }" @click="tab = 'favorites'">我的收藏 <span>{{ store.favoriteRecipes.value.length }}</span></button>
      <button :class="{ active: tab === 'history' }" @click="tab = 'history'">最近看过 <span>{{ store.historyRecipes.value.length }}</span></button>
    </div>
    <div v-if="(tab === 'favorites' ? store.favoriteRecipes.value : store.historyRecipes.value).length" class="recipe-grid library-grid">
      <RecipeCard v-for="recipe in (tab === 'favorites' ? store.favoriteRecipes.value : store.historyRecipes.value)" :key="recipe.id" :recipe="recipe" compact />
    </div>
    <div v-else class="empty-card">
      <span>{{ tab === 'favorites' ? '♡' : '◷' }}</span>
      <h3>{{ tab === 'favorites' ? '还没有收藏' : '还没有浏览记录' }}</h3>
      <p>{{ tab === 'favorites' ? '遇到想做的菜，点一下爱心留在这里。' : '打开一道菜谱后，就能从这里快速找回。' }}</p>
      <RouterLink class="primary-button" to="/">去看看菜谱</RouterLink>
    </div>
  </div>
</template>
