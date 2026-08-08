The **full credibility standard** is the volume of experience at which [[Limited Fluctuation Credibility|classical credibility]] assigns $Z = 1$. It is the smallest expected claim count $n_F$ for which the observed mean stays within $\pm k$ of the true mean with probability $p$.

> $$n_F = \left(\frac{z_{(1+p)/2}}{k}\right)^{2}\left(\frac{\sigma_S^{2}}{\mu_S^{2}}\right)$$
>
> $$\text{where } z_{(1+p)/2} \text{ is the standard normal quantile and } k \text{ the tolerance}$$

- $p$ is the **probability level** (how often the estimate must land inside the range) and $k$ the **range parameter** (how wide "inside" is) — the pair $(p, k)$ defines the standard, not the data
- **Frequency**, Poisson: $\sigma_N^2/\mu_N^2 = 1/\lambda$, so the standard reduces to $n_F = (z/k)^2$ expected claims
- **Severity**: $n_F = (z/k)^2 \cdot \mathrm{CV}_X^2$ claims, where $\mathrm{CV}_X = \sigma_X/\mu_X$ is the [[Coefficient of Variation]] of claim size
- **[[Aggregate Loss Model|Aggregate]]** loss with Poisson frequency: $n_F = (z/k)^2\left(1 + \mathrm{CV}_X^2\right)$ claims
- A standard stated in claims converts to exposures by dividing by the expected claim frequency per exposure
- Below the standard the estimate is not discarded — it is blended by [[Partial Credibility]]

![[Media/Figures/Full_Credibility_Standard.svg|340]]

> [!example]- The 1,082-Claim Standard {Example}
> An actuary wants the observed frequency to be within $\pm 5\%$ of the true frequency $90\%$ of the time. Claim counts are Poisson. How many claims are needed for full credibility?
>
> > [!answer]-
> > $p = 0.90 \Rightarrow z_{0.95} = 1.645$, and $k = 0.05$:
> > $$n_F = \left(\frac{1.645}{0.05}\right)^{2} = (32.9)^{2} = 1{,}082.4$$
> > **1,082 expected claims** — the standard quoted throughout classical credibility. Tightening to $k = 0.025$ quadruples it to 4,330 claims.

> [!example]- Adding Severity Variation {Example}
> Claim severity has mean 3,000 and standard deviation 6,000, and frequency is Poisson. Find the full-credibility standard for aggregate losses at $p = 0.90$, $k = 0.05$.
>
> > [!answer]-
> > $\mathrm{CV}_X = 6{,}000/3{,}000 = 2$, so $\mathrm{CV}_X^2 = 4$:
> > $$n_F = 1{,}082.4\,(1 + 4) = 5{,}412$$
> > **5,412 claims.** Severity variation multiplies the frequency-only standard by $1 + \mathrm{CV}_X^2$ — heavy-tailed lines need far more data to be fully credible.
