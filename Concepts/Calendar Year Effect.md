---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:4a10f4531a04137e599cbcaceec447c52688fdabb58a1601dce087e863a41ff8
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Calendar Year Effect.md
---

**Calendar Year Effect** (diagonal effect) is an influence that acts on every accident year in the same calendar period, and so on one diagonal $w + d = \text{constant}$ of a [[Development Triangle|development triangle]]. Examples are a major change in [[Claims Processing Changes|claims handling]] or [[Case Adequacy|case reserving]], a shift in court decisions, or a change in the [[Inflation|inflation]] rate. It breaks the [[Chain Ladder Method|chain ladder]]'s assumption that accident years are independent. [[Measuring the Variability of Chain Ladder Reserve Estimates (Mack - 1994)|Mack (1994)]] tests for it by counting large and small development factors on each diagonal:

> $$Z_j = \min(L_j,\ S_j)$$
>
> $$Z = \sum_j Z_j$$
>
> $$E(Z_j) = \frac{n}{2} - \binom{n-1}{m}\frac{n}{2^n}$$
>
> $$\text{Var}(Z_j) = \frac{n(n-1)}{4} - \binom{n-1}{m}\frac{n(n-1)}{2^n} + E(Z_j) - E(Z_j)^2$$

- **How it shows up.** If a diagonal of cumulative amounts is larger than usual, the development factors that have it in the numerator run large and those that have it in the denominator run small, and vice versa. A *constant* rate of inflation left in the data is simply extrapolated by the chain ladder; it is the changes that distort.
- **Mack's test.** In each column, factors above the [[Median|median]] are L and below it are S; with an odd count the median factor is dropped. For each diagonal $j$, $L_j$ and $S_j$ are the counts, $n = L_j + S_j$ and $m = \lfloor (n-1)/2 \rfloor$. Under the null hypothesis each factor is L or S with probability $\tfrac12$ ([[Binomial Distribution|Binomial]]), which gives the moments above. A diagonal with $n \le 1$ is left out. $Z$ is treated as Normal, and "no calendar year effect" is rejected at 5% if $Z$ falls outside $E(Z) \pm 2\sqrt{\text{Var}(Z)}$. The triangle is tested as a whole to avoid accumulating error probabilities.
- **Venter's regression test.** [[Testing the Assumptions of Age-to-Age Factors (Venter - 1998)|Venter (1998)]] instead adds dummy variables for diagonals to the development regression and checks whether their coefficients are [[Statistical Significance|significant]]. An additive effect enters as a dummy column. A multiplicative one scales a whole diagonal, for example $q(w,d) = 1.1\,f(d)h(w)$ on $w + d = 7$. Diagonal effects that are significant in a chain ladder model are probably needed in a Bornhuetter-Ferguson model of the same data too.
- **Using the effect.** Knowing what changed in company operations decides whether an effect is permanent or temporary, most of all in the last few diagonals. If the age effects dominate and the diagonals are occasional distortions, the dummies give cleaner age terms, and those alone are used to forecast. If the diagonals measure claims inflation, the latest ones can be projected forward ([[Separation Method]]). Known changes in [[Settlement Rate|settlement rates]] or case adequacy can be adjusted out first ([[Berquist-Sherman Method|Berquist-Sherman]]).

> [!example]- Mack's Test on a Paid Triangle {Example}
> Paid age-to-age factors:
>
> | AY | 12–24 | 24–36 | 36–48 | 48–60 | 60–72 |
> |---|---|---|---|---|---|
> | $2019$ | $1.80$ | $1.40$ | $1.12$ | $1.04$ | $1.02$ |
> | $2020$ | $1.95$ | $1.28$ | $1.09$ | $1.07$ | |
> | $2021$ | $1.70$ | $1.30$ | $1.18$ | | |
> | $2022$ | $1.65$ | $1.45$ | | | |
> | $2023$ | $2.05$ | | | | |
>
> Test at the 5% level whether the triangle shows calendar year effects.
>
> > [!answer]-
> > **Medians.** They are $1.80$ for 12–24 and $1.12$ for 36–48 (odd counts, so those factors are dropped), $1.35$ for 24–36 and $1.055$ for 48–60. The single 60–72 factor is dropped.
> >
> > | AY | 12–24 | 24–36 | 36–48 | 48–60 |
> > |---|---|---|---|---|
> > | $2019$ | $\ast$ | L | $\ast$ | S |
> > | $2020$ | L | S | S | L |
> > | $2021$ | S | S | L | |
> > | $2022$ | S | L | | |
> > | $2023$ | L | | | |
> >
> > **Diagonals.** Each diagonal is labelled by the calendar year of the factor's later valuation:
> >
> > | Diagonal | $S_j$ | $L_j$ | $Z_j$ | $n$ | $m$ | $E(Z_j)$ | $\text{Var}(Z_j)$ |
> > |---|---|---|---|---|---|---|---|
> > | $2021$ | $0$ | $2$ | $0$ | $2$ | $0$ | $0.50$ | $0.2500$ |
> > | $2022$ | $2$ | $0$ | $0$ | $2$ | $0$ | $0.50$ | $0.2500$ |
> > | $2023$ | $4$ | $0$ | $0$ | $4$ | $1$ | $1.25$ | $0.4375$ |
> > | $2024$ | $0$ | $4$ | $0$ | $4$ | $1$ | $1.25$ | $0.4375$ |
> > | Total | | | $0$ | | | $3.50$ | $1.3750$ |
> >
> > For $n = 4$, $m = 1$:
> >
> > $$
> > \begin{align*}
> > E(Z_j) &= 2 - \binom{3}{1}\frac{4}{16} \\
> > &= 1.25 \\
> > \text{Var}(Z_j) &= 3 - 3 \cdot \frac{12}{16} + 1.25 - 1.5625 \\
> > &= 0.4375
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > E(Z) \pm 2\sqrt{\text{Var}(Z)} &= 3.5 \pm 2\sqrt{1.375} \\
> > &= (1.155,\ 5.845)
> > \end{align*}
> > $$
> >
> > $Z = 0$ lies outside the range, so the hypothesis of **no calendar year effects is rejected**. Every factor into the 2023 valuation is small and every factor out of it is large, which is the signature of a low 2023 diagonal, such as a payment backlog cleared in 2024. The 2021 diagonal looks high in the same way. Chain ladder factors averaged over these diagonals blend the distortion into every projection. The diagonals should be adjusted or modelled before the method is relied on.

> [!example]- A Diagonal Effect in a Forecast: Temporary or Permanent {Example}
> A parameterized Bornhuetter-Ferguson model $q(w,d) = f(d)h(w)$ is fitted to incremental paid losses (\$000). The parameters are $f(0..3) = 0.40, 0.30, 0.20, 0.10$ and $h = 10{,}000$, $11{,}000$, $12{,}000$ and $12{,}500$ for AYs 2021–2024. A diagonal dummy shows the 2024 payments running $10\%$ above the model on every accident year.
>
> (a) What are the fitted 2024 payments? (b) Estimate the unpaid claims if the 2024 effect was a one-time catch-up of payments held up by a court backlog. (c) Estimate them if it was a court ruling that raises awards on every claim settled from 2024 on.
>
> > [!answer]-
> > **(a)** The multiplicative diagonal effect scales each 2024 cell:
> >
> > | AY | Age | $f(d)h(w)$ | $\times 1.1$ |
> > |---|---|---|---|
> > | $2024$ | $0$ | $5{,}000$ | $5{,}500$ |
> > | $2023$ | $1$ | $3{,}600$ | $3{,}960$ |
> > | $2022$ | $2$ | $2{,}200$ | $2{,}420$ |
> > | $2021$ | $3$ | $1{,}000$ | $1{,}100$ |
> >
> > **(b) Temporary.** The effect is a distortion of one diagonal, so only the age and accident-year terms are used to forecast:
> >
> > $$
> > \begin{align*}
> > \text{AY 2022} &= 0.10(11{,}000) \\
> > &= 1{,}100 \\
> > \text{AY 2023} &= (0.20 + 0.10)(12{,}000) \\
> > &= 3{,}600 \\
> > \text{AY 2024} &= (0.30 + 0.20 + 0.10)(12{,}500) \\
> > &= 7{,}500 \\
> > \text{Total} &= 12{,}200
> > \end{align*}
> > $$
> >
> > **(c) Permanent.** Every future diagonal carries the higher award level, so each future cell is $10\%$ higher and the unpaid estimate is $1.1 \times 12{,}200 = 13{,}420$.
> >
> > The $1{,}220$ gap is decided by knowing what happened in 2024, not by the regression. Fitting the dummy in either case keeps the 2024 distortion out of $f(d)$ and $h(w)$.
