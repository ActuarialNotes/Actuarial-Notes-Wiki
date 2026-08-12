**Reinsurance Recovery** is the amount an insurer expects to collect from its reinsurers on ceded losses and LAE. It is an **asset** — a receivable — not a reduction of the underlying liability, and the cedant remains liable to its policyholders whether or not the reinsurer pays.

> $$\text{Net Unpaid} = \text{Gross Unpaid} - \text{Ceded Unpaid}$$

> $$\text{Ceded Ultimate} = \text{Ceded Reported} \times \text{CDF}^{\text{ceded}}$$

- Estimate **gross and ceded separately** and derive net as the difference. The ceded pattern is not the gross pattern: excess cessions attach only to large claims, so the ceded triangle develops later, more steeply and far more erratically than gross. See [[Reinsurance]].
- Ceded triangles are **thin and volatile** by construction — a handful of claims — so they are often estimated by applying the treaty terms to projected large-claim experience rather than by developing the ceded triangle directly.
- Historical ceded data reflects the treaties **as they then stood**. A change in attachment point, limit or structure makes prior ceded years non-comparable, which is the reason net triangles are unreliable in a book whose reinsurance programme moves.
- **Collectability** must be assessed: disputes over coverage, commutations that settle the recoverable for a lump sum, and reinsurer insolvency all reduce what actually arrives. Statutory reporting requires provisions for uncollectible reinsurance, and the actuary should state whether the estimate is before or after such a provision.
- Ceded recoveries also lag in **timing** even when uncontested — the cedant pays the claim first and bills afterwards — so the cash-flow profile of a net position differs from its accounting profile.

> [!example]- Gross, Ceded and Net Ultimates {Example}
> AY 2023: gross reported losses $\$4{,}000{,}000$ with a gross CDF of $1.20$; ceded reported losses $\$900{,}000$ with a ceded CDF of $1.55$ under a per-occurrence excess treaty.
>
> Compute the net ultimate, and compare with developing net losses directly at the gross factor.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Gross ultimate} &= \$4{,}000{,}000 \times 1.20 = \$4{,}800{,}000 \\[4pt]
> > \text{Ceded ultimate} &= \$900{,}000 \times 1.55 = \$1{,}395{,}000 \\[4pt]
> > \text{Net ultimate} &= \$4{,}800{,}000 - \$1{,}395{,}000 \\
> > &= \$3{,}405{,}000
> > \end{align*}$$
> >
> > Developing net losses directly at the gross factor instead:
> >
> > $$(\$4{,}000{,}000 - \$900{,}000) \times 1.20 = \$3{,}720{,}000$$
> >
> > a difference of $\$315{,}000$, or $9\%$ of the net reserve. The shortcut assumes ceded losses develop at the same rate as gross, which under an excess treaty they emphatically do not — the large claims that pierce the retention are still maturing into the layer.
> >
> > The direction of the error is systematic, not random: netting first and developing at the gross factor always **overstates** net losses when the ceded layer is longer-tailed than gross.

> [!example]- A Change in Treaty Structure {Example}
> An insurer's per-occurrence retention history: $\$250{,}000$ through $2021$, raised to $\$1{,}000{,}000$ from $1/1/2022$. Ceded losses as a percentage of gross, by accident year at $36$ months: $2019$ $22\%$, $2020$ $24\%$, $2021$ $21\%$, $2022$ $9\%$, $2023$ $8\%$.
>
> How should the ceded reserve for AY 2023 be estimated?
>
> > [!answer]-
> > The drop from $\approx 22\%$ to $\approx 8\%$ is the retention change, not a change in loss experience. The pre-$2022$ ceded history describes a treaty that no longer exists.
> >
> > **Not usable:** ceded development factors from $2019$–$2021$, or any ratio-to-gross benchmark from those years.
> >
> > **Usable approaches:**
> >
> > 1. **Apply current treaty terms to projected claim severities.** Project the gross large-claim distribution for AY 2023, apply $\min(\max(X - \$1\text{M},0),\, L)$ claim by claim, and sum. This is exposure rating and it is insensitive to the treaty history entirely.
> > 2. **Restate the historical ceded triangle** to current terms — recompute what each historical claim *would* have ceded under a $\$1$M retention — and develop the restated triangle. More work, and it requires claim-level data, but it recovers the use of the history.
> >
> > Both avoid the trap of developing a ceded triangle that mixes two treaties, and both make clear why **net** triangles are the wrong structure here: the net pattern changed discontinuously on $1/1/2022$ and no factor selection can span that break.
