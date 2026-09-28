---
target: Concepts/Macaulay Duration.md
created: 2026-09-28
---

## [F-001] Perpetuity duration given without the payment-timing condition
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: major
- status: open
- locus: third bullet
- claim: 'For a [[Perpetuity]], D_{Mac} = (1+j)/j = 1/d years'
- evidence: The value holds for a level perpetuity-IMMEDIATE: SOA Q31 (questions PDF p.15, payments 'at the end of each year') / S31 (solutions p.10): duration = 1/d = 1.1/0.1 = 11; S144 (p.39): 'perpetuity-immediate', D = (1+i)/i. For a perpetuity-due the same definition (DUR (3.1) p.5) gives Σ_{t≥0} t v^t / Σ_{t≥0} v^t = 1/i — recomputed in python at 10%: 10.0 versus 11.0, one full period less. The linked [[Perpetuity]] page covers both kinds, so the unqualified statement is wrong for half of them.
- source_rank: 1
- proposed_action: Maintainer: qualify it as a level perpetuity-immediate (payments at the end of each period).
- applied: false
- fingerprint: 79dfd1b7777f

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: low
- checks_run: Formula Σt·C_t v^t / ΣC_t v^t vs DUR (3.1) p.5 (image) and NOTE p.2 ✓; ΣtPV/P form ✓; D_mod = D_mac/(1+j) vs DUR (3.3) ✓; 'measured in time units' vs DUR §2 p.4 ✓; perpetuity (1+j)/j = 1/d vs S31/S144 ✓ for perpetuity-immediate only → F-001 (major, open). Example recomputed: 100/1.05 = 95.24, 1100/1.05^2 = 997.73, P = 1092.97, 95.24 + 1995.46 = 2090.70, D = 1.91286 → 1.913 ✓. Links and figure resolve; linked only from Exam FM. Low: a major is open.
- sources_checked: Alps, Using Duration and Convexity to Approximate Change in Present Value (SOA study note FM-24-17, 2017), §3 Macaulay and Modified Duration, (3.1)-(3.3), PDF p.5, sha256:530436d4707ecadba3a7bef6e1a9661b8d9e9bb173486edfb6924bc4a4992040 — https://www.soa.org/globalassets/assets/Files/Edu/2017/fm-duration-convexity-present-value.pdf; Alps, Using Duration and Convexity to Approximate Change in Present Value (SOA study note FM-24-17, 2017), §3, (3.5)-(3.8), PDF p.6, sha256:530436d4707ecadba3a7bef6e1a9661b8d9e9bb173486edfb6924bc4a4992040 — https://www.soa.org/globalassets/assets/Files/Edu/2017/fm-duration-convexity-present-value.pdf; SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 31, questions PDF p.15, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 31, solutions PDF p.10, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 144, questions PDF p.61, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 144, solutions PDF p.39, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Financial Mathematics Exam syllabus, December 2026, Topic 5 General Cash Flows, Portfolios, and Asset Liability Management (20-30%), learning outcomes a)-c), PDF p.5, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf
