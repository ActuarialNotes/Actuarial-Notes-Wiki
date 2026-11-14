---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:fe2bccadf0a6748b12d7b90dbf19a46c95c1a7ebbb7408911b8f0098c6c8aa58
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Reinvestment Risk.md
---
**Reinvestment Risk** is the risk that the coupons and other intermediate cash flows from a [[Bonds|bond]] must be reinvested at a rate lower than originally anticipated, which reduces the total accumulated return. A bond bought to yield $j$ realizes that yield only if every coupon can be reinvested at $j$.

When the coupons are reinvested at rate $j'$, the bond's accumulated value at maturity is

> $$\text{Accumulated value} = Fr \cdot s_{\overline{n}|j'} + C$$

- $Fr$ is the coupon paid at the end of each period.
- $s_{\overline{n}|j'}$ is the accumulated value of an annuity-immediate of 1 per period for $n$ periods at rate $j'$.
- $C$ is the redemption value paid at maturity, in addition to the final coupon.

If $j'$ falls below $j$, the reinvested coupons accumulate to less than projected and the realized yield drops below $j$. If $j'$ rises above $j$, they accumulate to more.

> [!example]- A 3-year 8% annual-coupon $\$1{,}000$ bond bought at par has its coupons reinvested at 5%. What is its accumulated value at time 3? {Example}
> - At 8%, the investor expected to accumulate $1{,}000(1.08)^3 = \$1{,}259.71$.
> - Coupons of $\$80$ are received at times 1, 2 and 3, so reinvested at 5% they accumulate to $80\,s_{\overline{3}|5\%} = 80(3.1525) = \$252.20$.
> - Adding the $\$1{,}000$ redemption value gives an accumulated value of $\$1{,}252.20$.
> - That is $\$7.51$ short of the projection, so the realized yield is slightly below 8%.

## Which bonds carry more reinvestment risk

Reinvestment risk is higher for bonds with more and larger intermediate cash flows, that is shorter [[Macaulay Duration|duration]] and higher coupon rates, because more of the total return depends on reinvesting coupons. It is the counterpart of [[Price Risk|price risk]]. A zero-coupon bond has no reinvestment risk but the most price risk, while a short-term bond has low price risk but high reinvestment risk.

[[Redington Immunization]] and [[Cash Flow Matching|cash flow matching]] both address reinvestment risk by matching the timing of assets and liabilities.
