---
aliases:
  - Piecewise Constant Transition Intensity
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:1ed92ffaea97da33b063add16946f5474ab6433876149603fa34b4a8127e44bc
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Transition Intensity.md
---

**A Transition Intensity** $\mu^{ij}_x$ is the instantaneous rate at which a life aged $x$ in state $i$ of a [[Multiple State Model|multiple state model]] moves to state $j$: for a short time $h$, the probability of the move is about $h\,\mu^{ij}_x$. Intensities are the inputs of a continuous-time model, from which every transition probability follows, and they are what a study of lives in each state estimates.

> $$\mu^{ij}_x = \lim_{h \to 0^+} \frac{{}_hp^{ij}_x}{h}, \quad i \neq j$$

> $${}_hp^{ij}_x = h\,\mu^{ij}_x + o(h)$$

> $$\hat{\mu}^{ij} = \frac{d_{ij}}{v_i}$$

> $$\widehat{\text{Var}}\left(\hat{\mu}^{ij}\right) = \frac{d_{ij}}{v_i^{\,2}}$$

- **Symbols:** An intensity is a rate per year, not a probability, so it can exceed 1. In the alive–dead model it is the force of mortality, $\mu^{01}_x = \mu_x$, the [[Hazard Rate|hazard rate]] of the future lifetime. In the estimator, $d_{ij}$ is the number of observed moves from $i$ to $j$ and $v_i$ is the total time that all lives in the study spent in state $i$, the waiting time.
- **From intensities to probabilities:** The probability of staying in state $i$ throughout is ${}_tp^{\overline{ii}}_x = \exp\left(-\int_0^t \sum_{j \neq i}\mu^{ij}_{x+s}\,ds\right)$. Other probabilities, which may involve several moves, come from [[Kolmogorov's Forward Equation|Kolmogorov's forward equations]].
- **Piecewise constant intensities:** A study usually assumes that each intensity is constant over each year of age, or over another short interval. The integral is then a sum of rectangles, and with constant intensities for one year from state $i$ the probability of leaving to $j$ in the year is $\frac{\mu^{ij}}{\mu^{i\cdot}}\left(1 - e^{-\mu^{i\cdot}}\right)$, where $\mu^{i\cdot} = \sum_{j \neq i}\mu^{ij}$. This is how the [[Multiple Decrement Model|multiple decrement model]] turns estimated intensities into decrement probabilities.
- **Why $d/v$:** With constant intensities out of state $i$, the likelihood is proportional to $\prod_{j}\left(\mu^{ij}\right)^{d_{ij}} e^{-\mu^{ij} v_i}$, and maximizing it gives $\hat{\mu}^{ij} = d_{ij}/v_i$. A life that leaves the study while still in state $i$ adds to $v_i$ but adds no move, so censoring needs no special treatment. The variance is the inverse of the [[Fisher Information|information]] $v_i/\mu^{ij}$, with $\mu^{ij}$ replaced by its estimate, which gives the fourth block and an [[Approximate Confidence Interval|approximate confidence interval]] from [[Maximum Likelihood Estimation|maximum likelihood]] theory.

> [!example]- Estimating Sickness Intensities with a Confidence Interval {Example}
> A study of disability income policyholders aged 50 to 51 records 4,820 years spent healthy in total, during which 96 policyholders fell sick and 38 died. Assuming constant intensities over the year of age, estimate $\mu^{01}$ with an approximate 95% confidence interval, then estimate the probability that a healthy 50-year-old stays healthy for the whole year.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \hat{\mu}^{01} &= \frac{96}{4{,}820} \\
> > &= 0.019917 \\
> > \text{SE} &= \frac{\sqrt{96}}{4{,}820} \\
> > &= 0.0020328 \\
> > \text{CI} &= 0.019917 \pm 1.96(0.0020328) \\
> > &= (0.015933,\ 0.023901)
> > \end{align*}
> > $$
> > The healthy state is left at total rate $\hat{\mu}^{01} + \hat{\mu}^{02} = 134/4{,}820 = 0.027801$.
> > $$
> > \begin{align*}
> > \hat{p}^{\overline{00}}_{50} &= e^{-0.027801} \\
> > &= 0.972582
> > \end{align*}
> > $$
> > The interval is about 20% either side of the estimate even with 96 events, because the relative standard error is $1/\sqrt{d_{01}}$.

> [!example]- Decrement Probabilities From Estimated Intensities {Example}
> A lapse study observes 912.4 policy years of exposure in the third policy year, with 3 deaths and 85 lapses spread through the year. Assuming constant intensities within the policy year, estimate the dependent probabilities of death and of lapse in that year.
>
> > [!answer]-
> > The total intensity is $\hat{\mu}^{(\tau)} = 88/912.4 = 0.096449$, and each decrement takes its share $d_j/88$ of the total probability.
> > $$
> > \begin{align*}
> > \hat{q}^{(\tau)} &= 1 - e^{-0.096449} \\
> > &= 0.091944 \\
> > \hat{q}^{(d)} &= \frac{3}{88}(0.091944) \\
> > &= 0.003134 \\
> > \hat{q}^{(w)} &= \frac{85}{88}(0.091944) \\
> > &= 0.088809
> > \end{align*}
> > $$
> > The exposure cancels in each share, because both intensities are divided by the same waiting time. Each probability is a function of the estimated intensities, so it is itself a maximum likelihood estimate.

> [!tip]- How it appears on the exam
> - **ALTAM** asks for maximum likelihood estimates of transition intensities for multiple state and multiple decrement models under piecewise constant intensities, and for the transition probabilities that follow from them.
> - **Confidence intervals:** ALTAM also asks for approximate confidence intervals for these estimators, using the asymptotic normal distribution of the maximum likelihood estimator.
> - **Inputs elsewhere:** Given intensities are the inputs for Kolmogorov's forward equations, Thiele's equations and the Woolhouse correction term.

> [!warning]- Exam traps
> - **Waiting time, not lives:** The denominator of $\hat{\mu}$ is the total time spent in the state, counting part years. Dividing by the number of lives at the start counts a full year for each life that left early, which understates the intensity.
> - **The right state's exposure:** Recoveries are estimated with the time spent sick, $\hat{\mu}^{10} = d_{10}/v_1$. Using the time spent healthy for every intensity gives badly wrong recovery rates.
> - **Intensity versus probability:** $\hat{\mu}^{ij}$ is not $\hat{q}^{ij}$. With competing exits, the probability of leaving to $j$ in the year is $\frac{\mu^{ij}}{\mu^{i\cdot}}\left(1 - e^{-\mu^{i\cdot}}\right)$, which is smaller than $\mu^{ij}$.
> - **Variance of the estimate:** The variance is $d/v^2$, not $d/v$. The second is the estimate itself, and using it as the variance gives an interval far too wide.
