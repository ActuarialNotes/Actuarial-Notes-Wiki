---
target: Concepts/Nominal Interest Rate Convertible m-thly.md
created: 2026-09-28
---

## [F-001] Example: i^(4) at i = 8% is 7.771%, not 7.772% (rounded intermediate)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: Converting Annual to Quarterly Rate example, answer line 32
- claim: i^(4) = 4[(1.08)^{1/4} - 1] = 4(1.01943 - 1) = 4(0.01943) = 7.772%.
- evidence: Recomputed: 1.08^(1/4) = 1.0194265, 4 x 0.0194265 = 0.0777062, so i^(4) = 7.771% (7.7706%). The page rounds 1.0194265 up to 1.01943 before multiplying by 4, giving 7.772%. Method right (FIN §9 p.67: i^(m) = m[(1+i)^(1/m) - 1]).
- source_rank: 5
- proposed_action: Carry more digits: 4(1.019427 - 1) = 4(0.019427) = 7.771%.
- applied: false
- fingerprint: b97d8e64b00d

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Definition (i^(m) compounded m times, i^(m)/m per period) vs NOTE p.1 and FIN §9 p.66; (1 + i^(m)/m)^m = 1 + i and i^(m) = m[(1+i)^(1/m) - 1] vs FIN §9 p.67 and BA2 p.6; i^(m) -> delta vs FIN §10 p.78. Worked example (vault's own) recomputed: 7.7706% vs page 7.772% (F-001, minor rounding). Figure (x1.03 per quarter to 1.1255 vs quoted 1.12) recomputed 1.03^4 = 1.12551 - consistent. Links resolve; the lone '>' line 20 joins the two formulas into one blockquote - renders, not a fault.
- sources_checked: SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; SOA Financial Mathematics Exam syllabus, December 2026, Topic 1 Time Value of Money, learning outcomes a)-c), PDF p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §9, PDF p.66-67, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §10, PDF p.78, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Broverman, Review of Calculator Functions for the Texas Instruments BA II Plus (SOA study note FM-23-05), PDF p.6, sha256:1b71586cc1b08d7bc36c04ecb3d4e6b367fce30f394e63efafc879e6b6e466fa — https://www.soa.org/globalassets/assets/files/edu/FM-23-05.pdf

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-001
- status: resolved
- note: Example now carries full precision: (1.08)^(1/4) = 1.0194265, 4(0.0194265) = 0.077706, so i^(4) = 7.771% (was 7.772% from rounding 1.0194265 up to 1.01943 before multiplying). Laid out as align* with the check (1 + 0.077706/4)^4 = 1.0194265^4 = 1.0800 (python).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- status_set: verified
- confidence: medium
- checks_run: Definition (i^(m) payable m times per period, i^(m)/m effective per mth) vs NOTE p.1 and FIN §9 p.66; (1 + i^(m)/m)^m = 1 + i and i^(m) = m[(1+i)^(1/m) - 1] vs FIN §9 p.67; i^(m) decreasing in m with limit delta vs FIN Ex.10.15 p.86-87 (i(infinity) = delta). Example recomputed in python: 1.08^0.25 = 1.01942655, 4 x 0.01942655 = 0.0777062 -> 7.771%; back-check 1.0194265^4 = 1.0799998. align* fences on own lines; links resolve. Medium: worked example is the vault's own.
- sources_checked: SOA, Notation and terminology used for Exam FM, p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.66-67, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.86-87, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf
