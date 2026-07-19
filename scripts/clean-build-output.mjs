import { rm } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const allowed = new Set(['app', 'local-admin'])
const workspace = process.argv[2]

if (!workspace || !allowed.has(workspace)) {
  throw new Error(`拒绝清理未知工作区：${workspace ?? '(empty)'}`)
}

const target = path.resolve(root, workspace, 'dist')
const expected = path.join(root, workspace, 'dist')
if (target !== expected || !target.startsWith(`${root}${path.sep}`)) {
  throw new Error(`清理路径超出项目范围：${target}`)
}

await rm(target, { recursive: true, force: true })
console.log(`Cleaned ${path.relative(root, target)}`)
