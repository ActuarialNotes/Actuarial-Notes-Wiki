---
target: Concepts/Yield Curve.md
created: 2026-09-28
---

## [F-001] Example's bond price is 1.42 too high (two discounted terms wrong)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: major
- status: open
- locus: example 'Reading and Using a Yield Curve', answer line 2
- claim: 'P = 48.54 + 46.27 + 921.49 = $1,016.30'
- evidence: Recomputed (python): 50/1.03 = 48.54 ✓, 50/1.04² = 50/1.0816 = 46.23 (page 46.27), 1050/1.045³ = 1050/1.141166 = 920.11 (page 921.49); P = 1,014.88, not 1,016.30. The method is the spot-rate pricing of Finan §53 p.459 and SOA S225 (solutions p.56); only the arithmetic is off. The premium-bond conclusion still holds (1,014.88 > 1,000).
- source_rank: 5
- proposed_action: Replace 46.27 → 46.23, 921.49 → 920.11 and 1,016.30 → 1,014.88.
- applied: false
- fingerprint: 7ad9a4de90fd

## [F-002] Unsourced interpretations of curve shapes
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: bullets 1-2 (normal and inverted curves)
- claim: 'reflecting expectations of rising rates or a liquidity premium' and 'often signaling a potential economic slowdown'
- evidence: Finan §53 p.459 says only that an upward-sloping curve 'implies market's expectation of future increases in interest rates' and names the inverted and flat shapes; SYL p.5 and the SOA sample set (Q371, questions p.157, the only yield-curve-shape question) are silent on liquidity premiums and recessions. The two added explanations are not in any FM source read.
- source_rank: 3
- proposed_action: Maintainer: source the liquidity-premium and slowdown remarks or drop them.
- applied: false
- fingerprint: 60e2c5a6168e

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: low
- checks_run: Yield curve as spot rate against maturity vs Finan §53 p.459 ✓; P = ΣC_t/(1+s_t)^t vs Finan p.459 and S225 p.56 ✓; normal/inverted/flat definitions vs Finan p.459 and S371 p.98 (flat curve when all zero prices imply 6%) ✓; interpretive remarks → F-002 (minor); bootstrapping vs Finan Ex. 53.5 p.462 ✓. Example recomputed: 48.54 + 46.23 + 920.11 = 1,014.88 vs page 1,016.30 → F-001 (major, open); premium-bond reasoning (yield lies between the spot rates, all below the 5% coupon) ✓. Links and figure resolve; linked only from Exam FM. Low: a major is open.
- sources_checked: Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §53 The Term Structure of Interest Rates and Yield Curves, PDF p.459, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §53 The Term Structure of Interest Rates and Yield Curves, PDF p.462, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 371, questions PDF p.157, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 371, solutions PDF p.98, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 225, solutions PDF p.56, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Financial Mathematics Exam syllabus, December 2026, Topic 5 General Cash Flows, Portfolios, and Asset Liability Management (20-30%), learning outcomes a)-c), PDF p.5, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf
