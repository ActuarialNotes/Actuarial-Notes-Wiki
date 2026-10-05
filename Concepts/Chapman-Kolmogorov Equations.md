---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:eebd9f0f480e27d7111071c2611df0ac28942af563bca1aca663e6e7d6a74e14
  sources:
    - "Ross, Introduction to Probability Models, Ch. 4 'Markov Chains' (course-hosted copy on NTNU TMA4265 page; edition earlier than the 11th-13th the 2026 outline lists, file dated 2012-09-06): Sec. 4.2 n-step notation P^n_ij = P{X_{n+k}=j | X_k=i}, Chapman-Kolmogorov eq. (4.2) with derivation, P(n+m) = P(n)P(m), P(n) = P^n pp.189-190; unconditional P{X_n=j} = sum_i P^n_ij alpha_i p.191; absorbing-set technique for 'enters A by time n' and Ex. 4.10 pp.192-193, sha256:9f01ac6c0ef8a6a641de075fe6af109d7215bad8c33734807fd654d4a1ad53e1 - https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf"
    - "Siegrist, Random, 'Discrete-Time Markov Chains' (Chapman-Kolmogorov P_m P_n = P_{m+n} and conditioning proof; P_n = P^n), sha256:808118b103e17cd5e31115b953663b0d8ff94da21f432e6fe7c104e9300380f0 - https://www.randomservices.org/random/markov/Discrete.html"
    - "Siegrist, Random, 'Transition Matrices and Generators' (continuous time: P_s P_t = P_{s+t}, P_{s+t}(x,z) = sum_y P_s(x,y) P_t(y,z)), sha256:5c059429b24a6c2c05ff35d4e72c1eb7153e9b5e3cc93e68bdf191309cbf9597 - https://www.randomservices.org/random/markov/Transition.html"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed.), Ch. 11 Sec. 11.1: p(2)_ij = sum_k p_ik p_kj and Thm 11.1, PDF pp.414-415, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e - https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Daniel, 'Multi-state transition models with actuarial applications' (2004; CAS/SOA reprint), Thm 1.18 non-homogeneous kQ_n = Q_n x ... x Q_{n+k-1} and the 'Warning on interpretation' (in a state at time n vs. having arrived/stayed), PDF p.7, sha256:0ca2c70a5c022a0032026ae139bd59e9fee3142d0455ed071e2d8698573200f8 - https://www.casact.org/sites/default/files/database/studynotes_daniel.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Chapman-Kolmogorov Equations.md
---

The **Chapman-Kolmogorov Equations** give the $(n+m)$-step transition probabilities of a [[Markov Chain]] by conditioning on the state at the intermediate time: to go from $i$ to $j$ in $n + m$ steps, the chain must pass through some state $k$ after $n$ steps.

> $$P_{ij}^{\,n+m} = \sum_{k} P_{ik}^{\,n}\, P_{kj}^{\,m}$$

> $$\mathbf{P}^{(n)} = \mathbf{P}^{n}$$

- $P^n_{ij} = P(X_{m+n} = j \mid X_m = i)$ is Ross's notation for the $n$-step probability, the same as $(\mathbf{P}^n)_{ij}$. In matrix form the equations say $\mathbf{P}^{(n+m)} = \mathbf{P}^{(n)}\mathbf{P}^{(m)}$, so the $n$-step matrix is the $n$-th power of the one-step [[Transition Probability Matrix]].
- They are the [[The Law of Total Probability|law of total probability]] plus the Markov property: once the chain is at $k$, how it got there is irrelevant.
- **Compute only what you need.** For one starting state, carry a single row forward: row $i$ of $\mathbf{P}^n$ equals row $i$ of $\mathbf{P}^{n-1}$ times $\mathbf{P}$. Squaring a whole matrix for one entry wastes exam time. Unconditionally, $P(X_n = j) = \sum_i \alpha_i P^n_{ij}$.
- **Being in a state at time $n$ is not the same as having visited it by time $n$.** For the probability of *ever* entering a set of states within $n$ steps, make those states absorbing and compute the $n$-step probability in the modified chain.
- A non-homogeneous chain multiplies its one-step matrices in time order. In continuous time the equations read $P_{ij}(t+s) = \sum_k P_{ik}(t)P_{kj}(s)$.

> [!example]- Where a Claim Stands After Three Months {Example}
> Each month a claim file is Open (O), Closed (C) or Reopened (R), with
> $$\mathbf{P} = \begin{array}{c|ccc} & O & C & R \\ \hline O & 0.6 & 0.4 & 0 \\ C & 0 & 0.9 & 0.1 \\ R & 0 & 0.5 & 0.5 \end{array}$$
> A claim is Open now. Find the probability it is Closed three months from now.
>
> > [!answer]-
> > Row O of $\mathbf{P}^2$:
> >
> > $$
> > \begin{align*}
> > P^2_{OO} &= (0.6)(0.6) \\
> > &= 0.36 \\
> > P^2_{OC} &= (0.6)(0.4) + (0.4)(0.9) \\
> > &= 0.60 \\
> > P^2_{OR} &= (0.4)(0.1) \\
> > &= 0.04
> > \end{align*}
> > $$
> >
> > Then one more step into C:
> >
> > $$
> > \begin{align*}
> > P^3_{OC} &= 0.36(0.4) + 0.60(0.9) + 0.04(0.5) \\
> > &= 0.144 + 0.540 + 0.020 \\
> > &= 0.704
> > \end{align*}
> > $$
> >
> > The claim is closed at month 3 with probability $70.4\%$.

> [!example]- Ever Reopened Versus Reopened at Month 3 {Example}
> For the same claim, find (a) the probability it is in state R at month 3 and (b) the probability it is reopened at some point within three months.
>
> > [!answer]-
> > (a) From row O of $\mathbf{P}^2$ above:
> >
> > $$
> > \begin{align*}
> > P^3_{OR} &= 0.60(0.1) + 0.04(0.5) \\
> > &= 0.08
> > \end{align*}
> > $$
> >
> > (b) Make R absorbing ($P_{RR} = 1$). Row O of the modified $\mathbf{P}^2$ is unchanged, $(0.36, 0.60, 0.04)$, because a claim starting Open cannot reach R and leave it again within two steps:
> >
> > $$
> > \begin{align*}
> > P(\text{reopened by month 3}) &= 0.60(0.1) + 0.04(1) \\
> > &= 0.10
> > \end{align*}
> > $$
> >
> > The gap of $0.02$ is the path O $\to$ C $\to$ R $\to$ C, $(0.4)(0.1)(0.5)$: reopened and closed again before month 3. A reopening-rate question wants (b).
