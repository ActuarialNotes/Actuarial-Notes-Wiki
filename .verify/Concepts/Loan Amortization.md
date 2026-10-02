---
target: Concepts/Loan Amortization.md
created: 2026-09-28
---

## [F-001] Placeholder page with no content
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: whole page
- claim: 'Loan Amortization — concept summary to be written.' / 'Example to be added.'
- evidence: The page has no definition, formula or example; 46 question files under questions/ link to it (grep 'Loan Amortization' questions/). SYL p.3 lists amortization among Topic 3's defined terms; the vault's substantive treatment is on Concepts/Amortization.md.
- source_rank: 4
- proposed_action: Maintainer: write the page or point it at Amortization / Amortization Schedule.
- applied: false
- fingerprint: 79691a9846ba

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: in_review
- checks_run: Read the page: placeholder text only, no claim to check against a source; no links, no LaTeX, no figure.
- sources_checked: SOA Financial Mathematics Exam syllabus, December 2026, Topic 3 Loans (15-25%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf
- note: Nothing verifiable on the page; left in_review with F-001 (stub) until content exists.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-001
- status: resolved
- note: Page written in the sense the 46 FM questions that tag it use (topic 'Loan Amortization': level and non-level loans, balances, interest/principal splits, drop/balloon and refinancing): loan amortization defined per Finan p.333-334 (installments whose PV at the loan rate equals the loan; each pays the interest on the opening balance, the rest repays principal), with the one-period relations B_k = B_{k-1}(1+i) - K_k, I_k = i B_{k-1}, PR_k = K_k - I_k = B_{k-1} - B_k (Finan p.342-343, p.346); payments at or below the interest never repay the loan (Finan p.345-346 Ex. 38.5(b)); range sums B_j - B_k and total interest = payments - L (Finan p.342, p.345 Ex. 38.4); level case PR_{k+1} = PR_k(1+i) (Finan p.342). It links Amortization, Amortization Schedule and Outstanding Balance rather than repeating their level-payment formulas, table and two balance methods. Two original worked examples (a two-level payment loan; principal/interest over payments 6-10), every figure recomputed in python.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- status_set: verified
- confidence: medium
- checks_run: New page. Definition vs Finan p.333 (amortization method) and p.334 (payments form an annuity whose PV is the loan) and SYL p.3 Topic 3 (amortization; interest and principal in a given payment; balance at any time); recursion, I_k = i B_{k-1}, PR_k = K_k - I_k = B_{k-1} - B_k vs Finan p.342-343 table and p.346 (non-level and varying-rate schedules, (1+j)a - X step); payment <= interest never repays vs Finan p.345-346 Ex. 38.5(b) and SOA Q125 (payments equal to the interest due); range sums vs Finan p.345 Ex. 38.4 (P11+...+P50 = B10 - B50; I = 40R - (B10 - B50)); total principal = L, total interest = payments - L, PR_k = P v^{n-k+1} geometric vs Finan p.342. Example 1 recomputed in python: a_4@5% = 3.545951, v^4 a_4 = 2.917262, X = 6454.05/2.917262 = 2,212.37; B_4 = 12155.0625 - 4310.125 = 7,844.94 = 2212.365 x 3.545951; I_5 = 392.25, PR_5 = 1,820.12, B_5 = 6,024.82; B_3 = 8,423.75, PR_4 = 578.81; the full 8-row recursion ends at 0.00. Example 2: a_20@6% = 11.4699212, P = 4,359.2279, B_5 = 42,337.91, B_10 = 32,084.30, principal 10,253.61, interest 21,796.14 - 10,253.61 = 11,542.53 (row-by-row sum agrees). Links (Amortization, Amortization Schedule, Outstanding Balance) resolve; validate_links clean. Medium: newly written; examples are the vault's own.
- sources_checked: SOA Financial Mathematics Exam syllabus, December 2026, p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.333-335, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.342-343, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.345-346, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 125, questions PDF p.53, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf
