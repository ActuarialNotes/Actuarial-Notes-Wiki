---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2121a30c6eb7134b94d6b4135c35bbf3ff9ba26fb3e965e6c466ebd790af592c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Non-Pricing Solutions.md
---

**Non-Pricing Solutions** are actions that bring the fundamental insurance equation back into balance by **reducing costs** — expenses or expected losses — rather than by raising rates. Werner & Modlin present them in *Implementation*, alongside the pricing solutions, as a response to an indication the company cannot or will not take in full — see [[Considerations for Implementing Rates]].

> $$\bar{P}_I = \frac{\bar{L} + \bar{E}_F}{1 - V - Q_T}$$

- $\bar{P}_I$ is the indicated average premium, $\bar{L}$ the expected loss and LAE per exposure, $\bar{E}_F$ the [[Fixed Expenses|fixed expense]] per exposure, $V$ the [[Variable Expenses|variable expense]] provision and $Q_T$ the target [[Profit and Contingency Provision|profit provision]] (the [[Pure Premium Method|pure premium]] form of the indication). A pricing solution raises the current average premium toward $\bar{P}_I$; a non-pricing solution lowers $\bar{P}_I$ toward the current premium.
- **Reduce expenses** — underwriting or LAE: a smaller marketing budget, lower staffing, lower acquisition cost. This lowers $\bar{E}_F$ or $V$.
- **Reduce expected losses** in three ways:
  - *Change the portfolio* — tighten underwriting criteria, or non-renew policies whose premium is grossly inadequate. Premium leaves along with the losses, so it helps only if the loss reduction exceeds the premium reduction.
  - *Reduce coverage* — a coverage level change such as excluding mold from homeowners. Removing previously covered loss without lowering the rate is equivalent to a rate increase.
  - *Better loss control* — for example, medical management and return-to-work programs that stop workers compensation disability claims escalating.
- **When they are used:** where rates are promulgated or increases are hard to obtain, companies often run the indication but act on it through non-pricing levers; where a full increase would damage retention and new business (see [[Ratemaking Constraints]], [[Lifetime Value]]), they supplement a partial increase. Catastrophe concentration is managed the same way — restricting new business in exposed areas, requiring higher catastrophe deductibles, buying [[Reinsurance|reinsurance]].
- After any such action the losses, expenses and premium are re-projected and the [[Overall Rate Level Indication|indication]] recomputed. Underwriting and coverage changes act only as policies renew, so they take a full term to earn in.

> [!example]- Closing a Capped Indication {Example}
> Expected loss and LAE are $\$420$ per exposure, fixed expenses $\$35$, variable expenses $22\%$ of premium and the target profit $5\%$. The current average premium is $\$580$ and the regulator will approve at most $+3\%$.
>
> Find the indication, and what non-pricing action alone would close the gap at $+3\%$.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \bar{P}_I &= \frac{\$420 + \$35}{1 - 0.22 - 0.05} = \frac{\$455}{0.73} \\
> > &= \$623.29 \quad (+7.5\%) \\
> > \text{Approved premium} &= \$580 \times 1.03 = \$597.40
> > \end{align*}
> > $$
> >
> > Solve for each lever with the others fixed:
> >
> > $$
> > \begin{align*}
> > V &= 1 - 0.05 - \frac{\$455}{\$597.40} = 18.8\% \\
> > \bar{L} &= \$597.40 \times 0.73 - \$35 = \$401.10
> > \end{align*}
> > $$
> >
> > Either variable expenses fall by $3.2$ points (a commission cut, say) or expected losses fall $4.5\%$ (a coverage restriction or loss control program). A mix — losses $-2\%$ and fixed expenses down to $\$30$ — gives $\bar{P}_I = (\$411.60 + \$30)/0.73 = \$604.93$, still $1.3\%$ above the approved level; the remaining shortfall is accepted as a lower profit until the next filing.

> [!example]- Non-Renewing an Inadequate Segment {Example}
> The book has $10{,}000$ policies at an average premium of $\$580$ and expected loss of $\$420$ (same expense and profit assumptions). A segment of $800$ policies averages $\$700$ of premium and $\$900$ of expected loss. The company non-renews the segment. Recompute the indication, first with fixed expenses per policy unchanged, then with total fixed expenses of $\$350{,}000$ unchanged.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \bar{L} &= \frac{\$4{,}200{,}000 - \$720{,}000}{9{,}200} = \$378.26 \\
> > \bar{P} &= \frac{\$5{,}800{,}000 - \$560{,}000}{9{,}200} = \$569.57 \\
> > \bar{P}_I &= \frac{\$378.26 + \$35}{0.73} = \$566.11
> > \end{align*}
> > $$
> >
> > The indication moves from $+7.5\%$ to $-0.6\%$: a segment running a $129\%$ loss ratio was absorbing the whole gap.
> >
> > But fixed costs do not leave with the policies. Spreading $\$350{,}000$ over $9{,}200$ policies gives $\$38.04$ each:
> >
> > $$\bar{P}_I = \frac{\$378.26 + \$38.04}{0.73} = \$570.27$$
> >
> > which is $+0.1\%$. The action still works, but part of its benefit is given back as the fixed expense load rises. Werner's caution is that a portfolio change moves premium as well as losses; fixed costs, being fixed in total rather than per policy, move the per-exposure load too.
