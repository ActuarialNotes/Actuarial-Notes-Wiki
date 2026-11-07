---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:bd59498249ca6a785e6579accf2ae6da9a50dc2fc0d214e9a55662493a55ac07
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch.11 Frequency-Severity Techniques, PDF pp.202-205 (printed 196-199): Auto Collision Insurer half-year example, seasonality in closed counts, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Age to Age Factor.md
---

![[Media/Figures/Age_to_Age_Factor.svg|340]]

An **Age-to-Age Factor**, also called a link ratio or report-to-report factor, is the ratio of a cohort's cumulative value at one age to its value at the previous age. It measures the change in recorded claims from one valuation date to the next, and it is named by its two ages, as the 12-24 factor. The age-to-age factor of accident year AY from age $n$ to age $n+1$ is

> $$f_{n \to n+1}^{\text{AY}} = \frac{C_{\text{AY},\,n+1}}{C_{\text{AY},\,n}}$$

- $C_{\text{AY},n}$ is the accident year's cumulative value at age $n$, such as its reported claims, paid claims or claim counts.

A triangle of age-to-age factors has one less row and one less column than its [[Development Triangle|data triangle]].

> [!example]- Accident year 2021 has reported claims of $\$37{,}000$ at 12 months and $\$43{,}000$ at 24 months. What is its 12-24 factor? {Example}
> - The factor is the claims at 24 months divided by the claims at 12 months.
> - It is $43{,}000/37{,}000 = 1.162$.

## Averages of age-to-age factors

A factor is selected for each age from the column of observed factors, usually by an average of them. Over a chosen set of accident years, the volume-weighted average is

> $$f_{n \to n+1}^{\text{vol-wtd}} = \frac{\sum_{\text{AY}} C_{\text{AY},\,n+1}}{\sum_{\text{AY}} C_{\text{AY},\,n}}$$

- The sums run over the same accident years, those that have both ages.

The other common averages are:

1. **Simple average**, the arithmetic mean of the factors, which gives each year equal weight however small it is.
2. **Medial average**, the simple average excluding the highest and lowest factors, which is robust to one distorted year.
3. **Geometric average**, the $k$th root of the product of $k$ factors.
4. **Latest $k$ years**, any of these over only the most recent accident years.

The volume-weighted average weights each year by its claims, so the large years dominate it. Fewer years make an average more responsive to a recent change, and more years make it more stable. The selection trades one against the other.

> [!example]- Reported claims are 500, 750 and 875 at 12, 24 and 36 months for accident year 2021, 550, 825 and 950 for 2022, and 600 and 900 for 2023. What are the volume-weighted factors? {Example}
> - The 12-24 factor is $(750 + 825 + 900)/(500 + 550 + 600) = 2{,}475/1{,}650 = 1.500$.
> - The 24-36 factor is $(875 + 950)/(750 + 825) = 1{,}825/1{,}575 = 1.159$.
> - The individual 24-36 factors are $875/750 = 1.167$ and $950/825 = 1.152$, so their simple average is $1.159$ too.

## Selecting an age-to-age factor

Friedland lists what actuaries look for in the factors before selecting:

1. **Smooth progression** across the ages, with development decreasing steadily as the accident year matures.
2. **Stability** down each column, a small range of factors at the same age.
3. **Credibility** of the experience, from its volume and how alike its claims are.
4. **Changes in patterns** that suggest a change in operations or environment.
5. **Applicability** of the history to the future development.

A trend or shift in the recent factors of a column is a signal, not noise, and an all-year average blends two regimes and fits neither. The latest years are then selected, provided the change can be explained and is expected to last. A factor high along a **diagonal** rather than down a column is a calendar year effect, which is fixed by restating the triangle, such as by [[Berquist-Sherman Method|Berquist-Sherman]], not by averaging. An anomalous [[Large Loss|large loss]] is removed from the triangle before the factors are computed. When the insurer's own data are thin, benchmark factors from similar lines or the industry are used, with caution about differences in claims practices, coverage and mix.

> [!example]- A liability triangle's 12-24 factors for accident years 2018 to 2023 are 1.42, 1.45, 1.38, 1.61, 1.63 and 1.66, on 12-month claims ($000s) of 4,100, 4,300, 900, 4,800, 5,200 and 5,600. Accident year 2020 was a partial year after a book transfer. Which average should be selected? {Example}
> - The all-year simple average is $1.525$, the medial average is $1.528$ and the volume-weighted average is $1.558$.
> - The latest three years' simple average is $1.633$.
> - The factors jump from about 1.42 to about 1.63 in 2021, so the column has two regimes, and every all-year average lands between them.
> - The latest three years, about 1.63, are selected if the change can be identified and is expected to persist.
> - Accident year 2020's factor rests on little volume, which a volume-weighted or medial average gives little weight.

## Age-to-age factors and cumulative development factors

The selected factors are multiplied together into [[Cumulative Development Factor|cumulative development factors]], so the factor from age $n$ to age $n+1$ is also the CDF at age $n$ divided by the CDF at age $n+1$.

## Development below 1.000

Age-to-age factors need not be above 1.000. Salvage and subrogation recoveries, conservative initial case reserving, and claims closing below their reserves all produce downward development. A large claim settling below its case reserve depresses that age's factor.

## Seasonality

With accident periods shorter than a year, factors can differ with the part of the year a period covers. In Friedland's private passenger collision example, accident half-years ending in December close fewer of their claims by six months than those ending in June. An average across all periods blends two patterns. Each season's factor is then the average of the factors of that season's accident periods, applied to the periods of that season.

## Age-to-age factors in Mack's model (Exam 7)

Mack's chain ladder model makes the selected factor the weighted average of the individual factors that has the least variance, given the variance of the next value. If the variance of the next incremental loss is proportional to the losses to date, the factor is the volume-weighted average. If it is proportional to their square, the factor is the simple average. A weighted average factor is simple, uses the company's own data and can weight recent years more, but it is sensitive to outlying factors. A fitted growth curve smooths them, but because it always increases it cannot reflect downward development.
