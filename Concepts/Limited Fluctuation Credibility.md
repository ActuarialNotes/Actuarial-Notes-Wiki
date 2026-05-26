**Limited Fluctuation Credibility** (also called **Classical Credibility**) assigns a credibility factor $Z \in [0,1]$ to observed data based on whether the volume of data is sufficient to meet a specified accuracy standard. The estimate is then a blend of observed experience and an external prior.

> $$\text{Estimate} = Z \cdot \bar{X} + (1-Z) \cdot \mu_0$$
>
> $$Z = \min\!\left(1,\, \sqrt{\frac{n}{n_{\text{full}}}}\right)$$

**Full credibility standard** — the number of observations $n_{\text{full}}$ required so that the observed mean is within $100r\%$ of the true mean with probability $1-\alpha$:

$$n_{\text{full}} = \left(\frac{z_{\alpha/2}}{r}\right)^2 \cdot \frac{\text{Var}(X)}{[\text{E}(X)]^2}$$

- For **claim frequency** (Poisson): $\text{Var}(X)/[E(X)]^2 = 1/\lambda$, giving $n_{\text{full}} = (z_{\alpha/2}/r)^2 / \lambda$; typically **1,082 claims** at $r=5\%$, $1-\alpha=90\%$
- For **claim severity**: $n_{\text{full}}$ depends on the coefficient of variation $\text{CV} = \sigma/\mu$
- For **aggregate losses**: $n_{\text{full}}$ combines frequency and severity CVs: $\text{CV}^2_S = \text{CV}^2_N + \text{CV}^2_X \cdot E[N]/E[N]$
- Partial credibility uses the **square root rule**: $Z = \sqrt{n/n_{\text{full}}}$ when $n < n_{\text{full}}$

> [!example]- Credibility Factor for a Small Class {Example}
> The full credibility standard for frequency is 1,082 claims. A class has 400 observed claims. Calculate the credibility factor.
>
> > [!answer]-
> > $$Z = \sqrt{\frac{400}{1{,}082}} = \sqrt{0.3697} \approx 0.608$$
> > The class has about 60.8% credibility.

> [!example]- Credibility-Weighted Rate Indication {Example}
> A territory has $Z = 0.70$. The observed loss ratio is 0.85 and the complement (prior) is 0.75. Calculate the credibility-weighted indicated loss ratio.
>
> > [!answer]-
> > $$\text{Estimate} = 0.70(0.85) + 0.30(0.75) = 0.595 + 0.225 = 0.820$$
