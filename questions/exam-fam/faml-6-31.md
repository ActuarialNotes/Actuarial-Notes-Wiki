---
id: "faml-6-31"
exam: "Exam FAM"
topic: "Equivalence Principle"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Equivalence+Principle
  - Concepts/Whole+Life+Insurance
  - Concepts/Survival+Model
  - Concepts/Life+Annuity
answer: "D"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:f17c2678709a1efb30d0e1a54426a22dfe03854fb9439ddd67cb600784941d3c
  sources:
    - "SOA Exam FAM Sample Questions, Syllabus Topics 7-10 (August 18, 2026), Q6.31, p.75, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Syllabus Topics 7-10 (August 18, 2026), Q6.31, p.50, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-31.md
---

For a fully continuous whole life insurance policy of 100,000 on (35), you are given:

(i) The density function of the future lifetime of a newborn:

$$f(t) = \begin{cases} 0.01e^{-0.01t}, & 0 \le t < 70 \\ g(t), & t \ge 70 \end{cases}$$

(ii) $\delta = 0.05$

(iii) $\bar{A}_{70} = 0.51791$

Calculate the annual net premium rate for this policy.

[Question 10 on the Fall 2015 exam]

- A) 1000
- B) 1110
- C) 1220
- D) 1330
- E) 1440

## Explanation

$$\begin{align*}
\bar{A}_{35} &= \left(1 - e^{-35(\mu + \delta)}\right) \times \left(\frac{\mu}{\mu + \delta}\right) + e^{-35(\mu + \delta)}\bar{A}_{70} \\
&= 0.063421 + 0.146257 \\
&= 0.209679
\end{align*}$$

$$\begin{align*}
\bar{a}_{35} &= \frac{1 - \bar{A}_{35}}{\delta} \\
&= \frac{1 - 0.209679}{0.05} \\
&= 15.80642
\end{align*}$$

$$\begin{align*}
\bar{P}_{35} &= \frac{\bar{A}_{35}}{\bar{a}_{35}} \\
&= \frac{0.209679}{15.80642} \\
&= 0.0132654
\end{align*}$$

The annual net premium for this policy is therefore

$$\begin{align*}
100{,}000 \times 0.0132654 &= 1{,}326.54
\end{align*}$$

The answer is **D**.
