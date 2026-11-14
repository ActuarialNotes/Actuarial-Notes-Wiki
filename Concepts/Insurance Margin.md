---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:f6f90f9f36bf348fb350471870024714c323c5308a1c9e10562aef5b4788f323
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

**Insurance Margin** is the part of the premium above expected loss. It is what policyholders pay for the use of the capital that makes their insurer's promise credible, and the owners' expected profit for providing that capital. In Mildenhall and Major's one-period model, with no expenses, taxes or investment income, the margin $M$ on premium $P$ and expected loss $L$ is

> $$M = P - L$$

- $L = E[X \wedge a]$, the expected loss $X$ limited to the insurer's assets $a$.

In this model the margin is the entire expected underwriting profit, and it plays the role of the [[Risk Loads|risk load]]. Exam 5's counterpart is the [[Profit and Contingency Provision|profit and contingency provision]].

## Margin ratio

The margin as a share of premium, the margin ratio, is

> $$\frac{M}{P} = 1 - \frac{L}{P}$$

- $L/P$ is the [[Loss Ratio|loss ratio]].

Multiplied by [[Insurance Leverage|leverage]] $P/Q$, the margin ratio gives the [[Return on Capital|return on capital]]. Expenses enlarge the premium without changing the margin, so the same margin is a smaller percentage of an expense-loaded premium. Quote a margin ratio on a stated basis.

## The margin a required return sets

Total assets are the premium collected plus the capital investors contribute, so the capital is $Q = a - P$. If investors require a return $\iota = M/Q$ on it, the margin is

> $$M = \iota\, Q$$

With expected loss and assets fixed, substituting $Q = a - P$ and $P = L + M$ gives the margin as

> $$M = \delta\,(a - L)$$

- $\delta = \iota/(1+\iota)$.

Assets above expected loss, $a - L$, are the unfunded part of the promise. Owners pay in $Q$ at inception and expect $M + Q = a - L$ back. Premium funds the expected loss plus a fraction $\delta$ of $a - L$, and investors fund the remaining fraction $\nu = 1 - \delta$, so the premium is

> $$P = \frac{L + \iota a}{1 + \iota}$$

> [!example]- What margin, premium and capital does a 10% required return set for this book? {Example}
> A book has expected loss $60$ and is supported by assets of $100$. Owners require a $10\%$ return on capital.
>
> > [!answer]-
> > - $\delta = 0.10/1.10 = 0.09091$.
> > - The margin is $0.09091 \times (100 - 60) = 3.64$.
> > - The premium is $60 + 3.64 = 63.64$, and the capital is $100 - 63.64 = 36.36$.
> > - As a check, $3.64/36.36 = 10\%$.
> > - The margin ratio is $3.64/63.64 = 5.7\%$ of the risk premium.
> > - Grossed up for a $25\%$ expense ratio, the premium is $63.64/0.75 = 84.85$, and the same margin is $4.3\%$ of it, with no change in profitability.

## Margin by layer

Pricing layer by layer with a distortion $g$, the margin per unit of the layer at $x$ is

> $$g(S(x)) - S(x)$$

- $S(x)$ is the layer's attachment probability, the probability that the loss exceeds $x$.
- $g(S(x))$ is the priced probability.

A constant cost of capital is the distortion $g(s) = \nu s + \delta$. It charges almost $\delta$ per unit of capacity whatever the layer's attachment probability, which loads remote layers heavily. A distortion other than the constant cost of capital asks a different return of each layer.

> [!example]- How does a constant 15% cost of capital spread this portfolio's margin across its layers? {Example}
> A catastrophe portfolio's loss $X$ in $\$$ millions has this distribution, with $E[X] = 6.2$ and assets $a = 100$. At $\iota = 15\%$, $\nu = 0.8696$ and $\delta = 0.1304$. The layers are $0$–$10$, $10$–$50$ and $50$–$100$.
>
> | $X$ | Probability |
> | ---: | ---: |
> | 0 | 0.80 |
> | 10 | 0.12 |
> | 50 | 0.06 |
> | 100 | 0.02 |
>
> > [!answer]-
> > - The layers' attachment probabilities are $S = 0.20$, $0.08$ and $0.02$.
> > - The priced probabilities $g(S) = 0.8696\,S + 0.1304$ are $0.3043$, $0.2000$ and $0.1478$.
> > - The $0$–$10$ layer's margin is $10 \times (0.3043 - 0.20) = 1.04$.
> > - The $10$–$50$ layer's margin is $40 \times (0.2000 - 0.08) = 4.80$.
> > - The $50$–$100$ layer's margin is $50 \times (0.1478 - 0.02) = 6.39$.
> > - The total, $12.23$, matches $\delta(a - L) = 0.1304 \times 93.8$.
> > - The top layer carries $16\%$ of the expected loss ($1.0$ of $6.2$) but $52\%$ of the margin, because a constant cost of capital charges for capacity whatever the chance of using it.
