---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:302eaec9583029992fc7a053cb040d269a1097bbe5cf64b32d35b3f1a367c94c
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

**Insurance Profitability** is how well premium rewards the capital that stands behind it. Exam 9 assesses it through three linked ratios — [[Insurance Margin|margin]] (profit relative to premium), [[Return on Capital|return]] (profit relative to capital) and [[Insurance Leverage|leverage]] (premium relative to capital) — because none of them alone says whether a line is profitable.

> $$\frac{M}{Q} = \frac{M}{P} \times \frac{P}{Q}$$
>
> $$\frac{M}{P} = 1 - \frac{L}{P}$$

- Return equals margin ratio times premium-to-capital leverage, and the margin ratio is one minus the [[Loss Ratio|loss ratio]]. A thin margin on a highly leveraged book and a fat margin on a lightly leveraged one can earn the same return.
- **The insurance pentagon** (Mildenhall and Major): five amounts — expected loss $L$, premium $P$, margin $M$, capital $Q$ and assets $a$ — tied by $P = L + M$ and $a = P + Q$, and described by three ratios: loss ratio $L/P$, leverage and return $\iota = M/Q$. That leaves three degrees of freedom, so three well-chosen quantities (say $L$, $a$ and $\iota$) usually determine the rest. The three ratios alone do not: they fix proportions, not volume.
- **The loss ratio alone misleads.** A line with a low loss ratio can be unprofitable if it consumes a great deal of capital, and one with a high loss ratio can be very profitable if it needs little. Comparing lines requires capital allocated to each — see [[Risk-Adjusted Performance]] and [[Risk Capital]].
- **Diversification sets the mix.** Where diversification works, capital can be highly leveraged and margins thin; where it fails, as for [[Catastrophe Risk|catastrophe risk]], leverage falls and the margin ratio must rise to deliver the same return.
- **Accounting versus pricing.** Reported measures — the [[Combined Ratio|combined ratio]], the operating ratio, net income over surplus ([[Key Financial Measures]]) — mix accident years, reserve development and realised gains. Pricing profitability uses expected values, allocated capital and discounted cash flows ([[Economic Value]]).

> [!example]- Completing the Pentagon and Testing Against a Target {Example}
> A book has expected loss $70$, is supported by assets of $150$ and is written at a premium of $78$. Investors require $12\%$. Compute margin, capital, loss ratio, leverage and return, and the shortfall against the target.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > M &= 78 - 70 \\
> > &= 8 \\
> > Q &= 150 - 78 \\
> > &= 72 \\
> > \iota &= \frac{8}{72} \\
> > &= 11.1\%
> > \end{align*}
> > $$
> >
> > The loss ratio is $70/78 = 89.7\%$, so the margin ratio is $10.3\%$; leverage is $78/72 = 1.083$; and $10.3\% \times 1.083 = 11.1\%$ agrees.
> >
> > The premium that earns $12\%$, with $\delta = 0.12/1.12 = 0.10714$:
> >
> > $$
> > \begin{align*}
> > P_{\text{req}} &= 70 + 0.10714(150 - 70) \\
> > &= 78.57
> > \end{align*}
> > $$
> >
> > The book is $0.57$ short of its required margin: $11.1\%$ is below the cost of capital even though an $89.7\%$ loss ratio might look acceptable on its own.

> [!example]- A 51% and a 96% Loss Ratio Earning the Same Return {Example}
> Two lines are each supported by assets of $100$ and priced at a $12\%$ return. Personal auto has expected loss $70$; a catastrophe-exposed property line has expected loss $10$. Compare their loss ratios and leverage.
>
> > [!answer]-
> > With $\delta = 0.10714$ and $P = L + \delta(a - L)$:
> >
> > $$
> > \begin{align*}
> > P_{\text{auto}} &= 70 + 0.10714(30) \\
> > &= 73.21 \\
> > P_{\text{cat}} &= 10 + 0.10714(90) \\
> > &= 19.64
> > \end{align*}
> > $$
> >
> > - Auto: loss ratio $70/73.21 = 95.6\%$, capital $26.79$, leverage $2.73$, margin ratio $4.4\%$.
> > - Catastrophe: loss ratio $10/19.64 = 50.9\%$, capital $80.36$, leverage $0.24$, margin ratio $49.1\%$.
> >
> > In both, $\text{margin ratio} \times \text{leverage} = 12\%$. The catastrophe line's low loss ratio is not excess profit — it is the price of the capital its tail consumes.
