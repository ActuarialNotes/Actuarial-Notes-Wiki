// The knowledge base at run time: the export `src/lib/knowledgeBase.ts` builds
// (served as /ai/knowledge-base.json), indexed for the lookups the connector's
// tools make — an exam by any name a reader uses for it, a concept by its
// title or a variant, a document by id, a full-text search, and the pool a
// practice set is drawn from.
//
// Pure: `indexKnowledgeBase` takes the parsed JSON and returns plain lookups,
// so it is tested directly (src/lib/mcpServer.test.ts). Indexing ~3,000 pages
// and questions takes a few hundred milliseconds, once per warm instance.

export const SUPPORTED_KB_VERSION = 1

/**
 * Mirrors `normalizeTerm` in src/lib/knowledgeBase.ts — the alias table's keys
 * were written with it, so a lookup has to normalise the same way.
 */
export function normalizeTerm(value) {
  return String(value ?? '')
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/['’`]/g, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/** How a learning objective is matched: `A. Ratemaking` and `ratemaking` are one (mirrors parser.ts `objectiveKey`). */
export function objectiveKey(title) {
  return String(title ?? '').trim().replace(/^[A-Z]\.\s+/, '').replace(/\s+/g, ' ').toLowerCase()
}

// ── Search ───────────────────────────────────────────────────────────────────

const STOP_WORDS = new Set(
  'a an and are as at be by can do does for from how i if in into is it its of on or that the their then there these this to use used using was what when where which who why will with you your'.split(' '),
)

/** Light plural folding, so "annuities" finds "annuity" and "reserves" finds "reserve". */
function stem(token) {
  if (token.length > 4 && token.endsWith('ies')) return `${token.slice(0, -3)}y`
  if (token.length > 3 && token.endsWith('s') && !/(ss|us|is)$/.test(token)) return token.slice(0, -1)
  return token
}

export function tokenize(text) {
  return String(text ?? '')
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\\[a-z]+/g, ' ') // LaTeX commands carry no meaning a reader searches for
    .replace(/['’`]/g, '')
    .split(/[^a-z0-9]+/)
    .filter(t => t && !STOP_WORDS.has(t))
    .map(stem)
}

// Unfiltered, a page that explains something outranks a question that merely
// uses the same words — asking for practice is get_practice_questions' job.
const TYPE_PRIOR = { exam: 1.15, concept: 1.1, resource: 1, guide: 1, question: 0.55 }
const K1 = 1.2
const B = 0.75

function countTokens(into, tokens, weight) {
  for (const t of tokens) into.set(t, (into.get(t) ?? 0) + weight)
}

/** Plain text for a snippet: markdown emphasis, link syntax and blockquote markers removed. */
function plain(text) {
  return String(text ?? '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^\s*(?:>\s*)+/gm, '')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^\s*(?:[-*+]|\d+\.)\s+/gm, '')
    .replace(/\*\*|__|`/g, '')
}

/** A short window of `text` around the line that mentions the most query terms. */
export function snippet(text, queryTokens, max = 240) {
  const wanted = new Set(queryTokens)
  const all = plain(text).split(/\n+/).map(l => l.trim()).filter(l => l.length > 2)
  // A figure's caption repeats the page title, so it matches everything and says nothing.
  const prose = all.filter(l => !/^Figure: /.test(l))
  const lines = prose.length ? prose : all
  if (lines.length === 0) return ''
  let best = lines[0]
  let bestHits = -1
  for (const line of lines) {
    const hits = new Set(tokenize(line).filter(t => wanted.has(t))).size
    if (hits > bestHits) {
      best = line
      bestHits = hits
    }
  }
  const flat = best.replace(/\s+/g, ' ')
  if (flat.length <= max) return flat
  // Centre the window on the first matching word.
  const lower = flat.toLowerCase()
  let at = -1
  for (const t of wanted) {
    const i = lower.indexOf(t)
    if (i >= 0 && (at < 0 || i < at)) at = i
  }
  const start = Math.max(0, Math.min(at - Math.floor(max / 3), flat.length - max))
  const window = flat.slice(start, start + max).trim()
  return `${start > 0 ? '…' : ''}${window}${start + max < flat.length ? '…' : ''}`
}

/** What a student reads of a question: the stem, then each part's own stem — never a solution. */
function questionText(q) {
  return [q.stem, ...(q.parts ?? []).map(p => p.stem)].filter(Boolean).join('\n')
}

// ── Index ────────────────────────────────────────────────────────────────────

const EXAM_WORDS = /\b(?:exam|soa|cas)\b/g
const ROMAN = { i: '1', ii: '2' }

/** Every way a reader writes an exam, folded to one key: "Exam MAS-I (CAS)", "mas 1", "MAS I" → "mas1". */
export function examLookupKey(value) {
  return normalizeTerm(value)
    .replace(/\([^)]*\)/g, ' ')
    .replace(EXAM_WORDS, ' ')
    .replace(/\bmas\s*(ii|i|1|2)\b/g, (_m, n) => `mas${ROMAN[n] ?? n}`)
    .replace(/\s+/g, '')
}

/**
 * @param {object} kb The parsed /ai/knowledge-base.json.
 */
export function indexKnowledgeBase(kb) {
  if (!kb || kb.version !== SUPPORTED_KB_VERSION) {
    throw new Error(`Unsupported knowledge base version: ${kb?.version}`)
  }
  const docsById = new Map(kb.docs.map(d => [d.id, d]))
  const docsByPath = new Map(kb.docs.map(d => [d.path.toLowerCase(), d]))
  const questionsById = new Map(kb.questions.map(q => [q.id.toLowerCase(), q]))
  const withheld = new Map(kb.withheld.map(w => [w.id.toLowerCase(), w]))
  const concepts = kb.docs.filter(d => d.kind === 'concept')

  // Exams, by every name a reader might use.
  const examsByLookup = new Map()
  for (const exam of kb.exams) {
    for (const name of [exam.key, exam.examId, exam.name, exam.subject, `${exam.body} ${exam.key}`]) {
      const k = examLookupKey(name)
      if (k && !examsByLookup.has(k)) examsByLookup.set(k, exam)
    }
  }

  // Concepts, by title and variant, in order of authority: a page's own title
  // always wins; then either half of a title with an abbreviation in brackets
  // ("Probability Density Function (PDF)"), when that half names only one
  // page; then the alias table.
  const conceptByKey = new Map()
  for (const doc of concepts) {
    const key = normalizeTerm(doc.title)
    if (key && !conceptByKey.has(key)) conceptByKey.set(key, doc)
  }
  const halves = new Map()
  for (const doc of concepts) {
    const m = /^(.*\S)\s*\(([^)]+)\)\s*$/.exec(doc.title)
    if (!m) continue
    for (const half of [m[1], m[2]]) {
      const key = normalizeTerm(half)
      if (!key || conceptByKey.has(key)) continue
      halves.set(key, halves.has(key) && halves.get(key) !== doc ? null : doc)
    }
  }
  for (const [key, doc] of halves) if (doc) conceptByKey.set(key, doc)
  for (const [alias, title] of Object.entries(kb.aliases ?? {})) {
    const doc = conceptByKey.get(normalizeTerm(title))
    if (doc && !conceptByKey.has(alias)) conceptByKey.set(alias, doc)
  }

  // Practice-question counts per concept, per exam.
  const conceptQuestionCounts = new Map()
  for (const q of kb.questions) {
    if (q.offSyllabus) continue
    for (const c of q.concepts) {
      const doc = conceptByKey.get(normalizeTerm(c))
      const key = doc ? doc.title : c
      if (!conceptQuestionCounts.has(key)) conceptQuestionCounts.set(key, new Map())
      const byExam = conceptQuestionCounts.get(key)
      byExam.set(q.exam, (byExam.get(q.exam) ?? 0) + 1)
    }
  }

  // Full-text index: one bag of words per document, title and aliases weighted
  // up, BM25 over the lot.
  const entries = []
  const addEntry = (type, item, titleText, aliasText, bodyText, exams) => {
    const counts = new Map()
    countTokens(counts, tokenize(titleText), 3)
    countTokens(counts, tokenize(aliasText), 2)
    countTokens(counts, tokenize(bodyText), 1)
    let length = 0
    for (const n of counts.values()) length += n
    entries.push({
      type,
      item,
      exams,
      length,
      counts,
      titleKey: normalizeTerm(titleText),
      aliasKeys: new Set(String(aliasText).split('\n').map(normalizeTerm).filter(Boolean)),
      titleTokens: new Set(tokenize(titleText)),
    })
  }
  for (const doc of kb.docs) {
    addEntry(doc.kind, doc, doc.title, doc.aliases.join('\n'), doc.text, doc.exams)
  }
  for (const q of kb.questions) {
    const options = q.options.map(o => o.text).join(' ')
    const parts = (q.parts ?? []).map(p => `${p.stem} ${p.options.map(o => o.text).join(' ')}`).join(' ')
    // The stem and options only — never the solution, so a hit can't give it away.
    addEntry('question', q, `${q.topic} ${q.concepts.join(' ')}`, q.id, `${q.stem} ${options} ${parts} ${q.objective}`, [q.exam])
  }
  const postings = new Map()
  let totalLength = 0
  entries.forEach((entry, i) => {
    totalLength += entry.length
    for (const [term, tf] of entry.counts) {
      if (!postings.has(term)) postings.set(term, [])
      postings.get(term).push([i, tf])
    }
  })
  const avgLength = entries.length ? totalLength / entries.length : 1

  function exam(query) {
    if (query == null || query === '') return null
    return examsByLookup.get(examLookupKey(String(query))) ?? null
  }

  function concept(name) {
    if (name == null) return null
    let raw = String(name).trim()
    const direct = docsById.get(raw)
    if (direct?.kind === 'concept') return direct
    raw = raw.replace(/^concept\//i, '').replace(/^concepts\//i, '').replace(/\.md$/i, '').replace(/\+/g, ' ')
    try {
      raw = decodeURIComponent(raw)
    } catch { /* already plain */ }
    const key = normalizeTerm(raw)
    const found = conceptByKey.get(key)
    if (found) return found
    // Plural or singular of a title: "annuities" → "Annuity".
    for (const variant of [key.replace(/ies$/, 'y'), key.replace(/s$/, ''), `${key}s`]) {
      const hit = variant !== key ? conceptByKey.get(variant) : null
      if (hit) return hit
    }
    return null
  }

  /** A document by id, path, question id or — failing those — by name. */
  function resolve(ref) {
    const raw = String(ref ?? '').trim()
    if (!raw) return null
    const doc = docsById.get(raw)
    if (doc) return { doc }
    const questionId = raw.replace(/^question\//i, '').toLowerCase()
    const question = questionsById.get(questionId)
    if (question) return { question }
    if (withheld.has(questionId)) return { withheld: withheld.get(questionId) }
    const byPath = docsByPath.get(raw.toLowerCase()) ?? docsByPath.get(`${raw.toLowerCase()}.md`)
    if (byPath) return { doc: byPath }
    const examHit = exam(raw.replace(/^exam\//i, ''))
    if (examHit) return { doc: docsById.get(examHit.docId) }
    const conceptHit = concept(raw)
    if (conceptHit) return { doc: conceptHit }
    const title = normalizeTerm(raw.replace(/^(?:resource|guide)\//i, ''))
    const titled = kb.docs.find(d => normalizeTerm(d.title) === title || d.aliases.some(a => normalizeTerm(a) === title))
    return titled ? { doc: titled } : null
  }

  /**
   * Ranked matches for a query. `type` limits the kind of document, `exam` to
   * one exam's material (an exam key, resolved by the caller).
   */
  function search(query, { type, exam: examKey, limit = 8 } = {}) {
    const terms = [...new Set(tokenize(query))]
    if (terms.length === 0) return []
    const scores = new Map()
    const matched = new Map()
    for (const term of terms) {
      const list = postings.get(term)
      if (!list) continue
      const idf = Math.log(1 + (entries.length - list.length + 0.5) / (list.length + 0.5))
      for (const [i, tf] of list) {
        const entry = entries[i]
        const s = idf * ((tf * (K1 + 1)) / (tf + K1 * (1 - B + (B * entry.length) / avgLength)))
        scores.set(i, (scores.get(i) ?? 0) + s)
        matched.set(i, (matched.get(i) ?? 0) + 1)
      }
    }
    const queryKey = normalizeTerm(query)
    const results = []
    for (const [i, raw] of scores) {
      const entry = entries[i]
      if (type && entry.type !== type) continue
      if (examKey && !entry.exams.includes(examKey)) continue
      // Documents that match every term come first, but a page whose title
      // names the thing ("Development Triangle" for "loss development
      // triangle") is credited for it directly.
      let score = raw * (matched.get(i) / terms.length) ** 1.5
      if (entry.type !== 'question') score += (6 * terms.filter(t => entry.titleTokens.has(t)).length) / terms.length
      if (entry.titleKey === queryKey || entry.aliasKeys.has(queryKey)) score += 25
      else if (queryKey.length >= 4 && entry.titleKey.startsWith(queryKey)) score += 10
      else if (terms.every(t => entry.titleTokens.has(t))) score += 6
      score *= type ? 1 : TYPE_PRIOR[entry.type] ?? 1
      results.push({ type: entry.type, item: entry.item, score })
    }
    results.sort((a, b) => b.score - a.score)
    return results.slice(0, Math.max(1, Math.min(limit, 50))).map(r => ({
      ...r,
      snippet: snippet(r.type === 'question' ? questionText(r.item) : r.item.text, terms),
      terms,
    }))
  }

  /** Concept titles near a name that didn't resolve, for a "did you mean". */
  function suggestConcepts(name, n = 5) {
    return search(name, { type: 'concept', limit: n }).map(r => r.item.title)
  }

  /**
   * The questions a practice set may be drawn from. Off-syllabus questions are
   * kept out unless a sitting is asked for (they belong to their paper), the
   * same rule `filterQuestions` applies in the app.
   */
  function practicePool({ exam: examKey, concept: conceptTitle, objective, topic, difficulty, sitting } = {}) {
    const objectiveWanted = objective ? objectiveKey(objective) : null
    const topicWanted = topic ? normalizeTerm(topic) : null
    const sittingWanted = sitting ? normalizeTerm(sitting) : null
    const conceptWanted = conceptTitle ? normalizeTerm(conceptTitle) : null
    return kb.questions.filter(q => {
      if (q.offSyllabus && !sittingWanted) return false
      if (examKey && q.exam !== examKey) return false
      if (difficulty && q.difficulty !== difficulty) return false
      if (objectiveWanted) {
        const key = objectiveKey(q.objective)
        if (key !== objectiveWanted && !key.includes(objectiveWanted)) return false
      }
      if (topicWanted && !normalizeTerm(q.topic).includes(topicWanted)) return false
      if (sittingWanted && !(q.sitting && normalizeTerm(q.sitting).includes(sittingWanted))) return false
      if (conceptWanted && !q.concepts.some(c => {
        const doc = conceptByKey.get(normalizeTerm(c))
        return normalizeTerm(doc ? doc.title : c) === conceptWanted
      })) return false
      return true
    })
  }

  /** Values for an argument being typed: exam keys, concept titles, question ids. */
  function complete(kind, prefix, max = 100) {
    const p = normalizeTerm(prefix)
    const pick = values => {
      const starts = values.filter(v => normalizeTerm(v).startsWith(p))
      const contains = values.filter(v => !normalizeTerm(v).startsWith(p) && normalizeTerm(v).includes(p))
      const all = [...starts, ...contains]
      return { values: all.slice(0, max), total: all.length, hasMore: all.length > max }
    }
    if (kind === 'exam') return pick(kb.exams.map(e => e.key))
    if (kind === 'concept') return pick(concepts.map(d => d.title))
    if (kind === 'question') return pick(kb.questions.map(q => q.id))
    if (kind === 'resource') return pick(kb.docs.filter(d => d.kind === 'resource').map(d => d.title))
    return { values: [], total: 0, hasMore: false }
  }

  return {
    kb,
    exams: kb.exams,
    exam,
    concept,
    doc: id => docsById.get(id) ?? null,
    question: id => questionsById.get(String(id ?? '').replace(/^question\//i, '').toLowerCase()) ?? null,
    withheldQuestion: id => withheld.get(String(id ?? '').replace(/^question\//i, '').toLowerCase()) ?? null,
    resolve,
    search,
    suggestConcepts,
    practicePool,
    complete,
    conceptQuestionCounts: title => conceptQuestionCounts.get(title) ?? new Map(),
  }
}
