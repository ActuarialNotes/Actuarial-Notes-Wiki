---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:cd1f8d24e0460a76db51d1004c943584d4d70460764baab842c4f6076d405f60
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Risk Adjustment for Non-Financial Risk.md
---

![[Media/Figures/Risk_Adjustment_for_Non-Financial_Risk.svg|340]]

The **Risk Adjustment for Non-Financial Risk** (RA) is the compensation an insurer requires for bearing the uncertainty in the amount and timing of cash flows that arises from non-financial risk: insurance risk, lapse risk and expense risk. It is an entity-specific measure under [[IFRS 17]], and its confidence level must be disclosed, whatever technique was used to set it.

IFRS 17 says a risk adjustment should have five characteristics:

1. Low-frequency, high-severity risks attract a higher RA than high-frequency, low-severity ones.
2. Longer-duration contracts attract a higher RA than shorter ones.
3. Risks with a wider probability distribution attract a higher RA than those with a narrower one.
4. The less that is known about the current estimate and its trend, the higher the RA.
5. Emerging experience that reduces uncertainty reduces the RA.

The RA is not a prudential margin set by a regulator, nor a provision for adverse deviations at a prescribed level. It does not compensate for financial risk either, since interest rate and market risk are captured in the [[IFRS 17 Discount Rates|discount rate]].

Because it is entity-specific, two insurers with identical liabilities may hold different risk adjustments. They can differ in risk aversion, in diversification and in their view of the uncertainty. This departure from a market-consistent measure is why the confidence level is disclosed, which makes the two comparable.

## The confidence level approach

The confidence level (VaR) approach sets the RA at a chosen percentile of the liability distribution. At confidence level $\alpha$, the risk adjustment is

> $$\text{RA} = x_{\alpha} - \mathrm{E}[X]$$

- $X$ is the liability, with mean $\mathrm{E}[X]$ equal to the discounted [[Fulfilment Cash Flows|fulfilment cash flows]].
- $x_{\alpha}$ is the $\alpha$ percentile of $X$.

A third technique is the conditional tail expectation (CTE, or TVaR) approach.

> [!example]- Discounted cash flows for incurred claims are $\$250$ million, lognormal with a $12\%$ coefficient of variation. What is the RA at the 75th percentile? {Example}
> - The lognormal's parameters are $\sigma^2 = \ln(1 + 0.12^2) = 0.014297$, so $\sigma = 0.11957$.
> - Its location is $\mu = \ln 250 - \tfrac{1}{2}(0.014297) = 5.51431$.
> - With $z_{0.75} = 0.6745$, the 75th percentile is $e^{5.51431 + 0.6745 \times 0.11957} = \$269.1$ million.
> - The RA is $\$269.1\text{M} - \$250\text{M} = \$19.1$ million.

## The cost of capital approach

The cost of capital approach charges a rate on the capital required to run off the liabilities. With the charge on each year's capital discounted from the start of that year, the risk adjustment is

> $$\text{RA} = r \sum_{t=0}^{\infty} \frac{C_t}{(1+i)^t}$$

- $r$ is the cost of capital rate.
- $C_t$ is the capital required at the start of year $t+1$.
- $i$ is the discount rate.

> [!example]- What is the RA on these liabilities by cost of capital, and its equivalent confidence level? {Example}
> The liabilities are those of the confidence level example: $\$250$ million, lognormal with a $12\%$ coefficient of variation. The capital required to run them off is $\$95$ million in year 1, declining $30\%$ a year. The cost of capital rate is $6\%$, and the discount rate is $4\%$.
>
> > [!answer]-
> > - The capital runs $\$95$, $\$66.5$, $\$46.55$, … million, a geometric series with ratio $0.70/1.04$ once discounted.
> > - Its present value is $\$95\text{M} / (1 - 0.70/1.04) = \$290.6$ million.
> > - The RA is $0.06 \times \$290.6\text{M} = \$17.4$ million.
> > - A liability of $\$267.4$ million sits at about the 73rd percentile of the lognormal, so the equivalent confidence level is about $73\%$.
> > - The two techniques give $\$19.1$ million and $\$17.4$ million on the same liability, which is why IFRS 17 requires the confidence level to be disclosed whatever the technique.

## Diversification and release

The RA reflects diversification only to the extent the entity benefits from it. The level at which diversification is recognised, entity or group, must be disclosed. It is a significant judgement, because entity-level diversification can lower the RA substantially.

The RA is released to profit as risk expires, so a long-tail line releases it slowly. On [[Reinsurance Contracts Held|reinsurance contracts held]] the RA represents risk transferred away, and it increases the reinsurance asset.

> [!trap] Putting financial risk in the risk adjustment
> Interest rate and market risk belong in the discount rate. The RA covers only non-financial risk: insurance, lapse and expense risk.
