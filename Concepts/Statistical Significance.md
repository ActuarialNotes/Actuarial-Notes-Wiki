---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-17
  last_checked_by: agent:validate-v1
  content_hash: sha256:00c0302211c6096f6f91570430017f03cecf18b2ece5cc4443c8bbd7ca1171c0
  sources:
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §2.3, §2.4.3, §5.3, §6.2.1, PDF pp.18-20, 25-26, 57, 74-76, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "CAS Monograph 5 errata sheet (approved 28 Jan 2026), p.65-66 corrections, sha256:4622f59623aded645b229235ab0579a527823942ff35dce531033fe534b6735b — https://www.casact.org/sites/default/files/2026-02/Monograph_No_5_Errata_Sheet.pdf"
    - "ASOP No. 12, Risk Classification (Actuarial Standards Board, Dec 2005, doc. 132), §3.2.1-3.2.2, PDF pp.9-10, sha256:7d4f2631a589bac24cf34b1f622e95aa7bfa979aaca96de27c651099c0b12dc7 — https://www.actuarialstandardsboard.org/wp-content/uploads/2014/02/asop012_132.pdf"
    - "Mahler, An Example of Credibility and Shifting Risk Parameters (PCAS LXXVII, 1990), §4.2, PDF pp.11-12, sha256:101593b055845cf0882738352dde247da6c40bb5f029f394b5c1ebc597dfdb58 — https://www.casact.org/sites/default/files/database/proceed_proceed90_90225.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Statistical Significance.md
---

**Statistical Significance** is the judgement that an observed effect is too large to be plausibly produced by random variation if the true effect were zero. In classification ratemaking it is the first actuarial test of whether a [[Rating Class|rate class]] has earned its own rate, and the effect tested is a class's difference in loss cost, a GLM coefficient or the improvement from adding a variable.

The test statistic for one GLM coefficient $\hat{\beta}$ is

> $$z = \frac{\hat{\beta}}{\mathrm{SE}(\hat{\beta})}$$

- $\mathrm{SE}(\hat{\beta})$ is the coefficient's standard error.

With a log link, a class coefficient $\hat{\beta}$ is a relativity of $e^{\hat{\beta}}$, and the [[p-Value|p-value]] behind $z$ is the chance of an estimate that far from zero if the class truly had no effect. The 95% [[Confidence Interval|confidence interval]] is $\hat{\beta} \pm 1.96\,\mathrm{SE}$, and exponentiating it gives an interval for the class's relativity, and so for its [[Loss Cost|loss cost]]. An interval for the relativity that includes $1.00$ means the class cannot be told apart from the base level.

A categorical level's significance is measured against the base level. A sparse base widens every other level's interval, so the [[Generalized Linear Models for Insurance Rating (Goldburd et al. - 2020)|GLM monograph]] advises a base level with plenty of data.

> [!example]- Is each of these two rate classes significantly different from the base at 5%? {Example}
> A frequency GLM with a log link gives these coefficients, both relative to the base class:
>
> | Class | $\hat{\beta}$ | $\mathrm{SE}$ |
> | :--- | ---: | ---: |
> | B | 0.182 | 0.060 |
> | C | 0.095 | 0.070 |
>
> > [!answer]-
> > - Class B has $z = 0.182/0.060 = 3.03$, so $p = 0.002$.
> > - Its relativity is $e^{0.182} = 1.20$, with 95% interval $[e^{0.064}, e^{0.300}] = [1.07, 1.35]$. The whole interval lies above $1$, so Class B is significant.
> > - Class C has $z = 0.095/0.070 = 1.36$, so $p = 0.17$.
> > - Its relativity is $1.10$ with interval $[0.96, 1.26]$, which includes $1.00$. The data cannot tell Class C apart from the base.
> > - Either combine Class C with the base or credibility-weight its indication. The $+10\%$ effect is not disproved, and more data may confirm it.

## Testing a whole variable

The $F$-statistic compares two nested GLMs, a small model $S$ and a big model $B$ that adds the variable. It is

> $$F = \frac{D_S - D_B}{(\text{added parameters}) \times \hat{\phi}_B}$$

- $D_S$ and $D_B$ are the unscaled [[Deviance|deviances]] of the small and big models.
- $\hat{\phi}_B$ is the big model's dispersion estimate.

$F$ is referred to an $F$ distribution with (added parameters, $n - p_B$) degrees of freedom, where $n$ is the number of records and $p_B$ the big model's number of parameters. A categorical variable with $m$ levels adds $m - 1$ parameters. When $\phi$ is known (Poisson), the deviance drop is compared with $\chi^2$ instead (the [[Likelihood Ratio Test]]).

> [!example]- Is this vehicle-use variable significant? {Example}
> A GLM on $n = 5{,}000$ records has unscaled deviance $5{,}212.4$. Adding a 4-level vehicle-use variable gives deviance $5{,}196.8$, dispersion estimate $\hat{\phi}_B = 1.30$ and $p_B = 12$ parameters.
>
> > [!answer]-
> > - Four levels add $3$ parameters.
> > - $F = (5{,}212.4 - 5{,}196.8)/(3 \times 1.30) = 15.6/3.9 = 4.00$.
> > - The 95th percentile of $F_{3,\,4{,}988}$ is about $2.61$, and $4.00$ lies at about the $99.3$rd percentile.
> > - Vehicle use is significant. Its deviance drop is four times what three useless parameters would be expected to achieve by chance.

## Testing class frequencies without a model

Pearson's statistic compares each class's observed claim count with its expected count if every class had the same frequency. It is

> $$\chi^2 = \sum \frac{(O - E)^2}{E}$$

- $O$ is a class's observed claim count.
- $E$ is its expected claim count, the common frequency times the class's exposures.

It has (classes $-\,1$) degrees of freedom.

> [!example]- Are these three classes' claim frequencies significantly different at 5%? {Example}
> The classes' experience is:
>
> | Class | Exposures | Claims |
> | :--- | ---: | ---: |
> | 1 | 4,000 | 220 |
> | 2 | 3,000 | 150 |
> | 3 | 3,000 | 130 |
>
> > [!answer]-
> > - The overall frequency is $500 / 10{,}000 = 0.05$, so the expected counts are $200$, $150$ and $150$.
> > - $\chi^2 = 20^2/200 + 0^2/150 + 20^2/150 = 2.00 + 0 + 2.67 = 4.67$.
> > - That is below $\chi^2_{0.05,2} = 5.99$, with $p = e^{-4.67/2} = 0.097$, so the difference is not significant, even though the class frequencies range from $0.043$ to $0.055$.
> > - With twice the exposure and the same frequencies, $\chi^2$ doubles to $9.33$ and $p = 0.009$. Significance depends on volume as much as on the size of the effect.

## Significance and the other criteria

Significance is not the whole test of a variable. A 5% threshold admits roughly one useless variable in twenty when many are tried, and the monograph warns there is no "magic" p-value. A class can be significant yet not [[Credibility|credible]] enough to use at face value. [[ASOP 12 - Risk Classification (ASB - 2005)|ASOP No. 12]] asks that a risk characteristic be related to expected outcomes, though a cause-and-effect relationship need not be shown. Operational and legal criteria still apply.

> [!trap] Treating a non-significant result as no effect
> A class whose interval includes $1.00$ has not been shown to differ from the base. It has not been shown to equal it either, and it may only need more data. Combine it with the base or credibility-weight it rather than setting its effect to zero as proven.
