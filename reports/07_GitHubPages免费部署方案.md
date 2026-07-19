# GitHub Pages 免费部署方案

## 目标

- 仓库：建议 `lookcook-free-pwa`
- 分支：`main`
- 地址：部署后为 `https://<github-user>.github.io/lookcook-free-pwa/`
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

本地 Git 仓库、提交和工作流已准备。GitHub 页面会话未能稳定读取登录状态；如本机
尚未授权 GitHub，需要完成一次官方登录/授权后才能创建公开仓库并获得实际 Pages
地址。此处在发布后回填。
