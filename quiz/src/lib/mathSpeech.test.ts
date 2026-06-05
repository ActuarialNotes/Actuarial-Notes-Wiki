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
