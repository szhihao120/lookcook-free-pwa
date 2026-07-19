<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import PageHeader from '../components/PageHeader.vue'
import { useRecipeStore } from '../lib/store'

interface InstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const store = useRecipeStore()
const checking = ref(false)
const updateMessage = ref('')
const installPrompt = ref<InstallPromptEvent | null>(null)
const standalone = window.matchMedia('(display-mode: standalone)').matches

function capturePrompt(event: Event) {
  event.preventDefault()
  installPrompt.value = event as InstallPromptEvent
}

async function install() {
  if (!installPrompt.value) return
  await installPrompt.value.prompt()
  await installPrompt.value.userChoice
  installPrompt.value = null
}

async function checkUpdates() {
  checking.value = true
  try {
    const changed = await store.checkForUpdates()
    updateMessage.value = changed ? '已更新到最新菜谱包。' : '已经是最新菜谱包。'
  } catch {
    updateMessage.value = '当前无法联网检查，请稍后再试。'
  } finally {
    checking.value = false
  }
}

onMounted(() => window.addEventListener('beforeinstallprompt', capturePrompt))
onBeforeUnmount(() => window.removeEventListener('beforeinstallprompt', capturePrompt))
</script>

<template>
  <div class="page narrow-page settings-page">
    <PageHeader eyebrow="SETTINGS" title="设置与更新" subtitle="没有账号系统，也没有任何云端个人数据。" />
    <section class="settings-card accent-card">
      <div><span class="settings-icon">↧</span><div><strong>{{ standalone ? '已作为应用打开' : '安装 LookCook' }}</strong><p>{{ installPrompt ? '添加到主屏幕，像普通应用一样使用。' : 'Chrome 可从菜单安装；iPhone Safari 请点“分享 → 添加到主屏幕”。' }}</p></div></div>
      <button v-if="installPrompt && !standalone" class="secondary-button" @click="install">立即安装</button>
      <span v-else class="mini-status">{{ standalone ? '独立模式' : '等待浏览器提示' }}</span>
    </section>
    <section class="settings-card">
      <div><span class="settings-icon">↻</span><div><strong>菜谱数据更新</strong><p>联网时读取 GitHub Pages 上的版本清单，有更新才下载。</p><small>当前 {{ store.state.manifest?.dataVersion }} · {{ store.state.manifest?.count }} 道</small></div></div>
      <button class="secondary-button" :disabled="checking" @click="checkUpdates">{{ checking ? '检查中…' : '检查更新' }}</button>
      <p v-if="updateMessage" class="inline-message">{{ updateMessage }}</p>
    </section>
    <section class="settings-card">
      <div><span class="settings-icon">⌁</span><div><strong>网络与离线</strong><p>首次打开后，应用外壳、菜谱包与原创封面会缓存到设备。</p></div></div>
      <span class="mini-status" :class="{ online: store.state.dataSource === 'network' }">{{ store.state.dataSource === 'network' ? '在线' : '离线缓存' }}</span>
    </section>
    <section class="settings-card">
      <div><span class="settings-icon">♙</span><div><strong>隐私承诺</strong><p>收藏与历史使用 IndexedDB 本地保存；没有埋点、广告、登录、API Key 或服务端。</p></div></div>
      <span class="mini-status online">本机存储</span>
    </section>
    <section class="about-block">
      <div class="brand"><span class="brand-mark">L</span><span><strong>LookCook</strong><small>版本 0.1.0 · P0</small></span></div>
      <p>代码 MIT · 样例菜谱 CC BY 4.0 · 封面为项目原创 SVG。</p>
    </section>
  </div>
</template>
