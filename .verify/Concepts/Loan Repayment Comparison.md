---
target: Concepts/Loan Repayment Comparison.md
created: 2026-09-28
---

## [F-001] Says level payments front-load more interest than constant-principal
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: third bullet
- claim: 'Level payments front-load more interest than the constant-principal method'.
- evidence: Per FIN §38 p.342 interest in each period is i x the balance at its start. Both methods charge iL in period 1; after that the level-payment balance is higher (smaller early principal repayments), so level payments carry more interest in every later period — the interest is back-loaded relative to constant principal, and the total is larger. Recomputed on the page's own second example (5,000, 6%, 5 years): constant principal 300, 240, 180, 120, 60 = 900; level (P = 1,186.98) 300.00, 246.78, 190.37, 130.57, 67.19 = 934.91. 'More total interest' is supported; 'front-load' is not.
- source_rank: 5
- proposed_action: Maintainer: say level payments repay principal more slowly and so carry more total interest.
- applied: false
- fingerprint: 1dbe80c4f0f3

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: P_level = L/a_n and total interest nP - L vs FIN §37 p.335; constant-principal total interest iL(n+1)/2 vs SOA-S Q12 p.6 (image): 990 = i[2000+1800+...+200] = 11,000 i, i.e. i x 2000 x 11/2, i = 9.00% (recomputed); example 1 recomputed: a_5@10% = 3.79079, P = 791.39, total 3956.96 (unrounded P), interest 956.96, j = 956.96/9000 = 10.633%; example 2: 300+240+180+120+60 = 900 = 0.06(5000)(3). Links, figure resolve.
- sources_checked: SOA Financial Mathematics Exam syllabus, December 2026, Topic 3 Loans (15-25%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 12, questions PDF p.7, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 12, solutions PDF p.6, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §37 Finding the Loan Balance Using Prospective and Retrospective Methods, PDF p.334-335, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §38 Amortization Schedules, PDF p.342, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf
