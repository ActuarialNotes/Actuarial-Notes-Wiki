---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:44acc5a65c120c1c4876ac5c0dfd071210666dd1f1db71699812e0683b406c66
  sources: []
  open_findings: 0
  log: .verify/Concepts/Power of a Test.md
---

The **Power of a Test** is the probability it rejects the null hypothesis when the null is false — the chance of detecting a real effect. Power is the complement of the [[Type II Error]] probability $\beta$, and it is a *function* of the true parameter value, not a single number.

> $$\text{Power}(\theta) = P(\text{reject } H_0 \mid \theta) = 1 - \beta(\theta)$$

> $$\alpha = \text{Power}(\theta_0) = P(\text{reject } H_0 \mid H_0 \text{ true})$$

- Power rises with: a **larger sample** $n$, a **larger true effect** $|\theta - \theta_0|$, a **smaller** $\sigma$, and a **larger** $\alpha$
- The trade-off with [[Type I Error]] is unavoidable at fixed $n$: lowering $\alpha$ shrinks the rejection region and so lowers power. Only more data improves both
- The **power function** evaluated at $\theta_0$ equals the significance level $\alpha$; plotted against $\theta$ it rises from $\alpha$ toward $1$ as the truth moves away from $H_0$
- Among all level-$\alpha$ tests of a simple null against a simple alternative, the [[Likelihood Ratio Test]] has the highest power — the **Neyman–Pearson lemma**
- "Fail to reject" is not "accept": with low power, a null that is badly wrong still survives most of the time. Reporting a [[Confidence Interval]] shows what the test could and could not have ruled out
- Power calculations are how sample size gets set in advance — solve $\text{Power}(\theta_1) = 0.80$ for $n$ at the smallest effect worth detecting

![[Media/Figures/Power_of_a_Test.svg|340]]

> [!example]- Computing Power for a Mean {Example}
> Test $H_0: \mu = 5{,}000$ vs $H_1: \mu > 5{,}000$ at $\alpha = 0.05$ using $n = 100$ claims with known $\sigma = 800$. Find the power when the true mean is $\mu = 5{,}200$.
>
> > [!answer]-
> > The test rejects when $\bar{X} > 5{,}000 + 1.645\dfrac{800}{\sqrt{100}} = 5{,}000 + 131.6 = 5{,}131.6$.
> > If $\mu = 5{,}200$, then $\bar{X} \sim N(5{,}200, 80^2)$:
> > $$\text{Power} = P(\bar{X} > 5{,}131.6) = P\!\left(Z > \frac{5{,}131.6 - 5{,}200}{80}\right) = P(Z > -0.855) \approx 0.804$$
> > So $\beta \approx 0.196$: about one time in five a $200$ shift would be missed.

> [!example]- Sample Size for a Target Power {Example}
> With $\sigma = 800$ and $\alpha = 0.05$ one-sided, how many claims are needed for $90\%$ power against $\mu = 5{,}200$?
>
> > [!answer]-
> > $$n \ge \left(\frac{(z_\alpha + z_\beta)\,\sigma}{\mu_1 - \mu_0}\right)^{2} = \left(\frac{(1.645 + 1.282)(800)}{200}\right)^{2} = (11.71)^2 \approx 137.1$$
> > Take $n = 138$. Note that raising power from $80\%$ to $90\%$ costs about $38$ extra claims — power is expensive near the top of the curve.
