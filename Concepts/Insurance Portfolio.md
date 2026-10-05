---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:53bbed5ea56c511bf59a238fb4713b3714665ca5b7a908ca20e2914845b36538
  sources:
    - "CAS Exam 9 Content Outline, October 2026 sitting (Exam_9_CO_2026_Fall), Domain A statement and tasks ('manage the total exposure from catastrophic events within an insurance portfolio'), PDF p.3, sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
    - "Frees et al., Loss Data Analytics (open text, arXiv:1808.06718v1, 2018), §1.2.3, PDF pp.20-21 ('the portfolio, or collection, of risks that an insurer has acquired'; reinsurance bought on that portfolio), sha256:1df1831e7d67a072712a2945645b788f5974748143da267bb471b9a7bc3baf33 — https://arxiv.org/pdf/1808.06718"
    - "Siegrist, Random (randomservices.org, HTML fetched 2026-10-04), ch.3 §5 Covariance and Correlation, 'The Variance of a Sum', sha256:23ef4758146296b9865ca3f82f0e849934a667dcc8643afaa28147ad146feef7 — https://www.randomservices.org/random/expect/Covariance.html"
    - "Daniel, \"Poisson processes (and mixture distributions)\", CAS Study Note (June 2008) — MAS-I syllabus reading, §1.3.3 p.12 (an insurer models each insured's claims as Poisson with rate λ varying randomly among insureds - a mixture; Gamma mixing gives negative binomial), sha256:e345451e9daae82b400aed77f2da0c96c361ed4fbdfd22456b8f711ca0d50888 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_1.pdf"
    - "Mahler & Dean, 'Credibility', ch.8 of Foundations of Casualty Actuarial Science (SOA study note C-21-01), exercise 5.2.1 PDF pp.98-99 ('For an insurance portfolio ... the λ-values of the policyholders follow the Gamma distribution'), §5.3 PDF pp.100-103 (a policyholder's claims update its expected frequency), sha256:bccdb7968ae276e041bf7f6eb5aea3aea473f1dc7739bc64352419c8a6a0f3c5 — https://www.soa.org/globalassets/assets/files/edu/C-21-01.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain A tasks 1-2 and text references (Daniel A1-5; Ross 5.2.1-5.2.4, 5.3, 5.4.1, 5.4.2), PDF pp.3, 6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Portfolio.md
---

**An insurance portfolio**, or book of business, is the set of [[Insurance Policy|policies]] an [[Insurer|insurer]] holds, whether in one line, one region or in total, whose combined losses the insurer bears. Risk is pooled, measured and managed at the portfolio level. What a policy costs the insurer depends on how its losses move together with everyone else's.

> $$S = \sum_{j=1}^{n} S_j$$

> $$\text{Var}(S) = \sum_{j} \text{Var}(S_j) + \sum_{j \neq k} \text{Cov}(S_j, S_k)$$

- $S_j$ is policy $j$'s loss for the period. When policies are independent, the covariance terms vanish and the [[Coefficient of Variation|coefficient of variation]] of $S$ falls like $1/\sqrt{n}$. That is the pooling insurance depends on, and it breaks down when policies are correlated.
- **Catastrophe accumulation (Exam 9).** A hurricane or earthquake causes many claims close together all at once, so policies in its footprint are correlated and the covariance terms do not vanish. Insuring 1,000 homes spread around a state may be acceptable where 1,000 homes on one stretch of coast are not. Cat exposure is therefore managed across the whole book. [[Catastrophe Modelling|Cat models]] produce the [[Catastrophe Expected Loss Cost|expected loss cost]] (the average annual loss) and [[Probable Maximum Loss|PMLs]] at chosen return periods, including how much one more location adds to the book's PML. The insurer controls [[Concentration Risk|concentrations]] through risk selection, premiums commensurate with the risk, and [[Reinsurance|reinsurance]] ([[Catastrophe Exposure Management]]).
- **Heterogeneity (MAS-I).** Policies differ in their underlying claim rates. A [[Mixed Poisson Process|mixed Poisson]] model treats a policy's rate $\Lambda$ as a draw from a [[Mixing Distribution|mixing distribution]] across the portfolio. A gamma mix gives [[Negative Binomial Distribution|negative binomial]] counts. A policy's own claims then tell you something about its $\Lambda$, which is the basis of [[Experience Rating|experience rating]] and [[Bayesian Credibility|credibility]].
- **Marginal view.** In [[Risk-Adjusted Pricing|risk-adjusted pricing]], what a new policy adds to the book depends on how its losses interact with the existing policies. Marginal methods set its [[Risk Loads|risk load]] from the change in portfolio variance or standard deviation. Adding account $n$ to portfolio $L$ changes the variance by $\text{Var}(n) + 2\,\text{Cov}(L, n)$, so its covariance with the book counts, not just its standalone variance.
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
> > Independent risks diversify steadily. A correlation of just $0.01$ sets a floor of $\frac{\sigma}{\mu}\sqrt{\rho} = 1.0$ that growth can't get below. Adding 9,000 homes in the same footprint barely changes the relative risk. Reducing it further takes writing elsewhere or ceding risk to reinsurers.

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
