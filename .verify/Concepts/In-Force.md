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

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-001
- status: resolved
- note: Werner Ch.1 p.2 (PDF p.14) and Ch.5 pp.70-71 (PDF pp.82-83) re-read: in-force premium is the full-term premium of policies in effect at a date; a semi-annual writer's in-force premium is half an annual writer's on the same written premium; after a mid-term change, the full-term premium applicable on the date. Formula now 'full-term premium'; bullet 2 rewritten to those statements; Example 1 recomputed: in force at 6/30/2024 are A, B, D (C incepts 7/1) and in-force premium = 1,200 + 900 + 500 = $2,600 (was $3,100). Boundary note: Werner is itself inconsistent - in-force exposures need expiration AFTER the date (Ch.4 p.57, PDF p.69), in-force premium expiration ON OR AFTER it (Ch.5 p.70) - so the page's 'effective ≤ t < expiration' matches the exposure definition and was left alone.

## [F-002] Uses, retention and premium-trend statements not in the source
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: bullets 3-5; Example 1 closing note; Example 2 closing paragraph
- claim: In-force is 'the right exposure measure' for 'catastrophe accumulation and PML work, reinsurance treaty placement, capacity and concentration monitoring'; retention as 'policies in force at renewal ÷ policies eligible'; 'C is already written premium in CY 2024' at 6/30/2024; attributing the average-premium change to rate 'is the error the two-step premium trend procedure exists to prevent'.
- evidence: Werner names none of the cat/PML/treaty uses ('probable maximum' occurs nowhere in the text). Its uses of in-force are: best estimate of mix at a date, so the latest in-force premium measures a rate change's impact on the existing portfolio (Ch.5 p.71, PDF p.83); the latest in-force distribution as the expected future distribution (Ch.14 p.284, PDF p.296); in-force premium by territory in place of earned (Ch.3 p.44, PDF p.56); renewal rate scenarios tested on the in-force distribution (Ch.13 p.259, PDF p.271). Retention ratio = policies renewed / potential renewal policies (Ch.1 p.10, PDF p.22). Written premium is keyed to the inception date (Ch.5 p.66, PDF p.78), so C (7/1/2024) is CY 2024 written premium but not yet written at 6/30. Werner p.8 (PDF p.20): changes in average premium 'if adjusted for rate change activity' show mix; that is the current-rate-level adjustment, not two-step trending.
- source_rank: 2
- proposed_action: Replace the uses with Werner's, use Werner's retention ratio, fix the tense on C, and name the current-rate-level adjustment.
- applied: true
- fingerprint: 75604589bc9b

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-002
- status: resolved
- note: Applied: bullets 3-5 rewritten to Werner's uses (Ch.3 p.44; Ch.5 p.71; Ch.13 pp.257, 259; Ch.14 p.284), the in-force exposure definition and insured-unit variants (Ch.4 p.57), and the retention ratio (Ch.1 p.10). Example 1's note on C and Example 2's closing paragraph corrected. Example 2 recomputed: 1,300 → 1,400 (+7.69%), 40,000 → 42,000 (+5.0%), 1.05 x 1.0769 = 1.1308 = 58.8/52.0.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- status_set: verified
- confidence: medium
- checks_run: F-001 re-checked against Werner Ch.1 and Ch.5 and fixed; both examples recomputed from scratch before reading their answers (count 3, $2,600; +5.0% x +7.7% = +13.1%); every bullet diffed against Werner; boundary definitions compared between Ch.4 and Ch.5.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 1 pp.2, 8, 10 (PDF pp.14, 20, 22), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 4 pp.57-58 (PDF pp.69-70), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 5 pp.66, 70-71 (PDF pp.78, 82-83), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 3 p.44 (PDF p.56); Ch. 13 pp.257, 259 (PDF pp.269, 271); Ch. 14 p.284 (PDF p.296), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf
- note: Conflict inside the source logged: Werner defines in-force exposures with expiration after the date (p.57) and in-force premium with expiration on or after it (p.70); the page follows the former and was not changed. Confidence medium: vault-authored examples.
