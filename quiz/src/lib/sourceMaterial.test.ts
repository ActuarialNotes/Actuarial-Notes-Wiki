import { describe, it, expect } from 'vitest'
import {
  cleanReadingDetail,
  extractSourceMaterial,
  SOURCE_MATERIAL_MARKER,
} from './sourceMaterial'

describe('extractSourceMaterial', () => {
  const examPage = [
    '## Learning Objectives',
    '> [!example]- General Probability {23-30%}',
    '> 1. Define [[Bayes Theorem]].',
    '',
    '## Source Material',
    '> [!answer]- Source Material',
    '>',
    '> - [[A First Course in Probability (Ross - 2019)]]',
    '>      - Chapters 1-8, Excluding 4.8.4, 5.6.2',
    '> - [[Probability (Leemis - 2018)]]',
    '>      - Chapters 1-8',
    '',
    '## Exam Details',
  ].join('\n')

  it('lifts each source and its reading assignment out of the callout', () => {
    const { entries } = extractSourceMaterial(examPage)
    expect(entries).toEqual([
      {
        name: 'A First Course in Probability (Ross - 2019)',
        target: 'A First Course in Probability (Ross - 2019)',
        label: 'A First Course in Probability (Ross - 2019)',
        detail: 'Chapters 1-8, Excluding 4.8.4, 5.6.2',
      },
      {
        name: 'Probability (Leemis - 2018)',
        target: 'Probability (Leemis - 2018)',
        label: 'Probability (Leemis - 2018)',
        detail: 'Chapters 1-8',
      },
    ])
  })

  it('replaces the callout with the marker and leaves the rest of the page alone', () => {
    const { markdown } = extractSourceMaterial(examPage)
    expect(markdown).toContain(SOURCE_MATERIAL_MARKER)
    expect(markdown).not.toContain('[!answer]')
    expect(markdown).not.toContain('[[Probability (Leemis - 2018)]]')
    expect(markdown).toContain('## Source Material')
    expect(markdown).toContain('> [!example]- General Probability {23-30%}')
    expect(markdown).toContain('## Exam Details')
  })

  it('reads a header with a count tag and no space after the quote marker', () => {
    const md = [
      '>[!answer]- Source Material {6 Sources}',
      '> ',
      '> - [[Basic Ratemaking (Werner - 2016)]]',
      '>      - A1–A15, A17',
    ].join('\n')
    const { entries } = extractSourceMaterial(md)
    expect(entries).toHaveLength(1)
    expect(entries[0].name).toBe('Basic Ratemaking (Werner - 2016)')
    expect(entries[0].detail).toBe('A1–A15, A17')
  })

  it('accepts a bullet with no space before the link', () => {
    const md = [
      '> [!answer]- Source Material',
      '> -[[An Introduction to Generalized Linear Models (Dobson - 2018)]]',
      '>      - C1–C9',
    ].join('\n')
    const { entries } = extractSourceMaterial(md)
    expect(entries).toHaveLength(1)
    expect(entries[0].detail).toBe('C1–C9')
  })

  it('keeps an alias as the label but the page name as the target', () => {
    const md = [
      '> [!answer]- Source Material',
      '> - [[Resources/Books/Probability (Leemis - 2018)|Leemis]]',
    ].join('\n')
    const { entries } = extractSourceMaterial(md)
    expect(entries[0]).toMatchObject({
      name: 'Probability (Leemis - 2018)',
      target: 'Resources/Books/Probability (Leemis - 2018)',
      label: 'Leemis',
    })
  })

  it('stops at the next callout instead of swallowing it', () => {
    const md = [
      '> [!answer]- Source Material',
      '> - [[Probability (Leemis - 2018)]]',
      '> [!info]- Exam day',
      '> Bring a calculator.',
    ].join('\n')
    const { markdown, entries } = extractSourceMaterial(md)
    expect(entries).toHaveLength(1)
    expect(markdown).toContain('> [!info]- Exam day')
    expect(markdown).toContain('> Bring a calculator.')
  })

  it('joins several reading bullets under one source', () => {
    const md = [
      '> [!answer]- Source Material',
      '> - [[Basic Ratemaking (Werner - 2016)]]',
      '>      - A1–A15',
      '>      - A17',
    ].join('\n')
    expect(extractSourceMaterial(md).entries[0].detail).toBe('A1–A15; A17')
  })

  it('does not hand a skipped duplicate its readings to the entry above', () => {
    const md = [
      '> [!answer]- Source Material',
      '> - [[Probability (Leemis - 2018)]]',
      '>      - Chapters 1-8',
      '> - [[Probability (Leemis - 2018)]]',
      '>      - Chapters 9-10',
    ].join('\n')
    const { entries } = extractSourceMaterial(md)
    expect(entries).toHaveLength(1)
    expect(entries[0].detail).toBe('Chapters 1-8')
  })

  it('leaves a page with no source-material callout untouched', () => {
    const md = '## Learning Objectives\n> [!example]- A {10%}\n> 1. Do the thing.'
    expect(extractSourceMaterial(md)).toEqual({ markdown: md, entries: [] })
  })

  it('ignores an [!answer] callout that is not the source-material list', () => {
    const md = '> [!answer]- Solution\n> - [[Bayes Theorem]]'
    expect(extractSourceMaterial(md).entries).toEqual([])
  })
})

describe('cleanReadingDetail', () => {
  it('flattens an Obsidian inline footnote into parentheses', () => {
    expect(cleanReadingDetail('Chapters 1–7^[excluding 1.2.1, 1.8]'))
      .toBe('Chapters 1–7 (excluding 1.2.1, 1.8)')
  })

  it('drops the stray trailing pipe the vault carries', () => {
    expect(cleanReadingDetail('Chapters 1–6^[excluding 2.6]|'))
      .toBe('Chapters 1–6 (excluding 2.6)')
  })

  it('leaves a plain reading range alone', () => {
    expect(cleanReadingDetail('Chapters 1-11')).toBe('Chapters 1-11')
  })
})
