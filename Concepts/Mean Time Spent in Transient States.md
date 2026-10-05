---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:46205889e0cb0dfa3f13416b57731a648dc92e47d0317d39fa09edf449fd7319
  sources:
    - "Ross, Introduction to Probability Models, Ch 4 'Markov Chains' (an earlier edition than the 12th ed. the 2026 MAS-I outline assigns; course-hosted copy on the NTNU TMA4265 page, printed pp.185-280, PDF p.n = printed p.184+n), §4.6 Mean Time Spent in Transient States pp.230-232 (PDF pp.46-48): P_T with row sums < 1, s_ij and Eq. (4.18) s_ij = delta_ij + sum_k P_ik s_kj, recurrent states drop out, S = I + P_T S, S = (I - P_T)^-1 and the inverse exists, f_ij = (s_ij - delta_ij)/s_jj, make the states of A absorbing for the time to enter A; Examples 4.26-4.27, sha256:9f01ac6c0ef8a6a641de075fe6af109d7215bad8c33734807fd654d4a1ad53e1 — https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., CHANCE Project GNU FDL version dated 4 July 2006), §11.2 Absorbing Markov Chains: Theorem 11.4 N = (I - Q)^-1 = I + Q + Q^2 + ..., n_ij expected visits with the initial state counted, p.418 (PDF p.426); Definition 11.3 'fundamental matrix' p.419 (PDF p.427); Theorem 11.5 t = Nc p.419; Theorem 11.6 B = NR p.420 (PDF p.428), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Random (randomservices.org), Ch 15 §4 'Transience and Recurrence': (P^n)_B = (P_B)^n on the transient states, G_B = sum P_B^n, I_B - P_B invertible when B is finite, sha256:24edb8bd0237b0e3abd7beeae48596f35421c9aa35653c6845cfaebb223c5535 — https://www.randomservices.org/random/markov/Recurrence.html"
    - "Siegrist, Random (randomservices.org), Ch 12 §10 'Timid Play': win probability f(x) used for the gambler's-ruin cross-check in Example 2, sha256:e0ac4e5bbd2287e7322092c87063ddb9afdea4bbeacf83ab9597df579d86459b — https://www.randomservices.org/random/games/Timid.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Mean Time Spent in Transient States.md
---

The **Mean Time Spent in Transient States** of a finite [[Markov Chain]] is the matrix $S$ of expected visits: with the [[Recurrent and Transient States|transient states]] numbered $T = \{1, \ldots, t\}$, $s_{ij}$ is the expected number of periods the chain spends in state $j$ given that it starts in state $i$ (the starting period counts when $i = j$). $S$ comes from inverting $I - P_T$, where $P_T$ holds the transition probabilities among the transient states only.

> $$s_{ij} = \delta_{ij} + \sum_{k=1}^{t} P_{ik}\, s_{kj}$$

> $$S = (I - P_T)^{-1}$$

> $$f_{ij} = \frac{s_{ij} - \delta_{ij}}{s_{jj}}$$

- $\delta_{ij}$ is 1 if $i = j$ and 0 otherwise. The first equation conditions on the first move; recurrent states drop out of the sum because the chain can never get from a recurrent state back to a transient one. In matrix form it reads $S = I + P_T S$, which rearranges to $S = (I - P_T)^{-1}$.
- $P_T$ is the [[Transition Probability Matrix]] with the rows and columns of the recurrent states struck out, so some of its rows sum to less than 1. $I - P_T$ is always invertible, and $S = I + P_T + P_T^2 + \cdots$. For an absorbing chain Grinstead and Snell call this matrix the **fundamental matrix** $N$.
- $f_{ij}$ is the probability that the chain, started in $i$, ever enters $j$. With $i = j$ it is the return probability $f_j$, and rearranges to $s_{jj} = 1/(1 - f_j)$.
- **Time until absorption.** The row sum $\sum_j s_{ij}$ is the expected number of periods before the chain leaves the transient states, starting from $i$. For the expected time until the chain first enters some set of states $A$, make every state of $A$ absorbing ($P_{ii} = 1$) and apply the same method to the modified chain.
- **Where it ends up.** The probability of being absorbed in absorbing state $r$, starting from transient $i$, is $\sum_{k \in T} s_{ik} P_{kr}$ — row $i$ of $S$ times the transitions from the transient states into $r$.

> [!example]- Time to Close a Claim That May Be Litigated {Example}
> Each month an open claim is Open ($O$), in Litigation ($L$) or Closed ($C$, absorbing), with
> $$P = \begin{array}{c|ccc} & O & L & C \\ \hline O & 0.6 & 0.1 & 0.3 \\ L & 0.2 & 0.7 & 0.1 \\ C & 0 & 0 & 1 \end{array}$$
> For a newly Open claim, find the expected number of months it spends Open and in Litigation, the expected months until it closes, and the probability that it is ever litigated.
>
> > [!answer]-
> > The transient states are $O$ and $L$:
> > $$I - P_T = \begin{bmatrix} 0.4 & -0.1 \\ -0.2 & 0.3 \end{bmatrix}$$
> > Its determinant is
> > $$
> > \begin{align*}
> > (0.4)(0.3) - (-0.1)(-0.2) &= 0.12 - 0.02 \\
> > &= 0.10
> > \end{align*}
> > $$
> > so
> > $$
> > \begin{align*}
> > S &= \frac{1}{0.10}\begin{bmatrix} 0.3 & 0.1 \\ 0.2 & 0.4 \end{bmatrix} \\
> > &= \begin{bmatrix} 3 & 1 \\ 2 & 4 \end{bmatrix}
> > \end{align*}
> > $$
> > Starting Open: $s_{OO} = 3$ months Open and $s_{OL} = 1$ month in Litigation, so $3 + 1 = 4$ months until it closes. The probability it is ever litigated is
> > $$
> > \begin{align*}
> > f_{OL} &= \frac{s_{OL}}{s_{LL}} \\
> > &= \frac{1}{4}
> > \end{align*}
> > $$
> > A check: from $O$ the claim leaves for $L$ or $C$ with probabilities in the ratio $0.1 : 0.3$, so it reaches $L$ first with probability $0.1/0.4 = 0.25$. A claim that does reach Litigation spends $s_{LL} = 4$ months there on average, so the unconditional 1 month is $0.25 \times 4$.

> [!example]- Years at Each Surplus Level {Example}
> An insurer's surplus, in units of \$1 million, moves up 1 with probability 0.6 or down 1 with probability 0.4 each year; at 0 the regulator takes over and at 4 the insurer is sold, both absorbing. Surplus is 2 now. Find the expected number of years spent at each of the levels 1, 2 and 3, the expected years until a takeover or sale, and the probability that surplus ever falls to 1.
>
> > [!answer]-
> > Solve $s_{ij} = \delta_{ij} + \sum_k P_{ik} s_{kj}$ one column at a time, with $P_{12} = P_{23} = 0.6$ and $P_{21} = P_{32} = 0.4$. Column 2 ($j = 2$):
> > $$
> > \begin{align*}
> > s_{12} &= 0.6\, s_{22} \\
> > s_{32} &= 0.4\, s_{22} \\
> > s_{22} &= 1 + 0.4\, s_{12} + 0.6\, s_{32} \\
> > &= 1 + 0.48\, s_{22}
> > \end{align*}
> > $$
> > so $s_{22} = 1/0.52 = 1.923$. Column 1 ($j = 1$):
> > $$
> > \begin{align*}
> > s_{11} &= 1 + 0.6\, s_{21} \\
> > s_{31} &= 0.4\, s_{21} \\
> > s_{21} &= 0.4\, s_{11} + 0.6\, s_{31} \\
> > &= 0.4 + 0.48\, s_{21}
> > \end{align*}
> > $$
> > so $s_{21} = 0.4/0.52 = 0.769$ and $s_{11} = 1 + 0.6(0.769) = 1.462$. Column 3 the same way gives $s_{23} = 0.6/0.52 = 1.154$.
> >
> > From level 2: 0.769 years at level 1, 1.923 at level 2, 1.154 at level 3, and
> > $$
> > \begin{align*}
> > s_{21} + s_{22} + s_{23} &= \frac{0.4 + 1 + 0.6}{0.52} \\
> > &= 3.846
> > \end{align*}
> > $$
> > years until a takeover or sale. The probability surplus ever falls to 1 is
> > $$
> > \begin{align*}
> > f_{21} &= \frac{s_{21}}{s_{11}} \\
> > &= \frac{0.769}{1.462} \\
> > &= 0.526
> > \end{align*}
> > $$
> > which agrees with the [[Gambler's Ruin Problem]]: falling 1 before rising 2 is ruin for a gambler with 1 unit and target 3, $1 - \frac{1 - 2/3}{1 - (2/3)^3} = \frac{10}{19} = 0.526$.
