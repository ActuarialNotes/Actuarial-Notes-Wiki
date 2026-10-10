---
id: "masi-an-158"
exam: "Exam MAS-I"
topic: "Naive Bayes"
learning_objective: "Extended Linear Models"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Naive+Bayes
  - Concepts/Bayes+Theorem
answer: "C"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:59e0ef723761ad108f6ec5b0472d726e3fb2c6109ce16487bc99b0ee8556d571
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; CAS-hosted copy; MAS-I reading), §4.4 Generative Models for Classification, PDF pp.151-167 (logistic regression models Pr(Y=k|X=x) directly; QDA discriminant (4.28) quadratic in x incl. log pi_k, Kp(p+1)/2 covariance parameters PDF p.163; naive Bayes (4.29)-(4.30), qualitative predictor estimated by class proportions PDF pp.165-166), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-158.md
---

In an insurer's training data, 5% of claims are fraudulent. Within each class, the rates of three claim flags are:

| Flag | Fraud | Legitimate |
| :--- | ---: | ---: |
| Reported more than 30 days after the loss | 0.40 | 0.12 |
| Claimant made another claim in the past year | 0.35 | 0.15 |
| Police report filed | 0.30 | 0.70 |

A new claim was reported 45 days after the loss, the claimant made no other claim in the past year, and no police report was filed.

Using a naive Bayes classifier with all three flags, calculate the probability that the claim is fraudulent.

- A) Less than 0.10
- B) At least 0.10, but less than 0.20
- C) At least 0.20, but less than 0.30
- D) At least 0.30, but less than 0.50
- E) At least 0.50

## Explanation

Naive Bayes treats the flags as independent *within each class*, so each class's likelihood is a product. Flags that are absent contribute the complement of their rate: "no other claim" is 1 - 0.35 = 0.65 for fraud and 1 - 0.15 = 0.85 for legitimate claims, and "no police report" is 0.70 and 0.30.

$$
\begin{align*}
\text{Fraud} &: 0.05 \times 0.40 \times 0.65 \times 0.70 = 0.009100 \\
\text{Legitimate} &: 0.95 \times 0.12 \times 0.85 \times 0.30 = 0.029070
\end{align*}
$$

$$
\begin{align*}
P(\text{fraud} \mid \mathbf{x}) &= \frac{0.009100}{0.009100 + 0.029070} \\
&= 0.238
\end{align*}
$$

The answer is **C**. The claim's fraud probability is nearly five times the 5% base rate, though still below a 0.5 threshold.

**Why not the others**

- **A** — reports the numerator, 0.0091, without dividing by the sum over both classes; that product is a joint probability, not a posterior.
- **B** — uses the rates of the flags being *present* for the two absent flags (0.35, 0.15 and 0.30, 0.70), giving 0.149.
- **D** — reports the posterior odds, 0.009100/0.029070 = 0.313, instead of the probability.
- **E** — leaves out the priors, as if fraud and legitimate claims were equally common, giving 0.856.
