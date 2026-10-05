---
target: questions/exam-mas-i/masi-sample-003.md
created: 2026-10-04
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: high
- checks_run: blind solve from the question page before reading the solution page or vault file: I true (k = n), II false (LOOCV has the higher variance), III false (the validation set approach overestimates more) -> A; CAS key A (PDF p.6) = vault answer A; stem, three statements and five options diffed word for word against PDF p.5 (identical up to markup and a straight vs curly apostrophe in E); CAS quotations verbatim against PDF p.6; every ISLR2 quotation and section number in the explanation located in ISLR2 (5.1.2 p.210, 5.1.3 p.212, 5.1.4 pp.214-215); validate_content.py and question_lint.py clean
- sources_checked: CAS Exam MAS-I Sample Questions (as of 11/21/2017), Q3 and official solution, PDF pp.5-6, sha256:6f146ad2b2d0fd72746c551376572045246c317ae0ca8e189e3ffeffa79670de — https://www.casact.org/sites/default/files/2021-04/MASI_Sample_Questions.pdf; James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021), s.5.1.2 PDF p.210 ('tends not to overestimate the test error rate as much as the validation set approach does'; training set 'typically around half the size'), s.5.1.3 PDF p.212 ('LOOCV is a special case of k-fold CV in which k is set to equal n'), s.5.1.4 PDF pp.214-215 (LOOCV has higher variance than k-fold CV with k < n; outputs highly (positively) correlated), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), p.5 Domain C tasks 1-9 and p.6 text references (James et al. Ch 1, 2 excl. 2.2.3, 3-7 as listed), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: On the 2026 MAS-I outline, Domain C: James Ch 5 (resampling methods) is listed in full. Cross-validation is not on MAS-II's 2026 James list.
