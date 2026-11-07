---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:636e1ebf8828f0ebaa1a75e2427ffda2b41a5608e9549c0fe020ff9d5411565b
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch.9 pp.160-161 (PDF pp.166-167), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "Mack, Credible Claims Reserves: The Benktander Method (ASTIN Bulletin 30(2), 2000), §§1-4 and 7, pp.333-342, 346-347 (PDF pp.1-10, 14-15): Theorems 1, 3, 4; numerical examples, sha256:8e9e86f6dd4ed6a402d5380dd446ebeba5e2c3d921f90828ad485a8cfb508086 — https://www.casact.org/sites/default/files/2021-03/7_Mack_2000.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Benktander Method.md
---

![[Media/Figures/Benktander_Method.svg|340]]

The **Benktander Method**, or iterated Bornhuetter-Ferguson method, is the [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] calculation run a second time, with the Bornhuetter-Ferguson ultimate in place of the a priori [[Expected Loss Method|expected claims]]. Introduced by Gunnar Benktander in 1976, it is meant to be more responsive than the Bornhuetter-Ferguson method and more stable than the [[Chain Ladder Method|development technique]]. Its ultimate claims are

> $$\text{Ultimate Claims} = \text{Reported Claims} + \text{BF Ultimate} \times \left(1 - \frac{1}{\text{CDF}}\right)$$

- $\text{BF Ultimate}$ is the year's Bornhuetter-Ferguson ultimate, the reported claims plus the expected claims times the percent unreported.
- $1 - 1/\text{CDF}$ is the percent unreported, with $1/\text{CDF}$ the percent reported.

The Benktander [[IBNR]] is the Bornhuetter-Ferguson ultimate times the percent unreported. With paid claims and the paid CDF, the same steps give the paid Benktander estimate.

> [!example]- An accident year has reported claims of $\$600{,}000$, expected claims of $\$1{,}000{,}000$ and a CDF of 2.000. What are its development, Bornhuetter-Ferguson and Benktander ultimates? {Example}
> - The percent reported is $1/2.000 = 50\%$, so the percent unreported is 50%.
> - The development ultimate is $600{,}000 \times 2.000 = \$1{,}200{,}000$.
> - The Bornhuetter-Ferguson ultimate is $600{,}000 + 0.50 \times 1{,}000{,}000 = \$1{,}100{,}000$.
> - The Benktander ultimate is $600{,}000 + 0.50 \times 1{,}100{,}000 = \$1{,}150{,}000$, and its IBNR is $\$550{,}000$.

## Credibility weighting of the development and Bornhuetter-Ferguson techniques

The Benktander ultimate is a credibility-weighted average of the development and Bornhuetter-Ferguson ultimates:

> $$\text{Ultimate Claims} = Z \times \text{Development Ultimate} + (1 - Z) \times \text{BF Ultimate}$$

- $Z = 1/\text{CDF}$, the percent reported, is the credibility given to the development ultimate.

The Benktander ultimate therefore lies between the two, closer to the Bornhuetter-Ferguson ultimate when the year is immature. It is above the Bornhuetter-Ferguson ultimate when the development ultimate is, which happens when claims have emerged faster than expected. It always gives more credibility to the development technique than the Bornhuetter-Ferguson method does. In Friedland's changing-environment examples it responds much more to a rising claim ratio than the Bornhuetter-Ferguson method, and less well to a change in case reserve adequacy or in the mix of business, which change the development pattern.

> [!example]- For the same accident year, what is the credibility-weighted ultimate? {Example}
> - The credibility is $Z = 1/2.000 = 0.50$.
> - The weighted ultimate is $0.50 \times 1{,}200{,}000 + 0.50 \times 1{,}100{,}000 = \$1{,}150{,}000$, the Benktander ultimate.
> - Emergence is ahead of expectation, so the ultimates are ordered expected claims $<$ Bornhuetter-Ferguson $<$ Benktander $<$ development.

## Iterating further

Writing $q = 1 - 1/\text{CDF}$ for the percent unreported, each iteration replaces the expected claims with the previous ultimate. After $m$ iterations the ultimate is

> $$\text{Ultimate}_m = (1 - q^m) \times \text{Development Ultimate} + q^m \times \text{Expected Claims}$$

- $m = 1$ is the Bornhuetter-Ferguson method and $m = 2$ the Benktander method, whose weight on the development ultimate is $1 - q^2$, or $p(2 - p)$ with $p = 1 - q$ the percent reported.

As $m$ grows, $q^m$ goes to zero and the ultimate converges to the development technique's ultimate, which gives full weight to the reported claims. A fully developed year, with $q = 0$, has the same ultimate under every method: its reported claims.

> [!example]- A line is 30% reported at 12 months, 60% at 24 months and 85% at 36 months. What weight do the Bornhuetter-Ferguson and Benktander methods put on the development ultimate, against the expected claims, at each age? {Example}
> The Bornhuetter-Ferguson weight is $1 - q$ and the Benktander weight is $1 - q^2$:
>
> | Age | $1 - q$ | $1 - q^2$ |
> | --- | --- | --- |
> | 12 mo | 0.300 | 0.510 |
> | 24 mo | 0.600 | 0.840 |
> | 36 mo | 0.850 | 0.978 |
>
> - At 12 months the Benktander method puts 51% on the development ultimate where the Bornhuetter-Ferguson method puts 30%.
> - By 36 months it is almost entirely the development ultimate.

## Mack's credible claims reserves (Exam 7)

[[Credible Claims Reserves: The Benktander Method (Mack - 2000)|Mack (2000)]] writes $C$ for the claims to date, $U_0$ for the a priori ultimate, $p$ for the percent paid (or reported) and $q = 1 - p$. The chain ladder reserve is the individual reserve $R_{\text{ind}} = q\,C/p$, and the Bornhuetter-Ferguson reserve the collective reserve $R_{\text{coll}} = q\,U_0$. The Benktander reserve is

> $$R_{\text{GB}} = p \, R_{\text{ind}} + q \, R_{\text{coll}}$$

- Its credibility on the individual reserve is $p$, and $R_{\text{GB}} = q \, U_{\text{BF}}$. Hovinen (1981) found the same reserve independently.

Mack's model has $E[C/U \mid U] = p$ and $\text{Var}(C/U \mid U) = p\,q\,\beta^2(U)$, with $\alpha^2(U) = U^2\beta^2(U)$ and $U_0$ independent of $C$. The optimal credibility on the individual reserve depends on one volatility measure:

> $$t = \frac{E[\alpha^2(U)]}{\text{Var}(U_0) + \text{Var}(U) - E[\alpha^2(U)]}$$

> $$c^* = \frac{p}{p + t}$$

The Benktander reserve has a smaller mean squared error than the Bornhuetter-Ferguson reserve if and only if $t < 2 - p$, and than the chain ladder reserve if and only if $t > pq/(1 + p)$. The Bornhuetter-Ferguson reserve beats the chain ladder if and only if $p < t$. Benktander is therefore best at almost every maturity unless the payout pattern is extremely volatile or extremely stable, and it needs no variance estimate at all. The a priori must stay fixed: one revised as the year develops is no longer independent of $C$.

> [!example]- As percentages of premium, $U_0 = 75\%$, $p = 0.40$ and $C = 36\%$. The actuary assesses $\text{Var}(U) = 0.25^2$, $\text{Var}(U_0) = 0.10^2$ and $\text{Var}(C/U \mid U) = 0.08^2$, the last not depending on $U$. What are $t$, $c^*$ and the four reserves, and which reserve has the smallest standard error? {Example}
> - With $q = 0.60$, $\beta^2 = 0.08^2/(0.40 \times 0.60) = 0.026667$, and $E[\alpha^2(U)] = (0.25^2 + 0.75^2) \times 0.026667 = 0.016667$.
> - The volatility measure is $t = 0.016667/(0.01 + 0.0625 - 0.016667) = 0.2985$, so $c^* = 0.40/(0.40 + 0.2985) = 0.5726$.
> - The reserves are $R_{\text{coll}} = 0.60 \times 75\% = 45.0\%$, $R_{\text{ind}} = 0.60 \times 36\%/0.40 = 54.0\%$, $R_{\text{GB}} = 0.40 \times 54.0\% + 0.60 \times 45.0\% = 48.6\%$ and $R_{c^*} = 50.2\%$.
> - With $\text{mse}(R_c) = E[\alpha^2(U)] \left(c^2/p + 1/q + (1 - c)^2/t\right) q^2$, the standard errors are 17.3% for the Bornhuetter-Ferguson reserve ($c = 0$), 15.8% for the chain ladder ($c = 1$), 14.0% for Benktander ($c = p$) and 13.6% for $c^*$.
> - The conditions agree: $t = 0.30$ is below $2 - p = 1.6$ and above $pq/(1 + p) = 0.171$, so Benktander beats both, within 0.4 points of the optimum.

> [!trap] Applying the expected claim ratio twice
> The Benktander IBNR is the Bornhuetter-Ferguson **ultimate** times the percent unreported. The Bornhuetter-Ferguson ultimate is already in claims dollars, so it is not multiplied by the expected claim ratio again. In the first example the IBNR is $1{,}100{,}000 \times 0.50 = \$550{,}000$. Treating the $\$1{,}100{,}000$ as premium and applying a 65% claim ratio to it gives $0.65 \times 1{,}100{,}000 \times 0.50 = \$357{,}500$, which understates the IBNR.
