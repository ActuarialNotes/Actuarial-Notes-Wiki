---
id: "fams-052"
exam: "Exam FAM"
topic: "Maximum Likelihood Estimation"
learning_objective: "Parametric Estimation"
difficulty: hard
type: multiple-choice
wiki_link:
  - Concepts/Maximum+Likelihood+Estimation
  - Concepts/Censoring
answer: "E"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:85369ce1b58c562424e429687ba0ed86b3c2416a2c72fc797f6ef9236db0bfba
  sources:
    - "SOA Exam FAM-S sample questions (June 15, 2026), Q52, p.42, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM-S sample solutions (July 17, 2026), Q52, p.24, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-052.md
---

The random variable $X$ has survival function:

$$S_X(x) = \frac{\theta^4}{(\theta^2 + x^2)^2}$$

Two values of $X$ are observed to be 2 and 4.  One other value exceeds 4.

Calculate the maximum likelihood estimate of $\theta$.

- A) Less than 4.0
- B) At least 4.0, but less than 4.5
- C) At least 4.5, but less than 5.0
- D) At least 5.0, but less than 5.5
- E) At least 5.5

## Explanation

$$\begin{align*}
f(x) &= -S'(x) \\
&= \frac{4x\theta^4}{(\theta^2 + x^2)^3}
\end{align*}$$

$$\begin{align*}
L(\theta) &= f(2)f(4)S(4) \\
&= \frac{4(2)\theta^4}{(\theta^2 + 2^2)^3}\,\frac{4(4)\theta^4}{(\theta^2 + 4^2)^3}\,\frac{\theta^4}{(\theta^2 + 4^2)^2} \\
&= \frac{128\theta^{12}}{(\theta^2 + 4)^3(\theta^2 + 16)^5} \\
l(\theta) &= \ln 128 + 12\ln\theta - 3\ln(\theta^2 + 4) - 5\ln(\theta^2 + 16) \\
l'(\theta) &= \frac{12}{\theta} - \frac{6\theta}{\theta^2 + 4} - \frac{10\theta}{\theta^2 + 16} \\
&= 0
\end{align*}$$

$$12(\theta^4 + 20\theta^2 + 64) - 6(\theta^4 + 16\theta^2) - 10(\theta^4 + 4\theta^2) = 0$$

$$\begin{align*}
0 &= -4\theta^4 + 104\theta^2 + 768 \\
&= \theta^4 - 26\theta^2 - 192
\end{align*}$$

$$\begin{align*}
\theta^2 &= \frac{26 \pm \sqrt{26^2 + 4(192)}}{2} \\
&= 32 \\
\theta &= 5.657
\end{align*}$$

The answer is **E**.
