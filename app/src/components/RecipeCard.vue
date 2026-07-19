<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import type { Recipe } from '../types'
import { withBase } from '../lib/paths'
import { useRecipeStore } from '../lib/store'

const props = defineProps<{ recipe: Recipe; compact?: boolean; matchText?: string }>()
const store = useRecipeStore()
const favorite = computed(() => store.state.favorites.includes(props.recipe.id))
</script>

<template>
  <article class="recipe-card" :class="{ compact }">
    <RouterLink :to="`/recipes/${recipe.id}`" class="recipe-image-link">
      <img :src="withBase(recipe.coverImage)" :alt="`${recipe.title}原创插画封面`" loading="lazy" />
      <span v-if="matchText" class="match-chip">{{ matchText }}</span>
      <span class="time-chip">{{ recipe.time }} 分钟</span>
    </RouterLink>
    <div class="recipe-card-body">
      <div>
        <p class="eyebrow">{{ recipe.tags.slice(0, 2).join(' · ') }}</p>
        <RouterLink :to="`/recipes/${recipe.id}`"><h3>{{ recipe.title }}</h3></RouterLink>
        <p v-if="!compact" class="card-summary">{{ recipe.summary }}</p>
      </div>
      <button
        class="favorite-button"
        :class="{ saved: favorite }"
        :aria-label="favorite ? `取消收藏${recipe.title}` : `收藏${recipe.title}`"
        @click="store.toggleFavorite(recipe.id)"
      >
        {{ favorite ? '♥' : '♡' }}
      </button>
    </div>
  </article>
</template>
