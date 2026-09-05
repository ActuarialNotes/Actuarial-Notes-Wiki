---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b655ff581b508fc9d55ed0458aed2a869db2f3becd4347b2ed00373ca2bb346b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Diversification Credit.md
---

**The Diversification Credit** is the reduction in [[MCT]] [[Capital Required]] recognising that [[Insurance Risk Margin|insurance risk]] and [[Market Risk Margin|market risk]] do not crystallise at the same time. Adding the two margins together assumes perfect correlation; the credit removes part of that over-statement.

> $$\text{CR} = \text{Insurance} + \text{Market} + \text{Credit} + \text{Operational} - \text{Diversification}$$

- **The intuition.** A hurricane and an equity market crash are largely unrelated events. An insurer that would need $\$100$ million for one and $\$80$ million for the other does not need $\$180$ million to survive both, because the probability of both occurring at their modelled severities in the same year is far below the probability of either.
- **The formula recognises diversification only between insurance and market risk.** [[Credit Risk Margin|Credit risk]] and [[Operational Risk Margin|operational risk]] are added without a credit — credit losses correlate with market stress, and operational failures tend to occur precisely when everything else is going wrong.
- **The credit is largest when the two risks are of similar size.** An insurer whose capital requirement is almost entirely insurance risk gets little benefit, because there is nothing to diversify against.
- **Correlation is not constant, which is the standing criticism.** In a severe crisis, correlations rise toward one: a catastrophe triggers asset sales, a market collapse coincides with an economic downturn that raises claim frequency and fraud. A diversification credit calibrated to normal-time correlation overstates the benefit in exactly the scenario it matters.
- **[[ORSA]] should test that.** An insurer relying on the credit should examine, in its own scenarios, what happens if the risks *do* coincide, and reflect the answer in the [[Internal Target Capital Ratio|internal target]].

> [!example]- Sizing the Credit {Example}
> An insurer has an insurance risk margin of $\$110$ million and a market risk margin of $\$65$ million, with credit risk $\$18$ million and operational risk $\$14$ million. The diversification credit is computed as
>
> $$D = I + M - \sqrt{I^2 + 2\rho IM + M^2}$$
>
> with $\rho = 0.50$. Compute capital required, and test what happens if the two risks turn out to be perfectly correlated.
>
> > [!answer]-
> > **The combined insurance-and-market requirement:**
> >
> > $$\begin{align*}
> > \sqrt{110^2 + 2(0.50)(110)(65) + 65^2} &= \sqrt{12{,}100 + 7{,}150 + 4{,}225} \\
> > &= \sqrt{23{,}475} \\
> > &= 153.2
> > \end{align*}$$
> >
> > **Diversification credit:**
> >
> > $$\begin{align*}
> > D &= \$110\text{M} + \$65\text{M} - \$153.2\text{M} \\
> > &= \$21.8\text{M}
> > \end{align*}$$
> >
> > **Capital required:**
> >
> > $$\begin{align*}
> > \text{CR} &= \$110 + \$65 + \$18 + \$14 - \$21.8 \\
> > &= \$185.2\text{M}
> > \end{align*}$$
> >
> > and the [[Base Solvency Buffer]] is $1.5 \times \$185.2 = \$277.8$ million.
> >
> > **Now suppose $\rho = 1$.** The square root becomes $110 + 65 = 175$, the credit falls to zero, capital required rises to $\$207$ million and the buffer to $\$310.5$ million — **$\$32.7$ million more**.
> >
> > **What that means.** On capital available of $\$450$ million, the MCT ratio falls from $162\%$ to $145\%$ — through the supervisory target — purely from a correlation assumption. The diversification credit is worth $17$ points of MCT ratio, and it rests on a parameter nobody observes directly.
> >
> > **The practical conclusion for [[ORSA]]:** an insurer whose ratio depends materially on the credit should hold an internal target that survives the correlated case. Diversification is real in ordinary years and unreliable in the years capital is actually needed, and a capital plan that assumes otherwise is assuming away the scenario it exists for.
