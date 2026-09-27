---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:41993f687a52a188e23f3406ccf992dbd3ce5714ac6fc8b0c5818102b45bdef2
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Markov Chain Monte Carlo.md
---

**Markov Chain Monte Carlo** (MCMC) draws a sample from a [[Posterior Distribution|posterior distribution]] too complex to derive in closed form. It runs a [[Markov Chain|Markov chain]] whose limiting distribution is the posterior, and treats the parameter vectors the chain visits as the sample. In [[Stochastic Reserving|stochastic loss reserving]] it turns a [[Bayesian|Bayesian]] model of the triangle into thousands of equally likely parameter vectors, and from them a [[Predictive Distribution|predictive distribution]] of the outcome.

> $$R = \frac{f(x \mid y^*)\, p(y^*)}{f(x \mid y_{t-1})\, p(y_{t-1})} \times \frac{J(y_{t-1} \mid y^*)}{J(y^* \mid y_{t-1})}$$

- This is the **Metropolis-Hastings** step, the basis of the most common MCMC algorithms. $x$ is the data and $y$ the parameter vector; $p(y)$ is the prior, $f(x \mid y)$ the likelihood, and $J$ the "proposal" or "jumping" distribution.
    - Draw a candidate $y^*$ from $J(\,\cdot \mid y_{t-1})$.
    - Draw $U$ from uniform$(0,1)$. If $U < R$, set $y_t = y^*$; otherwise $y_t = y_{t-1}$.
    - The first factor is the ratio of the candidate's posterior density to the current one's. The normalising constant of Bayes' theorem cancels, which is why the posterior never has to be computed. With a symmetric proposal the second factor is 1.
- **What a "Bayesian model" means here.** [[Stochastic Loss Reserving Using Bayesian MCMC Models (Meyers - 2019)|Meyers (2019)]] defines it as a model whose parameters have a prior distribution specified by the user. "Bayesian estimation" predicts the distribution of a statistic of interest from the posterior.
- **From posterior to reserve.** Meyers draws 10,000 parameter vectors from the posterior. He simulates one outcome from the model for each vector, so the sample of outcomes carries both [[Parameter Risk|parameter]] and [[Process Risk|process]] risk.
    - The "Estimate" is the mean of the simulated outcomes.
    - An outcome's percentile is the share of simulated totals at or below it; these percentiles feed the [[PP Plot|p-p plot]].
    - The same draws give model diagnostics. Standardized residuals from 100 random draws go into box plots, and the leave-one-out expected log predictive density, $\widehat{elpd}_{loo}$, is estimated from the matrix of log-likelihoods of each observation under each draw.
- **Software.** The second edition runs its models in **Stan**, called from R scripts. The first edition (Meyers, 2015) used **JAGS** through the R package "runjags".
- **Priors.** Meyers treats priors as a feature of the model, not a statement of belief. He makes them wider than he believes, but never improper or heavy-tailed in regions he considers impossible. He also avoids hard boundaries where he can. A parameter that sits near one (his variance increments $a_i$ near zero) makes Stan issue warnings, so he samples a transformed parameter instead, which gives the sampler more room.
- **Convergence checks** are described in the first edition's Appendix B and C.
    - **Phases.** The run has three phases: an *adaptive* phase that tunes the proposal distribution, a *burn-in* phase run until the chain reaches the posterior, and a *sampling* phase whose draws are kept.
    - **Trace plots.** Several independent chains are run and their traces plotted. The chains should bounce around the same region.
    - **Gelman-Rubin statistic.** The potential scale reduction factor compares between-chain variability $B$ with within-chain variability $W$. It approaches 1 as the chains converge.
    - **Thinning.** Keeping every $k$-th draw reduces autocorrelation when tuning alone cannot. An acceptance rate near 50% is near optimal for a one-parameter model, falling to about 25% as parameters are added.

> $$\text{PSRF} = \sqrt{\hat R} = \sqrt{\frac{\hat W + \hat B}{\hat W}}$$

- This $\hat R$ is Gelman and Rubin's, not the acceptance ratio above. Brooks et al. (2011) accept convergence at a PSRF of 1.1 or below for every parameter. Meyers used the "runjags" default of **1.05**. If the largest PSRF was above it, he doubled the sampling iterations and the thinning parameter and ran again.

> [!example]- Two Metropolis-Hastings Steps {Example}
> Three claims have logarithms $7.2$, $7.8$ and $8.4$ (claims of about $\$1{,}339$, $\$2{,}441$ and $\$4{,}447$). They are modelled as [[Lognormal Distribution|lognormal]] with known $\sigma = 1$ and unknown $\mu$, and the prior on $\mu$ is normal with mean $8$ and standard deviation $1$. The proposal is normal and centred on the current value, so it is symmetric.
>
> The chain is at $\mu_{t-1} = 7.5$. Draws give a candidate $\mu^* = 7.9$, and on the next step a candidate $\mu^* = 8.4$ with $U = 0.62$. Which candidates are accepted?
>
> > [!answer]-
> > The proposal is symmetric, so $R$ is the posterior ratio alone. The lognormal's $1/(x\sigma\sqrt{2\pi})$ factor cancels, leaving the log posterior up to a constant:
> >
> > $$\log \pi(\mu) = -\tfrac{1}{2}\sum_i (\ell_i - \mu)^2 - \tfrac{1}{2}(\mu - 8)^2$$
> >
> > **Step 1**, from $7.5$ to $7.9$:
> >
> > $$
> > \begin{align*}
> > \log \pi(7.5) &= -\tfrac{1}{2}(0.09 + 0.09 + 0.81 + 0.25) \\
> > &= -0.62 \\
> > \log \pi(7.9) &= -\tfrac{1}{2}(0.49 + 0.01 + 0.25 + 0.01) \\
> > &= -0.38 \\
> > R &= e^{-0.38 + 0.62} \\
> > &= 1.271
> > \end{align*}
> > $$
> >
> > $R > 1$, so the candidate is accepted whatever $U$ is: $\mu_t = 7.9$.
> >
> > **Step 2**, from $7.9$ to $8.4$:
> >
> > $$
> > \begin{align*}
> > \log \pi(8.4) &= -\tfrac{1}{2}(1.44 + 0.36 + 0 + 0.16) \\
> > &= -0.98 \\
> > R &= e^{-0.98 + 0.38} \\
> > &= 0.549
> > \end{align*}
> > $$
> >
> > $U = 0.62 > 0.549$, so the candidate is rejected and the chain stays at $7.9$. The draw is repeated in the sample.
> >
> > Check: this prior is conjugate, so the exact posterior is normal with mean $(8 + 7.2 + 7.8 + 8.4)/4 = 7.85$ and standard deviation $1/\sqrt{4} = 0.5$. A chain run long enough visits values in proportion to that density. MCMC earns its keep on reserving models such as the [[Cross Classified Model|cross classified model]], with 29 parameters, where no such formula exists.

> [!example]- Has the Chain Converged? {Example}
> Four chains are run for a reserving model. For the parameter with the worst mixing, the estimated within-chain variability is $\hat W = 0.050$ and the between-chain variability is $\hat B = 0.008$. After the sampling iterations and the thinning parameter are doubled, $\hat W = 0.050$ and $\hat B = 0.002$.
>
> Apply Meyers' convergence target to each run.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{PSRF}_1 &= \sqrt{\frac{0.050 + 0.008}{0.050}} \\
> > &= \sqrt{1.16} \\
> > &= 1.077 \\
> > \text{PSRF}_2 &= \sqrt{\frac{0.050 + 0.002}{0.050}} \\
> > &= \sqrt{1.04} \\
> > &= 1.020
> > \end{align*}
> > $$
> >
> > The first run passes Brooks et al.'s $1.1$ but fails Meyers' $1.05$, so its draws are not yet a sample from the posterior. The chains still sit in different places, which the trace plots would show. After the rerun, $1.020 \leq 1.05$, and the sampling-phase draws can be used.
