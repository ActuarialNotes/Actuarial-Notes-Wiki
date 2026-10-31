---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e2cfb4128e25cfbd09a327525c02969c56e6cc4f3a073d671c2c7911982d55d9
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Rank Correlation.md
---

**Rank Correlation** measures how strongly two variables move together using only the *order* of their values, not the values themselves. The two standard measures are **Spearman's rho** $\rho_S$ and **Kendall's tau** $\tau$; both run from $-1$ to $+1$, like the Pearson [[Correlation Coefficient|correlation coefficient]].

> $$\rho_S = 1 - \frac{6\sum_{i=1}^{n} d_i^2}{n(n^2 - 1)}$$

> $$\tau = \Pr\big[(X_1 - X_2)(Y_1 - Y_2) > 0\big] - \Pr\big[(X_1 - X_2)(Y_1 - Y_2) < 0\big]$$

- **Computing Spearman's rho from data:** rank each variable's $n$ observations separately, by size, the smallest getting rank $1$; for each pair take $d_i$, the difference between its two ranks; square and sum. Writing $S = \sum d_i^2$, the same formula reads $\rho_S = 1 - S\big/\big[n(n^2-1)/6\big]$. In the population, Spearman's rho is the Pearson correlation of the percentiles $F_X(X)$ and $F_Y(Y)$.
- **Kendall's tau** compares every pair of observations: a pair is *concordant* if the one with the larger $x$ also has the larger $y$, *discordant* otherwise. The sample estimate is the average of $\text{sign}\big[(x_i - x_j)(y_i - y_j)\big]$ over all $n(n-1)/2$ pairs — concordant share minus discordant share.
- **Cardinal versus ordinal.** Pearson's correlation is a *cardinal* measure: it uses each value's deviation from the mean, multiplied together and squared, so the size of the values matters and a few extreme ones can dominate it. Rank correlations are *ordinal*: they depend only on ranks, so an extreme value counts no more than any other top-ranked one.
- **Invariance.** Rank correlations are unchanged by any strictly increasing transformation of either variable, such as taking logs; the Pearson correlation in general is not. Pearson measures *linear* dependence, rank correlation *monotonic* dependence: $\rho_S = \tau = 1$ exactly when $Y$ is an increasing function of $X$. Independence gives $0$, though $0$ does not prove independence.
- **They depend only on the copula.** Any pair of variables joined by the same [[Copula|copula]] has the same $\tau$ and $\rho_S$, whatever their marginals — which is why Kendall's tau is used to compare and fit copulas — whereas the Pearson correlation also depends on the marginals.
- **The price of invariance:** rank correlations are not moment-based, so they don't combine through variance–covariance algebra as Pearson correlations do. Mack's [[Development Factor Correlation Test]] uses Spearman's rho because a rank test is distribution-free.

> [!idea] The idea
> Pearson asks whether the points lie near a straight line, weighting each point by how far it sits from the mean; ranks ask only whether a larger $x$ goes with a larger $y$. So one pair that is the largest in *both* series adds a huge product of deviations to Pearson's numerator, but only a rank difference of zero to Spearman's.

> [!trap] An outlier pair inflates Pearson
> When Pearson is high and the rank measures are near zero, look for one pair that is extreme in both series. It drives the Pearson figure; take it out and the apparent correlation can vanish or reverse. Explaining the gap needs both halves: Pearson is cardinal and outlier-sensitive, rank correlation is ordinal.

> [!example]- Pearson, Spearman and Kendall on the Same Six Years {Example}
> Annual losses for two regions (\$M):
>
> | Year | 1 | 2 | 3 | 4 | 5 | 6 |
> |---|---|---|---|---|---|---|
> | $x$ | $4$ | $7$ | $5$ | $9$ | $6$ | $20$ |
> | $y$ | $12$ | $8$ | $11$ | $9$ | $10$ | $25$ |
>
> Compute the Pearson correlation, Spearman's rho and Kendall's tau, and explain the difference.
>
> > [!answer]-
> > **Pearson.** $\bar x = 8.5$, $\bar y = 12.5$. The products of deviations are $2.25,\ 6.75,\ 5.25,\ -1.75,\ 6.25,\ 143.75$, summing to $162.5$; $\sum (x - \bar x)^2 = 173.5$ and $\sum (y - \bar y)^2 = 197.5$.
> >
> > $$
> > \begin{align*}
> > r &= \frac{162.5}{\sqrt{173.5 \times 197.5}} \\
> > &= 0.878
> > \end{align*}
> > $$
> >
> > **Spearman.** Ranks of $x$ (smallest $= 1$): $1, 4, 2, 5, 3, 6$. Ranks of $y$: $5, 1, 4, 2, 3, 6$. Differences $-4, 3, -2, 3, 0, 0$, so $\sum d^2 = 16 + 9 + 4 + 9 = 38$.
> >
> > $$
> > \begin{align*}
> > \rho_S &= 1 - \frac{6 \times 38}{6(36 - 1)} \\
> > &= 1 - 1.086 \\
> > &= -0.086
> > \end{align*}
> > $$
> >
> > **Kendall.** Of the $15$ pairs of years, $6$ are concordant and $9$ discordant, so $\tau = (6 - 9)/15 = -0.20$.
> >
> > Year 6 is the largest in both series. Its deviations, $11.5$ and $12.5$, give a product of $143.75$ — almost all of Pearson's numerator. In ranks it is just $(6, 6)$, and the other five years run slightly the opposite way, so both rank measures are a little negative.

> [!tip]- How it appears on the exam
> - **Exam 9:** Measuring dependence between lines for an enterprise risk model. Questions ask for Pearson's and Spearman's correlation on a short series and an explanation of why they disagree (cardinal against ordinal, the outlier pair), or for Kendall's tau as the copula-level measure.

> [!warning]- Exam traps
> - **Rank each variable on its own.** The ranks come from sorting $x$ and sorting $y$ separately, never from the order of the pairs.
> - **Keep the $6$:** $\rho_S = 1 - 6\sum d^2/[n(n^2-1)]$. Dropping it shrinks the subtracted term sixfold and pushes $\rho_S$ toward $1$.
> - **A low rank correlation doesn't make Pearson wrong** — they measure different things. Say which one the decision needs, and say what drives the gap.
