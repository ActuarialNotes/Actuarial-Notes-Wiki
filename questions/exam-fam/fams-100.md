---
id: "fams-100"
exam: "Exam FAM"
topic: "Binomial Option Pricing Model"
learning_objective: "Option Pricing Fundamentals"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Binomial+Option+Pricing+Model
  - Concepts/Risk-Neutral+Valuation
  - Concepts/European+Option
answer: "A"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:f48f091e79d4e4958507ffb9e896508eb8dfa3a22b105fc6812577a448ede650
  sources:
    - "SOA Exam FAM Sample Questions, Syllabus Topics 1-6 (June 15, 2026), Q100, p.82, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Syllabus Topics 1-6 (July 17, 2026), Q100, p.39, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-100.md
---

A non-dividend paying stock has a current price of $S$. The continuously compounded risk-free interest rate is 2.75%.

The price of the stock over a six-month period follows a binomial model with $u = 1.2903$ and $d = 0.7966$. A six-month European put option on the stock with a strike price of $(S - 4.50)$ has a price of 2.482.

Calculate $S$.

- A) 44.22
- B) 45.72
- C) 46.97
- D) 49.11
- E) 50.24

## Explanation

The risk-neutral probability of an increase is:

$$\begin{align*}
1 - q &= \frac{e^{(0.0275)(0.5)} - d}{u - d} \\
&= 0.44003
\end{align*}$$

Then:

$$\begin{align*}
2.482 &= e^{(-0.0275)(0.5)}\left((1 - q) \times 0 + q \times (S - 4.5 - 0.7966S)\right) \\
\Rightarrow S &= 44.22
\end{align*}$$

The answer is **A**.
