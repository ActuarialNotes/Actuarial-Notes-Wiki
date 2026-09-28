---
target: Concepts/Asset-Liability Portfolio.md
created: 2026-09-28
---

## [F-001] Convexity presented as optional and as something to match
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: major
- status: open
- locus: second bullet ([[Duration Matching]] / [[Immunization]])
- claim: 'match the [[Duration]] (and optionally [[Convexity]]) of assets and liabilities, allowing some reinvestment but protecting against small rate changes'
- evidence: SOA S333 (solutions PDF p.88): statement III, 'Immunization techniques strive to arrange the asset portfolio such that the convexity of the assets is equal to the convexity of the liabilities' (Q333, questions PDF p.141), is false 'as the convexity of assets should be greater than the convexity of liabilities'. SOA S295 (p.77) and S268 (p.69): immunization against small rate changes (Redington) requires equal PV, equal modified durations AND asset convexity exceeding liability convexity; S181 (p.47) likewise ('the convexity of assets should be greater'). Finan §55 p.480 condition (3) P''(i) > 0. The bullet makes the convexity condition optional and describes it as a match — the exact misconception Q333 III tests.
- source_rank: 1
- proposed_action: Maintainer: say that Redington immunization requires asset convexity to exceed liability convexity (a required condition, not an optional match). Not fixed: deleting the parenthetical alone would leave the bullet describing immunization as duration matching only.
- applied: false
- fingerprint: 0a7dc82428fc

## [F-002] Definition treats the asset-liability portfolio as the assets alone
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: opening sentence
- claim: 'An asset-liability portfolio (or matched portfolio) refers to a set of assets constructed to offset specific liabilities in terms of timing and value of cash flows.'
- evidence: SOA Q268 (questions PDF p.113) describes 'a portfolio of assets and liabilities'; SYL p.5 outcome c) 'Protect the value of an asset-liability portfolio', and Finan §55 p.479 values the position as P(i) = Σ v^t (A_t − L_t) — the liabilities are part of the portfolio whose surplus is protected. The synonym 'matched portfolio' occurs in none of SYL, NOTE, DUR, the SOA sample set (full-text search) or Finan §§55-56.
- source_rank: 1
- proposed_action: Maintainer: define the asset-liability portfolio as the combined position of assets and liabilities whose surplus is protected; source or drop 'matched portfolio'.
- applied: false
- fingerprint: 52502c0407c0

## [F-003] Example's zero-coupon cost is 35 cents too high
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: example 'Simple ALM', answer
- claim: '50000(1.05)^{-4} = 41135.47'
- evidence: 1.05^4 = 1.21550625; 50,000 / 1.21550625 = 41,135.12 (python). The stated 41,135.47 is 0.35 too high; the matching logic is unaffected.
- source_rank: 5
- proposed_action: Replace 41135.47 with 41135.12.
- applied: false
- fingerprint: fc3532dd2b12

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: low
- checks_run: Definition vs SYL p.5 and SOA Q268 p.113 (F-002); cash-flow-matching bullet vs Finan §56 p.489 (dedication: asset inflows exactly match liability outflows, full protection) ✓; duration-matching/immunization bullet vs S333/S295/S268/S181 (F-001, major, open); example recomputed: 50000·1.05^-4 = 41,135.12 vs 41,135.47 on page (F-003, minor); 'exactly cash-flow matches with no interest rate risk' ✓ Finan p.489. ALM-in-insurance remark is generic, not filed. Links and figure resolve; linked only from Exam FM. Low: a major is open.
- sources_checked: SOA Financial Mathematics Exam syllabus, December 2026, Topic 5 General Cash Flows, Portfolios, and Asset Liability Management (20-30%), learning outcomes a)-c), PDF p.5, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 268, questions PDF p.113, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 268, solutions PDF p.69, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 333, questions PDF p.141, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 333, solutions PDF p.88, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 295, solutions PDF p.77, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 181, solutions PDF p.47, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §55 Redington Immunization and Convexity, PDF p.479, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §55 Redington Immunization and Convexity, PDF p.480, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §56 Full Immunization and Dedication, PDF p.489, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf
