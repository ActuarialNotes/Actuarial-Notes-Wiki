---
id: "fams-038"
exam: "Exam FAM"
topic: "Limited Fluctuation Credibility"
learning_objective: "Introduction to Credibility"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Limited+Fluctuation+Credibility
  - Concepts/Full+Credibility+Standard
  - Concepts/Binomial+Distribution
answer: "B"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:56a9ced66b852618a9c40da2f9d6c297c2be5266c0093938b9c512e9440bc3ab
  sources:
    - "SOA Exam FAM-S sample questions (June 15, 2026), Q38, p.31, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM-S sample solutions (July 17, 2026), Q38, p.18, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-038.md
---

You are given:

(i) The number of claims has probability function:

$$p(x) = \binom{m}{x}q^x(1 - q)^{m - x}, \quad x = 0, 1, \ldots, m$$

(ii) The actual number of claims must be within 1% of the expected number of claims with probability 0.95.

(iii) The expected number of claims for full credibility is 34,574.

Calculate $q$.

- A) 0.05
- B) 0.10
- C) 0.20
- D) 0.40
- E) 0.80

## Explanation

Let $n$ be the number of observations. For full credibility,

$$\begin{align*}
n &= \left(\frac{1.96}{0.01}\right)^2 \frac{mq(1 - q)}{(mq)^2} \\
&= 38{,}416\,\frac{1 - q}{mq}
\end{align*}$$

The required expected number of claims is

$$\begin{align*}
nmq = 34{,}574 &= 38{,}416\,\frac{1 - q}{mq}\,mq \\
&= 38{,}416(1 - q)
\end{align*}$$

Then $q = 1 - 34{,}574/38{,}416 = 0.1$.

The answer is **B**.
