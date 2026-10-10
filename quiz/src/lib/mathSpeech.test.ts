import { describe, it, expect } from 'vitest'
import { latexToSpeech } from './mathSpeech'

describe('latexToSpeech', () => {
  it('reads simple equalities and operators', () => {
    expect(latexToSpeech('a + b = c')).toBe('a plus b equals c')
    expect(latexToSpeech('x - y')).toBe('x minus y')
    expect(latexToSpeech('a \\cdot b')).toBe('a times b')
  })

  it('reads function application as "of"', () => {
    expect(latexToSpeech('f(k)')).toBe('f of k')
    expect(latexToSpeech('a(t)')).toBe('a of t')
    expect(latexToSpeech('P(X = k) = f(k)')).toBe('P of X equals k equals f of k')
  })

  it('reads subscripts and superscripts', () => {
    expect(latexToSpeech('x_1')).toBe('x sub 1')
    expect(latexToSpeech('C_t')).toBe('C sub t')
    expect(latexToSpeech('D_{Mac}')).toBe('D sub Mac')
    expect(latexToSpeech('x^2')).toBe('x squared')
    expect(latexToSpeech('x^3')).toBe('x cubed')
    expect(latexToSpeech('v^t')).toBe('v to the power of t')
  })

  it('reads fractions', () => {
    expect(latexToSpeech('\\frac{a}{b}')).toBe('a over b')
    expect(latexToSpeech('\\frac{1}{1+i}')).toBe('1 over 1 plus i')
  })

  it('reads the accumulation function', () => {
    expect(latexToSpeech('a(t) = (1+i)^t')).toBe('a of t equals the quantity 1 plus i to the power of t')
    expect(latexToSpeech('A(t) = P(1+i)^t')).toBe('A of t equals P times the quantity 1 plus i to the power of t')
  })

  it('reads sums with bounds', () => {
    expect(latexToSpeech('\\sum_{t=1}^{n} C_t')).toBe('the sum from t equals 1 to n of C sub t')
    expect(latexToSpeech('\\sum_{t} x_t')).toBe('the sum over t of x sub t')
  })

  it('reads the Macaulay duration formula sensibly', () => {
    const out = latexToSpeech(
      '\\frac{\\displaystyle\\sum_{t=1}^{n} t \\cdot C_t \\cdot v^t}{\\displaystyle\\sum_{t=1}^{n} C_t \\cdot v^t}',
    )
    expect(out).toBe(
      'the sum from t equals 1 to n of t times C sub t times v to the power of t over the sum from t equals 1 to n of C sub t times v to the power of t',
    )
  })

  it('handles Greek letters and relations', () => {
    expect(latexToSpeech('\\sigma^2')).toBe('sigma squared')
    expect(latexToSpeech('\\mu = E[X]')).toBe('mu equals E X')
    expect(latexToSpeech('x \\le y')).toBe('x is less than or equal to y')
    expect(latexToSpeech('n \\to \\infty')).toBe('n approaches infinity')
  })

  it('reads square roots and text', () => {
    expect(latexToSpeech('\\sqrt{x}')).toBe('the square root of x')
    expect(latexToSpeech('\\text{PV}(C_t)')).toBe('P V of C sub t')
  })

  it('returns empty string for empty input', () => {
    expect(latexToSpeech('')).toBe('')
    expect(latexToSpeech('   ')).toBe('')
  })
})

describe('latexToSpeech — probability notation', () => {
  it('reads |E| as the size of a set and |x| as an absolute value', () => {
    expect(latexToSpeech('P(E) = \\frac{|E|}{|S|}')).toBe('P of E equals the size of E over the size of S')
    expect(latexToSpeech('|A \\cup B|')).toBe('the size of A union B')
    expect(latexToSpeech('|x - 1|')).toBe('the absolute value of x minus 1')
  })

  it('reads the conditioning bar as "given"', () => {
    expect(latexToSpeech('P(A \\mid B)')).toBe('P of A given B')
    expect(latexToSpeech('P(A | B) = \\frac{P(A \\cap B)}{P(B)}')).toBe(
      'P of A given B equals P of A intersection B over P of B',
    )
  })

  it('reads a braced set as "the set" and keeps its commas', () => {
    expect(latexToSpeech('\\{1, 2, 3\\}')).toBe('the set 1, 2, 3')
    expect(latexToSpeech('\\{x \\mid x > 0\\}')).toBe('the set x such that x is greater than 0')
  })

  it('reads a right arrow as "gives", not as a limit', () => {
    expect(latexToSpeech('E \\rightarrow \\{2, 4, 6\\}')).toBe('E gives the set 2, 4, 6')
  })

  it('keeps thousands separators and decimals inside a number', () => {
    expect(latexToSpeech('1,000 + 0.5')).toBe('1,000 plus 0.5')
  })
})
