---
target: questions/exam-srm/srm-an-001.md
created: 2026-10-18
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T19:37Z/7805
- date: 2026-10-18
- status_set: verified
- confidence: high
- checks_run: blind recomputation of the key from the stem (I true, II false, III true -> C) before reading the answer; each statement checked against ISLR text; explanation's rationale per option checked; option distinctness; section citations checked against the PDF bookmark outline; syllabus scope
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer, 2021), §5.1.1 The Validation Set Approach, p.200 (PDF p.209); §5.1.2 LOOCV, pp.201-202 (PDF pp.210-211); §5.1.4 Bias-Variance Trade-Off for k-Fold CV, pp.205-206 (PDF pp.214-215), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; SOA Exam SRM syllabus, January 2027 (Basics of Statistical Learning; Linear Models obj. 7; Time Series Models obj. 1-2; readings ISLR Ch.2 §1-3, Ch.3 §1-6, Ch.5 §1; Frees Ch.8 §1-4, Ch.9 §1-5), sha256:2165c0dec2c26a810a100a504f6a38ac05f02348c1af26e4c8ad71b679eb56af — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-01-exam-srm-syllabus.pdf
- note: Key C confirmed. ISLR p.200: validation estimate 'can be highly variable' and 'may tend to overestimate the test error rate for the model fit on the entire data set' (III true). p.201-202: LOOCV 'will always yield the same results: there is no randomness in the training/validation set splits' (I true). p.205-206: 'LOOCV has higher variance than does k-fold CV with k < n' because its n fits are highly positively correlated (II false) - the explanation's reasoning is the book's. Citation 'James et al., §5.1' is correct (5.1 Cross-Validation, printed p.198). Within SRM 'Basics of Statistical Learning' obj. 4.
