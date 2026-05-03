export interface WikiConcept {
  name: string    // display name shown in UI
  target: string  // raw [[target]] before the | alias
}

export interface WikiTopic {
  name: string
  weight?: string  // e.g. "23-30%"
  concepts: WikiConcept[]
}

export interface WikiExamSyllabus {
  examId: string
  examLabel: string
  examTopic: string
  topics: WikiTopic[]
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
// WikiExamSyllabus. Callout blocks (`> [!example]- TopicName {weight}`)
// become topics; every [[wiki link]] inside becomes a concept.
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

  const flush = () => {
    if (!current) return
    topics.push({
      name: current.name,
      weight: current.weight,
      concepts: extractWikiLinks(current.lines.join('\n')),
    })
    current = null
  }

  for (const line of lines) {
    // Callout header: > [!example]- TopicName {weight}
    const header = line.match(/^>\s*\[!example\]-?\s+([^{}\n]+?)(?:\s*\{([^}]+)\})?\s*$/)
    if (header) {
      flush()
      current = { name: header[1].trim(), weight: header[2]?.trim(), lines: [] }
    } else if (current && line.startsWith('>')) {
      // Strip leading "> " and accumulate content
      current.lines.push(line.replace(/^>\s?/, ''))
    }
    // Blank lines and non-callout lines outside a block are ignored
  }

  flush()

  return { examId, examLabel, examTopic, topics, fileName }
}
