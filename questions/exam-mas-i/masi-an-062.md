---
id: "masi-an-062"
exam: "Exam MAS-I"
topic: "Rao-Blackwell Theorem"
learning_objective: "Statistics"
difficulty: hard
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Rao-Blackwell+Theorem
  - Concepts/Poisson+Distribution
  - Concepts/Sufficient+Statistic
  - Concepts/Unbiasedness
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e83557bcfcb9cf2b8dfa9cb45c873a41adb6df0061cc194ae635a095b74806e6
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-062.md
---

Annual claim counts on four independent policies follow a Poisson distribution with unknown mean $\lambda$. The observed counts are:

$$
x_1 = 1, \quad x_2 = 0, \quad x_3 = 2, \quad x_4 = 1
$$

The quantity of interest is $P(N = 1) = \lambda e^{-\lambda}$, the probability that a policy has exactly one claim. An analyst starts from the unbiased estimator $W = \mathbf{1}\{X_1 = 1\}$ and improves it by conditioning on $Y = X_1 + X_2 + X_3 + X_4$.

Calculate the resulting estimate $E[W \mid Y]$ for these data.

- A) 0.3164
- B) 0.3679
- C) 0.4219
- D) 0.5000
- E) 1.0000

## Explanation

$Y = \sum X_i$ is sufficient for $\lambda$, with $Y \sim \text{Poisson}(4\lambda)$, and $X_2 + X_3 + X_4 \sim \text{Poisson}(3\lambda)$ is independent of $X_1$. For $y \ge 1$:

$$
\begin{align*}
E[W \mid Y = y] &= \frac{P(X_1 = 1)\,P(X_2 + X_3 + X_4 = y - 1)}{P(Y = y)} \\
&= \frac{\lambda e^{-\lambda} \cdot e^{-3\lambda}(3\lambda)^{y-1}/(y-1)!}{e^{-4\lambda}(4\lambda)^{y}/y!} \\
&= \frac{y \cdot 3^{\,y-1}}{4^{\,y}}
\end{align*}
$$

The $\lambda$s cancel, as sufficiency guarantees. Equivalently, given $Y = y$ the counts are multinomial with $y$ trials and equal cell probabilities $\tfrac{1}{4}$, so $X_1 \mid Y = y$ is binomial$(y, \tfrac{1}{4})$ and this is $P(X_1 = 1 \mid Y = y)$.

Here $y = 1 + 0 + 2 + 1 = 4$:

$$
E[W \mid Y = 4] = \frac{4 \cdot 27}{256} = 0.421875
$$

The estimate is **0.4219**, answer **C**. Since $Y$ is also complete, this is the UMVUE of $\lambda e^{-\lambda}$.

**Why not the others**

- **A** — $(3/4)^4 = 0.3164$ is the UMVUE of $e^{-\lambda}$, the claim-free probability: the right method aimed at the wrong target, $P(N = 0)$ instead of $P(N = 1)$.
- **B** — $\bar{x}e^{-\bar{x}} = 1 \cdot e^{-1} = 0.3679$ is the maximum likelihood plug-in. It is a function of $Y$, but it is biased, so it is not what conditioning an unbiased estimator produces.
- **D** — the proportion of policies with exactly one claim, 2 out of 4. It is unbiased, but it is not a function of $Y$ alone; conditioning it on $Y$ would also give 0.4219.
- **E** — the crude estimator $W$ itself, which equals 1 because policy 1 happened to have one claim; it has not been conditioned on anything.
