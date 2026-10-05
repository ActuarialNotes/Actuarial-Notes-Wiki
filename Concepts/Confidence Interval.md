---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:ee4e19a034aab1f4d48e2588aa8eb5e93ad1a455e763794ae66aec2d243eea10
  sources:
    - "Siegrist, Random (randomservices.org), ch.7 §2 Estimation in the Normal Model: assumption 'random sample from the normal distribution'; T = (M - mu)/(S/sqrt n) ~ t_{n-1}, V = (n-1)S^2/sigma^2 ~ chi^2_{n-1}; M +/- z(1-alpha/2) sigma/sqrt n, M +/- t_{n-1}(1-alpha/2) S/sqrt n, [(n-1)S^2/chi^2_{n-1}(1-alpha/2), (n-1)S^2/chi^2_{n-1}(alpha/2)] with chi^2_k(p) the quantile of order p; 'Robustness': mean intervals approximately valid for large n by the CLT, variance intervals not robust, sha256:21c59dd27f38c17148de5af35d53d94a01c51cd4f230c81d75e91173a9917586 — https://www.randomservices.org/random/interval/Normal.html"
    - "NIST/SEMATECH e-Handbook of Statistical Methods §1.3.5.8 Chi-Square Test for the Variance: T = (N-1)(s/sigma0)^2, critical values chi^2_{1-alpha,N-1} / chi^2_{1-alpha/2,N-1} (lower-tail quantile notation), interval for the variance, sha256:479a6c6d7f68671d8a61d0daa073e5884a428b477d7b0308c50863c7f164d467 — https://www.itl.nist.gov/div898/handbook/eda/section3/eda358.htm"
    - "CAS Exam MAS-I Tables (version 01/15/2018): t table 'Tail areas (two-sided)' p.16 (df 15, 0.05 column: 2.131; Inf row 1.960, 2.576); 'Lower-tail areas for Chi-square distributions' p.20 (df 15: 0.025 column 6.26, 0.975 column 27.49), sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Confidence Interval.md
---

A **Confidence Interval** is a range computed from a sample that covers the unknown parameter with a stated long-run probability $1 - \alpha$. It reports the same information as a [[Hypothesis Testing|hypothesis test]] but on the parameter's own scale — the interval contains exactly those null values the test would not reject.

> $$\bar{X} \pm z_{\alpha/2}\,\frac{\sigma}{\sqrt{n}} \qquad (\sigma \text{ known})$$

> $$\bar{X} \pm t_{\alpha/2,\,n-1}\,\frac{S}{\sqrt{n}} \qquad (\sigma \text{ estimated})$$

- Both intervals assume a random sample from a **normal** population. The $z$ interval is then exact, and so is the $t$ interval, because $(\bar{X} - \mu)/(S/\sqrt{n})$ has a [[Student's t-Distribution|$t$ distribution]] with $n - 1$ degrees of freedom. For a non-normal population both are only approximate, through the [[Central Limit Theorem (CLT)|CLT]], and need a larger $n$ the further the population is from normal
- The general form is $\hat\theta \pm (\text{critical value}) \times \text{SE}(\hat\theta)$, where the critical value comes from the estimator's [[Sampling Distribution]]
- The **coverage** statement is about the procedure, not one interval: $95\%$ of intervals built this way contain $\theta$. Once computed, a given interval either contains $\theta$ or does not
- Width shrinks like $1/\sqrt{n}$ and grows with confidence — going from $95\%$ to $99\%$ multiplies the half-width by $2.576/1.96 = 1.31$
- Use $t_{n-1}$ whenever $\sigma$ is replaced by $S$; the extra width is the price of estimating the spread, and it matters most for small $n$. Here $z_{\alpha/2}$ and $t_{\alpha/2,\,n-1}$ are **upper**-tail points (area $\alpha/2$ above them). The CAS MAS-I $t$ table is headed by *two-sided* tail areas, so $t_{\alpha/2,\,n-1}$ is in the column headed $\alpha$: $t_{0.025,\,15} = 2.131$ is under $0.05$
- For a variance, the interval is built from the [[Chi-Squared Distribution|$\chi^2$ distribution]], since $(n-1)S^2/\sigma^2 \sim \chi^2_{n-1}$ for a normal sample, and is **asymmetric**: $\left(\frac{(n-1)S^2}{\chi^2_{n-1}(1-\alpha/2)},\ \frac{(n-1)S^2}{\chi^2_{n-1}(\alpha/2)}\right)$. Here $\chi^2_{n-1}(p)$ is the point with **lower**-tail area $p$, which is the CAS MAS-I chi-square table's column $p$, so the larger point gives the lower endpoint. For $n = 16$ at $95\%$ the df $15$ row gives $\left(\frac{15S^2}{27.49},\ \frac{15S^2}{6.26}\right)$. This interval needs the normal population at every $n$: no CLT rescues it
- For an [[Maximum Likelihood Estimation|MLE]], the large-sample interval $\hat\theta \pm z_{\alpha/2}/\sqrt{n I(\hat\theta)}$ uses the [[Fisher Information]]; for a GLM coefficient it is $\hat\beta_j \pm z_{\alpha/2}\text{SE}(\hat\beta_j)$, and exponentiating both endpoints gives an interval for the multiplicative rating factor

![[Media/Figures/Confidence_Interval.svg|340]]

> [!example]- Interval for a Mean with Unknown Variance {Example}
> A sample of $n = 16$ claims, assumed drawn from a normal population, has $\bar{x} = 8{,}400$ and $s = 1{,}200$. Build a $95\%$ confidence interval for $\mu$, given $t_{0.025, 15} = 2.131$.
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
