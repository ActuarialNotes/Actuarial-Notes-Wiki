---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:b501e9b33aa31c505ba272e85a1d8910d2947abdc9969711f32fa58235fe8527
  sources:
    - "Siegrist, Random (randomservices.org), ch.7 Set Estimation §1 Introduction: confidence level, 'the true value of theta is either in this set, or is not', long-run proportion of sets containing theta converges to 1 - alpha, sha256:e5e6cb402c737c1d63a58ef4509975633f9cfa483f8f0afa8860ff9b6dbb4ee3 — https://www.randomservices.org/random/interval/Introduction.html"
    - "Siegrist, Random, ch.7 §2 Estimation in the Normal Model: for a normal random sample, M +/- z(1 - alpha/2) sigma/sqrt(n), M +/- t_{n-1}(1 - alpha/2) S/sqrt(n), [(n-1)S^2/chi^2_{n-1}(1 - alpha/2), (n-1)S^2/chi^2_{n-1}(alpha/2)] (not symmetric about S^2); length L = 2 z sigma/sqrt(n), sha256:21c59dd27f38c17148de5af35d53d94a01c51cd4f230c81d75e91173a9917586 — https://www.randomservices.org/random/interval/Normal.html"
    - "Siegrist, Random, ch.8 §1 Introduction, 'Equivalence Between Hypothesis Test and Confidence Sets': reject H0: theta = theta0 at level alpha iff theta0 is outside the 1 - alpha confidence set, sha256:fb05a9d71b55ba113e2f71afa052bc059b35f2c5b6946012c19ecbc693faab1a — https://www.randomservices.org/random/hypothesis/Introduction.html"
    - "James, Witten, Hastie & Tibshirani, ISLR 2nd ed., §3.1.2 p.66 (PDF p.76): 95% confidence interval definition and repeated-sampling meaning, beta-hat_1 +/- 2 SE with the exact multiplier the t_{n-2} 97.5% quantile under Gaussian errors (footnote 3), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Penn State STAT 415 (2026 notes), Lesson 7 §7.2 asymptotic CI theta-hat +/- 1.96 sqrt(1/I(theta-hat)) with I the full-sample information, sha256:0c6afc848ae41251fc702348e0e8c603c5725f1f03c20b4731d789a61babbe0b — https://online.stat.psu.edu/stat415/Lesson07.html"
    - "Penn State STAT 415 (2026 notes), Lesson 10 §10.2 Linking Confidence Intervals to Hypothesis Tests (xbar +/- t_{0.025,99} s/sqrt(n); 120 outside the interval <=> rejected), sha256:4277fd734c4d2b8b297124d4f9378d1fe638d9a4c4547b2689e24a9dfa1daf96 — https://online.stat.psu.edu/stat415/Lesson10.html"
    - "Rodriguez, Generalized Linear Models (Princeton lecture notes), ch.3 §3.2.3 p.12: Wald interval beta_j +/- z_{1-alpha/2} sqrt(var(beta_j)), CIs in the link scale translated by exponentiating the boundaries, sha256:2243f2c49c0e15545740a0b4fb8d98ad8a5b3e37653c13feee545195801efedc — https://grodri.github.io/glms/notes/c3.pdf"
    - "Rodriguez, Generalized Linear Models, ch.4 §4.1.3 p.5: with the log link exp(beta_j) is a multiplicative effect on the mean, sha256:1caaa05c152c35d73ab90400c526e871016283aade13ee812c40032f6dfa8fbe — https://grodri.github.io/glms/notes/c4.pdf"
    - "CAS Exam MAS-I Tables (version 01/15/2018): t table p.16 (df 15 two-sided 0.05: 2.131; Inf row 1.960, 2.576), sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
  open_findings: 1
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
