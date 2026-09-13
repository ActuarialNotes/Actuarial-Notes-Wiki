---
target: Concepts/In-Force.md
created: 2026-09-12
---

## [F-001] In-force premium is stated as annualized; Werner defines it as full-term, and the worked answer is $500 too high
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-12T20:16Z/58a9
- date: 2026-09-12
- severity: critical
- status: open
- locus: second bullet ('quoted on an annualized basis') and the first worked example's in-force premium total
- claim: 'In-force premium is quoted on an annualized basis, so a six-month policy carrying $400 of premium counts $800 of in-force premium.' The first example then annualizes policy D's six-month $500 premium to $1,000 and totals in-force premium of $3,100.
- evidence: Werner & Modlin, Basic Ratemaking 5th ed., Ch. 5 (printed p.70 = PDF p.82): 'In-force premium is the total amount of full-term premium for all policies in effect at a given date. More specifically, the in-force premium as of June 15, 2011, is the sum of full-term premium for all policies that have an inception date on or before June 15, 2011, and an expiration date on or after June 15, 2011.' Ch. 1 (printed p.2 = PDF p.14) gives the same definition: 'In-force premium is the full-term premium for policies that are in effect at a given point in time.' Full term means the policy's own term, not an annualised term: Werner states the consequence explicitly on printed p.71 (PDF p.83) - 'if two insurers write the same volume of written premium, but one insurer writes annual term policies and the other writes semi-annual term policies, the in-force premium of the insurer writing semi-annual term policies will be half that of the other carrier. Adjustments can be made to make the companies' in-force numbers more comparable, but this detail is beyond the scope of this text.' Under Werner's definition a six-month policy with $400 of premium contributes $400, not $800, and the example's total is 1,200 + 900 + 500 = $2,600, not $3,100. I recomputed the example independently before reading its answer: the policy count of 3 (A, B, D in force at 6/30/2024; C incepts 7/1/2024) is correct; only the premium total is wrong. The page's own consequence-sentence, that annualisation 'makes in-force comparable across policy terms', is the adjustment Werner puts beyond the text's scope, not the definition.
- source_rank: 2
- proposed_action: Restate the bullet with Werner's definition (in-force premium is the full-term premium of each policy in effect at the date, so a six-month policy contributes its six-month premium, and books written on different terms are not directly comparable), and correct the example's total to $2,600. Not auto-fixed: the correction is a definitional rewrite, not a transcription.
- applied: false
- fingerprint: 9e5bcf4881e5

## [C-001] Validation pass — disputed
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-12T20:16Z/58a9
- date: 2026-09-12
- status_set: disputed
- checks_run: Both examples recomputed from scratch before reading their answers. Example 1: in-force at 6/30/2024 is A, B, D (count 3, agrees) but full-term premium totals $2,600 against the page's $3,100 (F-001). Example 2: 52,000,000/40,000 = $1,300, 58,800,000/42,000 = $1,400, 42,000/40,000 - 1 = +5.0%, 1,400/1,300 - 1 = +7.69%, and 1.050 x 1.0769 = 1.1308 = 58.8/52.0, so the +13.1% decomposition is exactly right. Definitions of written/earned/in-force diffed against Werner Ch.1 p.2 and Ch.5 pp.67-71; the mix-of-business and rate-change-impact use of the latest in-force figure is confirmed on PDF p.83.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 1 p.2 (PDF p.14) and Ch. 5 pp.70-71 (PDF pp.82-83), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
- note: Disputed on account of open critical finding F-001 (annualized vs full-term in-force premium). Nit not filed separately: the page's indicator formula uses effective <= t < expiration, while Werner counts a policy whose expiration date is on the valuation date ('expiration date on or after June 15, 2011') - a boundary-day difference only.
