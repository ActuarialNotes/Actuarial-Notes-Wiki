---
id: "fams-028"
exam: "Exam FAM"
topic: "Aggregate Loss Model"
learning_objective: "Severity, Frequency, and Aggregate Models"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Aggregate+Loss+Model
  - Concepts/Normal+Approximation
  - Concepts/Variance
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9ff65c938964b3ed76e4374b029f12a765c52474b0a8de8c548706e5c62b3e1b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-028.md
---

A dam is proposed for a river that is currently used for salmon breeding.  You have modeled:

(i) For each hour the dam is opened the number of salmon that will pass through and reach the breeding grounds has a distribution with mean 100 and variance 900.

(ii) The number of eggs released by each salmon has a distribution with mean 5 and variance 5.

(iii) The number of salmon going through the dam each hour it is open and the numbers of eggs released by the salmon are independent.

Calculate the least number of whole hours the dam should be left open so the probability that 10,000 eggs will be released is greater than 95% using the normal approximation for the aggregate number of eggs released.

- A) 20
- B) 23
- C) 26
- D) 29
- E) 32

## Explanation

Let $N$ = number of salmon in $t$ hours, $X$ = eggs from one salmon, and $S$ = total eggs. Then $E(N) = 100t$ and $Var(N) = 900t$.

$$\begin{align*}
E(S) &= E(N)E(X) \\
&= (100t)(5) \\
&= 500t \\
Var(S) &= E(N)Var(X) + E(X)^2 Var(N) \\
&= (100t)(5) + (5^2)(900t) \\
&= 23{,}000t
\end{align*}$$

$$0.95 < \Pr(S > 10{,}000) = \Pr\left(Z > \frac{10{,}000 - 500t}{\sqrt{23{,}000t}}\right) \Rightarrow \frac{10{,}000 - 500t}{\sqrt{23{,}000t}} = -1.645$$

$$\begin{align*}
10{,}000 - 500t &= -1.645(151.66)\sqrt{t} \\
&= -249.48\sqrt{t}
\end{align*}$$

$$500t - 249.48\sqrt{t} - 10{,}000 = 0$$

$$\begin{align*}
\sqrt{t} &= \frac{249.48 \pm \sqrt{(-249.48)^2 - 4(500)(-10{,}000)}}{2(500)} \\
&= 4.73 \\
t &= 22.26
\end{align*}$$

Round up to 23. The answer is **B**.
