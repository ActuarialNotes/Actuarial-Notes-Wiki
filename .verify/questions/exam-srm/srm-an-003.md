---
target: questions/exam-srm/srm-an-003.md
created: 2026-10-18
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T19:37Z/7805
- date: 2026-10-18
- status_set: verified
- confidence: high
- checks_run: blind recomputation: distances 3.6/2.6/0.6/0.4/2.4/4.4, nearest three x=5,4,7, mean 15.5/3 = 5.1667 -> B; OLS line recomputed from the data (Sxx 45.333, Sxy -28.1, slope -0.61985, intercept 8.4926) so the stem's stated line is right; every distractor reproduced (5.00 K=1, 5.55 K=2, 5.64 OLS at 4.6, 6.10 wrong third neighbour); option distinctness; citation against PDF outline; syllabus scope
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer, 2021), §3.5 Comparison of Linear Regression with K-Nearest Neighbors, KNN regression definition (3.39), p.105 (PDF p.115), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; SOA Exam SRM syllabus, January 2027 (Basics of Statistical Learning; Linear Models obj. 7; Time Series Models obj. 1-2; readings ISLR Ch.2 §1-3, Ch.3 §1-6, Ch.5 §1; Frees Ch.8 §1-4, Ch.9 §1-5), sha256:2165c0dec2c26a810a100a504f6a38ac05f02348c1af26e4c8ad71b679eb56af — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-01-exam-srm-syllabus.pdf
- note: Key B (5.17) confirmed by recomputation (rank 5) and the method checked against ISLR §3.5 p.105: 'KNN regression first identifies the K training observations that are closest to x0, represented by N0. It then estimates f(x0) using the average of all the training responses in N0.' Citation §3.5 is correct. Within SRM 'Linear Models' obj. 7 (K-nearest neighbors). The numbers are the vault's own; no official solution exists for an original question, so the bar here is the source's method plus independent arithmetic.
