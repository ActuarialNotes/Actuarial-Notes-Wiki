---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:46bf513d795d3b02a265f5396b448c343407db187110641e3232fc33673b3699
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Development Factor.md
---

A **Development Factor**, also called a link ratio or [[Age to Age Factor|age-to-age factor]], is the ratio of a cohort's cumulative claims at one maturity age to its claims at the previous age. It projects claims from one age to the next and is the building block of the [[Chain Ladder Method|chain ladder method]]. For accident year AY, the development factor from age $n$ to age $n+1$ is

> $$f_{n \to n+1} = \frac{C_{\text{AY},\,n+1}}{C_{\text{AY},\,n}}$$

- $C_{\text{AY},n}$ is the accident year's cumulative claims at age $n$, such as its reported claims, paid claims or claim counts.

The selected factors, multiplied together from an age to the last, give the [[Cumulative Development Factor|cumulative development factor]] to ultimate. An accident year's latest claims times that factor are its ultimate claims.

## Averages of development factors

One factor is selected for each age from the column of observed factors, usually by an average:

1. **Simple average**, the unweighted mean of the factors, which treats each accident year equally regardless of size.
2. **Volume-weighted average**, the sum of the claims at age $n+1$ divided by the sum at age $n$ over the same accident years, which gives more weight to the larger years.
3. **Latest-$k$-year average**, an average of only the most recent $k$ accident years, which reduces the influence of older data that may no longer represent the pattern.
4. **Medial average**, the average with the highest and lowest factors dropped, which reduces the effect of outliers without discarding recent years.

The averages differ when the factors in a column are not uniform. The selection rests on the stability of the factors and how recent they are. When the development pattern has shifted, an average of the latest years reflects the change. When the pattern is stable, an average of all years or the medial average uses more data.

> [!example]- What are the simple, volume-weighted, latest 3-year and medial averages of these 12-24 factors? {Example}
> Reported claims at 12 and 24 months are:
>
> | Accident year | 12 months | 24 months | 12-24 factor |
> | :--- | ---: | ---: | ---: |
> | 2020 | 1,000 | 1,400 | 1.400 |
> | 2021 | 1,200 | 1,944 | 1.620 |
> | 2022 | 1,500 | 2,250 | 1.500 |
> | 2023 | 2,000 | 3,120 | 1.560 |
>
> > [!answer]-
> > - The simple average is $(1.400 + 1.620 + 1.500 + 1.560)/4 = 1.520$.
> > - The volume-weighted average is $8{,}714/5{,}700 = 1.529$, larger because the largest year, 2023, has a high factor.
> > - The latest 3-year average is $(1.620 + 1.500 + 1.560)/3 = 1.560$.
> > - The medial average drops 1.620 and 1.400, leaving $(1.500 + 1.560)/2 = 1.530$.
