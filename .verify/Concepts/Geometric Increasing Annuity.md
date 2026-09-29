---
target: Concepts/Geometric Increasing Annuity.md
created: 2026-09-28
---

## [F-001] Worked example uses (1.03/1.07)^20 = 0.6730; the value is 0.4667 and the PV 266,633, not 163,500
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: major
- status: open
- locus: example 'Inflation-Adjusted Pension'
- claim: 'PV = 20000 · (1-(1.03/1.07)^20)/(0.07-0.03) = 20000 · (1-0.6730)/0.04 = 20000 × 8.175 = 163,500'
- evidence: Recomputed (python): (1.03/1.07)^20 = 0.466733, factor = (1 - 0.466733)/0.04 = 13.331663, PV = 266,633.27; brute-force sum of 20,000(1.03)^{t-1}(1.07)^{-t}, t = 1..20, = 266,633.27. The formula on the page is right (FIN p.238; SOA-S Q443 p.115 uses the same (1 - ((1+g)/(1+i))^n)/(i - g) form); only the power is wrong, and it understates the PV by 39%.
- source_rank: 5
- proposed_action: Maintainer: replace 0.6730 with 0.46673, 8.175 with 13.3317 and 163,500 with 266,633.27.
- applied: false
- fingerprint: 1bb1da20e111

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: low
- checks_run: PV = (1 - ((1+g)/(1+i))^n)/(i - g) for payments 1, (1+g), …, (1+g)^{n-1} vs FIN §26 p.238 and SOA-S Q443 p.115 (image); i = g case n v vs FIN p.238 (and numerically, n = 5 at 5%: 4.761905 both ways); decreasing case (g < 0) vs FIN p.238-239; geometric perpetuity 1/(i - g), i > g vs FIN p.239 and SOA-S Q460 p.122 (image, 1/(i - r)). Example recomputed (F-001, major). Links, figure, LaTeX resolve. Low: F-001 (major) is open.
- sources_checked: Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §26 Varying Annuity-Immediate, geometric progression, PDF p.238-239, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 443, solutions PDF p.115, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 460, solutions PDF p.122, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Financial Mathematics Exam syllabus, December 2026, Topic 2 Annuities/cash flows with non-contingent payments (20-30%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-001
- status: resolved
- note: Example recomputed in python and rewritten as one align*: (1.03/1.07)^20 = 0.46673346 (not 0.6730), factor (1-0.46673346)/0.04 = 13.3316635 (not 8.175), PV = 20,000 × 13.3316635 = 266,633.27 (not 163,500). Brute-force Σ 20,000(1.03)^(t-1)(1.07)^-t, t=1..20 = 266,633.27. Added a one-line reading of the result (undiscounted total 537,407; level a_20@7% = 10.59 vs 13.33), both recomputed. The formula (Finan p.238, as used in SOA solution Q443) was already right and is unchanged.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- status_set: verified
- confidence: medium
- checks_run: Re-checked on the new bytes: PV = (1-((1+g)/(1+i))^n)/(i-g) for payments 1, 1+g, …, (1+g)^(n-1) vs Finan p.238 and SOA solution Q443 p.115 (page image); i = g gives n v vs Finan p.238; decreasing (g<0) vs Finan p.238-239; perpetuity 1/(i-g), i > g vs Finan p.239. Example recomputed in python: ratio^20 = 0.46673346, factor 13.3316635, PV 266,633.27 (brute force identical), undiscounted total 537,407.49, a_20@7% = 10.594. 14 math nodes typeset in KaTeX; links and figure resolve.
- sources_checked: Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.238-239, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 443, solutions PDF pp.115-116, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf
