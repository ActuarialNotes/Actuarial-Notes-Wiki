---
aliases:
  - Modern Mortality Table
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:847e313b0370c8ddd9664b6fd986e08b0037caa1c976a7cebf5b0492d99b0a43
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Mortality Table Construction.md
---
**Mortality Table Construction** is the process of turning a body of insured-lives data into a table of [[Mortality|mortality]] rates that a [[Life Insurance Company|life insurer]] can use for pricing, valuation or [[Experience Study|experience studies]]. The modern process:

1. measures exposure and deaths and computes crude rates,
2. smooths them by graduation,
3. builds a select and ultimate structure with relative risk classes,
4. projects the rates with an improvement scale, and
5. adds margins or blends the result with an industry table according to its [[Credibility|credibility]].

The crude rate for lives selected (underwritten) at age $x$ and now in policy duration $t+1$ is

> $$\hat{q}_{[x]+t} = \frac{D_{[x]+t}}{E_{[x]+t}}$$

- $D_{[x]+t}$ is the number of deaths in the cell.
- $E_{[x]+t}$ is the exposure in the cell.

## Data and exposure

Exposure is counted from the later of each policy's issue date and the start of the study, and it ends at death, lapse, maturity or the end of the study. In an initial-exposure study a death contributes exposure to the end of its year of age, not only to the date of death.

Exposure can be counted by policies or by amounts insured. An amount-based table gives more weight to large policies, which tend to show lower mortality, so the two bases give different rates and the table must state which it uses. The [[Actual vs Expected Analysis|actual-to-expected]] ratio against a reference table is often a more stable statistic to carry forward than the crude rates themselves.

## Graduation

Crude rates jump from age to age because of random variation, so they are smoothed. Whittaker-Henderson graduation chooses the graduated rates $v_x$ that minimize

> $$\sum_{x} w_x\left(v_x - u_x\right)^2 + h\sum_{x}\left(\Delta^{z} v_x\right)^2$$

- $u_x$ are the crude rates.
- $w_x$ are the weights, usually the exposures.
- $\Delta^{z}$ is the $z$-th difference.
- $h$ is the smoothing parameter.

The first sum measures fit and the second smoothness, and a larger $h$ gives a smoother table. With exposure weights, the graduation keeps the total expected deaths, so a graduation that moves the total has changed the level of the table and signals the wrong weights. Parametric curves such as Gompertz or Makeham, and [[Smoothing Spline|splines]], are the common alternatives. The extreme ages, where data are thin, are usually filled by fitting a curve and grading it into the graduated rates.

> [!example]- Do these graduated rates give a smaller Whittaker-Henderson objective than the crude rates, and do they keep the expected deaths? {Example}
> A study of ages 50 to 54 gives the crude rates below, per 1,000, with exposures in thousands of life-years as weights. Graduation with $z = 2$ and $h = 5$ gives the graduated rates.
>
> | Age | 50 | 51 | 52 | 53 | 54 |
> | :--- | ---: | ---: | ---: | ---: | ---: |
> | Crude rate $u_x$ | 2.10 | 2.60 | 2.30 | 2.90 | 3.30 |
> | Exposure $w_x$ | 8 | 10 | 9 | 7 | 6 |
> | Graduated rate $v_x$ | 2.165 | 2.401 | 2.533 | 2.857 | 3.246 |
>
> > [!answer]-
> > - The crude rates fit perfectly, so their fit term is 0.
> > - Their second differences are $-0.80$, $0.90$ and $-0.20$, whose squares sum to 1.49, so their objective is $5(1.49) = 7.45$.
> > - For the graduated rates, the weighted squared deviations sum to 0.951 and the squared second differences to 0.0514.
> > - Their objective is $0.951 + 5(0.0514) = 1.208$, the smaller, so they are the better compromise between fit and smoothness at $h = 5$.
> > - The observed deaths are $8(2.10) + 10(2.60) + 9(2.30) + 7(2.90) + 6(3.30) = 103.6$, and the graduated rates expect the same 103.6.

## Select and ultimate

Mortality is low just after underwriting and rises with duration as the effect of selection wears off. A table therefore gives select rates $q_{[x]+t}$ for durations within the select period and ultimate rates $q_{x+t}$ after it, and each select column should grade smoothly into the ultimate column.

Insurers sell several underwriting classes, such as preferred and standard, and smoker and nonsmoker. A modern table supplies relative risk tables, which are multiples of the base table, and the classes' multiples must average back to the base table on the expected mix of business.

## Mortality improvement

A table is built for a central calendar year $t_0$ and then projected with an improvement scale. The rate at age $x$ in year $t$ is

> $$q(x,t) = q(x,t_0)\prod_{s=t_0+1}^{t}\left(1-\phi(x,s)\right)$$

- $\phi(x,s)$ is the rate of improvement at age $x$ in year $s$.

Improvement is applied first to bring the study data to the table's base year and then, if the purpose allows it, to project beyond. The scale starts from the base year only, so applying it from the study's central year as well counts the same improvement twice.

## Margins

A best-estimate table, such as a valuation basic table, is the starting point for pricing. A valuation table, such as a CSO table, adds margins that work against the insurer, so its rates are higher for life insurance and lower for annuities.

## Blending with an industry table

A company's own experience is rarely large enough to stand alone. Its A/E ratio is blended with the industry table by [[Limited Fluctuation Credibility|limited fluctuation]] or [[Bühlmann Credibility|Bühlmann]] credibility, and the blended ratio is applied to the industry rates. The blended rate is

> $$q^{\text{blend}}_x = \left[Z \cdot \text{A/E} + (1 - Z)\right] q^{\text{ind}}_x$$

- $Z$ is the credibility of the company's own actual-to-expected ratio.
- $q^{\text{ind}}_x$ is the industry table's rate.

Blending the ratio rather than each age's crude rate keeps the industry table's shape, which sparse company data could not estimate age by age.

> [!example]- What are this block's blended A/E ratio and its assumed $q_{55}$? {Example}
> A company's study of a block of preferred nonsmoker policies has 270 deaths and an A/E ratio of 85% against an industry table. Full credibility requires the number of deaths that gives a 90% probability of being within 5% of the true ratio, and partial credibility follows the square-root rule. The industry rate is $q^{\text{ind}}_{55} = 0.00400$.
>
> > [!answer]-
> > - Deaths are treated as Poisson, so the full-credibility standard is $(1.645/0.05)^2 = 1{,}082.4$ deaths.
> > - The credibility is $Z = \sqrt{270/1{,}082.4} = 0.4994$.
> > - The blended ratio is $0.4994(0.85) + 0.5006(1.00) = 0.9251$.
> > - The assumed rate is $q_{55} = 0.9251(0.00400) = 0.00370$, 7.5% below the industry table rather than 15% below.

> [!trap] Loading an annuity table upward
> A margin raises mortality for life insurance but lowers it for annuities, because the margin must work against the insurer. Loading a payout annuity table upward makes it less conservative, not more.
