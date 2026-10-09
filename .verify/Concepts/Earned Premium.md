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

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-001
- status: resolved
- note: Werner Ch.5 p.64 (PDF p.76) re-read: 'The first adjustment is to bring the historical premium to the rate level currently in effect ... A second adjustment is to develop premium to ultimate levels if the premium is still changing. A third adjustment is to project the historical premium to the premium level expected in the future. This accounts for changes in the mix of business'; p.71-72 (PDF pp.83-84) names incomplete policy years and premium yet to undergo audit. The last bullet now names all three: current rate level (On-Leveling), developed to ultimate (incomplete policy years, premium awaiting audit), trended for mix (Premium Trend).

## [F-002] Non-uniform earning attributed to warranty, crop and construction; Werner names warranty and seasonal lines such as boat owners
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: bullet 'Earning is pro rata by default'
- claim: 'Warranty, crop and some construction covers earn on a non-uniform schedule because risk is not uniform over the term.'
- evidence: Werner Ch.4 p.56 (PDF p.68): 'The assumption of an even earning pattern does not hold true for lines such as warranty and those affected by seasonal fluctuations in writings (e.g., boat owners insurance). As such, actuaries analyzing these lines often specify other earning pattern assumptions based on historical experience.' Crop and construction appear in neither Werner's earning discussion nor Ch.5 (full-text: 'crop' occurs once in Werner, on PDF p.211, unrelated).
- source_rank: 2
- proposed_action: Use Werner's examples.
- applied: true
- fingerprint: 8b62b3edc95a

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-002
- status: resolved
- note: Bullet now quotes Werner p.56 (PDF p.68) in substance: warranty, and seasonal writings such as boat owners insurance, with other earning patterns specified from historical experience.

## [F-003] Loss-ratio denominator claims stated more strongly than the source
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: nit
- status: open
- locus: bullet 1 ('the correct denominator ... for any rate indication') and the closing sentence of the second example
- claim: 'Earned premium is the correct denominator for a loss ratio and for any rate indication'; and the $3,000,000 gap is 'exactly the amount by which a written-premium loss ratio would understate the true one'.
- evidence: Werner Ch.1 p.9 (PDF p.21): 'Typically, the ratio uses total reported losses and total earned premium; however, other variations are common.' The pure premium indication (Werner Ch.8 p.141, PDF p.153) uses no premium at all, so 'any rate indication' is too broad. A dollar gap cannot be the amount by which a ratio understates: recomputed, written premium of 30,000,000 exceeds earned of 27,000,000 by 3,000,000, which overstates the loss ratio's denominator by that amount.
- source_rank: 2
- proposed_action: Quote Werner's 'typically'; say the 3,000,000 is the overstatement of the denominator.
- applied: true
- fingerprint: a1f5eea525be

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-003
- status: resolved
- note: Bullet 1 now cites Werner p.9 (PDF p.21) and drops 'any rate indication'; example 2's closing sentence now says written premium would overstate the denominator of the loss ratio by the $3,000,000.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- status_set: verified
- confidence: medium
- checks_run: Definition against Werner Ch.5 p.68 (PDF p.80: 'the premium for the coverage that has already been provided'; fn.12 short-rate tables); EP = WP - dUEP re-derived from Werner p.70 (PDF p.82) CY unearned identity; CY blending against Table 5.10 (CY 2011 EP 912.50 from policies written 2010 and 2011); PY fully earned 24 months after inception against p.69 (PDF p.81); three premium adjustments against p.64 and pp.71-72. Both examples recomputed before reading: 1,200 x 3/12 = 300, 1,200 x 9/12 = 900; 0.5(30M) + 0.5(24M) = 27M, UEP 12M and 15M, 30M - 3M = 27M.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 1 p.9 (PDF p.21); Ch. 4 p.56 (PDF p.68); Ch. 5 pp.64, 68-72 (PDF pp.76, 80-84), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf
- note: F-001 resolved; two new findings (F-002 minor, F-003 nit) fixed and resolved. Confidence medium: the 'flatters a growing book' remark and both examples are the vault's own (recomputed).
