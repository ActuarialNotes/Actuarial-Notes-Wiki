---
target: Concepts/Final Payment.md
created: 2026-09-28
---

## [F-001] Final payment formula subtracts a regular payment
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: critical
- status: open
- locus: third bullet
- claim: 'The final payment amount equals the Outstanding Balance at the previous payment date accumulated by one period, minus any regular payment.'
- evidence: FIN §19 p.184-185: the remaining amount is paid either with the last regular payment (balloon: regular payment plus remainder) or one period later (drop). Either way the final payment is the balance at the previous payment date accumulated one period, with nothing subtracted: SOA-S Q380 p.100 (image) gives X = 13.04 = OB_23 x 1.045 (subtracting 240 would give a negative payment); the vault's own Balloon Payment page has B = OB_{n-1}(1+i), and this page's own example computes 169.75 x 1.06 with no subtraction. For a balloon, OB_{n-1}(1+i) - K is only the excess over the regular payment, so a student using this sentence under-states the balloon by K.
- source_rank: 1
- proposed_action: Delete ', minus any regular payment' (done).
- applied: true
- fingerprint: 10c3531c6312

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- resolves: F-001
- status: resolved
- note: Deleted ', minus any regular payment' from the third bullet; it now reads '...at the previous payment date accumulated by one period.'

## [F-002] Balloon payment said to typically arise from payments below the interest
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: major
- status: open
- locus: second bullet, Balloon Payment sub-bullet
- claim: 'the final payment is larger than the regular payment (typically occurs when regular payments are set below the interest, causing the balance to grow)'.
- evidence: FIN §19 p.184-185 defines the balloon as the small remainder of a non-integer term paid together with the last regular payment, which needs payments above the interest. FIN §38 p.346: if the payment does not exceed the interest 'the loan will never be paid off, because every payment will count only toward interest'. SOA's own balloon questions have payments above the interest: Q126 (questions PDF p.53) 600 vs 4000(1.06)^4(0.06) = 302.99; Q337 (p.142) 360 vs 5020(0.0625) = 313.75.
- source_rank: 1
- proposed_action: Delete the parenthetical (done).
- applied: true
- fingerprint: 4a45b4f30a29

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- resolves: F-002
- status: resolved
- note: Deleted the parenthetical '(typically occurs when regular payments are set below the interest, causing the balance to grow)'.

## [F-003] Worked example: wrong term, wrong s_4 arithmetic, wrong drop payment
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: major
- status: open
- locus: example 'Computing the Drop Payment', prompt and answer
- claim: 'The term is approximately 4.65 years'; B_4 = 250 a_{0.65}; B_4 = 1262.48 - 250 s_4 = 1262.48 - 1092.73 = 169.75; drop = 169.75(1.06) = 179.93.
- evidence: Recomputed (rank 5), method per FIN §19 p.184 and §37 p.335: 1000 = 250 a_n@6% -> n = -ln(1 - 0.24)/ln 1.06 = 4.7098, not 4.65. s_4@6% = 4.374616, 250 s_4 = 1093.65 (not 1092.73), B_4 = 1262.48 - 1093.65 = 168.82, drop = 168.82 x 1.06 = 178.95 (page 179.93). Prospective check: 250 a_{0.7098} = 168.82, while the page's 250 a_{0.65} = 154.86, so the stated term is inconsistent with its own balance.
- source_rank: 5
- proposed_action: Maintainer: term 4.71; 250 s_4 = 1093.65; B_4 = 168.82; drop payment 178.95; prospective form 250 a_{0.71}.
- applied: false
- fingerprint: 794a60f440f5

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: low
- checks_run: Definition vs SYL p.3 (final payment (drop payment, balloon payment)) and FIN §19 p.184-185; formula bullet vs SOA-S Q380 p.100 (image); example recomputed in python (F-003: n = 4.7098, B_4 = 168.82, drop = 178.95). Two content fixes applied (F-001 critical, F-002 major). Low: the worked example's answer is wrong and still open. Drop sub-bullet 'occurs at the same scheduled payment date' is vague (FIN: one period after the last regular payment) but not wrong. Links, figure resolve.
- sources_checked: SOA Financial Mathematics Exam syllabus, December 2026, Topic 3 Loans (15-25%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §19 Solving for the Unknown Number of Payments of an Annuity, PDF p.184-185, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §38 Amortization Schedules, PDF p.346, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 126, questions PDF p.53, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 337, questions PDF p.142, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 380, solutions PDF p.100, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf

## [F-004] Drop payment placed 'at the same scheduled payment date'
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- severity: minor
- status: open
- locus: second bullet, Drop Payment sub-bullet
- claim: 'Drop Payment: the final payment is smaller than the regular payment and occurs at the same scheduled payment date'; the Balloon sub-bullet says only that it is larger.
- evidence: Finan p.184-185: the remainder is paid 'either at the same time as the last regular payment making the last payment larger than the regular payment (such a payment is called a balloon payment) or at the end of the period following the last regular payment. In this case the smaller payment is called drop payment.' SOA Q87 (questions PDF p.39): 'a drop payment one year after the nth payment'. The page attached the 'same date' timing to the drop payment — the same misattribution as Term of Loan F-002 — and gave the balloon no timing.
- source_rank: 1
- proposed_action: Drop: the remainder paid one period after the last regular payment (smaller); balloon: the remainder added to the last regular payment (larger).
- applied: true
- fingerprint: 9b7558b508de

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-003
- status: resolved
- note: Example rebuilt on the same loan (1,000 at 6%, payments of 250, drop at the end of year 5), recomputed in python: the student now solves for the term, 1000 = 250 a_n -> n = 0.274437/0.058269 = 4.71 (not 4.65), so 4 full payments; B_4 = 1000(1.06)^4 - 250 s_4 = 1262.477 - 1093.654 = 168.823 (s_4@6% = 4.374616, not the 1092.73/4 implied before); drop = 168.823 x 1.06 = 178.95 (not 179.93). The inconsistent prospective line 250 a_{0.65} was deleted; retrospective per Finan p.335, drop timing per Finan p.184-185 and SOA S380.

## [F-004/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-004
- status: resolved
- note: Sub-bullets rewritten per Finan p.184-185: Drop Payment — the remainder paid one period after the last regular payment, so the final payment is smaller; Balloon Payment — the remainder added to the last regular payment, so it is larger. Consistent with SOA Q87 (drop one year after the nth payment) and SOA S337 (balloon 648.75 = 360 + 288.75 at the time of the 33rd payment).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- status_set: verified
- confidence: medium
- checks_run: Definition vs SYL p.3 ('final payment (drop payment, balloon payment)') and Finan p.184-185; drop/balloon timing vs Finan p.184-185, SOA Q87 and S337; 'final payment = balance at the previous payment date accumulated one period' vs SOA S380 (X = 4.53 x 1.045^24 / v-form, 13.04 = OB_23 x 1.045) and Finan p.185 Example 19.1(b). Example recomputed in python: a_n = 4, n = 0.274437/0.058269 = 4.7098 -> 4 full payments; (1.06)^4 = 1.262477, s_4 = 4.374616, B_4 = 1262.477 - 1093.654 = 168.823 (prospective closed form 250(1 - v^0.7098)/0.06 = 168.823 agrees); drop = 178.95. Links (Term of Loan, Drop Payment, Balloon Payment, Outstanding Balance) and figure resolve; validate_links clean. Medium: the worked example is the vault's own.
- sources_checked: SOA Financial Mathematics Exam syllabus, December 2026, p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.184-185, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.335, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 87, questions PDF p.39, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 380, solutions PDF p.100, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 337, solutions PDF p.89, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf
