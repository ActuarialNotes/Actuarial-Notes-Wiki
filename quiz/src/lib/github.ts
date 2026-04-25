const REPO = import.meta.env.VITE_GITHUB_REPO as string
const BRANCH = import.meta.env.VITE_GITHUB_BRANCH as string
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN as string | undefined
const API_BASE = `https://api.github.com/repos/${REPO}/contents`
const TREES_API = `https://api.github.com/repos/${REPO}/git/trees`
const RAW_BASE = `https://raw.githubusercontent.com/${REPO}/${BRANCH}`
const REF = `?ref=${BRANCH}`
const PER_PAGE = 100  // GitHub max for /contents

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

const FETCH_TIMEOUT_MS = 10_000

// Wrap fetch with an AbortController so a stalled GitHub request can't hang the app.
async function fetchWithTimeout(url: string, init?: RequestInit): Promise<Response> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
  try {
    return await fetch(url, { ...init, signal: controller.signal })
  } finally {
    clearTimeout(timer)
  }
}

export interface GithubContentItem {
  type: 'file' | 'dir'
  name: string
  path: string
  download_url: string | null
  url: string
}

interface GitTreeItem {
  path: string
  type: 'blob' | 'tree'
  url: string
}

interface GitTreeResponse {
  tree: GitTreeItem[]
  truncated: boolean
}

// List any directory in the repo; omit dirPath to list the root.
// Pages through the GitHub Contents API so directories with >30 items aren't truncated.
export async function listRepoContents(dirPath?: string): Promise<GithubContentItem[]> {
  const baseUrl = dirPath ? `${API_BASE}/${dirPath}` : `${API_BASE}`
  const all: GithubContentItem[] = []
  for (let page = 1; ; page++) {
    const url = `${baseUrl}${REF}&per_page=${PER_PAGE}&page=${page}`
    const res = await fetchWithTimeout(url, { headers: authHeaders() })
    if (!res.ok) throw new Error(`GitHub API error ${res.status} for path: ${dirPath ?? '(root)'}`)
    const items = await res.json() as GithubContentItem[]
    if (!Array.isArray(items)) return items as unknown as GithubContentItem[]  // single-file response
    all.push(...items)
    if (items.length < PER_PAGE) break
  }
  return all
}

async function collectMdUrlsViaTree(dirPrefix: string): Promise<string[]> {
  const url = `${TREES_API}/${BRANCH}?recursive=1`
  const res = await fetchWithTimeout(url, { headers: authHeaders() })
  if (!res.ok) throw new Error(`GitHub Trees API error ${res.status}`)
  const data = await res.json() as GitTreeResponse
  if (data.truncated) {
    console.warn('collectMdUrlsViaTree: tree response was truncated — some questions may be missing')
  }
  return data.tree
    .filter(item => item.type === 'blob' && item.path.startsWith(dirPrefix) && item.path.endsWith('.md'))
    .map(item => `${RAW_BASE}/${item.path}`)
}

// Fallback for when the git trees API is unavailable: lists the questions/
// directory via the Contents API, which is served from a different endpoint
// and has a separate rate-limit budget.  Only works for flat (non-nested)
// question directories, but that matches the current repo layout.
async function collectMdUrlsViaContents(dirPath: string): Promise<string[]> {
  const items = await listRepoContents(dirPath.replace(/\/$/, ''))
  return items
    .filter(it => it.type === 'file' && it.name.endsWith('.md'))
    .map(it => `${RAW_BASE}/${it.path}`)
}

export async function fetchAllQuestions(): Promise<string[]> {
  const cached = readCache()
  if (cached) return cached

  let urls: string[]
  try {
    urls = await collectMdUrlsViaTree('questions/')
  } catch (treeErr) {
    console.warn('fetchAllQuestions: trees API failed, falling back to contents API:', treeErr)
    urls = await collectMdUrlsViaContents('questions/')
  }
  // Tolerate individual file failures so one transient 5xx doesn't blank the quiz.
  const settled = await Promise.allSettled(
    urls.map(url => fetchWithTimeout(url, { headers: authHeaders() }).then(r => {
      if (!r.ok) throw new Error(`Failed to fetch question file: ${url} (${r.status})`)
      return r.text()
    }))
  )
  const rawFiles: string[] = []
  let failures = 0
  for (const result of settled) {
    if (result.status === 'fulfilled') rawFiles.push(result.value)
    else failures++
  }
  if (failures > 0) console.warn(`fetchAllQuestions: ${failures}/${urls.length} files failed to load`)
  writeCache(rawFiles)
  return rawFiles
}

export function clearQuestionsCache(): void {
  localStorage.removeItem(CACHE_KEY)
}

export async function fetchWikiFile(filePath: string): Promise<string> {
  const encoded = filePath.split('/').map(encodeURIComponent).join('/')
  const res = await fetchWithTimeout(`${RAW_BASE}/${encoded}`, { headers: authHeaders() })
  if (!res.ok) throw new Error(`Failed to download wiki file: ${filePath} (${res.status})`)
  return res.text()
}
