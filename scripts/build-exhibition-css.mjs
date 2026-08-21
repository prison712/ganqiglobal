import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import postcss from 'postcss'
import tailwindcss from '@tailwindcss/postcss'

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url))
const projectDirectory = path.resolve(scriptDirectory, '..')
const workspaceDirectory = path.resolve(projectDirectory, '..')
const sourcePath = path.join(projectDirectory, 'src', 'exhibition-tailwind.css')
const outputDirectory = path.join(workspaceDirectory, 'assets', 'css')
const outputPath = path.join(outputDirectory, 'exhibition.css')
const source = await readFile(sourcePath, 'utf8')
const result = await postcss([tailwindcss()]).process(source, { from: sourcePath, to: outputPath })

await mkdir(outputDirectory, { recursive: true })
await writeFile(outputPath, result.css)
