---
target: Concepts/Outstanding Balance.md
created: 2026-09-28
---

## [F-001] Worked example: wrong payment, two wrong balances, false rounding explanation
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: major
- status: open
- locus: example 'Outstanding Balance After 3 Payments', answer
- claim: P = 20000/4.6229 = 4,326.40; prospective OB_3 = 4326.40 x 2.5771 = 11,147.42; retrospective = 25194.00 - 14041.22 = 11,152.78; 'The small difference is due to rounding in P'.
- evidence: Recomputed (rank 5), formulas per FIN §37 p.335: a_6@8% = 4.62288, P = 20000/4.62288 = 4,326.31 (20000/4.6229 = 4,326.29, not 4,326.40). 4326.40 x 2.5771 = 11,149.57, not 11,147.42; 4326.40 x 3.2464 = 14,045.22, not 14,041.22. Exact OB_3 = 11,149.31 by both methods; with P rounded to 4,326.31 they give 11,149.32 and 11,149.31. The 5.36 gap on the page comes from arithmetic slips, not rounding in P, so the closing sentence teaches that the two methods can disagree by dollars.
- source_rank: 5
- proposed_action: Maintainer: P = 4,326.31; OB_3 = 11,149.31 by both methods; drop or rewrite the rounding sentence.
- applied: false
- fingerprint: 35ed70ca6aa2

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: low
- checks_run: Prospective OB_k = P a_{n-k} and retrospective L(1+i)^k - P s_k vs FIN §37 p.334-335 (with FIN's proof of equivalence) and SOA-S Q60 p.18 (prospective), SOA-S Q232 p.59 (retrospective, 4000(1.05)^6 - 250 s_6 = 3659.90); 'after the k-th payment' vs FIN p.335; claim L - P a_k is wrong checked: L - P a_k = v^k OB_k; example recomputed (F-001). Low: the worked example's numbers and its explanation are wrong and still open. Links, figure resolve.
- sources_checked: SOA Financial Mathematics Exam syllabus, December 2026, Topic 3 Loans (15-25%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §37 Finding the Loan Balance Using Prospective and Retrospective Methods, PDF p.334-335, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 232, solutions PDF p.59, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 60, questions PDF p.27, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 60, solutions PDF p.18, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf
