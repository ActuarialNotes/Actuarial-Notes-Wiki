// Convert LaTeX math into natural spoken English so the "Listen" view doesn't
// read equations as symbol soup. This is a pragmatic, actuarial-content-tuned
// translator — a small recursive descent over the constructs that actually
// appear in the notes (fractions, sums, sub/superscripts, function application,
// Greek letters, operators), not a full LaTeX parser.

const GREEK: Record<string, string> = {
  alpha: 'alpha', beta: 'beta', gamma: 'gamma', delta: 'delta',
  epsilon: 'epsilon', varepsilon: 'epsilon', zeta: 'zeta', eta: 'eta',
  theta: 'theta', vartheta: 'theta', iota: 'iota', kappa: 'kappa',
  lambda: 'lambda', mu: 'mu', nu: 'nu', xi: 'xi', pi: 'pi', varpi: 'pi',
  rho: 'rho', varrho: 'rho', sigma: 'sigma', varsigma: 'sigma', tau: 'tau',
  upsilon: 'upsilon', phi: 'phi', varphi: 'phi', chi: 'kai', psi: 'psi', omega: 'omega',
  Gamma: 'capital gamma', Delta: 'delta', Theta: 'theta', Lambda: 'lambda',
  Xi: 'xi', Pi: 'pi', Sigma: 'sigma', Phi: 'phi', Psi: 'psi', Omega: 'omega',
}

// Multi-letter command → spoken words.
const WORDS: Record<string, string> = {
  cdot: 'times', times: 'times', ast: 'times', div: 'divided by',
  pm: 'plus or minus', mp: 'minus or plus',
  le: 'is less than or equal to', leq: 'is less than or equal to',
  ge: 'is greater than or equal to', geq: 'is greater than or equal to',
  ll: 'is much less than', gg: 'is much greater than',
  ne: 'is not equal to', neq: 'is not equal to', equiv: 'is equivalent to',
  approx: 'is approximately', sim: 'is distributed as', simeq: 'is approximately',
  propto: 'is proportional to', cong: 'is congruent to',
  to: 'approaches', rightarrow: 'gives', longrightarrow: 'gives',
  Rightarrow: 'implies', mid: 'given', Leftrightarrow: 'if and only if', mapsto: 'maps to',
  infty: 'infinity', in: 'in', notin: 'is not in', ni: 'contains',
  subset: 'subset of', subseteq: 'subset of', supset: 'superset of',
  cup: 'union', cap: 'intersection', emptyset: 'the empty set', varnothing: 'the empty set',
  ldots: 'and so on', cdots: 'and so on', dots: 'and so on', vdots: 'and so on', ddots: 'and so on',
  forall: 'for all', exists: 'there exists', partial: 'partial', nabla: 'gradient',
  log: 'log', ln: 'natural log', lg: 'log', exp: 'exp', det: 'determinant',
  sin: 'sine', cos: 'cosine', tan: 'tangent', sec: 'secant', csc: 'cosecant', cot: 'cotangent',
  sinh: 'hyperbolic sine', cosh: 'hyperbolic cosine', tanh: 'hyperbolic tangent',
  arcsin: 'arc sine', arccos: 'arc cosine', arctan: 'arc tangent',
  max: 'max', min: 'min', sup: 'supremum', inf: 'infimum', deg: 'degrees',
  Pr: 'probability', angle: 'angle', perp: 'perpendicular to', parallel: 'parallel to',
  ...GREEK,
}

// Single-character escaped commands → spoken words (e.g. "\%", "\{").
const SYMBOLS: Record<string, string> = {
  '%': 'percent', '$': 'dollars', '&': '', '#': '', '_': 'underscore',
  '{': '', '}': '', '|': '', ' ': '',
}

// Operator / punctuation characters → spoken words.
const OPERATORS: Record<string, string> = {
  '=': 'equals', '+': 'plus', '-': 'minus', '*': 'times', '/': 'over',
  '<': 'is less than', '>': 'is greater than', '!': 'factorial',
  '%': 'percent', '|': '', ':': '', ';': ';', ',': ',', '.': '',
}

interface ParserOptions {
  /** What a lone `|` (and `\\mid`) is called here — "given" inside P(A | B), "such that" in a set. */
  bar?: string
}

class Parser {
  private out: string[] = []
  private i = 0
  private funcCand = false
  // True right after a closed ( … ) — a function call or a group — so that
  // whatever follows with no operator between is a product: (0.4)(0.2), P(A)P(B).
  private groupEnd = false

  constructor(private readonly s: string, private readonly opts: ParserOptions = {}) {}

  parse(): string {
    while (this.i < this.s.length) this.step()
    return this.out.join(' ')
  }

  // Convert a raw LaTeX fragment in a nested context (sub/superscripts, args).
  private sub(raw: string, opts: ParserOptions = this.opts): string {
    return new Parser(raw, opts).parse()
  }

  // Like sub(), but a purely-alphabetic multi-letter group is a label
  // (e.g. the "Mac" in D_{Mac}) and is spoken as one word, not letter-by-letter.
  private speakArg(raw: string): string {
    const t = raw.trim()
    if (/^[A-Za-z]{2,}$/.test(t)) return t
    return this.sub(raw)
  }

  private push(word: string): void {
    if (word) { this.out.push(word); this.groupEnd = false }
  }

  private skipSpaces(): void {
    while (this.i < this.s.length && /\s/.test(this.s[this.i])) this.i++
  }

  private peek(): string {
    return this.s[this.i] ?? ''
  }

  private step(): void {
    const c = this.s[this.i]
    if (/\s/.test(c)) { this.i++; this.funcCand = false; return }
    if (c === '\\') { this.command(); return }
    if (c === '{') { this.push(this.sub(this.readBraced())); this.funcCand = false; return }
    if (c === '}') { this.i++; return }
    if (c === '(') { this.paren(); return }
    if (c === '[' && this.funcCand) { this.square(); return }
    if (c === ')' || c === '[' || c === ']') { this.i++; return }
    if (c === '|') { this.bar(); return }
    if (c === '_') { this.i++; this.push('sub'); this.push(this.speakArg(this.readArg())); this.funcCand = false; return }
    if (c === '^') { this.i++; this.power(); return }
    if (/[0-9]/.test(c)) { this.number(); return }
    if (/[A-Za-z]/.test(c)) { this.letter(); return }
    this.i++
    this.push(OPERATORS[c] ?? '')
    this.funcCand = false
  }

  private command(): void {
    this.i++ // consume backslash
    let name = ''
    if (/[A-Za-z]/.test(this.peek())) {
      while (/[A-Za-z]/.test(this.peek())) name += this.s[this.i++]
    } else {
      name = this.s[this.i++] ?? ''
      if (name === '{') { this.set(); return }
      if (name === '|') { this.bar(); return }
      this.push(SYMBOLS[name] ?? '')
      this.funcCand = false
      return
    }

    switch (name) {
      case 'frac': case 'dfrac': case 'tfrac': case 'cfrac': {
        const a = this.sub(this.readArg())
        const b = this.sub(this.readArg())
        this.push(a); this.push('over'); this.push(b)
        this.funcCand = false
        return
      }
      case 'binom': case 'dbinom': case 'tbinom': case 'choose': {
        const a = this.sub(this.readArg())
        const b = this.sub(this.readArg())
        this.push(a); this.push('choose'); this.push(b)
        this.funcCand = false
        return
      }
      case 'sqrt': {
        this.skipSpaces()
        let root = ''
        if (this.peek() === '[') {
          const r = this.readBracket()
          root = this.sub(r)
        }
        const a = this.sub(this.readArg())
        if (root) this.push(`the ${root} root of ${a}`)
        else this.push(`the square root of ${a}`)
        this.funcCand = false
        return
      }
      case 'begin': case 'end': {
        // An environment's name is not spoken ("cases", "aligned"); an array's
        // column spec — \begin{array}{cc} — isn't either.
        const env = this.readArg().trim()
        if (name === 'begin' && env === 'array') { this.skipSpaces(); if (this.peek() === '{') this.readBraced() }
        this.funcCand = false
        return
      }
      case 'lvert': case 'lVert': { this.pair(/\\r[vV]ert/); return }
      case 'vert': case 'Vert': this.bar(); return
      case 'mid': this.push(this.opts.bar ?? 'given'); this.funcCand = false; return
      case 'sum': this.bigOp('the sum'); return
      case 'prod': this.bigOp('the product'); return
      case 'int': this.bigOp('the integral'); return
      case 'iint': this.bigOp('the double integral'); return
      case 'oint': this.bigOp('the contour integral'); return
      case 'bigcup': this.bigOp('the union'); return
      case 'bigcap': this.bigOp('the intersection'); return
      case 'lim': this.limit(); return
      case 'text': case 'textrm': case 'textbf': case 'textit':
      case 'mathrm': case 'mathbf': case 'mathit': case 'mathsf':
      case 'mathcal': case 'mathbb': case 'mathfrak': case 'operatorname': {
        const raw = this.readArg()
        this.push(textual(raw))
        this.funcCand = /[A-Za-z]/.test(raw.trim())
        return
      }
      case 'overline': case 'bar': { this.push(`${this.sub(this.readArg())} bar`); this.funcCand = false; return }
      case 'hat': case 'widehat': { this.push(`${this.sub(this.readArg())} hat`); this.funcCand = false; return }
      case 'tilde': case 'widetilde': { this.push(`${this.sub(this.readArg())} tilde`); this.funcCand = false; return }
      case 'vec': { this.push(`${this.sub(this.readArg())} vector`); this.funcCand = false; return }
      case 'dot': { this.push(`${this.sub(this.readArg())} dot`); this.funcCand = false; return }
      case 'ddot': { this.push(`${this.sub(this.readArg())} double dot`); this.funcCand = false; return }
      case 'boxed': { this.push(this.sub(this.readArg())); this.funcCand = false; return }
      default: {
        if (name in WORDS) {
          this.push(WORDS[name])
          this.funcCand = name in GREEK
          return
        }
        // Unknown command — skip rather than read the raw control word.
        this.funcCand = false
        return
      }
    }
  }

  // E[X] — square brackets straight after a function name are its argument, "E of X".
  private square(): void {
    this.i++ // skip '['
    let depth = 1
    const start = this.i
    while (this.i < this.s.length && depth > 0) {
      const c = this.s[this.i]
      if (c === '[') depth++
      else if (c === ']') { depth--; if (depth === 0) break }
      this.i++
    }
    const inner = this.s.slice(start, this.i)
    if (this.s[this.i] === ']') this.i++
    this.push('of')
    this.push(this.sub(inner, { bar: 'given' }))
    this.groupEnd = true
    this.funcCand = false
  }

  // `\\{ … \\}` is a set: "the set 1, 2, 3", and a bar inside it is "such that".
  private set(): void {
    const start = this.i
    let depth = 0
    let end = -1
    for (let j = this.i; j < this.s.length; j++) {
      if (this.s[j] === '\\' && this.s[j + 1] === '{') { depth++; j++ }
      else if (this.s[j] === '\\' && this.s[j + 1] === '}') {
        if (depth === 0) { end = j; break }
        depth--; j++
      }
    }
    const inner = end < 0 ? this.s.slice(start) : this.s.slice(start, end)
    this.i = end < 0 ? this.s.length : end + 2
    this.push('the set')
    this.push(this.sub(inner, { bar: 'such that' }))
    this.funcCand = false
  }

  // A bar is one of a pair — |E| the size of a set, |x| an absolute value — or,
  // alone, the conditioning bar. Without a partner it is "given" where the
  // caller says so (inside P( )), and silent otherwise (n̅| in annuity notation).
  private bar(): void {
    if (this.s[this.i] === '|') this.i++
    const close = this.s.indexOf('|', this.i)
    if (close < 0) {
      this.push(this.opts.bar ?? '')
      this.funcCand = false
      return
    }
    const inner = this.s.slice(this.i, close)
    this.i = close + 1
    this.speakBars(inner)
  }

  private pair(close: RegExp): void {
    const rest = this.s.slice(this.i)
    const m = close.exec(rest)
    const inner = m ? rest.slice(0, m.index) : rest
    this.i += m ? m.index + m[0].length : rest.length
    this.speakBars(inner)
  }

  private speakBars(inner: string): void {
    // A set's size is its cardinality; anything else between bars is a magnitude.
    const isSet = /[A-Z]|\\(cup|cap|setminus|mathcal)\b/.test(inner)
    this.push(isSet ? 'the size of' : 'the absolute value of')
    this.push(this.sub(inner))
    this.funcCand = false
  }

  // Sum / product / integral with optional lower (_) and upper (^) bounds.
  private bigOp(base: string): void {
    let lower = ''
    let upper = ''
    this.skipSpaces()
    while (this.peek() === '_' || this.peek() === '^') {
      const mark = this.s[this.i++]
      const arg = this.sub(this.readArg())
      if (mark === '_') lower = arg
      else upper = arg
      this.skipSpaces()
    }
    if (lower && upper) this.push(`${base} from ${lower} to ${upper} of`)
    else if (lower) this.push(`${base} over ${lower} of`)
    else this.push(`${base} of`)
    this.funcCand = false
  }

  private limit(): void {
    let lower = ''
    this.skipSpaces()
    while (this.peek() === '_' || this.peek() === '^') {
      const mark = this.s[this.i++]
      const arg = this.sub(this.readArg())
      if (mark === '_') lower = arg
      this.skipSpaces()
    }
    this.push(lower ? `the limit as ${lower} of` : 'the limit of')
    this.funcCand = false
  }

  private power(): void {
    const t = this.sub(this.readArg()).trim()
    if (t === '2') this.push('squared')
    else if (t === '3') this.push('cubed')
    else this.push(`to the power of ${t}`)
    this.funcCand = false
  }

  private paren(): void {
    const wasFunc = this.funcCand
    // 0.4(0.2) and (a)(b): a group with no operator before it multiplies.
    const last = this.out[this.out.length - 1] ?? ''
    if (!wasFunc && (this.groupEnd || /^\d[\d.,]*$/.test(last))) this.push('times')
    const content = this.readParen()
    this.skipSpaces()
    if (this.peek() === '^') {
      // A power applies to the whole group → "the quantity … to the power of …".
      // Juxtaposition like P(1+i)^t means multiplication, so say "times".
      if (wasFunc) this.push('times')
      this.push('the quantity')
      this.push(this.sub(content))
      this.i++ // consume ^
      this.power()
    } else if (wasFunc) {
      this.push('of')
      this.push(this.sub(content, { bar: 'given' }))
    } else {
      this.push(this.sub(content))
    }
    this.groupEnd = true
    this.funcCand = false
  }

  private number(): void {
    let n = ''
    // A comma or point belongs to the number only with a digit after it (1,000 · 0.5);
    // otherwise it is punctuation — the commas in {1, 2, 3} must survive.
    while (this.i < this.s.length) {
      const ch = this.s[this.i]
      if (/[0-9]/.test(ch) || (/[.,]/.test(ch) && /[0-9]/.test(this.s[this.i + 1] ?? ''))) n += ch
      else break
      this.i++
    }
    this.push(n)
    this.funcCand = false
  }

  private letter(): void {
    // Read single letters so each variable is spoken as a letter ("x y", not "ksy").
    const ch = this.s[this.i]
    const differential = ch === 'd' && /[A-Za-z]/.test(this.s[this.i + 1] ?? '')
    if (this.groupEnd && !differential) this.push('times')
    this.push(ch)
    this.i++
    this.funcCand = true
  }

  // --- raw substring readers (return un-converted LaTeX) ---

  private readArg(): string {
    this.skipSpaces()
    const c = this.peek()
    if (c === '{') return this.readBraced()
    if (c === '\\') {
      const start = this.i
      this.i++
      if (/[A-Za-z]/.test(this.peek())) while (/[A-Za-z]/.test(this.peek())) this.i++
      else this.i++
      return this.s.slice(start, this.i)
    }
    if (this.i < this.s.length) return this.s[this.i++]
    return ''
  }

  private readBraced(): string {
    // assumes current char is '{'
    this.i++ // skip '{'
    let depth = 1
    const start = this.i
    while (this.i < this.s.length && depth > 0) {
      const c = this.s[this.i]
      if (c === '{') depth++
      else if (c === '}') { depth--; if (depth === 0) break }
      this.i++
    }
    const inner = this.s.slice(start, this.i)
    if (this.s[this.i] === '}') this.i++
    return inner
  }

  private readBracket(): string {
    this.i++ // skip '['
    const start = this.i
    while (this.i < this.s.length && this.s[this.i] !== ']') this.i++
    const inner = this.s.slice(start, this.i)
    if (this.s[this.i] === ']') this.i++
    return inner
  }

  private readParen(): string {
    this.i++ // skip '('
    let depth = 1
    const start = this.i
    while (this.i < this.s.length && depth > 0) {
      const c = this.s[this.i]
      if (c === '(') depth++
      else if (c === ')') { depth--; if (depth === 0) break }
      this.i++
    }
    const inner = this.s.slice(start, this.i)
    if (this.s[this.i] === ')') this.i++
    return inner
  }
}

// Text-mode content (\text{…}): read literally, but spell short all-caps tokens
// like "PV" as letters so they aren't mispronounced.
function textual(raw: string): string {
  const t = raw.trim()
  if (/^[A-Z]{2,5}$/.test(t)) return t.split('').join(' ')
  return t
}

// Strip spacing / styling cruft that carries no spoken meaning.
function preclean(s: string): string {
  return s
    .replace(/\\left\b\.?/g, '')
    .replace(/\\right\b\.?/g, '')
    .replace(/\\(displaystyle|textstyle|scriptstyle|scriptscriptstyle|limits|nolimits)\b/g, '')
    .replace(/\\(biggl|biggr|bigl|bigr|Biggl|Biggr|Bigl|Bigr|bigg|big|Bigg|Big)\b/g, '')
    .replace(/\\\\\s*\[[0-9.]+\s*(pt|em|ex|mm|cm)\]/g, ' , ')
    .replace(/\\\\/g, ' , ')
    .replace(/\\[,;:!> ]/g, ' ')
    .replace(/\\(quad|qquad|hspace|vspace)\b/g, ' ')
    .replace(/[~&]/g, ' ')
}

const NORMALIZE_RE = /\s+/g

function normalize(s: string): string {
  return s
    .replace(NORMALIZE_RE, ' ')
    .replace(/\s+([,.;])/g, '$1')
    .replace(/([,;])(?=[,;])/g, '')
    .replace(/,\s*,/g, ',')
    .trim()
}

/**
 * Translate a LaTeX math fragment (no surrounding `$` delimiters) into a
 * spoken-English phrase suitable for text-to-speech.
 */
export function latexToSpeech(input: string): string {
  if (!input || !input.trim()) return ''
  const cleaned = preclean(input)
  const spoken = new Parser(cleaned).parse()
  return normalize(spoken)
}
