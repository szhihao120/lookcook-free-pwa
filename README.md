# LookCook 免费联网做菜 PWA

一个不需要服务器、数据库、API Key 或付费云服务的做菜助手。菜谱以版本化 JSON
发布到 GitHub Pages，浏览器负责搜索、推荐、收藏、历史记录、缓存和更新。

在线地址：<https://szhihao120.github.io/lookcook-free-pwa/>

## 本地运行

```bash
pnpm install
pnpm dev
```

本地管理端：

```bash
pnpm dev:admin
```

完整验证：

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build
pnpm scan:secrets
```

代码采用 MIT License；样例菜谱数据采用 CC BY 4.0，详见 `DATA_LICENSE.md`。
