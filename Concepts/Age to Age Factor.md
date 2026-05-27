**Age-to-Age Factor** (link ratio) is the ratio of cumulative losses at one development age to cumulative losses at the prior development age for the same accident year, measuring the development expected between those two maturities.

> $$f_{n \to n+1} = \frac{\text{Cumulative Losses at age } n{+}1}{\text{Cumulative Losses at age } n}$$

- Individual year factors are computed for each accident year; a **selected factor** is then chosen — typically a simple average, volume-weighted average (sum of column $n{+}1$ divided by sum of column $n$), or latest-$k$-year average
- The volume-weighted (chain-weighted) average gives more credibility to accident years with larger loss amounts, making it less sensitive to individual outlier years
- Age-to-age factors are chained together to produce the [[Cumulative Development Factor]]; each factor must be $\geq 1.0$ for lines where losses do not decrease over time
- A factor that varies significantly by calendar year (diagonal trend) may indicate changing claims practices — a signal to consider the [[Berquist Sherman Method]]

> [!example]- Factor Selection from Triangle {Example}
> Cumulative incurred losses ($000s):
>
> | AY | 12 mo | 24 mo | 36 mo |
> |----|-------|-------|-------|
> | 2021 | 500 | 750 | 875 |
> | 2022 | 550 | 825 | 950 |
> | 2023 | 600 | 900 | — |
>
> > [!answer]-
> > 12-to-24 factors: $750/500 = 1.500$; $825/550 = 1.500$; $900/600 = 1.500$
> >
> > Volume-weighted: $(750+825+900)/(500+550+600) = 2{,}475/1{,}650 = 1.500$
> >
> > 24-to-36 factors: $875/750 = 1.167$; $950/825 = 1.152$; volume-weighted $= (875+950)/(750+825) = 1{,}825/1{,}575 = 1.159$
> >
> > Selected: $f_{12\text{-}24} = 1.500$, $f_{24\text{-}36} = 1.159$ (volume-weighted)
