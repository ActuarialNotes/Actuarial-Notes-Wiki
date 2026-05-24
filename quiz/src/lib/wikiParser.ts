export interface WikiConcept {
  name: string     // display name shown in UI
  target: string   // raw [[target]] before the | alias
  excerpt?: string // cleaned text of the syllabus line that mentions this concept
}

export interface WikiTopic {
  name: string
  weight?: string  // e.g. "23-30%"
  concepts: WikiConcept[]
}

export interface WikiResource {
  name: string     // display name, e.g. "A First Course in Probability (Ross - 2019)"
  target: string   // raw [[target]] (path or name) used to build the wiki route
}

export interface WikiExamSyllabus {
  examId: string
  examLabel: string
  examTopic: string
  topics: WikiTopic[]
  /** Source-material books, parsed from the `[!answer]` callout. */
  resources: WikiResource[]
  /** Source file name without .md extension, e.g. "Exam FM-2 (SOA)" */
  fileName?: string
}

// Maps a wikiParser examId to the exam_progress table key used in tracks.ts.
// "P-1" → "P", "FM-2" → "FM", "MAS-I" → "MAS-I", "7" → "CAS-7", "6C" → "CAS-6"
export function wikiExamIdToProgressKey(examId: string): string {
  if (examId.startsWith('MAS-')) return examId
  if (/^[A-Z]+-\d+$/.test(examId)) return examId.replace(/-\d+$/, '')
  if (/^[A-Z]+$/.test(examId)) return examId
  return 'CAS-' + examId.replace(/[A-Z]+$/, '')
}

// Strip [[wiki links]] from text, keeping only display names, for use as excerpts.
function cleanWikiLinks(text: string): string {
  return text
    .replace(/\[\[[^\]|]+\|([^\]]+)\]\]/g, '$1')
    .replace(/\[\[([^\]]+)\]\]/g, (_, t) =>
      t.includes('/') ? (t.split('/').pop() ?? t) : t)
}

// Extract all [[Name]] and [[Name|Display]] patterns from text.
// Uses display text when present; falls back to the last segment of the path.
// Deduplicates by lowercased name.
function extractWikiLinks(text: string): WikiConcept[] {
  const regex = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g
  const seen = new Set<string>()
  const concepts: WikiConcept[] = []
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    const target = match[1].trim()
    const display = match[2]?.trim()
    const baseName = target.includes('/') ? target.split('/').pop()! : target
    const name = display || baseName

    if (!seen.has(name.toLowerCase())) {
      seen.add(name.toLowerCase())
      concepts.push({ name, target })
    }
  }

  return concepts
}

// Extract exam identity from the data-current attribute on the exam-nav div.
// data-current="P-1|Probability" → { examId: "P-1", examTopic: "Probability", examLabel: "Exam P" }
export function parseExamMetadata(
  content: string,
): { examId: string; examTopic: string; examLabel: string } | null {
  const match = content.match(/data-current="([^|"]+)\|([^"]+)"/)
  if (!match) return null
  const examId = match[1].trim()        // e.g. "P-1"
  const examTopic = match[2].trim()     // e.g. "Probability"
  const examLabel = 'Exam ' + examId.replace(/-\d+$/, '')  // "Exam P"
  return { examId, examTopic, examLabel }
}

// Parse an exam markdown file and extract Learning Objectives as a
// WikiExamSyllabus. `[!example]` callouts (`> [!example]- TopicName {weight}`)
// become topics; every [[wiki link]] inside becomes a concept. Any other
// callout (e.g. `[!answer]- Source Material`) ends the current topic; the
// book links inside the `[!answer]` block are collected as resources so they
// don't get folded into the last learning objective.
export function parseExamSyllabus(
  content: string,
  examId: string,
  examLabel: string,
  examTopic: string,
  fileName?: string,
): WikiExamSyllabus {
  const lines = content.split('\n')
  const topics: WikiTopic[] = []

  interface Acc { name: string; weight?: string; lines: string[] }
  let current: Acc | null = null
  let inResource = false
  const resourceLines: string[] = []

  const flush = () => {
    if (!current) return
    const concepts: WikiConcept[] = []
    const seen = new Set<string>()
    for (const line of current.lines) {
      const lineLinks = extractWikiLinks(line)
      const excerpt = cleanWikiLinks(line).trim()
      for (const link of lineLinks) {
        if (!seen.has(link.name.toLowerCase())) {
          seen.add(link.name.toLowerCase())
          concepts.push({ ...link, excerpt })
        }
      }
    }
    topics.push({ name: current.name, weight: current.weight, concepts })
    current = null
  }

  for (const line of lines) {
    // Any callout header: > [!type]- Title {weight}
    const header = line.match(/^>\s*\[!(\w+)\]-?\s*([^{}\n]*?)(?:\s*\{([^}]+)\})?\s*$/)
    if (header) {
      flush()
      if (header[1].toLowerCase() === 'example') {
        inResource = false
        current = { name: header[2].trim(), weight: header[3]?.trim(), lines: [] }
      } else {
        // Non-example callout (e.g. Source Material) — its body holds resources.
        inResource = true
      }
    } else if (line.startsWith('>')) {
      const body = line.replace(/^>\s?/, '')
      if (current) current.lines.push(body)
      else if (inResource) resourceLines.push(body)
    }
    // Blank lines and non-callout lines outside a block are ignored
  }

  flush()

  const resources: WikiResource[] = []
  const seenResources = new Set<string>()
  for (const line of resourceLines) {
    for (const link of extractWikiLinks(line)) {
      if (!seenResources.has(link.name.toLowerCase())) {
        seenResources.add(link.name.toLowerCase())
        resources.push({ name: link.name, target: link.target })
      }
    }
  }

  return { examId, examLabel, examTopic, topics, resources, fileName }
}
