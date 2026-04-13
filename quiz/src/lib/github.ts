const REPO = import.meta.env.VITE_GITHUB_REPO as string
const BRANCH = import.meta.env.VITE_GITHUB_BRANCH as string
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN as string | undefined
const API_BASE = `https://api.github.com/repos/${REPO}/contents`
const REF = `?ref=${BRANCH}`

const CACHE_KEY = 'actuarial_questions_cache'
const CACHE_TTL_MS = 60 * 60 * 1000 // 1 hour

interface CacheEntry {
  data: string[]   // array of raw Markdown strings
  expiresAt: number
}

function readCache(): string[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const entry: CacheEntry = JSON.parse(raw)
    if (Date.now() > entry.expiresAt) {
      localStorage.removeItem(CACHE_KEY)
      return null
    }
    return entry.data
  } catch {
    return null
  }
}

function writeCache(data: string[]): void {
  const entry: CacheEntry = { data, expiresAt: Date.now() + CACHE_TTL_MS }
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(entry))
  } catch {
    // localStorage quota exceeded — continue without caching
  }
}

function authHeaders(): Record<string, string> {
  if (TOKEN) {
    return { Authorization: `Bearer ${TOKEN}` }
  }
  return {}
}

interface GithubContentItem {
  type: 'file' | 'dir'
  name: string
  path: string
  download_url: string | null
  url: string
}

async function listDirectory(apiPath: string): Promise<GithubContentItem[]> {
  const res = await fetch(`${API_BASE}/${apiPath}${REF}`, { headers: authHeaders() })
  if (!res.ok) throw new Error(`GitHub API error ${res.status} for path: ${apiPath}`)
  return res.json() as Promise<GithubContentItem[]>
}

async function collectMdUrls(dirPath: string): Promise<string[]> {
  const items = await listDirectory(dirPath)
  const urls: string[] = []
  for (const item of items) {
    if (item.type === 'dir') {
      urls.push(...await collectMdUrls(item.path))
    } else if (item.type === 'file' && item.name.endsWith('.md') && item.download_url) {
      urls.push(item.download_url)
    }
  }
  return urls
}

export async function fetchAllQuestions(): Promise<string[]> {
  const cached = readCache()
  if (cached) return cached

  const urls = await collectMdUrls('questions')
  const rawFiles = await Promise.all(
    urls.map(url => fetch(url, { headers: authHeaders() }).then(r => {
      if (!r.ok) throw new Error(`Failed to fetch question file: ${url}`)
      return r.text()
    }))
  )
  writeCache(rawFiles)
  return rawFiles
}

export function clearQuestionsCache(): void {
  localStorage.removeItem(CACHE_KEY)
}
