---
id: "fams-082"
exam: "Exam FAM"
topic: "Loss Elimination Ratio"
learning_objective: "Short-Term Insurance and Reinsurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Loss+Elimination+Ratio
  - Concepts/Exponential+Distribution
  - Concepts/Lognormal+Distribution
  - Concepts/Inflation
answer: "A"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:93885d26c78498ef1e12d7395ffbcbcfe44925a145e3ebf5974fb5d640b0e37d
  sources:
    - "SOA Exam FAM Sample Questions, Syllabus Topics 1-6 (June 15, 2026), Q82, p.64, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Syllabus Topics 1-6 (July 17, 2026), Q82, p.33, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-082.md
---

For a medical insurance company, you are given:

i) Losses for a new product are assumed to follow a lognormal distribution with parameters $\mu = 6$ and $\sigma = 1.5$.

ii) The new product has a per-loss deductible that results in a loss elimination ratio of 0.33.

In a review of the business after five years of experience, it is determined that:

i) Losses for this product actually followed an exponential distribution.

ii) The initial mean for the exponential distribution is the same as the initial mean under the lognormal assumption.

iii) Since it was introduced, the expected value of a loss for this product increased at an annual compound rate of 4%.

iv) The per-loss deductible required to target the same loss elimination ratio is $d$.

Calculate $d$.

- A) 605
- B) 659
- C) 722
- D) 775
- E) 852

## Explanation

Under the initial assumptions, losses, $X$, have

$$\begin{align*}
E(X) &= \exp\left(6 + \frac{1.5^2}{2}\right) \\
&= 1242.65
\end{align*}$$

After 5 years: exponential distribution with mean $1242.65(1.04^5) = 1511.87$ and LER = 0.33, so:

$$\begin{align*}
0.33 &= \frac{E(Y \wedge d)}{E(Y)} \\
&= \frac{\theta\left(1 - e^{-d/\theta}\right)}{\theta} \\
&= 1 - e^{-d/1511.87} \\
\Rightarrow d &= -1511.87\ln(1 - 0.33) \\
&= 605.47
\end{align*}$$

The answer is **A**.
