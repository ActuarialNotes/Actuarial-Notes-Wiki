**Partial credibility** is the weight $Z < 1$ that [[Limited Fluctuation Credibility|classical credibility]] gives to experience that falls short of the [[Full Credibility Standard]]. The square-root rule sets $Z$ so that the *credibility-weighted* estimate has the same variance the full-credibility standard was chosen to deliver.

> $$Z = \min\left(\sqrt{\frac{n}{n_F}},\; 1\right)$$

- $n$ is the observed volume and $n_F$ the [[Full Credibility Standard]], both in the same units (claims, or exposures)
- The square root, not the ratio: the standard deviation of the mean falls with $\sqrt{n}$, so halving the variance gap takes four times the data
- $Z$ multiplies the observed experience; $1 - Z$ goes to the [[Complement of Credibility]]
- Partial credibility stabilizes the estimate but is **biased toward the complement** — it makes no claim to minimize squared error, which is what [[Bühlmann Credibility]] is for
- $Z$ is capped at 1: extra data beyond the standard never earns more than full weight

![[Media/Figures/Partial_Credibility.svg|340]]

> [!example]- Credibility-Weighting a Small Class {Example}
> A rating class produced 300 claims against a full-credibility standard of 1,082. Its observed pure premium is 420; the manual (complement) pure premium is 380. Find the credibility-weighted pure premium.
>
> > [!answer]-
> > $$Z = \sqrt{\frac{300}{1{,}082}} = \sqrt{0.2773} = 0.527$$
> > $$\text{PP} = 0.527(420) + 0.473(380) = 221.3 + 179.7 = 401.0$$
> > The class gets **401**, a little over half of the way from the manual rate to its own experience.
