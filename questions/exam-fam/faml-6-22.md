---
id: "faml-6-22"
exam: "Exam FAM"
topic: "Equivalence Principle"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Equivalence+Principle
  - Concepts/Whole+Life+Insurance
  - Concepts/Fractional+Age+Assumption
  - Concepts/Life+Annuity
answer: "C"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:e755c25b540be86f7a680cba73b69611c9e36326c12cce4d1127fbfea160c188
  sources:
    - "SOA Exam FAM-L Sample Questions (Oct 2024), Q6.22, p.66, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Oct 2024), Q6.22, p.45, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
    - "SOA Exam FAM Tables (Oct 2024), Standard Ultimate Life Table pp.20-21, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-22.md
---

For a whole life insurance of 100,000 on (45) with premiums payable monthly for a period of 20 years, you are given:

(i) The death benefit is paid immediately upon death

(ii) Mortality follows the Standard Ultimate Life Table

(iii) Deaths are uniformly distributed over each year of age

(iv) $i = 0.05$

Calculate the monthly net premium.

[A modified version of Question 10 on the Fall 2014 exam]

- A) 98
- B) 100
- C) 102
- D) 104
- E) 106

## Explanation

Let the monthly net premium $= \pi$

$$12\pi = \frac{100{,}000\,\bar{A}_{45}}{\ddot{a}^{(12)}_{45:\overline{20}|}}$$

where $\alpha(12) = 1.00020$, $\beta(12) = 0.46651$ and $\dfrac{i}{\delta} = 1.02480$.

$$\begin{align*}
100{,}000\,\bar{A}_{45} &= 100{,}000\,\frac{i}{\delta}A_{45} \\
&= (1.02480)(15{,}161) \\
&= 15{,}536.99
\end{align*}$$

$$\begin{align*}
\ddot{a}^{(12)}_{45:\overline{20}|} &= \alpha(12)\,\ddot{a}_{45:\overline{20}|} - \beta(12)\left(1 - {}_{20}E_{45}\right) \\
&= 1.00020\left[12.9391\right] - 0.46651(1 - 0.35994) \\
&= 12.6431
\end{align*}$$

$$\begin{align*}
12\pi &= \frac{15{,}536.99}{12.6431} \\
12\pi &= 1228.891 \\
\pi &= 102.41
\end{align*}$$

The answer is **C**.
