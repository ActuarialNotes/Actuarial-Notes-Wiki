---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:dc5e7927a1560abb8ae418c7a7efe7eb95488a530f74d341e2f6b2b58b11753f
  sources:
    - "Ross, Introduction to Probability Models, Ch. 4 'Markov Chains' (course-hosted copy on NTNU TMA4265 page; edition earlier than the 11th-13th the 2026 outline lists, file dated 2012-09-06): Sec. 4.4 Theorem 4.1 and Remarks (ii)-(iii) (unique solution iff positive recurrent; long-run proportion; limit if aperiodic) pp.205-206; pi_j = 1/m_jj p.212; Proposition 4.3 long-run average reward sum r(j) pi_j and Ex. 4.23 BMS average premium pp.215-216; Ex. 4.31 nearest-neighbour chain time reversible, pi_i alpha_i = pi_{i+1}(1-alpha_{i+1}) p.238; Exercise 20 doubly stochastic p.266, sha256:9f01ac6c0ef8a6a641de075fe6af109d7215bad8c33734807fd654d4a1ad53e1 - https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed.), Ch. 11: Thm 11.3 absorption with probability 1 PDF p.425; Ex. 11.16 periodic ergodic non-regular chain PDF p.441; Thms 11.7-11.12 and 'Equilibrium' PDF pp.442-447; Ex. 11.19-11.20 solving wP = w using all but one equation PDF p.444; Thm 11.15 mean recurrence r_i = 1/w_i PDF p.463, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e - https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Random, 'Discrete-Time Markov Chains' (two-state chain P_01 = p, P_10 = q -> f = (q/(p+q), p/(p+q)); doubly stochastic -> uniform invariant), sha256:808118b103e17cd5e31115b953663b0d8ff94da21f432e6fe7c104e9300380f0 - https://www.randomservices.org/random/markov/Discrete.html"
    - "Siegrist, Random, 'Stationary and Limiting Distributions' (finite irreducible class is positive recurrent; unique invariant f(x) = 1/mu(x); ergodic limit; periodic behaviour), sha256:d4719c5e1cb9ad3be4fbf84c8dd849390f7d1ad15ced112f6312be83e5545680 - https://www.randomservices.org/random/markov/Limiting.html"
    - "Siegrist, Random, 'Discrete-Time Birth-Death Chains', section 'Time Reversal' (every irreducible recurrent birth-death chain is reversible), sha256:11fd7af4e9d00fb72857d73ce96bd41e6a78c0e4ad172587025d7096858dee94 - https://www.randomservices.org/random/markov/BirthDeath.html"
    - "CreditMetrics Technical Document (J.P. Morgan 1997; RiskMetrics 2007 reprint), Sec. 6.4 'since default is an absorbing state, eventually all firms will default', PDF p.91, sha256:b9e9cf7e01f8cc89dedd1ca1c1df377714c6ecefa99c587d1addbb130d7367c7 - https://www.msci.com/documents/10199/93396227-d449-4229-9143-24a94dab122f"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Stationary Distribution.md
---

The **Stationary Distribution** $\boldsymbol{\pi}$ of a [[Markov Chain]] is a probability vector that one transition leaves unchanged: a chain started in $\boldsymbol{\pi}$ stays in $\boldsymbol{\pi}$. For an irreducible chain, $\pi_j$ is the long-run proportion of periods spent in state $j$; if the chain is also aperiodic, $\pi_j$ is the limit of $P^n_{ij}$ whatever the starting state $i$.

> $$\pi_j = \sum_i \pi_i\, P_{ij} \quad \text{for every } j$$
>
> $$\sum_j \pi_j = 1$$

- **Solving:** write the balance equations $\boldsymbol{\pi}\mathbf{P} = \boldsymbol{\pi}$, drop any one of them (they are linearly dependent because every row of the [[Transition Probability Matrix]] sums to one) and use $\sum_j \pi_j = 1$ in its place.
- A finite irreducible chain always has a unique stationary distribution. If it is also aperiodic (ergodic), $\lim_{n\to\infty} P^n_{ij} = \pi_j$. A periodic chain — one that alternates between two states, say — has a $\boldsymbol{\pi}$, but $\mathbf{P}^n$ never settles.
- **Mean return time** to state $j$ is $1/\pi_j$. **Long-run average reward**: if state $j$ earns $r(j)$ per period, the long-run average is $\sum_j r(j)\,\pi_j$ — the average premium in a [[Bonus-Malus System]], or the average expected loss of a portfolio whose risk mix migrates.
- **Shortcuts:** a two-state chain with $P_{01} = a$ and $P_{10} = b$ has $\boldsymbol{\pi} = \big(b/(a+b),\ a/(a+b)\big)$. A chain that moves at most one state at a time satisfies $\pi_i P_{i,i+1} = \pi_{i+1} P_{i+1,i}$. A doubly stochastic matrix has a uniform $\boldsymbol{\pi}$.
- With an absorbing state that every other state can reach (death in a [[Multi-State Model]], default in [[Credit Rating Migration]]) the stationary distribution just piles all probability into that state; those models are worked over finite horizons with the [[Chapman-Kolmogorov Equations]] instead.

> [!example]- Long-Run Risk Mix and Average Loss {Example}
> Policyholders move among Low, Medium and High risk tiers each year with
> $$\mathbf{P} = \begin{array}{c|ccc} & L & M & H \\ \hline L & 0.85 & 0.15 & 0 \\ M & 0.20 & 0.70 & 0.10 \\ H & 0 & 0.30 & 0.70 \end{array}$$
> Expected annual losses are $\$400$, $\$800$ and $\$2{,}000$ by tier. Find the long-run tier mix, the long-run average expected loss per policy, and the mean time between years spent in H.
>
> > [!answer]-
> > The chain moves one tier at a time, so balance the flows between neighbours:
> >
> > $$
> > \begin{align*}
> > 0.15\,\pi_L &= 0.20\,\pi_M \\
> > \pi_M &= 0.75\,\pi_L \\
> > 0.10\,\pi_M &= 0.30\,\pi_H \\
> > \pi_H &= 0.25\,\pi_L
> > \end{align*}
> > $$
> >
> > Normalising, $\pi_L(1 + 0.75 + 0.25) = 1$, so $\boldsymbol{\pi} = (0.500,\ 0.375,\ 0.125)$. Then
> >
> > $$
> > \begin{align*}
> > \text{Average loss} &= 0.500(400) + 0.375(800) + 0.125(2{,}000) \\
> > &= 200 + 300 + 250 \\
> > &= \$750
> > \end{align*}
> > $$
> >
> > The mean return time to H is $1/0.125 = 8$ years. High-risk policies are one-eighth of the book but a third of its expected loss.

> [!example]- Solving the Full Balance Equations {Example}
> A reinsurer classes each quarter's catastrophe activity as Quiet, Normal or Active, with rows
> $$\mathbf{P} = \begin{array}{c|ccc} & Q & N & A \\ \hline Q & 0.5 & 0.4 & 0.1 \\ N & 0.3 & 0.4 & 0.3 \\ A & 0.2 & 0.3 & 0.5 \end{array}$$
> Find the long-run proportion of Active quarters.
>
> > [!answer]-
> > Use the Q and A balance equations and drop the N one:
> >
> > $$
> > \begin{align*}
> > 0.5\,\pi_Q &= 0.3\,\pi_N + 0.2\,\pi_A \\
> > 0.5\,\pi_A &= 0.1\,\pi_Q + 0.3\,\pi_N
> > \end{align*}
> > $$
> >
> > The first gives $\pi_Q = 0.6\,\pi_N + 0.4\,\pi_A$. Substituting into the second:
> >
> > $$
> > \begin{align*}
> > 0.5\,\pi_A &= 0.06\,\pi_N + 0.04\,\pi_A + 0.3\,\pi_N \\
> > 0.46\,\pi_A &= 0.36\,\pi_N \\
> > \pi_A &= \tfrac{18}{23}\,\pi_N
> > \end{align*}
> > $$
> >
> > so $\pi_Q = \tfrac{21}{23}\pi_N$. Normalising, $\pi_N(21 + 23 + 18)/23 = 1$, giving $\boldsymbol{\pi} = \big(\tfrac{21}{62},\ \tfrac{23}{62},\ \tfrac{18}{62}\big) = (0.339,\ 0.371,\ 0.290)$.
> >
> > The dropped N equation checks it: $0.4(21) + 0.4(23) + 0.3(18) = 23$. About $29\%$ of quarters are Active in the long run.
