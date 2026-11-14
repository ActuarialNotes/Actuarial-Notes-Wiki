---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:51d56867c928735bc31474113523f0362114a5e6d04363c65250ef812abf829d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Correlated Accident Year Model.md
---

The **Correlated Accident Year Model** (CAY) is Meyers' Bayesian model for **incurred** loss triangles that correlates successive [[Accident Year|accident years]]. It adds to the [[Cross Classified Model|cross classified (CRC) model]] a term proportional to the previous year's log residual in the same development year, which thickens the tails of the predicted distribution.

The cumulative incurred loss $C_{w,d}$ of accident year $w$ at development year $d$, for $w, d = 1, \ldots, 10$, is

> $$C_{w,d} \sim \text{lognormal}(\mu_{w,d},\ \sigma_d)$$

The log mean of accident year 1 is

> $$\mu_{1,d} = \log(\text{Premium}_1) + \mathit{logelr} + \beta_d$$

and for $w > 1$ it is

> $$
> \begin{aligned}
> \mu_{w,d} = {} & \log(\text{Premium}_w) + \mathit{logelr} + \alpha_w + \beta_d \\
> & + \rho \cdot \big(\log(C_{w-1,d}) - \mu_{w-1,d}\big)
> \end{aligned}
> $$

- $\text{Premium}_w$ is the premium of accident year $w$.
- $\mathit{logelr}$ is the log of the expected loss ratio, common to all accident years.
- $\alpha_w$ is the level of accident year $w$, with $\alpha_1 = 0$.
- $\beta_d$ is the development parameter of year $d$, with $\beta_{10} = 0$.
- $\rho$ is the share of the previous year's log residual carried into this year.
- $\sigma_d$ is the standard deviation of the log loss at development year $d$, with $\sigma_1 > \sigma_2 > \cdots > \sigma_{10}$.

The priors in [[Stochastic Loss Reserving Using Bayesian MCMC Models (Meyers - 2019)|Meyers (2019)]] are:

- $\mathit{logelr} \sim \text{normal}(-0.4, \sqrt{10})$.
- $\alpha_w \sim \text{normal}(0, \sqrt{10})$ for $w = 2, \ldots, 10$.
- $\beta_d \sim \text{normal}(0, \sqrt{10})$ for $d = 1, \ldots, 9$.
- $\rho = 2\rho_{pos} - 1$ with $\rho_{pos} \sim \text{beta}(2, 2)$, so $\rho$ can take any value in $(-1, 1)$ and is centred on $0$.
- $\sigma_d^2 = \sum_{i=d}^{10} a_i$, with $a_i \sim \text{uniform}(0, 1)$.

The model does not favour a sign for $\rho$, and $\rho = 0$ gives back the CRC model.

## Correlation between accident years

A proposition credited to John Major gives the [[Correlation Coefficient|correlation]] between the log losses of adjacent accident years, which is

> $$\operatorname{Corr}\big[\log C_{w,d},\ \log C_{w-1,d}\big] = \frac{\rho}{1+\rho^2}$$

Accident years two or more apart are uncorrelated, because $\log C_{w,d}$ carries only its own shock and $\rho$ times the previous year's shock. The proof also gives $\mathrm{Var}[\log C_{w,d}] = \sigma_d^2(1+\rho^2)$. The function $\rho/(1+\rho^2)$ increases on $(-1, 1)$ and approaches $\tfrac12$ as $\rho \to 1$, so the adjacent-year correlation is always less than $0.5$ in size. For $\rho$ near zero, the usual case, the two are almost equal.

> [!example]- Meyers' illustrative incurred triangle has a posterior mean of $\rho = 0.1709$. What correlation does that imply between adjacent accident years? {Example}
> - $1 + 0.1709^2 = 1.0292$.
> - The correlation of the log losses is $0.1709 / 1.0292 = 0.166$.
> - Years two apart are uncorrelated.

## The light tail it corrects

The [[Mack Chain Ladder Model|Mack]] and CRC models both predict a tail that is too light on incurred losses, and a [[Correlation|positive correlation]] between accident years thickens it. The years must be simulated in order, because each year's log mean uses the previous year's loss. Accident year 1's development-year-10 loss is known. For $w \geq 3$, the simulated $\tilde C_{w-1,10}$ feeds $\mu_{w,10}$, so a high draw in one year pulls the next year up.

> [!example]- What is the expected $C_{2,10}$ under this posterior draw, and under the CRC model? {Example}
> Two accident years each have premium $10{,}000$. The posterior draw has $\mathit{logelr} = -0.40$, $\alpha_2 = 0.05$, $\beta_{10} = 0$, $\sigma_{10} = 0.02$ and $\rho = 0.30$. Accident year 1 is fully developed at $C_{1,10} = 7{,}300$.
>
> > [!answer]-
> > - $\mu_{1,10} = \ln 10{,}000 - 0.40 = 8.81034$.
> > - Accident year 1's log residual is $\ln 7{,}300 - 8.81034 = 8.89563 - 8.81034 = 0.08529$.
> > - $\mu_{2,10} = 8.81034 + 0.05 + 0.30 \times 0.08529 = 8.88593$.
> > - $E[C_{2,10}] = e^{8.88593 + 0.02^2/2} = 7{,}231$.
> > - With $\rho = 0$ the log mean is $8.86034$, and the expected loss is $e^{8.86034 + 0.0002} = 7{,}048$.
> > - $30\%$ of year 1's residual carries into year 2, and $e^{0.30 \times 0.08529} = 1.026$ is a $2.6\%$ increase. Over many draws the years move up and down together, which widens the distribution of the total.

For the illustrative insurer, the posterior mean of $\rho$ is $0.1709$, with a wide posterior (standard deviation $0.2071$). The standard error of the total rises to $1{,}859$ from the CRC's $1{,}642$. $\widehat{elpd}_{loo}$ still favours CRC for this triangle ($70.97$ against $68.65$).

## Validation on 200 triangles

- Positive mean $\rho$s are an overwhelming majority, and CAY tends to raise the standard error.
- The [[PP Plot|p-p plots]] improve noticeably for Commercial Auto, Personal Auto and Workers' Compensation, and are almost unchanged for Other Liability. The combined plot is still just outside the band ($D = 10.8$ against $9.6$), and Meyers notes the model still appears a bit light in the tails.
- $\widehat{elpd}_{loo}$ favours CAY over CRC in only $26$ of $200$ triangles, but $\widehat{elpd}_{test}$ on the lower triangles favours it in $121$. The wide posterior of $\rho$ makes the two hard to tell apart from the upper triangle alone, so the choice of CAY rests mainly on its reputation.

CAY is the incurred half of Meyers' [[Integrated Paid and Incurred Model|integrated paid and incurred model]], which shares $\mathit{logelr}$ and $\alpha_w$ with a [[Changing Settlement Rate Model|CSR model]] of the paid triangle. One suggested refinement lets $\rho$ decay exponentially toward zero as $d$ increases. The 2015 edition's [[Correlated Chain Ladder Model|correlated chain ladder (CCL) model]] has the same $\rho$ term, with a $\text{uniform}(-1, 1)$ prior on $\rho$.

> [!trap] Reading $\rho$ as the correlation between accident years
> $\rho$ is the weight on the previous year's residual. The correlation it creates between adjacent years' log losses is $\rho/(1+\rho^2)$, always below $0.5$ in size, and years further apart are uncorrelated.
