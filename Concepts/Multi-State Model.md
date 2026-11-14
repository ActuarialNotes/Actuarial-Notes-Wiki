---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:7e5119e0989b6b76f95d4cf52670dc19536b31aa108348ed742e06cff1762f25
  sources:
    - "Daniel, 'Multi-state transition models with actuarial applications' (2004; CAS study note reprint): Examples 1.1, 1.3 (pair of lives: joint status fails at the first failure, last-survivor at the last; four states), 1.4 (disability, moving back and forth) PDF pp.2-3; Thm 1.18 kQ_n = Q_n … Q_{n+k-1} PDF p.7; 'Warning on interpretation' and Thm 1.19 kP(i)_n = P(i)_n … P(i)_{n+k-1} (being in vs remaining in a state) PDF p.7; Thm 2.12 APV of cash flows while in states PDF p.16, sha256:0ca2c70a5c022a0032026ae139bd59e9fee3142d0455ed071e2d8698573200f8 — https://www.casact.org/sites/default/files/database/studynotes_daniel.pdf"
    - "Struppeck, 'Life Contingencies', CAS Study Note (Oct 2014, rev. Sept 2015) — MAS-I syllabus reading, PDF p.11 (the hazard rate for mortality is the force of mortality; joint-life annuity pays until one of the two dies, last-survivor until both have died), sha256:8ea3f762df47e0c143b217219e7aa7033709e55f2a6378de25ed385673e3a849 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Struppeck.pdf"
    - "Heriot-Watt University F79AF lecture notes, Ch. 5 'Markov Multiple-State Models': §5.1 alive-dead model with the force of mortality as the transition intensity μ^ad PDF pp.1-3; §5.2 age-dependent intensities PDF p.6; §5.3 Fig. 5 Able/Ill/Dead disability model with recovery PDF pp.7-8, sha256:84d9098f7ae74942523f1ab7fae8739d963e6428c314b43ec41c7e1b28b0a6b1 — https://www.macs.hw.ac.uk/~andrea/f79af/notes5.pdf"
    - "Ross, Introduction to Probability Models, Ch. 4 (course-hosted copy on the NTNU TMA4265 page; an edition earlier than the 11th-13th the 2026 outline lists): §4.2 Chapman-Kolmogorov pp.189-191, sha256:9f01ac6c0ef8a6a641de075fe6af109d7215bad8c33734807fd654d4a1ad53e1 — https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Multi-State Model.md
---

A **Multi-State Model** describes an individual moving among a finite set of states, such as healthy, disabled and dead, with the moves governed by a [[Markov Chain]]. Benefits and premiums attach to being in a state or to moving between states.

The two-state alive–dead [[Survival Model]] is its simplest case. A disability model typically has the states H (healthy), D (disabled) and X (dead, absorbing), with the transitions H $\to$ D (disablement), D $\to$ H (recovery) and H, D $\to$ X.

For a benefit $b$ payable at the end of each period $k$ in which a life that starts in state $i$ is in state $j$, the actuarial present value over $n$ periods is

> $$\text{APV} = \sum_{k=1}^{n} b\, v^{k}\, P_{ij}^{\,k}$$

- $v$ is the one-period discount factor ([[Present Value]]).
- $P_{ij}^{k}$ is the $k$-step transition probability from state $i$ to state $j$, from the [[Chapman-Kolmogorov Equations]].

> [!example]- What is the actuarial present value of this disability income benefit? {Example}
> Annual transitions among Healthy, Disabled and Dead are:
>
> | From \ To | H | D | X |
> | :--- | ---: | ---: | ---: |
> | H | 0.85 | 0.10 | 0.05 |
> | D | 0.20 | 0.65 | 0.15 |
> | X | 0 | 0 | 1 |
>
> A policy on a healthy life pays $\$10{,}000$ at the end of each of the next two years if the insured is then disabled. Interest is $5\%$ a year.
>
> > [!answer]-
> > - The year-1 probability of being disabled is $P_{HD} = 0.10$.
> > - The year-2 probability is row H of $\mathbf{P}$ times column D: $P_{HD}^{2} = 0.85(0.10) + 0.10(0.65) = 0.15$.
> > - The APV is $10{,}000\,(0.10/1.05 + 0.15/1.05^2)$.
> > - That is $10{,}000\,(0.095238 + 0.136054) = \$2{,}312.93$.
> > - The year-2 payment is worth more despite the extra discounting, because disablement accumulates faster than recovery removes it.

## Probability of staying in a state

The probability of a particular path of states is the product of the one-step transition probabilities along it. For a life that starts in state $i$ and never leaves it over $n$ periods, that probability is

> $$P(X_1 = \cdots = X_n = i \mid X_0 = i) = (P_{ii})^{n}$$

- $X_k$ is the state at time $k$.

The $n$-step probability $P_{ii}^{n}$ is at least as large, because it counts every path that is back in $i$ at time $n$, including those that left and returned.

> [!example]- What are the probabilities that this healthy life is healthy in two years, and that it stays healthy throughout? {Example}
> Each year a healthy life stays healthy with probability $0.85$ and becomes disabled with probability $0.10$. A disabled life recovers with probability $0.20$.
>
> > [!answer]-
> > - Being healthy in two years is $P_{HH}^{2} = 0.85(0.85) + 0.10(0.20) = 0.7425$.
> > - Staying healthy throughout is $(P_{HH})^{2} = 0.85^2 = 0.7225$.
> > - The difference, $0.7425 - 0.7225 = 0.02$, is the path H $\to$ D $\to$ H, with probability $(0.10)(0.20)$.

> [!trap] Being in a state is not staying in it
> A waiting period or a "continuously disabled" condition needs $(P_{DD})^{n}$. Using $P_{DD}^{n}$ also counts lives that recovered and were disabled again, and overstates the benefit.

## Age-dependent transitions

Transition probabilities change with age, so a realistic model is non-homogeneous. Each year has its own [[Transition Probability Matrix]], and the matrices are multiplied in order.

## Continuous-time models

In continuous time the matrix is replaced by transition intensities. The force of mortality ([[Hazard Rate]]) is the intensity of the alive $\to$ dead transition.

## Models for a pair of lives

A pair of lives $(x)$ and $(y)$ is a multi-state model with four states: both alive, only $(x)$ alive, only $(y)$ alive, and both dead. The [[Joint Life|joint-life]] status fails at the first death and the last-survivor status at the last.
