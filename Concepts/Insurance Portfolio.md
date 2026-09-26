---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:114bcb3ff73956b046592ee40215dc2bf9257da5896b38a069b2d4cf040f0d0a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Portfolio.md
---

**An insurance portfolio**, or book of business, is the set of [[Insurance Policy|policies]] an [[Insurer|insurer]] holds, whether in one line, one region or in total, whose combined losses the insurer bears. Risk is pooled, measured and managed at the portfolio level. What a policy costs the insurer depends on how its losses move together with everyone else's.

> $$S = \sum_{j=1}^{n} S_j$$

> $$\text{Var}(S) = \sum_{j} \text{Var}(S_j) + \sum_{j \neq k} \text{Cov}(S_j, S_k)$$

- $S_j$ is policy $j$'s loss for the period. When policies are independent, the covariance terms vanish and the [[Coefficient of Variation|coefficient of variation]] of $S$ falls like $1/\sqrt{n}$. That is the pooling insurance depends on, and it breaks down when policies are correlated.
- **Catastrophe accumulation (Exam 9).** A hurricane or earthquake hits every policy in its footprint at once, so the covariance terms dominate. Writing more in a concentrated area then adds risk almost one for one. Cat exposure is therefore managed across the whole portfolio. [[Catastrophe Modelling|Cat models]] produce the [[Catastrophe Expected Loss Cost|expected loss cost]] and zone-by-zone [[Probable Maximum Loss|PMLs]]. The insurer controls [[Concentration Risk|concentrations]] with underwriting limits, pricing and [[Reinsurance|reinsurance]] ([[Catastrophe Exposure Management]]).
- **Heterogeneity (MAS-I).** Policies differ in their underlying claim rates. A [[Mixed Poisson Process|mixed Poisson]] model treats a policy's rate $\Lambda$ as a draw from a [[Mixing Distribution|mixing distribution]] across the portfolio. A gamma mix gives [[Negative Binomial Distribution|negative binomial]] counts. A policy's own claims then tell you something about its $\Lambda$, which is the basis of [[Experience Rating|experience rating]] and [[Bayesian Credibility|credibility]].
- **Marginal view.** Under [[Risk-Adjusted Pricing|risk-adjusted pricing]], a policy's [[Risk Loads|risk load]] depends on what it adds to portfolio risk, through its covariance with $S$. Its standalone variance is not the measure.
- This is not the [[Portfolio]] page, which covers an Exam FM investment portfolio on the asset side of the balance sheet. An insurance portfolio is on the liability side.

> [!example]- Where Diversification Stops {Example}
> Each home in a coastal book has an expected annual loss of $\mu = \$1{,}000$ and a standard deviation of $\sigma = \$10{,}000$. Any two homes' losses have correlation $\rho$.
>
> Find the portfolio's coefficient of variation for $n = 1{,}000$ and $n = 10{,}000$ homes, first with $\rho = 0$ and then with $\rho = 0.01$.
>
> > [!answer]-
> > With $n$ equal variances and a common correlation:
> >
> > $$
> > \begin{align*}
> > \text{Var}(S) &= n\sigma^2 + n(n-1)\rho\,\sigma^2 \\
> > \text{CV}(S) &= \frac{\sigma}{\mu}\sqrt{\frac{1 + (n-1)\rho}{n}}
> > \end{align*}
> > $$
> >
> > With $\rho = 0$:
> >
> > - $n = 1{,}000$: $\text{CV} = 10\sqrt{1/1{,}000} = 0.316$
> > - $n = 10{,}000$: $\text{CV} = 10\sqrt{1/10{,}000} = 0.100$
> >
> > With $\rho = 0.01$:
> >
> > - $n = 1{,}000$: $\text{CV} = 10\sqrt{10.99/1{,}000} = 1.048$
> > - $n = 10{,}000$: $\text{CV} = 10\sqrt{100.99/10{,}000} = 1.005$
> >
> > Independent risks diversify steadily. A correlation of just $0.01$ sets a floor of $\frac{\sigma}{\mu}\sqrt{\rho} = 1.0$ that growth can't get below. Adding 9,000 homes in the same footprint barely changes the relative risk. Beyond that point, the only ways to reduce it are writing elsewhere or ceding.

> [!example]- What One Claim Says About a Policy {Example}
> A portfolio is $70\%$ low-risk policies with Poisson rate $0.05$ and $30\%$ high-risk policies with rate $0.20$. The insurer can't tell them apart at underwriting. A policy has exactly one claim this year.
>
> Find the probability it is high-risk and its expected claims next year.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > P(N{=}1 \mid \text{low}) &= 0.05\,e^{-0.05} \\
> > &= 0.04756 \\[4pt]
> > P(N{=}1 \mid \text{high}) &= 0.20\,e^{-0.20} \\
> > &= 0.16375
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > P(\text{high} \mid N{=}1) &= \frac{0.3(0.16375)}{0.7(0.04756) + 0.3(0.16375)} \\
> > &= \frac{0.04912}{0.08242} \\
> > &= 0.596
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > E[\Lambda \mid N{=}1] &= 0.404(0.05) + 0.596(0.20) \\
> > &= 0.139
> > \end{align*}
> > $$
> >
> > The portfolio average rate is $0.7(0.05) + 0.3(0.20) = 0.095$. One claim raises this policy's expected frequency by almost half. Pricing it at the portfolio average would undercharge it, which is why experience rating uses this information.
