import { describe, it, expect, vi } from 'vitest'
import {
  examTransitionName,
  examTransitionStyle,
  viewTransitionsSupported,
  motionAllowed,
  startViewTransition,
  canTransition,
  deskPlace,
  paperMove,
  isPageMove,
  carriesExams,
  EXAM_NAME_PROPERTY,
} from './viewTransition'

describe('examTransitionName', () => {
  it('names each exam once, from its progress key', () => {
    expect(examTransitionName('P')).toBe('exam-card-P')
    expect(examTransitionName('FM')).toBe('exam-card-FM')
    expect(examTransitionName('MAS-I')).toBe('exam-card-MAS-I')
    expect(examTransitionName('CAS-5')).toBe('exam-card-CAS-5')
  })

  it('never lets two exams share a name', () => {
    const keys = ['P', 'FM', 'MAS-I', 'MAS-II', 'CAS-5', '5-1']
    const names = keys.map(examTransitionName)
    expect(new Set(names).size).toBe(keys.length)
  })

  it('folds what a CSS ident cannot hold', () => {
    expect(examTransitionName('Exam 5')).toBe('exam-card-Exam-5')
    expect(examTransitionName(' P ')).toBe('exam-card-P')
  })

  it('always leads with the prefix, so a numeric key stays a valid ident', () => {
    expect(examTransitionName('5')).toBe('exam-card-5')
  })

  it('keeps a localized exam\'s two syllabus pages apart', () => {
    // CAS-6 is one progress key over two pages, and both are listed at once.
    expect(examTransitionName('CAS-6', '6C')).toBe('exam-card-CAS-6-6C')
    expect(examTransitionName('CAS-6', '6U')).toBe('exam-card-CAS-6-6U')
    expect(examTransitionName('CAS-6', '6C')).not.toBe(examTransitionName('CAS-6', '6U'))
  })

  it('ignores the exam id where the key is already the whole identity', () => {
    // Otherwise the Quiz tab's `P` would stop matching Study Guides' `P-1`.
    expect(examTransitionName('P', 'P-1')).toBe('exam-card-P')
    expect(examTransitionName('CAS-5', '5')).toBe('exam-card-CAS-5')
    expect(examTransitionName('MAS-I', 'MAS-I')).toBe('exam-card-MAS-I')
  })

  it('returns undefined rather than a name two keys could collide on', () => {
    expect(examTransitionName('')).toBeUndefined()
    expect(examTransitionName('   ')).toBeUndefined()
    expect(examTransitionName('///')).toBeUndefined()
  })
})

describe('examTransitionStyle', () => {
  it('carries the name in a custom property, for index.css to promote on a tab switch', () => {
    expect(EXAM_NAME_PROPERTY).toBe('--exam-card-name')
    expect(examTransitionStyle('P')).toEqual({ '--exam-card-name': 'exam-card-P' })
    expect(examTransitionStyle('CAS-6', '6C')).toEqual({ '--exam-card-name': 'exam-card-CAS-6-6C' })
  })

  it('never names the element outright — an exam with no partner must stay on its sheet', () => {
    expect(examTransitionStyle('P')).not.toHaveProperty('viewTransitionName')
  })

  it('is undefined where there is no name', () => {
    expect(examTransitionStyle('')).toBeUndefined()
  })
})

describe('viewTransitionsSupported', () => {
  it('reads the API off the document', () => {
    expect(viewTransitionsSupported({ startViewTransition: () => {} } as unknown as Document)).toBe(true)
    expect(viewTransitionsSupported({} as Document)).toBe(false)
    expect(viewTransitionsSupported(null)).toBe(false)
  })
})

describe('motionAllowed', () => {
  function win(matches: boolean): Window {
    return { matchMedia: () => ({ matches }) } as unknown as Window
  }

  it('is false when the reader asked for reduced motion', () => {
    expect(motionAllowed(win(true))).toBe(false)
    expect(motionAllowed(win(false))).toBe(true)
  })

  it('assumes motion is fine where the query cannot be asked', () => {
    expect(motionAllowed(null)).toBe(true)
    expect(motionAllowed({ matchMedia: () => { throw new Error('nope') } } as unknown as Window)).toBe(true)
  })
})

describe('startViewTransition', () => {
  const allowsMotion = { matchMedia: () => ({ matches: false }) } as unknown as Window

  it('runs the update inside a transition when it can', () => {
    const update = vi.fn()
    const startVT = vi.fn((cb: () => void) => { cb(); return { finished: Promise.resolve() } })
    startViewTransition(update, {
      doc: { startViewTransition: startVT } as unknown as Document,
      win: allowsMotion,
    })
    expect(startVT).toHaveBeenCalledOnce()
    expect(update).toHaveBeenCalledOnce()
  })

  it('still updates when the browser has no API', () => {
    const update = vi.fn()
    startViewTransition(update, { doc: {} as Document, win: allowsMotion })
    expect(update).toHaveBeenCalledOnce()
  })

  it('still updates, without a transition, under reduced motion', () => {
    const update = vi.fn()
    const startVT = vi.fn()
    startViewTransition(update, {
      doc: { startViewTransition: startVT } as unknown as Document,
      win: { matchMedia: () => ({ matches: true }) } as unknown as Window,
    })
    expect(startVT).not.toHaveBeenCalled()
    expect(update).toHaveBeenCalledOnce()
  })

  it('falls back to a plain update when starting one throws', () => {
    const update = vi.fn()
    startViewTransition(update, {
      doc: { startViewTransition: () => { throw new Error('nope') } } as unknown as Document,
      win: allowsMotion,
    })
    expect(update).toHaveBeenCalledOnce()
  })

  it('runs the fallback, not the update, when no transition can run', () => {
    const update = vi.fn()
    const fallback = vi.fn()
    startViewTransition(update, { doc: {} as Document, win: allowsMotion, fallback })
    expect(fallback).toHaveBeenCalledOnce()
    expect(update).not.toHaveBeenCalled()
  })

  it('writes the move and the sheet inset to the root, and clears the move when it lands', async () => {
    const dataset: Record<string, string> = {}
    const props: Record<string, string> = {}
    let finish!: () => void
    const finished = new Promise<void>(resolve => { finish = resolve })
    const doc = {
      documentElement: { dataset, style: { setProperty: (k: string, v: string) => { props[k] = v } } },
      startViewTransition: (cb: () => void) => { cb(); return { finished, ready: Promise.resolve() } },
    } as unknown as Document
    startViewTransition(() => {}, { doc, win: allowsMotion, paper: 'push', inset: 255.6 })
    expect(dataset.paper).toBe('push')
    expect(props['--paper-inset']).toBe('256px')
    finish()
    await finished
    await Promise.resolve()
    expect(dataset.paper).toBeUndefined()
  })

  it('leaves a newer transition\'s move in place when an older one lands', async () => {
    const dataset: Record<string, string> = {}
    const resolvers: (() => void)[] = []
    const doc = {
      documentElement: { dataset, style: { setProperty: () => {} } },
      startViewTransition: (cb: () => void) => {
        cb()
        return { finished: new Promise<void>(r => resolvers.push(r)), ready: Promise.resolve() }
      },
    } as unknown as Document
    startViewTransition(() => {}, { doc, win: allowsMotion, paper: 'next' })
    startViewTransition(() => {}, { doc, win: allowsMotion, paper: 'turn' })
    resolvers[0]()
    await Promise.resolve()
    await Promise.resolve()
    expect(dataset.paper).toBe('turn')
  })

  it('swallows a skipped transition rather than surfacing an unhandled rejection', () => {
    const update = vi.fn()
    expect(() => startViewTransition(update, {
      doc: {
        startViewTransition: (cb: () => void) => {
          cb()
          return { finished: Promise.reject(new Error('skipped')) }
        },
      } as unknown as Document,
      win: allowsMotion,
    })).not.toThrow()
  })
})

describe('canTransition', () => {
  it('needs both the API and a reader who is fine with motion', () => {
    const doc = { startViewTransition: () => {} } as unknown as Document
    const win = (matches: boolean) => ({ matchMedia: () => ({ matches }) }) as unknown as Window
    expect(canTransition({ doc, win: win(false) })).toBe(true)
    expect(canTransition({ doc, win: win(true) })).toBe(false)
    expect(canTransition({ doc: {} as Document, win: win(false) })).toBe(false)
  })
})

describe('deskPlace', () => {
  it('lays the tabs out left to right in the sidebar\'s order', () => {
    const order = ['/dashboard', '/wiki', '/flashcards', '/'].map(p => deskPlace(p).tab)
    expect([...order].sort((a, b) => a - b)).toEqual(order)
    expect(new Set(order).size).toBe(order.length)
  })

  it('puts a tab\'s deeper pages on the same tab, further down', () => {
    expect(deskPlace('/wiki')).toEqual({ tab: deskPlace('/wiki').tab, depth: 0 })
    expect(deskPlace('/wiki/exam/Exam%20P-1').tab).toBe(deskPlace('/wiki').tab)
    expect(deskPlace('/wiki/exam/Exam%20P-1').depth).toBe(1)
    expect(deskPlace('/wiki/concept/Bayes').depth).toBe(2)
    expect(deskPlace('/wiki/resource/Werner').depth).toBe(2)
    expect(deskPlace('/quiz').tab).toBe(deskPlace('/').tab)
    expect(deskPlace('/quiz').depth).toBeGreaterThan(deskPlace('/').depth)
    expect(deskPlace('/review').depth).toBeGreaterThan(deskPlace('/quiz').depth)
  })

  it('ignores the query, the hash and a trailing slash', () => {
    expect(deskPlace('/wiki/?q=x#top')).toEqual(deskPlace('/wiki'))
    expect(deskPlace('/quiz?exam=P')).toEqual(deskPlace('/quiz'))
  })

  it('keeps the quiz builder at `/` from swallowing every other path', () => {
    expect(deskPlace('/settings').tab).not.toBe(deskPlace('/').tab)
    expect(deskPlace('/nowhere').tab).not.toBe(deskPlace('/').tab)
  })

  it('reads Cowork as two tabs, with a source or deliverable a sheet over its shelf', () => {
    expect(deskPlace('/cowork').tab).not.toBe(deskPlace('/cowork/deliverables').tab)
    expect(deskPlace('/cowork/sources/osfi')).toEqual({ tab: deskPlace('/cowork').tab, depth: 1 })
    expect(deskPlace('/cowork/deliverables/abc')).toEqual({ tab: deskPlace('/cowork/deliverables').tab, depth: 1 })
  })
})

describe('paperMove', () => {
  it('slides the desk between tabs, toward the tab it is going to', () => {
    expect(paperMove('/dashboard', '/', 'PUSH')).toBe('next')
    expect(paperMove('/', '/wiki', 'PUSH')).toBe('prev')
    expect(paperMove('/wiki/concept/Bayes', '/flashcards', 'PUSH')).toBe('next')
  })

  it('slides the same way on Back as a click would', () => {
    expect(paperMove('/', '/dashboard', 'POP', -1)).toBe('prev')
    expect(paperMove('/dashboard', '/', 'POP', 1)).toBe('next')
  })

  it('lays a sheet over for a link deeper into a tab, and swipes it off coming up', () => {
    expect(paperMove('/wiki', '/wiki/exam/Exam%20P-1', 'PUSH')).toBe('push')
    expect(paperMove('/', '/quiz?exam=P', 'PUSH')).toBe('push')
    expect(paperMove('/quiz', '/review', 'PUSH')).toBe('push')
    expect(paperMove('/review', '/', 'PUSH')).toBe('pop')
    expect(paperMove('/wiki/concept/A', '/wiki/concept/B', 'PUSH')).toBe('push')
  })

  it('swipes the top sheet off on Back within a tab, and lays it back on Forward', () => {
    expect(paperMove('/wiki/exam/Exam%20P-1', '/wiki', 'POP', -1)).toBe('pop')
    expect(paperMove('/wiki/concept/A', '/wiki/concept/B', 'POP', -1)).toBe('pop')
    expect(paperMove('/wiki', '/wiki/exam/Exam%20P-1', 'POP', 1)).toBe('push')
  })

  it('falls back on depth when the history cannot say which way it moved', () => {
    expect(paperMove('/wiki/exam/Exam%20P-1', '/wiki', 'POP', null)).toBe('pop')
    expect(paperMove('/wiki', '/wiki/exam/Exam%20P-1', 'POP')).toBe('push')
  })

  it('leaves the same page showing something else where it is', () => {
    expect(paperMove('/search?q=a', '/search?q=ab', 'PUSH')).toBeNull()
    expect(paperMove('/wiki', '/wiki#top', 'PUSH')).toBeNull()
    expect(paperMove('/wiki', '/wiki/', 'PUSH')).toBeNull()
  })

  it('lands a redirect at once', () => {
    expect(paperMove('/browse', '/search', 'REPLACE')).toBeNull()
    expect(paperMove('/auth', '/dashboard', 'REPLACE')).toBeNull()
  })
})

describe('isPageMove', () => {
  it('tells a page move from a turn within a page', () => {
    for (const move of ['next', 'prev', 'push', 'pop'] as const) expect(isPageMove(move)).toBe(true)
    for (const move of ['turn', 'return'] as const) expect(isPageMove(move)).toBe(false)
  })
})

describe('carriesExams', () => {
  it('carries an exam between the three pages that draw them all', () => {
    expect(carriesExams('/dashboard', '/')).toBe(true)
    expect(carriesExams('/', '/wiki')).toBe(true)
    expect(carriesExams('/wiki/', '/dashboard?tab=x')).toBe(true)
  })

  it('carries nothing where the far side has no exam to set it down on', () => {
    expect(carriesExams('/wiki', '/flashcards')).toBe(false)
    expect(carriesExams('/wiki', '/wiki/exam/Exam%20P-1')).toBe(false)
    expect(carriesExams('/quiz', '/')).toBe(false)
  })
})
