---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:3c0d9895b0ee3cd94a44c1f86a1b67fd28c786b4898d0e21cfc92747a57d1db8
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Flood Insurance.md
---

**Flood Insurance** covers damage from overland water — river, coastal and surface flooding — as distinct from sewer backup or water escaping from plumbing. Until roughly 2015 residential overland flood was **uninsurable in Canada**: it was excluded from every homeowner policy, and losses were met by ad hoc government payments under [[Disaster Financial Assistance Arrangements|DFAA]]. It is now widely offered, but not to the highest-risk properties, which is the coverage gap Canadian flood policy is trying to close.

- **Why it was uninsurable.** Flood violates the conditions for private insurability: losses are **spatially correlated** (one event hits every property in the floodplain simultaneously), severe [[Adverse Selection]] means only floodplain residents would buy, and the risk was un-mappable at the property level without modern elevation and hydrological data.
- **What changed:** high-resolution flood mapping and catastrophe modelling made property-level pricing possible; the 2013 Alberta and Toronto floods made the coverage gap politically visible; and reinsurers made capacity available. Insurers now offer overland flood as an endorsement, usually with a sub-limit, a separate deductible and eligibility screening.
- **The residual gap.** Roughly the highest-risk properties — those in frequent-flood zones — remain effectively uninsurable at any premium a homeowner would pay. Proposals for a **national flood insurance program** centre on a public high-risk pool with a federal backstop, private delivery, and risk-based pricing with subsidy made explicit rather than hidden.
- **[[Moral Hazard]] at the land-use level** is the defining policy problem: government disaster assistance after every flood, and any subsidised premium, both reduce the incentive to avoid building in floodplains or to invest in mitigation. A well-designed program prices the risk and subsidises the *household*, not the *location*.
- **Actuarial features:** loss distributions are extremely heavy-tailed and correlated, so pricing depends on catastrophe models rather than experience; the [[Probable Maximum Loss|PML]] drives reinsurance and capital, and [[OSFI]] treats flood accumulation as a [[Concentration Risk|concentration]] and [[Climate Risk|climate]] issue.
- Climate change is shifting the hazard itself, so the historical record understates the future — a **non-stationarity** problem that makes conventional return-period language unreliable.

> [!example]- Why Voluntary Flood Coverage Cannot Be Priced at an Average {Example}
> A community of $10{,}000$ homes has three zones: $500$ homes with an annual flood probability of $10\%$ and average loss $\$80{,}000$; $1{,}500$ homes at $1\%$ and $\$60{,}000$; $8{,}000$ homes at $0.05\%$ and $\$40{,}000$.
>
> Compute the risk-based premiums and the community-average premium, and explain what happens if the average is charged.
>
> > [!answer]-
> > **Risk-based pure premiums:**
> >
> > $$\begin{align*}
> > \text{Zone 1} &= 0.10 \times \$80{,}000 = \$8{,}000 \\
> > \text{Zone 2} &= 0.01 \times \$60{,}000 = \$600 \\
> > \text{Zone 3} &= 0.0005 \times \$40{,}000 = \$20
> > \end{align*}$$
> >
> > **Community average**, weighting by home count:
> >
> > $$\begin{align*}
> > \bar{P} &= \frac{500(\$8{,}000) + 1{,}500(\$600) + 8{,}000(\$20)}{10{,}000} \\
> > &= \frac{\$4{,}000{,}000 + \$900{,}000 + \$160{,}000}{10{,}000} \\
> > &= \$506
> > \end{align*}$$
> >
> > **Charge $\$506$ to everyone and the pool collapses.** Zone 3 homeowners face a premium $25$ times their expected loss and do not buy. Zone 2 homeowners are near break-even and mostly do not buy. Zone 1 homeowners face a premium one sixteenth of their expected loss and all buy — and the pool now needs $\$8{,}000$ per policy against $\$506$ collected. This is [[Adverse Selection]] running to completion in a single step.
> >
> > **What actually works:**
> >
> > - **Price to the zone.** Zone 3 buys at $\$20$ (trivially cheap, so take-up is high), Zone 2 buys at $\$600$. Both are insurable privately.
> > - **Zone 1 is the real problem.** At $\$8{,}000$ nobody buys; below $\$8{,}000$ no insurer writes. This is where a public high-risk pool with an explicit, funded subsidy and a mitigation or relocation requirement is the only structure that works — and it should be paired with land-use rules preventing the zone from growing.
