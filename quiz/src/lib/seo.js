// The name and description every public page is found by.
//
// A search result is two lines — a title and a snippet — and until this module
// every URL on the site served the same two: "Actuarial Notes" and "Practice
// questions for SOA Exam P and Exam FM". This is where each exam, concept and
// resource page gets its own, derived from the vault so a thousand pages stay
// described without a thousand hand-written blurbs:
//
//   - a concept is described by its opening sentence — the definition every
//     concept page leads with;
//   - an exam by what its study guide holds (objectives, concepts, questions),
//     then its own introduction;
//   - a resource by its lead paragraph, or — for a textbook whose page is only
//     a chapter outline — by its bibliographic facts and its chapters.
//
// An authored `description:` in a page's front matter overrides the derived one.
//
// It is pure and runs twice. `vite.config.ts` runs it at build time to write a
// static <head> (and a crawlable body) into every page's own HTML file, and the
// sitemap; the app runs the same records through `lib/documentHead.ts`, so the
// head a crawler renders agrees with the head it fetched. Imports are relative —
// the vite config pulls this module into its own Node graph. See docs/seo.md.
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import fm from 'front-matter';
import { examDisplayName, fromSlug, wikiRoute } from './wikiRoutes';
import { findSyllabiForConcept, parseExamMetadata, parseExamSyllabus } from './wikiParser';
import { bankLabelFor } from './examIds';
import { buildResourceExamMap, compareExamLabels, examsForResource } from './resourceExams';
export var SITE_ORIGIN = 'https://quiz.actuarialnotes.com';
export var SITE_NAME = 'Actuarial Notes';
export var SITE_LOGO = "".concat(SITE_ORIGIN, "/actuarialnotes-logo-black-512.png");
/** The site's own name and pitch — the home page, and every route with nothing better. */
export var DEFAULT_TITLE = 'Actuarial Notes — Study Guides & Practice Questions for Actuarial Exams';
export var DEFAULT_DESCRIPTION = 'Study guides, concept pages and practice questions for SOA and CAS actuarial exams — Exam P, FM, MAS-I, MAS-II, Exam 5 and beyond.';
/** Where a search result's snippet is cut. Google shows roughly this much. */
export var DESCRIPTION_MAX = 160;
/** Above this a title drops its qualifier ("— Exam 5") rather than be cut off. */
var TITLE_BUDGET = 65;
/** A paragraph shorter than this is a label or a caption, not a lead. */
var MIN_LEAD = 60;
/** The shortest lead still worth quoting — "An event E is any subset of S." */
var MIN_DEFINITION = 30;
/** A page with fewer words than this is a stub — kept out of the index until written. */
export var THIN_PAGE_WORDS = 20;
var HUB_PATH = '/wiki';
/** The app's own public routes, listed in the sitemap beside the vault's pages. */
export var SITEMAP_APP_PATHS = ['/', '/quiz', '/flashcards', '/upgrade', '/store'];
var HUB_NAME = 'Study Guides';
// ── Text ─────────────────────────────────────────────────────────────────────
var GREEK = {
    alpha: 'α', beta: 'β', gamma: 'γ', delta: 'δ', epsilon: 'ε', varepsilon: 'ε', zeta: 'ζ',
    eta: 'η', theta: 'θ', vartheta: 'θ', iota: 'ι', kappa: 'κ', lambda: 'λ', mu: 'μ', nu: 'ν',
    xi: 'ξ', pi: 'π', rho: 'ρ', sigma: 'σ', tau: 'τ', upsilon: 'υ', phi: 'φ', varphi: 'φ',
    chi: 'χ', psi: 'ψ', omega: 'ω', Gamma: 'Γ', Delta: 'Δ', Theta: 'Θ', Lambda: 'Λ', Xi: 'Ξ',
    Pi: 'Π', Sigma: 'Σ', Phi: 'Φ', Psi: 'Ψ', Omega: 'Ω',
};
var SYMBOLS = {
    times: '×', cdot: '·', div: '÷', pm: '±', mp: '∓', le: '≤', leq: '≤', ge: '≥', geq: '≥',
    ne: '≠', neq: '≠', approx: '≈', sim: '~', simeq: '≃', equiv: '≡', propto: '∝', infty: '∞',
    sum: 'Σ', prod: 'Π', int: '∫', partial: '∂', nabla: '∇', to: '→', rightarrow: '→',
    leftarrow: '←', Rightarrow: '⇒', Leftarrow: '⇐', Leftrightarrow: '⇔', iff: '⇔',
    implies: '⇒', mapsto: '↦', in: '∈', notin: '∉', ni: '∋', subset: '⊂', subseteq: '⊆',
    supset: '⊃', cup: '∪', cap: '∩', setminus: '∖', emptyset: '∅', varnothing: '∅',
    forall: '∀', exists: '∃', neg: '¬', lnot: '¬', land: '∧', lor: '∨', ell: 'ℓ', ldots: '…',
    dots: '…', cdots: '⋯', mid: '|', vert: '|', lvert: '|', rvert: '|', Vert: '‖', lVert: '‖',
    rVert: '‖', langle: '⟨', rangle: '⟩', lfloor: '⌊', rfloor: '⌋', lceil: '⌈', rceil: '⌉',
    circ: '∘', ast: '*', star: '⋆', prime: '′', perp: '⊥', parallel: '∥', angle: '∠',
    max: 'max', min: 'min', log: 'log', ln: 'ln', exp: 'exp', lim: 'lim', sup: 'sup',
    inf: 'inf', det: 'det', sin: 'sin', cos: 'cos', tan: 'tan', Pr: 'Pr', arg: 'arg',
    quad: ' ', qquad: ' ',
};
/** Commands that only restyle their argument — the argument is the text. */
var UNWRAP = new Set([
    'text', 'textrm', 'textbf', 'textit', 'textsf', 'texttt', 'textnormal', 'mathrm', 'mathbf',
    'mathit', 'mathsf', 'mathtt', 'mathcal', 'mathscr', 'mathfrak', 'operatorname', 'boldsymbol',
    'bm', 'emph', 'mbox', 'hbox', 'underline', 'underbrace', 'overbrace', 'boxed', 'color',
]);
/** Commands that are pure layout and say nothing. */
var DROP = new Set([
    'left', 'right', 'big', 'Big', 'bigg', 'Bigg', 'bigl', 'bigr', 'Bigl', 'Bigr', 'biggl',
    'biggr', 'displaystyle', 'textstyle', 'scriptstyle', 'limits', 'nolimits', 'nonumber',
    'notag', 'begin', 'end', 'hline', 'label', 'tag', 'phantom', 'vphantom', 'hphantom',
]);
var BLACKBOARD = { R: 'ℝ', N: 'ℕ', Z: 'ℤ', Q: 'ℚ', C: 'ℂ', E: '𝔼', P: 'ℙ' };
var ACCENTS = {
    bar: '̄', overline: '̅', hat: '̂', widehat: '̂', tilde: '̃',
    widetilde: '̃', dot: '̇', ddot: '̈', vec: '⃗', check: '̌',
};
var SUPERSCRIPT = {
    '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸',
    '9': '⁹', '+': '⁺', '-': '⁻', '=': '⁼', '(': '⁽', ')': '⁾', n: 'ⁿ', i: 'ⁱ', T: 'ᵀ',
    k: 'ᵏ', x: 'ˣ', y: 'ʸ', t: 'ᵗ', '′': '′',
};
var SUBSCRIPT = {
    '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇', '8': '₈',
    '9': '₉', '+': '₊', '-': '₋', '=': '₌', '(': '₍', ')': '₎', a: 'ₐ', e: 'ₑ', h: 'ₕ',
    i: 'ᵢ', j: 'ⱼ', k: 'ₖ', l: 'ₗ', m: 'ₘ', n: 'ₙ', o: 'ₒ', p: 'ₚ', r: 'ᵣ', s: 'ₛ', t: 'ₜ',
    u: 'ᵤ', v: 'ᵥ', x: 'ₓ',
};
function script(body, table, marker) {
    var chars = __spreadArray([], body.replace(/\s+/g, ''), true);
    if (chars.length > 0 && chars.every(function (c) { return c in table; }))
        return chars.map(function (c) { return table[c]; }).join('');
    var plain = body.trim();
    return /^[\p{L}\p{N}.′]+$/u.test(plain) ? marker + plain : "".concat(marker, "(").concat(plain, ")");
}
/**
 * Read a TeX fragment as plain text — `$E[X^2]$` as "E[X²]", `$\frac{a}{b}$` as
 * "a/b", `$\mu$` as "μ" — for the places math has to be *read* rather than
 * typeset: a meta description, a snippet. It covers what the vault's inline
 * math actually uses and drops, rather than prints, whatever it doesn't know.
 */
export function latexToText(tex) {
    var i = 0;
    function group() {
        // At a `{`: return its balanced contents and step past the `}`.
        var depth = 0;
        var start = i + 1;
        for (; i < tex.length; i++) {
            if (tex[i] === '\\') {
                i++;
                continue;
            }
            if (tex[i] === '{')
                depth++;
            else if (tex[i] === '}' && --depth === 0)
                break;
        }
        var body = tex.slice(start, i);
        i++;
        return body;
    }
    function arg() {
        var _a;
        while (tex[i] === ' ')
            i++;
        if (tex[i] === '{')
            return group();
        if (tex[i] === '\\') {
            var m = /^\\([A-Za-z]+|.)/.exec(tex.slice(i));
            if (m) {
                i += m[0].length;
                return m[0];
            }
        }
        return (_a = tex[i++]) !== null && _a !== void 0 ? _a : '';
    }
    function optional() {
        while (tex[i] === ' ')
            i++;
        if (tex[i] !== '[')
            return;
        var close = tex.indexOf(']', i);
        i = close === -1 ? tex.length : close + 1;
    }
    function wrap(s) {
        var t = s.trim();
        return /[\s+\-−×·/]/.test(t) && t.length > 1 ? "(".concat(t, ")") : t;
    }
    function run() {
        var _a;
        var out = '';
        while (i < tex.length) {
            var ch = tex[i];
            if (ch === '\\') {
                var m = /^\\([A-Za-z]+|.)/.exec(tex.slice(i));
                if (!m) {
                    i++;
                    continue;
                }
                i += m[0].length;
                var name_1 = m[1];
                if (name_1.length === 1 && !/[A-Za-z]/.test(name_1)) {
                    // `\,` `\;` `\!` `\ ` are spacing; `\%` `\$` `\{` … are the character.
                    out += /[,;:! ]/.test(name_1) ? ' ' : name_1 === '\\' ? ' ' : name_1;
                }
                else if (GREEK[name_1])
                    out += GREEK[name_1];
                else if (SYMBOLS[name_1])
                    out += (/^[a-z]{2,}$/i.test(SYMBOLS[name_1]) ? SYMBOLS[name_1] : " ".concat(SYMBOLS[name_1], " "));
                else if (name_1 === 'frac' || name_1 === 'dfrac' || name_1 === 'tfrac' || name_1 === 'cfrac') {
                    var num = sub(arg());
                    var den = sub(arg());
                    out += "".concat(wrap(num), "/").concat(wrap(den));
                }
                else if (name_1 === 'sqrt') {
                    optional();
                    out += "\u221A".concat(wrap(sub(arg())));
                }
                else if (name_1 === 'binom' || name_1 === 'dbinom' || name_1 === 'tbinom') {
                    var n = sub(arg());
                    var k = sub(arg());
                    out += "C(".concat(n.trim(), ", ").concat(k.trim(), ")");
                }
                else if (name_1 === 'mathbb') {
                    var a = arg().trim();
                    out += (_a = BLACKBOARD[a]) !== null && _a !== void 0 ? _a : a;
                }
                else if (ACCENTS[name_1]) {
                    var a = sub(arg()).trim();
                    out += __spreadArray([], a, true).length === 1 ? a + ACCENTS[name_1] : a;
                }
                else if (name_1 === 'color' || name_1 === 'textcolor') {
                    arg();
                    if (name_1 === 'textcolor')
                        out += sub(arg());
                }
                else if (UNWRAP.has(name_1))
                    out += sub(arg());
                else if (DROP.has(name_1)) {
                    if (name_1 === 'begin' || name_1 === 'end' || name_1 === 'label' || name_1 === 'tag')
                        arg();
                }
                // Anything else is a command this reader doesn't know: say nothing.
            }
            else if (ch === '^' || ch === '_') {
                i++;
                var a = arg();
                out += script(sub(a), ch === '^' ? SUPERSCRIPT : SUBSCRIPT, ch);
            }
            else if (ch === '{') {
                out += sub(group());
            }
            else if (ch === '}') {
                i++;
            }
            else if (ch === '~' || ch === '&') {
                out += ' ';
                i++;
            }
            else {
                out += ch;
                i++;
            }
        }
        return out;
    }
    function sub(fragment) {
        return latexToText(fragment);
    }
    return run()
        .replace(/\s+/g, ' ')
        .replace(/\(\s+/g, '(')
        .replace(/\s+([),.;:])/g, '$1')
        .trim();
}
var PLACEHOLDER = '\u0001';
var ESCAPED_DOLLAR = '\u0002';
/**
 * One paragraph of vault markdown, read as plain text: wiki links as their
 * label, emphasis and code unmarked, inline math read out by `latexToText`,
 * embeds, footnotes, comments and HTML dropped.
 */
export function inlineMarkdownToText(md) {
    var math = [];
    var stash = function (text) { return "".concat(PLACEHOLDER).concat(math.push(text) - 1).concat(PLACEHOLDER); };
    var s = md
        .replace(/%%[\s\S]*?%%/g, '')
        .replace(/\\\$/g, ESCAPED_DOLLAR);
    // Math first, so nothing below mistakes a `_` or `*` inside it for emphasis.
    s = s
        .replace(/\$\$([\s\S]+?)\$\$/g, function (_m, tex) { return stash(latexToText(tex)); })
        .replace(/\$([^$\n]+?)\$/g, function (_m, tex) { return stash(latexToText(tex)); });
    s = s
        .replace(/\s*\^\[(?:[^[\]]|\[[^\]]*\])*\]/g, '')
        // A source link standing alone in parentheses — "([Wikidata](…))" — is a citation, not prose.
        .replace(/\s*\(\s*\[[^\]]+\]\([^)\s]*\)\s*\)/g, '')
        .replace(/!\[\[[^\]]*\]\]/g, '')
        .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
        .replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, function (_m, target, label) {
        return (label === null || label === void 0 ? void 0 : label.trim()) || (target.includes('/') ? target.split('/').pop() : target).trim();
    })
        .replace(/\[([^\]]+)\]\((?:[^()\s]|\([^)]*\))*(?:\s+"[^"]*")?\)/g, '$1')
        .replace(/<[^>]+>/g, '')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/(\*\*|__)(?=\S)([\s\S]*?\S)\1/g, '$2')
        .replace(/(^|[^\w*])\*(?=\S)([^*]*?\S)\*(?!\w)/g, '$1$2')
        .replace(/(^|[^\w])_(?=\S)([^_]*?\S)_(?!\w)/g, '$1$2')
        .replace(/~~(?=\S)([\s\S]*?\S)~~/g, '$1')
        .replace(/==(?=\S)([\s\S]*?\S)==/g, '$1')
        .replace(/\\([\\`*_{}[\]()#+\-.!|~<>])/g, '$1')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&');
    s = s.replace(new RegExp("".concat(PLACEHOLDER, "(\\d+)").concat(PLACEHOLDER), 'g'), function (_m, n) { var _a; return (_a = math[Number(n)]) !== null && _a !== void 0 ? _a : ''; });
    return s
        .replace(new RegExp(ESCAPED_DOLLAR, 'g'), '$')
        .replace(/\s+/g, ' ')
        .replace(/^["“]\s*([^"“”]+?)\s*["”]$/, '$1')
        .replace(/\s+([,.;:!?)])/g, '$1')
        .replace(/\(\s+/g, '(')
        .trim();
}
/** A page's markdown without its YAML front matter and Obsidian Publish breadcrumb line. */
export function pageBody(markdown) {
    return stripChrome(markdown);
}
function stripChrome(markdown) {
    return markdown
        .replace(/^\uFEFF?---\r?\n[\s\S]*?\r?\n---\r?\n?/, '')
        .replace(/^\s+/, '')
        .replace(BREADCRUMB_RE, '');
}
// `[[Actuarial Notes Wiki|Wiki]] / [[Actuarial Glossary]] / **Actuary**`
var BREADCRUMB_RE = /^\[\[[^\]|]*(?:\|[^\]]+)?\]\][^\n]* \/ [^\n]*\n?/;
// A line that opens something other than a prose paragraph.
var NON_PROSE_RE = /^(#{1,6}\s|>|[-*+]\s|\d+[.)]\s|\||!\[|<|\$\$|```|~~~|---+$|\*\*\*+$|___+$|%%)/;
/**
 * The page's introduction, as markdown: the first substantial paragraph of its
 * opening — a concept page's definition, an exam page's first line. Headings
 * before it are passed over (older pages open on `## Name`), but the search
 * stops at the first heading after any other content, so a chapter outline or
 * a page that opens on a formula has no lead rather than some paragraph from
 * its middle. A quoted definition (`> An agent is …`) counts; a callout, a
 * formula box and a list never do.
 */
export function leadParagraph(markdown) {
    var _a, _b;
    var body = stripChrome(markdown)
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/%%[\s\S]*?%%/g, '')
        .replace(/<(div|details|section|span|table|figure|iframe|aside)\b[\s\S]*?<\/\1>/gi, '');
    var candidates = [];
    var block = [];
    var quoted = false;
    var inFence = false;
    var inMath = false;
    var inCallout = false;
    var seenContent = false;
    var endBlock = function () {
        if (block.length)
            candidates.push(block.join(' '));
        block = [];
    };
    for (var _i = 0, _c = body.split('\n'); _i < _c.length; _i++) {
        var raw = _c[_i];
        var t = raw.trim();
        if (inFence) {
            if (/^(```|~~~)/.test(t))
                inFence = false;
            continue;
        }
        if (inMath) {
            if (t.endsWith('$$'))
                inMath = false;
            continue;
        }
        var isQuote = t.startsWith('>');
        var inner = isQuote ? t.replace(/^>\s?/, '').trim() : t;
        if (!isQuote)
            inCallout = false;
        else if (/^\[!\w+\]/.test(inner))
            inCallout = true;
        if (/^#{1,6}\s/.test(t)) {
            endBlock();
            if (seenContent && !/^#\s/.test(t))
                break;
            continue;
        }
        var prose = inner !== '' && !inCallout && !NON_PROSE_RE.test(inner) && !BREADCRUMB_RE.test(inner);
        if (!prose || isQuote !== quoted)
            endBlock();
        if (prose) {
            block.push(inner);
            quoted = isQuote;
            seenContent = true;
            continue;
        }
        if (!inner)
            continue;
        if (/^(```|~~~)/.test(inner))
            inFence = true;
        else if (inner.startsWith('$$') && (inner === '$$' || !inner.slice(2).includes('$$')))
            inMath = true;
        // A cover or figure embed opens a page without being its content.
        if (!/^!\[/.test(inner))
            seenContent = true;
    }
    endBlock();
    return (_b = (_a = candidates.find(function (c) { return inlineMarkdownToText(c).length >= MIN_LEAD; })) !== null && _a !== void 0 ? _a : candidates[0]) !== null && _b !== void 0 ? _b : '';
}
/** A page the vault holds a place for but hasn't written yet. */
var PLACEHOLDER_RE = /\b(?:summary|definition|page) to be written\b/i;
/** An unwritten page: too few words, or a placeholder line where its summary goes. */
export function isStubPage(markdown) {
    return bodyWordCount(markdown) < THIN_PAGE_WORDS || PLACEHOLDER_RE.test(markdown);
}
/** Words of prose on a page, front matter and comments aside. */
export function bodyWordCount(markdown) {
    var _a;
    var body = stripChrome(markdown).replace(/%%[\s\S]*?%%/g, '').replace(/<[^>]+>/g, ' ');
    return ((_a = body.match(/[A-Za-z0-9À-ɏ]+/g)) !== null && _a !== void 0 ? _a : []).length;
}
var ABBREVIATIONS = /(?:^|\s)(?:e\.g|i\.e|vs|etc|No|Nos|Mr|Mrs|Ms|Dr|St|cf|approx|Fig|al|Inc|Ltd|Co|Vol|ed|eds|pp|p|ch|Ch|Sec|U\.S|[A-Z])$/;
/**
 * Cut a description to fit a search result. A whole sentence is preferred when
 * one fills at least half the budget; otherwise it is cut at a word, with an
 * ellipsis, so it never ends mid-word.
 */
export function clampText(text, max) {
    if (max === void 0) { max = DESCRIPTION_MAX; }
    // A lead that introduces a formula ends on a colon; alone, it ends the sentence.
    var s = text.replace(/\s+/g, ' ').trim().replace(/\s*:$/, '.');
    if (s.length <= max)
        return s;
    var cut = -1;
    var re = /[.!?](?=\s+["“(\p{Lu}\d])/gu;
    for (var m = re.exec(s); m && m.index < max; m = re.exec(s)) {
        if (!ABBREVIATIONS.test(s.slice(0, m.index)))
            cut = m.index + 1;
    }
    if (cut >= max / 2)
        return s.slice(0, cut);
    var head = s.slice(0, max - 1);
    var space = head.lastIndexOf(' ');
    var words = space > max * 0.6 ? head.slice(0, space) : head;
    return "".concat(words.replace(/[\s,;:—–(-]+$/, ''), "\u2026");
}
/** "A", "A and B", "A, B and C". */
export function listJoin(items) {
    var _a;
    if (items.length <= 1)
        return (_a = items[0]) !== null && _a !== void 0 ? _a : '';
    return "".concat(items.slice(0, -1).join(', '), " and ").concat(items[items.length - 1]);
}
function frontMatter(markdown) {
    var _a;
    try {
        return ((_a = fm(markdown).attributes) !== null && _a !== void 0 ? _a : {});
    }
    catch (_b) {
        return {};
    }
}
function attr(attrs) {
    var keys = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        keys[_i - 1] = arguments[_i];
    }
    for (var _a = 0, keys_1 = keys; _a < keys_1.length; _a++) {
        var key = keys_1[_a];
        var v = attrs[key];
        if (v != null && String(v).trim())
            return String(v).trim();
    }
    return undefined;
}
/** `Name | Actuarial Notes`, with a qualifier when the whole still fits. */
export function composeTitle(name, qualifier) {
    var brand = " | ".concat(SITE_NAME);
    if (qualifier) {
        var full = "".concat(name, " \u2014 ").concat(qualifier).concat(brand);
        if (full.length <= TITLE_BUDGET)
            return full;
    }
    return "".concat(name).concat(brand);
}
function withContext(description, context) {
    if (!context || description.endsWith('…'))
        return description;
    var joined = "".concat(description, " ").concat(context);
    return joined.length <= DESCRIPTION_MAX ? joined : description;
}
// ── Pages ────────────────────────────────────────────────────────────────────
/** What a concept page carries, for a description that has to be built. */
function conceptFeatures(markdown) {
    var parts = [];
    if (/\$\$/.test(markdown))
        parts.push('formulas');
    if (/\[!example\][^\n]*\n>\s*(?!example to be added)\S/i.test(markdown))
        parts.push('worked examples');
    return listJoin(parts);
}
export function conceptSeo(input) {
    var name = input.name, markdown = input.markdown, exams = input.exams;
    var examNames = exams.map(function (e) { return e.name; });
    var onSyllabus = examNames.length > 0 ? "On the ".concat(listJoin(examNames), " syllabus.") : '';
    var authored = attr(frontMatter(markdown), 'description');
    var lead = inlineMarkdownToText(leadParagraph(markdown));
    var description;
    if (authored)
        description = clampText(authored);
    else if (lead.length >= MIN_DEFINITION)
        description = withContext(clampText(lead), onSyllabus);
    else {
        var features = conceptFeatures(markdown);
        description = clampText("".concat(name, ": study notes").concat(examNames.length ? " for ".concat(listJoin(examNames)) : '').concat(features ? ", with ".concat(features) : '', ", from ").concat(SITE_NAME, "."));
    }
    return {
        kind: 'concept',
        path: wikiRoute({ kind: 'concept', name: name }),
        name: name,
        title: composeTitle(name, exams.length === 1 ? examNames[0] : undefined),
        description: description,
        parent: exams[0],
        guides: exams.length > 1 ? exams : undefined,
        noindex: isStubPage(markdown) || undefined,
    };
}
export function examSeo(input) {
    var _a, _b, _c, _d;
    var fileName = input.fileName, markdown = input.markdown, questions = input.questions;
    var name = examDisplayName(fileName);
    var body = (_b = (_a = /\((SOA|CAS)\)\s*$/i.exec(fileName)) === null || _a === void 0 ? void 0 : _a[1]) === null || _b === void 0 ? void 0 : _b.toUpperCase();
    var meta = parseExamMetadata(markdown);
    var syllabus = meta ? parseExamSyllabus(markdown, meta.examId, meta.examLabel, meta.examTopic, fileName) : null;
    var concepts = new Set((_c = syllabus === null || syllabus === void 0 ? void 0 : syllabus.topics.flatMap(function (t) { return t.concepts.map(function (c) { return c.name.toLowerCase(); }); })) !== null && _c !== void 0 ? _c : []).size;
    var holds = [];
    if (concepts > 0)
        holds.push("".concat(concepts.toLocaleString('en-US'), " concept pages"));
    if (questions > 0)
        holds.push("".concat(questions.toLocaleString('en-US'), " practice questions"));
    var guide = "".concat([body, name].filter(Boolean).join(' '), " study guide");
    var topic = meta === null || meta === void 0 ? void 0 : meta.examTopic;
    var lead = inlineMarkdownToText(leadParagraph(markdown));
    var authored = attr(frontMatter(markdown), 'description');
    // The richest phrasing that fits a result, then the exam's own introduction
    // if there is room for all of it.
    var candidates = [
        topic && holds.length ? "".concat(guide, " for ").concat(topic, ": ").concat(listJoin(holds), ", organized by learning objective.") : '',
        topic && holds.length ? "".concat(guide, " for ").concat(topic, ": ").concat(listJoin(holds), ".") : '',
        holds.length ? "".concat(guide, ": ").concat(listJoin(holds), ", organized by learning objective.") : '',
        topic ? "".concat(guide, " for ").concat(topic, ", organized by learning objective.") : "".concat(guide, ", organized by learning objective."),
    ].filter(Boolean);
    var facts = (_d = candidates.find(function (c) { return c.length <= DESCRIPTION_MAX; })) !== null && _d !== void 0 ? _d : candidates[candidates.length - 1];
    return {
        kind: 'exam',
        path: wikiRoute({ kind: 'exam', name: fileName }),
        name: name,
        title: "".concat(name).concat(body ? " (".concat(body, ")") : '', " Study Guide & Syllabus | ").concat(SITE_NAME),
        description: authored ? clampText(authored) : withContext(clampText(facts), lead),
    };
}
// A resource page ends in `## Related readings` and `## Sources` (docs/resource-pages.md):
// navigation and provenance, not chapters of the work.
var OUTLINE_SKIP_RE = /^(related|see also|notes?|references|further reading|sources?|about|overview|summary)\b/i;
/** A resource page's chapter headings, numbering stripped. */
function chapterTitles(markdown) {
    return stripChrome(markdown)
        .split('\n')
        .map(function (line) { var _a; return (_a = /^##\s+(.+)$/.exec(line.trim())) === null || _a === void 0 ? void 0 : _a[1]; })
        .filter(function (h) { return Boolean(h); })
        .map(function (h) { return inlineMarkdownToText(h)
        .replace(/^(?:chapter|part|section|appendix)\s+[\dIVXLA-Z]+(?:\.\d+)*\s*[—–:.-]?\s*/i, '')
        .replace(/^[\dA-Z]{1,3}(?:\.\d+)*[.:)]?\s+(?=\S)/, '')
        .replace(/^[—–:-]\s*/, '')
        .trim(); })
        .filter(function (h) { return h.length > 1 && !OUTLINE_SKIP_RE.test(h); });
}
/** A long title with a subtitle is named in a result by its main title. */
function shortTitle(name) {
    if (name.length <= 60)
        return name;
    var colon = name.indexOf(': ');
    return colon >= 15 ? name.slice(0, colon) : name;
}
/** "(Ross - 2019)" on the file name → "Ross, 2019": the short citation a reader knows it by. */
function citationQualifier(fileName) {
    var m = /\(([^()]+)\)\s*$/.exec(fileName);
    if (!m)
        return undefined;
    var q = m[1].replace(/\s+[-–—]\s+/g, ', ').trim();
    return q.length <= 24 ? q : undefined;
}
function ordinal(n) {
    var _a;
    var tens = n % 100;
    var suffix = tens >= 11 && tens <= 13 ? 'th' : (_a = ['th', 'st', 'nd', 'rd'][n % 10]) !== null && _a !== void 0 ? _a : 'th';
    return "".concat(n).concat(suffix);
}
/** "10e", "10th" → " (10th edition)"; "First edition" as written; anything else unsaid. */
function editionPhrase(edition) {
    var e = edition === null || edition === void 0 ? void 0 : edition.trim();
    if (!e)
        return '';
    var numbered = /^(\d+)(?:e|st|nd|rd|th)?$/i.exec(e);
    if (numbered)
        return " (".concat(ordinal(Number(numbered[1])), " edition)");
    return /^[\w\s]*edition$/i.test(e) ? " (".concat(e.toLowerCase(), ")") : '';
}
export function resourceSeo(input) {
    var _a;
    var fileName = input.name, markdown = input.markdown, exams = input.exams;
    var attrs = frontMatter(markdown);
    var work = {
        author: attr(attrs, 'Authors', 'Author'),
        publisher: attr(attrs, 'Publisher'),
        year: attr(attrs, 'Year'),
        edition: attr(attrs, 'Edition'),
        isbn: attr(attrs, 'ISBN'),
        type: attr(attrs, 'Type'),
        code: attr(attrs, 'Code'),
    };
    var name = (_a = attr(attrs, 'Title')) !== null && _a !== void 0 ? _a : fileName;
    var short = shortTitle(name);
    var examNames = exams.map(function (e) { return e.name; });
    var reading = examNames.length > 0 ? "A syllabus reading for ".concat(listJoin(examNames), ".") : '';
    var authored = attr(attrs, 'description');
    var lead = inlineMarkdownToText(leadParagraph(markdown));
    var description;
    if (authored)
        description = clampText(authored);
    else if (lead.length >= MIN_LEAD)
        description = withContext(clampText(lead), reading);
    else {
        var by = work.author ? " by ".concat(work.author) : '';
        var imprint = [work.publisher !== work.author ? work.publisher : undefined, work.year].filter(Boolean).join(', ');
        var cite = "".concat(short).concat(editionPhrase(work.edition)).concat(by).concat(imprint ? " (".concat(imprint, ")") : '', ".");
        var base = "".concat(cite).concat(reading ? " ".concat(reading) : '');
        // As many chapter names as the result has room for — they are what a
        // reader searching for the book's content types.
        var chapters = chapterTitles(markdown);
        var outline = '';
        for (var n = 2; n <= chapters.length; n++) {
            var next = " Chapters include ".concat(listJoin(chapters.slice(0, n)), ".");
            if (base.length + next.length > DESCRIPTION_MAX)
                break;
            outline = next;
        }
        description = clampText(base + outline);
    }
    var qualifier = citationQualifier(fileName);
    var qualified = qualifier ? "".concat(short, " (").concat(qualifier, ") | ").concat(SITE_NAME) : '';
    return {
        kind: 'resource',
        path: wikiRoute({ kind: 'resource', name: fileName }),
        name: name,
        title: qualified && qualified.length <= 70 && !short.includes("(".concat(qualifier, ")")) ? qualified : "".concat(short, " | ").concat(SITE_NAME),
        description: description,
        parent: exams[0],
        guides: exams.length > 1 ? exams : undefined,
        noindex: isStubPage(markdown) || undefined,
        work: work,
    };
}
export function hubSeo(exams) {
    var names = exams.map(function (e) { return e.name; });
    return {
        kind: 'hub',
        path: HUB_PATH,
        name: HUB_NAME,
        title: "SOA & CAS Actuarial Exam Study Guides | ".concat(SITE_NAME),
        description: clampText("Study guides for SOA and CAS actuarial ".concat(names.length === 1 ? names[0] : "Exams ".concat(listJoin(names.map(function (n) { return n.replace(/^Exam\s+/i, ''); }))), ": concept pages, practice questions and syllabus readings.")),
    };
}
// ── The whole site ───────────────────────────────────────────────────────────
/**
 * Practice questions per bank label (`exam:` in a question's front matter), not
 * counting the ones no current syllabus covers (`off_syllabus: true`).
 */
export function countQuestionsByExam(rawQuestions) {
    var _a, _b, _c, _d;
    var counts = {};
    for (var _i = 0, rawQuestions_1 = rawQuestions; _i < rawQuestions_1.length; _i++) {
        var raw = rawQuestions_1[_i];
        var head = (_b = (_a = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw)) === null || _a === void 0 ? void 0 : _a[1]) !== null && _b !== void 0 ? _b : '';
        if (/^off_syllabus:\s*true\s*$/m.test(head))
            continue;
        var label = (_c = /^exam:\s*["']?([^"'\n]+?)["']?\s*$/m.exec(head)) === null || _c === void 0 ? void 0 : _c[1];
        if (label)
            counts[label] = ((_d = counts[label]) !== null && _d !== void 0 ? _d : 0) + 1;
    }
    return counts;
}
/**
 * Every public page the vault makes, described: the study-guide hub, each exam,
 * each concept and each resource (`Resources/Books/`). `files` is the wiki
 * bundle's file map (vault path → markdown).
 */
export function buildSeoPages(files, questionCounts) {
    var _a, _b, _c;
    var examFiles = Object.keys(files)
        .filter(function (p) { return !p.includes('/') && /^Exam\b.*\.md$/i.test(p); })
        .map(function (p) { return p.replace(/\.md$/i, ''); })
        .sort(function (a, b) { return compareExamLabels(examDisplayName(a), examDisplayName(b)); });
    var syllabi = [];
    var examCrumbs = new Map();
    var exams = [];
    for (var _i = 0, examFiles_1 = examFiles; _i < examFiles_1.length; _i++) {
        var fileName = examFiles_1[_i];
        var markdown = files["".concat(fileName, ".md")];
        var meta = parseExamMetadata(markdown);
        if (meta)
            syllabi.push(parseExamSyllabus(markdown, meta.examId, meta.examLabel, meta.examTopic, fileName));
        var label = meta ? bankLabelFor(meta) : undefined;
        var page = __assign(__assign({}, examSeo({ fileName: fileName, markdown: markdown, questions: label ? (_a = questionCounts[label]) !== null && _a !== void 0 ? _a : 0 : 0 })), { source: "".concat(fileName, ".md") });
        exams.push(page);
        examCrumbs.set(page.name, { name: page.name, path: page.path });
    }
    var crumbFor = function (s) {
        return s.fileName ? examCrumbs.get(examDisplayName(s.fileName)) : undefined;
    };
    var concepts = [];
    var resources = [];
    var resourceExams = buildResourceExamMap(examFiles.map(function (name) { return ({ name: name, markdown: files["".concat(name, ".md")] }); }));
    for (var _d = 0, _e = Object.entries(files); _d < _e.length; _d++) {
        var _f = _e[_d], filePath = _f[0], markdown = _f[1];
        var concept = (_b = /^Concepts\/([^/]+)\.md$/.exec(filePath)) === null || _b === void 0 ? void 0 : _b[1];
        if (concept) {
            var on = findSyllabiForConcept(syllabi, concept).map(crumbFor).filter(function (c) { return Boolean(c); });
            concepts.push(__assign(__assign({}, conceptSeo({ name: concept, markdown: markdown, exams: on })), { source: filePath }));
            continue;
        }
        var resource = (_c = /^Resources\/Books\/([^/]+)\.md$/.exec(filePath)) === null || _c === void 0 ? void 0 : _c[1];
        if (resource) {
            var on = examsForResource(resourceExams, resource).map(function (label) { return examCrumbs.get(label); }).filter(function (c) { return Boolean(c); });
            resources.push(__assign(__assign({}, resourceSeo({ name: resource, markdown: markdown, exams: on })), { source: filePath }));
        }
    }
    var byName = function (a, b) { return a.path.localeCompare(b.path); };
    var pages = __spreadArray(__spreadArray(__spreadArray([hubSeo(__spreadArray([], examCrumbs.values(), true))], exams, true), concepts.sort(byName), true), resources.sort(byName), true);
    return distinctTitles(pages);
}
/**
 * Two results with one title read as one page twice — a concept and the
 * guideline named after it ("Appointed Actuary"). The resource gives way: its
 * title takes the document's code or type.
 */
function distinctTitles(pages) {
    var _a;
    var seen = new Map();
    for (var _i = 0, pages_1 = pages; _i < pages_1.length; _i++) {
        var page = pages_1[_i];
        seen.set(page.title, ((_a = seen.get(page.title)) !== null && _a !== void 0 ? _a : 0) + 1);
    }
    return pages.map(function (page) {
        var _a, _b, _c, _d, _e;
        if (((_a = seen.get(page.title)) !== null && _a !== void 0 ? _a : 0) < 2 || page.kind !== 'resource')
            return page;
        var tag = (_e = (_c = (_b = page.work) === null || _b === void 0 ? void 0 : _b.code) !== null && _c !== void 0 ? _c : (_d = page.work) === null || _d === void 0 ? void 0 : _d.type) !== null && _e !== void 0 ? _e : 'reading';
        return __assign(__assign({}, page), { title: "".concat(page.title.replace(" | ".concat(SITE_NAME), ''), " (").concat(tag, ") | ").concat(SITE_NAME) });
    });
}
// ── Head ─────────────────────────────────────────────────────────────────────
export function absoluteUrl(path) {
    return "".concat(SITE_ORIGIN).concat(path.startsWith('/') ? path : "/".concat(path));
}
var ORGANIZATION = {
    '@type': 'Organization',
    name: SITE_NAME,
    url: "".concat(SITE_ORIGIN, "/"),
    logo: SITE_LOGO,
};
var ORG_AUTHOR_RE = /\b(board|society|institute|association|office|agency|council|committee|bureau|commission|authority|superintendent|actuaries|government|ministry|department|federation|forum|inc|ltd|corporation|insurance|OSFI|FSRA|AMF|NAIC|CAS|SOA|CIA|IBC|ASB|CCIR|GISA)\b/i;
function workJsonLd(page) {
    var _a, _b;
    var work = (_a = page.work) !== null && _a !== void 0 ? _a : {};
    var isBook = Boolean(work.isbn) || /textbook|monograph|book/i.test((_b = work.type) !== null && _b !== void 0 ? _b : '');
    return __assign(__assign(__assign(__assign(__assign(__assign({ '@type': isBook ? 'Book' : 'CreativeWork', name: page.name }, (work.author ? { author: { '@type': ORG_AUTHOR_RE.test(work.author) ? 'Organization' : 'Person', name: work.author } } : {})), (work.publisher ? { publisher: { '@type': 'Organization', name: work.publisher } } : {})), (work.year ? { datePublished: work.year } : {})), (isBook && work.isbn ? { isbn: work.isbn } : {})), (isBook && work.edition ? { bookEdition: work.edition } : {})), (!isBook && work.type ? { genre: work.type } : {}));
}
function pageJsonLd(page, url) {
    var context = 'https://schema.org';
    var website = { '@type': 'WebSite', name: SITE_NAME, url: "".concat(SITE_ORIGIN, "/") };
    if (page.kind === 'hub') {
        return [{ '@context': context, '@type': 'CollectionPage', name: page.title, description: page.description, url: url, isPartOf: website, publisher: ORGANIZATION }];
    }
    var crumbs = __spreadArray(__spreadArray([{ name: HUB_NAME, path: HUB_PATH }], (page.parent ? [page.parent] : []), true), [{ name: page.name, path: page.path }], false);
    var breadcrumbs = {
        '@context': context,
        '@type': 'BreadcrumbList',
        itemListElement: crumbs.map(function (c, i) { return ({ '@type': 'ListItem', position: i + 1, name: c.name, item: absoluteUrl(c.path) }); }),
    };
    var about = page.kind === 'concept' ? { '@type': 'DefinedTerm', name: page.name }
        : page.kind === 'resource' ? workJsonLd(page)
            : undefined;
    var main = __assign(__assign(__assign({ '@context': context, '@type': 'LearningResource', name: page.kind === 'exam' ? "".concat(page.name, " study guide") : page.name, description: page.description, url: url, inLanguage: 'en' }, (page.kind === 'exam' ? { learningResourceType: 'Study guide', educationalUse: 'Exam preparation' } : {})), (about ? { about: about } : {})), { isPartOf: website, publisher: ORGANIZATION });
    return [main, breadcrumbs];
}
/** Everything the document head should say for one described page. */
export function pageHead(page) {
    var canonical = absoluteUrl(page.path);
    return {
        title: page.title,
        description: page.description,
        canonical: canonical,
        noindex: page.noindex,
        ogType: page.kind === 'hub' ? 'website' : 'article',
        jsonLd: pageJsonLd(page, canonical),
    };
}
var STATIC_TITLES = {
    '/': DEFAULT_TITLE,
    '/auth': "Sign In | ".concat(SITE_NAME),
    '/auth/callback': SITE_NAME,
    '/quiz': "Practice Questions | ".concat(SITE_NAME),
    '/review': "Review | ".concat(SITE_NAME),
    '/dashboard': "Dashboard | ".concat(SITE_NAME),
    '/search': "Search | ".concat(SITE_NAME),
    '/flashcards': "Flashcards | ".concat(SITE_NAME),
    '/project': "Projects | ".concat(SITE_NAME),
    '/battle': "Quiz Battle | ".concat(SITE_NAME),
    '/settings': "Settings | ".concat(SITE_NAME),
    '/upgrade': "Upgrade | ".concat(SITE_NAME),
    '/store': "Store | ".concat(SITE_NAME),
    '/wiki': "SOA & CAS Actuarial Exam Study Guides | ".concat(SITE_NAME),
};
/** Routes that are one reader's own state — never a search result. */
var PRIVATE_ROUTES = new Set(['/auth/callback', '/review', '/settings']);
/**
 * The head a route gets before (or without) its page's own description: its
 * name, the site's description, and its canonical URL when it has one. A wiki
 * page's is its name read back off the URL; the page replaces it with the full
 * record once its chunk has loaded.
 */
export function fallbackHead(pathname) {
    var path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
    var wiki = /^\/wiki\/(exam|concept|resource)\/(.+)$/.exec(path);
    if (wiki) {
        var kind = wiki[1];
        var name_2;
        try {
            name_2 = fromSlug(wiki[2]);
        }
        catch (_a) {
            return { title: SITE_NAME, description: DEFAULT_DESCRIPTION, noindex: true };
        }
        return {
            title: kind === 'exam' ? "".concat(examDisplayName(name_2), " Study Guide & Syllabus | ").concat(SITE_NAME) : "".concat(name_2, " | ").concat(SITE_NAME),
            description: DEFAULT_DESCRIPTION,
            canonical: absoluteUrl(wikiRoute({ kind: kind, name: name_2 })),
            ogType: 'article',
        };
    }
    var title = STATIC_TITLES[path];
    if (!title)
        return { title: SITE_NAME, description: DEFAULT_DESCRIPTION };
    return {
        title: title,
        description: DEFAULT_DESCRIPTION,
        canonical: PRIVATE_ROUTES.has(path) ? undefined : absoluteUrl(path),
        noindex: PRIVATE_ROUTES.has(path) || undefined,
        ogType: 'website',
    };
}
/**
 * A route that names nothing — an unknown path, a wiki page that won't load.
 * The app answers those 200, so without this they would be indexed as pages.
 */
export var NOT_FOUND_HEAD = {
    title: "Page not found | ".concat(SITE_NAME),
    description: DEFAULT_DESCRIPTION,
    noindex: true,
};
export function escapeHtml(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}
/** JSON for a <script> body: `<` escaped so no string can close the tag. */
export function jsonForScript(value) {
    return JSON.stringify(value).replace(/</g, '\\u003c');
}
/**
 * The head as HTML — what the build writes between the `page-head` markers of
 * each page's static file. `lib/documentHead.ts` writes the same tags live;
 * the two must name the same elements, or a page would carry both.
 */
export function headTagsHtml(head) {
    var _a, _b;
    var tags = [
        "<title>".concat(escapeHtml(head.title), "</title>"),
        "<meta name=\"description\" content=\"".concat(escapeHtml(head.description), "\" />"),
        head.noindex ? '<meta name="robots" content="noindex" />' : '',
        head.canonical ? "<link rel=\"canonical\" href=\"".concat(escapeHtml(head.canonical), "\" />") : '',
        "<meta property=\"og:site_name\" content=\"".concat(SITE_NAME, "\" />"),
        "<meta property=\"og:type\" content=\"".concat((_a = head.ogType) !== null && _a !== void 0 ? _a : 'website', "\" />"),
        "<meta property=\"og:title\" content=\"".concat(escapeHtml(head.title), "\" />"),
        "<meta property=\"og:description\" content=\"".concat(escapeHtml(head.description), "\" />"),
        head.canonical ? "<meta property=\"og:url\" content=\"".concat(escapeHtml(head.canonical), "\" />") : '',
        "<meta property=\"og:image\" content=\"".concat(SITE_LOGO, "\" />"),
        '<meta name="twitter:card" content="summary" />',
        ((_b = head.jsonLd) === null || _b === void 0 ? void 0 : _b.length) ? "<script type=\"application/ld+json\" data-page-jsonld>".concat(jsonForScript(head.jsonLd), "</script>") : '',
    ];
    return tags.filter(Boolean).join('\n    ');
}
function xmlEscape(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}
/** A sitemap of absolute URLs, one per path. */
export function sitemapXml(paths) {
    var urls = paths.map(function (p) { return "  <url><loc>".concat(xmlEscape(absoluteUrl(p)), "</loc></url>"); });
    return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n".concat(urls.join('\n'), "\n</urlset>\n");
}
