---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:0913e70c900027a84031c5c41fba0d59b860bd9017fef183d1b74413471c4a61
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Correlated Accident Year Model.md
---

**Correlated Accident Year Model** (CAY) is Meyers' Bayesian model for **incurred** loss triangles that correlates successive [[Accident Year|accident years]]. It adds to the [[Cross Classified Model|cross classified (CRC) model]] a term proportional to the previous year's log residual in the same development year, and so thickens the tails of the predicted distribution.

> $$\mu_{1,d} = \log(\text{Premium}_1) + \mathit{logelr} + \beta_d$$

> $$
> \begin{aligned}
> \mu_{w,d} = {} & \log(\text{Premium}_w) + \mathit{logelr} + \alpha_w + \beta_d \\
> & + \rho \cdot \big(\log(C_{w-1,d}) - \mu_{w-1,d}\big), \quad w > 1
> \end{aligned}
> $$

> $$C_{w,d} \sim \text{lognormal}(\mu_{w,d},\ \sigma_d)$$

- $C_{w,d}$ is the cumulative incurred loss of accident year $w$ at development year $d$ ($w, d = 1, \dots, 10$). The priors in [[Stochastic Loss Reserving Using Bayesian MCMC Models (Meyers - 2019)|Meyers (2019)]] are:
    - $\mathit{logelr} \sim \text{normal}(-0.4, \sqrt{10})$
    - $\alpha_w \sim \text{normal}(0, \sqrt{10})$ for $w = 2, \dots, 10$, with $\alpha_1 = 0$
    - $\beta_d \sim \text{normal}(0, \sqrt{10})$ for $d = 1, \dots, 9$, with $\beta_{10} = 0$
    - $\rho = 2\rho_{pos} - 1$ with $\rho_{pos} \sim \text{beta}(2, 2)$, so $\rho$ can take any value in $(-1, 1)$ and is centred on $0$
    - $\sigma_d^2 = \sum_{i=d}^{10} a_i$ with $a_i \sim \text{uniform}(0, 1)$, so $\sigma_1^2 > \dots > \sigma_{10}^2$
- **The correlation it creates.** A proposition credited to John Major gives the [[Correlation Coefficient|correlation]] between the log losses of accident years $k$ apart. Its proof also gives $\mathrm{Var}[\log C_{w,d}] = \sigma_d^2(1+\rho^2)$.

> $$\operatorname{Corr}\big[\log C_{w,d},\ \log C_{w-k,d}\big] = \begin{cases} \dfrac{\rho}{1+\rho^2} & k = 1 \\[6pt] 0 & k > 1 \end{cases}$$

- **What it fixes.** The [[Mack Chain Ladder Model|Mack]] and CRC models both predict a tail that is **too light** on incurred losses, and a [[Correlation|positive correlation]] between accident years thickens it. The model does not favor a sign for $\rho$, and $\rho = 0$ gives back the CRC model.
- **Simulating the outcome.** The years must be simulated in order, because each year's log mean uses the previous year's loss. Accident year 1's development-year-10 loss is known. For $w \geq 3$, the simulated $\tilde C_{w-1,10}$ feeds $\mu_{w,10}$, so a high draw in one year pulls the next year up.
- **Results for the illustrative insurer.** The posterior mean of $\rho$ is $0.1709$, with a wide posterior (standard deviation $0.2071$). The standard error of the total rises to $1{,}859$ from the CRC's $1{,}642$. $\widehat{elpd}_{loo}$ still favors CRC for this triangle ($70.97$ against $68.65$).
- **Validation** on 200 triangles:
    - Positive mean $\rho$s are an overwhelming majority, and CAY tends to raise the standard error.
    - The [[PP Plot|p-p plots]] improve noticeably for Commercial Auto, Personal Auto and Workers' Compensation, and are almost unchanged for Other Liability. The combined plot is still just outside the band ($D = 10.8$ against $9.6$), and Meyers notes the model still appears a bit light in the tails.
    - $\widehat{elpd}_{loo}$ favors CAY over CRC in only $26$ of $200$ triangles, but $\widehat{elpd}_{test}$ on the lower triangles favors it in $121$. The wide posterior of $\rho$ makes the two hard to tell apart from the upper triangle alone, so the choice of CAY rests mainly on its **reputation**.
- **Where it is used next.** CAY is the incurred half of Meyers' [[Integrated Paid and Incurred Model|integrated paid and incurred model]], which shares $\mathit{logelr}$ and $\alpha_w$ with a [[Changing Settlement Rate Model|CSR model]] of the paid triangle. One suggested refinement lets $\rho$ decay exponentially toward zero as $d$ increases.
- **First edition.** The 2015 edition's [[Correlated Chain Ladder Model|correlated chain ladder (CCL) model]] has the same $\rho$ term, with a $\text{uniform}(-1, 1)$ prior on $\rho$.

> [!example]- A Good Year Pulls the Next One Up {Example}
> Two accident years each have premium $10{,}000$. The posterior draw has $\mathit{logelr} = -0.40$, $\alpha_2 = 0.05$, $\beta_{10} = 0$, $\sigma_{10} = 0.02$ and $\rho = 0.30$. Accident year $1$ is fully developed at $C_{1,10} = 7{,}300$.
>
> Compute $\mu_{2,10}$ and the expected $C_{2,10}$, and compare with the CRC model ($\rho = 0$) at the same parameters.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \mu_{1,10} &= \ln 10{,}000 - 0.40 \\
> > &= 8.81034 \\
> > \ln 7{,}300 - \mu_{1,10} &= 8.89563 - 8.81034 \\
> > &= 0.08529 \\
> > \mu_{2,10} &= 8.81034 + 0.05 + 0.30 \times 0.08529 \\
> > &= 8.88593 \\
> > E[C_{2,10}] &= e^{8.88593 + 0.02^2/2} \\
> > &= 7{,}231
> > \end{align*}
> > $$
> >
> > With $\rho = 0$ the log mean is $8.86034$ and the expected loss is $e^{8.86034 + 0.0002} = 7{,}048$.
> >
> > Accident year $1$ came in $0.085$ above its log mean, and $30\%$ of that carries into year $2$: $e^{0.30 \times 0.08529} = 1.026$, a $2.6\%$ increase. Over thousands of draws the years move up and down together, which widens the distribution of the total.

> [!example]- How Correlated Are Adjacent Years? {Example}
> (a) Meyers' illustrative incurred triangle has a posterior mean of $\rho = 0.1709$. What correlation does that imply between the log losses of adjacent accident years, and between years two apart?
>
> (b) What is the largest adjacent-year correlation any CAY model can produce?
>
> > [!answer]-
> > **(a)**
> >
> > $$
> > \begin{align*}
> > \operatorname{Corr} &= \frac{0.1709}{1 + 0.1709^2} \\
> > &= \frac{0.1709}{1.0292} \\
> > &= 0.166
> > \end{align*}
> > $$
> >
> > Years two apart are uncorrelated. In the proof, $\log C_{w,d}$ carries only its own shock and $\rho$ times the previous year's shock, so years $w$ and $w-2$ share no shock.
> >
> > **(b)** $\rho/(1+\rho^2)$ increases on $(-1, 1)$ and approaches $1/2$ as $\rho \to 1$. So the adjacent-year correlation of log losses is always less than $0.5$ in size, even though $\rho$ itself can approach $1$. For $\rho$ near zero the two are almost equal, which is the usual case.
