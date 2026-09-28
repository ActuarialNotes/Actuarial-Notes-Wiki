---
target: Concepts/Balloon Payment.md
created: 2026-09-28
---

## [F-001] Worked example figures carry a rounding error from (1.08)^9 = 1.9990
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: example 'Balloon Payment on a Loan', answer
- claim: OB_9 = 19990 - 18731.40 = 1,258.60; B = 1,359.29; with K=1,200: OB_9 = 5,004.88, balloon 5,405.27.
- evidence: Recomputed (rank 5): (1.08)^9 = 1.999005, s_9@8% = 12.48756, OB_9 = 19990.05 - 18731.34 = 1258.71, B = 1258.71 x 1.08 = 1359.41; the page's own formula B = L(1+i)^n - K s_{n-1}(1+i) also gives 1359.41. With K=1200: OB_9 = 5004.98, 5004.98 x 1.08 = 5405.38. The page's figures follow from rounding the factors: 10,000 x 1.9990 = 19,990.00 (exact 19,990.05) and 1,500 x 12.4876 = 18,731.40 (exact 18,731.34), 0.11 in OB_9. Method is correct (FIN §37 p.335 retrospective formula).
- source_rank: 5
- proposed_action: Maintainer: carry (1.08)^9 to 6 places: 1,258.71 / 1,359.41 and 5,004.98 / 5,405.38.
- applied: false
- fingerprint: de8bf32cb34b

## [F-002] Example set up as a balloon payment produces a drop payment
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: example 'Balloon Payment on a Loan', prompt and last paragraph
- claim: Prompt: the borrower 'clears the loan with a balloon payment at the end of year 10'; the answer finds 1,359.29 < 1,500 and concludes 'making this actually a drop payment', then switches to K = 1,200.
- evidence: By the page's own definition and FIN §19 p.184-185 (balloon = last payment larger than the regular payment; drop = smaller payment), the prompt's 'balloon payment' is a drop payment; the example contradicts its own stem and self-corrects mid-answer. SOA's balloon questions set payments so the final payment is larger (Q126 questions PDF p.53: payments of 600 'except for a final balloon payment that is less than 1000'; Q337 p.142: 360 with balloon < 720).
- source_rank: 3
- proposed_action: Maintainer: rebuild the example with a regular payment that leaves a genuine balloon (e.g. the K = 1,200 case) and drop the self-correction.
- applied: false
- fingerprint: 8994f6abecc3

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Definition vs SYL p.3 and FIN §19 p.184-185; B = L(1+i)^n - K s_{n-1}(1+i) = OB_{n-1}(1+i) derived from the equation of value and checked numerically (1359.41 both ways); retrospective OB vs FIN §37 p.335 and SOA-S Q232 p.59; example recomputed (F-001 rounding, F-002 labelling). Note: SOA Q232 uses 'balloon' for a large payment one period after the 10th regular payment, whereas FIN p.184-185 describes the balloon as combined with the last regular payment; the page's general definition and its n-1/n formula fit both, so no conflict filed. Bullet 'balloon = OB accumulated plus any regular payment due then' is ambiguous but correct if OB means the residual after the regular payment. Links, figure resolve.
- sources_checked: SOA Financial Mathematics Exam syllabus, December 2026, Topic 3 Loans (15-25%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §19 Solving for the Unknown Number of Payments of an Annuity, PDF p.184-185, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §37 Finding the Loan Balance Using Prospective and Retrospective Methods, PDF p.334-335, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 126, questions PDF p.53, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 232, questions PDF p.96, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 232, solutions PDF p.59, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 337, questions PDF p.142, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf
