# 菜谱数据 Schema

机器可读定义：
`C:\Users\EDY\Documents\LookCook免费联网版\recipe-data\schema\recipe.schema.json`

## 版本结构

```text
manifest.json
├─ dataVersion
├─ minimumAppVersion
├─ count
├─ packs[]
│  ├─ url
│  ├─ sha256
│  └─ bytes
└─ searchIndex.url

recipes.v1.json
├─ schemaVersion
├─ dataVersion
├─ license
├─ count
└─ recipes[]
```

## 菜谱必填字段

| 分组 | 字段 |
|---|---|
| 标识 | `schemaVersion`、`id`、`title`、`aliases` |
| 搜索 | `pinyin`、`initials`、`tags`、`summary` |
| 烹饪 | `time`、`difficulty`、`servings`、`ingredients`、`steps` |
| 视觉 | `coverImage`、`colors`、`emoji` |
| 营养 | `nutritionTags` |
| 来源 | `author`、`source`、`license`、`copyrightStatus`、`reviewStatus` |
| 版本 | `updatedAt` |

食材项包含 `name/amount/unit/note`，步骤包含 `order/title/text/image`。

## 营养边界

P0 只提供“含优质蛋白、富含蔬菜、少油、植物蛋白”等定性标签，不提供热量或微量
营养素数值，不声称真实计算，更不构成医学建议。未来若加入定量数据，必须记录权威
数据源、可食部、烹饪损耗、单位、算法版本和误差范围。

## 校验门禁

`scripts/validate-recipe-data.mjs` 检查：

- 样例数必须为 20–30；
- ID 唯一；
- 来源、许可、版权和审核字段不可缺；
- 食材用量必须为正数；
- 每道至少三个步骤；
- 封面路径必须位于项目 covers。
