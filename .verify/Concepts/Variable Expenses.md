---
target: Concepts/Variable Expenses.md
created: 2026-09-12
---

## [F-001] Stem says 40% of new business; the solution blends over the whole book
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/f2bc
- date: 2026-09-12
- severity: nit
- status: open
- locus: Example 2 'A Distribution Channel Shift', stem and 'After' calculation
- claim: The stem says the insurer 'will move 40% of new business to a direct channel'; the solution then computes the blended commission as 0.60 x 17% = 10.2% and the added fixed cost as 0.40 x $18 = $7.20, i.e. over 40% of all business.
- evidence: Internal consistency check (P5). The arithmetic is correct for '40% of the book' but not for '40% of new business' — with renewals still fully agency-written, the blended commission would be 17% x (1 - 0.40 x new-business share), which the stem does not supply. Every other figure in the example reproduces exactly: before, V = 21.5% and $465/0.735 = $632.65; after, V = 14.7%, F = $45 + $7.20 = $52.20 and $472.20/0.803 = $588.04, a fall of 7.05%. Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 7 p. 127 (PDF p. 139) supports the qualitative point that the commission/other-acquisition mix shifts with distribution channel.
- source_rank: 5
- proposed_action: Change the stem to 'will move 40% of its business to a direct channel', or give the new-business share so the blend can be computed as written.
- applied: false
- fingerprint: 7127aac7917c

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/f2bc
- date: 2026-09-12
- status_set: verified
- confidence: high
- checks_run: Recomputed both examples from scratch before reading the answers. V = 15 + 2 + 3 = 20%; rate = 340/0.75 = $453.33; the funding check re-derived independently — 0.20 x 453.33 = $90.67, 0.05 x 453.33 = $22.67, plus $340 = $453.34. The additive counter-example also checks: 340 x 1.25 = $425, 0.25 x 425 = $106.25, 425 - 106.25 = $318.75, a $21.25 shortfall. Channel-shift example: before V = 21.5%, 465/0.735 = $632.65; after, commission 0.60 x 17% = 10.2%, F = 45 + 0.40 x 18 = $52.20, V = 14.7%, 472.20/0.803 = $588.04, a fall of 7.05%. All reproduce. Denominator placement and the categories (commissions and brokerage; taxes, licenses and fees; contingent commissions varying with loss ratio or volume) are Werner Ch. 7 p. 126 (PDF p. 138); the 'no need to trend the variable expense ratio' point is Werner p. 135 (PDF p. 147); the prospective-selection requirement for a distribution change is Werner p. 127 (PDF p. 139). One nit on a stem/solution mismatch (F-001, open). Links, embed and LaTeX clean.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 7 pp. 125-135 (PDF pp. 137-147), underwriting expense categories, contingent commissions, All Variable / Premium-based / Exposure-based methods, Trending Expenses, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 1 p. 9 (PDF p. 21), written- vs earned-premium denominators for expense ratios, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
