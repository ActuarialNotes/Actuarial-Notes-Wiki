---
target: Concepts/Drop Payment.md
created: 2026-09-28
---

## [F-001] Condition for a drop payment stated as B_n < P instead of B_n(1+i) < P
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: first bullet
- claim: 'the outstanding balance after n full payments is B_n > 0 (with B_n < P), then the drop payment is B_n(1+i)'.
- evidence: For the final payment B_n(1+i) to be smaller than P, as the page's definition requires, the condition is B_n(1+i) < P, i.e. B_n < Pv; with Pv <= B_n < P another full payment could still be made. FIN §19 p.184-185 fixes n as the number of full payments (n = floor of the non-integer term), and SOA-S Q380 p.100 does the same (n = 23.05 -> 23 full payments, drop at time 24). The page's own example satisfies the right condition (450 < 500/1.05 = 476.19).
- source_rank: 3
- proposed_action: Maintainer: state n as the number of full payments (integer part of the term), or the condition as B_n(1+i) < P.
- applied: false
- fingerprint: 74fc8b36056f

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Definition (smaller final payment at the next scheduled date) vs FIN §19 p.184-185 ('at the end of the period following the last regular payment') and SOA Q87 p.39 ('drop payment one year after the nth payment'); drop = B_n(1+i) vs SOA-S Q380 p.100 (image): X = 13.04 = 4.53 x 1.045^24, i.e. OB_23 accumulated one year; example recomputed 450 x 1.05 = 472.50 < 500; links, figure resolve.
- sources_checked: SOA Financial Mathematics Exam syllabus, December 2026, Topic 3 Loans (15-25%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §19 Solving for the Unknown Number of Payments of an Annuity, PDF p.184-185, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 87, questions PDF p.39, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 87, solutions PDF p.25, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 380, questions PDF p.161, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 380, solutions PDF p.100, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf
