---
target: Concepts/Term of Annuity.md
created: 2026-09-28
---

## [F-001] Term defined as the span from the first to the last payment (one period short)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: major
- status: open
- locus: opening sentence
- claim: 'The term of annuity is the duration over which an annuity makes payments — the number of periods from the first to the last payment.'
- evidence: FIN p.143: 'The fixed period of time for which payments are made is called term of the annuity. For example, in the case of a home mortgage a term can be either a 15-year loan or a 30-year loan'; FIN p.144 (§15): an annuity-immediate runs from the beginning of the first period to the last payment date, n periods; FIN p.257: 'n the term of the annuity measured in interest conversion periods', with n/k payments. For n payments, 'first to last payment' is n - 1 periods (a 30-year monthly mortgage would have a 29-year-11-month term). The page's own next bullet says n in a_n is the term — which contradicts the opening definition.
- source_rank: 3
- proposed_action: Maintainer: define the term as the length of time covered by the payment periods (n periods for n payments), per FIN p.143-144.
- applied: false
- fingerprint: b30b5915a4c4

## [F-002] Log formula for n given without its annuity-immediate condition
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: formula block under the second bullet
- claim: 'Given sufficient information (present value, payment amount, interest rate), the term can be solved using logarithms: n = ln(1 - i·PV/P)/ln(1/(1+i))'
- evidence: FIN §19 p.184 derives n = ln(1 - i P/R)/ln v under 'We will assume an annuity-immediate'; for an annuity-due PV = P ä_n gives n = -ln(1 - d·PV/P)/ln(1+i). SYL p.3 lists 'immediate or due' among the given items. The page does not say the formula is for an annuity-immediate.
- source_rank: 3
- proposed_action: Maintainer: state that the formula is for an annuity-immediate (replace i by d for an annuity-due).
- applied: false
- fingerprint: 93c635835b9a

## [F-003] Example says 9 full payments for an 8.77-period term
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: major
- status: open
- locus: example 'Solving for Unknown Term', last line
- claim: '9 full (annual) payments are needed (with the last being a smaller Drop Payment).'
- evidence: The page's own n = 8.77 (recomputed: -ln 0.6/ln 1.06 = 0.510826/0.0582689 = 8.7667). FIN §19 p.184-185 (Ex. 19.1: n + k = 55.242 -> 55 regular payments plus a smaller one): n regular payments then a smaller one. Here 1,500 a_8 = 9,314.69 < 10,000; OB_8 = 10,000(1.06)^8 - 1,500 s_8 = 1,092.28; drop at time 9 = 1,157.82 < 1,500. So 8 full payments and a smaller 9th; the line contradicts itself (the 9th is not full).
- source_rank: 3
- proposed_action: Delete 'full' so the line reads '9 (annual) payments are needed (with the last being a smaller Drop Payment)' (done).
- applied: true
- fingerprint: 69d474e3ded5

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- resolves: F-003
- status: resolved
- note: Deleted 'full': the line now reads '9 (annual) payments are needed (with the last being a smaller [[Drop Payment]]).'

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: low
- checks_run: Definition vs FIN p.143-144 and p.257 (F-001, major); 'term of annuity' syllabus term and 'immediate or due … term of annuity' outcome vs SYL p.3; log formula vs FIN §19 p.184 (correct for annuity-immediate; F-002 missing condition); perpetuity = infinite term vs FIN p.176; example recomputed in python: a_n = 6.6667, n = 8.7667, 1,500 a_8 = 9,314.69, OB_8 = 1,092.28, drop 1,157.82; F-003 fixed. Links (Perpetuity, Drop Payment), figure, LaTeX resolve. Low: F-001 (major) is open.
- sources_checked: Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), Part 'The Basics of Annuity Theory' introduction, PDF p.143, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §15 Present and Accumulated Values of an Annuity-Immediate, PDF p.144-145, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §18 Annuities with Infinite Payments: Perpetuities, PDF p.176-177, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §19 Solving for the Unknown Number of Payments of an Annuity, PDF p.184-185, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §28 Varying Annuities with Payments at a Different Frequency than Interest is Convertible, PDF p.257, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Financial Mathematics Exam syllabus, December 2026, Topic 2 Annuities/cash flows with non-contingent payments (20-30%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-001
- status: resolved
- note: Definition rewritten to Finan p.143 ('the fixed period of time for which payments are made'), measured in payment periods: n payments → a term of n periods, running from one period before the first payment to the last for an annuity-immediate (Finan p.144) and from the first payment to one period after the last for an annuity-due (Finan p.157); a 30-year monthly mortgage has a 360-month term. It now agrees with the next bullet (n in a_n is the term).

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-002
- status: resolved
- note: The log formula is now introduced as the term of an annuity-immediate (Finan §19 p.184), with a bullet for the annuity-due: PV = P(1-v^n)/d gives n = -ln(1 - d·PV/P)/ln(1+i). Also added, from Finan p.184-185: a non-integer n means ⌊n⌋ regular payments plus a smaller balloon (with the last) or drop (one period later) payment. The example now asks for the regular payments and the drop payment: n = 8.7667 → 8 regular payments, OB_8 = 15,938.48 - 1,500(9.897468) = 1,092.28, drop = 1,157.82 at time 9 (python; check 1,500·a_8 + 1,157.82·v^9 = 9,314.69 + 685.31 = 10,000).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- status_set: verified
- confidence: medium
- checks_run: Re-checked on the new bytes: term = fixed period for which payments are made vs Finan p.143; immediate spans one period before the first payment to the last (p.144), due spans the first payment to one period after the last (p.157); n = ln(1-i·PV/P)/ln v for an annuity-immediate vs Finan §19 p.184, due form derived from ä_n = (1-v^n)/d (p.158); balloon/drop vs p.184-185; perpetuity infinite term vs p.176; 'term of annuity' and 'immediate or due' vs syllabus p.3. Example recomputed in python: a_n = 6.666667, n = 0.5108256/0.0582689 = 8.7667, 1.06^8·10,000 = 15,938.48, s_8 = 9.897468, OB_8 = 1,092.28, drop 1,157.82, 1,500a_8 = 9,314.69, 1,157.82v^9 = 685.31. 18 math nodes typeset in KaTeX; links (Balloon Payment, Drop Payment, Perpetuity, Annuity Immediate/Due) and figure resolve.
- sources_checked: Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.143-144, 157, 176, 184-185, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Financial Mathematics Exam syllabus, December 2026, p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf
