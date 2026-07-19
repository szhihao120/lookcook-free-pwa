<script setup lang="ts">
import { computed } from 'vue'
import RecipeCard from '../components/RecipeCard.vue'
import PageHeader from '../components/PageHeader.vue'
import { recommendRecipes } from '../lib/search'
import { useRecipeStore } from '../lib/store'

const store = useRecipeStore()
const recommendations = computed(() => recommendRecipes([...store.state.recipes], [...store.state.selectedIngredients]))
</script>

<template>
  <div class="page narrow-page recommendations-page">
    <PageHeader eyebrow="STEP 2 OF 2" title="今晚可以做这些" :subtitle="`根据 ${store.state.selectedIngredients.join('、') || '所选食材'} 排序`" />
    <div v-if="store.state.selectedIngredients.length" class="selected-summary">
      <span v-for="name in store.state.selectedIngredients" :key="name">{{ name }}</span>
      <RouterLink to="/ingredients">重新选择</RouterLink>
    </div>
    <div v-if="recommendations.length" class="recommendation-list">
      <div v-for="(item, index) in recommendations" :key="item.recipe.id" class="recommendation-item">
        <span class="rank">{{ String(index + 1).padStart(2, '0') }}</span>
        <RecipeCard
          :recipe="item.recipe"
          :match-text="`已有 ${item.matched.length} 种 · 还缺 ${item.missing.length} 种`"
        />
        <p class="match-detail"><strong>已匹配：</strong>{{ item.matched.join('、') }}<template v-if="item.missing.length"><span> · </span><strong>还需要：</strong>{{ item.missing.slice(0, 4).join('、') }}</template></p>
      </div>
    </div>
    <div v-else class="empty-card">
      <span>🧺</span><h3>还没有可推荐的菜</h3><p>先选一两种主要食材，我们就能开始匹配。</p>
      <RouterLink class="primary-button" to="/ingredients">去选食材</RouterLink>
    </div>
  </div>
</template>
