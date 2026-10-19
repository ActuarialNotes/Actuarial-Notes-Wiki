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
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:56a9ced66b852618a9c40da2f9d6c297c2be5266c0093938b9c512e9440bc3ab
  sources: []
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
