import { createHash } from 'node:crypto'
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const release = path.join(root, 'release', 'lookcook-p0')
await rm(release, { recursive: true, force: true })
await mkdir(release, { recursive: true })
await cp(path.join(root, 'app', 'dist'), path.join(release, 'site'), { recursive: true })
await cp(path.join(root, 'local-admin', 'dist'), path.join(release, 'local-admin'), { recursive: true })
await cp(path.join(root, 'reports'), path.join(release, 'reports'), { recursive: true })
const manifest = JSON.stringify({ version: '0.1.0', createdAt: new Date().toISOString(), contents: ['site', 'local-admin', 'reports'] }, null, 2)
await writeFile(path.join(release, 'release-manifest.json'), manifest)
const hash = createHash('sha256').update(await readFile(path.join(release, 'site', 'index.html'))).digest('hex')
await writeFile(path.join(root, 'release', 'lookcook-p0.sha256'), `${hash}  lookcook-p0/site/index.html\n`)
console.log(`Release directory created at ${release}`)
