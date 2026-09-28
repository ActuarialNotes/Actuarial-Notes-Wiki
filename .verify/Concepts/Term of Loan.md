---
target: Concepts/Term of Loan.md
created: 2026-09-28
---

## [F-001] Example says 8 full payments for a 7.64-year term
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: major
- status: open
- locus: example 'Solving for Term', last line
- claim: '8 full payments needed, with a smaller final payment.'
- evidence: The page's own n = 7.64. SOA-S Q380 p.100 (image): n = 23.05 -> 'Use 23 for the number of full payments', the drop at time 24; FIN §19 p.184-185: n regular payments then a smaller one. So here: 7 full payments of 900 and a smaller 8th (recomputed: OB_7 = 538.60, drop 581.69 at time 8). Eight full payments would overpay.
- source_rank: 1
- proposed_action: Delete 'full' so the line reads '8 payments needed, with a smaller final payment' (done).
- applied: true
- fingerprint: ab4385a5ede6

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- resolves: F-001
- status: resolved
- note: Deleted 'full': the line now reads '8 payments needed, with a smaller final payment.'

## [F-002] Drop/balloon distinction misattributed and contradictory
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: major
- status: open
- locus: second bullet
- claim: 'This smaller final payment is called a Drop Payment (if it occurs at the same time as a regular payment) or a Balloon Payment (if it is larger than a regular payment).'
- evidence: FIN §19 p.184-185: 'the last smaller payment is made either at the same time as the last regular payment making the last payment larger than the regular payment (such a payment is called a balloon payment) or at the end of the period following the last regular payment. In this case the smaller payment is called drop payment.' SOA Q87 (questions PDF p.39): 'a drop payment one year after the nth payment'. The page attaches the 'same time as a regular payment' criterion to the drop payment instead of the balloon, and calls the balloon a 'smaller final payment'.
- source_rank: 3
- proposed_action: Maintainer: rewrite per FIN §19 — balloon: remainder added to the last regular payment (larger, same date); drop: smaller payment one period after the last regular payment.
- applied: false
- fingerprint: f43d63e43edf

## [F-003] 'Four key variables' vs the syllabus's five
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: first bullet
- claim: 'Along with the Interest Rate, Principal, and payment amount, it is one of the four key variables in a loan calculation — given any three, the fourth can be solved.'
- evidence: SYL p.3, Topic 3 outcome b: 'The missing item, given any four of: term of loan, interest rate, payment amount, payment period, principal.' The syllabus counts five items including the payment period.
- source_rank: 1
- proposed_action: Maintainer: align with the syllabus's five items.
- applied: false
- fingerprint: ec24a1b86d0d

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: low
- checks_run: Definition vs SYL p.3; solving for n vs FIN §19 p.184 and SOA-S Q380 p.100 (image); example recomputed: a_n = 5.5556, n = 0.5878/0.07696 = 7.6375 (matches 7.64), OB_7 = 538.60, drop 581.69; F-001 fixed. Low: the defining bullet on drop vs balloon (F-002, major) is still open. Links, figure resolve.
- sources_checked: SOA Financial Mathematics Exam syllabus, December 2026, Topic 3 Loans (15-25%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §19 Solving for the Unknown Number of Payments of an Annuity, PDF p.184-185, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 87, questions PDF p.39, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 380, questions PDF p.161, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 380, solutions PDF p.100, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf
