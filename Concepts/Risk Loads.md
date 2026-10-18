---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:765c9abc6799e108e04be5aba08c207d7ad2431951b66555eb4722d359615516
  sources:
    - "CAS Exam 9 Content Outline, Fall 2026 (v01, 2026-03-18), PDF pp.3-7: Domains B, C and D tasks and readings; complete text references (Brehm et al.: D1-D6, Chapters 1, 2 excl. 2.6, 3 excl. 3.4, 4, 5.4; source SK), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
    - "Mildenhall & Major, Pricing Insurance Risk (Wiley 2022), Chapter 1 excerpt (publisher's free sample), pp.1-6 (risk margin to afford capital a return; capital vs pricing risk measures; VaR or TVaR at 99.5%; Artzner et al. 1999; SRMs as distortions; SRM calibrated to cat bond pricing; Constant Cost of Capital SRM), sha256:af37057d34a0c9b927fa8d0246eaf121a500e385c6902a8f8db8b08e6a55fe2c — https://media.wiley.com/product_data/excerpt/70/11197556/1119755670-5.pdf"
    - "Major & Mildenhall, Pricing and Capital Allocation for Multiline Insurance Firms With Finite Assets in an Imperfect Market (arXiv:2008.12427v1, 2020), pp.5-8 (notation: premium = expected loss + margin, assets = premium + equity; prices exclude expenses; TVaR; Definition 1 concave distortion; DRMs coherent and comonotonic additive, Theorem 1; PH and Wang; layer premium density), pp.19-24 (return = margin / equity; no-undercut, Prop.2; frictional cost of capital), sha256:a68e6551421c0861f18fdaebef82591dd173af6a781c66f6b2758a809994cca4 — https://arxiv.org/pdf/2008.12427v1"
    - "Hardy, An Introduction to Risk Measures for Actuarial Applications (SOA/CAS study note C-25-07, 2006), PDF pp.3 (expected value, standard deviation, variance premium principles), 8-11 (quantile, CTE = TVaR = TCE = expected shortfall; probability-mass adjustment; CTE robust to sampling error, easy with simulation), 15-18 (distortion risk measures: g increasing, g(0)=0, g(1)=1; quantile and CTE distortions; PH, dual power, Wang), 20-23 (coherence axioms; quantile not subadditive; SD principle fails monotonicity, variance principle fails subadditivity; semi-variance), sha256:9d0c40a0b4cb1e1e68e68744c096dd36e7422560e9eabe4ee89e539443bcddc7 — https://www.soa.org/globalassets/assets/files/edu/c-25-07.pdf"
    - "Frees et al., Loss Data Analytics (open text), Chapter 10, Sec.10.3.1-10.3.3 (risk measure; standard deviation and variance principles; four coherence axioms; SD principle can fail monotonicity; VaR and TVaR definitions), sha256:0dcbdf4bb875807b9db33d06cff8a94770a74a940f660a89de13116ee829ed13 — https://openacttexts.github.io/Loss-Data-Analytics/ChapPortMgt.html"
    - "Mildenhall, aggregate Python package documentation, aggregate.spectral source (stable), class CCoCDistortion: g(x) = min(1, d + v x), v = 1/(1+r) = 1 - d, d = r/(1+r), sha256:d6504ad3674897708aae677a2667ca49994eb2eb33de880d982dc7a417977c48 — https://aggregate.readthedocs.io/en/stable/_modules/aggregate/spectral.html"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. 2016), PDF p.111 (underwriting profit provision reflecting the cost of capital for extraordinary risk), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Risk Loads.md
---

**Risk Loads** are the amounts added to expected loss to pay an insurer's capital providers for bearing the risk of a contract. Expected loss plus the risk load is the **risk-loaded technical premium**: the price a pricing model indicates for the risk itself, before expenses and commercial adjustments.

> $$P = E[X] + R(X)$$

- $X$ is the loss to the contract (after its limits and attachment), $R(X) \geq 0$ the risk load. In Mildenhall and Major's notation the risk load is the **margin** $M = P - L$ — see [[Insurance Margin]].
- **Classical premium principles**, each a [[Risk Measure]] applied to $X$:
  - *expected value*: $P = (1 + \theta)\,E[X]$ — the load ignores variability, so a remote catastrophe layer and a stable working layer with the same mean pay the same load;
  - *standard deviation*: $P = E[X] + k\,\sigma(X)$ — the load scales with share, so a 50% share pays half;
  - *variance*: $P = E[X] + k\,\text{Var}(X)$ — the load scales with the *square* of share, so a 50% share pays a quarter and two 50% shares together pay half the load on 100%.
- **Cost-of-capital loads** set capital first, with a capital risk measure (VaR, TVaR or a regulatory standard), then charge the target return on it: $R = \iota\,Q = \delta\,(a - L)$, where $a$ is assets, $\iota$ the target [[Return on Capital|return]] and $\delta = \iota/(1+\iota)$. See [[Cost of Capital]] and [[Risk Capital]].
- **Distortion loads** $R = \rho_g(X) - E[X]$ weight remote layers more heavily than their probability. The distortion can be calibrated to observed market prices, for example of catastrophe bonds and reinsurance layers.
- **Loads are not additive.** Pooling reduces risk, so the load on a portfolio is less than the sum of the stand-alone loads. The portfolio load has to be set top-down and allocated to lines or policies — the problem of [[Risk-Adjusted Pricing]]. In Exam 5 ratemaking the same idea sits inside the [[Profit and Contingency Provision]].

> [!example]- Five Risk Loads for One Catastrophe Layer {Example}
> Losses (\$ millions) to a \$10M xs \$10M catastrophe layer are $0$ with probability $0.90$, $5$ with probability $0.06$ and $10$ (a full limit loss) with probability $0.04$. Compute the technical premium under (a) the expected value principle with $\theta = 0.5$, (b) the standard deviation principle with $k = 0.25$, (c) the variance principle with $k = 0.05$, (d) a proportional hazard distortion $g(s) = s^{0.7}$, and (e) a constant $15\%$ cost of capital with the layer fully collateralised ($a = 10$).
>
> > [!answer]-
> > $$
> > \begin{align*}
> > E[X] &= 0.06(5) + 0.04(10) \\
> > &= 0.70 \\
> > \text{Var}(X) &= 0.06(25) + 0.04(100) - 0.70^2 \\
> > &= 5.01 \\
> > \sigma(X) &= 2.238
> > \end{align*}
> > $$
> >
> > For (d), $S = 0.10$ on $[0, 5)$ and $0.04$ on $[5, 10)$. For (e), $\delta = 0.15/1.15 = 0.1304$.
> >
> > $$
> > \begin{align*}
> > P_{(a)} &= 1.5(0.70) \\
> > &= 1.050 \\
> > P_{(b)} &= 0.70 + 0.25(2.238) \\
> > &= 1.260 \\
> > P_{(c)} &= 0.70 + 0.05(5.01) \\
> > &= 0.951 \\
> > P_{(d)} &= 5(0.10^{0.7}) + 5(0.04^{0.7}) \\
> > &= 0.998 + 0.525 \\
> > &= 1.523 \\
> > P_{(e)} &= 0.70 + 0.1304(10 - 0.70) \\
> > &= 1.913
> > \end{align*}
> > $$
> >
> > The same loss distribution produces risk loads from $0.25$ to $1.21$ — the choice of measure and parameter, not the data, drives the price. The cost-of-capital price is the highest because the layer ties up \$10M of capital against \$0.7M of expected loss; its loss ratio is $0.70/1.913 = 37\%$, and its return is $1.213/(10 - 1.913) = 15\%$ as required.

> [!example]- The Diversification Problem {Example}
> Two independent lines each have expected loss $50$ and standard deviation $30$. The insurer loads premiums at $0.2$ standard deviations. Compare the stand-alone loads with the load on the combined portfolio.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Stand-alone} &= 0.2(30) + 0.2(30) \\
> > &= 12.0 \\
> > \sigma_{\text{pool}} &= \sqrt{30^2 + 30^2} \\
> > &= 42.43 \\
> > \text{Pooled load} &= 0.2(42.43) \\
> > &= 8.49
> > \end{align*}
> > $$
> >
> > Pooling saves $3.51$ of load. If each line is priced stand-alone the insurer over-charges by $41\%$ of the load it needs, and a competitor that passes the diversification benefit on will win the business. The pooled load has to be allocated — here symmetry gives $4.24$ each — and for unequal or correlated lines the allocation method determines each line's price.
