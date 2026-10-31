---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:db57ce8b3868a6ba0b33b1bb0f642b4b74a7c1b7b9c8788780a76a4b56117086
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

> $$F(x,y) = C\big(F_X(x),\, F_Y(y)\big)$$

> $$C(u,v) = \Pr(U \leq u,\; V \leq v)$$

> $$R(z) = \Pr(U > z \mid V > z) = \frac{1 - 2z + C(z,z)}{1 - z}$$

- where $F_X$ and $F_Y$ are the marginal distribution functions and $U = F_X(X)$, $V = F_Y(Y)$ are the probabilities, or percentiles, of the two outcomes. Any joint distribution can be written this way, with $C(u,v) = F\big(F_X^{-1}(u), F_Y^{-1}(v)\big)$. To simulate, draw a correlated pair $(u, v)$ from the copula and invert each marginal: $x = F_X^{-1}(u)$, $y = F_Y^{-1}(v)$.
- **A copula can join marginals of any family.** Because each variable is produced by inverting its own distribution function, a lognormal line can be joined to a Pareto line, and each keeps its own distribution whatever copula is used.
- **A copula carries no information about the size of the losses.** It is a joint distribution of probabilities, not of losses, so the dependence can be described, fitted or reported on its own, without disclosing the loss distributions it joins.
- **Rank measures belong to the copula.** Kendall's $\tau = 4E[C(U,V)] - 1$ and Spearman's $\rho$ depend only on the copula, while the Pearson [[Correlation Coefficient|correlation]] also depends on the marginals ([[Rank Correlation]]).
- **Copulas let the strength of dependence vary across the distribution.** Copulas with the same $\tau$ differ mainly in *where* the association is strongest — for property and casualty work, often among the large losses, in the right tails. The **tail concentration functions** measure this: $R(z)$ above is the chance that one variable is above its $z$-th percentile given that the other is, and $L(z) = C(z,z)/z = \Pr(U < z \mid V < z)$ is its left-tail mirror. The limit $R(1)$ is the upper **tail dependence** and $L(0)$ the lower.
- **The common families**, from lightest to heaviest right tail:
  - *Frank* — symmetric and light in both tails: no tail dependence, and less tail concentration than the normal on both sides. Frank's copula does not have a heavier tail than the normal copula, so it understates how lines move together in extreme events.
  - *Normal* — its parameter is the normal correlation $a$, with $\tau = 2\arcsin(a)/\pi$. Symmetric, so its two tails behave alike; no tail dependence in the limit, though more concentration than the Frank short of it. Easy to simulate, and it extends to many variables through a correlation matrix.
  - *Gumbel* — asymmetric, with more weight in the right tail than the Frank; $\tau = 1 - 1/a$ and $R(1) = 2 - 2^{1/a}$.
  - *Heavy right tail (HRT)* — weak dependence in the left tail and strong in the right: $C(u,v) = u + v - 1 + \big[(1-u)^{-1/a} + (1-v)^{-1/a} - 1\big]^{-a}$, with $\tau = 1/(2a+1)$ and $R(1) = 2^{-a}$. It is the flipped Clayton copula. Of the copulas Venter reviews, only the normal and Kreps's partial perfect correlation copulas fully generalise to more than two variables with every pairwise correlation specified, so the HRT is a two-variable tool.

> [!idea] The idea
> A correlation coefficient is one number for the whole joint distribution; a copula says where in it the variables move together. Two property lines may be almost unrelated in ordinary years and lose together when one hurricane hits both — a copula with a heavy right tail can say exactly that, while leaving each line's own distribution untouched.

> [!trap] The copula moves the tail, not the mean
> Changing the copula never changes the expected value of the sum: each marginal is unchanged, and $E[X + Y] = E[X] + E[Y]$ needs no independence. What changes is the spread and the tail — the VaR or TVaR of $X + Y$. Don't credit a heavier-tailed copula with a higher mean.

> [!example]- Tail Concentration of the HRT Copula {Example}
> For the HRT copula with $a = 1$ (so $\tau = 1/3$), find $R(0.9)$ and $R(0.99)$, and compare with independent variables, $C(u,v) = uv$.
>
> > [!answer]-
> > Plan: put $u = v = z$ into the copula, then into $R(z)$. With $u = v = z$ the HRT copula gives $1 - 2z + C(z,z) = \big[2(1-z)^{-1/a} - 1\big]^{-a}$.
> >
> > $$
> > \begin{align*}
> > R(0.9) &= \frac{(2 \times 10 - 1)^{-1}}{0.1} \\
> > &= 0.526 \\
> > R(0.99) &= \frac{(2 \times 100 - 1)^{-1}}{0.01} \\
> > &= 0.503
> > \end{align*}
> > $$
> >
> > Independence gives $1 - 2z + z^2 = (1-z)^2$, so $R(z) = 1 - z$: $0.10$ and $0.01$.
> >
> > Under the HRT, when one variable is in its worst $1\%$, the other is there too about half the time, and that share levels off at $R(1) = 2^{-1} = 0.5$; under independence it falls to zero. That is the right-tail dependence a catastrophe exposure needs.

> [!example]- Same Marginals, Two Copulas {Example}
> Two lines each lose $10$ when their percentile exceeds $0.9$ and nothing otherwise. Compare the mean and $\text{VaR}_{0.95}$ of the total loss when the lines are joined by (a) the independence copula $C(u,v) = uv$, (b) the perfect-dependence copula $C(u,v) = \min(u,v)$.
>
> > [!answer]-
> > Each line's marginal is the same in both cases: $10$ with probability $0.1$, mean $1$.
> >
> > - **(a)** Total $20$ w.p. $0.01$, $10$ w.p. $0.18$, $0$ w.p. $0.81$. Mean $= 0.2 + 1.8 = 2$. $F(0) = 0.81$ and $F(10) = 0.99$, so $\text{VaR}_{0.95} = 10$.
> > - **(b)** Both lose together: total $20$ w.p. $0.1$, else $0$. Mean $= 2$. $F(0) = 0.90 < 0.95$, so $\text{VaR}_{0.95} = 20$.
> >
> > The mean is $2$ either way; the copula doubled the $95\%$ VaR. Perfect dependence is not always the worst case for VaR, though — for other marginals and levels a different copula can give a higher VaR of the sum.

> [!tip]- How it appears on the exam
> - **Exam 9:** Dependence between lines in an enterprise risk model. Questions ask for the benefits of copulas over a single correlation, which copula suits a portfolio exposed to catastrophes and why (HRT or Gumbel over the normal or Frank), how to read tail concentration graphs and scatter plots of simulated pairs, and what a change of copula does to the mean and the tail of the total.

> [!warning]- Exam traps
> - **Frank is not heavy-tailed:** It has less tail concentration than the normal copula. For clash and accumulation events, choose a copula with right-tail dependence.
> - **$R(1) = 0$ does not mean no tail association.** The normal copula has $R(1) = 0$ yet shows more concentration than the Frank short of the limit, and an empirical $R(z)$ near $1$ rests on very few points. Read $R(z)$ over a range below $1$, not just its limit.
> - **One curve, one tail.** $R(z)$ shows only the right tail, and it reduces a two-dimensional dependence to one curve. Pair it with $L(z)$ — Venter plots $L$ for $z < \tfrac12$ and $R$ above — and with Kendall's $\tau$ when choosing a copula.
> - **Reading a scatter plot of simulated $(u,v)$:** a symmetric copula (normal, Frank) looks the same near $(0,0)$ as near $(1,1)$; an HRT copula is asymmetric, its points scattered near $(0,0)$ and bunched along the diagonal near $(1,1)$.
