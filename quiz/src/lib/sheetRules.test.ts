import { describe, it, expect } from 'vitest'
import { DEFAULT_SHEET_RULES, isBlockedFunctionKey, parseSheetRules, sheetRulesFromStored, storedWithSheetRules } from './sheetRules'
import { SPREADSHEET_PROFILES, spreadsheetProfileFor } from '../data/examSpreadsheets'
import { EXAM_LABEL_TO_ID } from './examIds'

describe('sheet rules', () => {
  it('defaults to Warn for a quiz and Enforce for a practice exam', () => {
    expect(DEFAULT_SHEET_RULES).toEqual({ 'quiz': 'warn', 'mock-exam': 'enforce' })
    expect(sheetRulesFromStored(null, 'quiz')).toBe('warn')
    expect(sheetRulesFromStored('not json', 'mock-exam')).toBe('enforce')
  })

  it('remembers each mode on its own', () => {
    const raw = storedWithSheetRules(null, 'quiz', 'off')
    expect(sheetRulesFromStored(raw, 'quiz')).toBe('off')
    expect(sheetRulesFromStored(raw, 'mock-exam')).toBe('enforce')
    expect(sheetRulesFromStored(JSON.stringify({ quiz: 'loud' }), 'quiz')).toBe('warn')
  })

  it('narrows an untrusted value', () => {
    expect(parseSheetRules('enforce')).toBe('enforce')
    expect(parseSheetRules('Enforce')).toBeNull()
  })

  it('swallows F1–F10 and leaves the browser’s F11 and F12', () => {
    expect(isBlockedFunctionKey('F2')).toBe(true)
    expect(isBlockedFunctionKey('F4')).toBe(true)
    expect(isBlockedFunctionKey('F10')).toBe(true)
    expect(isBlockedFunctionKey('F11')).toBe(false)
    expect(isBlockedFunctionKey('F')).toBe(false)
  })
})

describe('spreadsheet profiles', () => {
  it('names only real exams, each in one profile', () => {
    const keys = new Set(Object.values(EXAM_LABEL_TO_ID))
    const seen = new Set<string>()
    for (const profile of SPREADSHEET_PROFILES) {
      for (const exam of profile.exams) {
        expect(keys.has(exam), exam).toBe(true)
        expect(seen.has(exam), exam).toBe(false)
        seen.add(exam)
      }
    }
  })

  it('gives the CAS exams sat at Pearson VUE its spreadsheet, and no one else', () => {
    expect(spreadsheetProfileFor('CAS-5')?.id).toBe('pearson-vue')
    expect(spreadsheetProfileFor('MAS-I')?.id).toBe('pearson-vue')
    expect(spreadsheetProfileFor('P')).toBeNull()
    expect(spreadsheetProfileFor('CAS-DA')).toBeNull()
    expect(spreadsheetProfileFor(undefined)).toBeNull()
  })

  it('cites a source and a date for every rule', () => {
    for (const profile of SPREADSHEET_PROFILES) {
      expect(profile.facts.length).toBeGreaterThan(0)
      for (const fact of profile.facts) {
        expect(fact.source).toMatch(/^https:\/\//)
        expect(fact.checked).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      }
    }
  })
})
