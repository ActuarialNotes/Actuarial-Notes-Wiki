---
target: Concepts/Annuities.md
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
- claim: 'Annuities — concept summary to be written.' / 'Example to be added.'
- evidence: The page has no definition, formula or example; 10 question files under questions/exam-fm link to it (grep 'Concepts/Annuities'), and it is linked from Exam FM-2 (SOA).md and Concepts/Payment Amount.md. SYL p.3 (Topic 2, outcome a-b) lists the underlying terms as examinable. It embeds Media/Figures/Annuities.svg (exists).
- source_rank: 4
- proposed_action: Maintainer: write the page or redirect its links to the substantive page.
- applied: false
- fingerprint: 9687afe70d60

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
- note: Wrote the page: definition of an annuity (payments at equal intervals) and the annuity-certain/contingent distinction from Finan p.143, the value as the sum of payment values with current value per SOA's notation note p.1, the timing and amount families linked to their pages, and SOA's a/s/ä/s̈ notation with a_n=(1-v^n)/i (Finan p.144), ä_n=(1+i)a_n (Finan p.160), s_n=(1+i)^n a_n (Finan p.146). Two worked examples recomputed in python: 2000·a10 at 5% = 15,443.47 and 2000·ä10 = 16,215.64 (difference 772.17 = 5% of 15,443.47); 1000·s3 + 1000·a5 at 4% = 3,121.60 + 4,451.82 = 7,573.42 = 1000·a8·1.04^3. The existing figure embed was kept; all links resolve and every math node typesets in KaTeX.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- status_set: verified
- confidence: medium
- checks_run: New page checked line by line: annuity/annuity-certain/contingent definitions against Finan p.143 and the syllabus's 'non-contingent payments' (p.3); current value against the notation note p.1; a_n=(1-v^n)/i, ä_n=(1+i)a_n, s_n=(1+i)^n a_n against Finan p.144-146, 160. Examples recomputed: a10@5%=7.72173, 2000a10=15,443.47, 2000ä10=16,215.64; s3@4%=3.12160, a5=4.45182, CV3=7,573.42, a8=6.73274, 1.04^3=1.124864. Links resolve (validate_links --studiable clean); 22 math nodes typeset in KaTeX.
- sources_checked: SOA, Notation and terminology used for Exam FM, p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.143-146, 160, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Financial Mathematics Exam syllabus, December 2026, p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf
