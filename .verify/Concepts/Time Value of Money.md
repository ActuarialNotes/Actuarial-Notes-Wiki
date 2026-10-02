---
target: Concepts/Time Value of Money.md
created: 2026-09-28
---

## [F-001] Page is an empty placeholder
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: whole page (lines 14-18)
- claim: 'Time Value of Money — concept summary to be written.' and a worked example reading 'Example to be added.'
- evidence: The page has no definition, formula or example to check against any source. Also linked from Exam 9 (CAS) learning outcome B.3 ('reflecting the time value of money'), so an Exam 9 reader following the link reaches an empty page. SYL Topic 1 (p.2) is titled 'Time Value of Money'; Finan §1 p.10 and §12 p.100 describe the principle.
- source_rank: 1
- proposed_action: Maintainer: write the page (definition, formula, example) from the syllabus readings; until then nothing on it can be verified.
- applied: false
- fingerprint: 5043108a935c

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: in_review
- checks_run: Page is a placeholder with no substantive claims -> F-001 (minor). Nothing to check against a source; left in_review per procedure.
- sources_checked: SOA Financial Mathematics Exam syllabus, December 2026, Topic 1 Time Value of Money (5-15%), learning outcomes a)-d), PDF p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf
- note: Placeholder page — no content to verify.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-001
- status: resolved
- note: Page written: definition (value depends on when money is paid; amounts at different times compared only at a common comparison date — FIN §1 p.10, §12 p.100), the value C(1+i)^(t-s) of an amount moved from s to t stated under compound interest, SOA's current-value definition (NOTE p.1), the equation of value and its comparison-date invariance under compound but not simple interest (FIN §12 p.100-101), and Finan's interest-only (no inflation) assumption. Two examples recomputed in python: 11500(1.05)^-3 = 9934.13 < 10000, break-even 1.15^(1/3) - 1 = 4.769%; 2000(1.06)^2 + 3000(1.06)^-2 = 2247.20 + 2669.99 = 4917.19 = 4376.28(1.06)^2. Serves the FM questions tagged Time Value of Money (equations of value, current value, rate comparisons) and the Exam 9 B.3 / Economic Value links (sense: discounting for interest).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- status_set: verified
- confidence: medium
- checks_run: New page. Definition vs FIN §1 p.10 (interest 'sometimes referred to as the time value of money') and §12 p.100 (value depends on time; comparison only at a common comparison date; interest only, not inflation); C(1+i)^(t-s) under compound interest with v = 1/(1+i) vs NOTE p.1; current value vs NOTE p.1 word for word in substance; equation of value, same answer at any comparison date under compound interest but not simple interest vs FIN §12 p.100-101 (Ex.12.2, 12.3); topic scope vs SYL Topic 1 p.2. Examples recomputed in python: 11500 x 1.05^-3 = 9934.13; 1.15^(1/3) - 1 = 0.047690; 2000 x 1.06^2 = 2247.20, 3000 x 1.06^-2 = 2669.99, sum 4917.19; 2000 + 3000 x 1.06^-4 = 4376.28, x 1.06^2 = 4917.19. align* fences on own lines; links resolve. Medium: worked examples are the vault's own.
- sources_checked: SOA Financial Mathematics Exam syllabus, December 2026, p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; SOA, Notation and terminology used for Exam FM, p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.10, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.100-101, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf
