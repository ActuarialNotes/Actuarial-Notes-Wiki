---
id: "faml-5-01"
exam: "Exam FAM"
topic: "Life Annuity"
learning_objective: "Present Value Random Variables for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Life+Annuity
  - Concepts/Continuous+Annuity
  - Concepts/Future+Lifetime+Random+Variable
  - Concepts/Random+Variable
answer: "A"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:2c8bc6bb0e7a5086804b755eaccbba467f2893e29c6b1deefe75a7a291da8a65
  sources:
    - "SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q5.1, p.41 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Topics 7-10), Q5.1, p.27 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-5-01.md
---

You are given:

(i) $\delta_{t} = 0.06, \quad t \ge 0$

(ii) $\mu_{x}(t) = 0.01, \quad t \ge 0$

(iii) $Y$ is the present value random variable for a continuous annuity of 1 per year, payable for the lifetime of $(x)$ with 10 years certain

Calculate $\Pr(Y > \text{E}[Y])$.

[Question 21 on the Spring 2013 exam]

- A) 0.705
- B) 0.710
- C) 0.715
- D) 0.720
- E) 0.725

## Explanation

$$\begin{align*}
E(Y) &= \bar{a}_{\overline{10}|} + e^{-\delta(10)}e^{-\mu(10)}\bar{a}_{x+10} \\
&= \frac{\left(1 - e^{-0.6}\right)}{0.06} + e^{-0.7}\,\frac{1}{0.07} \\
&= 14.6139
\end{align*}$$

$$\begin{align*}
Y > E(Y) &\Rightarrow \left(\frac{1 - e^{-0.06T}}{0.06}\right) > 14.6139 \\
&\Rightarrow T > 34.90
\end{align*}$$

$$\begin{align*}
\Pr[Y > E(Y)] &= \Pr(T > 34.90) \\
&= e^{-34.90(0.01)} \\
&= 0.705
\end{align*}$$

The answer is **A**.
