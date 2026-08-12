**Ceded Losses** are the portion of gross losses transferred to reinsurers. They are the reinsurer's share of claim cost and, from the cedant's balance sheet, a **recoverable asset** rather than a reduction of the underlying claim liability.

> $$\text{Ceded} = \text{Gross} - \text{Net}$$

> $$\text{Ceded}_{\text{XOL}} = \min\!\left(\max(X - R,\, 0),\, L\right)$$

> $$\text{Ceded}_{\text{QS}} = c \times \text{Gross}$$

- Under **quota share**, ceded is a fixed share $c$ of gross, so the ceded triangle is a scalar multiple of the gross one and develops identically. Under **excess of loss**, ceded responds only to claims piercing retention $R$, and the pattern is entirely different — later, steeper, and far more volatile.
- The ceded triangle is **thin**: a handful of claims in most years, none in some. Development factors estimated from it are unstable, which is why ceded ultimates are often estimated by applying treaty terms to a projected large-claim distribution (exposure rating) instead.
- Ceded losses are **leveraged by trend**. A $6\%$ increase in ground-up severity produces far more than $6\%$ growth in an excess layer, because claims that previously fell short of the retention now pierce it — the same leverage described under [[Inflation]] and [[Increased Limits]].
- Ceded history reflects the treaties **as they stood**. A change in attachment point, limit or structure breaks the series and makes prior ceded years non-comparable; the gross history is unaffected. See [[Gross Losses]].
- Ceded amounts carry **credit risk** — dispute, commutation, insolvency — and a provision for uncollectible reinsurance may be required. The cedant remains liable to its policyholders regardless.

![[Media/Figures/Ceded_Losses.svg|340]]

> [!example]- Ceding Under Two Structures {Example}
> Five claims: $\$2{,}600{,}000$, $\$900{,}000$, $\$800{,}000$, $\$500{,}000$, $\$200{,}000$ ($\$5{,}000{,}000$ gross).
>
> Compute ceded losses under (a) a $30\%$ quota share and (b) a $\$1{,}000{,}000$ excess of $\$500{,}000$ per-risk treaty.
>
> > [!answer]-
> > **(a) Quota share:**
> >
> > $$\text{Ceded} = 0.30 \times \$5{,}000{,}000 = \$1{,}500{,}000$$
> >
> > spread across all five claims in proportion.
> >
> > **(b) Excess of loss** — $\min(\max(X-500\text{K},0),\,1\text{M})$:
> >
> > | Claim | Gross | Ceded |
> > |---|---|---|
> > | 1 | $\$2{,}600$K | $\$1{,}000$K (layer exhausted) |
> > | 2 | $\$900$K | $\$400$K |
> > | 3 | $\$800$K | $\$300$K |
> > | 4 | $\$500$K | $\$0$ |
> > | 5 | $\$200$K | $\$0$ |
> > | **Total** | $\$5{,}000$K | $\$1{,}700$K |
> >
> > The totals are comparable, the distributions are not. The quota share cedes something on every claim; the excess treaty cedes nothing on two of five and is exhausted on the largest — which means claim 1's excess above $\$1.5$M ($\$1.1$M) comes back to the cedant.

> [!example]- Leveraged Trend in the Ceded Layer {Example}
> A book's severity distribution produces $\$5{,}000{,}000$ of gross losses and $\$1{,}700{,}000$ ceded to a $\$1$M xs $\$500$K layer. Ground-up severity then trends $10\%$: each of the five claims above grows by $10\%$.
>
> Compute the trend in the ceded layer.
>
> > [!answer]-
> > Trended claims: $\$2{,}860$K, $\$990$K, $\$880$K, $\$550$K, $\$220$K — gross $\$5{,}500$K, up $10\%$ as expected.
> >
> > Ceded at $\$1$M xs $\$500$K:
> >
> > | Claim | Trended | Ceded |
> > |---|---|---|
> > | 1 | $\$2{,}860$K | $\$1{,}000$K |
> > | 2 | $\$990$K | $\$490$K |
> > | 3 | $\$880$K | $\$380$K |
> > | 4 | $\$550$K | $\$50$K |
> > | 5 | $\$220$K | $\$0$ |
> > | **Total** | $\$5{,}500$K | $\$1{,}920$K |
> >
> > $$\frac{\$1{,}920}{\$1{,}700} - 1 = +12.9\%$$
> >
> > A $10\%$ ground-up trend produced a $12.9\%$ trend in the ceded layer — and the effect is concentrated: claim 4 went from ceding nothing to ceding $\$50$K purely by crossing the retention.
> >
> > Two consequences. The **net** layer trends by less than $10\%$ ($3{,}580/3{,}300 - 1 = +8.5\%$), so a net analysis understates the ground-up trend. And the reinsurer's own pricing must anticipate this leverage — which is why excess rates move so much more violently than primary rates through an inflationary period.
