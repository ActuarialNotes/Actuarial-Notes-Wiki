---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:b8eb422a0b1d5423d0cd55def79d29001762793a711f23b71e90f77332bb5eb2
  sources:
    - "Ross, Introduction to Probability Models, Ch. 4 'Markov Chains' (course-hosted copy on the NTNU TMA4265 page; an edition earlier than the 11th-13th the 2026 outline lists): Ex. 4.7 Bonus Malus system, s_i(k) and Poisson a_k, P_ij = Σ_{k: s_i(k)=j} e^{-λ}λ^k/k!, pp.188-189; Proposition 4.3 and Ex. 4.23 average annual premium = Σ_j π_j × premium_j, pp.215-216, sha256:9f01ac6c0ef8a6a641de075fe6af109d7215bad8c33734807fd654d4a1ad53e1 — https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf"
    - "Niemiec, 'Bonus-Malus Systems as Markov Set-Chains', ASTIN Bulletin 37(1), 2007 (CAS-hosted), §1 Introduction p.53 (constant individual claim frequency → constant transition probabilities → homogeneous Markov chain), sha256:5ca8e5a1c851ba2d6855f29319172d102e4eeee90c2ae1cd1d040b8ff4114fe8 — https://www.casact.org/sites/default/files/database/astin_vol37no1_53.pdf"
    - "Lemaire & Zi, 'A Comparative Analysis of 30 Bonus-Malus Systems', ASTIN Bulletin 24(2), 1994 (CAS-hosted): Introduction pp.287-288 (merit rating; more a priori classification decreases the need for a BMS); Tool #3 efficiency = elasticity of the mean stationary premium w.r.t. claim frequency p.294; Tool #4 hunger for bonus — policyholders pay small claims themselves to avoid surcharges, pp.294-295, sha256:44976cd13085959f1c41c738cc06163b0999de01beb4411b2f6d5b33859ec181 — https://www.casact.org/sites/default/files/database/astin_vol24no2_287.pdf"
    - "Charpentier, David & Elie, 'Optimal Claiming Strategies in Bonus Malus Systems and Implied Markov Chains', Risks 5(4):58, 2017: §1 p.1 (hunger for bonus; small accidents not reported), §1.2 p.3 (not claiming when the loss is below the premium difference), §2.1 p.4 (stationary distribution depends only on claim frequency, not on severity), sha256:7aca0a4b2950faa930301254577a315125779ee70accd96e61d57d66214ac764 — https://pdfs.semanticscholar.org/e029/9f4413e126653c375b792038ea8b6c8b21c1.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Bonus-Malus System.md
---

A **Bonus-Malus System** is a merit-rating system, used mainly in auto insurance, in which each [[Policyholder|policyholder]] is in one of a finite number of premium levels. A policyholder moves to a cheaper level after a claim-free year and to a more expensive level after a year with claims. When a policyholder's numbers of claims in successive years are independent with the same distribution, the sequence of levels is a [[Markov Chain|Markov chain]]. If $a_k$ is the probability of $k$ claims in a year, the transition probability from level $i$ to level $j$ is

> $$P_{ij} = \sum_{k \in K_{ij}} a_k$$

- $K_{ij}$ is the set of numbers of claims in a year that move a policyholder from level $i$ to level $j$.
- For a Poisson number of claims with mean $\lambda$, $a_k = e^{-\lambda}\lambda^k/k!$, so $a_0 = e^{-\lambda}$ and $a_1 = \lambda e^{-\lambda}$.

Each row of the [[Transition Probability Matrix|transition probability matrix]] $\mathbf{P}$ places the probabilities of 0 claims, 1 claim, and so on, at the levels the rules send the policyholder to. The last entry of a row is often the probability of all numbers of claims from some number upward, one minus the others.

> [!example]- A system has levels 0, 1 and 2 with premiums 500, 400 and 300. A claim-free year moves a driver to the next cheaper level, up to level 2, and any claim returns the driver to level 0. Claims are Poisson with mean 0.2 per year. What is the transition probability matrix? {Example}
> - The probability of a claim-free year is $a_0 = e^{-0.2} = 0.8187$.
> - The probability of at least one claim is $1 - 0.8187 = 0.1813$, and every such year leads to level 0.
> - From level 0 or 1, a claim-free year leads one level cheaper. From level 2, it leads to level 2.
> - The transition probability matrix $\mathbf{P}$, with a row for each level the driver is at and a column for each level the driver moves to, is:
>
> | Level | To 0 | To 1 | To 2 |
> | --- | --- | --- | --- |
> | 0 | 0.1813 | 0.8187 | 0 |
> | 1 | 0.1813 | 0 | 0.8187 |
> | 2 | 0.1813 | 0 | 0.8187 |

## Long-run average premium

Over many years, the proportion of time a policyholder spends at level $j$ is its [[Stationary Distribution|stationary probability]] $\pi_j$. The long-run average premium is

> $$\sum_j \pi_j\, b_j$$

- $b_j$ is the premium at level $j$.

> [!example]- In the system above, what is the long-run average premium? {Example}
> - Every row sends probability 0.1813 to level 0, so $\pi_0 = 0.1813$.
> - Level 1 is reached only from level 0 after a claim-free year, so $\pi_1 = 0.8187 \times 0.1813 = 0.1484$.
> - Level 2 has the remaining probability, $\pi_2 = 1 - 0.1813 - 0.1484 = 0.6703$.
> - The long-run average premium is
>
> $$
> \begin{aligned}
> \sum_j \pi_j\, b_j &= 500(0.1813) + 400(0.1484) + 300(0.6703) \\
> &= 351.1
> \end{aligned}
> $$

With a claim rate of 0.5 instead of 0.2, the same system gives a long-run average premium of 402.56. A driver with 2.5 times the expected number of claims pays about 15% more in the long run.

## Expected cost of reporting a claim

A reported claim moves a policyholder to a more expensive level, and the higher premiums can last for several years. To find the expected extra premium from reporting a claim, compare the premiums on the two paths, with and without the claim, year by year. Each year's difference is weighted by the probability that the paths are still at different levels. Once the two paths reach the same level, they stay together, because the movement depends only on the current level and the future claims.

A policyholder should report a loss only if it is larger than the expected extra premium. Smaller losses are paid by the policyholder, so the insurer's data under-count small claims. A higher claim rate makes a future claim more likely to bring the two paths together, and so lowers the expected extra premium.

> [!example]- In the system above, a driver at level 2 has an at-fault loss of 250 on the last day of an otherwise claim-free year. Ignoring interest, should the driver report the loss? {Example}
> - Reporting puts the driver at level 0 next year instead of level 2, which costs $500 - 300 = 200$ for certain.
> - In the year after, the paths are at levels 1 and 2 if next year is claim-free, with probability 0.8187, which costs $400 - 300 = 100$.
> - If next year has a claim, both paths return to level 0, and they stay together from then on.
> - From the third year on, the two paths are always at the same level.
> - The expected extra premium is $200 + 0.8187 \times 100 = 281.87$.
> - The loss of 250 is less than 281.87, so the driver should not report it.

> [!trap] Counting only the first year of extra premium
> The cost of reporting a claim is not just next year's premium increase. In the example, next year's increase is 200, so a loss of 250 would seem worth reporting, but the expected extra premium over all years is 281.87.
