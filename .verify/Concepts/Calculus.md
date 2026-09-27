---
target: Concepts/Calculus.md
created: 2026-09-27
---

## [F-001] Table pipes and stray \quad break the series and exponential rows
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- severity: minor
- status: open
- locus: Differentiation table line 40; Maclaurin table lines 101-102
- claim: $\displaystyle\sum_{n=1}^{\infty} \frac{(-1)^{n+1}x^n}{n}$, \quad $|x| \leq 1$ (same shape on lines 40 and 102)
- evidence: In a GFM table an unescaped | ends the cell even inside $...$, so the rows on lines 101-102 split at |x| into cells beyond the two-column header: the convergence conditions drop out of the rendered table and a dangling $ is left in the series cell. On lines 40, 101 and 102 the \quad sits between two math spans, i.e. in plain text, where Markdown shows the literal characters \quad. The fix folds \quad into the math span and writes the absolute value as \lvert x \rvert (the vault table convention); no mathematical content changes.
- source_rank: 5
- proposed_action: Write $(e^x)' = e^x, \quad (a^x)' = a^x \ln a$ and put the conditions inside the series spans as \lvert x \rvert.
- applied: true
- fingerprint: 2e31cf34b685

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- resolves: F-001
- status: resolved
- note: Applied: \quad moved inside the math spans on lines 40, 101 and 102, and |x| written as \lvert x \rvert, so each row renders as two cells with its condition. The ln(1+x) interval itself is F-004, still open.

## [F-002] Limit-rule table omits the hypotheses of the limit laws and of L'Hôpital's rule
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- severity: major
- status: open
- locus: Limits and Continuity table, lines 23-27
- claim: Sum: lim[f + g] = L + M; Product: lim[f · g] = L · M; L'Hôpital: lim f/g = lim f'/g' when form is 0/0 or ∞/∞
- evidence: OpenStax Calculus Vol. 1 Theorem 2.5 Limit Laws (p.161, PDF p.169) assumes lim f(x) = L and lim g(x) = M with L and M real numbers; the page defines L on line 19 but never defines M and states no existence condition. Theorems 4.12 (0/0 case, p.455, PDF p.463) and 4.13 (∞/∞ case, p.457, PDF p.465) require f and g differentiable on an open interval containing a (except possibly at a) and hold only assuming the limit on the right exists or is ±∞. As written, a reader could conclude lim f/g does not exist whenever lim f'/g' does not.
- source_rank: 3
- proposed_action: State: provided lim f = L and lim g = M exist (finite); for L'Hôpital, f and g differentiable near a and lim f'/g' exists or is ±∞.
- applied: false
- fingerprint: 02cd0c995556

## [F-003] Integral power rule missing n ≠ -1; FTC missing continuity of f
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- severity: major
- status: open
- locus: Integration section, lines 59-61 and technique table line 67
- claim: ∫ x^n dx = x^{n+1}/(n+1) + C; ∫_a^b f(x) dx = F(b) - F(a) where F'(x) = f(x)
- evidence: OpenStax Calculus Vol. 1 Theorem 4.15 Power Rule for Integrals (p.488, PDF p.496): For n ≠ -1, ∫ x^n dx = x^{n+1}/(n+1) + C; at n = -1 the page formula divides by zero (the antiderivative is ln|x|). Theorem 5.5 FTC Part 2 (p.555, PDF p.563): If f is continuous over [a, b] and F is any antiderivative of f, then ∫_a^b f(x) dx = F(b) - F(a); the page states no condition on f.
- source_rank: 3
- proposed_action: Add n ≠ -1 to the power-rule row and f continuous on [a, b] to the FTC statement.
- applied: false
- fingerprint: 3eb49de97014

## [F-004] ln(1+x) Maclaurin series stated to converge on |x| ≤ 1; it diverges at x = -1
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- severity: major
- status: open
- locus: Maclaurin table, line 101
- claim: ln(1+x) = Σ_{n≥1} (-1)^{n+1} x^n / n, |x| ≤ 1
- evidence: NIST DLMF §4.6 eq. 4.6.1 (https://dlmf.nist.gov/4.6, fetched 2026-09-27, sha256:dda80a4ebca6bab85fc738f032fe4fe06100a976a0728f2a8651715903addec6): ln(1+z) = z - z^2/2 + z^3/3 - ..., |z| ≤ 1, z ≠ -1. Recomputed: at x = -1 the series is -Σ 1/n (harmonic, divergent) and ln(0) is undefined, so the real interval is -1 < x ≤ 1. The series itself is correct.
- source_rank: 3
- proposed_action: Change the condition to -1 < x ≤ 1 (\lvert x \rvert \leq 1, x \neq -1).
- applied: false
- fingerprint: a8d05b81db0e

## [F-005] Partial fractions described as decomposing into linear factors only
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- severity: minor
- status: open
- locus: technique table, line 70
- claim: Partial Fractions | Rational functions | Decompose denominator into linear factors
- evidence: OpenStax Calculus Vol. 2 §3.4 Partial Fractions (p.262, PDF p.270), learning objectives 3.4.2-3.4.4, treats simple linear, repeated linear and irreducible quadratic factors; a denominator such as x^2 + 1 has no real linear factors, so the row as written does not cover it.
- source_rank: 3
- proposed_action: Say: decompose the denominator into linear and irreducible quadratic factors.
- applied: false
- fingerprint: aeb4ca505a78

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- status_set: in_review
- checks_run: Limit laws (sum, product) = OpenStax V1 Thm 2.5 PDF p.169 (hypotheses missing: F-002); continuity definition = V1 PDF p.188; derivative limit definition = V1 eq. 3.6 PDF p.228; power, product, quotient, chain rules = V1 Thm 3.3 PDF p.257, Thm 3.5 p.261, Thm 3.6 p.263, chain rule eq. 3.17 p.296; (a^x)' = a^x ln a = V1 Thm 3.16 eq. 3.34 PDF p.335; (ln x)' = 1/x (x > 0) = V1 Thm 3.15 PDF p.332; L'Hôpital = V1 Thms 4.12-4.13 PDF pp.463,465 (F-002); integral power rule = V1 Thm 4.15 PDF p.496 (n ≠ -1 missing: F-003); FTC = V1 Thm 5.5 PDF p.563 (F-003); substitution = V1 Thm 5.7 PDF p.592; integration by parts ∫u dv = uv - ∫v du = V2 Thm 3.1 PDF p.240 (page image); improper integral lim_{b→∞} = V2 Def. eq. 3.16 PDF p.296 (page image); partial fractions V2 §3.4 PDF p.270 (F-005); partial derivative holds y fixed = V3 eq. 4.12 and example PDF pp.377,379; joint cdf double integral = G&S Def. 4.6 p.165 (PDF p.173); geometric series Σ r^k = 1/(1-r), |r| < 1 = binomial series with r = -1 (V2 Def. PDF p.522, |x| < 1) and V2 worked geometric sum a/(1-r) PDF p.425; Maclaurin series = Taylor series at a = 0 (V2 PDF p.515), e^x series converges for all real x (V2 Example 6.16 PDF p.516); binomial series (1+x)^k = Σ C(k,n) x^n, |x| < 1 = V2 Def. PDF p.522 and DLMF 4.6.7 (|z| < 1); ln(1+x) series = DLMF 4.6.1 (interval wrong: F-004). Examples recomputed before reading answers: S(t) = e^{-λt} gives μ = λ = stated; E[X] = 1/λ by parts = stated, agrees with SOA Tables for Exam C A.3.3.1 exponential E[X] = θ with λ = 1/θ (PDF p.11); perpetuity Σ_{k≥1} v^k = v/(1-v) = 1/i = stated. Syllabus: SOA Exam P Nov 2026 p.1 assumes an understanding of calculus, including series, differentiation, and integration, consistent with the page and Exam P-1 (SOA).md line 26. Links (Probability Theory, Hazard Rate, Multivariate Distribution) and figure embed resolve; LaTeX fixed per F-001.
- sources_checked: OpenStax, Calculus Volume 1 (Strang, Herman et al., 2016), Thm 2.5 p.161 (PDF p.169); continuity def. p.180; derivative def. p.220; Thms 3.3, 3.5, 3.6 pp.249-255; chain rule p.288; Thms 3.15-3.16 pp.324-327; Thms 4.12-4.13 pp.455-457; Thm 4.15 p.488; Thm 5.5 p.555; Thm 5.7 p.584 (PDF = printed + 8), sha256:202c86537285adf7e5abeb64057c39ee7333ad8c8473b6dd6a9ddf3e72443286 — https://assets.openstax.org/oscms-prodcms/media/documents/CalculusVolume1-OP.pdf; OpenStax, Calculus Volume 2 (Strang, Herman et al., web PDF), Thm 3.1 p.232; §3.4 p.262; Def. eq. 3.16 p.288; p.417; §6.3 p.507-508; binomial series Def. p.514 (PDF = printed + 8), sha256:f6ac06038088711766e5b664a8114c8fcb0b7b88cfb38e92bbaf56ba2df43f4a — https://assets.openstax.org/oscms-prodcms/media/documents/calculus-volume-2_-_WEB.pdf; OpenStax, Calculus Volume 3 (Strang, Herman et al., 2016), §4.3 partial derivatives, eq. 4.12, PDF pp.377-379, sha256:63d36af23d6f9a163b5e627aaa714b63e4196d8159b9d5fa3ea93bdbdd284ca9 — https://assets.openstax.org/oscms-prodcms/media/documents/CalculusVolume3-OP.pdf; NIST Digital Library of Mathematical Functions, §4.6 Series Expansions, eqs. 4.6.1 and 4.6.7 (HTML fetched 2026-09-27), sha256:dda80a4ebca6bab85fc738f032fe4fe06100a976a0728f2a8651715903addec6 — https://dlmf.nist.gov/4.6; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.2 Def. 4.6 joint density and cumulative distribution p.165 (PDF p.173), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Tables for Exam C (Fall 2009), A.3.3.1 Exponential, PDF p.11, sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; SOA, Probability Exam (Exam P) syllabus, November 2026, p.1 (calculus including series, differentiation and integration is assumed), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
- note: Every formula on the page was checked against OpenStax Calculus Vols 1-3 and NIST DLMF §4.6 this pass. Held at in_review rather than verified because three open major findings (F-002 limit and L'Hôpital hypotheses, F-003 power rule n ≠ -1 and FTC continuity, F-004 ln(1+x) interval) concern formula conditions.
