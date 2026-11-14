---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:1114116fb34859ea1b079846b1b5f1b14512ba3ed2c2854e93fffd3566fccc13
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Development Factor Correlation Test.md
---

A **Development Factor Correlation Test** checks whether a triangle's [[Development Factor|development factors]] are correlated across ages, that is, whether a year with a high factor at one age tends to have a low (or high) factor at the next. The [[Chain Ladder Method|chain ladder]] assumes they are not. Under Mack's assumption $E(C_{i,k+1} \mid C_{i1}, \dots, C_{ik}) = C_{ik}f_k$, the expected next factor is $f_k$ whatever the previous factor was, so subsequent factors are uncorrelated. The chain ladder should not be applied to business where a high factor is usually followed by a low one, or vice versa ([[Mack Chain Ladder Model]]).

## Mack's test of the whole triangle

[[Measuring the Variability of Chain Ladder Reserve Estimates (Mack - 1994)|Mack (1994)]] compares each column of factors with the column before it by Spearman's rank correlation. $r_{ik}$ ranks the $I-k$ factors $C_{i,k+1}/C_{ik}$ of column $k$. $s_{ik}$ ranks the preceding factors $C_{ik}/C_{i,k-1}$ of the same accident years, leaving out the latest year, which has no next factor yet. Ranks make the test distribution-free and blunt the unequal variances of the factors. The rank correlation of column $k$ is

> $$T_k = 1 - \frac{6\sum_{i=1}^{I-k}(r_{ik} - s_{ik})^2}{(I-k)^3 - (I-k)}$$

- $I$ is the number of accident years in the triangle.
- $I-k$ is the number of pairs of factors compared.

Under the null hypothesis of no correlation, $E(T_k) = 0$ and $\text{Var}(T_k) = 1/(I-k-1)$. The statistic for the whole triangle averages the $T_k$ with weights inversely proportional to these variances, and is

> $$T = \frac{\sum_{k=2}^{I-2}(I-k-1)\,T_k}{\sum_{k=2}^{I-2}(I-k-1)}$$

Under the null hypothesis, $E(T) = 0$, $T$ is treated as Normal, and its variance is

> $$\text{Var}(T) = \frac{1}{(I-2)(I-3)/2}$$

The whole triangle is used to project the reserve, so what matters is whether correlation prevails across the triangle, not whether one small part of it shows correlation. Because the test is only approximate and should catch correlation in a substantial part of the triangle, Mack uses a **50%** interval: reject if $|T| > 0.67\sqrt{\text{Var}(T)}$.

> [!example]- Are adjacent factors in this triangle correlated, at Mack's 50% level? {Example}
> The paid age-to-age factors of a triangle with $I = 6$ accident years are:
>
> | AY | 12–24 | 24–36 | 36–48 | 48–60 | 60–72 |
> | :--- | ---: | ---: | ---: | ---: | ---: |
> | 2019 | 2.10 | 1.25 | 1.06 | 1.05 | 1.01 |
> | 2020 | 1.60 | 1.30 | 1.12 | 1.03 | |
> | 2021 | 1.90 | 1.20 | 1.08 | | |
> | 2022 | 1.75 | 1.38 | | | |
> | 2023 | 2.30 | | | | |
>
> > [!answer]-
> > - $T_k$ is computed for $k = 2, 3, 4$.
> > - For $T_2$, the 24–36 factors of 2019–2022 rank $r = 2, 3, 1, 4$ and their 12–24 factors rank $s = 4, 1, 3, 2$. The 2023 factor is left out.
> > - The squared rank differences sum to $4 + 4 + 4 + 4 = 16$, so $T_2 = 1 - 6(16)/(4^3 - 4) = -0.6$.
> > - For $T_3$, 2019–2021 rank $r = 1, 3, 2$ and $s = 2, 3, 1$, so the sum is $2$ and $T_3 = 1 - 12/24 = 0.5$.
> > - For $T_4$, 2019–2020 rank $r = 2, 1$ and $s = 1, 2$, so the sum is $2$ and $T_4 = 1 - 12/6 = -1$.
> > - The weights are $3$, $2$ and $1$, so $T = (3(-0.6) + 2(0.5) + 1(-1))/6 = -0.30$.
> > - $\text{Var}(T) = 1/((4)(3)/2) = 1/6$, and the bound is $0.67\sqrt{1/6} = 0.274$.
> > - $|T| = 0.30 > 0.274$, so uncorrelated factors are **rejected**. The correlation is negative: a high 12–24 factor tends to be followed by a low 24–36 one.

## Venter's pairwise test

[[Testing the Assumptions of Age-to-Age Factors (Venter - 1998)|Venter (1998)]] computes the sample [[Correlation Coefficient|correlation]] $r$ for *every* pair of columns, over the first $n$ years of both, where $n$ is the length of the shorter column. Its test statistic is

> $$T = r\sqrt{\frac{n-2}{1-r^2}} \sim t_{n-2}$$

Correlations can be positive or negative, so the test is two-tailed: $r$ is significant at the 10% level when $|T|$ exceeds the $t$-statistic for $0.95$ at $n-2$ degrees of freedom. This is the 2020 erratum. The paper as printed said $T$ greater than the statistic for $0.9$.

Testing many pairs makes some significant by chance alone. With $m$ pairs, the number significant at 10% is Binomial$(m, 0.1)$, with standard deviation $0.3\sqrt m$. More than $0.1m + \sqrt m$ significant pairs (the mean plus $3.33$ standard deviations) strongly suggests real correlation, as would a single pair significant at the 0.1% level. If the factors are correlated, their product is biased, and $E[XY] = E[X]E[Y] + \text{Cov}(X,Y)$ can correct it ([[Chain Ladder Assumptions]]).

> [!example]- Does Venter's test find correlation in the triangle above, at the 10% level? {Example}
> Test every pair of columns that share at least three years. The $t$-statistics for $0.95$ are $6.314$ at $1$ degree of freedom and $2.920$ at $2$.
>
> > [!answer]-
> > - The 12–24 and 24–36 columns share $n = 4$ years. Their correlation is $r = -0.536$, so $T = -0.536\sqrt{2/(1 - 0.2875)} = -0.898$.
> > - $|T| = 0.898 < 2.920$, so this pair is not significant.
> > - The 12–24 and 36–48 columns share $n = 3$ years, with $r = -0.997$ and $T = -13.3$. $|T| > 6.314$, so this pair is significant.
> > - The 24–36 and 36–48 columns share $n = 3$ years, with $r = 0.655$ and $T = 0.87$, not significant.
> > - With $m = 3$ pairs, the threshold is $0.1(3) + \sqrt 3 = 2.03$ significant pairs. One is short of it, so Venter's count does not suggest real correlation.

> [!trap] Testing only one tail
> Under the printed one-tailed wording, a negative $T$ could never exceed the $0.9$ statistic, so a negative correlation such as the 12–24 against 36–48 pair above ($T = -13.3$) would go unflagged. Compare $|T|$ with the $0.95$ statistic.
