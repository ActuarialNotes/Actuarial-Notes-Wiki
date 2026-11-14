---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:6277c6d776e1827c4ff070d9a7aa65e05399b2f8b4f852fb3bdd2aceecba7712
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Calendar Year Effect.md
---

A **Calendar Year Effect** (diagonal effect) is an influence that acts on every accident year in the same calendar period, and so on one diagonal $w + d = \text{constant}$ of a [[Development Triangle|development triangle]]. It breaks the [[Chain Ladder Method|chain ladder]]'s assumption that accident years are independent.

Examples are a major change in [[Claims Processing Changes|claims handling]] or [[Case Adequacy|case reserving]], a shift in court decisions, or a change in the [[Inflation|inflation]] rate. If a diagonal of cumulative amounts is larger than usual, the development factors that have it in the numerator run large and those that have it in the denominator run small, and vice versa. A *constant* rate of inflation left in the data is simply extrapolated by the chain ladder. It is the changes in the rate that distort.

## Mack's test for calendar year effects

[[Measuring the Variability of Chain Ladder Reserve Estimates (Mack - 1994)|Mack (1994)]] tests for the effect by counting large and small development factors on each diagonal. In each column, factors above the [[Median|median]] are L and below it are S; with an odd count the median factor is dropped. For each diagonal $j$, $L_j$ and $S_j$ are the counts, $n = L_j + S_j$ and $m = \lfloor (n-1)/2 \rfloor$. The statistic for diagonal $j$ is

> $$Z_j = \min(L_j,\ S_j)$$

and the statistic for the triangle is

> $$Z = \sum_j Z_j$$

A diagonal with $n \le 1$ is left out. Under the null hypothesis each factor is L or S with probability $\tfrac12$ ([[Binomial Distribution|Binomial]]), and the diagonals are treated as independent. The mean of $Z_j$ is

> $$E(Z_j) = \frac{n}{2} - \binom{n-1}{m}\frac{n}{2^n}$$

and its variance is

> $$
> \begin{aligned}
> \text{Var}(Z_j) ={}& \frac{n(n-1)}{4} - \binom{n-1}{m}\frac{n(n-1)}{2^n} \\
> &+ E(Z_j) - E(Z_j)^2
> \end{aligned}
> $$

$E(Z)$ and $\text{Var}(Z)$ are the sums over the diagonals. $Z$ is treated as Normal, and "no calendar year effect" is rejected at 5% if $Z$ falls outside $E(Z) \pm 2\sqrt{\text{Var}(Z)}$. The triangle is tested as a whole to avoid accumulating error probabilities.

> [!example]- Does this paid triangle show calendar year effects, at the 5% level? {Example}
> Paid age-to-age factors:
>
> | AY | 12–24 | 24–36 | 36–48 | 48–60 | 60–72 |
> | :--- | ---: | ---: | ---: | ---: | ---: |
> | 2019 | 1.80 | 1.40 | 1.12 | 1.04 | 1.02 |
> | 2020 | 1.95 | 1.28 | 1.09 | 1.07 | |
> | 2021 | 1.70 | 1.30 | 1.18 | | |
> | 2022 | 1.65 | 1.45 | | | |
> | 2023 | 2.05 | | | | |
>
> > [!answer]-
> > - The medians are $1.80$ for 12–24 and $1.12$ for 36–48 (odd counts, so those factors are dropped), $1.35$ for 24–36 and $1.055$ for 48–60. The single 60–72 factor is dropped.
> > - Labelling each diagonal by the calendar year of the factor's later valuation gives:
> >
> > | Diagonal | $S_j$ | $L_j$ | $Z_j$ | $n$ | $E(Z_j)$ | $\text{Var}(Z_j)$ |
> > | :--- | ---: | ---: | ---: | ---: | ---: | ---: |
> > | 2021 | 0 | 2 | 0 | 2 | 0.50 | 0.2500 |
> > | 2022 | 2 | 0 | 0 | 2 | 0.50 | 0.2500 |
> > | 2023 | 4 | 0 | 0 | 4 | 1.25 | 0.4375 |
> > | 2024 | 0 | 4 | 0 | 4 | 1.25 | 0.4375 |
> > | Total | | | 0 | | 3.50 | 1.3750 |
> >
> > - For $n = 4$, $m = 1$, so $E(Z_j) = 2 - 3 \times 4/16 = 1.25$ and $\text{Var}(Z_j) = 3 - 3 \times 12/16 + 1.25 - 1.5625 = 0.4375$.
> > - The range is $3.5 \pm 2\sqrt{1.375} = (1.155,\ 5.845)$.
> > - $Z = 0$ lies outside the range, so the hypothesis of no calendar year effects is rejected.
> > - Every factor into the 2023 valuation is small and every factor out of it is large, the signature of a low 2023 diagonal, such as a payment backlog cleared in 2024. The 2021 diagonal looks high in the same way.
> > - Chain ladder factors averaged over these diagonals blend the distortion into every projection, so the diagonals should be adjusted or modelled before the method is relied on.

## Venter's regression test

[[Testing the Assumptions of Age-to-Age Factors (Venter - 1998)|Venter (1998)]] instead adds dummy variables for diagonals to the development regression and checks whether their coefficients are [[Statistical Significance|significant]]. An additive effect enters as a dummy column. A multiplicative one scales a whole diagonal, for example $q(w,d) = 1.1\,f(d)h(w)$ on $w + d = 7$. Diagonal effects that are significant in a chain ladder model are probably needed in a Bornhuetter-Ferguson model of the same data too.

## Forecasting with a calendar year effect

Knowing what changed in company operations decides whether an effect is permanent or temporary, most of all in the last few diagonals. If the age effects dominate and the diagonals are occasional distortions, the dummies give cleaner age terms, and those alone are used to forecast. If the diagonals measure claims inflation, the latest ones can be projected forward ([[Separation Method]]). Known changes in [[Settlement Rate|settlement rates]] or case adequacy can be adjusted out first ([[Berquist-Sherman Method|Berquist-Sherman]]).

> [!example]- What are the unpaid claims if the 2024 effect is temporary, and if it is permanent? {Example}
> A parameterized Bornhuetter-Ferguson model $q(w,d) = f(d)h(w)$ is fitted to incremental paid losses (\$000). The parameters are $f(0..3) = 0.40, 0.30, 0.20, 0.10$ and $h = 10{,}000$, $11{,}000$, $12{,}000$ and $12{,}500$ for AYs 2021–2024. A diagonal dummy shows the 2024 payments running $10\%$ above the model on every accident year. A temporary effect is a one-time catch-up of payments held up by a court backlog. A permanent one is a court ruling that raises awards on every claim settled from 2024 on.
>
> > [!answer]-
> > - The fitted 2024 payments are $f(d)h(w)$ times $1.1$: $5{,}500$ for AY 2024, $3{,}960$ for 2023, $2{,}420$ for 2022 and $1{,}100$ for 2021.
> > - If the effect is temporary, it is a distortion of one diagonal, so only the age and accident-year terms are used to forecast.
> > - The unpaid claims are $0.10(11{,}000) = 1{,}100$ for AY 2022, $(0.20 + 0.10)(12{,}000) = 3{,}600$ for 2023 and $(0.30 + 0.20 + 0.10)(12{,}500) = 7{,}500$ for 2024, a total of $12{,}200$.
> > - If it is permanent, every future diagonal carries the higher award level, so each future cell is $10\%$ higher and the unpaid estimate is $1.1 \times 12{,}200 = 13{,}420$.
> > - The $1{,}220$ gap is decided by knowing what happened in 2024, not by the regression. Fitting the dummy in either case keeps the 2024 distortion out of $f(d)$ and $h(w)$.
