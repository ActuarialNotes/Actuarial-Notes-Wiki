---
target: Concepts/Full Immunization.md
created: 2026-09-28
---

## [F-001] Condition list omits duration matching, then claims the two conditions suffice
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: major
- status: open
- locus: numbered conditions 1-2 and the bullet 'Under these conditions ... surplus remains non-negative'
- claim: 'Full immunization is achieved when: 1. PV(assets) = PV(liabilities) at the current yield 2. The asset cash flows "surround" the liability cash flow date ...' followed by 'Under these conditions, for any interest rate change i → i + Δ, the Portfolio surplus remains non-negative'.
- evidence: Finan §56 p.486 lists three conditions: (1) PV of assets = PV of liability, (2) modified duration of assets = modified duration of liability, (3) asset cash flows before and after the liability; the proof p.487-488 uses (2). SOA S56 (solutions p.16) and S105 (p.30) set up both the PV equation and the derivative (duration) equation; S333 (p.88) on statement II: for full immunization 'the durations will be equal'. With PV matched and flows bracketing the liability but durations unequal, the surplus is negative for rate moves in one direction. The page's own example does add 'and the Macaulay durations match', so the page contradicts itself.
- source_rank: 1
- proposed_action: Maintainer: add D(assets) = D(liabilities) as a condition (Finan §56 p.486 (2)). Not fixed: adding a condition is authoring.
- applied: false
- fingerprint: dad2a8901628

## [F-002] Unsourced comparison: full immunization 'generally requires more asset cash flows'
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: last bullet before the figure
- claim: 'Full immunization generally requires more asset cash flows than [[Redington Immunization]] and is more restrictive'
- evidence: No source read says so. Finan §56 p.486/488 needs two asset flows per liability for full immunization; SOA S108 (solutions p.31) achieves Redington immunization of a liability with two zero-coupon bonds, and S56 (p.16) full immunization with two payments — the same count. 'More restrictive' is defensible (the full conditions imply Redington's for a single liability) but is not stated in the sources either.
- source_rank: 3
- proposed_action: Maintainer: source the claim or drop the 'more asset cash flows' part.
- applied: false
- fingerprint: a870b0b1caf7

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: low
- checks_run: 'Any single interest rate shift, small or large' vs Finan §56 p.486 ('can be applied for all changes of i') ✓ and contrast with Redington small parallel shifts vs S432 (E)/S333 I ✓; not for non-parallel shifts consistent with Q147 (D) ✓; condition list vs Finan p.486 (1)-(3) and S56/S105/S333 → missing duration condition (F-001, major, open); multiple liabilities 'each liability payment date' vs Finan p.488 (two asset inflows per liability outflow) ✓; 'more asset cash flows' → F-002 (minor). Example (two zeros bracketing T, PV equal and Macaulay durations matched) vs Finan Ex. 56.1-56.2 p.486-489 and S56 ✓ — no numbers to recompute. Links and figure resolve; linked only from Exam FM. Low: a major is open.
- sources_checked: Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §56 Full Immunization and Dedication, PDF p.486, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §56 Full Immunization and Dedication, PDF p.487, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §56 Full Immunization and Dedication, PDF p.488, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 56, questions PDF p.25, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 56, solutions PDF p.16, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 105, questions PDF p.45, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 105, solutions PDF p.30, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 333, solutions PDF p.88, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 432, solutions PDF p.112, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 147, questions PDF p.63, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 108, solutions PDF p.31, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Financial Mathematics Exam syllabus, December 2026, Topic 5 General Cash Flows, Portfolios, and Asset Liability Management (20-30%), learning outcomes a)-c), PDF p.5, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-001
- status: resolved
- note: Condition list now has the three conditions SOA states for a single liability: PV(assets) = PV(liability), duration of assets = duration of liability, and an asset cash flow before and one after the liability (SOA S382 p.101; Finan §56 p.486 (1)-(3); S333 II 'the durations will be equal'). The two-zero-coupon system (PV equation and duration equation) is added as the formula block, with Finan p.487's reduced form, and the surplus claim is now stated under all three conditions (Finan pp.487-488 proof). The generic example now writes the duration equation out, and a numeric example (liability 1,000 at 15, zeros at 10 and 20, i = 4%) gives A = 410.96, B = 608.33 and surplus 3.50 at 2%, 1.89 at 6% (python; Finan Ex. 56.2 p.489 table: 746.51/743.01 and 419.16/417.27 — Finan truncates B to 608.32).

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-002
- status: resolved
- note: Deleted the unsourced 'generally requires more asset cash flows ... more restrictive' bullet. In its place, two sourced statements from Finan §56 p.488: several liabilities are handled one at a time with two asset inflows per liability outflow, and like Redington the portfolio must be rebalanced periodically to keep durations equal.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- status_set: verified
- confidence: medium
- checks_run: Three single-liability conditions (PV match, duration match, asset flows before and after) vs S382 p.101 and Finan p.486 ✓; PV and derivative equations vs S307 p.81 (h(i) = 0, h'(i) = 0) ✓; reduced system A(1+i)^a + B(1+i)^-b = L, aA(1+i)^a = bB(1+i)^-b vs Finan p.487 ✓; surplus > 0 at every other rate vs Finan pp.487-488 proof ✓; any change vs Redington's small changes vs S333 I ✓; multiple liabilities and rebalancing vs Finan p.488 ✓. Example 2 recomputed: A = 500·1.04^-5 = 410.96, B = 500·1.04^5 = 608.33, PV at 4% 555.26 both sides, at 2% 746.52 vs 743.01 (surplus 3.50), at 6% 419.16 vs 417.27 (1.89) — matches Finan Ex. 56.2 table p.489 ✓. Links and figure resolve. Medium: examples are the vault's own framing.
- sources_checked: SOA Exam FM Sample Solutions (rev. Aug 2026), Q 382, solutions PDF p.101, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 307, solutions PDF p.81, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 333, solutions PDF p.88, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets, pp.486-489, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf
