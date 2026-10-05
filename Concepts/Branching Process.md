---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9505a12147b999911b18db085912b03c1d786947c861e2d5af277962229b51e1
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Branching Process.md
---

A **Branching Process** (Galton–Watson process) models a population in which each individual, by the end of its life, independently produces $j$ offspring with probability $P_j$. The size of generation $n$, $X_n$, is a [[Markov Chain]] on $\{0, 1, 2, \ldots\}$: it is the total offspring $Z_i$ of the $X_{n-1}$ members of the generation before.

> $$X_n = \sum_{i=1}^{X_{n-1}} Z_i$$

> $$E[X_n] = \mu^n$$

> $$\text{Var}(X_n) = \begin{cases} \sigma^2 \mu^{n-1} \dfrac{\mu^n - 1}{\mu - 1} & \mu \neq 1 \\[10pt] n\sigma^2 & \mu = 1 \end{cases}$$

> $$\pi_0 = \sum_{j=0}^{\infty} \pi_0^{\,j}\, P_j$$

- $\mu = \sum_j j P_j$ and $\sigma^2 = \sum_j (j - \mu)^2 P_j$ are the mean and variance of one individual's offspring, and the process starts from $X_0 = 1$. The mean follows from $E[X_n \mid X_{n-1}] = \mu X_{n-1}$; the variance from the [[Variance for Conditional and Marginal Distributions|law of total variance]] with $\text{Var}(X_n \mid X_{n-1}) = \sigma^2 X_{n-1}$.
- **Extinction probability.** $\pi_0$ is the probability that the population eventually dies out. Given $X_1 = j$, it dies out only if each of the $j$ independent family lines does, with probability $\pi_0^{\,j}$ — which gives the equation above. Its right side is the probability generating function of the offspring distribution, $\phi(s) = \sum_j P_j s^j$, so $\pi_0$ solves $\phi(s) = s$; $s = 1$ is always a root.
- **Certain extinction if and only if $\mu \leq 1$.** Leaving aside the trivial case $P_1 = 1$ (each individual exactly replaces itself), $\pi_0 = 1$ when $\mu \leq 1$. When $\mu > 1$, $\pi_0 < 1$ and it is the **smallest** root in $[0, 1]$ of $\pi_0 = \sum_j \pi_0^{\,j} P_j$. With at most two offspring ($P_2 > 0$) the roots are $1$ and $P_0/P_2$.
- **Several ancestors.** The lines descending from $k$ initial individuals are independent copies of the process, so the extinction probability is $\pi_0^{\,k}$, and the mean and variance of $X_n$ are $k$ times those above.
- **Extinction by generation $n$.** $d_n = P(X_n = 0)$ satisfies $d_n = \phi(d_{n-1})$ with $d_0 = 0$, and $d_n$ increases to $\pi_0$.
- State 0 is absorbing. If $P_0 > 0$, every other state is [[Recurrent and Transient States|transient]], so the population either dies out or grows without bound.

> [!example]- Identifying a Branching Process {Example}
> (CAS Exam MAS-I, Fall 2018, Q11, extended.) A new element lives one week and then evaporates, leaving 0, 1 or 2 offspring with probabilities 0.75, 0.20 and 0.05. Which process is this? Confirm that it dies out with certainty, and find the mean and variance of the second generation and the probability it is extinct by then, starting from one element.
>
> > [!answer]-
> > Each individual lives one generation and independently leaves a random number of offspring with a fixed distribution: a **branching process** — the CAS key's answer (A).
> >
> > The offspring mean and variance are
> > $$
> > \begin{align*}
> > \mu &= 0(0.75) + 1(0.20) + 2(0.05) \\
> > &= 0.30 \\
> > \sigma^2 &= 1(0.20) + 4(0.05) - 0.30^2 \\
> > &= 0.31
> > \end{align*}
> > $$
> > Since $\mu = 0.30 \leq 1$, $\pi_0 = 1$. (The roots of $\pi = 0.75 + 0.20\pi + 0.05\pi^2$ are $1$ and $P_0/P_2 = 15$; the only one in $[0, 1]$ is 1.) For generation 2:
> > $$
> > \begin{align*}
> > E[X_2] &= 0.30^2 \\
> > &= 0.09 \\
> > \text{Var}(X_2) &= 0.31(0.30)\frac{0.09 - 1}{0.30 - 1} \\
> > &= 0.1209
> > \end{align*}
> > $$
> > Extinct by generation 2: $d_1 = P_0 = 0.75$, then
> > $$
> > \begin{align*}
> > d_2 &= 0.75 + 0.20(0.75) + 0.05(0.75)^2 \\
> > &= 0.9281
> > \end{align*}
> > $$

> [!example]- Will a Cyber Contagion Burn Out? {Example}
> A malware strain spreads through an insurer's book of cyber policies. Each compromised firm, before it is cleaned up, infects 0, 1 or 2 new firms with probabilities 0.3, 0.3 and 0.4, independently. Three firms are compromised today. Find the probability the outbreak eventually dies out, and the mean and standard deviation of the number compromised in the fifth generation.
>
> > [!answer]-
> > $\mu = 0.3 + 2(0.4) = 1.1 > 1$, so extinction is not certain. Solve $\pi = 0.3 + 0.3\pi + 0.4\pi^2$:
> > $$
> > \begin{align*}
> > 0.4\pi^2 - 0.7\pi + 0.3 &= 0 \\
> > \pi &= \frac{0.7 \pm 0.1}{0.8}
> > \end{align*}
> > $$
> > The roots are 1 and 0.75 ($= P_0/P_2$); the smallest, $\pi_0 = 0.75$, is the extinction probability for one line. Three independent lines all die out with probability
> > $$
> > \begin{align*}
> > \pi_0^{\,3} &= 0.75^3 \\
> > &= 0.4219
> > \end{align*}
> > $$
> > For the fifth generation, $\sigma^2 = 0.3 + 4(0.4) - 1.1^2 = 0.69$. From one firm,
> > $$
> > \begin{align*}
> > E[X_5] &= 1.1^5 \\
> > &= 1.6105 \\
> > \text{Var}(X_5) &= 0.69(1.1)^4 \frac{1.1^5 - 1}{0.1} \\
> > &= 0.69(1.4641)(6.1051) \\
> > &= 6.1675
> > \end{align*}
> > $$
> > Three independent lines triple both: mean $4.83$ firms, variance $18.50$, standard deviation $4.30$. The mean says the outbreak grows, yet there is a 42% chance it dies out — the mean alone is a poor guide to a branching process.
