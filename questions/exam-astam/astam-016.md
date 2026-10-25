---
id: "astam-016"
exam: "Exam ASTAM"
topic: "Compound Poisson Process"
learning_objective: "Aggregate Models"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Compound+Poisson+Process
  - Concepts/Convolution
  - Concepts/Panjer+Recursion
  - Concepts/Stop-Loss+Reinsurance
  - Concepts/Aggregate+Loss+Model
  - Concepts/Probability
points: 0
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-25
  last_checked_by: agent:validate-v1
  content_hash: sha256:729506f2d5aac0444f9bb046a8f20e7a4e6a33e564cd478815ae063ed74d039c
  sources:
    - "SOA ASTAM Sample Questions (version of Feb. 23, 2026), Q16, p.21, sha256:0294cf4e8717191cda2747e7a6bb49fbb5e2d08f2d281ec979e670621de74ab4 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/questions/february-2024-astam-questions.pdf"
    - "SOA ASTAM Solutions to Sample Questions, Q16, pp.31-32, sha256:c4206394603cf205da0668d40333bee5aaa6e3dadcaa241fdb03e5488a1ba4e1 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/solutions/february-2024-astam-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-astam/astam-016.md
---

XYZ Insurer has two lines of insurance business with their aggregate claim payments denoted by $S_1$ and $S_2$, respectively.

- $S_1$ and $S_2$ are independent and both follow compound Poisson processes.
- $S_1$ has a Poisson primary distribution with mean $\lambda_1 = 2$ and severity probabilities 0.3 on a payment of 0 and 0.7 on a payment of 2.
- $S_2$ has a Poisson primary with mean $\lambda_2 = 1$ and severity probabilities 0.6 on a payment of 0 and 0.4 on a payment of 4.

## Part a

Use the convolution formula to derive the probability function for $S_1$.

### Explanation
Given that the aggregate payment amounts are multiples of 2, the probability function for $S_1$ can be written as $\Pr(S_1 = 2k)$, $k = 0, 1, 2, \ldots$

Using the convolution formula, we have

$$\Pr(S_1 = 2k) = \sum_{n=0}^{\infty} p_n \cdot f_X^{*n}(2k).$$

Note that $n$ convolutions of Bernoulli $X_1$ (i.e., sum of $n$ i.i.d. Bernoulli random variables) is a Binomial distribution with parameters $n$ and $p = 0.7$. Therefore,

$$\Pr(S_1 = 2k) = \sum_{n=0}^{\infty} p_n \cdot f_X^{*n}(2k) = \sum_{n=k}^{\infty} \frac{2^n}{n!} e^{-2} \cdot \binom{n}{k} 0.7^k 0.3^{n-k}.$$

The second equation starts with $n = k$ because there should be at least $k$ number of claims to achieve an aggregate payment of $2k$.

## Part b

Show that $S = S_1 + S_2$ is also a compound Poisson process. Identify the Poisson primary $\lambda$ and the secondary distribution.

### Explanation
Let $M_j(t)$ $(j = 1, 2)$ be the moment generating function (mgf) of the severity for $S_1$ and $S_2$, respectively: $M_1(t) = 0.3 + 0.7e^{2t}$ and $M_2(t) = 0.6 + 0.4e^{4t}$.

Then, the mgf for $S_j$ is

$$M_{S_j}(t) = P_{N_j}\left(M_j(t)\right) = \exp\left(\lambda_j\left(M_j(t) - 1\right)\right)$$

and the mgf for $S$ is given by

$$
\begin{align*}
M_S(t) &= \operatorname{E}\left[e^{tS}\right] \\
       &= M_{S_1}(t) \cdot M_{S_2}(t) \\
&= \exp\left(\lambda_1 M_1(t) + \lambda_2 M_2(t) - (\lambda_1 + \lambda_2)\right) \\
&= \exp\left(\lambda\left(M(t) - 1\right)\right),
\end{align*}
$$

where $\lambda = \lambda_1 + \lambda_2 = 3$ and $M(t) = \frac{2}{3}M_1(t) + \frac{1}{3}M_2(t) = 0.4 + \frac{1.4}{3}e^{2t} + \frac{0.4}{3}e^{4t}$.

Therefore, $S = S_1 + S_2$ is also a compound Poisson process with $\lambda = 3$ and a secondary distribution on 0, 2, 4 with probability 0.4, 1.4/3 and 0.4/3, respectively.

## Part c

Calculate the probability that the total claim payment amount from XYZ Insurer's all business is 4.

### Explanation
Let $g_k = \Pr(S = 2k)$ be the probability that the total claim payment amount of both lines be $2k$, for $k = 0, 1, 2, \ldots$ Also, denote the secondary distribution for $S$ as $f_j = \Pr(X = 2j)$, for $j = 0, 1, 2$.

Then,

$$g_0 = P_N(f_0) = \exp\left(\lambda(f_0 - 1)\right) = \exp\left(3(0.4 - 1)\right) = 0.165299.$$

For compound Poisson, the recursive formula is

$$g_k = \frac{\lambda}{k} \sum_{j=1}^{k \wedge 2} j f_j g_{k-j}, \qquad k = 1, 2, \ldots$$

where $j$ is capped at $k \wedge 2$ because maximum severity is 4 (or $j$ be 2). Therefore,

$$g_1 = \lambda f_1 g_0 = 3 \cdot \frac{1.4}{3} \cdot 0.165299 = 0.231418,$$

And

$$
\begin{align*}
g_2 = \Pr(S = 4) &= \frac{\lambda}{2}\left(f_1 g_1 + 2 f_2 g_0\right) \\
&= \frac{3}{2}\left(\frac{1.4}{3} \cdot 0.231418 + 2 \cdot \frac{0.4}{3} \cdot 0.165299\right) \\
&= 0.228113.
\end{align*}
$$

## Part d

XYZ Insurer is considering the purchase of stop-loss reinsurance, with an aggregate deductible of 4 on its entire business.

Determine the net stop-loss reinsurance premium.

### Explanation
The net stop-loss reinsurance premium satisfies

$$E\left[(S - d)_+\right] = E[S] - E[S \wedge d].$$

We determine each item on the right side of the equation. First,

$$E[S] = E[N] \cdot E[X] = 3\left(0.4 \cdot 0 + \frac{1.4}{3} \cdot 2 + \frac{0.4}{3} \cdot 4\right) = 4.4.$$

Second,

$$
\begin{align*}
E[S \wedge 4] &= 2\Pr(S = 2) + 4\Pr(S \ge 4) \\
&= 2g_1 + 4(1 - g_0 - g_1) \\
&= 2 \cdot 0.231418 + 4(1 - 0.165299 - 0.231418) \\
 &= 2.875968.
\end{align*}
$$

Finally, we have

$$E\left[(S - 4)_+\right] = E[S] - E[S \wedge 4] = 4.4 - 2.875968 = 1.524.$$
