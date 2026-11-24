// The question bank, parsed once. Every surface that lists or counts questions
// (the one search, Practice's search, Learn's search bar) used to fetch the raw
// files and parse all four thousand for itself, a quarter of a second of work
// each time on a fast machine; they share this one list instead.
//
// The list is shared: read it, never change it.

import { fetchAllQuestions } from '@/lib/github'
import { parseAllQuestions, type Question } from '@/lib/parser'

let bank: Promise<Question[]> | null = null

export function loadParsedQuestions(): Promise<Question[]> {
  bank ??= fetchAllQuestions()
    .then(parseAllQuestions)
    .catch(err => {
      // A failed load is tried again by the next surface that asks.
      bank = null
      throw err
    })
  return bank
}
