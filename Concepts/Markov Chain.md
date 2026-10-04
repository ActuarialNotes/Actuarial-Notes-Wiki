---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:3054c73bb70358ed3d5b9dbdb6153d7a6233a06dbb18dd5c5ddf89bf85d3b52a
  sources:
    - "Ross, Introduction to Probability Models, Ch. 4 'Markov Chains' (course-hosted copy on NTNU TMA4265 page; an edition earlier than the 11th-13th the 2026 MAS-I outline lists - file dated 2012-09-06, Ch. 4 = pp.185-280): eq. (4.1) Markov property and row sums p.185; Ex. 4.7 Bonus Malus p.188; Sec. 4.2 Chapman-Kolmogorov eq. (4.2) and P(n)=P^n pp.189-190; Sec. 4.4 Theorem 4.1 and Remarks (ii)-(iii) pp.205-206, sha256:9f01ac6c0ef8a6a641de075fe6af109d7215bad8c33734807fd654d4a1ad53e1 - https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., GNU FDL), Ch. 11: Sec. 11.1 transition matrix and Thm 11.1 (n-step = P^n) PDF pp.414-415; Thms 11.7-11.12 fixed vector / long-run proportion PDF pp.441-447, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e - https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Random (randomservices.org), 'Discrete-Time Markov Chains' (Markov property, Chapman-Kolmogorov P_m P_n = P_{m+n}, P_n = P^n), sha256:808118b103e17cd5e31115b953663b0d8ff94da21f432e6fe7c104e9300380f0 - https://www.randomservices.org/random/markov/Discrete.html"
    - "Siegrist, Random, 'Stationary and Limiting Distributions' (irreducible positive recurrent chain: unique invariant f(x)=1/mu(x), long-run proportion; ergodic limit), sha256:d4719c5e1cb9ad3be4fbf84c8dd849390f7d1ad15ced112f6312be83e5545680 - https://www.randomservices.org/random/markov/Limiting.html"
    - "Daniel, 'Multi-state transition models with actuarial applications' (2004; reprinted by CAS and SOA), Sec. 1.1 Examples 1.4 disability and 1.5 driver ratings, PDF p.3, sha256:0ca2c70a5c022a0032026ae139bd59e9fee3142d0455ed071e2d8698573200f8 - https://www.casact.org/sites/default/files/database/studynotes_daniel.pdf"
    - "CreditMetrics Technical Document (J.P. Morgan 1997; RiskMetrics 2007 reprint), Sec. 1.6.1 one-year rating transition matrix PDF p.36 and Sec. 6.4.1 'transition matrix model is an example of a Markov Process' PDF p.88, sha256:b9e9cf7e01f8cc89dedd1ca1c1df377714c6ecefa99c587d1addbb130d7367c7 - https://www.msci.com/documents/10199/93396227-d449-4229-9143-24a94dab122f"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Markov Chain.md
---

A **Markov Chain** is a [[Stochastic Processes|stochastic process]] $\{X_n\}$ on a discrete state space that has the **Markov property**: the next state depends on the past only through the current state. It is governed by a one-step **transition probability matrix** $P$.

> $$P\big(X_{n+1} = j \mid X_n = i, \ldots, X_0\big) = P\big(X_{n+1} = j \mid X_n = i\big)$$

> $$= P_{ij}$$

- $P_{ij} \geq 0$ is the probability of moving from state $i$ to state $j$ in one step; each row sums to 1
- The $n$-step transition probabilities are the entries of the matrix power $P^n$:

> $$P\big(X_n = j \mid X_0 = i\big) = \big(P^n\big)_{ij}$$

- A **stationary distribution** $\boldsymbol{\pi}$ satisfies $\boldsymbol{\pi}P = \boldsymbol{\pi}$ with $\sum_i \pi_i = 1$; for an irreducible aperiodic chain it is the long-run fraction of time spent in each state
- Common actuarial uses include no-claims-discount (bonus-malus) systems, multi-state disability/mortality models, and credit-rating migration

> [!example]- Two-Year Risk-Class Transition {Example}
> An insured is classed Standard ($S$) or Preferred ($P$) each year, with transition matrix
> $$P = \begin{array}{c|cc} & S & P \\ \hline S & 0.8 & 0.2 \\ P & 0.3 & 0.7 \end{array}$$
> Given the insured is Standard now, find the probability of being Preferred in two years.
>
> > [!answer]-
> > Sum over the intermediate class (the Markov property ignores earlier history):
> > $$
> > \begin{align*}
> > \big(P^2\big)_{SP} &= P_{SS}P_{SP} + P_{SP}P_{PP} \\
> >   &= (0.8)(0.2) + (0.2)(0.7) \\
> >   &= 0.30
> > \end{align*}
> > $$
> > There is a 30% chance the insured is Preferred after two years.

> [!example]- Long-Run Stationary Distribution {Example}
> Using the same matrix, find the long-run proportion of years the insured is Preferred.
>
> > [!answer]-
> > Solve $\boldsymbol{\pi}P = \boldsymbol{\pi}$ with $\pi_S + \pi_P = 1$. The balance equation for state $P$ is:
> > $$
> > \begin{align*}
> > \pi_P &= 0.2\,\pi_S + 0.7\,\pi_P \\
> > 0.3\,\pi_P &= 0.2\,\pi_S \\
> > \pi_P &= \tfrac{2}{3}\,\pi_S
> > \end{align*}
> > $$
> > With $\pi_S + \pi_P = 1$: $\pi_S = 0.6$, $\pi_P = 0.4$. In the long run the insured is Preferred about 40% of the time.
