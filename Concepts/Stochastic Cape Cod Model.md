---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:463dcf96f665adf7a7dd05a5cca1dc94f0d8dba0ddf28e583553f715f3ee6232
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Stochastic Cape Cod Model.md
---

**Stochastic Cape Cod Model** (SCC) is Meyers' Bayesian version of the [[Cape Cod Method|Cape Cod]] model. It is the [[Cross Classified Model|cross classified (CRC) model]] without the accident-year parameters, so every [[Accident Year|accident year]] has the same expected loss ratio, $e^{\mathit{logelr}}$, estimated from the data by [[Markov Chain Monte Carlo|MCMC]].

> $$\mu_{w,d} = \log(\text{Premium}_w) + \mathit{logelr} + \beta_d$$

> $$C_{w,d} \sim \text{lognormal}(\mu_{w,d},\ \sigma_d)$$

> $$\sigma_d^2 = \sum_{i=d}^{10} a_i$$

- $C_{w,d}$ is the cumulative loss of accident year $w$ at development year $d$ ($w, d = 1, \dots, 10$). The priors in [[Stochastic Loss Reserving Using Bayesian MCMC Models (Meyers - 2019)|Meyers (2019)]], Section 6, are:
    - $\mathit{logelr} \sim \text{normal}(-0.4, \sqrt{10})$
    - $\beta_d \sim \text{normal}(0, \sqrt{10})$ for $d = 1, \dots, 9$, with $\beta_{10} = 0$. The monograph prints a mean of $1$ here; the errata (p.23) corrects it to $0$.
    - $a_i \sim \text{uniform}(0, 1)$ for $i = 1, \dots, 10$, which forces $\sigma_1^2 > \dots > \sigma_{10}^2$
- **Where it comes from.** In the [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] method the ultimate is the current loss plus premium times a judgmentally selected expected loss ratio (ELR) times the proportion not yet reported, $V_{11-w}$:

> $$\hat C_{w,10} = C_{w,11-w} + \text{Premium}_w \cdot \mathit{ELR} \cdot V_{11-w}$$

- Stanard and Bühlmann independently proposed estimating the ELR from the data; Bühlmann first presented it at a meeting in Cape Cod. The SCC model estimates it as $\mathit{logelr}$.
- **What it changes from CRC.** It drops $\alpha_w$, the parameter that lets each accident year's loss ratio differ. That leaves $\mathit{logelr}$, nine $\beta_d$ and ten $a_i$.
- **Simulating the outcome.** For each of 10,000 posterior parameter vectors, set $\mu_{w,10} = \log(\text{Premium}_w) + \mathit{logelr}$ and simulate a loss at development year 10. Then subtract the model's expected value of the current reported loss and add the actual current reported loss:

> $$\tilde C_{w,10} = \tilde X_{w,10} - e^{\mu_{w,11-w} + \sigma_{11-w}^2/2} + C_{w,11-w}$$

- Here $\tilde X_{w,10} \sim \text{lognormal}(\mu_{w,10}, \sigma_{10})$ and $w = 2, \dots, 10$. The total is $C_{1,10} + \sum_{w=2}^{10} \tilde C_{w,10}$. This is the BF structure: actual reported plus expected unreported. The CRC model simulates $C_{w,10}$ directly.
- **Results for the illustrative insurer** (paid): $e^{\mathit{logelr}} = e^{-0.4033} = 0.668$, with a posterior standard deviation of $\mathit{logelr}$ of $0.1123$ against the CRC's $0.0233$. The $\sigma_d$ are much larger ($\sigma_{10} = 0.1051$ against $0.0202$). The total paid Estimate is $36{,}725$ with a standard error of $3{,}950$, against an actual $40{,}000$ (the $83.38$th percentile). The CRC gives $40{,}121$ with a standard error of $2{,}487$.
- **Validation.** The SCC performed very poorly on every prospective and retrospective test:
    - Its [[PP Plot|p-p plots]] fail in every line, paid and incurred. The combined $D$ is $20.8$ (paid) and $23.2$ (incurred) against $9.6$, a "decidedly worse reputation" than the other models.
    - The standardized residual box plots by accident year were the most revealing. They point to the assumption of a constant expected loss ratio across accident years.
    - $\widehat{elpd}_{loo}$ favors the CRC model over the SCC for all $200$ paid and all $200$ incurred triangles. $\widehat{elpd}_{test}$ favors CRC for $191$ paid and $192$ incurred triangles.
    - When lines are paired, failing to capture the accident-year effect distorts the estimated correlation between them; for one insurer it flips from positive to negative. Meyers drops the SCC after that section.
- **A caveat Meyers states.** The Bornhuetter-Ferguson and Cape Cod literature stresses adjusting premium to a level consistent with the expected losses, and no such adjustment was made here. The results also show how sensitive the BF method is to that adjustment. The CRC and later models let an actuary influence the ELR by accident year through the priors.

> [!example]- The SCC Estimate Is a Bornhuetter-Ferguson Estimate {Example}
> For accident year $10$ of Meyers' illustrative paid triangle, premium is $4{,}962$ and the paid loss at development year $1$ is $1{,}413$. The SCC posterior means are $\mathit{logelr} = -0.4033$, $\beta_1 = -1.0897$, $\sigma_1 = 0.4608$ and $\sigma_{10} = 0.1051$.
>
> Using the posterior means as a single parameter set, compute the expected value of the SCC's simulated $C_{10,10}$, and show that it is a BF estimate.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \mu_{10,1} &= 8.50956 - 0.4033 - 1.0897 \\
> > &= 7.01656 \\
> > E[\text{reported}] &= e^{7.01656 + 0.4608^2/2} \\
> > &= e^{7.12273} \\
> > &= 1{,}240 \\
> > \mu_{10,10} &= 8.50956 - 0.4033 \\
> > &= 8.10626 \\
> > E[\text{ultimate}] &= e^{8.10626 + 0.1051^2/2} \\
> > &= 3{,}334 \\
> > E[\tilde C_{10,10}] &= 3{,}334 - 1{,}240 + 1{,}413 \\
> > &= 3{,}507
> > \end{align*}
> > $$
> >
> > Meyers' simulated Estimate for the year is $3{,}506$. This is actual paid plus expected unpaid, with an expected ultimate of premium times $e^{\mathit{logelr} + \sigma_{10}^2/2} = 0.672$. The implied proportion unpaid is $V_{10} = 1 - 1{,}240/3{,}334 = 62.8\%$, the Bornhuetter-Ferguson formula with an ELR the model estimated.

> [!example]- Why One Loss Ratio Fails {Example}
> In the illustrative paid triangle, accident year $1$ developed to $3{,}912$ on premium $5{,}812$, and accident year $7$ to $5{,}684$ on premium $4{,}992$. The SCC's loss ratio is $e^{-0.4033}$ for every year. The CRC gives accident year $7$ $e^{\mathit{logelr} + \alpha_7} = e^{-0.3965 + 0.4354}$.
>
> (a) Compare the loss ratios.
>
> (b) Meyers reports $\widehat{elpd}_{loo} = -5.14$ for the SCC and $47.80$ for the CRC on this triangle. Compute each LOOIC and say which is preferred.
>
> > [!answer]-
> > **(a)**
> >
> > $$
> > \begin{align*}
> > \text{AY 1 actual} &= 3{,}912 / 5{,}812 \\
> > &= 0.673 \\
> > \text{AY 7 actual} &= 5{,}684 / 4{,}992 \\
> > &= 1.139 \\
> > \text{SCC, every year} &= e^{-0.4033} \\
> > &= 0.668 \\
> > \text{CRC, AY 7} &= e^{0.0389} \\
> > &= 1.040
> > \end{align*}
> > $$
> >
> > The SCC fits accident year $1$ but must give accident year $7$ the same $0.668$. Its Estimate for that year is $4{,}645$, against an actual $5{,}684$. The misfit lands in the residuals, which is why the SCC's $\sigma_d$ are much larger than the CRC's (five times at development year 10) and its accident-year box plots stray from 0.
> >
> > **(b)**
> >
> > $$
> > \begin{align*}
> > \text{LOOIC}_{SCC} &= -2 \times (-5.14) \\
> > &= 10.28 \\
> > \text{LOOIC}_{CRC} &= -2 \times 47.80 \\
> > &= -95.60
> > \end{align*}
> > $$
> >
> > The lower LOOIC, the CRC's, is preferred by a wide margin. The SCC has fewer effective parameters ($p_{loo} = 8.75$ against $14.97$), but that saving cannot make up for a structure that does not fit the data.
