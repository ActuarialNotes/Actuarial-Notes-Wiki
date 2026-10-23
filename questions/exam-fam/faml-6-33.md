---
id: "faml-6-33"
exam: "Exam FAM"
topic: "Normal Approximation"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Normal+Approximation
  - Concepts/Pure+Endowment
  - Concepts/Future+Loss+Random+Variable
  - Concepts/Survival+Model
answer: "B"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:3ffb8268764a2b17655f323c86e568ed80e62652aac10e5808ad376152c7f84f
  sources:
    - "SOA Exam FAM Sample Questions, Syllabus Topics 7-10 (August 18, 2026), Q6.33, p.76, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Syllabus Topics 7-10 (August 18, 2026), Q6.33, p.51, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-33.md
---

An insurance company sells 15-year pure endowments of 10,000 to 500 lives, each age $x$, with independent future lifetimes. The single premium for each pure endowment is determined by the equivalence principle.

(i) You are given: (as printed)

(ii) $i = 0.03$

(iii) $\mu_{x}(t) = 0.02t, \quad t \ge 0$

(iv) $_{0}L$ is the aggregate loss at issue random variable for these pure endowments.

Using the normal approximation without continuity correction, calculate $\Pr\left({}_{0}L > 50{,}000\right)$.

[Question 12 on the Fall 2013 exam]

- A) 0.08
- B) 0.13
- C) 0.18
- D) 0.23
- E) 0.28

## Explanation

The probability that the endowment payment will be made for a given contract is:

$$\begin{align*}
{}_{15}p_{x} &= \exp\left(-\int_{0}^{15} 0.02t\,dt\right) \\
&= \exp\left(-0.01t^{2}\Big|_{0}^{15}\right) \\
&= \exp\left(-0.01(15)^{2}\right) \\
&= 0.1054
\end{align*}$$

Because the premium is set by the equivalence principle, we have $E\left[{}_{0}L\right] = 0.$ Further,

$$\begin{align*}
\text{Var}\left({}_{0}L\right) &= 500\left[\left(10{,}000v^{15}\right)^{2}\left({}_{15}p_{x}\right)\left(1 - {}_{15}p_{x}\right)\right] \\
&= 1{,}942{,}329{,}000
\end{align*}$$

Then, using the normal approximation, the approximate probability that the aggregate losses exceed 50,000 is

$$\begin{align*}
P\left({}_{0}L > 50{,}000\right) &= P\left(Z > \frac{50{,}000 - 0}{\sqrt{1{,}942{,}329{,}000}}\right) \\
&= P(Z > 1.13) \\
&= 0.13
\end{align*}$$

The answer is **B**.
