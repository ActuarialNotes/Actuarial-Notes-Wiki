---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:ac85b7df280d08de30e533c497a9633a808b0c47b38ae441767f5bb8f5fbeca4
  sources:
    - "CAS Exam 9 Practice Items and Solutions (2026; retired Spring 2026 items), Items 3 (M&M 11.3: cost of capital i = [g(s)-s]/[1-g(s)], g(s) = (s+i)/(1+i), LR = s/g(s)) and 4 (M&M pp.317-318: Shapley allocation), sha256:9cf61c6c2597a9a1a6d2d548d83f78a1a56e73778226176ab30308aa85f615fb — https://www.casact.org/sites/default/files/2026-08/Exam9_PracticeItems_2026.xlsx"
    - "Major & Mildenhall, Pricing and Capital Allocation for Multiline Insurance Firms With Finite Assets in an Imperfect Market (arXiv:2008.12427v1, 2020), pp.1-9 (notation p.5-6), 18-24 (eqs 18-25), sha256:a68e6551421c0861f18fdaebef82591dd173af6a781c66f6b2758a809994cca4 — https://arxiv.org/pdf/2008.12427v1"
    - "Goldfarb, Risk-Adjusted Performance Measurement for P&C Insurers (CAS study note, rev. Oct 2010), pp.3-5, 9-11, 31-44, sha256:b0ee2f3239c7f53d07401d4c56828d9a1129d5c1f7b660603d811a50019d7b8e — https://www.casact.org/sites/default/files/database/studynotes_goldfarb8.2.pdf"
    - "Ward & Lee, Practical Application of the Risk-Adjusted Return on Capital Framework (CAS Forum 2002), pp.113, 120-125 (PDF pp.35, 42-47), sha256:8fba670b85d32b9ddcb5477e4dde607564737f24c7b39489347ec575b247ff4d — https://www.casact.org/sites/default/files/database/forum_02sforum_02sf079.pdf"
    - "CAS Exam 9 Content Outline, Fall 2026, pp.4-5, 7 (Domains B and C; text references), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
    - "Mildenhall & Major, Pricing Insurance Risk (Wiley 2022), Index excerpt, pp.523-546, sha256:4e7a560b390d357308ca1274a4c35f13e03d3d7c36555455dd25125f675f3517 — https://media.wiley.com/product_data/excerpt/70/11197556/1119755670-10.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Profitability.md
---

**Insurance Profitability** is how well premium rewards the capital that stands behind it. It is measured by three linked ratios: the [[Insurance Margin|margin]] ratio (margin relative to premium), the [[Return on Capital|return]] (margin relative to capital) and [[Insurance Leverage|leverage]] (premium relative to capital).

With no expenses, taxes or investment income, the margin is premium minus expected loss, $M = P - L$. The return on capital $Q$ is

> $$\frac{M}{Q} = \frac{M}{P} \times \frac{P}{Q}$$

- $M/P$ is the margin ratio.
- $P/Q$ is premium-to-capital leverage, the inverse of capital-to-premium.

Return equals margin ratio times premium-to-capital leverage, and the margin ratio, one minus the [[Loss Ratio|loss ratio]], is

> $$\frac{M}{P} = 1 - \frac{L}{P}$$

A thin margin on a highly leveraged book and a fat margin on a lightly leveraged one can earn the same return. Lines are therefore compared on return on capital, not on the margin ratio or the dollar margin alone. With premium and margin fixed, the leverage needed to earn a target return is the target return divided by the margin ratio.

> [!example]- Does this book earn its investors' required $12\%$ return? {Example}
> A book has expected loss $70$, is supported by assets of $150$ and is written at a premium of $78$.
>
> > [!answer]-
> > - The margin is $M = 78 - 70 = 8$ and the capital is $Q = 150 - 78 = 72$.
> > - The loss ratio is $70/78 = 89.7\%$, so the margin ratio is $10.3\%$.
> > - Leverage is $78/72 = 1.083$, so the return is $10.3\% \times 1.083 = 11.1\%$, which agrees with $8/72$.
> > - The premium that earns $12\%$ is $70 + 0.10714 \times (150 - 70) = 78.57$, with $\delta = 0.12/1.12 = 0.10714$ ([[Insurance Pricing]]).
> > - The book is $0.57$ short of its required margin, so it does not earn $12\%$.

## The insurance pentagon

Mildenhall and Major's insurance pentagon has five amounts: expected loss $L$, premium $P$, margin $M$, capital $Q$ and assets $a$. They are tied by

> $$P = L + M$$

> $$a = P + Q$$

The pentagon is described by three ratios: the loss ratio $L/P$, leverage and the return $\iota = M/Q$. Three well-chosen quantities, say $L$, $a$ and $\iota$, usually determine the rest. The three ratios alone do not, because they fix proportions, not volume.

## Diversification and the margin ratio

Where diversification works, capital can be highly leveraged and margins thin. Where it fails, as for [[Catastrophe Risk|catastrophe risk]], leverage falls and the margin ratio must rise to deliver the same return.

> [!example]- How do the loss ratios and leverage of these two lines compare? {Example}
> Two lines are each supported by assets of $100$ and priced at a $12\%$ return, so $\delta = 0.10714$. Personal auto has expected loss $70$. A catastrophe-exposed property line has expected loss $10$.
>
> > [!answer]-
> > - Auto's premium is $70 + 0.10714 \times 30 = 73.21$, its loss ratio $95.6\%$, its capital $26.79$ and its leverage $2.73$, with a margin ratio of $4.4\%$.
> > - The catastrophe line's premium is $10 + 0.10714 \times 90 = 19.64$, its loss ratio $50.9\%$, its capital $80.36$ and its leverage $0.24$, with a margin ratio of $49.1\%$.
> > - In both, margin ratio times leverage is $12\%$.

## Accounting and pricing profitability

Reported measures, such as the [[Combined Ratio|combined ratio]], the operating ratio and net income over surplus ([[Key Financial Measures]]), mix accident years, reserve development and realised gains. Pricing profitability uses expected values, allocated capital and discounted cash flows ([[Economic Value]]).

> [!trap] Judging a line by its loss ratio alone
> A line with a low loss ratio can be unprofitable if it consumes a great deal of capital, and one with a high loss ratio can be very profitable if it needs little. Compare lines on return on capital, with capital allocated to each ([[Risk-Adjusted Performance]], [[Risk Capital]]).
