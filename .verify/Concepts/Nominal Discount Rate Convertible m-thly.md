---
target: Concepts/Nominal Discount Rate Convertible m-thly.md
created: 2026-09-28
---

## [F-001] Example: d^(12) at i = 6% is 5.813%, not 5.82% (truncated intermediate)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: Finding Nominal Discount Rate example, answer line 37
- claim: d^(12) = 12[1 - (1.06)^{-1/12}] = 12[1 - 0.99515] = 12(0.00485) = 5.82%.
- evidence: Recomputed: 1.06^(-1/12) = 0.9951560, 1 - 0.9951560 = 0.0048440, x 12 = 0.0581277, so d^(12) = 5.813% (5.81%). The page truncates 0.9951560 to 0.99515, which carries through to 5.82%. Method is right (FIN §9 p.69: d^(m) = m[1 - v^(1/m)]). Consistency check: d^(12) = 5.813% < delta = 5.827% < i^(12) = 5.841%, as FIN Ex.10.15 p.86-87 requires. Low consequence (last-digit), hence minor.
- source_rank: 5
- proposed_action: Carry more digits: 12[1 - 0.995156] = 12(0.004844) = 5.813%.
- applied: false
- fingerprint: 0cb66b1b1c4b

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Definition (d^(m)/m paid at the beginning of each mth) vs NOTE p.1 and FIN §9 p.68; (1 - d^(m)/m)^m = 1 - d = v = 1/(1+i) and d^(m) = m[1 - v^(1/m)] vs FIN §9 p.69, SOA-S Q9 p.5 (image: 1 - d/4 = 1.57738^(-1/40), d = 4(1 - 0.98867)) and SOA-S Q214 p.54 (image: (1 - 0.12/4)^(-4n)); d^(m) -> delta vs FIN Ex.10.11 p.84; d^(m) < i^(m) vs FIN Ex.10.15 p.86-87 (d < d^(m) < delta < i^(m) < i, i > 0). Worked example (vault's own) recomputed: 5.813% vs page 5.82% (F-001, minor rounding). Figure consistent. Links resolve; LaTeX fine.
- sources_checked: SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; SOA Financial Mathematics Exam syllabus, December 2026, Topic 1 Time Value of Money, learning outcomes a)-c), PDF p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 9, solutions PDF p.5, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 214, solutions PDF p.54, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §9, PDF p.68-69, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §10, PDF p.84-87, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf
