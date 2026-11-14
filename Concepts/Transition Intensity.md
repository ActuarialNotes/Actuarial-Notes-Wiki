---
aliases:
  - Piecewise Constant Transition Intensity
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:d2366ffd307967d07d0286f953731a3604cf1f0214a711d4ec6027c339075141
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Transition Intensity.md
---

A **Transition Intensity** is the instantaneous rate at which a life in one state of a [[Multiple State Model|multiple state model]] moves to another state. Intensities are the inputs of a continuous-time model, from which every transition probability follows. The intensity of a move from state $i$ to state $j$ for a life aged $x$, $\mu^{ij}_x$, is

> $$\mu^{ij}_x = \lim_{h \to 0^+} \frac{{}_hp^{ij}_x}{h}$$

- ${}_hp^{ij}_x$ is the probability that a life aged $x$ in state $i$ is in state $j$ at age $x + h$.
- $i \neq j$.

For a short time $h$, the probability of the move is therefore about $h\,\mu^{ij}_x$. An intensity is a rate per year, not a probability, so it can exceed 1. In the alive–dead model it is the force of mortality, $\mu^{01}_x = \mu_x$, the [[Hazard Rate|hazard rate]] of the future lifetime.

## Probabilities from intensities

The probability that a life aged $x$ in state $i$ stays in state $i$ throughout the next $t$ years is

> $${}_tp^{\overline{ii}}_x = \exp\left(-\int_0^t \sum_{j \neq i}\mu^{ij}_{x+s}\,ds\right)$$

Other probabilities, which may involve several moves, come from [[Kolmogorov's Forward Equation|Kolmogorov's forward equations]].

## Piecewise constant intensities

A study usually assumes that each intensity is constant over each year of age, or over another short interval. The integral is then a sum of rectangles. With constant intensities for one year out of state $i$, the probability of leaving to state $j$ in the year is

> $$\frac{\mu^{ij}}{\mu^{i\cdot}}\left(1 - e^{-\mu^{i\cdot}}\right)$$

- $\mu^{i\cdot} = \sum_{j \neq i}\mu^{ij}$ is the total intensity out of state $i$.

This probability is smaller than $\mu^{ij}$. It is how the [[Multiple Decrement Model|multiple decrement model]] turns estimated intensities into decrement probabilities.

> [!example]- What are the estimated probabilities of death and of lapse in this policy year? {Example}
> A lapse study observes 912.4 policy years of exposure in the third policy year, with 3 deaths and 85 lapses spread through the year. Assume constant intensities within the policy year.
>
> > [!answer]-
> > - The total intensity is $\hat{\mu}^{(\tau)} = 88/912.4 = 0.096449$.
> > - The probability of leaving in the year is $\hat{q}^{(\tau)} = 1 - e^{-0.096449} = 0.091944$.
> > - Each decrement takes its share $d_j/88$ of that, because both intensities are divided by the same waiting time.
> > - The probability of death is $\hat{q}^{(d)} = (3/88)(0.091944) = 0.003134$.
> > - The probability of lapse is $\hat{q}^{(w)} = (85/88)(0.091944) = 0.088809$.

## Maximum likelihood estimation

With constant intensities out of state $i$, the [[Maximum Likelihood Estimation|maximum likelihood]] estimate of the intensity from $i$ to $j$ is

> $$\hat{\mu}^{ij} = \frac{d_{ij}}{v_i}$$

- $d_{ij}$ is the number of observed moves from $i$ to $j$.
- $v_i$ is the waiting time, the total time that all lives in the study spent in state $i$, counting part years.

The likelihood is proportional to $\prod_{j}\left(\mu^{ij}\right)^{d_{ij}} e^{-\mu^{ij} v_i}$, and maximizing it gives $d_{ij}/v_i$. A life that leaves the study while still in state $i$ adds to $v_i$ but adds no move, so censoring needs no special treatment. Each intensity is divided by the time spent in its own starting state, so recoveries are estimated with the time spent sick, $\hat{\mu}^{10} = d_{10}/v_1$.

The variance is the inverse of the [[Fisher Information|information]] $v_i/\mu^{ij}$, with $\mu^{ij}$ replaced by its estimate. The estimated variance is

> $$\widehat{\text{Var}}\left(\hat{\mu}^{ij}\right) = \frac{d_{ij}}{v_i^{\,2}}$$

It gives an [[Approximate Confidence Interval|approximate confidence interval]] from the asymptotic normal distribution of the estimator. A transition probability calculated from the estimated intensities is itself a maximum likelihood estimate.

> [!example]- What is the estimate of $\mu^{01}$ with an approximate 95% confidence interval, and the probability of staying healthy for the year? {Example}
> A study of disability income policyholders aged 50 to 51 records 4,820 years spent healthy in total, during which 96 policyholders fell sick and 38 died. Assume constant intensities over the year of age.
>
> > [!answer]-
> > - The estimate is $\hat{\mu}^{01} = 96/4{,}820 = 0.019917$.
> > - Its standard error is $\sqrt{96}/4{,}820 = 0.0020328$.
> > - The interval is $0.019917 \pm 1.96(0.0020328)$, which is $(0.015933,\ 0.023901)$.
> > - The healthy state is left at total rate $134/4{,}820 = 0.027801$.
> > - The probability of staying healthy for the year is $\hat{p}^{\overline{00}}_{50} = e^{-0.027801} = 0.972582$.
> > - The interval is about 20% either side of the estimate even with 96 events, because the relative standard error is $1/\sqrt{d_{01}}$.

> [!trap] Dividing by the number of lives instead of the waiting time
> The denominator of $\hat{\mu}$ is the total time spent in the state, counting part years. Dividing by the number of lives at the start counts a full year for each life that left early, which understates the intensity.
