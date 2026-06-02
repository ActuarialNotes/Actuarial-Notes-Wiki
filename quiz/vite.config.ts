import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { readdir, readFile } from 'fs/promises'
import fm from 'front-matter'

const REPO_ROOT = path.resolve(__dirname, '..')

const _buildEnv = loadEnv('', __dirname, 'VITE_')
const GITHUB_REPO = _buildEnv.VITE_GITHUB_REPO || 'ActuarialNotes/Actuarial-Notes-Wiki'
const GITHUB_BRANCH = _buildEnv.VITE_GITHUB_BRANCH || 'main'

const IMAGE_EXT_RE = /\.(png|jpe?g|gif|svg|webp|avif)$/i

function extractCoverImageUrl(content: string): string | undefined {
  const m = /!\[\[([^\]]+)\]\]/.exec(content)
  if (!m) return undefined
  const imagePath = m[1].trim()
  if (!IMAGE_EXT_RE.test(imagePath)) return undefined
  const resolved = imagePath.includes('/') ? imagePath : `Media/Attachments/${imagePath}`
  const encoded = resolved.replace(/^\/+/, '').split('/').map(encodeURIComponent).join('/')
  return `https://raw.githubusercontent.com/${GITHUB_REPO}/${GITHUB_BRANCH}/${encoded}`
}

interface WikiIndexItem {
  category: 'exam' | 'concept' | 'document'
  name: string
  path: string
  topic?: string
  author?: string
  year?: number
  title?: string
  edition?: string
  publisher?: string
  coverImage?: string
}

interface WikiBundleData {
  files: Record<string, string>
  index: WikiIndexItem[]
}

async function collectWikiContent(): Promise<WikiBundleData> {
  const files: Record<string, string> = {}
  const index: WikiIndexItem[] = []

  // Exam files at repo root
  const rootEntries = await readdir(REPO_ROOT).catch(() => [] as string[])
  for (const name of rootEntries) {
    if (!name.endsWith('.md') || !/^Exam\b/i.test(name)) continue
    const text = await readFile(path.join(REPO_ROOT, name), 'utf-8').catch(() => null)
    if (text == null) continue
    files[name] = text
    index.push({ category: 'exam', name: name.replace(/\.md$/i, ''), path: name })
  }

  // Concepts/
  const conceptEntries = await readdir(path.join(REPO_ROOT, 'Concepts')).catch(() => [] as string[])
  for (const name of conceptEntries) {
    if (!name.endsWith('.md')) continue
    const text = await readFile(path.join(REPO_ROOT, 'Concepts', name), 'utf-8').catch(() => null)
    if (text == null) continue
    files[`Concepts/${name}`] = text
    index.push({ category: 'concept', name: name.replace(/\.md$/i, ''), path: `Concepts/${name}` })
  }

  // Resources/Books/
  const bookEntries = await readdir(path.join(REPO_ROOT, 'Resources/Books')).catch(() => [] as string[])
  for (const name of bookEntries) {
    if (!name.endsWith('.md')) continue
    const text = await readFile(path.join(REPO_ROOT, 'Resources/Books', name), 'utf-8').catch(() => null)
    if (text == null) continue
    files[`Resources/Books/${name}`] = text
    const attrs = (fm<Record<string, unknown>>(text).attributes ?? {}) as Record<string, unknown>
    const yearNum = attrs['Year'] ? parseInt(String(attrs['Year']), 10) : undefined
    index.push({
      category: 'document',
      name: name.replace(/\.md$/i, ''),
      path: `Resources/Books/${name}`,
      author: (attrs['Authors'] || attrs['Author']) ? String(attrs['Authors'] || attrs['Author']) : undefined,
      year: Number.isFinite(yearNum) ? yearNum : undefined,
      title: attrs['Title'] ? String(attrs['Title']) : undefined,
      edition: attrs['Edition'] ? String(attrs['Edition']) : undefined,
      publisher: attrs['Publisher'] ? String(attrs['Publisher']) : undefined,
      coverImage: extractCoverImageUrl(text),
    })
  }

  return { files, index }
}

function wikiContentPlugin(): Plugin {
  const VIRTUAL_ID = 'virtual:wiki-content'
  const RESOLVED_ID = '\0' + VIRTUAL_ID
  return {
    name: 'wiki-content',
    resolveId: (id) => id === VIRTUAL_ID ? RESOLVED_ID : undefined,
    load: async (id) => {
      if (id !== RESOLVED_ID) return
      const data = await collectWikiContent()
      return `export default ${JSON.stringify(data)}`
    },
  }
}

async function collectQuestions(): Promise<string[]> {
  const rawFiles: string[] = []
  const questionsDir = path.join(REPO_ROOT, 'questions')
  const examDirs = await readdir(questionsDir).catch(() => [] as string[])
  for (const examDir of examDirs) {
    const examPath = path.join(questionsDir, examDir)
    const files = await readdir(examPath).catch(() => [] as string[])
    for (const name of files) {
      if (!name.endsWith('.md')) continue
      const text = await readFile(path.join(examPath, name), 'utf-8').catch(() => null)
      if (text != null) rawFiles.push(text)
    }
  }
  return rawFiles
}

function questionsContentPlugin(): Plugin {
  const VIRTUAL_ID = 'virtual:questions-content'
  const RESOLVED_ID = '\0' + VIRTUAL_ID
  return {
    name: 'questions-content',
    resolveId: (id) => id === VIRTUAL_ID ? RESOLVED_ID : undefined,
    load: async (id) => {
      if (id !== RESOLVED_ID) return
      const questions = await collectQuestions()
      return `export default ${JSON.stringify(questions)}`
    },
  }
}

export default defineConfig({
  plugins: [react(), wikiContentPlugin(), questionsContentPlugin()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
