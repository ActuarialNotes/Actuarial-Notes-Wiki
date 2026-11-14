---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:6afa34a2729f46983a1e10f7b41a95a871915d29cfdebab5567116abf6a4a036
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Stochastic Cape Cod Model.md
---
The **Stochastic Cape Cod Model** (SCC) is Meyers' Bayesian version of the [[Cape Cod Method|Cape Cod]] model. It is the [[Cross Classified Model|cross classified (CRC) model]] without the accident-year parameters, so every [[Accident Year|accident year]] has the same expected loss ratio, $e^{\mathit{logelr}}$, estimated from the data by [[Markov Chain Monte Carlo|MCMC]]. The cumulative loss of accident year $w$ at development year $d$, for $w, d = 1, \ldots, 10$, is

> $$C_{w,d} \sim \text{lognormal}(\mu_{w,d},\ \sigma_d)$$

The mean of its logarithm is

> $$\mu_{w,d} = \log(\text{Premium}_w) + \mathit{logelr} + \beta_d$$

- $\text{Premium}_w$ is the premium of accident year $w$.
- $\mathit{logelr}$ is the logarithm of the expected loss ratio.
- $\beta_d$ is the development-year parameter, with $\beta_{10} = 0$.

The variance of its logarithm is

> $$\sigma_d^2 = \sum_{i=d}^{10} a_i$$

- $a_i$ is a positive parameter for each development year $i$.

The priors in [[Stochastic Loss Reserving Using Bayesian MCMC Models (Meyers - 2019)|Meyers (2019)]], Section 6, are:

- $\mathit{logelr} \sim \text{normal}(-0.4, \sqrt{10})$.
- $\beta_d \sim \text{normal}(0, \sqrt{10})$ for $d = 1, \ldots, 9$. The monograph prints a mean of 1 here, and the errata (p.23) corrects it to 0.
- $a_i \sim \text{uniform}(0, 1)$ for $i = 1, \ldots, 10$, which forces $\sigma_1^2 > \cdots > \sigma_{10}^2$.

## Relation to the Bornhuetter-Ferguson method

In the [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] method, the ultimate loss is the current loss plus premium times a judgmentally selected expected loss ratio (ELR) times the proportion not yet reported. For accident year $w$ it is

> $$\hat C_{w,10} = C_{w,11-w} + \text{Premium}_w \cdot \mathit{ELR} \cdot V_{11-w}$$

- $V_{11-w}$ is the proportion not yet reported at development year $11 - w$.

Stanard and Bühlmann independently proposed estimating the ELR from the data, and Bühlmann first presented it at a meeting in Cape Cod. The SCC model estimates it as $\mathit{logelr}$. From the CRC model it drops $\alpha_w$, the parameter that lets each accident year's loss ratio differ. That leaves $\mathit{logelr}$, nine $\beta_d$ and ten $a_i$.

## Simulating the outcome

For each of 10,000 posterior parameter vectors, set $\mu_{w,10} = \log(\text{Premium}_w) + \mathit{logelr}$ and simulate a loss $\tilde X_{w,10}$ at development year 10. The model's expected value of the current reported loss is subtracted and the actual current reported loss added, so the simulated ultimate for $w = 2, \ldots, 10$ is

> $$\tilde C_{w,10} = \tilde X_{w,10} - e^{\mu_{w,11-w} + \sigma_{11-w}^2/2} + C_{w,11-w}$$

- $\tilde X_{w,10} \sim \text{lognormal}(\mu_{w,10}, \sigma_{10})$.

The total is $C_{1,10} + \sum_{w=2}^{10} \tilde C_{w,10}$. This is the Bornhuetter-Ferguson structure, actual reported plus expected unreported. The CRC model simulates $C_{w,10}$ directly.

> [!example]- Is the SCC's expected outcome for this accident year a Bornhuetter-Ferguson estimate? {Example}
> For accident year 10 of Meyers' illustrative paid triangle, premium is 4,962 and the paid loss at development year 1 is 1,413. The SCC posterior means are $\mathit{logelr} = -0.4033$, $\beta_1 = -1.0897$, $\sigma_1 = 0.4608$ and $\sigma_{10} = 0.1051$. Use the posterior means as a single parameter set.
>
> > [!answer]-
> > - $\log 4{,}962 = 8.50956$, so $\mu_{10,1} = 8.50956 - 0.4033 - 1.0897 = 7.01656$.
> > - The expected reported loss is $e^{7.01656 + 0.4608^2/2} = e^{7.12273} = 1{,}240$.
> > - $\mu_{10,10} = 8.50956 - 0.4033 = 8.10626$, so the expected ultimate is $e^{8.10626 + 0.1051^2/2} = 3{,}334$.
> > - The expected simulated ultimate is $3{,}334 - 1{,}240 + 1{,}413 = 3{,}507$. Meyers' simulated estimate for the year is 3,506.
> > - The expected ultimate is premium times $e^{\mathit{logelr} + \sigma_{10}^2/2} = 0.672$, and the implied proportion unpaid is $V_{10} = 1 - 1{,}240/3{,}334 = 62.8\%$.
> > - So the estimate is actual paid plus expected unpaid, the Bornhuetter-Ferguson formula with an ELR the model estimated.

## Results and validation

For the illustrative insurer (paid), $e^{\mathit{logelr}} = e^{-0.4033} = 0.668$, with a posterior standard deviation of $\mathit{logelr}$ of 0.1123 against the CRC's 0.0233. The $\sigma_d$ are much larger ($\sigma_{10} = 0.1051$ against 0.0202). The total paid estimate is 36,725 with a standard error of 3,950, against an actual 40,000 (the 83.38th percentile). The CRC gives 40,121 with a standard error of 2,487.

The SCC performed very poorly on every prospective and retrospective test:

- Its [[PP Plot|p-p plots]] fail in every line, paid and incurred. The combined $D$ is 20.8 (paid) and 23.2 (incurred) against 9.6, a "decidedly worse reputation" than the other models.
- The standardized residual box plots by accident year were the most revealing. They point to the assumption of a constant expected loss ratio across accident years.
- $\widehat{elpd}_{loo}$ favours the CRC model over the SCC for all 200 paid and all 200 incurred triangles. $\widehat{elpd}_{test}$ favours the CRC for 191 paid and 192 incurred triangles.
- When lines are paired, failing to capture the accident-year effect distorts the estimated correlation between them. For one insurer it flips from positive to negative, and Meyers drops the SCC after that section.

The Bornhuetter-Ferguson and Cape Cod literature stresses adjusting premium to a level consistent with the expected losses, and Meyers states that no such adjustment was made here. The results also show how sensitive the Bornhuetter-Ferguson method is to that adjustment. The CRC and later models let an actuary influence the ELR by accident year through the priors.

> [!example]- Why does one expected loss ratio fail on this triangle, and which model does LOOIC prefer? {Example}
> In the illustrative paid triangle, accident year 1 developed to 3,912 on premium 5,812, and accident year 7 to 5,684 on premium 4,992. The SCC's loss ratio is $e^{-0.4033}$ for every year. The CRC gives accident year 7 the loss ratio $e^{\mathit{logelr} + \alpha_7} = e^{-0.3965 + 0.4354}$. Meyers reports $\widehat{elpd}_{loo} = -5.14$ for the SCC and 47.80 for the CRC on this triangle.
>
> > [!answer]-
> > - The actual loss ratios are $3{,}912/5{,}812 = 0.673$ for accident year 1 and $5{,}684/4{,}992 = 1.139$ for accident year 7.
> > - The SCC gives every year $e^{-0.4033} = 0.668$, and the CRC gives accident year 7 $e^{0.0389} = 1.040$.
> > - The SCC fits accident year 1 but must give accident year 7 the same 0.668. Its estimate for that year is 4,645, against an actual 5,684.
> > - The misfit lands in the residuals, which is why the SCC's $\sigma_d$ are much larger than the CRC's (five times at development year 10) and its accident-year box plots stray from 0.
> > - $\text{LOOIC}_{\text{SCC}} = -2 \times (-5.14) = 10.28$ and $\text{LOOIC}_{\text{CRC}} = -2 \times 47.80 = -95.60$.
> > - The lower LOOIC, the CRC's, is preferred by a wide margin. The SCC has fewer effective parameters ($p_{loo} = 8.75$ against 14.97), but that cannot make up for a structure that does not fit the data.
