---
verification:
  status: stale
  confidence: null
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:ceac404a789762305b6d7c2c60bfc5eda2d418a8fd630d96d014606d4df457c0
  sources:
    - "Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), pooling section (CV = ratio of SD to mean; useful for comparing variability between positive distributions with different expected values) (PDF pp.4-5), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf"
    - "SOA Exam P Sample Solutions (Aug 2026 rev.), Q252 (solutions PDF p.74), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "SOA Probability Exam syllabus, November 2026, Topic 2 (univariate random variables) learning outcomes c), d), e) (PDF p.3), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Coefficient of Variation.md
---

The **Coefficient of Variation** $CV$ is the ratio of the standard deviation to the mean, measuring dispersion as a proportion of the mean.

> $$CV = \frac{\sigma}{\mu}$$

> $$= \frac{\sqrt{\text{Var}(X)}}{E[X]}$$

- $\sigma$ is the [[Standard Deviation|standard deviation]] and $\mu$ is the [[Expected Value|mean]] of $X$.
- $CV$ is dimensionless, so it can compare the relative variability of distributions with different units or scales.
- A larger $CV$ indicates greater dispersion relative to the mean.
- It requires $E[X] \neq 0$. It is used to compare the variability of positive distributions, such as losses, with different expected values.

> [!idea] The idea
> A standard deviation of \$1,000 is large for a \$500 claim and small for a \$1 million building. The coefficient of variation divides the spread by the size, so it asks how wide the spread is *for a risk of this size*. Rescaling a risk, by inflation or a change of currency, then leaves it unchanged.

![[Media/Figures/Coefficient_of_Variation.svg|340]]

## Spread relative to size

A claim $X$ costs 0, 100 or 500 with probabilities 0.5, 0.3 and 0.2. Its mean is 130 and its standard deviation is 190.

> $$CV = \frac{190}{130} \approx 1.46$$

The standard deviation is almost one and a half times the mean. That is a very variable claim, because half the time nothing is paid and sometimes 500 is.

## What changes the CV?

| Change to every claim | Mean | Std dev | $CV$ |
|---|---|---|---|
| None | 130 | 190 | 1.46 |
| 10% inflation | 143 | 209 | 1.46 |
| Flat fee of 20 | 150 | 190 | 1.27 |

- Scaling by $a > 0$ multiplies the mean and the standard deviation by $a$, so the $CV$ is unchanged.
- Adding a constant raises the mean but not the spread, so the $CV$ falls.

## Pooling lowers the CV

An insurer writes 100 independent claims like $X$. The total has mean $100 \times 130 = 13{,}000$ and standard deviation $190\sqrt{100} = 1{,}900$.

> $$CV_{\text{total}} = \frac{1{,}900}{13{,}000} \approx 0.146$$

For $n$ independent, identical risks, the mean grows like $n$ but the standard deviation only like $\sqrt{n}$.

> $$CV_{\text{total}} = \frac{CV}{\sqrt{n}}$$

- Quadrupling the pool halves the $CV$. This is why a large insurer's results are relatively more predictable than a small one's.
- Risk management texts call this ratio for the number of claims *objective risk*. It is the [[Law of Large Numbers]] at work.

> [!trap] The total's standard deviation still grows
> Pooling lowers the $CV$, not the standard deviation. The total's standard deviation rises with $\sqrt{n}$. Only the spread *relative to the expected total* shrinks.

## CVs of named distributions

Several distributions have a $CV$ that depends on one parameter alone: the [[Exponential Distribution|exponential]], the [[Gamma|gamma]], the [[Poisson Distribution|Poisson]] and the [[Lognormal Distribution|lognormal]].

| Distribution | $CV$ |
|---|---|
| Exponential | 1 |
| Gamma with shape $\alpha$ | $1/\sqrt{\alpha}$ |
| Poisson with mean $\lambda$ | $1/\sqrt{\lambda}$ |
| Lognormal | $\sqrt{e^{\sigma^2} - 1}$ |

The lognormal row works in reverse too. Given a mean and a $CV$, it gives $\sigma^2 = \ln(1 + CV^2)$. See [[Moment]] for that fit.

## On other exams

- **MAS-II** sets limited-fluctuation credibility standards in terms of the severity's $CV$. With a Poisson claim count, full credibility for severity needs $n_0\,CV^2$ claims, and for the pure premium $n_0(1 + CV^2)$, where $n_0 = (z/k)^2$. For 90% probability within 5%, $n_0 = 1{,}082.41$. The claim above, with $CV^2 = 2.136$, would need about 2,312 claims for severity. See [[Limited Fluctuation Credibility]].
- **Exam 7** reports the variability of an [[Unpaid Claim Distribution|unpaid claim estimate]] as its standard error divided by its mean. The total across accident years usually has a lower $CV$ than each year, for the same pooling reason as above.
- **The DISCs** use the $CV$ to compare the riskiness of exposures of different sizes.

## Try it

> [!example]- Comparing Variability of Two Loss Distributions {Example}
> Distribution A has mean \$500 and standard deviation \$100. Distribution B has mean \$2{,}000 and standard deviation \$300. Which has greater relative variability?
>
> > [!answer]-
> > **Plan:** divide each standard deviation by its mean and compare.
> >
> > $CV_A = 100/500 = 0.20$ and $CV_B = 300/2{,}000 = 0.15$.
> >
> > Distribution A has greater relative variability, even though its absolute standard deviation is smaller.

> [!example]- The CV of an average {Example}
> Independent losses $X$ and $Y$ have the same mean. Their coefficients of variation are 1 and 2. Find the $CV$ of $\frac{1}{2}(X + Y)$.
>
> > [!answer]-
> > **Plan:** write both standard deviations in terms of the common mean $\mu$, add variances, then divide by the mean of the average.
> >
> > $\sigma_X = \mu$ and $\sigma_Y = 2\mu$. The average has mean $\mu$.
> > $$
> > \begin{align*}
> > \text{Var}\left(\tfrac{1}{2}(X + Y)\right) &= \tfrac{1}{4}\left(\mu^2 + 4\mu^2\right) \\
> >                                            &= 1.25\,\mu^2 \\
> > CV &= \frac{\sqrt{1.25}\,\mu}{\mu} \\
> >    &\approx 1.118
> > \end{align*}
> > $$
> > Why below 2 but above 1? Averaging cancels part of the spread, but the riskier loss still dominates.

> [!example]- Objective risk of two pools {Example}
> Insurer A covers 900 homes and insurer B covers 3,600. Each home independently has a fire claim in a year with probability 0.02. Compare the $CV$ of the number of claims at the two insurers.
>
> > [!answer]-
> > **Plan:** the claim count is binomial, so find its mean and standard deviation for each pool.
> > $$
> > \begin{align*}
> > CV_A &= \frac{\sqrt{900(0.02)(0.98)}}{900(0.02)} \\
> >      &= \frac{4.2}{18} \\
> >      &\approx 0.233 \\
> > CV_B &= \frac{\sqrt{3600(0.02)(0.98)}}{3600(0.02)} \\
> >      &= \frac{8.4}{72} \\
> >      &\approx 0.117
> > \end{align*}
> > $$
> > Four times the homes gives half the $CV$, as $1/\sqrt{4}$ predicts.

> [!warning]- Exam traps
> - **Variance over mean.** The $CV$ uses the standard deviation, $\sigma/\mu$, not $\sigma^2/\mu$.
> - **Pooling and the standard deviation.** Adding independent risks lowers the $CV$ but raises the total's standard deviation.
> - **A constant changes the CV.** A flat amount added to every loss lowers the $CV$. Only scaling leaves it alone.
> - **Adding CVs.** The $CV$ of a sum comes from the sum's own standard deviation and mean, never from adding or averaging the pieces' CVs.
