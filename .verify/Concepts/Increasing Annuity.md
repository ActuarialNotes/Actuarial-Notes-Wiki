---
target: Concepts/Increasing Annuity.md
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
- claim: 'Increasing Annuity — concept summary to be written.' / 'Example to be added.'
- evidence: The page has no definition, formula or example; 19 question files under questions/ link to it (grep 'Concepts/Increasing+Annuity'); no exam or concept page links to it. SYL p.3 (Topic 2, outcome a-b) lists the underlying terms as examinable. The substance ((Ia)_n) sits on Concepts/Arithmetic Increasing Annuity.md.
- source_rank: 4
- proposed_action: Maintainer: write the page or redirect its links to the substantive page.
- applied: false
- fingerprint: b5f0c4a89638

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
- note: Wrote the page as the hub the 19 FM questions tagging it need (fm-004 … fm-316: immediate, due, accumulated, perpetuity, and fm-259's mixed arithmetic/geometric case). It defines the arithmetic (Ia)/(Is) family in SOA's solution notation — (Ia)_n = (ä_n - nv^n)/i (SOA Q4, Q118), (Is)_n = (s̈_n - n)/i (SOA Q169), (Iä)_n = (ä_n - nv^n)/d (SOA Q160), (Is̈)_n (Finan p.249), (Ia)_∞ = 1/i + 1/i^2 (Finan p.237), (Iä)_∞ = 1/d^2 (Finan p.251) — and points to Arithmetic Increasing Annuity, Arithmetic Progression (P, Q split, as in SOA Q169's 1097s + 5(Is)), Decreasing Annuity, Geometric Increasing Annuity and Geometric Increasing Perpetuity instead of repeating them. Examples recomputed in python: 100(Is)_10 at 5% = 6,413.57 (brute force Σ100t·1.05^(10-t) identical, = (1.05)^10·(Ia)_10 = 39.373783·1.628895); 1,000(Ia)_∞ at 8% = 168,750 (partial sum to 3,000 terms identical).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- status_set: verified
- confidence: medium
- checks_run: New page checked line by line against page images of SOA solutions Q4 p.4 ((Ia)_n), Q160 p.42 ((Iä)_n = (ä_n - nv^n)/d), Q169 p.44 ((Is)_n = (s̈_n - n)/i and the level-plus-(Is) split), and Finan (26.5) p.235, p.237 ((Ia)_∞), p.249 ((Iä), (Is̈)), p.251 ((Iä)_∞ = 1/d^2), p.236 ((Da)); the arithmetic/geometric increasing/decreasing terms vs syllabus p.3. Examples recomputed in python: s_10@5% = 12.577893, s̈_10 = 13.206787, (Is)_10 = 64.13574, AV = 6,413.57; (Ia)_∞@8% = 12.5 + 156.25, PV = 168,750. Links resolve (validate_links --studiable clean); 30 math nodes typeset in KaTeX; no figure exists for this page and none is embedded.
- sources_checked: SOA Exam FM Sample Solutions (rev. Aug 2026), Q 4, solutions PDF p.4, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 160, solutions PDF p.42, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 169, solutions PDF p.44, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.234-238, 249-251, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Financial Mathematics Exam syllabus, December 2026, p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf
