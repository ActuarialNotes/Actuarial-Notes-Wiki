---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:330eb87c7acff4cf0156c190e6dc720ad9eecade6859b07a612ce33468ab3a0d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Correlated Chain Ladder Model.md
---

**Correlated Chain Ladder Model** (CCL) is the Bayesian model for **incurred** triangles in the 2015 first edition of Meyers' *Stochastic Loss Reserving Using Bayesian MCMC Models*. It adds correlation between successive [[Accident Year|accident years]] to the [[Leveled Chain Ladder Model|leveled chain ladder (LCL) model]]. Each year's log mean moves by $\rho$ times the previous year's deviation from its own log mean.

> $$\mu_{1,d} = \alpha_1 + \beta_d$$

> $$
> \begin{aligned}
> \mu_{w,d} = {} & \alpha_w + \beta_d \\
> & + \rho \cdot \big(\log(C_{w-1,d}) - \mu_{w-1,d}\big), \quad w > 1
> \end{aligned}
> $$

> $$C_{w,d} \sim \text{lognormal}(\mu_{w,d},\ \sigma_d), \quad \sigma_1 > \dots > \sigma_{10}$$

- $C_{w,d}$ is the cumulative loss of accident year $w$ at development year $d$ ($w, d = 1, \dots, 10$), with $\beta_{10} = 0$. The priors are:
    - $\alpha_w \sim \text{normal}\big(\log(\text{Premium}_w) + \mathit{logelr},\ \sqrt{10}\big)$, with $\mathit{logelr} \sim \text{uniform}(-1, 0.5)$
    - $\beta_d \sim \text{uniform}(-5, 5)$ for $d < 10$
    - $\rho \sim \text{uniform}(-1, 1)$, the full permissible range
    - $\sigma_d = \sum_{i=d}^{10} a_i$ with $a_i \sim \text{uniform}(0, 1)$
- $\rho = 0$ gives back the LCL model. Meyers chose diffuse priors because he knew nothing of each insurer beyond Schedule P. An actuary who knows the expected loss ratio can tighten the priors on $\alpha_w$ and $\mathit{logelr}$, in the spirit of the [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] method.
- **What it fixes.** The [[Mack Chain Ladder Model|Mack model]] assumes the accident years are independent and understated the variability of incurred outcomes. The LCL's random levels helped but not enough. [[Correlation|Correlation]] between accident years can raise the standard deviation of the total further.
- **What $\rho$ measures.** The first edition states that, given $\{\alpha_w\}$, $\{\beta_d\}$ and $\rho$, $\rho$ is the coefficient of correlation between $\log C_{w-1,d}$ and $\log C_{w,d}$. The second edition's [[Correlated Accident Year Model|CAY model]] has the same $\rho$ term, and there a proposition credited to John Major gives the correlation as $\rho/(1+\rho^2)$ for adjacent years and $0$ for years further apart.
- **Simulating the outcome.** The predictive distribution is a mixture over the posterior. For each of 10,000 [[Markov Chain Monte Carlo|MCMC]] parameter sets, start from the known $C_{1,10}$. Compute $\mu_{2,10}$ and simulate $\tilde C_{2,10}$, then use that draw to compute $\mu_{3,10}$, and so on to $\tilde C_{10,10}$. The outcome's percentile is the share of simulated totals at or below the actual total.
- **Validation** ([[PP Plot|p-p plots]], KS bands $19.2$ per line and $9.6$ combined):
    - **Incurred:** all four lines lie within the band, Other Liability only just ($19.1$). The combined plot is within too ($D = 7.4$), though its slanted "S" shows a mildly thin tail. Meyers concludes that the CCL predicts the distribution of incurred outcomes correctly within the specified confidence level.
    - **Paid:** like the ODP bootstrap and Mack, it produces estimates that are too high ($D = 25.1$ combined). That led to the incremental trend models and the [[Changing Settlement Rate Model|changing settlement rate model]].
    - The standard deviations exceed the LCL's, which Meyers attributes to generally positive posterior $\rho$s. For the illustrative insurer the total's standard deviation is $1{,}901$, against $1{,}551$ for the LCL and $1{,}057$ for Mack.
- **Not in the current reading.** The second edition, [[Stochastic Loss Reserving Using Bayesian MCMC Models (Meyers - 2019)|Meyers (2019)]], assigned for Exam 7, has no CCL. Its [[Correlated Accident Year Model|correlated accident year (CAY) model]] applies the same $\rho$ term to a [[Cross Classified Model|cross classified]] base, with a $\text{beta}(2,2)$-based prior on $\rho$.
- Source: Meyers, [first edition, CAS Monograph No. 1 (2015)](https://www.casact.org/sites/default/files/2021-02/01-Meyers.PDF), Sections 5 and 7.

> [!example]- Two Steps of the Simulation {Example}
> The first MCMC draw for Meyers' illustrative incurred triangle has $\alpha_1 = 8.2763$, $\alpha_2 = 7.8226$, $\alpha_3 = 8.2625$, $\beta_{10} = 0$, $\rho = 0.1828$ and $\sigma_{10} = 0.0170$. The known $C_{1,10} = 3{,}917$.
>
> (a) Compute $\mu_{2,10}$.
>
> (b) The simulation then draws $\tilde C_{2,10} = 2{,}520$. Compute $\mu_{3,10}$ and the expected $C_{3,10}$ given this path.
>
> > [!answer]-
> > **(a)** $\mu_{1,10} = \alpha_1 + \beta_{10} = 8.2763$.
> >
> > $$
> > \begin{align*}
> > \mu_{2,10} &= 7.8226 + 0.1828\,(\ln 3{,}917 - 8.2763) \\
> > &= 7.8226 + 0.1828 \times (-0.00322) \\
> > &= 7.8220
> > \end{align*}
> > $$
> >
> > Accident year 1's actual loss sits almost exactly on its log mean, so it barely moves year 2.
> >
> > **(b)**
> >
> > $$
> > \begin{align*}
> > \mu_{3,10} &= 8.2625 + 0.1828\,(\ln 2{,}520 - 7.8220) \\
> > &= 8.2625 + 0.1828 \times 0.0100 \\
> > &= 8.2643 \\
> > E[C_{3,10}] &= e^{8.2643 + 0.0170^2/2} \\
> > &= 3{,}883
> > \end{align*}
> > $$
> >
> > Both log means match Meyers' Table 6 ($7.8221$ and $8.2643$). The simulated $2{,}520$ ran $1\%$ above its log mean, and $18\%$ of that carries into year 3. Chained over nine years and 10,000 draws, these carry-overs widen the distribution of the total.

> [!example]- Parameter Risk Versus Process Risk {Example}
> For the illustrative insurer's incurred triangle, the CCL gives a standard deviation of the total ultimate of $1{,}901$. The standard deviation, across the posterior draws, of the total's expected value, $\sum_w e^{\mu_{w,10} + \sigma_{10}^2/2}$, is $1{,}893$.
>
> Split the total variance into [[Parameter Risk|parameter risk]] and [[Process Risk|process risk]].
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Total} &= 1{,}901^2 \\
> > &= 3{,}613{,}801 \\
> > \text{Parameter} &= 1{,}893^2 \\
> > &= 3{,}583{,}449 \\
> > \text{Process} &= 3{,}613{,}801 - 3{,}583{,}449 \\
> > &= 30{,}352
> > \end{align*}
> > $$
> >
> > Process risk is a standard deviation of only $\sqrt{30{,}352} = 174$, under $1\%$ of the variance. Meyers found the same on several other insurers, some very large. His preference is to focus on total risk, the only risk that can be tested against actual outcomes.
