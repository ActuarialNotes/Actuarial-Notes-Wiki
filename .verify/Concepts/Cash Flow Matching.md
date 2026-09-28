---
target: Concepts/Cash Flow Matching.md
created: 2026-09-28
---

## [F-001] 'Excess carries forward' contradicts the exact-matching definition and SOA's method
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: fourth bullet
- claim: 'Any asset cash flow exceeding the liability at a given date carries forward as an offset to the next liability.'
- evidence: The page's own definition says asset cash flows 'exactly equal liability cash flows at every future date' with no reinvestment risk; an excess carried forward must be reinvested, the risk Finan §56 p.489 (item 2) says exact matching avoids. SOA's worked method runs the other way: S37 (solutions PDF p.12), S192 (p.49) and S346 (p.92) fund the latest liability first and subtract that bond's coupons from the *earlier* liabilities. (SOA Q39, questions p.19, does add reinvestment at a stated forward rate, so the sentence is not wrong in every setting — hence minor.)
- source_rank: 1
- proposed_action: Maintainer: replace with SOA's rule (coupons of the bonds bought for later liabilities reduce the amount needed for earlier ones) or delete the bullet.
- applied: false
- fingerprint: ba9110d50582

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: 'Dedication' vs Finan §56 p.489 ('dedication or absolute matching') ✓; eliminates price and reinvestment risk vs Finan p.489 ('full protection against any movement in interest rates') ✓; Redington only small parallel shifts vs S333 I and S432 (E) ✓; needs no rebalancing vs S432 (B: Redington 'requires more rebalancing' than cash-flow matching) and Finan p.480 (d) ✓; more expensive / less flexible vs Finan p.489 item 3 and S147 ✓; backwards construction vs S37, S192, S346 ✓; excess-carried-forward bullet → F-001 (minor). Example: face 10,000 two-year and 5,000 one-year zeros exactly match (cf. S157 statement I, p.41); cost formula with spot rates ✓. Links ([[Price Risk]], [[Reinvestment Risk]], [[Redington Immunization]]) resolve; no figure. Medium: example is the vault's own; some claims rest on Finan (rank 3).
- sources_checked: Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §56 Full Immunization and Dedication, PDF p.489, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §55 Redington Immunization and Convexity, PDF p.480, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 147, solutions PDF p.40, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 432, solutions PDF p.112, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 333, solutions PDF p.88, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 37, solutions PDF p.12, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 192, solutions PDF p.49, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 346, solutions PDF p.92, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 157, solutions PDF p.41, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 39, questions PDF p.19, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf; SOA Financial Mathematics Exam syllabus, December 2026, Topic 5 General Cash Flows, Portfolios, and Asset Liability Management (20-30%), learning outcomes a)-c), PDF p.5, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf
