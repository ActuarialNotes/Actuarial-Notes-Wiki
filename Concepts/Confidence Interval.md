---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b501e9b33aa31c505ba272e85a1d8910d2947abdc9969711f32fa58235fe8527
  sources: []
  open_findings: 0
  log: .verify/Concepts/Confidence Interval.md
---

A **Confidence Interval** is a range computed from a sample that covers the unknown parameter with a stated long-run probability $1 - \alpha$. It reports the same information as a [[Hypothesis Testing|hypothesis test]] but on the parameter's own scale — the interval contains exactly those null values the test would not reject.

> $$\bar{X} \pm z_{\alpha/2}\,\frac{\sigma}{\sqrt{n}} \qquad (\sigma \text{ known})$$

> $$\bar{X} \pm t_{\alpha/2,\,n-1}\,\frac{S}{\sqrt{n}} \qquad (\sigma \text{ estimated})$$

- The general form is $\hat\theta \pm (\text{critical value}) \times \text{SE}(\hat\theta)$, where the critical value comes from the estimator's [[Sampling Distribution]]
- The **coverage** statement is about the procedure, not one interval: $95\%$ of intervals built this way contain $\theta$. Once computed, a given interval either contains $\theta$ or does not
- Width shrinks like $1/\sqrt{n}$ and grows with confidence — going from $95\%$ to $99\%$ multiplies the half-width by $2.576/1.96 = 1.31$
- Use $t_{n-1}$ whenever $\sigma$ is replaced by $S$; the extra width is the price of estimating the spread, and it matters most for small $n$
- For a variance, the interval is built from the $\chi^2$ distribution and is **asymmetric**: $\left(\frac{(n-1)S^2}{\chi^2_{\alpha/2}},\ \frac{(n-1)S^2}{\chi^2_{1-\alpha/2}}\right)$
- For an [[Maximum Likelihood Estimation|MLE]], the large-sample interval $\hat\theta \pm z_{\alpha/2}/\sqrt{n I(\hat\theta)}$ uses the [[Fisher Information]]; for a GLM coefficient it is $\hat\beta_j \pm z_{\alpha/2}\text{SE}(\hat\beta_j)$, and exponentiating both endpoints gives an interval for the multiplicative rating factor

![[Media/Figures/Confidence_Interval.svg|340]]

> [!example]- Interval for a Mean with Unknown Variance {Example}
> A sample of $n = 16$ claims has $\bar{x} = 8{,}400$ and $s = 1{,}200$. Build a $95\%$ confidence interval for $\mu$, given $t_{0.025, 15} = 2.131$.
>
> > [!answer]-
> > $$\text{SE} = \frac{s}{\sqrt{n}} = \frac{1{,}200}{4} = 300$$
> > $$8{,}400 \pm 2.131(300) = 8{,}400 \pm 639 = (7{,}761,\ 9{,}039)$$
> > Because $8{,}000$ lies inside the interval, a two-sided test of $H_0: \mu = 8{,}000$ at $\alpha = 0.05$ would **not** reject.

> [!example]- From a Coefficient to a Rating Factor {Example}
> A log-link GLM gives $\hat\beta = 0.35$ for "urban territory" with $\text{SE} = 0.12$. Give a $95\%$ interval for the multiplicative effect on expected claim frequency.
>
> > [!answer]-
> > On the linear-predictor scale: $0.35 \pm 1.96(0.12) = (0.115,\ 0.585)$.
> > Exponentiating the endpoints:
> > $$\left(e^{0.115},\ e^{0.585}\right) = (1.12,\ 1.80)$$
> > Urban risks are estimated to have $12\%$ to $80\%$ higher frequency. The interval excludes $1.00$, so the effect is significant at $5\%$ — but it is wide enough that the indicated relativity is far from precisely known.
