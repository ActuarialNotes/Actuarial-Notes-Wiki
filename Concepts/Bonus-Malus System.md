---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:9cc64b2ac32cf9839b052ab426283bd301480425297b3b3ec1350382637587d8
  sources:
    - "Ross, Introduction to Probability Models, Ch. 4 'Markov Chains' (course-hosted copy on the NTNU TMA4265 page; an edition earlier than the 11th-13th the 2026 outline lists): Ex. 4.7 Bonus Malus system, s_i(k) and Poisson a_k, P_ij = Σ_{k: s_i(k)=j} e^{-λ}λ^k/k!, pp.188-189; Proposition 4.3 and Ex. 4.23 average annual premium = Σ_j π_j × premium_j, pp.215-216, sha256:9f01ac6c0ef8a6a641de075fe6af109d7215bad8c33734807fd654d4a1ad53e1 — https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf"
    - "Niemiec, 'Bonus-Malus Systems as Markov Set-Chains', ASTIN Bulletin 37(1), 2007 (CAS-hosted), §1 Introduction p.53 (constant individual claim frequency → constant transition probabilities → homogeneous Markov chain), sha256:5ca8e5a1c851ba2d6855f29319172d102e4eeee90c2ae1cd1d040b8ff4114fe8 — https://www.casact.org/sites/default/files/database/astin_vol37no1_53.pdf"
    - "Lemaire & Zi, 'A Comparative Analysis of 30 Bonus-Malus Systems', ASTIN Bulletin 24(2), 1994 (CAS-hosted): Introduction pp.287-288 (merit rating; more a priori classification decreases the need for a BMS); Tool #3 efficiency = elasticity of the mean stationary premium w.r.t. claim frequency p.294; Tool #4 hunger for bonus — policyholders pay small claims themselves to avoid surcharges, pp.294-295, sha256:44976cd13085959f1c41c738cc06163b0999de01beb4411b2f6d5b33859ec181 — https://www.casact.org/sites/default/files/database/astin_vol24no2_287.pdf"
    - "Charpentier, David & Elie, 'Optimal Claiming Strategies in Bonus Malus Systems and Implied Markov Chains', Risks 5(4):58, 2017: §1 p.1 (hunger for bonus; small accidents not reported), §1.2 p.3 (not claiming when the loss is below the premium difference), §2.1 p.4 (stationary distribution depends only on claim frequency, not on severity), sha256:7aca0a4b2950faa930301254577a315125779ee70accd96e61d57d66214ac764 — https://pdfs.semanticscholar.org/e029/9f4413e126653c375b792038ea8b6c8b21c1.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Bonus-Malus System.md
---

A **Bonus-Malus System** (BMS) is a merit-rating scheme, most common in motor insurance, in which each [[Policyholder|policyholder]] occupies one of a finite set of premium levels and moves to a cheaper level (bonus) after a claim-free year or a dearer one (malus) after claims. When a policyholder's annual claim counts are independent with a fixed distribution, the level is a [[Markov Chain]].

> $$P_{ij} = \sum_{k \,:\, s_i(k) = j} a_k$$

> $$\text{Long-run average premium} = \sum_j \pi_j\, b_j$$

- $s_i(k)$ is the level reached from level $i$ after a year with $k$ claims, $a_k$ the probability of $k$ claims (for a Poisson rate $\lambda$, $a_k = e^{-\lambda}\lambda^k/k!$), $b_j$ the premium at level $j$ and $\pi_j$ the [[Stationary Distribution|stationary probability]] of level $j$. The rules and the claim distribution together fix the [[Transition Probability Matrix]].
- A BMS is a coarse form of [[Experience Rating]]: it reacts to claim **counts**, not amounts, and is justified by heterogeneity in $\lambda$ across drivers — a [[Mixing Distribution]]. For one driver with a fixed $\lambda$ and independent yearly claim counts, the level is a homogeneous Markov chain.
- **Hunger for bonus:** a reported claim costs future discounts, so policyholders rationally pay small losses themselves. The insurer's data then under-count small claims, which the pricing actuary has to allow for.
- **Separation can be weak.** Because levels respond only to counts and reset quickly, long-run premiums differ far less than claim frequencies do — see the first example.

> [!example]- Long-Run Premium in a Three-Level System {Example}
> Levels 0, 1 and 2 carry premiums $\$500$, $\$400$ and $\$300$. A claim-free year moves a driver up one level (to a maximum of 2); any claim returns it to level 0. Claims are Poisson with $\lambda = 0.2$ per year. Find the stationary distribution and the long-run average premium.
>
> > [!answer]-
> > Let $p = e^{-0.2} = 0.8187$ (claim-free) and $q = 1 - p = 0.1813$:
> >
> > $$\mathbf{P} = \begin{array}{c|ccc} & 0 & 1 & 2 \\ \hline 0 & q & p & 0 \\ 1 & q & 0 & p \\ 2 & q & 0 & p \end{array}$$
> >
> > Every row sends probability $q$ to level 0, so $\pi_0 = q$; level 1 is reached only from level 0; level 2 takes the rest:
> >
> > $$
> > \begin{align*}
> > \pi_0 &= q \\
> > &= 0.1813 \\
> > \pi_1 &= p\,q \\
> > &= 0.1484 \\
> > \pi_2 &= p^2 \\
> > &= 0.6703
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \text{Average premium} &= 500(0.1813) + 400(0.1484) + 300(0.6703) \\
> > &= 90.63 + 59.36 + 201.10 \\
> > &= \$351.09
> > \end{align*}
> > $$
> >
> > Repeating with $\lambda = 0.5$ gives $\boldsymbol{\pi} = (0.3935, 0.2387, 0.3679)$ and $\$402.56$. A driver with $2.5$ times the claim frequency pays only about $15\%$ more in the long run.

> [!example]- Should a Small Loss Be Reported? {Example}
> In the same system ($\lambda = 0.2$), a driver at level 2 has an at-fault loss of $\$250$ on the last day of an otherwise claim-free year. Reporting it puts the driver at level 0 next year; absorbing it keeps level 2. Ignoring interest, compare the expected extra premium from reporting with the loss.
>
> > [!answer]-
> > Year 1: reporting costs $500 - 300 = \$200$ extra for certain.
> >
> > Year 2: if year 1 is claim-free (probability $p$), the reporting path is at level 1 ($\$400$) and the other at level 2 ($\$300$); if year 1 has a claim, both paths are at level 0. From year 3 on, the paths coincide.
> >
> > $$
> > \begin{align*}
> > E[\text{extra premium}] &= 200 + 100\,p \\
> > &= 200 + 100(0.8187) \\
> > &= \$281.87
> > \end{align*}
> > $$
> >
> > Reporting the $\$250$ loss would cost about $\$282$ in expected premium, so the driver keeps it. Any loss below roughly $\$282$ goes unreported — hunger for bonus in one line.
