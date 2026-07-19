<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import RecipeCard from '../components/RecipeCard.vue'
import { searchRecipes } from '../lib/search'
import { useRecipeStore } from '../lib/store'

const store = useRecipeStore()
const router = useRouter()
const query = ref('')
const results = computed(() => searchRecipes([...store.state.recipes], query.value))
const featured = computed(() => [...store.state.recipes].slice(0, 6))
const quickIngredients = ['番茄', '鸡蛋', '土豆', '鸡胸肉', '西兰花', '豆腐']

function chooseIngredient(name: string) {
  store.setSelectedIngredients([name])
  router.push('/recommendations')
}
</script>

<template>
  <div class="home-page page">
    <section class="mobile-brand">
      <div class="brand">
        <span class="brand-mark">L</span>
        <span><strong>LookCook</strong><small>今日好好吃饭</small></span>
      </div>
      <span class="status-dot" :title="store.state.dataSource === 'network' ? '在线数据' : '离线数据'"></span>
    </section>

    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow light">免费 · 无需登录 · 离线可用</p>
        <h1>家里有什么，<br /><em>今晚就做什么。</em></h1>
        <p>选出手头食材，LookCook 帮你找到最顺手的家常菜。</p>
        <RouterLink to="/ingredients" class="hero-button">开始选食材 <span>→</span></RouterLink>
      </div>
      <div class="hero-art" aria-hidden="true">
        <div class="plate"><span>🍅</span><span>🥦</span><span>🍳</span></div>
        <div class="spark spark-a">✦</div><div class="spark spark-b">✦</div>
      </div>
    </section>

    <section class="search-section">
      <label class="search-box">
        <span>⌕</span>
        <input v-model="query" type="search" placeholder="搜菜名、食材或拼音首字母" aria-label="搜索菜谱" />
        <kbd v-if="!query">共 {{ store.state.recipes.length }} 道</kbd>
        <button v-else aria-label="清空搜索" @click="query = ''">×</button>
      </label>
    </section>

    <template v-if="query">
      <section class="content-section">
        <div class="section-heading"><div><p class="eyebrow">SEARCH RESULT</p><h2>找到 {{ results.length }} 道菜</h2></div></div>
        <div v-if="results.length" class="recipe-grid">
          <RecipeCard v-for="recipe in results" :key="recipe.id" :recipe="recipe" />
        </div>
        <div v-else class="empty-card"><span>🥄</span><h3>暂时没有匹配菜谱</h3><p>换个菜名、食材或拼音试试。</p></div>
      </section>
    </template>

    <template v-else>
      <section class="content-section pantry-shortcut">
        <div class="section-heading">
          <div><p class="eyebrow">FROM YOUR KITCHEN</p><h2>从一种食材开始</h2></div>
          <RouterLink to="/ingredients">全部食材 →</RouterLink>
        </div>
        <div class="ingredient-strip">
          <button v-for="name in quickIngredients" :key="name" @click="chooseIngredient(name)">
            <span>{{ ({ 番茄: '🍅', 鸡蛋: '🥚', 土豆: '🥔', 鸡胸肉: '🍗', 西兰花: '🥦', 豆腐: '◻️' } as Record<string, string>)[name] }}</span>
            {{ name }}
          </button>
        </div>
      </section>

      <section class="content-section">
        <div class="section-heading">
          <div><p class="eyebrow">TODAY'S PICKS</p><h2>今天吃点好的</h2></div>
          <span class="data-version">{{ store.state.manifest?.dataVersion }}</span>
        </div>
        <div class="recipe-grid">
          <RecipeCard v-for="recipe in featured" :key="recipe.id" :recipe="recipe" />
        </div>
      </section>

      <section class="promise-card">
        <span>🌿</span>
        <div><strong>你的数据，只在你的设备</strong><p>收藏和浏览记录保存在本机，不上传，不追踪。</p></div>
      </section>
    </template>
  </div>
</template>
