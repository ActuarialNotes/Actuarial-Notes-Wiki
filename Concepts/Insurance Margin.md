---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:299401fa73df303056639e9bb6cca6091a625f988e2ad4001c7a688f145614ec
  sources:
    - "CAS Exam 9 Practice Items and Solutions (2026; retired Spring 2026 items), Items 3 (M&M 11.3: cost of capital i = [g(s)-s]/[1-g(s)], g(s) = (s+i)/(1+i), LR = s/g(s)) and 4 (M&M pp.317-318: Shapley allocation), sha256:9cf61c6c2597a9a1a6d2d548d83f78a1a56e73778226176ab30308aa85f615fb — https://www.casact.org/sites/default/files/2026-08/Exam9_PracticeItems_2026.xlsx"
    - "Major & Mildenhall, Pricing and Capital Allocation for Multiline Insurance Firms With Finite Assets in an Imperfect Market (arXiv:2008.12427v1, 2020), pp.1-9 (notation p.5-6), 18-24 (eqs 18-25), sha256:a68e6551421c0861f18fdaebef82591dd173af6a781c66f6b2758a809994cca4 — https://arxiv.org/pdf/2008.12427v1"
    - "Mildenhall & Major, Pricing Insurance Risk (Wiley 2022), Chapter 1 excerpt, pp.4-11, sha256:af37057d34a0c9b927fa8d0246eaf121a500e385c6902a8f8db8b08e6a55fe2c — https://media.wiley.com/product_data/excerpt/70/11197556/1119755670-5.pdf"
    - "CAS Exam 9 Content Outline, Fall 2026, pp.4-5, 7 (Domains B and C; text references), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
    - "Mildenhall & Major, Pricing Insurance Risk (Wiley 2022), Index excerpt, pp.523-546, sha256:4e7a560b390d357308ca1274a4c35f13e03d3d7c36555455dd25125f675f3517 — https://media.wiley.com/product_data/excerpt/70/11197556/1119755670-10.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Margin.md
---

**Insurance Margin** $M$ is the part of the premium above expected loss — in Mildenhall and Major's notation $M = P - L$. It is what policyholders pay for the use of the capital that makes their insurer's promise credible, and equally the owners' expected profit for providing that capital.

> $$M = P - L$$
>
> $$M = \iota\, Q = \delta\,(a - L)$$

- $P$ is premium, $L$ expected loss ($E[X \wedge a]$ strictly), $Q = a - P$ capital, $a$ assets, $\iota = M/Q$ the [[Return on Capital|return]] and $\delta = \iota/(1+\iota)$. In the one-period model with no expenses or investment income, the margin is the entire expected underwriting profit and plays the role of the [[Risk Loads|risk load]].
- **Why $\delta(a - L)$.** Assets above expected loss, $a - L$, are the "unfunded" part of the promise. Owners pay in $Q$ at inception and expect $a - L = M + Q$ back, so premium funds the expected loss plus a fraction $\delta$ of $a - L$ and investors fund the remaining $\nu = 1 - \delta$.
- **Margin ratio** $M/P = 1 - L/P$ is the complement of the [[Loss Ratio|loss ratio]]. Multiplied by [[Insurance Leverage|leverage]] $P/Q$ it gives the return — see [[Insurance Profitability]].
- **Gross versus net of expenses.** Expenses enlarge the premium without changing the margin, so the same margin is a smaller percentage of an expense-loaded premium. Quote margins on a stated basis.
- **Where the margin sits.** Pricing layer by layer, a distortion $g$ charges margin $g(S(x)) - S(x)$ per unit of the layer at $x$. A constant cost of capital ($g(s) = \nu s + \delta$) charges almost $\delta$ per unit of capacity whatever the layer's attachment probability, which loads remote layers heavily; a distortion other than the constant cost of capital asks a different return of each layer. Exam 5's counterpart is the [[Profit and Contingency Provision]].

> [!example]- The Margin a Target Return Requires {Example}
> A book has expected loss $60$ and is supported by assets of $100$. Owners require $10\%$. Find the margin, premium and capital, then express the margin as a percentage of premium before and after grossing up for a $25\%$ expense ratio.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \delta &= \frac{0.10}{1.10} \\
> > &= 0.09091 \\
> > M &= 0.09091(100 - 60) \\
> > &= 3.64 \\
> > P &= 60 + 3.64 \\
> > &= 63.64 \\
> > Q &= 100 - 63.64 \\
> > &= 36.36
> > \end{align*}
> > $$
> >
> > Check: $3.64/36.36 = 10\%$. The margin is $3.64/63.64 = 5.7\%$ of the risk premium. Grossed up, the premium is $63.64/0.75 = 84.85$ and the same margin is $3.64/84.85 = 4.3\%$ of it — a lower-looking figure with no change in profitability.

> [!example]- Where a Constant Cost of Capital Puts the Margin {Example}
> A catastrophe portfolio's loss $X$ (\$ millions) is $0$, $10$, $50$ or $100$ with probabilities $0.80$, $0.12$, $0.06$ and $0.02$; $E[X] = 6.2$ and assets are $a = 100$. At $\iota = 15\%$ ($\nu = 0.8696$, $\delta = 0.1304$), allocate the margin to the layers $0$–$10$, $10$–$50$ and $50$–$100$.
>
> > [!answer]-
> > Each layer's attachment probability is $S = 0.20$, $0.08$ and $0.02$. The priced probability is $g(S) = 0.8696\,S + 0.1304$, and the margin per unit of layer is $g(S) - S$:
> >
> > $$
> > \begin{align*}
> > M_{0\text{--}10} &= 10(0.3043 - 0.20) \\
> > &= 1.04 \\
> > M_{10\text{--}50} &= 40(0.2000 - 0.08) \\
> > &= 4.80 \\
> > M_{50\text{--}100} &= 50(0.1478 - 0.02) \\
> > &= 6.39
> > \end{align*}
> > $$
> >
> > The total, $12.23$, matches $\delta(a - L) = 0.1304(93.8)$. The top layer carries $16\%$ of the expected loss ($1.0$ of $6.2$) but $52\%$ of the margin: a constant cost of capital charges for capacity, not for the chance of using it.
