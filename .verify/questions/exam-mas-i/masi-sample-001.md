---
target: questions/exam-mas-i/masi-sample-001.md
created: 2026-10-04
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: high
- checks_run: blind recomputation from the question page before reading the solution page or vault file: Gamma(alpha=2, theta=1) = sum of two Exp(1); -ln 0.2 - ln 0.8 = 1.8326 (same with 1-U) -> D; CAS key D (PDF p.2) = vault answer D; stem and all five options diffed word for word against PDF p.1 text layer and page image (identical up to markup); explanation re-run line by line (theta = 2/2 = 1, alpha = 2; 1.6094 + 0.2231 = 1.833 in [1.5, 2.0)); explanation's quotations of CAS's solution and item note checked verbatim against PDF p.2; frontmatter (exam, learning_objective, points 2, wiki_link targets exist) checked; validate_content.py and question_lint.py clean; filing checked against 2026 outline
- sources_checked: CAS Exam MAS-I Sample Questions (as of 11/21/2017), Q1 and official solution, PDF pp.1-2, sha256:6f146ad2b2d0fd72746c551376572045246c317ae0ca8e189e3ffeffa79670de — https://www.casact.org/sites/default/files/2021-04/MASI_Sample_Questions.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), p.3 Domain A tasks 1-6 and p.6 text references (Ross Sections 4.1-4.8, 5.2.1-5.2.4, 5.3, 5.4.1, 5.4.2, 9.1-9.6, 11.1, 11.2.1, 11.2.2), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: On the 2026 MAS-I outline under Domain A: CAS's text reference Ross 11.2.1 (inverse transform, Example 11.3) is still on the reading list. CAS's second reference, Ross 11.3.2, is not among the 2026 Ross sections, but the question needs only 11.2.1 plus the gamma-as-sum-of-exponentials property, so the filing stands. Ross itself was not read (not freely available); the item-note paraphrase rests on CAS's own solution page.
