---
target: Concepts/Convexity.md
created: 2026-09-28
---

## [F-001] Macaulay convexity is missing; comparison sentence names Macaulay duration
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: bullet 2 ('The (1+j)^2 factor ... distinguishes this from the Macaulay duration formula') and the page as a whole
- claim: The page gives only modified convexity and says: 'The (1+j)^2 factor in the denominator of v^{t+2} distinguishes this from the Macaulay duration formula'.
- evidence: SYL p.5 outcome a) lists 'duration and convexity (Macaulay and modified)'; NOTE p.2 defines Macaulay convexity = Σt²R_t(1+i)^-t / ΣR_t(1+i)^-t alongside modified convexity P''/P; DUR (5.2)-(5.3) p.7 give C_mac and C_mod = (C_mac + D_mac)/(1+i)^2; SOA Q108 (questions PDF p.46) states liabilities' Macaulay convexity and S108 (solutions p.31) uses Σt²-weights. The page never defines Macaulay convexity, and the sentence compares with the Macaulay *duration* formula, from which the modified-convexity formula also differs by t(t+1) versus t — the Macaulay/modified distinction it gestures at is the convexity one (DUR 5.3). The page's formula is the modified convexity, which NOTE p.2 makes the FM default, so it is right as far as it goes.
- source_rank: 1
- proposed_action: Maintainer: add Macaulay convexity (NOTE p.2 / DUR 5.2) and the relation C_mod = (C_mac + D_mac)/(1+i)^2, and reword the comparison sentence.
- applied: false
- fingerprint: b31118cf7102

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Convexity = P''/P vs NOTE p.2 ('convexity' means modified convexity on FM) and DUR (5.1) p.7 (image) ✓; Σt(t+1)C_t v^{t+2}/P = DUR (5.1) ✓; second-order estimate = DUR (6.1) p.8 ✓; 'higher convexity is beneficial' vs Finan §55 p.480 condition (3) wording and DUR (6.1) ✓; S390 p.103 (convexity = P''/P) ✓; Macaulay convexity absent → F-001 (minor). Example recomputed: −(7.5)(0.005) + ½(68)(0.000025) = −0.0375 + 0.00085 = −0.03665 → −3.67% ✓, −3.75% without the term ✓. Notation j vs NOTE's i — notation only. Links and figure resolve; linked only from Exam FM. Medium: example is the vault's own.
- sources_checked: SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; Alps, Using Duration and Convexity to Approximate Change in Present Value (SOA study note FM-24-17, 2017), §5 Modified and Macaulay Convexity, (5.1)-(5.3), PDF p.7, sha256:530436d4707ecadba3a7bef6e1a9661b8d9e9bb173486edfb6924bc4a4992040 — https://www.soa.org/globalassets/assets/Files/Edu/2017/fm-duration-convexity-present-value.pdf; Alps, Using Duration and Convexity to Approximate Change in Present Value (SOA study note FM-24-17, 2017), §5, (5.4), PDF p.8, sha256:530436d4707ecadba3a7bef6e1a9661b8d9e9bb173486edfb6924bc4a4992040 — https://www.soa.org/globalassets/assets/Files/Edu/2017/fm-duration-convexity-present-value.pdf; Alps, Using Duration and Convexity to Approximate Change in Present Value (SOA study note FM-24-17, 2017), §6 Second-Order Approximations, (6.1), PDF p.8, sha256:530436d4707ecadba3a7bef6e1a9661b8d9e9bb173486edfb6924bc4a4992040 — https://www.soa.org/globalassets/assets/Files/Edu/2017/fm-duration-convexity-present-value.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §55 Redington Immunization and Convexity, PDF p.480, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 390, solutions PDF p.103, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 108, questions PDF p.46, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 108, solutions PDF p.31, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Financial Mathematics Exam syllabus, December 2026, Topic 5 General Cash Flows, Portfolios, and Asset Liability Management (20-30%), learning outcomes a)-c), PDF p.5, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-001
- status: resolved
- note: Added Macaulay convexity C_Mac = sum t^2 C_t v^t / P and the relation C_Mod = (C_Mac + D_Mac)/(1+j)^2 as formula blocks (SOA notation note p.2; FM-24-17 (5.2)-(5.3) PDF p.7), labelled the existing formula as modified convexity, the FM default (notation note p.2), and reworded the comparison bullet to contrast t(t+1)v^(t+2) with t^2 v^t, adding the single-cash-flow values t^2 and t(t+1)/(1+j)^2 (FM-24-17 (5.4) PDF p.8). New example reproduces FM-24-17 (5.5)-(5.6): C_Mac = 228,451.20/7,023.5815 = 32.526311, C_Mod = 32.729830 (python, both directly and via the relation).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- status_set: verified
- confidence: medium
- checks_run: Modified convexity P''/P = sum t(t+1) C_t v^(t+2)/P vs notation note p.2 and FM-24-17 (5.1) ✓; 'convexity' means modified convexity on FM vs notation note p.2 ✓; Macaulay convexity sum t^2 C_t v^t/P vs notation note p.2 and (5.2) ✓; C_Mod = (C_Mac + D_Mac)/(1+i)^2 vs (5.3) ✓; single cash flow t^2 and t(t+1)/(1+i)^2 vs (5.4) ✓; second-order approximation vs (6.1) ✓; Redington convexity condition vs S295 ✓. Example 1 recomputed -0.0375 + 0.00085 = -0.03665 ✓; example 2 recomputed 228,451.1956/7,023.5815 = 32.526311 and (32.526311 + 4.946071)/1.1449 = 32.729830, matching FM-24-17 (5.5)-(5.6) ✓. Links and figure resolve. Medium: example 1 is the vault's own.
- sources_checked: SOA, Notation and terminology used for Exam FM, p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; SOA study note FM-24-17, Alps, Using Duration and Convexity to Approximate Change in Present Value (2017), pp.7-8, sha256:530436d4707ecadba3a7bef6e1a9661b8d9e9bb173486edfb6924bc4a4992040 — https://www.soa.org/globalassets/assets/Files/Edu/2017/fm-duration-convexity-present-value.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 295, solutions PDF p.77, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf
