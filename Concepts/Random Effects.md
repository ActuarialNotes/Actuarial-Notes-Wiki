---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c8c969f0c376aa54233b200e84858ed845ae67b74ceaa63393da2d4375dbd22c
  sources: []
  open_findings: 0
  log: .verify/Concepts/Random Effects.md
---

**Random effects** are the group-level departures from the population-average fit in a [[Linear Mixed Model]]. Unlike [[Fixed Effects|fixed effects]] they are treated as *draws from a distribution*, so a group with thin data is pulled toward the overall mean rather than fitted on its own.

> $$\mathbf{y} = \mathbf{X}\boldsymbol{\beta} + \mathbf{Z}\mathbf{b} + \boldsymbol{\varepsilon}$$
>
> $$\mathbf{b} \sim N(\mathbf{0}, \mathbf{D}), \quad \boldsymbol{\varepsilon} \sim N(\mathbf{0}, \mathbf{R}), \quad \mathbf{b} \perp \boldsymbol{\varepsilon}$$

- A random effect costs **one variance parameter**, not one coefficient per level — 68 territories add a single $\sigma_b^2$ to the model
- $\mathbf{Z}$ is the design matrix mapping each observation to its group; $\mathbf{D}$ holds the [[Variance Components|variance components]]
- Random effects induce **correlation between observations in the same group** — this is what lets a mixed model handle repeated measures on one policyholder
- Their predicted values are shrunk toward zero by exactly a credibility factor — see [[Best Linear Unbiased Predictor]]
- The effects are assumed **mean zero**: the population average lives entirely in the fixed part, so a random effect adds no intercept of its own

![[Media/Figures/Random_Effects.svg|340]]

> [!example]- Why the Random Effect Shrinks a Thin Territory {Example}
> A random-intercept model of loss ratio by territory has $\hat\sigma_b^2 = 0.010$ (between territories) and $\hat\sigma^2 = 0.090$ (within). Territory A has 9 observations averaging 0.15 above the grand mean; territory B has 1 observation 0.15 above. What are their predicted effects?
>
> > [!answer]-
> > The shrinkage factor is $Z_i = \dfrac{n_i \sigma_b^2}{n_i \sigma_b^2 + \sigma^2}$:
> > $$Z_A = \frac{9(0.010)}{9(0.010) + 0.090} = \frac{0.09}{0.18} = 0.50 \Rightarrow \hat b_A = 0.50(0.15) = 0.075$$
> > $$Z_B = \frac{0.010}{0.010 + 0.090} = 0.10 \Rightarrow \hat b_B = 0.10(0.15) = 0.015$$
> > Same raw deviation, very different predictions — the model trusts nine observations five times as much as one. This is [[Bühlmann Credibility]] in another notation.
