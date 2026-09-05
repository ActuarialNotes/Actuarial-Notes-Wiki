---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2562e608f0f7c6d1b38041bf6ae5d22e2ea7beb7ecbcb38252093bf01bbed2dd
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Risk Adjustment for Non-Financial Risk.md
---

**The Risk Adjustment for Non-Financial Risk** (RA) is the compensation an insurer requires for bearing the **uncertainty in the amount and timing** of cash flows arising from non-financial risk — insurance risk, lapse risk and expense risk. It is an entity-specific measure under [[IFRS 17]], and its **confidence level must be disclosed**, whatever technique was used to set it.

> $$\text{RA} = \text{Value placed on bearing uncertainty in non-financial cash flows}$$

- **What it is not.** It is not a prudential margin set by a regulator, not a provision for adverse deviations at a prescribed level, and not compensation for *financial* risk — interest rate and market risk are captured in the [[IFRS 17 Discount Rates|discount rate]], not here.
- **It is entity-specific.** Two insurers with identical liabilities may hold different risk adjustments because they have different degrees of risk aversion, different diversification, and different views of the uncertainty. This is a deliberate departure from a market-consistent measure and it is why the confidence-level disclosure exists — it makes the difference comparable.
- **Common techniques:** the **confidence level (VaR)** approach, translating a chosen percentile of the liability distribution into an amount; the **cost of capital** approach, charging a rate on the capital required to run off the liabilities; and the **conditional tail expectation (CTE/TVaR)** approach. Whichever is used, the equivalent confidence level must be disclosed.
- **The five characteristics** IFRS 17 says a risk adjustment should exhibit: low-frequency/high-severity risks attract higher adjustments than high-frequency/low-severity ones; longer-duration contracts attract higher adjustments than shorter ones; wider probability distributions attract higher adjustments than narrower ones; the less that is known about the estimate and its trend, the higher the adjustment; and emerging experience that reduces uncertainty reduces the adjustment.
- **Diversification.** The RA reflects diversification only to the extent the *entity* benefits from it, and the level at which diversification is recognised (entity or group) must be disclosed — a significant judgement, because entity-level diversification can substantially lower the number.
- **Release pattern.** The RA is released to [[Insurance Service Expenses|profit]] as risk expires, so a long-tail line releases it slowly. Under the [[Reinsurance Contracts Held|reinsurance held]] measurement the sign flips: the RA on reinsurance held represents risk **transferred away**, and it increases the reinsurance asset.

> [!example]- Setting the Risk Adjustment Two Ways {Example}
> An insurer's discounted fulfilment cash flows for incurred claims are $\$250$ million. The liability distribution is approximately lognormal with a coefficient of variation of $12\%$. The insurer targets the $75\text{th}$ percentile.
>
> Alternatively, the capital required to run off the liabilities is $\$95$ million in year 1, declining $30\%$ per year, and the cost of capital rate is $6\%$.
>
> Compute the RA under each and compare.
>
> > [!answer]-
> > **Confidence level approach.** For a lognormal with mean $\mu_X = 250$ and $CV = 0.12$:
> >
> > $$\begin{align*}
> > \sigma^2 &= \ln(1 + 0.12^2) = 0.014286 \\
> > \sigma &= 0.11952 \\
> > \mu &= \ln(250) - \tfrac{1}{2}(0.014286) = 5.51930
> > \end{align*}$$
> >
> > The $75\text{th}$ percentile uses $z_{0.75} = 0.6745$:
> >
> > $$\begin{align*}
> > x_{0.75} &= e^{5.51930 + 0.6745(0.11952)} \\
> > &= e^{5.59991} \\
> > &= \$270.4\text{M}
> > \end{align*}$$
> >
> > $$\text{RA} = \$270.4\text{M} - \$250\text{M} = \$20.4\text{M}$$
> >
> > **Cost of capital approach.** Capital of $95, 66.5, 46.55, 32.59, \ldots$ million, charged at $6\%$ and discounted (at $4\%$, say) is approximately:
> >
> > $$\begin{align*}
> > \text{RA} &\approx 0.06 \times \frac{\$95\text{M}}{1 - 0.70/1.04} \\
> > &= 0.06 \times \$290.6\text{M} \\
> > &= \$17.4\text{M}
> > \end{align*}$$
> >
> > **Comparison.** The two techniques give $\$20.4$ million and $\$17.4$ million — an $\$3$ million difference on the same liability, driven entirely by methodology and parameter choice.
> >
> > This is exactly why IFRS 17 requires the **confidence level** disclosure rather than the technique: an insurer using the cost of capital approach must still translate $\$17.4$ million into an equivalent percentile (here, roughly the $71\text{st}$) so a reader can compare it with the first insurer's $75\text{th}$. Without that translation, "we hold a risk adjustment" would convey nothing.
