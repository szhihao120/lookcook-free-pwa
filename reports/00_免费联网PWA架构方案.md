# LookCook 免费联网 PWA 架构方案

报告日期：2026-07-19  
阶段：P0 高保真可运行原型

## 结论

方案可行。当前实现不需要自建服务器、云数据库、在线 AI 接口、API Key、微信登录、
付费搜索服务或自定义域名。用户端静态文件和版本化菜谱 JSON 由 GitHub Pages 免费
托管；浏览器负责搜索、推荐、收藏、历史、缓存与更新。

## 组件

```text
GitHub 仓库
├─ app/                 Vue 3 + TypeScript + Vite 用户端 PWA
├─ local-admin/         仅本机运行的 Vue 菜谱工作台
├─ recipe-data/
│  ├─ source/           原创样例源
│  ├─ schema/           JSON Schema
│  └─ dist/             manifest、数据包、搜索索引
├─ assets/covers/       脚本生成的原创 SVG 封面
├─ scripts/             构建、校验、密钥扫描、发布脚本
├─ tests/               自动化测试入口
└─ .github/workflows/   质量门禁和 Pages 部署
```

## 运行数据流

1. 浏览器从 GitHub Pages 获取应用外壳和 `data/manifest.json`。
2. 清单版本变化时才下载 `recipes.v1.json`；包的版本、数量与摘要在构建阶段校验。
3. 菜谱进入 IndexedDB，同时由 Service Worker 以 Network First 策略缓存。
4. 搜索、拼音首字母匹配和食材推荐全部在设备内执行。
5. 收藏和历史只写入设备 IndexedDB，不上传。
6. 断网时应用外壳、菜谱包和原创封面从缓存读取。

## 免费边界

| 项目 | 方案 | 费用 |
|---|---|---|
| 静态托管 | GitHub Pages 默认 `github.io` 域名 | 0 |
| 数据发布 | 仓库中的版本化 JSON | 0 |
| 持久化 | 浏览器 IndexedDB | 0 |
| 搜索推荐 | 设备端确定性算法 | 0 |
| 管理端 | 本机 Vue 应用，手工导入/导出 JSON | 0 |
| CI/CD | GitHub Actions 免费额度内 | 0 |
| 图片 | 项目脚本生成 SVG | 0 |

## 明确不包含

- 在线 AI、图片生成、付费模型、API Key；
- 服务端业务 API、用户数据库、账号系统；
- 微信登录、短信、支付、广告或埋点；
- 自动抓取菜谱或第三方图片；
- 多人协同审核与实时同步。

## 扩展约束

P1 扩充数据时保持相同 Schema 和版权字段。超过约 5,000 道菜后再评估分包、Web
Worker 和增量索引；在此之前不引入搜索后端。
