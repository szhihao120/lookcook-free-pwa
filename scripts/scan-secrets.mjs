import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const ignored = new Set(['node_modules', '.git', 'dist', 'release', 'playwright-report', 'test-results'])
const patterns = [
  ['generic api key', /\b(?:api[_-]?key|secret|token)\s*[:=]\s*['"][A-Za-z0-9_\-]{16,}['"]/gi],
  ['OpenAI key', /\bsk-[A-Za-z0-9_-]{20,}\b/g],
  ['AWS-style key', /\bAKIA[0-9A-Z]{16}\b/g],
  ['private key', /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/g]
]
const hits = []

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (ignored.has(entry.name) || entry.name.startsWith('.env')) continue
    const file = path.join(dir, entry.name)
    if (entry.isDirectory()) await walk(file)
    else if (/\.(?:js|mjs|ts|vue|json|md|ya?ml|html|css|txt)$/i.test(entry.name)) {
      const text = await readFile(file, 'utf8')
      for (const [label, regex] of patterns) {
        regex.lastIndex = 0
        if (regex.test(text)) hits.push(`${label}: ${path.relative(root, file)}`)
      }
    }
  }
}

await walk(root)
if (hits.length) {
  console.error(hits.join('\n'))
  process.exit(1)
}
console.log('Secret scan passed: no credential-like values found.')
