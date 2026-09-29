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

## [F-002] Unsourced 'prospective is usually simpler' claim
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- severity: minor
- status: open
- locus: bullet 'Both formulas give the same result'
- claim: 'the prospective method is usually simpler because it only requires the number of remaining payments (n-k)'
- evidence: No source read (Finan p.334-335, SOA's solutions) ranks the two methods; Finan p.334 presents them as equivalent. SOA's own solutions use whichever fits the data: S60 (solutions PDF p.18) prospective, S232 (pp.59-60) retrospective — Q232's loan ends with a balloon payment whose size is not given, so the prospective method cannot be applied directly. The 'usually simpler' generalisation is unsourced and misleads on that class of question.
- source_rank: 1
- proposed_action: Replace with what each method needs, and when the retrospective one is the one to use (future payments not fully known, e.g. SOA Q232).
- applied: true
- fingerprint: 9294624eb99b

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-001
- status: resolved
- note: Example recomputed in python and rewritten: a_6@8% = 4.6228797, P = 4,326.3077 (about 4,326.31, not 4,326.40); prospective OB_3 = 4326.3077 x 2.577097 = 11,149.31; retrospective 20000(1.259712) - 4326.3077(3.2464) = 25194.24 - 14044.93 = 11,149.31 (align* block). The false 'difference is due to rounding in P' sentence is replaced by the fact: both methods give 11,149.31 (exact 11,149.3146, Finan p.335 proves the identity), and rounding P to 4,326.31 first moves them by at most a cent (11,149.32 / 11,149.31).

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-002
- status: resolved
- note: Replaced with what each method needs: the prospective only the remaining payments, the retrospective only the loan and the past payments — the one to use when future payments are not fully known, e.g. a loan settled by a balloon of unknown size (SOA Q232, solved retrospectively in S232 pp.59-60; S60 p.18 uses the prospective form). No ranking claim remains.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- status_set: verified
- confidence: medium
- checks_run: Definition and both formulas (OB_k = P a_{n-k}; L(1+i)^k - P s_k, after the k-th payment) vs Finan p.334-335 incl. its proof of equivalence; prospective use vs SOA S60 (4,057.07 a_144@0.75% = 356,499.17), retrospective vs SOA S232 (4000(1.05)^6 - 250 s_6 = 3,659.90); L - P a_k = v^k OB_k (so wrong unless i = 0) checked algebraically. Example recomputed in python: a_6@8% = 4.6228797, P = 4,326.3077, a_3 = 2.577097, s_3 = 3.2464, (1.08)^3 = 1.259712, OB_3 = 11,149.31 both ways (exact 11,149.3146); with P = 4,326.31: 11,149.32 / 11,149.31. Links and figure resolve; validate_links clean. Medium: the worked example is the vault's own.
- sources_checked: SOA Financial Mathematics Exam syllabus, December 2026, p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.334-335, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 60, solutions PDF p.18, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 232, solutions PDF pp.59-60, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf
