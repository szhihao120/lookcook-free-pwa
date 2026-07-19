<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { addHistory } from '../lib/db'
import { withBase } from '../lib/paths'
import { scaleAmount } from '../lib/search'
import { useRecipeStore } from '../lib/store'

const route = useRoute()
const router = useRouter()
const store = useRecipeStore()
const servings = ref(2)
const recipe = computed(() => store.state.recipes.find((item) => item.id === route.params.id))
const favorite = computed(() => recipe.value ? store.state.favorites.includes(recipe.value.id) : false)

onMounted(async () => {
  if (recipe.value) {
    servings.value = recipe.value.servings
    await addHistory(recipe.value.id)
    await store.refreshHistory()
  }
})
</script>

<template>
  <div v-if="recipe" class="detail-page">
    <section class="detail-hero">
      <img :src="withBase(recipe.coverImage)" :alt="`${recipe.title}原创插画封面`" />
      <div class="detail-top-actions">
        <button class="floating-button" aria-label="返回" @click="router.back()">←</button>
        <button class="floating-button" :class="{ saved: favorite }" aria-label="收藏" @click="store.toggleFavorite(recipe.id)">{{ favorite ? '♥' : '♡' }}</button>
      </div>
      <div class="detail-title">
        <p>{{ recipe.tags.join(' · ') }}</p>
        <h1>{{ recipe.title }}</h1>
        <span>{{ recipe.summary }}</span>
      </div>
    </section>

    <div class="detail-content">
      <section class="fact-row">
        <div><small>烹饪时间</small><strong>{{ recipe.time }} 分钟</strong></div>
        <div><small>难度</small><strong>{{ recipe.difficulty }}</strong></div>
        <div><small>适合</small><strong>{{ recipe.nutritionTags[0] }}</strong></div>
      </section>

      <section class="detail-section">
        <div class="section-heading">
          <div><p class="eyebrow">INGREDIENTS</p><h2>食材清单</h2></div>
          <div class="servings-control" aria-label="调整人数">
            <button :disabled="servings <= 1" @click="servings--">−</button><strong>{{ servings }} 人份</strong><button :disabled="servings >= 8" @click="servings++">＋</button>
          </div>
        </div>
        <ul class="ingredient-list">
          <li v-for="item in recipe.ingredients" :key="item.name">
            <span><i></i><strong>{{ item.name }}</strong><small v-if="item.note">{{ item.note }}</small></span>
            <b>{{ scaleAmount(item.amount, recipe.servings, servings) }} {{ item.unit }}</b>
          </li>
        </ul>
      </section>

      <section class="detail-section">
        <div class="section-heading"><div><p class="eyebrow">STEP BY STEP</p><h2>开始做饭</h2></div><small>共 {{ recipe.steps.length }} 步</small></div>
        <ol class="steps-list">
          <li v-for="step in recipe.steps" :key="step.order">
            <span class="step-number">{{ String(step.order).padStart(2, '0') }}</span>
            <div><h3>{{ step.title }}</h3><p>{{ step.text }}</p></div>
          </li>
        </ol>
      </section>

      <section class="source-card">
        <span>✓</span><div><strong>来源与授权透明</strong><p>{{ recipe.source }} · {{ recipe.author }} · {{ recipe.license }}</p></div>
      </section>
      <p class="food-safety-note">食材需清洗并彻底加热；过敏原、盐油用量及食用禁忌请按个人情况判断。</p>
    </div>
  </div>
  <div v-else class="page-state"><span class="state-emoji">🥄</span><strong>没有找到这道菜</strong><RouterLink to="/">返回首页</RouterLink></div>
</template>
