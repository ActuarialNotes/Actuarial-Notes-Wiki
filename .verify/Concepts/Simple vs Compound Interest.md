---
target: Concepts/Simple vs Compound Interest.md
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
- claim: 'Simple vs Compound Interest — concept summary to be written.' and a worked example reading 'Example to be added.'
- evidence: The page has no definition, formula or example to check against any source. Linked from question files under that topic; SYL Topic 1 a) p.2 lists simple interest and compound interest as terms to define, and Finan Theorem 6.1 p.42-43 is the comparison such a page would state.
- source_rank: 1
- proposed_action: Maintainer: write the page (definition, formula, example) from the syllabus readings; until then nothing on it can be verified.
- applied: false
- fingerprint: f3afb67484f7

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
- note: Page written: definitions and accumulation functions a(t) = 1 + it and (1+i)^t (FIN §4 p.28, §6 p.41), the comparison of FIN Theorem 6.1 p.42-43 (equal at t = 0, 1; compound smaller for 0 < t < 1, larger for t > 1) as one cases block, constant amount vs constant proportion with the simple-interest effective rate i_n = i/(1 + i(n-1)) (FIN §4 p.28, p.43), comparison-date dependence of an equation of value under simple but not compound interest (FIN §12 p.101-102), and the simple/compound discount counterparts (FIN §8 p.58, §10 p.84) that fm-247 compares. Two examples recomputed in python: 1040.00 vs 1039.23 at t = 0.5 and 1240.00 vs 1259.71 at t = 3 (8%); P = 680 + 560 = 1240.00 at comparison date 6 vs 1480/1.24 = 1193.55 at date 10 under 6% simple, 709.26 + 561.80 = 1271.06 at either date under compound. Serves fm-003, 203, 207, 247.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- status_set: verified
- confidence: medium
- checks_run: New page. Simple a(t) = 1 + it, effective rate i/(1 + i(n-1)) decreasing, constant amount per period vs FIN §4 p.28 (Remark 4.1); compound a(t) = (1+i)^t, constant effective rate, constant proportion vs FIN §6 p.41, p.43; ordering (1+i)^t vs 1 + it vs FIN Theorem 6.1 p.42-43 (stated for 0 < i < 1; the proof uses only i > 0); comparison-date invariance under compound but not simple interest vs FIN §12 p.101-102 (Ex.12.2, 12.3: 275 vs 260); simple discount 1 - dt vs FIN p.84, compound discount (1-d)^t vs FIN p.58; terms vs SYL Topic 1 a) p.2. Examples recomputed in python: 1000(1.04) = 1040, 1000(1.08)^0.5 = 1039.230, 1000(1.24) = 1240, 1000(1.08)^3 = 1259.712; 500(1.36) + 500(1.12) = 1240, (800 + 680)/1.24 = 1193.548, 500(1.06)^6 + 500(1.06)^2 = 709.260 + 561.800 = 1271.060 = (500(1.06)^10 + 500(1.06)^6)/1.06^4. align* fences on own lines; links resolve. Medium: worked examples are the vault's own.
- sources_checked: SOA Financial Mathematics Exam syllabus, December 2026, p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.28, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.41-43, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.58, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.84, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.100-102, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf
