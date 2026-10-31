---
target: Concepts/Multi-Dimensional Credibility.md
created: 2026-10-31
---

## [F-001] Example implies the single-dimensional factor equals the multi-dimensional own-type coefficient
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T12:19Z/4af0
- date: 2026-10-31
- severity: minor
- status: open
- locus: example 'Estimating a Class's PT Ratio from Two Injury Types'
- claim: 'The single-dimensional estimate uses only the PT deviation: 0.006 - 0.0006 = 0.0054', reusing the multi-dimensional PT coefficient 0.30 with no factor given for the single-dimensional procedure.
- evidence: Couret & Venter p.78 (PDF p.6) solve b, c, d, e jointly from the covariance system (4); a single-dimensional fit drops the other types and is solved separately, so its factor need not equal c. Exam questions give the single-dimensional factor separately from the coefficients (a different value). Reusing the coefficient without saying so teaches a wrong shortcut.
- source_rank: 2
- proposed_action: State the single-dimensional factor in the stem (here also 0.30) and use it explicitly in the answer.
- applied: true
- fingerprint: f26f3153ecce

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T12:19Z/4af0
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Stem now gives the single-dimensional credibility factor (fitted on the PT ratio alone, also 0.30) and the answer uses it explicitly; recomputation unchanged at 0.0054.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T12:19Z/4af0
- date: 2026-10-31
- status_set: verified
- confidence: high
- checks_run: every claim read against Couret & Venter pp.75-83 (estimator, eqs (1)-(4), covariance estimates, performance testing, CAPM analogy, quintiles test Table C); both examples recomputed (W=0.0040, w-hat=0.0062, single 0.0054; SSE 0.0898/0.0675/0.3650, ratio slopes); numbers compared with cas8-2014-q1, 2015-q5, 2019-q1 (none reused)
- sources_checked: Couret & Venter, Using Multi-Dimensional Credibility to Estimate Class Frequency Vectors in Workers Compensation (ASTIN Bulletin 38(1), 2008), pp.75-83 (PDF pp.3-11), eqs (1)-(4), Tables C-D, sha256:ce50d8a0fbc395621d29dd153836b0303a269d94697bb1932b5f334b47ebba18 — https://www.casact.org/sites/default/files/2021-03/8_Couret_Venter.pdf
- note: New page. The flat-understated / steep-overstated reading and the sign argument for another type's deviation are kept as plain consequences of the estimator and of the paper's HG (zero credibility, flat) vs raw-even (full credibility, too steep) comparison on p.83.
