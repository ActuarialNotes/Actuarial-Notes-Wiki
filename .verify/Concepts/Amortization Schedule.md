---
target: Concepts/Amortization Schedule.md
created: 2026-09-28
---

## [F-001] Claims interest portions decrease geometrically like principal
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: critical
- status: open
- locus: paragraph after the table, second sentence
- claim: 'The principal portions form a geometric sequence: PR_k = PR_1(1+i)^{k-1}. The interest portions decrease by the same factor.'
- evidence: FIN §38 p.342: per unit payment the interest in payment k is i·a_{n-k+1} = 1 - v^{n-k+1} and the principal is v^{n-k+1}; FIN states only that 'the sum of principal repayments is a geometric progression with common ratio (1+i)'. The interest column is P - PR_1(1+i)^{k-1}, not geometric. The page's own schedule shows it: 300.00, 209.37, 109.67 (ratios 0.698 and 0.524, not 1/1.1 = 0.909). A student applying I_k = I_1/(1+i)^{k-1} gets 247.93 for the 3rd interest portion instead of 109.67.
- source_rank: 3
- proposed_action: Delete the sentence (done).
- applied: true
- fingerprint: 03a9432d1eb4

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- resolves: F-001
- status: resolved
- note: Deleted the sentence 'The interest portions decrease by the same factor.'; the principal-geometric statement (FIN §38 p.342) is kept unchanged.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Column formulas (I_k=i·OB_{k-1}, PR_k=P-I_k, OB_k=OB_{k-1}-PR_k) vs FIN §38 p.342 definition and table; principal geometric ratio (1+i) vs FIN p.342; example recomputed row by row in python: a_3@10%=2.4869, P=1206.34, rows 300.00/906.34/2093.66, 209.37/996.97/1096.69, 109.67/1096.67/0.02 — all match the page; one false sentence deleted (F-001). Medium: example is the vault's own; formulas rest on rank 3.
- sources_checked: SOA Financial Mathematics Exam syllabus, December 2026, Topic 3 Loans (15-25%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §38 Amortization Schedules, PDF p.342, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf
