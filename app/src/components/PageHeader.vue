<script setup lang="ts">
import { useRouter } from 'vue-router'

defineProps<{ eyebrow?: string; title: string; subtitle?: string }>()
const router = useRouter()
</script>

<template>
  <header class="page-header">
    <button class="icon-button back-button" aria-label="返回" @click="router.back()">←</button>
    <div>
      <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
      <h1>{{ title }}</h1>
      <p v-if="subtitle" class="page-subtitle">{{ subtitle }}</p>
    </div>
    <div class="header-action"><slot /></div>
  </header>
</template>
