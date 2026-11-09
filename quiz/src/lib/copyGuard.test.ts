// The copy guard: the mechanical half of docs/writing-style.md. It reads every UI string
// in the app (string literals with a space in them, and JSX text) and fails on the tells a
// machine can see for certain — inflated words, "No more X", praise, "Whether you're" —
// and holds the number of sentences hinged on an em dash to a ceiling that only goes down.
// Everything else in the rules (is it true, is it the app's noun, is it cryptic) needs a
// reader: see the app-copy skill.
import { readdirSync, readFileSync, statSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { describe, expect, it } from 'vitest'

const SRC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

// Transcribed from someone else, verbatim by rule, or behind the Research flag.
const EXEMPT = [
  /\.test\.tsx?$/,
  /[\\/]data[\\/](storeReviews|storeCatalog|communityEvents|communityPlaces|pcpaProjects|examSittingDetails|examFees|pastExams|examPdfLinks|syllabusVintages)\.ts$/,
  /[\\/]lib[\\/]tools[\\/]data[\\/]/,
  /[\\/]lib[\\/]amazonPrice\.ts$/,
  /[Rr]esearch/,
]

/** Lower this when you take em-dash hinges out of the UI; never raise it. */
const EM_DASH_CEILING = 67

const BANNED: [RegExp, string][] = [
  [/\b(empower\w*|supercharg\w*|seamless(ly)?|effortless(ly)?|game-changer|elevate your)\b/i, 'an inflated word'],
  [/\b(your|the) (learning |study )?journey\b/i, '"journey"'],
  [/\bmastered\b/i, '"mastered" (use the levels)'],
  [/\bNo more (?!than\b)\w+/, '"No more X"'],
  [/\b(Great|Nice) (work|job)\b/i, 'praise'],
  [/\bWhether you['’]re\b/i, '"Whether you\'re"'],
]

function files(dir: string): string[] {
  return readdirSync(dir).flatMap(name => {
    const p = path.join(dir, name)
    if (statSync(p).isDirectory()) return files(p)
    return /\.tsx?$/.test(name) && !EXEMPT.some(re => re.test(p)) ? [p] : []
  })
}

function stripComments(source: string): string {
  return source
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, m => m.replace(/[^\n]/g, ' '))
    .replace(/\/\*[\s\S]*?\*\//g, m => m.replace(/[^\n]/g, ' '))
    .split('\n')
    .map(line => line.replace(/(^|[^:'"`\\])\/\/.*$/, '$1'))
    .join('\n')
}

/** The reader-facing strings on one line: literals with a space in them, and JSX text. */
function uiStrings(line: string, tsx: boolean): string[] {
  const out: string[] = []
  for (const m of line.matchAll(/(['"`])((?:\\.|(?!\1).)*)\1/g)) {
    const s = m[2]
    if (/\s/.test(s.trim()) && !/^(@\/|\.{1,2}\/|https?:)/.test(s)) out.push(s)
  }
  if (tsx) {
    for (const m of line.matchAll(/>([^<>{}]+)</g)) out.push(m[1])
    // A line of bare JSX text between tags.
    if (/^\s+[A-Z][^=<>{}();`'"]*$/.test(line) && /\s\S/.test(line.trim())) out.push(line)
  }
  return out
}

const HINGE = /[A-Za-z0-9,.)’'%] — [A-Za-z(“"]/

function scan() {
  const hits: string[] = []
  const hinges: string[] = []
  for (const file of files(SRC)) {
    const rel = path.relative(SRC, file)
    stripComments(readFileSync(file, 'utf-8')).split('\n').forEach((line, i) => {
      for (const s of uiStrings(line, file.endsWith('.tsx'))) {
        for (const [re, what] of BANNED) if (re.test(s)) hits.push(`${rel}:${i + 1} ${what}: ${s.trim().slice(0, 80)}`)
        if (HINGE.test(s)) hinges.push(`${rel}:${i + 1}: ${s.trim().slice(0, 80)}`)
      }
    })
  }
  return { hits, hinges }
}

describe('the copy guard (docs/writing-style.md)', () => {
  const { hits, hinges } = scan()

  it('finds no inflated words, "No more X", praise or "Whether you\'re" in UI strings', () => {
    expect(hits).toEqual([])
  })

  it('keeps em-dash hinges in UI strings at or under the ceiling', () => {
    if (hinges.length > EM_DASH_CEILING) {
      throw new Error(
        `${hinges.length} UI strings hinge on an em dash (ceiling ${EM_DASH_CEILING}). ` +
        `Use a full stop, a comma or "and" instead:\n${hinges.slice(0, 40).join('\n')}`,
      )
    }
  })
})
