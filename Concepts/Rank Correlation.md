---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:e2cfb4128e25cfbd09a327525c02969c56e6cc4f3a073d671c2c7911982d55d9
  sources:
    - "Embrechts, McNeil & Straumann, Correlation and Dependency in Risk Management: Properties and Pitfalls (ETH preprint), §4.3 Definition 6 and Theorem 3 pp.16-17 (Spearman = linear correlation of F1(X), F2(Y); Kendall's tau = P[concordant] - P[discordant]; monotonic vs linear dependence; range -1 to 1, 0 under independence, invariant under strictly monotonic transforms, = 1 iff Y an increasing function of X; zero rank correlation despite dependence; not moment-based, no variance-covariance manipulation), Fallacy 3 pp.25-26 (worst-case VaR of X+Y not in general at comonotonicity), sha256:2705fc20f5bad0de8bf45ab6325cee27fe86f119b9919438a455c3393e6653cd — https://people.math.ethz.ch/~embrecht/ftp/pitfalls.pdf"
    - "Mack, Measuring the Variability of Chain Ladder Reserve Estimates (CAS Forum Spring 1994), Appendix G pp.156-157 (Spearman's test, distribution-free; rank by size, smallest rank one; T_k = 1 - 6 sum (r-s)^2 / ((I-k)^3 - (I-k)); -1 <= T_k <= 1), sha256:f20a3d7ff26247fb26839073418b918b9823e6908829f9ae8f889f636e1a9da5 — https://www.casact.org/sites/default/files/2021-03/7_Mack_1994.pdf"
    - "Venter, Tails of Copulas, PCAS LXXXIX (2002), pp.68-75 (copula definition and separation of marginals; any joint distribution; C(u,v) = Pr(U<=u,V<=v); simulation by inverting marginals; Kendall tau = 4E[C]-1, constant of the copula, Pearson not; Frank, Gumbel (tau 1-1/a, asymmetric, more right-tail weight than Frank), HRT (formula, tau 1/(2a+1)), normal (tau 2arcsin(a)/pi, easy simulation, multi-dimensional, lighter right tail than Gumbel/HRT, heavier than Frank)), p.77 and p.69 (Kreps's partial perfect copulas), pp.83-86 (L(z), R(z) and their conditional forms, R(1) and L(0) as tail dependence; LR function L below 1/2, R above; Gumbel, HRT, PP have R > 0; HRT heavier than Gumbel; normal and Frank no tail dependence in the limit, normal more concentration away from it; R values 2-2^(1/a), 2^(-a); target (tau, R); R hard to estimate, fit R(z) not just R), p.90 (HRT is the flipped Clayton), p.94 (sample Kendall tau as average sign over pairs), pp.100-101 (only normal and partial perfect copulas fully generalise to multivariate with all pairwise correlations), sha256:fd0251da893a2eddee0e67a44fe11fca86636686a81b3c14bac1815a4956dc06 — https://www.casact.org/sites/default/files/database/proceed_proceed02_02068.pdf"
    - "CAS Exam 7 Spring 2015 — sample answers and examiner's report, Q21 PDF pp.82-83 (copula benefits incl. joining any distributions without disclosing them, tail correlation; HRT or Gumbel over normal; Frank not fatter-tailed than normal), Q23 PDF pp.87-88 (Spearman by ranks, 1 - S/[n(n^2-1)/6]; Pearson cardinal and outlier-sensitive, Spearman ordinal, the outlier year), sha256:b3ff9352d93b7aeaa7ffe531de52bc928e635bd72fae89247fb310580c99a568 — https://www.casact.org/sites/default/files/2021-03/15-7.pdf"
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
