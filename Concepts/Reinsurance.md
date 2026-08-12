**Reinsurance** is insurance bought by an insurer. The **cedant** transfers part of its exposure to a **reinsurer** for a ceded premium, reducing net retained loss, buying protection against large or accumulated losses, and freeing surplus to support more writings.

> $$\text{Net} = \text{Gross} - \text{Ceded}$$

> $$\text{Ceded}_{\text{XOL}} = \min\!\left(\max(X - R,\, 0),\, L\right)$$

**Proportional** — the reinsurer takes a share of premium and losses alike:

- **Quota share** — a flat percentage of every policy. Ceded losses are a scalar multiple of gross, so the ceded triangle has the same shape as the gross one. Provides surplus relief but no protection against a large single loss.
- **Surplus share** — cedes the portion of each policy's limit above the cedant's retention, so the cession percentage varies by policy. Retains small policies fully and shares large ones.

**Non-proportional (excess of loss)** — the reinsurer pays only above an attachment point:

- **Per-risk XOL** — responds to a single large claim above retention $R$, up to limit $L$.
- **Per-occurrence / catastrophe XOL** — responds to the accumulation from one event, which is how [[Catastrophe Loss|catastrophe]] exposure is managed.
- **Aggregate stop loss** — responds when the whole year's losses exceed a threshold.

Further points:

- **Gross and ceded develop differently.** Excess cessions attach only to large claims, which report late and settle slowly, so the ceded pattern is longer-tailed and far more volatile than gross. Friedland's guidance is to estimate gross and ceded separately and derive net as the difference — never to develop a net triangle whose mix changes every time the treaty changes.
- Net experience is **smoother than gross**, because reinsurance truncates exactly the volatility that matters. That makes net data look more [[Credibility|credible]] than it is; the smoothing is being paid for.
- In **ratemaking** the analysis is usually gross, with the **net cost of reinsurance** — ceded premium less expected ceded losses — loaded as an expense provision. See [[Net of Reinsurance]].
- **Collectability** is a real exposure: reinsurance recoverables are an asset subject to dispute, commutation and reinsurer insolvency, and the cedant remains liable to its policyholders regardless.

> [!example]- Net Losses Under Quota Share and Excess of Loss {Example}
> A cedant has gross ultimate losses of $\$5{,}000{,}000$ across five claims: $\$2{,}600{,}000$, $\$900{,}000$, $\$800{,}000$, $\$500{,}000$ and $\$200{,}000$.
>
> Compute net losses under (a) a $40\%$ quota share and (b) a $\$1{,}000{,}000$ excess of $\$500{,}000$ per-risk treaty.
>
> > [!answer]-
> > **(a) Quota share $40\%$:**
> >
> > $$\begin{align*}
> > \text{Ceded} &= 0.40 \times \$5{,}000{,}000 = \$2{,}000{,}000 \\
> > \text{Net} &= \$3{,}000{,}000
> > \end{align*}$$
> >
> > **(b) $\$1$M xs $\$500$K per risk** — cede $\min(\max(X - 500\text{K},0),\, 1\text{M})$ on each claim:
> >
> > | Claim | Gross | Ceded | Net |
> > |---|---|---|---|
> > | 1 | $\$2{,}600$K | $\$1{,}000$K | $\$1{,}600$K |
> > | 2 | $\$900$K | $\$400$K | $\$500$K |
> > | 3 | $\$800$K | $\$300$K | $\$500$K |
> > | 4 | $\$500$K | $\$0$ | $\$500$K |
> > | 5 | $\$200$K | $\$0$ | $\$200$K |
> > | **Total** | $\$5{,}000$K | $\$1{,}700$K | $\$3{,}300$K |
> >
> > The two structures cede similar amounts on this year's experience but do completely different things. Quota share cedes $40\%$ of *every* claim including the $\$200$K one; the excess treaty cedes nothing below $\$500$K and caps the cedant's exposure to any single claim at $\$1.5$M — claim 1 pierces the top of the layer, so the cedant retains $\$1.6$M of it.
> >
> > Note also what the excess treaty does **not** cover: a second $\$2.6$M claim would again leave $\$1.6$M net. Only an aggregate cover limits the total.

> [!example]- Why the Ceded Triangle Cannot Be Scaled from Gross {Example}
> Under the same $\$1$M xs $\$500$K treaty, gross and ceded reported losses for one accident year:
>
> | Maturity | Gross | Ceded | Ceded ÷ gross |
> |---|---|---|---|
> | $12$ mo | $\$3{,}000$K | $\$150$K | $5.0\%$ |
> | $24$ mo | $\$4{,}200$K | $\$700$K | $16.7\%$ |
> | $36$ mo | $\$4{,}800$K | $\$1{,}400$K | $29.2\%$ |
> | $48$ mo | $\$5{,}000$K | $\$1{,}700$K | $34.0\%$ |
>
> What do the patterns show?
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Gross CDF}_{12 \to 48} &= \frac{5{,}000}{3{,}000} = 1.667 \\[4pt]
> > \text{Ceded CDF}_{12 \to 48} &= \frac{1{,}700}{150} = 11.333
> > \end{align*}$$
> >
> > The ceded layer develops nearly **seven times** as much as gross. The reason is structural: a claim only enters the layer once its reserve passes $\$500{,}000$, so at $12$ months almost nothing has attached, while by $48$ months the large claims have matured into the layer.
> >
> > Two consequences:
> >
> > - Applying the gross CDF to ceded losses would project a ceded ultimate of $\$150\text{K} \times 1.667 = \$250$K against an actual $\$1{,}700$K — understating ceded recoveries by $85\%$ and correspondingly overstating net reserves.
> > - A **net** triangle inherits both patterns and is stable only while the treaty terms are unchanged. One change in the attachment point makes every prior net year non-comparable, while gross and ceded remain separately analyzable.
