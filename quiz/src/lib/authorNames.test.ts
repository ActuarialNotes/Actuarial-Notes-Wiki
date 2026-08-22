import { describe, it, expect } from 'vitest'
import { splitAuthors } from './authorNames'

describe('splitAuthors', () => {
  it('returns nothing for a missing or blank value', () => {
    expect(splitAuthors(undefined)).toEqual([])
    expect(splitAuthors(null)).toEqual([])
    expect(splitAuthors('   ')).toEqual([])
  })

  it('keeps a single author whole', () => {
    expect(splitAuthors('Samuel A. Broverman')).toEqual(['Samuel A. Broverman'])
  })

  it('splits "Given Surname" lists on commas', () => {
    expect(splitAuthors('Dennis D. Wackerly, William Mendenhall, Richard L. Scheaffer')).toEqual([
      'Dennis D. Wackerly',
      'William Mendenhall',
      'Richard L. Scheaffer',
    ])
  })

  it('keeps initials attached to the surname they belong to', () => {
    expect(splitAuthors('Hogg, R.V., Tanis, E.A., and Zimmerman, D.L.')).toEqual([
      'Hogg, R.V.',
      'Tanis, E.A.',
      'Zimmerman, D.L.',
    ])
  })

  it('splits on a conjunction with no comma between the authors', () => {
    expect(splitAuthors('Dobson, A.J. and Barnett, A.G.')).toEqual([
      'Dobson, A.J.',
      'Barnett, A.G.',
    ])
    expect(splitAuthors('Wai-Sum Chan & Yiu-Kuen Tse')).toEqual(['Wai-Sum Chan', 'Yiu-Kuen Tse'])
  })

  it('handles hyphenated initials and a lone citation-form name', () => {
    expect(splitAuthors('Tse, Y.-K.')).toEqual(['Tse, Y.-K.'])
    expect(splitAuthors('Daniel, J.W.')).toEqual(['Daniel, J.W.'])
  })

  it('trims stray whitespace around the value and its parts', () => {
    expect(splitAuthors(' Matthew J. Hassett, Donald G. Stewart,  Jelena Milovanovic')).toEqual([
      'Matthew J. Hassett',
      'Donald G. Stewart',
      'Jelena Milovanovic',
    ])
    expect(splitAuthors('Hogg, R.V., Tanis, E.A., and\nZimmerman, D.L.')).toEqual([
      'Hogg, R.V.',
      'Tanis, E.A.',
      'Zimmerman, D.L.',
    ])
  })

  it('keeps suffixes and "et al." with the name they trail', () => {
    expect(splitAuthors('James W. Daniel, Jr.')).toEqual(['James W. Daniel, Jr.'])
    expect(splitAuthors('Goldburd, M., et al.')).toEqual(['Goldburd, M., et al.'])
  })

  it('leaves an organisation name containing "and" alone', () => {
    expect(splitAuthors('American Academy of Actuaries and Related Bodies')).toEqual([
      'American Academy of Actuaries and Related Bodies',
    ])
    expect(splitAuthors('Actuarial Standards Board')).toEqual(['Actuarial Standards Board'])
  })
})
