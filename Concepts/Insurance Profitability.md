---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:302eaec9583029992fc7a053cb040d269a1097bbe5cf64b32d35b3f1a367c94c
  sources: []
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
