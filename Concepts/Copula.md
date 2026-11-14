---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:d578ddc0703964b5aa4c55d7b0ac9f4a890505b7d47dac31434a35a37d7ef23e
  sources:
    - "Venter, Tails of Copulas, PCAS LXXXIX (2002), pp.68-75 (copula definition and separation of marginals; any joint distribution; C(u,v) = Pr(U<=u,V<=v); simulation by inverting marginals; Kendall tau = 4E[C]-1, constant of the copula, Pearson not; Frank, Gumbel (tau 1-1/a, asymmetric, more right-tail weight than Frank), HRT (formula, tau 1/(2a+1)), normal (tau 2arcsin(a)/pi, easy simulation, multi-dimensional, lighter right tail than Gumbel/HRT, heavier than Frank)), p.77 and p.69 (Kreps's partial perfect copulas), pp.83-86 (L(z), R(z) and their conditional forms, R(1) and L(0) as tail dependence; LR function L below 1/2, R above; Gumbel, HRT, PP have R > 0; HRT heavier than Gumbel; normal and Frank no tail dependence in the limit, normal more concentration away from it; R values 2-2^(1/a), 2^(-a); target (tau, R); R hard to estimate, fit R(z) not just R), p.90 (HRT is the flipped Clayton), p.94 (sample Kendall tau as average sign over pairs), pp.100-101 (only normal and partial perfect copulas fully generalise to multivariate with all pairwise correlations), sha256:fd0251da893a2eddee0e67a44fe11fca86636686a81b3c14bac1815a4956dc06 — https://www.casact.org/sites/default/files/database/proceed_proceed02_02068.pdf"
    - "Embrechts, McNeil & Straumann, Correlation and Dependency in Risk Management: Properties and Pitfalls (ETH preprint), §4.3 Definition 6 and Theorem 3 pp.16-17 (Spearman = linear correlation of F1(X), F2(Y); Kendall's tau = P[concordant] - P[discordant]; monotonic vs linear dependence; range -1 to 1, 0 under independence, invariant under strictly monotonic transforms, = 1 iff Y an increasing function of X; zero rank correlation despite dependence; not moment-based, no variance-covariance manipulation), Fallacy 3 pp.25-26 (worst-case VaR of X+Y not in general at comonotonicity), sha256:2705fc20f5bad0de8bf45ab6325cee27fe86f119b9919438a455c3393e6653cd — https://people.math.ethz.ch/~embrecht/ftp/pitfalls.pdf"
    - "CAS Exam 7 Spring 2015 — sample answers and examiner's report, Q21 PDF pp.82-83 (copula benefits incl. joining any distributions without disclosing them, tail correlation; HRT or Gumbel over normal; Frank not fatter-tailed than normal), Q23 PDF pp.87-88 (Spearman by ranks, 1 - S/[n(n^2-1)/6]; Pearson cardinal and outlier-sensitive, Spearman ordinal, the outlier year), sha256:b3ff9352d93b7aeaa7ffe531de52bc928e635bd72fae89247fb310580c99a568 — https://www.casact.org/sites/default/files/2021-03/15-7.pdf"
    - "CAS Exam 7 Spring 2016 — sample answers and examiner's report, Q23 PDF pp.92-94 (default avoidance: far tail where the ERM model is least reliable, mainly protects policyholders, partial losses matter to shareholders; other reference points: renewals, thrive after a catastrophe, rating; capital as a multiple of TV@R from a 1-in-y loss tolerance), Q24 PDF pp.95-96 (TVaR linear in the tail, inconsistent with risk aversion; TVaR on transformed probabilities treats a loss 2x as large as more than 2x as bad; part b: EPD on transformed probabilities, value of put option, exponential moment), Q25 PDF p.97 (R(z): tail dependence with R(1) = 0, look a bit below 1; only the right tail, combine with L(z) for z <= 0.5; sparse tail data; one-dimensional), sha256:e07f38dd81edc9715ef2528c1861e75c609c85b598b51b723d665cf63b745b84 — https://www.casact.org/sites/default/files/2021-03/16-7.pdf"
    - "CAS Exam 7 Spring 2017 — sample answers and examiner's report, Q23c PDF pp.91-92 (Frank little right-tail correlation; for clash and accumulation events use Gumbel or HRT), sha256:c32697af25fff52e2c5e1e49de12dacd66662b78644bbb28fba827da035c03c4 — https://www.casact.org/sites/default/files/2021-01/17-7.PDF"
    - "CAS Exam 7 Spring 2019 — sample answers and examiner's report, Q19d-e PDF p.88 (WTVaR = TVaR on transformed probabilities; TVaR does not reflect risk aversion), Q20 PDF pp.89-90 (normal symmetric and uniform, HRT bunched in the upper right; HRT for lines uncorrelated except in extreme events; normal extends beyond two lines, easy to simulate; copula does not change the expected value, changes variability and VaR), sha256:f6c6d52b71498f5c65eae5da824d1f74f31bf531f5059dcc64f0bfcf7c4b8416 — https://www.casact.org/sites/default/files/2021-03/19-7_0.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Copula.md
---

A **Copula** $C(u,v)$ is a joint distribution of two uniform random variables on $[0,1]$, used to join the marginal distributions of two random variables $X$ and $Y$ into a joint distribution. It describes their dependence separately from the marginals, which is why [[Risk Modeling|internal risk models]] use copulas to correlate lines of business.

With marginal distribution functions $F_X$ and $F_Y$, the joint distribution function of $X$ and $Y$ is

> $$F(x,y) = C\big(F_X(x),\, F_Y(y)\big)$$

> $$C(u,v) = \Pr(U \leq u,\; V \leq v)$$

- $U = F_X(X)$ and $V = F_Y(Y)$ are the probabilities, or percentiles, of the two outcomes.

Any joint distribution can be written this way, with $C(u,v) = F\big(F_X^{-1}(u), F_Y^{-1}(v)\big)$. To simulate, draw a correlated pair $(u, v)$ from the copula and invert each marginal, $x = F_X^{-1}(u)$ and $y = F_Y^{-1}(v)$.

Because each variable is produced by inverting its own distribution function, a copula can join marginals of any family. A lognormal line can be joined to a Pareto line, and each keeps its own distribution whatever copula is used. A copula is a joint distribution of probabilities, not of losses, so the dependence can be described, fitted or reported without disclosing the loss distributions it joins.

The [[Rank Correlation|rank correlations]], Kendall's $\tau = 4E[C(U,V)] - 1$ and Spearman's $\rho$, depend only on the copula. The Pearson [[Correlation Coefficient|correlation]] also depends on the marginals.

> [!idea] The idea
> A correlation coefficient is one number for the whole joint distribution, and a copula says where in it the variables move together.

Two property lines may be almost unrelated in ordinary years and lose together when one hurricane hits both. A copula with a heavy right tail can describe that while leaving each line's own distribution untouched.

> [!example]- What are the mean and $\text{VaR}_{0.95}$ of the total loss under each copula? {Example}
> Two lines each lose $10$ when their percentile exceeds $0.9$ and nothing otherwise. They are joined by (a) the independence copula $C(u,v) = uv$, or (b) the perfect-dependence copula $C(u,v) = \min(u,v)$.
>
> > [!answer]-
> > - Each line's marginal is the same in both cases: $10$ with probability $0.1$, mean $1$.
> > - (a) The total is $20$ with probability $0.01$, $10$ with probability $0.18$ and $0$ with probability $0.81$.
> > - Its mean is $0.2 + 1.8 = 2$. $F(0) = 0.81$ and $F(10) = 0.99$, so $\text{VaR}_{0.95} = 10$.
> > - (b) Both lines lose together, so the total is $20$ with probability $0.1$ and $0$ otherwise.
> > - Its mean is $2$. $F(0) = 0.90 < 0.95$, so $\text{VaR}_{0.95} = 20$.
> > - The mean is $2$ either way, and the copula doubled the $95\%$ VaR.

Perfect dependence is not always the worst case for VaR. For other marginals and levels, a different copula can give a higher VaR of the sum.

## Tail concentration functions

Copulas with the same $\tau$ differ mainly in where the association is strongest. In property and casualty work, that is often among the large losses, in the right tails. The right-tail concentration function, the probability that one variable is above its $z$-th percentile given that the other is, is

> $$R(z) = \Pr(U > z \mid V > z) = \frac{1 - 2z + C(z,z)}{1 - z}$$

Its left-tail mirror is

> $$L(z) = \Pr(U < z \mid V < z) = \frac{C(z,z)}{z}$$

The limit $R(1)$ is the upper **tail dependence** and $L(0)$ the lower. $R(1) = 0$ does not mean there is no tail association: a copula can show concentration short of the limit, and an empirical $R(z)$ near $1$ rests on very few points. So read $R(z)$ over a range below $1$, not just its limit. $R(z)$ shows only the right tail, so Venter plots $L$ for $z < \tfrac12$ and $R$ above, and a copula is chosen on this curve together with Kendall's $\tau$.

> [!example]- For the HRT copula with $a = 1$, what are $R(0.9)$ and $R(0.99)$, and how do they compare with independence? {Example}
> - With $u = v = z$, the HRT copula below gives $1 - 2z + C(z,z) = \big[2(1-z)^{-1/a} - 1\big]^{-a}$.
> - $R(0.9) = (2 \times 10 - 1)^{-1}/0.1 = 0.526$.
> - $R(0.99) = (2 \times 100 - 1)^{-1}/0.01 = 0.503$.
> - Independence, $C(u,v) = uv$, gives $1 - 2z + z^2 = (1-z)^2$, so $R(z) = 1 - z$, which is $0.10$ and $0.01$.
> - Under the HRT, when one variable is in its worst $1\%$ the other is there too about half the time, levelling off at $R(1) = 2^{-1} = 0.5$. Under independence that share falls to zero.

## Common copula families

From lightest to heaviest right tail:

| Copula | Tails | Kendall's $\tau$ | $R(1)$ |
| --- | --- | --- | --- |
| Frank | Symmetric, light in both | | $0$ |
| Normal | Symmetric | $2\arcsin(a)/\pi$ | $0$ |
| Gumbel | Asymmetric, more weight in the right | $1 - 1/a$ | $2 - 2^{1/a}$ |
| Heavy right tail (HRT) | Weak in the left, strong in the right | $1/(2a+1)$ | $2^{-a}$ |

The **Frank** copula has less tail concentration than the normal on both sides, so it understates how lines move together in extreme events. The **normal** copula's parameter $a$ is the normal correlation. It has no tail dependence in the limit, though more concentration than the Frank short of it. It is easy to simulate and extends to many variables through a correlation matrix. The **Gumbel** and **HRT** copulas have right-tail dependence, the HRT the heavier. For clash and accumulation events, and for lines uncorrelated except in extreme events, a copula with right-tail dependence such as the Gumbel or HRT is chosen over the normal or Frank.

The HRT copula, the flipped Clayton copula, is

> $$C(u,v) = u + v - 1 + \big[(1-u)^{-1/a} + (1-v)^{-1/a} - 1\big]^{-a}$$

Of the copulas Venter reviews, only the normal and Kreps's partial perfect correlation copulas fully generalise to more than two variables with every pairwise correlation specified, so the HRT is a two-variable tool. On a scatter plot of simulated $(u,v)$, a symmetric copula (normal, Frank) looks the same near $(0,0)$ as near $(1,1)$. An HRT copula is asymmetric, its points scattered near $(0,0)$ and bunched along the diagonal near $(1,1)$.

> [!trap] Crediting a heavier-tailed copula with a higher mean
> Changing the copula never changes the expected value of the sum. Each marginal is unchanged, and $E[X + Y] = E[X] + E[Y]$ needs no independence. What changes is the spread and the tail, the VaR or TVaR of $X + Y$.
