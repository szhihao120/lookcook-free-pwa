# PWA 缓存和更新策略

## 缓存分层

| 内容 | 策略 | 缓存 |
|---|---|---|
| HTML/JS/CSS/manifest/icons | Workbox 预缓存 | 版本随构建更新 |
| `data/*` | Network First，3 秒超时 | `lookcook-recipe-data`，30 天 |
| `covers/*` | Cache First | `lookcook-covers`，180 天 |
| 菜谱包副本 | IndexedDB | `lookcook-local/cache` |
| 收藏与历史 | IndexedDB | 独立对象仓库 |

最终干净构建预缓存 66 个文件，总计约 253 KiB。

## 更新

1. Service Worker 发现新应用构建后展示“立即更新”，用户触发后激活新版本。
2. 设置页请求带时间戳的 `manifest.json`。
3. `dataVersion` 相同则不下载菜谱包。
4. 版本变化时下载必需包，并校验包版本和记录数量后写入 IndexedDB。
5. 请求失败保持旧包，不清空可用数据。

## 离线验证

在 Chromium 独立上下文中完成首次联网加载并等待 `navigator.serviceWorker.ready`，
随后切换整个浏览器上下文为离线并重载：

- 首页标题可见；
- “共 26 道”可见；
- 已保存 `mobile-390-offline.png`。

## 安装

清单为 `display: standalone`，包含 192×192、512×512 和 maskable 512×512 PNG，
使用相对 `start_url` 与 scope，适配 GitHub Pages 子路径。真实 Windows Chrome 的
最终安装点击没有执行：Windows 自动化安全层无法可靠确认浏览器 URL；P0 以安装清单、
Service Worker、离线重载和设置页安装截图作为可安装性证据。
