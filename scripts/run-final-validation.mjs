import { spawnSync } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const logs = path.join(root, 'reports', 'evidence', 'logs')
await mkdir(logs, { recursive: true })

const commands = [
  ['prepare-data', ['prepare:data']],
  ['validate-data', ['validate:data']],
  ['typecheck', ['typecheck']],
  ['lint', ['lint']],
  ['unit-tests', ['test']],
  ['build', ['build']],
  ['e2e', ['test:e2e']],
  ['secret-scan', ['scan:secrets']]
]

let combined = `LookCook P0 final validation\nStarted: ${new Date().toISOString()}\n\n`
for (const [name, args] of commands) {
  const result = spawnSync('pnpm', args, { cwd: root, encoding: 'utf8', shell: true })
  const section = [
    `===== ${name}: pnpm ${args.join(' ')} =====`,
    result.stdout ?? '',
    result.stderr ?? '',
    result.error ? String(result.error) : '',
    `EXIT_CODE=${result.status ?? 1}`,
    ''
  ].join('\n')
  combined += section
  process.stdout.write(section)
  if (result.status !== 0) {
    await writeFile(path.join(logs, 'final-validation.log'), combined)
    process.exit(result.status ?? 1)
  }
}
combined += `Completed: ${new Date().toISOString()}\nRESULT=PASS\n`
await writeFile(path.join(logs, 'final-validation.log'), combined)

const licenses = spawnSync('pnpm', ['licenses', 'list', '--json'], { cwd: root, encoding: 'utf8', shell: true })
if (licenses.status === 0) {
  await writeFile(path.join(root, 'reports', 'evidence', 'dependency-licenses.json'), licenses.stdout)
} else {
  await writeFile(path.join(logs, 'dependency-licenses-error.log'), licenses.stderr || licenses.stdout)
}
