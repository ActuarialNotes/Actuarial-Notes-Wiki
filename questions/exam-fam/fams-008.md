---
id: "fams-008"
exam: "Exam FAM"
topic: "Limited Fluctuation Credibility"
learning_objective: "Introduction to Credibility"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Limited+Fluctuation+Credibility
  - Concepts/Full+Credibility+Standard
  - Concepts/Negative+Binomial+Distribution
  - Concepts/Aggregate+Loss+Model
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:392127480568f0dd64c0db3f4b2b73fdc09b264b68272987d7c200ab4d0cf684
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-008.md
---

You are given the following information about a commercial auto liability book of business:

(i) Each insured's claim count has a Poisson distribution with mean $\lambda$, where $\lambda$ has a gamma distribution with $\alpha = 1.5$ and $\theta = 0.2$.

(ii) Individual claim size amounts are independent and exponentially distributed with mean 5000.

(iii) The full credibility standard is for aggregate losses to be within 5% of the expected with probability 0.90.

Calculate the expected number of claims required for full credibility using limited fluctuated credibility.

- A) 2165
- B) 2381
- C) 3514
- D) 7216
- E) 7938

## Explanation

$X$ is the random sum $Y_1 + Y_2 + \cdots + Y_N$.

$N$ has a negative binomial distribution with $r = a = 1.5$ and $\beta = \theta = 0.2$.

$$\begin{align*}
E(N) &= r\beta \\
&= 0.3 \\
Var(N) &= r\beta(1+\beta) \\
&= 0.36 \\
E(Y) &= 5{,}000 \\
Var(Y) &= 25{,}000{,}000 \\
E(X) &= 0.3(5{,}000) \\
&= 1{,}500 \\
Var(X) &= 0.3(25{,}000{,}000) + 0.36(25{,}000{,}000) \\
&= 16{,}500{,}000
\end{align*}$$

Number of exposures (insureds) required for full credibility

$$\begin{align*}
n_{FULL} &= (1.645/0.05)^2(16{,}500{,}000/1{,}500^2) \\
&= 7{,}937.67
\end{align*}$$

Number of expected claims required for full credibility

$$\begin{align*}
E(N)n_{FULL} &= 0.3(7{,}937.67) \\
&= 2{,}381
\end{align*}$$

The answer is **B**.
