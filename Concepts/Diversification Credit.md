---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5a617de9fa56d9f7fd9b5fd6b8b2014851a9a1607beb74f0c6d9a7fab1edf3c0
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Diversification Credit.md
---

**The Diversification Credit** is the reduction in [[MCT]] [[Capital Required]] recognising that [[Insurance Risk Margin|insurance risk]] and the combined [[Market Risk Margin|market]] and [[Credit Risk Margin|credit]] risk do not crystallise at the same time. Adding the margins together assumes perfect correlation; the credit removes part of that over-statement.

> $$\text{CR} = \text{Insurance} + \text{Market} + \text{Credit} + \text{Operational} - \text{Diversification}$$

- **The intuition.** A hurricane and an equity market crash are largely unrelated events. An insurer that would need $\$100$ million for one and $\$80$ million for the other does not need $\$180$ million to survive both, because the probability of both occurring at their modelled severities in the same year is far below the probability of either.
- **The formula recognises diversification between two blocks** (MCT §8): the insurance risk requirement $I$ and the sum of the credit and market risk requirements $A$, with a correlation factor of $50\%$ — $D = A + I - \sqrt{A^2 + I^2 + 2 \times 0.5 \times A \times I}$. Credit and market risk are added to each other without a credit, since credit losses correlate with market stress, and [[Operational Risk Margin|operational risk]] gets none at all: operational failures tend to occur precisely when everything else is going wrong.
- **The credit is largest when the two blocks are of similar size.** An insurer whose capital requirement is almost entirely insurance risk gets little benefit, because there is nothing to diversify against.
- **Correlation is not constant, which is the standing criticism.** In a severe crisis, correlations rise toward one: a catastrophe triggers asset sales, a market collapse coincides with an economic downturn that raises claim frequency and fraud. A diversification credit calibrated to normal-time correlation overstates the benefit in exactly the scenario it matters.
- **[[ORSA]] should test that.** An insurer relying on the credit should examine, in its own scenarios, what happens if the risks *do* coincide, and reflect the answer in the [[Internal Target Capital Ratio|internal target]].

![[Media/Figures/Diversification_Credit.svg|340]]

> [!example]- Sizing the Credit {Example}
> An insurer has an insurance risk margin of $\$110$ million and a market risk margin of $\$65$ million, with credit risk $\$18$ million and operational risk $\$14$ million. The diversification credit is computed as
>
> $$D = I + A - \sqrt{I^2 + 2\rho IA + A^2}$$
>
> where $A$ is the sum of the credit and market risk margins and $\rho = 0.50$. Compute capital required, and test what happens if the two blocks turn out to be perfectly correlated.
>
> > [!answer]-
> > **The credit-and-market block:** $A = \$65\text{M} + \$18\text{M} = \$83\text{M}$.
> >
> > **The combined requirement:**
> >
> > $$\begin{align*}
> > \sqrt{110^2 + 2(0.50)(110)(83) + 83^2} &= \sqrt{12{,}100 + 9{,}130 + 6{,}889} \\
> > &= \sqrt{28{,}119} \\
> > &= 167.7
> > \end{align*}$$
> >
> > **Diversification credit:**
> >
> > $$\begin{align*}
> > D &= \$110\text{M} + \$83\text{M} - \$167.7\text{M} \\
> > &= \$25.3\text{M}
> > \end{align*}$$
> >
> > **Capital required:**
> >
> > $$\begin{align*}
> > \text{CR} &= \$110 + \$65 + \$18 + \$14 - \$25.3 \\
> > &= \$181.7\text{M}
> > \end{align*}$$
> >
> > and the [[Base Solvency Buffer]] is $1.5 \times \$181.7 = \$272.5$ million.
> >
> > **Now suppose $\rho = 1$.** The square root becomes $110 + 83 = 193$, the credit falls to zero, capital required rises to $\$207$ million and the buffer to $\$310.5$ million — **$\$38.0$ million more**.
> >
> > **What that means.** On capital available of $\$450$ million, the MCT ratio falls from $165\%$ to $145\%$ — through the supervisory target — purely from a correlation assumption. The diversification credit is worth $20$ points of MCT ratio, and it rests on a parameter nobody observes directly.
> >
> > **The practical conclusion for [[ORSA]]:** an insurer whose ratio depends materially on the credit should hold an internal target that survives the correlated case. Diversification is real in ordinary years and unreliable in the years capital is actually needed, and a capital plan that assumes otherwise is assuming away the scenario it exists for.
