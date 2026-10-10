---
id: "discda-an-225"
exam: "Exam DISC-DA"
topic: "Linear Regression"
learning_objective: "8. Basic Data Analysis"
difficulty: easy
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Linear+Regression
answer: "B"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:79a8625b295e2a1dce7c53d29c535c16cd57b7a22a0a6ca46306dd87b13f4699
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021, CAS-hosted copy), §3.2 PDF p.82, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-225.md
---

A linear model for auto physical damage severity is fitted as

$$\hat{y} = 1{,}200 + 85\,x_1 - 40\,x_2$$

where $x_1$ is the vehicle's value in thousands of dollars and $x_2$ is the driver's years of experience. What is the predicted severity for a \$20,000 vehicle driven by someone with 10 years of experience?

- A) 1,300
- B) 2,500
- C) 2,900
- D) 3,300

## Explanation

Substitute $x_1 = 20$ (thousands) and $x_2 = 10$:

$$
\begin{align*}
\hat{y} &= 1{,}200 + 85(20) - 40(10) \\
&= 1{,}200 + 1{,}700 - 400 \\
&= 2{,}500
\end{align*}
$$

Each additional \$1,000 of vehicle value adds \$85 to the predicted severity and each year of experience subtracts \$40, holding the other predictor fixed. The answer is **B**.

**Why not the others**

- **A** — 1,300 leaves out the intercept of 1,200.
- **C** — 2,900 leaves out the experience term.
- **D** — 3,300 adds the experience term instead of subtracting it.
