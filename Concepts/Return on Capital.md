---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:4950ad4d6da4ca101fbd17a3db21afc6133879f2acbadff92bade0093d055137
  sources:
    - "CAS Exam 9 Practice Items and Solutions (2026; retired Spring 2026 items), Items 3 (M&M 11.3: cost of capital i = [g(s)-s]/[1-g(s)], g(s) = (s+i)/(1+i), LR = s/g(s)) and 4 (M&M pp.317-318: Shapley allocation), sha256:9cf61c6c2597a9a1a6d2d548d83f78a1a56e73778226176ab30308aa85f615fb — https://www.casact.org/sites/default/files/2026-08/Exam9_PracticeItems_2026.xlsx"
    - "Major & Mildenhall, Pricing and Capital Allocation for Multiline Insurance Firms With Finite Assets in an Imperfect Market (arXiv:2008.12427v1, 2020), pp.1-9 (notation p.5-6), 18-24 (eqs 18-25), sha256:a68e6551421c0861f18fdaebef82591dd173af6a781c66f6b2758a809994cca4 — https://arxiv.org/pdf/2008.12427v1"
    - "Mildenhall & Major, Pricing Insurance Risk (Wiley 2022), Chapter 1 excerpt, pp.4-11, sha256:af37057d34a0c9b927fa8d0246eaf121a500e385c6902a8f8db8b08e6a55fe2c — https://media.wiley.com/product_data/excerpt/70/11197556/1119755670-5.pdf"
    - "Mildenhall & Major, Pricing Insurance Risk (Wiley 2022), Index excerpt, pp.523-546, sha256:4e7a560b390d357308ca1274a4c35f13e03d3d7c36555455dd25125f675f3517 — https://media.wiley.com/product_data/excerpt/70/11197556/1119755670-10.pdf"
    - "CAS Exam 9 Content Outline, Fall 2026, pp.4-5, 7 (Domains B and C; text references), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Return on Capital.md
---

**Return on Capital**, Mildenhall and Major's $\iota$, is the expected margin earned per unit of capital. To the investor it is the expected return on the capital they put up, and to the policyholder it is the cost of capital built into the premium.

For a portfolio with premium $P$, expected loss $L$ and assets $a$, the return on capital is

> $$\iota = \frac{M}{Q}$$

- $M = P - L$ is the [[Insurance Margin|margin]].
- $Q = a - P$ is the capital, the assets investors fund beyond the premium.

The target for $\iota$ comes from the [[Cost of Capital|cost of capital]], the return investors need to support the firm's market value. It is blended with the known costs of debt and reinsurance into a weighted average over the capital actually used ([[Capital Structure]]).

## Risk discount factor and risk discount rate

Capital is paid in at the start and the margin, like interest, is earned at the end. The **risk discount factor** is

> $$\nu = \frac{1}{1+\iota}$$

and the **risk discount rate** is

> $$\delta = \frac{\iota}{1+\iota}$$

They are the analogues of $v$ and $d$ in interest theory ([[Discount Factor]], [[Discount Rate]]), with the same identities $\delta = \iota\nu$ and $\nu + \delta = 1$. Capital is the present value, at the risk discount factor, of what investors expect back, so it is

> $$Q = \nu(a - L)$$

Solving $P = L + \iota(a - P)$ for the premium that earns the required return gives

> $$P = \frac{L + \iota a}{1 + \iota} = \nu L + \delta a$$

With expected loss and assets fixed, a higher required return raises the premium and the margin and reduces the capital investors must contribute ([[Insurance Pricing]]).

> [!example]- A portfolio has premium $105$, expected loss $95$ and assets $180$. What are $\iota$, $\nu$ and $\delta$? {Example}
> - The margin is $105 - 95 = 10$ and the capital is $180 - 105 = 75$, so $\iota = 10/75 = 0.13333$.
> - $\nu = 1/1.13333 = 0.88235$ and $\delta = 0.13333/1.13333 = 0.11765$.
> - As a check, $\nu L + \delta a = 0.88235(95) + 0.11765(180) = 105.00$, the premium.
> - Equivalently $\delta = M/(a - L) = 10/85$: premium funds $11.8\%$ of the $85$ of assets above expected loss, and investors fund the other $88.2\%$.

## Margin and leverage

Return on capital is the margin ratio times the premium-to-capital [[Insurance Leverage|leverage]]:

> $$\frac{M}{Q} = \frac{M}{P} \times \frac{P}{Q}$$

A return target can be met by pricing (the margin ratio) or by capital management (the leverage). Equal margin ratios give equal returns only if leverage is equal, and with premium and margin fixed, the leverage needed for a target return is the target divided by the margin ratio.

> [!example]- A line earns a margin of $5\%$ of premium. What premium-to-capital leverage earns it a $15\%$ return on capital? {Example}
> - The leverage is the target return divided by the margin ratio.
> - $P/Q = 0.15/0.05 = 3.0$, so the line needs $1$ of capital for every $3$ of premium.

## Reported return on equity

Pricing uses the expected return on allocated capital. Reported return on equity is net income over book surplus, and net income includes investment income on all assets, realised gains and reserve development on prior years. The two answer different questions. [[Risk-Adjusted Performance]] measures return by line.

## Return by layer of capital

A constant cost of capital charges the same $\iota$ on every layer of capital. Pricing with a [[Risk Measure#Distortion risk measures|distortion]] $g$ instead implies, on the layer of assets whose attachment probability is $s$, a return of

> $$\iota(s) = \frac{g(s) - s}{1 - g(s)}$$

- $s$ is the layer's expected loss per unit, $g(s)$ its premium and $1 - g(s)$ its capital.

For most distortions (the constant-cost-of-capital one excepted) this return falls as layers become more remote, so a better-capitalised insurer has a lower percentage cost of capital.

> [!example]- Under the proportional hazard distortion $g(s) = s^{0.6}$, what are the loss ratio and the return on capital for layers with $s = 0.20$, $0.05$ and $0.01$? {Example}
> - $g(0.20) = 0.3807$, so $\iota = (0.3807 - 0.20)/(1 - 0.3807) = 29.2\%$.
> - $g(0.05) = 0.1657$, so $\iota = (0.1657 - 0.05)/(1 - 0.1657) = 13.9\%$.
> - $g(0.01) = 0.0631$, so $\iota = (0.0631 - 0.01)/(1 - 0.0631) = 5.7\%$.
> - The loss ratios $s/g(s)$ are $52.5\%$, $30.2\%$ and $15.8\%$. The remote layer has the lowest loss ratio yet earns the lowest return, because it is almost all capital.
