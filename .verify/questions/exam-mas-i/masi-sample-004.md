---
target: questions/exam-mas-i/masi-sample-004.md
created: 2026-10-04
---

## [C-001] Option A gap is CAS's own misprint, transcribed faithfully
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- locus: options A-B
- note: CAS Exam MAS-I Sample Questions (as of 11/21/2017), Q4, PDF p.7 (sha256:6f146ad2b2d0fd72746c551376572045246c317ae0ca8e189e3ffeffa79670de) prints option A as 'Less than 5' and option B as 'At least 15, but less than 25', so no option covers [5, 15). The vault transcribes both bounds exactly as printed, and its explanation says so. This is a defect in CAS's paper, not in the vault: the keyed total (11+11+11+14 = 47, option E, per CAS's solution on PDF p.8) is far outside the gap. Leave option A as printed; do not 'correct' it to 'Less than 15', which would make the vault disagree with the source.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: high
- checks_run: blind recomputation from the question page before reading the solution page or vault file: K + d + 1 per model = 11 + 11 + 11 + 14 = 47 -> E; CAS key E (PDF p.8) = vault answer E; table (4 rows x 2 values, both column headings) and all five options diffed against PDF p.7 text layer and page image (identical, including CAS's 'Less than 5' option A, logged as a comment); explanation arithmetic re-run; CAS's coefficient formula quoted verbatim from PDF p.8; ISLR2 7.4.3 quotation located on PDF p.305 under the 7.4.3 heading; the degree-d generalisation (d powers + K truncated power functions + intercept) is correct and reproduces CAS's formula; validate_content.py and question_lint.py clean
- sources_checked: CAS Exam MAS-I Sample Questions (as of 11/21/2017), Q4 and official solution, PDF pp.7-8, sha256:6f146ad2b2d0fd72746c551376572045246c317ae0ca8e189e3ffeffa79670de — https://www.casact.org/sites/default/files/2021-04/MASI_Sample_Questions.pdf; James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021), s.7.4.3 The Spline Basis Representation, PDF p.305: cubic spline with K knots = least squares on an intercept and 3 + K predictors, 'a total of K + 4 regression coefficients', sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), p.5 Domain C tasks 1-9 and p.6 text references (James et al. Ch 1, 2 excl. 2.2.3, 3-7 as listed), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: On the 2026 MAS-I outline, Domain C: regression splines are James 7.4 (Ch 7 listed in full). The tagging (topic 'Statistical Learning', wiki_link Statistical Learning + Linear Regression) matches the bank's other spline questions; the vault has no splines concept page to link instead.

## [F-001] wiki_link/topic misses the specific concept page Regression Spline
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- severity: minor
- status: open
- locus: frontmatter: topic/wiki_link
- claim: topic: "Statistical Learning"; wiki_link: Concepts/Statistical+Learning, Concepts/Linear+Regression.
- evidence: The question counts the regression coefficients of four regression splines (CAS MAS-I Sample Questions, Q4, PDF p.7; CAS solution PDF p.8 classifies it 'C.4.i – Piecewise Linear and Smoothing Splines', text reference James et al. p.273) — ISLR2 §7.4.3, p.297 (PDF p.305), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf. Concepts/Regression Spline.md now exists and gives the K+4 coefficient count; Concepts/Statistical Learning.md is a MAS-II-oriented overview page.
- source_rank: 2
- proposed_action: Set topic: "Regression Spline"; wiki_link: Regression Spline, Linear Regression (replacing Statistical Learning).
- applied: true
- fingerprint: fca36eff182c

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: Applied: topic -> "Regression Spline"; wiki_link Concepts/Statistical+Learning -> Concepts/Regression+Spline (Linear Regression kept). Basis: ISLR2 §7.4.3 (PDF p.305), re-read this session, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; CAS's own classification on the solution page (MASI_Sample_Questions.pdf PDF p.8).

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: high
- checks_run: re-pass after retag: stem table (knots 6/5/8/10, degrees 4/5/2/3) and options A-E (incl. CAS's printed 'Less than 5') re-read against the PDF text layer p.7 — identical; explanation follows CAS's solution p.8 (degree + knots + intercept: 11 + 11 + 11 + 14 = 47 -> E), recomputed; key E = CAS key E (p.8); new tags resolve; validate_content.py and question_lint.py clean
- sources_checked: CAS Exam MAS-I Sample Questions (as of 11/21/2017), Q4, PDF p.7; solution and key E PDF p.8, sha256:6f146ad2b2d0fd72746c551376572045246c317ae0ca8e189e3ffeffa79670de — https://www.casact.org/sites/default/files/2021-04/MASI_Sample_Questions.pdf; James, Witten, Hastie & Tibshirani, ISLR 2nd ed. (Springer 2021; CAS-hosted copy, MAS-I reading), §7.4 Regression Splines: piecewise cubic with one knot uses eight degrees of freedom, each constraint frees one (p.295-296, PDF pp.303-304); cubic spline with K knots uses K+4 degrees of freedom via intercept + X, X^2, X^3 + one truncated power per knot (p.297, PDF p.305); natural spline = regression spline required to be linear beyond the boundary knots (p.298, PDF p.306), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C readings: James et al. Chapters 1, 2 (excl. 2.2.3), 3, 4, 5, 6, 7 (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
