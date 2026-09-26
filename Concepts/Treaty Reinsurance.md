---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:bcba13f11f9b101c65931dce5336d68143fd511de920326cc22cc1a85eb6fb82
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Treaty Reinsurance.md
---

**Treaty Reinsurance** is reinsurance of a defined portfolio (a line, a class or a whole book) under one agreement. Every risk within the treaty's terms is ceded automatically and the reinsurer must accept it without seeing it, so the contract is priced on the **portfolio**, as a rate on subject premium, not risk by risk.

> $$\text{Treaty premium} = \text{Rate} \times \text{Subject premium}$$

> $$\text{Loss cost} = \frac{E[\text{Ceded loss}]}{\text{Subject premium}}$$

- **Subject premium** is the premium on the business the treaty covers: net of any reinsurance that *inures* to it (a surplus share, facultative certificates) but gross of the treaty being priced. It is called GNEPI (gross net earned premium income) on a losses-occurring basis and GNWPI (gross net written premium income) on a risks-attaching basis.
- **Losses occurring vs risks attaching.** A *losses-occurring* treaty covers losses that occur during the treaty period, whenever the policy incepted. It is priced on earned premium and [[Accident Year|accident-year]] losses. A *risks-attaching* treaty covers losses on policies written during the period, which can occur up to a policy term after the treaty expires. It is priced on written premium and [[Policy Year|policy-year]] losses.
- **Any structure can be written as a treaty:** [[Quota Share]], [[Surplus Share]], per-risk or per-occurrence [[Excess of Loss]], [[Aggregate Excess of Loss]]. It is priced by experience rating (the treaty's own or "as-if" history, developed, trended and brought to current rate level) and by exposure rating (the current risk profile, through [[Exposure Curves]] or [[Increased Limits|ILFs]]), and the two are blended with [[Credibility|credibility]]. See [[Reinsurance Pricing]].
- **Automatic cession cuts both ways.** The cedant gets certain, immediate capacity. The reinsurer depends on the cedant's underwriting and claims handling. In theory it "follows the fortunes" of the cedant, but in practice the two results can differ a great deal, which is why treaties carry [[Reinsurance Contract Provisions|adjustable provisions]].
- Contrast [[Facultative Reinsurance]], where each risk is offered, underwritten and priced on its own, and the reinsurer may decline it.

> [!example]- Losses Occurring or Risks Attaching? {Example}
> A cedant writes annual policies. Its 2026 per-risk treaty runs 1/1/2026–12/31/2026. Which treaty covers each loss if the treaties are (i) losses occurring, (ii) risks attaching?
>
> - Loss A: policy effective 7/1/2025, loss on 3/1/2026.
> - Loss B: policy effective 1/1/2026, loss on 6/1/2026.
> - Loss C: policy effective 10/1/2026, loss on 5/1/2027.
>
> > [!answer]-
> > **(i) Losses occurring** looks at the loss date. The 2026 treaty covers **A and B**; C falls to the 2027 treaty.
> >
> > **(ii) Risks attaching** looks at the policy's effective date. The 2026 treaty covers **B and C**; A belongs to the 2025 treaty.
> >
> > **Pricing consequences:**
> >
> > - The losses-occurring treaty is priced on 2026 earned premium against accident-year 2026 losses. Its exposure ends on 12/31/2026.
> > - The risks-attaching treaty is priced on 2026 written premium against the policy-year 2026 losses, which can occur as late as 12/31/2027. Losses emerge later, so the development pattern is longer.
> > - Under a risks-attaching *catastrophe* cover, one event on 3/15/2026 hits policies written in 2025 and in 2026, so both treaty years respond and the reinsurer could pay two limits. An *interlocking clause* apportions such an event between the contracts.

> [!example]- Treaty Loss Cost on Net-of-Surplus Subject Premium {Example}
> A cedant's projected gross earned premium is $\$30$ million. A surplus share treaty that inures to its per-risk excess treaty cedes $\$10$ million of it. For the per-risk layer, experience rating indicates a loss cost of $7.5\%$ with credibility $Z = 0.4$, and exposure rating indicates $9.0\%$. The reinsurer prices to a $75\%$ expected loss ratio. Find the treaty rate and premium.
>
> > [!answer]-
> > Subject premium is net of the inuring surplus share:
> >
> > $$\text{GNEPI} = \$30\text{M} - \$10\text{M} = \$20\text{M}$$
> >
> > $$
> > \begin{align*}
> > \text{Loss cost} &= 0.4(7.5\%) + 0.6(9.0\%) \\
> > &= 3.0\% + 5.4\% \\
> > &= 8.4\%
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \text{Rate} &= \frac{8.4\%}{0.75} \\
> > &= 11.2\%
> > \end{align*}
> > $$
> >
> > Expected ceded loss is $0.084 \times \$20\text{M} = \$1.68\text{M}$, and the treaty premium is $0.112 \times \$20\text{M} = \$2.24$ million. The premium is charged as a rate on subject premium, so if the cedant writes more business the premium rises automatically with the exposure.
