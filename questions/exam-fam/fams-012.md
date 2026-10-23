---
id: "fams-012"
exam: "Exam FAM"
topic: "Partial Credibility"
learning_objective: "Introduction to Credibility"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Partial+Credibility
  - Concepts/Limited+Fluctuation+Credibility
  - Concepts/Full+Credibility+Standard
  - Concepts/Aggregate+Loss+Model
  - Concepts/Credibility
answer: "C"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:dec3cd4b0614cfc3b5bb9fb52fe1d0e325b422aeb841c0f035ac2a394e7f1607
  sources:
    - "SOA Exam FAM-S sample questions (June 15, 2026), Q12, p.10, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM-S sample solutions (July 17, 2026), Q12, p.6, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-012.md
---

You are given the following information about a general liability book of business comprised of 2500 insureds:

(i) $X_i = \sum_{j=1}^{N_i} Y_{ij}$ is a random variable representing the annual loss of the $i$th insured.

(ii) $N_1, N_2, \ldots, N_{2500}$ are independent and identically distributed random variables following a negative binomial distribution with parameters $r = 2$ and $\beta = 0.2$.

(iii) $Y_{i1}, Y_{i2}, \ldots, Y_{iN_i}$ are independent and identically distributed random variables following a Pareto distribution with $\alpha = 3$ and $\theta = 1000$.

(iv) The full credibility standard is to be within 5% of the expected aggregate losses 90% of the time.

Calculate the partial credibility of the annual loss experience for this book of business using limited fluctuation credibility theory.

- A) 0.34
- B) 0.42
- C) 0.47
- D) 0.50
- E) 0.53

## Explanation

$$\begin{align*}
E(N) &= r\beta \\
&= 0.4 \\
Var(N) &= r\beta(1+\beta) \\
&= 0.48 \\
E(Y) &= \theta/(\alpha-1) \\
&= 500 \\
Var(Y) &= \frac{\theta^2\alpha}{(\alpha-1)^2(\alpha-2)} \\
&= 750{,}000
\end{align*}$$

Therefore,

$$\begin{align*}
E(X) &= 0.4(500) \\
&= 200 \\
Var(X) &= 0.4(750{,}000) + 0.48(500)^2 \\
&= 420{,}000
\end{align*}$$

The full credibility standard is

$$\begin{align*}
n &= \left(\frac{1.645}{0.05}\right)^2\frac{420{,}000}{200^2} \\
&= 11{,}365 \\
Z &= \sqrt{2{,}500/11{,}365} \\
&= 0.47
\end{align*}$$

The answer is **C**.
