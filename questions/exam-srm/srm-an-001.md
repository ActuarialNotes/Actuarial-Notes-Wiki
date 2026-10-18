---
id: "srm-an-001"
exam: "Exam SRM"
topic: "Model Validation"
learning_objective: "Basics of Statistical Learning"
difficulty: medium
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Model+Validation
  - Concepts/Cross-Validation
  - Concepts/Bias-Variance+Tradeoff
  - Concepts/Test+Error
answer: "C"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:80368b0891426ee882c92cc3f46aa6d783c11295dc5086074f656c6fd4962501
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer, 2021), §5.1.1 The Validation Set Approach, p.200 (PDF p.209); §5.1.2 LOOCV, pp.201-202 (PDF pp.210-211); §5.1.4 Bias-Variance Trade-Off for k-Fold CV, pp.205-206 (PDF pp.214-215), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "SOA Exam SRM syllabus, January 2027 (Basics of Statistical Learning; Linear Models obj. 7; Time Series Models obj. 1-2; readings ISLR Ch.2 §1-3, Ch.3 §1-6, Ch.5 §1; Frees Ch.8 §1-4, Ch.9 §1-5), sha256:2165c0dec2c26a810a100a504f6a38ac05f02348c1af26e4c8ad71b679eb56af — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-01-exam-srm-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-srm/srm-an-001.md
---

An actuary has 1,000 policy records and wants to estimate the test error of a claim frequency model before using it. She considers three resampling methods for model validation: the validation set approach (one random split into a training half and a validation half), leave-one-out cross-validation (LOOCV), and 10-fold cross-validation.

Determine which of the following statements are true.

- I. Repeating LOOCV on the same 1,000 records gives the same estimate every time, while the validation set estimate changes with the random split.
- II. Because each LOOCV fit uses 999 records, its estimate of the test error has a lower variance than the 10-fold cross-validation estimate.
- III. The validation set approach tends to overestimate the test error of the model fit to all 1,000 records.

- A) I only
- B) I and II only
- C) I and III only
- D) II and III only
- E) The answer is not given by (A), (B), (C), or (D)

## Explanation

The three methods differ in how the data are split and so in the bias and the variance of the test-error estimate they produce (James et al., §5.1).

**I is true.** LOOCV holds out each record once, so the $n = 1{,}000$ fits are fully determined by the data: there is no randomness in the splits, and repeating it gives the same number. The validation set approach depends on which records happen to fall in the validation half, so a different random split gives a different estimate, often a noticeably different one.

**II is false.** Training on 999 records makes LOOCV nearly *unbiased*, but not low-variance. Its 1,000 fitted models are trained on almost identical data, so their errors are highly positively correlated, and the mean of highly correlated quantities has a higher variance than the mean of less correlated ones. The 10-fold estimate averages 10 models whose training sets overlap less, so it has the lower variance (at the cost of a little more bias). This is the bias-variance trade-off between $k$-fold cross-validation and LOOCV.

**III is true.** The validation set approach fits the model to only 500 records. A model trained on fewer observations tends to perform worse, so its validation error tends to overstate the error of the model fit to all 1,000 records.

I and III are true, so the answer is **C**.

**Why not the others**

- **A** rejects III, missing that fitting to half the data biases the validation set estimate upward.
- **B** accepts II, mistaking LOOCV's low bias for low variance and ignoring the correlation among its nearly identical fits.
- **D** accepts II and rejects I; LOOCV involves no random split, so it cannot vary from one run to the next.
- **E** would require some other combination, but I and III are both true and II is false.
