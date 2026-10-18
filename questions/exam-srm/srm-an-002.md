---
id: "srm-an-002"
exam: "Exam SRM"
topic: "Train-Test Split"
learning_objective: "Basics of Statistical Learning"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Train-Test+Split
  - Concepts/Test+Error
  - Concepts/Overfitting
  - Concepts/Polynomial+Regression
  - Concepts/Bias-Variance+Tradeoff
answer: "E"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:95220d9760a61f697caa44741ab8b2195ea064eb7602390532edc62ce644d5bd
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer, 2021), §2.2.1 Measuring the Quality of Fit, pp.31-32 (PDF pp.42-43); §5.1.1, pp.198-200 (PDF pp.207-209), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "SOA Exam SRM syllabus, January 2027 (Basics of Statistical Learning; Linear Models obj. 7; Time Series Models obj. 1-2; readings ISLR Ch.2 §1-3, Ch.3 §1-6, Ch.5 §1; Frees Ch.8 §1-4, Ch.9 §1-5), sha256:2165c0dec2c26a810a100a504f6a38ac05f02348c1af26e4c8ad71b679eb56af — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-01-exam-srm-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-srm/srm-an-002.md
---

An actuary randomly splits 500 claim records into a training set of 250 and a held-out test set of 250. She fits polynomial regressions of claim severity on driver age, of degree 1, 2, 3, 5 and 8, to the training set, and computes each model's mean squared error (MSE) on both sets:

| Degree | Training MSE | Test MSE |
|---|---|---|
| 1 | 41.2 | 43.0 |
| 2 | 30.5 | 32.8 |
| 3 | 24.9 | 27.1 |
| 5 | 23.6 | 28.4 |
| 8 | 21.8 | 33.9 |

Which conclusion about the choice of degree is best supported?

- A) Degree 8 should be chosen, because it has the lowest training MSE of the five models
- B) Degree 1 should be chosen, because its test MSE is closest to its training MSE
- C) Degree 3 should be rejected, because a test MSE above the training MSE shows it overfits
- D) No degree can be chosen yet, because the training MSE has not stopped falling
- E) Degree 3 should be chosen, because above it the test MSE rises as the fit chases noise

## Explanation

The training MSE measures how closely a model follows the data it was fit to, and it falls every time flexibility is added: 41.2, 30.5, 24.9, 23.6, 21.8. The test MSE measures prediction on records the fit never saw, and it traces a U-shape, falling to a minimum and then rising (James et al., §2.2.1 and §5.1.1):

$$
43.0 \;\to\; 32.8 \;\to\; \mathbf{27.1} \;\to\; 28.4 \;\to\; 33.9
$$

Up to degree 3 the extra terms capture real curvature in severity by age, so both errors fall. Beyond degree 3 the training MSE keeps falling while the test MSE rises: the extra terms are fitting noise peculiar to the 250 training records, which is overfitting. The degree with the lowest test MSE, **degree 3**, is the best supported choice. The answer is **E**.

**Why not the others**

- **A** judges by training error, which always improves with flexibility and so would always pick the most flexible model; degree 8 has the *worst* test MSE apart from degree 1.
- **B** treats a small gap between test and training MSE as the goal. Degree 1 has the smallest gap only because it fits poorly on both sets (it underfits); the aim is low test error, not a small gap.
- **C** reads test MSE above training MSE as a sign of overfitting. Almost every model does worse on new data than on the data it was fit to, so the test MSE is expected to exceed the training MSE at every degree; overfitting shows as the test MSE *rising* while the training MSE falls.
- **D** waits for the training MSE to level off, but training MSE keeps falling as terms are added and says nothing about prediction; the test MSE already shows its minimum.
