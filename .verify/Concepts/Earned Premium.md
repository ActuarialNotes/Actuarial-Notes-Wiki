---
target: Concepts/Earned Premium.md
created: 2026-09-12
---

## [F-001] Last bullet promises three premium adjustments but names two; premium development to ultimate is omitted
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-12T20:16Z/58a9
- date: 2026-09-12
- severity: minor
- status: open
- locus: final bullet, 'three successive adjustments, each addressing a different distortion'
- claim: 'The premium the ratemaking analysis actually uses is earned premium at current rate level, trended — three successive adjustments, each addressing a different distortion: mix of rate levels, then the drift in average premium per exposure (Premium Trend).'
- evidence: Werner & Modlin, Basic Ratemaking 5th ed., Ch. 5 (printed p.64 = PDF p.76) lists exactly three: 'Standard techniques used to adjust historical premium to current rate level; Standard techniques used to develop historical premium to ultimate level; Standard techniques used to measure and apply premium trend.' The chapter summary (PDF p.4) repeats it: 'These adjustments include current rate level, premium development in consideration of premium audits, and premium trend.' The bullet's count of three is therefore right, but only two are named — the missing adjustment is premium development to ultimate, which Werner introduces on printed p.71 (PDF p.83): 'In addition to a current rate level adjustment, historical premium must be developed to ultimate. This is especially relevant in the case of analysis performed on incomplete policy years or premium that has yet' to be audited. The page's own Written Premium sibling makes the audit point, so the omission is on this page only.
- source_rank: 2
- proposed_action: Name the third adjustment: develop historical premium to ultimate (premium development, principally for premium audits and incomplete policy years).
- applied: false
- fingerprint: 6dc95561d220

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-12T20:16Z/58a9
- date: 2026-09-12
- status_set: verified
- confidence: high
- checks_run: Definition diffed against Werner Ch.5 (printed p.68 = PDF p.80): 'Earned premium is the amount of the premium the insurance company has already earned in relation to how much of the policy period has already expired... the portion of the total premium that the insurance company is entitled to retain should the policy be canceled' — matches, including the short-rate caveat that footnote 12 attaches and the page generalises as non-uniform earning for warranty/crop/construction. 'Policy year earned premium is fully earned 24 months after the policy year begins' confirmed on printed p.69 (PDF p.81): 'By the time the policy year is complete (24 months after inception), the policy year earned and written premium are equivalent.' The calendar-year blending bullet is confirmed by Werner's Table 5.10, where CY 2011 earned premium of $912.50 draws on policies written in both 2010 and 2011. EP = WP - delta-UEP re-derived from Werner's CY unearned identity (PDF p.82). Both examples recomputed from scratch before reading the answers: 1,200 x 3/12 = $300 in 2024 and 1,200 x 9/12 = $900 in 2025; and for uniform annual writings CY2024 EP = 0.5(30M) + 0.5(24M) = $27M, with UEP 12/31/2023 = $12M, UEP 12/31/2024 = $15M and 30M - (15M - 12M) = $27M — the page's figures and its check both reproduce.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 5 pp.64,68-71 (PDF pp.76,80-83), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
- note: One open minor finding (F-001) on the omitted third premium adjustment. Definition, both formulas and both worked examples confirmed.
