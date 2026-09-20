import { describe, it, expect, vi } from 'vitest'
import {
  examTransitionName,
  examTransitionStyle,
  viewTransitionsSupported,
  motionAllowed,
  startViewTransition,
  isPlainLeftClick,
  linkTargetPath,
  shouldTransitionTo,
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
  it('is the style object a surface spreads', () => {
    expect(examTransitionStyle('P')).toEqual({ viewTransitionName: 'exam-card-P' })
    expect(examTransitionStyle('CAS-6', '6C')).toEqual({ viewTransitionName: 'exam-card-CAS-6-6C' })
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

describe('isPlainLeftClick', () => {
  it('takes a plain left click', () => {
    expect(isPlainLeftClick({ button: 0 })).toBe(true)
    expect(isPlainLeftClick({})).toBe(true)
  })

  it('leaves every other click to the browser', () => {
    expect(isPlainLeftClick({ button: 1 })).toBe(false)
    expect(isPlainLeftClick({ button: 0, metaKey: true })).toBe(false)
    expect(isPlainLeftClick({ button: 0, ctrlKey: true })).toBe(false)
    expect(isPlainLeftClick({ button: 0, shiftKey: true })).toBe(false)
    expect(isPlainLeftClick({ button: 0, altKey: true })).toBe(false)
    expect(isPlainLeftClick({ button: 0, defaultPrevented: true })).toBe(false)
  })
})

describe('linkTargetPath', () => {
  const origin = 'https://example.com'

  it('gives the router path of a same-origin link', () => {
    expect(linkTargetPath('https://example.com/wiki', origin)).toBe('/wiki')
    expect(linkTargetPath('/dashboard?tab=1', origin)).toBe('/dashboard?tab=1')
    expect(linkTargetPath('/wiki#top', origin)).toBe('/wiki#top')
  })

  it('declines anything that leaves this origin', () => {
    expect(linkTargetPath('https://other.example/wiki', origin)).toBeNull()
    expect(linkTargetPath('mailto:a@b.c', origin)).toBeNull()
  })

  it('declines a missing or unparseable href', () => {
    expect(linkTargetPath(null, origin)).toBeNull()
    expect(linkTargetPath('', origin)).toBeNull()
  })
})

describe('shouldTransitionTo', () => {
  it('animates a move, not a re-click of the page you are on', () => {
    expect(shouldTransitionTo('/', '/wiki')).toBe(true)
    expect(shouldTransitionTo('/wiki', '/wiki')).toBe(false)
  })
})
