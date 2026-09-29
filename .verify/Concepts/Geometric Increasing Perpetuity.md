---
target: Concepts/Geometric Increasing Perpetuity.md
created: 2026-09-28
---

## [F-001] Placeholder page with no content
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: whole page
- claim: 'Geometric Increasing Perpetuity — concept summary to be written.' / 'Example to be added.'
- evidence: The page has no definition, formula or example; 3 question files under questions/ link to it; no exam or concept page links to it. SYL p.3 (Topic 2, outcome a-b) lists the underlying terms as examinable. The substance (PV = 1/(i-g) for i > g) sits on Concepts/Geometric Increasing Annuity.md and Concepts/Geometric Progression.md.
- source_rank: 4
- proposed_action: Maintainer: write the page or redirect its links to the substantive page.
- applied: false
- fingerprint: 3d0f6be278f4

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: in_review
- checks_run: Read the page: placeholder text only, no claim to check against a source; links/figure resolve; no LaTeX.
- sources_checked: SOA Financial Mathematics Exam syllabus, December 2026, Topic 2 Annuities/cash flows with non-contingent payments (20-30%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf
- note: Nothing verifiable on the page; left in_review with F-001 (stub) until content exists.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-001
- status: resolved
- note: Wrote the page for the sense its three linking questions use (fm-011: level payments then a geometric perpetuity; fm-084: a geometric perpetuity-due; cas7-2014-q16: constant-growth dividends — the same formula, so no retag): PV = 1/(i-g) for i > g and no finite value for g ≥ i (Finan p.239, and SOA solutions Q11 p.6 and Q84 p.24, which sum the same series), the limit of the geometric annuity formula (Finan p.238), the due form (1+i)/(i-g) (Finan p.252), and the dividend reading (Finan Ex. 26.8 p.239); links to Geometric Increasing Annuity and Increasing Annuity rather than repeating them. Examples recomputed in python: 5,000/(0.06-0.02) = 125,000 and ×1.06 = 132,500 (partial sum to 4,000 terms identical), level-only 83,333.33; 100a_3@8% + (103/0.05)(1.08)^-3 = 257.71 + 1,635.29 = 1,893.00 (brute-force sum 1,893.004).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- status_set: verified
- confidence: medium
- checks_run: New page checked line by line: PV = 1/(i-g) for i > g and non-existence for 1+g ≥ 1+i vs Finan p.239; limit of (1-((1+g)/(1+i))^n)/(i-g) vs Finan p.238; perpetuity-due (1+i)/(i-g) vs Finan p.252; dividend use vs Finan Ex. 26.8 p.239; SOA solutions Q11 p.6 (deferred geometric perpetuity after 5 level payments) and Q84 p.24 (geometric perpetuity-due, 2,000/(1-1.005v)) read from page images; 'Geometric progression, finite term and perpetuity' vs syllabus p.3. Examples recomputed in python: 125,000; 132,500; 83,333.33; a_3@8% = 2.577097, 1.08^-3 = 0.793832, 2,060, PV 1,893.00. 18 math nodes typeset in KaTeX; links resolve; no figure exists for this page.
- sources_checked: Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.238-239, 252, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 11, solutions PDF p.6, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 84, solutions PDF p.24, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Financial Mathematics Exam syllabus, December 2026, p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf
