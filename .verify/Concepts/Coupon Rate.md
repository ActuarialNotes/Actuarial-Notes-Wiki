---
target: Concepts/Coupon Rate.md
created: 2026-09-28
---

## [F-001] Says the coupon rate is stated per coupon period; FM states it annually unless otherwise stated
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: bullet after the formula, line 18
- claim: 'It is stated per coupon period; for a bond paying semi-annually with a 6% annual coupon rate, the per-period coupon rate is r = 3%.'
- evidence: NOTE p.1: 'Unless otherwise stated in the examination question, rates are expressed as annual rates. For example, … the yield rate, and the coupon rate.' SOA quotes it that way (Q40, questions PDF p.19: 'an annual nominal coupon rate of 8% payable semiannually'). FIN §43 p.384 uses r as the per-period rate for notation ('r = 0.035 for a 7% nominal coupon paid semi-annually'), which the rest of the sentence already says. The clause 'It is stated per coupon period' contradicts NOTE; deleting it leaves the per-period conversion intact.
- source_rank: 1
- proposed_action: Delete the clause 'It is stated per coupon period;'.
- applied: true
- fingerprint: 2c13237f1caf

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- resolves: F-001
- status: resolved
- note: Deleted the clause 'It is stated per coupon period;' and capitalised what remains: '- For a bond paying semi-annually with a $6\%$ annual coupon rate, the per-period coupon rate is $r = 3\%$.' No other text changed.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: r = Coupon/F (per-period notation) vs FIN §43 p.384; coupon rate annual unless stated vs NOTE p.1 (F-001, fixed by deleting the contradicted clause); fixed over the bond's life vs FIN p.384 ('F, C, r, g, and n … remain fixed throughout the bonds life'); distinct from the yield vs FIN p.384; par when Fr = Cj (r = j with F = C) vs FIN p.385 premium/discount formula. Example: 45/1000 = 4.5% < 5% → Fr < Cj → discount, correct. Links and figure resolve. Example is the vault's own, so medium.
- sources_checked: SOA Financial Mathematics Exam syllabus, December 2026, Topic 4 Bonds (15-25%), learning outcome a)-b), PDF p.4, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §43 The Various Pricing Formulas of a Bond, PDF p.384-385, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 40, questions PDF p.19, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf
