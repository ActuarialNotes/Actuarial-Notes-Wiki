---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:94fb71a9c84e14a31c9a768fb76b28cb7ea86b10053310035343f159607156d1
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Critical Value.md
---

A **critical value** $c$ is the boundary of the rejection region in [[Hypothesis Testing|a hypothesis test]]: the percentile of the test statistic's [[Sampling Distribution|sampling distribution]] under $H_0$ chosen so that, if $H_0$ is true, the statistic lands beyond it with probability equal to the significance level $\alpha$.

> $$P\left(T \ge c \mid H_0\right) = \alpha$$

- The block is for an upper-tailed test; a lower-tailed test rejects when $T \le c$ with $P(T \le c \mid H_0) = \alpha$, and a two-sided test splits $\alpha/2$ into each tail. Rejecting a true $H_0$ is a [[Type I Error]], so $\alpha$ is its probability by construction.
- **Notation.** Here $z_\alpha$, $t_{\alpha,\nu}$, $\chi^2_{\alpha,\nu}$ and $F_{\alpha,\nu_1,\nu_2}$ are *upper* $\alpha$ points — the value with probability $\alpha$ above it. Tables differ, so check which tail yours tabulates.
- **Tests on a mean.** Use $Z = \dfrac{\bar X - \mu_0}{\sigma/\sqrt n}$ against $z_\alpha$ when $\sigma$ is known ($z_{0.05} = 1.645$, $z_{0.025} = 1.960$). Use $T = \dfrac{\bar X - \mu_0}{S/\sqrt n}$ against $t_{\alpha,\,n-1}$ when $\sigma$ is estimated from a [[Normal Distribution|normal]] sample.
- **Tests on a variance.** Use $\chi^2 = (n-1)S^2/\sigma_0^2$ against $\chi^2_{\alpha,\,n-1}$. The chi-square is skewed, so a two-sided test needs two different critical values, $\chi^2_{1-\alpha/2,\,n-1}$ and $\chi^2_{\alpha/2,\,n-1}$, not $\pm$ one number. For two variances, $F = S_1^2/S_2^2$ is compared with $F_{\alpha,\,n_1-1,\,n_2-1}$. The lower point comes from $F_{1-\alpha,\,\nu_1,\,\nu_2} = 1/F_{\alpha,\,\nu_2,\,\nu_1}$.
- **Same decision as the [[p-Value]].** The statistic is beyond the critical value exactly when the p-value is below $\alpha$. A two-sided test at level $\alpha$ rejects $\mu_0$ exactly when $\mu_0$ lies outside the $1-\alpha$ [[Confidence Interval]]. Moving the critical value trades [[Type II Error]] against Type I error, which is what sets the [[Power of a Test|power]].

> [!example]- t-Test on Mean Claim Severity {Example}
> After a change in repair costs, a sample of $n = 16$ auto physical damage claims has mean \$5,400 and sample standard deviation \$800. Assuming severities are normal, test $H_0: \mu = 5{,}000$ against $H_1: \mu > 5{,}000$ at $\alpha = 0.05$ and at $\alpha = 0.01$.
>
> > [!answer]-
> > $\sigma$ is unknown, so use the $t$ distribution with $15$ degrees of freedom.
> >
> > $$
> > \begin{align*}
> > T &= \frac{5{,}400 - 5{,}000}{800/\sqrt{16}} \\
> > &= \frac{400}{200} \\
> > &= 2.00
> > \end{align*}
> > $$
> >
> > - At $\alpha = 0.05$: $t_{0.05,15} = 1.753$. Since $2.00 > 1.753$, **reject** $H_0$.
> > - At $\alpha = 0.01$: $t_{0.01,15} = 2.602$. Since $2.00 < 2.602$, **do not reject**.
> >
> > The evidence of higher severity is significant at 5% but not at 1%, which places the p-value between them (it is about $0.032$).

> [!example]- Chi-Square Test for Increased Volatility {Example}
> A pricing model assumes claim severities have standard deviation \$1,000. A sample of $n = 25$ recent claims has $s = 1{,}300$. Assuming normality, test $H_0: \sigma^2 = 1{,}000^2$ against $H_1: \sigma^2 > 1{,}000^2$ at $\alpha = 0.05$ and $\alpha = 0.01$.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \chi^2 &= \frac{(n-1)s^2}{\sigma_0^2} \\
> > &= \frac{24 \times 1{,}300^2}{1{,}000^2} \\
> > &= 40.56
> > \end{align*}
> > $$
> >
> > With $24$ degrees of freedom, $\chi^2_{0.05,24} = 36.415$ and $\chi^2_{0.01,24} = 42.980$.
> >
> > - At $5\%$: $40.56 > 36.415$, so **reject** $H_0$.
> > - At $1\%$: $40.56 < 42.980$, so **do not reject**.
> >
> > At the usual 5% level the data say severity is more volatile than the model assumes — a reason to revisit any risk load built on the old standard deviation.
