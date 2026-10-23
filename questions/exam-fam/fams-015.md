---
id: "fams-015"
exam: "Exam FAM"
topic: "Aggregate Loss Model"
learning_objective: "Severity, Frequency, and Aggregate Models"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Aggregate+Loss+Model
  - Concepts/Normal+Approximation
  - Concepts/Poisson+Distribution
answer: "C"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:fc4f3bda69c6c265c1dfde7d29f79c61ce884ded0eebbe2910b3579515ce6b84
  sources:
    - "SOA Exam FAM-S sample questions (June 15, 2026), Q15, p.13, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM-S sample solutions (July 17, 2026), Q15, p.8, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-015.md
---

Computer maintenance costs for a department are modeled as follows:

(i) The distribution of the number of maintenance calls each machine will need in a year is Poisson with mean 3.

(ii) The cost for a maintenance call has mean 80 and standard deviation 200.

(iii) The number of maintenance calls and the costs of the maintenance calls are all mutually independent.

The department must buy a maintenance contract to cover repairs if there is at least a 10% probability that aggregate maintenance costs in a given year will exceed 120% of the expected costs.

Calculate the minimum number of computers needed to avoid purchasing a maintenance contract using the normal approximation for the distribution of the aggregate maintenance costs.

- A) 80
- B) 90
- C) 100
- D) 110
- E) 120

## Explanation

Let $N$ = number of computers in department

Let $X$ = cost of a maintenance call

Let $S$ = aggregate cost

$$\begin{align*}
\text{Var}(X) &= [\text{Standard Deviation}(X)]^2 \\
&= 200^2 \\
&= 40{,}000 \\
E(X^2) &= \text{Var}(X) + [E(X)]^2 \\
&= 40{,}000 + 80^2 \\
&= 46{,}400 \\
E(S) &= N\lambda E(X) \\
&= N(3)(80) \\
&= 240N \\
\text{Var}(S) &= N\lambda \times E(X^2) \\
&= N(3)(46{,}400) \\
&= 139{,}200N
\end{align*}$$

We want

$$\begin{align*}
0.1 &\ge \Pr\big(S > 1.2E(S)\big) \\
&\ge \Pr\left(\frac{S - E(S)}{\sqrt{139{,}200N}} > \frac{0.2E(S)}{\sqrt{139{,}200N}}\right)
\end{align*}$$

$$\Rightarrow \frac{0.2(240)N}{373.1\sqrt{N}} \ge \Phi^{-1}(0.9) = 1.282$$

$$\begin{align*}
N &\ge \left(\frac{1.282(373.1)}{48}\right)^2 \\
&= 99.3
\end{align*}$$

The answer is **C**.
