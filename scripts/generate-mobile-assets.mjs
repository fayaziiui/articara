import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const svgPath = join(root, 'public', 'favicon.svg')
const outDir = join(root, 'resources')

const svg = await readFile(svgPath)

await mkdir(outDir, { recursive: true })

const icon = await sharp(svg, { density: 400 })
  .resize(1024, 1024)
  .png()
  .toBuffer()

await writeFile(join(outDir, 'icon.png'), icon)
await writeFile(join(outDir, 'logo.png'), icon)

const splashIcon = await sharp(svg, { density: 400 })
  .resize(1024, 1024)
  .png()
  .toBuffer()

const splash = await sharp({
  create: {
    width: 2732,
    height: 2732,
    channels: 3,
    background: '#E7F2EC',
  },
})
  .composite([{ input: splashIcon, gravity: 'centre' }])
  .png()
  .toBuffer()

await writeFile(join(outDir, 'splash.png'), splash)

console.log('Wrote resources/icon.png, resources/logo.png, and resources/splash.png')
