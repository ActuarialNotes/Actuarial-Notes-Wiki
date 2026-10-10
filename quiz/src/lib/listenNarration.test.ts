import { describe, it, expect } from 'vitest'
import { buildListenContent, toSegments } from './listenTokens'
import {
  buildNarration,
  alignTranscript,
  listenBaseUrl,
  listenSlug,
  recordingAudioFile,
  marksFromCharacterAlignment,
  marksFromWordTranscript,
  narrationHash,
  readRecording,
  segmentStartTime,
  tokenAt,
} from './listenNarration'

const PAGE = `A **Probability** $P$ is a measure.

> $$P(E) = \\frac{|E|}{|S|}$$

- The size of $S$ is 6
`

const narrationOf = (md: string) => buildNarration(toSegments(buildListenContent(md).blocks))

describe('buildNarration', () => {
  it('puts one paragraph per segment and ends each with punctuation', () => {
    const n = narrationOf(PAGE)
    expect(n.text).toBe(
      'A Probability P is a measure.\n\nP of E equals the size of E over the size of S.\n\nThe size of S is 6.',
    )
  })

  it('gives every token the characters it owns in the script', () => {
    const n = narrationOf(PAGE)
    const { tokens } = buildListenContent(PAGE)
    for (const nt of n.tokens) {
      const tok = tokens[nt.index]
      const said = n.text.slice(nt.start, nt.end)
      expect(said).toBe(tok.type === 'word' ? tok.speech : tok.speech)
    }
  })

  it('records the first token of each paragraph', () => {
    const n = narrationOf(PAGE)
    expect(n.segmentStarts).toHaveLength(3)
    expect(n.segmentStarts[0]).toBe(0)
  })
})

describe('narrationHash', () => {
  it('is stable and changes with one character', () => {
    expect(narrationHash('abc')).toBe(narrationHash('abc'))
    expect(narrationHash('abc')).not.toBe(narrationHash('abd'))
  })
})

describe('marksFromCharacterAlignment', () => {
  it('starts each token when its first character starts', () => {
    const n = narrationOf('Hello brave world.')
    const starts = Array.from({ length: n.text.length }, (_, i) => i / 10)
    const marks = marksFromCharacterAlignment(n, { character_start_times_seconds: starts })
    expect(marks).toEqual([[0, 0], [1, 0.6], [2, 1.2]])
  })
})

describe('marksFromWordTranscript', () => {
  it('lines the transcript up with the script word by word', () => {
    const n = narrationOf('Hello brave new world.')
    const words = [
      { text: 'Hello', start: 0.1 }, { text: 'brave', start: 0.5 },
      { text: 'new', start: 0.9 }, { text: 'world.', start: 1.2 },
    ]
    expect(marksFromWordTranscript(n, words)).toEqual([[0, 0.1], [1, 0.5], [2, 0.9], [3, 1.2]])
  })

  it('survives a word the transcript wrote differently, without shifting what follows', () => {
    const n = narrationOf('The size of S is six today.')
    const words = [
      { text: 'The', start: 0 }, { text: 'size', start: 0.2 }, { text: 'of', start: 0.4 },
      { text: 'S', start: 0.6 }, { text: 'is', start: 0.8 }, { text: '6', start: 1.0 },
      { text: 'today', start: 1.4 },
    ]
    const marks = marksFromWordTranscript(n, words)
    expect(marks.map(m => m[0])).toEqual([0, 1, 2, 3, 4, 5, 6])
    expect(marks[6][1]).toBe(1.4)
    expect(marks[4][1]).toBe(0.8)
    // "six" is unmatched, so it takes the time of the word before it — never going backwards.
    expect(marks[5][1]).toBe(0.8)
  })

  it('times an equation from the first word it was spoken with', () => {
    const n = narrationOf('So $x^2$ holds.')
    const words = [
      { text: 'So', start: 0 }, { text: 'x', start: 0.3 }, { text: 'squared', start: 0.5 },
      { text: 'holds', start: 1.0 },
    ]
    const marks = marksFromWordTranscript(n, words)
    expect(marks).toEqual([[0, 0], [1, 0.3], [2, 1.0]])
  })

  it('never produces a mark earlier than the one before it', () => {
    const n = narrationOf('a b c d e f.')
    const marks = marksFromWordTranscript(n, [{ text: 'c', start: 2 }, { text: 'e', start: 4 }])
    for (let i = 1; i < marks.length; i++) expect(marks[i][1]).toBeGreaterThanOrEqual(marks[i - 1][1])
  })
})

describe('reading a recording', () => {
  const marks: Array<[number, number]> = [[0, 0], [1, 0.5], [2, 1.5], [3, 2.0]]

  it('finds the token being spoken at a time', () => {
    expect(tokenAt(marks, -1)).toBeNull()
    expect(tokenAt(marks, 0)).toBe(0)
    expect(tokenAt(marks, 0.49)).toBe(0)
    expect(tokenAt(marks, 1.5)).toBe(2)
    expect(tokenAt(marks, 99)).toBe(3)
  })

  it('finds where a paragraph starts', () => {
    const narration = { segmentStarts: [0, 2] }
    expect(segmentStartTime(marks, narration, 1)).toBe(1.5)
    expect(segmentStartTime(marks, narration, 9)).toBe(1.5)
    expect(segmentStartTime(marks, narration, -3)).toBe(0)
  })
})

describe('alignTranscript', () => {
  it('reports the tokens whose words were never heard', () => {
    const n = narrationOf('Alpha beta gamma delta.')
    const { unmatched, spokenTokens } = alignTranscript(n, [{ text: 'alpha', start: 0 }, { text: 'delta', start: 2 }])
    expect(spokenTokens).toBe(4)
    expect(unmatched).toEqual([1, 2])
  })

  it('does not count a bracket with nothing to say as missing', () => {
    const n = narrationOf('Space ($S$): the set.')
    const { unmatched } = alignTranscript(n, [
      { text: 'Space', start: 0 }, { text: 'S', start: 1 }, { text: 'the', start: 2 }, { text: 'set', start: 3 },
    ])
    expect(unmatched).toEqual([])
  })
})

describe('listenSlug', () => {
  it('makes a file name of a concept name', () => {
    expect(listenSlug('Probability')).toBe('probability')
    expect(listenSlug('Probability Density Function (PDF)')).toBe('probability-density-function-pdf')
  })
})

describe('readRecording', () => {
  const n = narrationOf('One two three.')
  const good = {
    v: 1, hash: narrationHash(n.text), audio: 'one-two.mp3', duration: 3,
    voice: { id: 'v', name: 'V' }, model: 'm', marks: [[0, 0], [1, 1], [2, 2]],
  }

  it('accepts a recording made from this script', () => {
    expect(readRecording(good, n)).toEqual(good)
  })

  it('rejects one made from a different script, or damaged', () => {
    expect(readRecording({ ...good, hash: 'stale' }, n)).toBeNull()
    expect(readRecording({ ...good, marks: [[0, 0], [1, 1]] }, n)).toBeNull()
    expect(readRecording({ ...good, marks: [[0, 0], [1, 2], [2, 1]] }, n)).toBeNull()
    expect(readRecording('<!doctype html>', n)).toBeNull()
    expect(readRecording(null, n)).toBeNull()
  })
})

describe('where recordings live', () => {
  it('defaults to the public Supabase Storage bucket', () => {
    expect(listenBaseUrl({ VITE_SUPABASE_URL: 'https://abc.supabase.co' })).toBe(
      'https://abc.supabase.co/storage/v1/object/public/listen',
    )
  })

  it('can be pointed elsewhere, and ignores a trailing slash', () => {
    expect(listenBaseUrl({ VITE_LISTEN_BASE_URL: '/listen/', VITE_SUPABASE_URL: 'https://abc.supabase.co' })).toBe('/listen')
  })

  it('has no recordings with nowhere to look', () => {
    expect(listenBaseUrl({})).toBe('')
  })

  it('names audio by the script it was made from', () => {
    expect(recordingAudioFile('probability', '2lgxonud1b')).toBe('probability-2lgxonud1b.mp3')
  })

  it('refuses a manifest whose audio is not a plain file name', () => {
    const n = narrationOf('One two three.')
    const bad = { v: 1, hash: narrationHash(n.text), audio: '../../evil.mp3', duration: 3, voice: { id: '', name: '' }, model: '', marks: [[0, 0], [1, 1], [2, 2]] }
    expect(readRecording(bad, n)).toBeNull()
    expect(readRecording({ ...bad, audio: 'https://evil.example/x.mp3' }, n)).toBeNull()
  })
})
