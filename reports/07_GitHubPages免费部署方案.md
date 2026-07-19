# GitHub Pages 免费部署方案

## 目标

- 仓库：`https://github.com/szhihao120/lookcook-free-pwa`
- 分支：`main`
- 地址：`https://szhihao120.github.io/lookcook-free-pwa/`
- 自定义域名：无

## 工作流

`.github/workflows/deploy-pages.yml`：

1. checkout；
2. pnpm 11.9.0 + Node 24；
3. frozen lockfile 安装；
4. 生成并校验菜谱数据；
5. 执行用户端单元测试；
6. 使用 `VITE_BASE_PATH=/<repo>/` 构建；
7. 上传 `app/dist`；
8. 使用官方 `actions/deploy-pages` 发布。

`.github/workflows/quality.yml` 对所有 push/PR 执行 typecheck、lint、test、build 和密钥扫描。

## 权限

部署工作流仅需要：

- `contents: read`
- `pages: write`
- `id-token: write`

不保存 PAT、API Key 或云密钥。仓库公开前必须通过：

- `pnpm scan:secrets`
- 版权来源字段校验
- 构建与测试

## 当前发布状态

已发布并完成线上验证：

- 仓库为公开仓库；
- Quality 工作流成功；
- Deploy GitHub Pages 工作流成功；
- 首页、manifest、数据清单、Service Worker 均为 HTTP 200；
- 直接打开并刷新 `#/recipes/tomato-scrambled-eggs` 成功；
- 刷新后页面由 Service Worker 控制。

线上机器验证记录：
`C:\Users\EDY\Documents\LookCook免费联网版\reports\evidence\live-pages-verification.json`
