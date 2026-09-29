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

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-002
- status: resolved
- note: Second bullet rewritten from Finan p.184-185: the remainder of a non-integer term is paid either together with the last regular payment, making that final payment larger (a balloon payment), or one period after the last regular payment as a separate, smaller payment (a drop payment). The 'same time as a regular payment' criterion now sits with the balloon, where Finan puts it, and the balloon is no longer called a 'smaller final payment'. Agrees with the syllabus term 'final payment (drop payment, balloon payment)' (SYL p.3), SOA Q87 ('a drop payment one year after the nth payment'), SOA S337 (balloon 648.75 = 360 + 288.75 at the 33rd payment) and FM-23-05 p.11-12 (balloon = additional payment at the time of the final regular payment). Links Final Payment, Balloon Payment and Drop Payment. The example now shows the drop too: OB_7 = 538.60, drop 581.69 at the end of year 8 (python).

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-003
- status: resolved
- note: First bullet now follows SYL p.3 Topic 3 outcome b: five items — term of loan, interest rate, payment amount, payment period, principal — 'given any four', the missing one can be solved; Payment Amount and Payment Period linked (both pages exist).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- status_set: verified
- confidence: medium
- checks_run: Definition vs SYL p.3; five items 'given any four' vs SYL p.3 outcome b; balloon (remainder with the last regular payment, larger) vs drop (one period later, smaller) vs Finan p.184-185, FM-23-05 p.11-12, SOA Q87 and S337; solving for a non-integer n and counting full payments vs Finan p.184-185 and SOA S380 (n = 23.05 -> 23 full payments). Example recomputed in python: a_n = 5.555556, n = 0.587787/0.076961 = 7.6375; OB_7 = 8569.12 - 8030.52 = 538.60, drop = 581.69 at time 8 (displayed factor now 5.555556 so 1 - 0.08 x a_n = 0.555556 reproduces). Links (Interest Rate, Principal, Payment Amount, Payment Period, Final Payment, Balloon Payment, Drop Payment) and figure resolve; validate_links clean. Medium: the worked example is the vault's own.
- sources_checked: SOA Financial Mathematics Exam syllabus, December 2026, p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.184-185, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA study note FM-23-05, Broverman, Review of Calculator Functions for the Texas Instruments BA II Plus, p.11-12, sha256:1b71586cc1b08d7bc36c04ecb3d4e6b367fce30f394e63efafc879e6b6e466fa — https://www.soa.org/globalassets/assets/files/edu/FM-23-05.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 87, questions PDF p.39, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 337, solutions PDF p.89, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 380, solutions PDF p.100, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf
