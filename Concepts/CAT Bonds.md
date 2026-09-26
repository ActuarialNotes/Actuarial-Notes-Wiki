---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:de6ea036b81b9d6e85109c68f4a34be2b2b683bcbfe49d20e68bd92637a08969
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/CAT Bonds.md
---

**CAT Bonds** (catastrophe bonds) are fully collateralised securities through which an insurer or reinsurer — the **sponsor** — buys multi-year catastrophe protection from capital-market investors. Investors earn a floating collateral yield plus a risk spread, and forfeit part or all of their principal if a defined catastrophe **trigger** is hit.

> $$\text{Coupon rate} = r_{\text{mm}} + s$$

> $$\text{Principal lost} = \text{Principal} \times \min\!\left(1,\ \frac{(I - A)^+}{E - A}\right)$$

- $r_{\text{mm}}$ is the money-market return on the collateral, $s$ the risk spread, $I$ the trigger's measured value, $A$ the attachment and $E$ the exhaustion point. A cat bond is a [[Layer of Insurance|layer]] — a tranche of the trigger's distribution ([[Structured Finance]]).
- **Structure.** The sponsor enters a reinsurance (or derivative) contract with a single-purpose reinsurer, usually offshore, and pays it premium. The SPV issues the notes, commonly for about three years, and places the proceeds in a **collateral trust**. Historically a total return swap converted the trust's yield to a floating rate; after Lehman Brothers' 2008 failure impaired several bonds that relied on it as swap counterparty, collateral moved mostly to Treasury money-market funds. If the trigger is hit the trust pays the sponsor; otherwise principal is repaid at maturity.
- **Triggers**, from least to most basis risk (and most to least moral hazard):
  - **Indemnity** — the sponsor's actual losses. No basis risk, but [[Moral Hazard|moral hazard]] in claims handling, disclosure of the sponsor's book, and slow settlement.
  - **Modelled loss** — the event's physical parameters run through an agreed [[Catastrophe Modelling|catastrophe model]] on the sponsor's exposure. Basis risk equals the model's error.
  - **Industry index** — an industry loss estimate (PCS in the U.S.), often weighted by the sponsor's market shares by area. Transparent and quick; basis risk wherever the sponsor's book differs from the industry's.
  - **Parametric** — the physical event itself: magnitude and location, or wind speed in a defined box. Fastest and most transparent, with the most basis risk.
- **Basis risk** — the gap between the sponsor's actual loss and its recovery — is two-sided, and it has an accounting consequence: a non-indemnity bond may not qualify as reinsurance.
- **Pricing.** Offerings quote the attachment probability, the exhaustion probability and the **expected loss** (EL), and the spread is read as a multiple of EL. Cat losses are nearly independent of the economy, so theory says the spread need only cover EL; in practice it runs well above, reflecting [[Model Risk|model uncertainty]], limited capacity and the reinsurance cycle. See [[Insurance-Linked Securities]] for the wider market and [[Securitization]] for why it exists.

> [!example]- Layer Metrics and the Investor's Outcome {Example}
> A sponsor issues $\$150$ million of notes covering $50\%$ of its indemnity losses between $\$1.0$ billion and $\$1.3$ billion from a single hurricane. The modelled attachment probability is $2.5\%$ and the exhaustion probability $1.2\%$; the spread is $6.0\%$. Estimate the EL (assume exceedance probability falls linearly across the layer) and the spread multiple, then find the principal lost if a hurricane costs the sponsor $\$1.2$ billion.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{EL} &\approx \frac{2.5\% + 1.2\%}{2} \\
> > &= 1.85\% \\[4pt]
> > \text{Multiple} &= \frac{6.0\%}{1.85\%} \\
> > &= 3.2
> > \end{align*}
> > $$
> >
> > For the event, $I = \$1{,}200\text{M}$, $A = \$1{,}000\text{M}$, $E = \$1{,}300\text{M}$:
> >
> > $$
> > \begin{align*}
> > \text{Principal lost} &= \$150\text{M} \times \frac{1{,}200 - 1{,}000}{1{,}300 - 1{,}000} \\
> > &= \$100\text{M}
> > \end{align*}
> > $$
> >
> > Investors lose two-thirds of their principal; in a quiet year they earn the money-market rate plus $\$9$ million of spread. The sponsor keeps the other half of the layer — a co-participation that gives it a stake in its own claims handling.

> [!example]- Industry-Index Trigger and Basis Risk {Example}
> A Florida insurer with about a $2\%$ market share buys an index bond paying $2\%$ of industry losses above $\$25$ billion, capped at $\$200$ million. An indemnity cover would instead pay its own losses above $\$500$ million, capped at $\$200$ million. Two hurricanes each cause $\$32$ billion of industry loss: storm X lands where the insurer is concentrated (its loss $\$800$ million), storm Y elsewhere (its loss $\$450$ million). Compare recoveries.
>
> > [!answer]-
> > The index bond pays the same for both storms:
> >
> > $$
> > \begin{align*}
> > \text{Index recovery} &= 0.02 \times (\$32\text{B} - \$25\text{B}) \\
> > &= \$140\text{M}
> > \end{align*}
> > $$
> >
> > - **Storm X:** indemnity would pay $\min(\$800\text{M} - \$500\text{M},\ \$200\text{M}) = \$200\text{M}$. The index pays $\$140$ million — a **$\$60$ million shortfall**, in the storm that hurt most.
> > - **Storm Y:** indemnity would pay nothing (the loss is inside the retention); the index pays $\$140$ million the insurer did not need.
> >
> > Basis risk runs both ways, but the damaging side is systematic: the index under-recovers precisely when the insurer's concentration makes an event worse for it than for the market. Weighting the index by the insurer's share in each county, or a modelled-loss trigger, narrows the gap.
