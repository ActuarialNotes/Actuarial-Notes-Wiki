---
id: "fams-018"
exam: "Exam FAM"
topic: "Aggregate Loss Model"
learning_objective: "Severity, Frequency, and Aggregate Models"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Aggregate+Loss+Model
  - Concepts/Normal+Approximation
  - Concepts/Coinsurance
  - Concepts/Poisson+Distribution
answer: "B"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:01c3f107f93501c1b2d61a4bb07fb8f41b0bf4ef15b27e6a65ee615d8b35bdcf
  sources:
    - "SOA Exam FAM-S sample questions (June 15, 2026), Q18, p.16, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM-S sample solutions (July 17, 2026), Q18, p.10, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-018.md
---

A towing company provides all towing services to members of the City Automobile Club. You are given:

| Towing Distance | Towing Cost | Frequency |
|---|---|---|
| 0-9.99 miles | 80 | 50% |
| 10-29.99 miles | 100 | 40% |
| 30+ miles | 160 | 10% |

(i) The automobile owner must pay 10% of the cost and the remainder is paid by the City Automobile Club.

(ii) The number of towings has a Poisson distribution with mean of 1000 per year.

(iii) The number of towings and the costs of individual towings are all mutually independent.

Calculate the probability that the City Automobile Club pays more than 90,000 in any given year using the normal approximation for the distribution of aggregate towing costs.

- A) 3%
- B) 10%
- C) 50%
- D) 90%
- E) 97%

## Explanation

First restate the table to be CAC's cost, after the 10% payment by the auto owner:

| Towing Cost, $x$ | $p(x)$ |
|---|---|
| 72 | 50% |
| 90 | 40% |
| 144 | 10% |

Then

$$\begin{align*}
E(X) &= 0.5(72) + 0.4(90) + 0.1(144) \\
&= 86.4 \\
E(X^2) &= 0.5(72^2) + 0.4(90^2) + 0.1(144^2) \\
&= 7905.6 \\
\text{Var}(X) &= 7905.6 - 86.4^2 \\
&= 440.64
\end{align*}$$

Because Poisson,

$$\begin{align*}
E(N) &= Var(N) = 1000 \\
E(S) &= E(X)E(N) \\
&= 86.4(1000) \\
&= 86{,}400 \\
\text{Var}(S) &= E(N)\text{Var}(X) + E(X)^2\text{Var}(N) \\
&= 1000(440.64) + 86.4^2(1000) \\
&= 7{,}905{,}600
\end{align*}$$

$$\begin{align*}
\Pr(S > 90{,}000) +\text{ (as printed)} \Pr\left(\frac{S - E(S)}{\sqrt{\text{Var}(S)}} > \frac{90{,}000 - 86{,}400}{\sqrt{7{,}905{,}600}}\right) &= \Pr(Z > 1.28) \\
&= 1 - \Phi(1.28) \\
&= 0.10
\end{align*}$$

Since the frequency is Poisson, you could also have used

$$\begin{align*}
\text{Var}(S) &= \lambda E(X^2) \\
&= 1000(7905.6) \\
&= 7{,}905{,}600
\end{align*}$$

That way, you would not need to have calculated Var($X$).

The answer is **B**.
