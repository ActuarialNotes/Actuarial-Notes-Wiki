---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:9505a12147b999911b18db085912b03c1d786947c861e2d5af277962229b51e1
  sources:
    - "Ross, Introduction to Probability Models, Ch 4 'Markov Chains' (an earlier edition than the 12th ed. the 2026 MAS-I outline assigns; course-hosted copy on the NTNU TMA4265 page, printed pp.185-280, PDF p.n = printed p.184+n), §4.7 Branching Processes pp.233-236 (PDF pp.49-52): offspring distribution P_j with P_j < 1 for all j, X_n a Markov chain, state 0 recurrent and all others transient when P0 > 0 (die out or converge to infinity), mu and sigma^2, X_0 = 1, X_n = sum_{i=1}^{X_{n-1}} Z_i, E[X_n] = mu^n, Var(X_n | X_{n-1}) = X_{n-1} sigma^2 and Eq. (4.19) Var(X_n) = sigma^2 mu^(n-1)(1-mu^n)/(1-mu) for mu != 1, n sigma^2 for mu = 1, pi_0 = 1 if mu <= 1, Eq. (4.20) pi_0 = sum pi_0^j P_j, smallest positive solution when mu > 1, Examples 4.28-4.30 (pi_0^n for n ancestors), sha256:9f01ac6c0ef8a6a641de075fe6af109d7215bad8c33734807fd654d4a1ad53e1 — https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., CHANCE Project GNU FDL version dated 4 July 2006), §10.2 Branching Processes pp.378-381 (PDF pp.386-389): d_m = P(dies out by generation m), d_0 = 0, monotone to d, Eq. (10.1)-(10.2) d_m = h(d_{m-1}), d = h(d) with d = 1 always a root; Theorem 10.2 (d the smallest root; m <= 1 => d = 1; m > 1 => d < 1) p.380; at most two offspring: roots d = 1 and d = p0/p2, p.381, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Random (randomservices.org), Ch 15 §11 'Discrete-Time Branching Chains': f(1) = 1 trivial case (every state absorbing); f(0) > 0 => every positive state transient, extinction or explosion; chain from x particles = x independent copies, extinction q^x; q a fixed point of the offspring PGF; m <= 1 => q = 1, m > 1 => 0 < q < 1; f(0) = 1-p, f(2) = p gives q = (1-p)/p, sha256:3e58cfd2f74dd0bdc8d925ffe41e6017ab9851e6bc6ecc7e84bfc578c655ccdc — https://www.randomservices.org/random/markov/Branching.html"
    - "CAS Exam MAS-I Fall 2018, Q11 — official exam paper (scan), PDF p.15; Final Answer Key PDF p.50 (Q11 = A), sha256:47ced888a314db1a5e29e28c0a52f989966b21a079b1c08634b73dc90e844296 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasi_fmasi-18.pdf"
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
