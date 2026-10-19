---
id: "fams-021"
exam: "Exam FAM"
topic: "Aggregate Loss Model"
learning_objective: "Severity, Frequency, and Aggregate Models"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Aggregate+Loss+Model
  - Concepts/Normal+Approximation
answer: "E"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:1eee551c14061151e3e23fd68cfc4351951a3fc292253046f634277f08e27900
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-021.md
---

At the beginning of each round of a game of chance the player pays 12.5. The player then rolls one die with outcome $N$. The player then rolls $N$ dice and wins an amount equal to the total of the numbers showing on the $N$ dice. All dice have 6 sides and are fair.

Calculate the probability that a player starting with 15,000 will have at least 15,000 after 1000 rounds using the normal approximation.

- A) 0.01
- B) 0.04
- C) 0.06
- D) 0.09
- E) 0.12

## Explanation

In each round,

$N$ = result of first roll, to see how many dice you will roll

$X$ = result of for one of the $N$ dice you roll

$S$ = sum of $X$ for the $N$ dice

$$\begin{align*}
E(X) &= E(N) = 3.5 \\
Var(X) &= Var(N) = 2.9167 \\
E(S) &= E(N)E(X) \\
&= 12.25 \\
Var(S) &= E(N)Var(X) + Var(N)E(X)^2 \\
&= 3.5(2.9167) + 2.9167(3.5)^2 \\
&= 45.938
\end{align*}$$

Let $S_{1000}$ the sum of the winnings after 1000 rounds

$$\begin{align*}
E(S_{1000}) &= 1000(12.25) \\
&= 12{,}250 \\
SD(S_{1000}) &= \sqrt{1000(45.938)} \\
&= 214.33
\end{align*}$$

After 1000 rounds, you have your initial 15,000, less payments of 12,500, plus winnings for a total of $2{,}500 + S_{1000}$. Since actual possible outcomes are discrete, the solution tests for continuous outcomes greater than 15000-0.5. In this problem, that continuity correction has negligible impact.

$$\begin{align*}
\Pr(2{,}500 + S_{1000} > 14{,}999.5) &= \Pr(S_{1000} > 12{,}499.5) \\
&\approx \Pr\left(Z > \frac{12{,}499.5 - 12{,}250}{214.33} = 1.17\right) \\
&= 0.12
\end{align*}$$

The answer is **E**.
