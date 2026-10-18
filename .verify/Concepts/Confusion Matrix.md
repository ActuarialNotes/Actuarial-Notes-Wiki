---
target: Concepts/Confusion Matrix.md
created: 2026-10-18
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:05Z/f7a6
- date: 2026-10-18
- status_set: verified
- confidence: high
- checks_run: layout and every ratio against ISLR Tables 4.6-4.7, Salis Table 7 and Goldburd §7.3.1 (sensitivity, specificity, FPR = 1 − specificity); class-imbalance point against ISLR's null classifier p.148; threshold trade-off against ISLR pp.149-150 and Goldburd pp.92-94; example recomputed blind (TP 45, FP 45, FN 15, TN 895; 94.0%, 75.0%, 95.2%, 50.0%; flag-nothing accuracy 940/1000)
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted, §4.4.2 pp.148-152 (Tables 4.4-4.7, Fig. 4.8) and §8.1.2 pp.336-338 (eqs 8.6-8.7); §2.2 pp.30, 37 (test MSE, test error rate), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed., Chapter 7, §7.1-7.3.1 incl. fn 17, pp.75-85 (PDF pp.85-95), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; Salis, Measures of Predictive Accuracy, CAS Study Note for MAS-II (updated November 6, 2025), §§1-4, pp.1-12 (whole note), sha256:e952ace6ea6cdc1bea50ffcd81e53227de836e9e7b58a85bb13e86885f67a010 — https://www.casact.org/sites/default/files/2026-01/MAS-II_Measures_of_Predictive_Accuracy_Study_Note-1.pdf
- note: No findings. Notation: the page puts predicted class in rows and actual in columns, as ISLR Table 4.6 does (with + and − in the other order); Goldburd Table 13 and Salis Table 6 put actual in rows. Accuracy is 1 − Salis's error rate (FN + FP)/T.
