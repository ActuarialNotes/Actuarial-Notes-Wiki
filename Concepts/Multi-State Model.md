---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:87cdbe636e0da959371df5440bb2266ad40cfcc44aea32f460c42b250eb18b74
  sources:
    - "Daniel, 'Multi-state transition models with actuarial applications' (2004; CAS study note reprint): Examples 1.1, 1.3 (pair of lives: joint status fails at the first failure, last-survivor at the last; four states), 1.4 (disability, moving back and forth) PDF pp.2-3; Thm 1.18 kQ_n = Q_n … Q_{n+k-1} PDF p.7; 'Warning on interpretation' and Thm 1.19 kP(i)_n = P(i)_n … P(i)_{n+k-1} (being in vs remaining in a state) PDF p.7; Thm 2.12 APV of cash flows while in states PDF p.16, sha256:0ca2c70a5c022a0032026ae139bd59e9fee3142d0455ed071e2d8698573200f8 — https://www.casact.org/sites/default/files/database/studynotes_daniel.pdf"
    - "Struppeck, 'Life Contingencies', CAS Study Note (Oct 2014, rev. Sept 2015) — MAS-I syllabus reading, PDF p.11 (the hazard rate for mortality is the force of mortality; joint-life annuity pays until one of the two dies, last-survivor until both have died), sha256:8ea3f762df47e0c143b217219e7aa7033709e55f2a6378de25ed385673e3a849 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Struppeck.pdf"
    - "Heriot-Watt University F79AF lecture notes, Ch. 5 'Markov Multiple-State Models': §5.1 alive-dead model with the force of mortality as the transition intensity μ^ad PDF pp.1-3; §5.2 age-dependent intensities PDF p.6; §5.3 Fig. 5 Able/Ill/Dead disability model with recovery PDF pp.7-8, sha256:84d9098f7ae74942523f1ab7fae8739d963e6428c314b43ec41c7e1b28b0a6b1 — https://www.macs.hw.ac.uk/~andrea/f79af/notes5.pdf"
    - "Ross, Introduction to Probability Models, Ch. 4 (course-hosted copy on the NTNU TMA4265 page; an edition earlier than the 11th-13th the 2026 outline lists): §4.2 Chapman-Kolmogorov pp.189-191, sha256:9f01ac6c0ef8a6a641de075fe6af109d7215bad8c33734807fd654d4a1ad53e1 — https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Multi-State Model.md
---

A **Multi-State Model** describes an individual moving among a finite set of states — for example healthy, disabled and dead — with transitions governed by a [[Markov Chain]]; benefits and premiums attach to being in a state or to moving between states. The two-state alive–dead [[Survival Model]] is its simplest case.

> $$\text{APV} = \sum_{k=1}^{n} b\, v^{k}\, P_{ij}^{\,k}$$

> $$P(X_1 = \cdots = X_n = i \mid X_0 = i) = (P_{ii})^{n}$$

- The APV is for a benefit $b$ payable at the end of each period $k$ in which a life that starts in state $i$ is in state $j$; $v$ is the one-period discount factor ([[Present Value]]) and $P^k_{ij}$ comes from the [[Chapman-Kolmogorov Equations]].
- A disability model typically has states H (healthy), D (disabled) and X (dead, absorbing), with transitions H $\to$ D (disablement), D $\to$ H (recovery) and H, D $\to$ X.
- **Being in a state versus staying in it:** $P^n_{ii}$ counts every path that is back in $i$ at time $n$, including those that left and returned; $(P_{ii})^n$ counts only paths that never left. Waiting periods and "continuously disabled" conditions need the second.
- Transition probabilities change with age, so realistic models are non-homogeneous — a different [[Transition Probability Matrix]] each year, multiplied in order.
- In continuous time the matrix is replaced by transition intensities, and the force of mortality ([[Hazard Rate]]) is the intensity of the alive $\to$ dead transition. A pair of lives $(x)$ and $(y)$ is another multi-state model, with four states: both alive, only $(x)$ alive, only $(y)$ alive, and both dead. The [[Joint Life|joint-life]] status fails at the first death and the last-survivor status at the last.

> [!example]- Two-Year Disability Probabilities {Example}
> Annual transitions among Healthy, Disabled and Dead are
> $$\mathbf{P} = \begin{array}{c|ccc} & H & D & X \\ \hline H & 0.85 & 0.10 & 0.05 \\ D & 0.20 & 0.65 & 0.15 \\ X & 0 & 0 & 1 \end{array}$$
> For a healthy life, find the state probabilities two years from now and the probability of staying healthy throughout.
>
> > [!answer]-
> > Row H of $\mathbf{P}^2$:
> >
> > $$
> > \begin{align*}
> > P^2_{HH} &= 0.85(0.85) + 0.10(0.20) \\
> > &= 0.7425 \\
> > P^2_{HD} &= 0.85(0.10) + 0.10(0.65) \\
> > &= 0.1500 \\
> > P^2_{HX} &= 0.85(0.05) + 0.10(0.15) + 0.05(1) \\
> > &= 0.1075
> > \end{align*}
> > $$
> >
> > Staying healthy throughout has probability $0.85^2 = 0.7225$. The gap $0.7425 - 0.7225 = 0.02$ is the path H $\to$ D $\to$ H, $(0.10)(0.20)$: disabled in year 1, recovered by year 2.

> [!example]- Valuing a Disability Income Benefit {Example}
> Using the same matrix, a policy on a healthy life pays $\$10{,}000$ at the end of each of the next two years if the insured is then disabled. At $5\%$ annual interest, find the actuarial present value.
>
> > [!answer]-
> > The disabled probabilities are $P^1_{HD} = 0.10$ and $P^2_{HD} = 0.15$:
> >
> > $$
> > \begin{align*}
> > \text{APV} &= 10{,}000\left(\frac{0.10}{1.05} + \frac{0.15}{1.05^2}\right) \\
> > &= 10{,}000\,(0.095238 + 0.136054) \\
> > &= \$2{,}312.93
> > \end{align*}
> > $$
> >
> > The year-2 payment is worth more despite the extra discounting, because disablement accumulates faster than recovery removes it.
