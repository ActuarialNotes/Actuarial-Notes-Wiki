---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:1faaa63c0613208bff70d52d34f95939a417f17f2a4592eb46bb89016cbdaab1
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Development Factor Correlation Test.md
---

**Development Factor Correlation Test** checks whether a triangle's development factors are correlated across ages, that is, whether a year with a high factor at one age tends to have a low (or high) factor at the next. The [[Chain Ladder Method|chain ladder]]'s mean assumption rules this out. [[Measuring the Variability of Chain Ladder Reserve Estimates (Mack - 1994)|Mack (1994)]] tests the whole triangle with Spearman's rank correlation, averaging over adjacent columns:

> $$T_k = 1 - \frac{6\sum_{i=1}^{I-k}(r_{ik} - s_{ik})^2}{(I-k)^3 - (I-k)}$$
>
> $$T = \frac{\sum_{k=2}^{I-2}(I-k-1)\,T_k}{\sum_{k=2}^{I-2}(I-k-1)}$$
>
> $$\text{Var}(T) = \frac{1}{(I-2)(I-3)/2}$$

- **Why it matters.** Under Mack's assumption $E(C_{i,k+1} \mid C_{i1}, \dots, C_{ik}) = C_{ik}f_k$, the expected next factor is $f_k$ whatever the previous factor was, so subsequent factors are uncorrelated. The chain ladder should not be applied to business where a high factor is usually followed by a low one, or vice versa ([[Mack Chain Ladder Model]]).
- **Mack's procedure.** $r_{ik}$ ranks the $I-k$ factors $C_{i,k+1}/C_{ik}$ of column $k$. $s_{ik}$ ranks the preceding factors $C_{ik}/C_{i,k-1}$ of the same accident years, leaving out the latest year, which has no next factor yet. Ranks make the test distribution-free and blunt the unequal variances of the factors. Under the null hypothesis $E(T_k) = 0$ and $\text{Var}(T_k) = 1/(I-k-1)$, so the weights $I-k-1$ are inversely proportional to the variances. $T$ is treated as Normal. Because the test is only approximate and should catch correlation in a substantial part of the triangle, Mack uses a **50%** interval: reject if $|T| > 0.67\sqrt{\text{Var}(T)}$.
- **Venter's pairwise test.** [[Testing the Assumptions of Age-to-Age Factors (Venter - 1998)|Venter (1998)]] computes the sample [[Correlation Coefficient|correlation]] $r$ for *every* pair of columns, over the first $n$ years of both, where $n$ is the length of the shorter column. Then:

> $$T = r\sqrt{\frac{n-2}{1-r^2}} \sim t_{n-2}$$

- **The 2020 erratum.** Correlations can be positive or negative, so the test is two-tailed: $r$ is significant at the 10% level when $|T|$ exceeds the $t$-statistic for $0.95$ at $n-2$ degrees of freedom. The paper as printed said $T$ greater than the statistic for $0.9$.
- **Counting significant pairs.** With $m$ pairs, the number significant at 10% is Binomial$(m, 0.1)$, with standard deviation $0.3\sqrt m$. More than $0.1m + \sqrt m$ significant pairs (the mean plus $3.33$ standard deviations) strongly suggests real correlation, as would a single pair significant at the 0.1% level. If the factors are correlated, their product is biased; $E[XY] = E[X]E[Y] + \text{Cov}(X,Y)$ can correct it ([[Chain Ladder Assumptions]]).

> [!example]- Mack's Spearman Test on a Triangle {Example}
> Paid age-to-age factors:
>
> | AY | 12–24 | 24–36 | 36–48 | 48–60 | 60–72 |
> |---|---|---|---|---|---|
> | $2019$ | $2.10$ | $1.25$ | $1.06$ | $1.05$ | $1.01$ |
> | $2020$ | $1.60$ | $1.30$ | $1.12$ | $1.03$ | |
> | $2021$ | $1.90$ | $1.20$ | $1.08$ | | |
> | $2022$ | $1.75$ | $1.38$ | | | |
> | $2023$ | $2.30$ | | | | |
>
> Test whether adjacent factors are correlated, at Mack's 50% level.
>
> > [!answer]-
> > Here $I = 6$, so $T_k$ is computed for $k = 2, 3, 4$.
> >
> > **$T_2$** (24–36 against 12–24, AYs 2019–2022; the 2023 factor is left out): the 24–36 ranks are $r = 2, 3, 1, 4$ and the 12–24 ranks are $s = 4, 1, 3, 2$.
> >
> > $$
> > \begin{align*}
> > \textstyle\sum d^2 &= 4 + 4 + 4 + 4 \\
> > &= 16 \\
> > T_2 &= 1 - \frac{6(16)}{4^3 - 4} \\
> > &= -0.6
> > \end{align*}
> > $$
> >
> > **$T_3$** (36–48 against 24–36, AYs 2019–2021): $r = 1, 3, 2$ and $s = 2, 3, 1$, so $\sum d^2 = 2$ and $T_3 = 1 - 12/24 = 0.5$.
> >
> > **$T_4$** (48–60 against 36–48, AYs 2019–2020): $r = 2, 1$ and $s = 1, 2$, so $\sum d^2 = 2$ and $T_4 = 1 - 12/6 = -1$.
> >
> > $$
> > \begin{align*}
> > T &= \frac{3(-0.6) + 2(0.5) + 1(-1)}{3 + 2 + 1} \\
> > &= -0.30 \\
> > \text{Var}(T) &= \frac{1}{(4)(3)/2} \\
> > &= \frac{1}{6} \\
> > 0.67\sqrt{1/6} &= 0.274
> > \end{align*}
> > $$
> >
> > $|T| = 0.30 > 0.274$, so uncorrelated factors are **rejected**. The correlation is negative: a high 12–24 factor tends to be followed by a low 24–36 one. Mack's advice is to apply the chain ladder with reluctance here and to look at the correlations in more detail.

> [!example]- Venter's Pairwise Test With the Two-Tailed Erratum {Example}
> Use the triangle above. Test the 12–24 and 24–36 columns for correlation at the 10% level. Then apply Venter's count to all pairs of columns that share at least three years. The $t$-statistics for $0.95$ are $6.314$ ($1$ df) and $2.920$ ($2$ df).
>
> > [!answer]-
> > The two columns share $n = 4$ years. $X$ = 12–24 has mean $1.8375$ and $Y$ = 24–36 has mean $1.2825$:
> >
> > $$
> > \begin{align*}
> > \textstyle\sum (x - \bar x)(y - \bar y) &= -0.026375 \\
> > \textstyle\sum (x - \bar x)^2 &= 0.136875 \\
> > \textstyle\sum (y - \bar y)^2 &= 0.017675 \\
> > r &= \frac{-0.026375}{\sqrt{0.136875 \times 0.017675}} \\
> > &= -0.536 \\
> > T &= -0.536\sqrt{\frac{2}{1 - 0.2875}} \\
> > &= -0.898
> > \end{align*}
> > $$
> >
> > $|T| = 0.898 < 2.920$, so this pair is **not** significant at 10%.
> >
> > **All pairs.** Three pairs share at least three years. 12–24 with 36–48 ($n = 3$) gives $r = -0.997$ and $T = -13.3$, and $|T| > 6.314$, so it is significant. 24–36 with 36–48 ($n = 3$) gives $r = 0.655$ and $T = 0.87$, not significant.
> >
> > With $m = 3$, the threshold is $0.1(3) + \sqrt 3 = 2.03$ significant pairs. One is well short of it, so Venter's count does not suggest real correlation.
> >
> > The two tests disagree because they are built differently. Mack's pools the whole triangle and deliberately uses a 50% interval; Venter's asks each pair for 10% significance. Under the printed (pre-erratum) wording, a *negative* $T$ could never have exceeded the $0.9$ statistic, so negative correlations such as these would have gone unflagged.
