---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:0cc8b9655f8b750fe07503362b9bf220deae8aba4402dd8499326a973fc392f4
  sources: []
  open_findings: 0
  log: .verify/Concepts/Bootstrap.md
---

The **bootstrap** estimates the sampling variability of a statistic by resampling the observed data *with replacement* $B$ times and looking at the spread of the statistic across the resamples. It needs no distributional assumption and no formula for the standard error.

> $$\mathrm{SE}_B(\hat{\alpha}) = \sqrt{\frac{1}{B-1}\sum_{r=1}^{B}\left(\hat{\alpha}^{*r} - \bar{\hat{\alpha}}^{*}\right)^{2}}$$

- Each bootstrap sample has the **same size $n$** as the original, drawn with replacement — so some observations appear several times and others not at all
- The probability a given observation misses a particular resample is $\left(1 - \tfrac1n\right)^n \to e^{-1} \approx 0.368$, so each resample uses about **63.2%** of the distinct observations. Those left out are the [[Out-of-Bag Error|out-of-bag]] set
- It is the resampling engine underneath [[Bagging]] and [[Random Forest]]
- **Percentile confidence interval**: the $2.5$th and $97.5$th percentiles of the $\hat\alpha^{*r}$ give a 95% interval
- Distinct from [[Cross-Validation]]: the bootstrap measures *how variable an estimate is*, cross-validation measures *how well a model predicts*

![[Media/Figures/Bootstrap.svg|340]]

> [!example]- Bootstrapping a Tail Quantile {Example}
> An actuary needs a standard error for the 95th percentile of a 250-claim severity sample. No parametric fit is assumed. How is it obtained, and roughly how many claims does each resample actually use?
>
> > [!answer]-
> > Draw $B = 1{,}000$ samples of 250 claims with replacement, compute the 95th percentile of each, and take the standard deviation of those 1,000 values — that is $\mathrm{SE}_B$.
> > Each resample contains about $0.632(250) \approx 158$ **distinct** claims; the remaining ~92 are duplicates of ones already drawn. A percentile interval comes straight from the 25th and 975th ordered values.
