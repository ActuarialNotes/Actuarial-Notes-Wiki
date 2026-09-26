---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5f6943f75a29baba55d42a387c3b14b284b3fd2a3d54b6ae2d52c06014509ad1
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Statistical Significance.md
---

**Statistical Significance** is the judgement that an observed effect is too large to be plausibly produced by random variation if the true effect were zero. The effect might be a rate class's difference in loss cost, a GLM coefficient, or the improvement from adding a variable. In classification ratemaking it is the first actuarial test of whether a [[Rating Class|rate class]] has earned its own rate.

> $$z = \frac{\hat{\beta}}{\mathrm{SE}(\hat{\beta})}$$

> $$F = \frac{D_S - D_B}{(\text{added parameters}) \times \hat{\phi}_B}$$

- **One level at a time.** With a log link, a class coefficient $\hat{\beta}$ is a relativity of $e^{\hat{\beta}}$, and the [[p-Value|p-value]] behind $z$ is the chance of an estimate that far from zero if the class truly had no effect. The 95% [[Confidence Interval|confidence interval]] is $\hat{\beta} \pm 1.96\,\mathrm{SE}$, and exponentiating it gives an interval for the class's relativity, and so for its [[Loss Cost|loss cost]].
- **Choose the base level carefully.** A categorical level's significance is measured **against the base level**. A sparse base widens every other level's interval, so the [[Generalized Linear Models for Insurance Rating (Goldburd et al. - 2020)|GLM monograph]] advises a base level with plenty of data.
- **A whole variable.** The $F$-statistic compares nested GLMs using the unscaled [[Deviance|deviances]] $D$ of the small ($S$) and big ($B$) models and the big model's dispersion estimate $\hat{\phi}_B$. It is referred to an $F$ distribution with (added parameters, $n - p_B$) degrees of freedom. A categorical variable with $m$ levels adds $m - 1$ parameters. When $\phi$ is known (Poisson), the deviance drop is compared with $\chi^2$ instead (the [[Likelihood Ratio Test]]).
- **Classes without a model.** Pearson's $\chi^2 = \sum (O - E)^2 / E$ compares each class's observed claim count with its expected count if every class had the same frequency. It has (classes $-\,1$) degrees of freedom.
- **Significance is not the whole test.**
  - A 5% threshold admits roughly one useless variable in twenty when many are tried, and the monograph warns there is no "magic" p-value.
  - A class can be significant yet not [[Credibility|credible]] enough to use at face value.
  - A non-significant result is not proof of no effect; it may only need more data.
  - [[ASOP 12 - Risk Classification (ASB - 2005)|ASOP No. 12]] asks that a risk characteristic be related to expected outcomes, though a cause-and-effect relationship need not be shown. Operational and legal criteria still apply.

> [!example]- Are Two Rate Classes Different from the Base? {Example}
> A frequency GLM (log link) gives Class B $\hat{\beta} = 0.182$ ($\mathrm{SE} = 0.060$) and Class C $\hat{\beta} = 0.095$ ($\mathrm{SE} = 0.070$), both relative to the base class. Test each at 5% and give 95% intervals for the relativities.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > z_B &= 0.182 / 0.060 \\
> > &= 3.03 \\[4pt]
> > z_C &= 0.095 / 0.070 \\
> > &= 1.36
> > \end{align*}
> > $$
> >
> > **Class B** has $p = 0.002$. Its relativity is $e^{0.182} = 1.20$ with 95% interval $[e^{0.064}, e^{0.300}] = [1.07, 1.35]$. It is significant, and the whole interval lies above $1$.
> >
> > **Class C** has $p = 0.17$. Its relativity is $1.10$ with interval $[0.96, 1.26]$, which includes $1.00$. The data cannot tell Class C apart from the base. Either combine it with the base or credibility-weight its indication. Don't reject a $+10\%$ effect outright; there simply isn't enough data yet to confirm it.

> [!example]- Chi-Square Test of Class Frequencies {Example}
> Three classes have $4{,}000$, $3{,}000$ and $3{,}000$ exposures and $220$, $150$ and $130$ claims. Are the frequencies significantly different at 5%?
>
> > [!answer]-
> > The overall frequency is $500 / 10{,}000 = 0.05$, so the expected counts are $200$, $150$ and $150$:
> >
> > $$
> > \begin{align*}
> > \chi^2 &= \frac{20^2}{200} + \frac{0^2}{150} + \frac{20^2}{150} \\
> > &= 2.00 + 0 + 2.67 \\
> > &= 4.67
> > \end{align*}
> > $$
> >
> > That is below $\chi^2_{0.05,2} = 5.99$ ($p = e^{-4.67/2} = 0.097$), so the difference is **not significant**, even though the class frequencies range from $0.043$ to $0.055$. With twice the exposure and the same frequencies, $\chi^2$ doubles to $9.33$ ($p = 0.009$). Significance depends on volume as much as on the size of the effect.

> [!example]- F-Test for Adding a Rating Variable {Example}
> A GLM on $n = 5{,}000$ records has unscaled deviance $5{,}212.4$. Adding a 4-level vehicle-use variable gives deviance $5{,}196.8$, dispersion estimate $\hat{\phi}_B = 1.30$ and $p_B = 12$ parameters. Is vehicle use significant?
>
> > [!answer]-
> > Four levels add $3$ parameters:
> >
> > $$
> > \begin{align*}
> > F &= \frac{5{,}212.4 - 5{,}196.8}{3 \times 1.30} \\
> > &= \frac{15.6}{3.9} \\
> > &= 4.00
> > \end{align*}
> > $$
> >
> > The 95th percentile of $F_{3,\,4{,}988}$ is about $2.61$, and $4.00$ lies at about the $99.3$rd percentile. Vehicle use is **significant**: its deviance drop is four times what three useless parameters would be expected to achieve by chance.
