import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import IngredientsView from './views/IngredientsView.vue'
import RecommendationsView from './views/RecommendationsView.vue'
import RecipeDetailView from './views/RecipeDetailView.vue'
import LibraryView from './views/LibraryView.vue'
import SettingsView from './views/SettingsView.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/ingredients', name: 'ingredients', component: IngredientsView },
    { path: '/recommendations', name: 'recommendations', component: RecommendationsView },
    { path: '/recipes/:id', name: 'recipe-detail', component: RecipeDetailView, props: true },
    { path: '/library', name: 'library', component: LibraryView },
    { path: '/settings', name: 'settings', component: SettingsView },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})
