---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9cac76104a0eae2740e7ce646e7dfd067a42608fb8a21782edaee820cc4b8e58
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Markov Chain Monte Carlo.md
---

**Markov Chain Monte Carlo** (MCMC) is a method that draws a sample from a [[Posterior Distribution|posterior distribution]] too complex to derive in closed form. It runs a [[Markov Chain|Markov chain]] whose limiting distribution is the posterior, and treats the parameter vectors the chain visits as the sample.

## The Metropolis-Hastings step

The Metropolis-Hastings step is the basis of the most common MCMC algorithms. With data $x$ and the chain at parameter vector $y_{t-1}$, a candidate $y^*$ is accepted against the ratio

> $$R = \frac{f(x \mid y^*)\, p(y^*)}{f(x \mid y_{t-1})\, p(y_{t-1})} \times \frac{J(y_{t-1} \mid y^*)}{J(y^* \mid y_{t-1})}$$

- $p(y)$ is the prior and $f(x \mid y)$ the likelihood.
- $J$ is the "proposal" or "jumping" distribution.

Each step runs as follows:

1. Draw a candidate $y^*$ from $J(\,\cdot \mid y_{t-1})$.
2. Draw $U$ from uniform$(0,1)$. If $U < R$, set $y_t = y^*$; otherwise $y_t = y_{t-1}$.

The first factor of $R$ is the ratio of the candidate's posterior density to the current one's. The normalising constant of Bayes' theorem cancels, which is why the posterior never has to be computed. With a symmetric proposal the second factor is 1. A candidate with $R \ge 1$ is always accepted, and a rejected candidate repeats the current value in the sample.

> [!example]- Which of these two candidates does the chain accept? {Example}
> Three claims have logarithms $7.2$, $7.8$ and $8.4$. They are modelled as [[Lognormal Distribution|lognormal]] with known $\sigma = 1$ and unknown $\mu$, and the prior on $\mu$ is normal with mean $8$ and standard deviation $1$. The proposal is normal and centred on the current value, so it is symmetric. The chain is at $\mu_{t-1} = 7.5$. The first step draws the candidate $\mu^* = 7.9$. The next step draws $\mu^* = 8.4$ with $U = 0.62$.
>
> > [!answer]-
> > - The proposal is symmetric, so $R$ is the posterior ratio alone.
> > - The lognormal's $1/(x\sigma\sqrt{2\pi})$ factor cancels, leaving the log posterior up to a constant:
> >
> > > $$\log \pi(\mu) = -\tfrac{1}{2}\sum_i (\ell_i - \mu)^2 - \tfrac{1}{2}(\mu - 8)^2$$
> >
> > - $\log \pi(7.5) = -\tfrac{1}{2}(0.09 + 0.09 + 0.81 + 0.25) = -0.62$.
> > - $\log \pi(7.9) = -\tfrac{1}{2}(0.49 + 0.01 + 0.25 + 0.01) = -0.38$.
> > - Step 1 has $R = e^{-0.38 + 0.62} = 1.271$.
> > - $R > 1$, so the candidate is accepted whatever $U$ is: $\mu_t = 7.9$.
> > - $\log \pi(8.4) = -\tfrac{1}{2}(1.44 + 0.36 + 0 + 0.16) = -0.98$.
> > - Step 2 has $R = e^{-0.98 + 0.38} = 0.549$.
> > - $U = 0.62 > 0.549$, so the candidate is rejected, and the chain stays at $7.9$.
> > - As a check, this prior is conjugate, so the exact posterior is normal with mean $(8 + 7.2 + 7.8 + 8.4)/4 = 7.85$ and standard deviation $0.5$. A chain run long enough visits values in proportion to that density.

## Convergence checks

Meyers' first edition describes its convergence checks in Appendix B and C:

1. **Phases.** The run has three phases: an *adaptive* phase that tunes the proposal distribution, a *burn-in* phase run until the chain reaches the posterior, and a *sampling* phase whose draws are kept.
2. **Trace plots.** Several independent chains are run and their traces plotted. The chains should bounce around the same region.
3. **Gelman-Rubin statistic.** The potential scale reduction factor compares between-chain variability $B$ with within-chain variability $W$. It approaches 1 as the chains converge.
4. **Thinning.** Keeping every $k$-th draw reduces autocorrelation when tuning alone cannot. An acceptance rate near 50% is near optimal for a one-parameter model, falling to about 25% as parameters are added.

The potential scale reduction factor is

> $$\text{PSRF} = \sqrt{\hat R} = \sqrt{\frac{\hat W + \hat B}{\hat W}}$$

- $\hat W$ and $\hat B$ are the estimated within-chain and between-chain variability.
- $\hat R$ is Gelman and Rubin's, not the acceptance ratio $R$.

Brooks et al. (2011) accept convergence at a PSRF of 1.1 or below for every parameter. Meyers used the "runjags" default of **1.05**. If the largest PSRF was above it, he doubled the sampling iterations and the thinning parameter and ran again.

> [!example]- Do these two runs meet Meyers' convergence target? {Example}
> Four chains are run for a reserving model. For the parameter with the worst mixing, $\hat W = 0.050$ and $\hat B = 0.008$. After the sampling iterations and the thinning parameter are doubled, $\hat W = 0.050$ and $\hat B = 0.002$.
>
> > [!answer]-
> > - The first run's PSRF is $\sqrt{(0.050 + 0.008)/0.050} = \sqrt{1.16} = 1.077$.
> > - That passes Brooks et al.'s $1.1$ but fails Meyers' $1.05$, so its draws are not yet a sample from the posterior.
> > - The second run's PSRF is $\sqrt{(0.050 + 0.002)/0.050} = \sqrt{1.04} = 1.020$.
> > - $1.020 \le 1.05$, so the second run's sampling-phase draws can be used.

## MCMC in stochastic loss reserving

In [[Stochastic Reserving|stochastic loss reserving]], MCMC turns a [[Bayesian|Bayesian]] model of the triangle into thousands of equally likely parameter vectors, and from them a [[Predictive Distribution|predictive distribution]] of the outcome. [[Stochastic Loss Reserving Using Bayesian MCMC Models (Meyers - 2019)|Meyers (2019)]] defines a Bayesian model as a model whose parameters have a prior distribution specified by the user. "Bayesian estimation" predicts the distribution of a statistic of interest from the posterior.

Meyers draws 10,000 parameter vectors from the posterior. He simulates one outcome from the model for each vector, so the sample of outcomes carries both [[Parameter Risk|parameter]] and [[Process Risk|process]] risk. The "Estimate" is the mean of the simulated outcomes. An outcome's percentile is the share of simulated totals at or below it, and these percentiles feed the [[PP Plot|p-p plot]]. The same draws give model diagnostics. Standardized residuals from 100 random draws go into box plots, and the leave-one-out expected log predictive density, $\widehat{elpd}_{loo}$, is estimated from the matrix of log-likelihoods of each observation under each draw. MCMC is needed for models such as the [[Cross Classified Model|cross classified model]], with 29 parameters, whose posterior has no closed form.

The second edition runs its models in **Stan**, called from R scripts. The first edition (Meyers, 2015) used **JAGS** through the R package "runjags".

Meyers treats priors as a feature of the model, not a statement of belief. He makes them wider than he believes, but never improper or heavy-tailed in regions he considers impossible. He also avoids hard boundaries where he can. A parameter that sits near one (his variance increments $a_i$ near zero) makes Stan issue warnings, so he samples a transformed parameter instead.

> [!trap] Using draws from before convergence
> Draws from the burn-in phase, or from chains whose PSRF is still above the target, are not a sample from the posterior. Discard the burn-in and check every parameter's PSRF before using the sampling-phase draws.
