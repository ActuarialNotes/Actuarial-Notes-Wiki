---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:10d50b8ee90edb10d31114d274a24019d844f1e038689e27ad04b2bfbcd7b3c9
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Term of Bond.md
---

The **term of a bond** is the time from the bond's issue date (or purchase date) to its **maturity date**, at which the [[Redemption Value]] is paid. The term determines:
- The number of [[Coupon]] payments: $n = \text{term} \times m$ where $m$ = payments per year
- The time factor in the present value formula: $v^n = (1+j)^{-n}$
- The exposure to **price risk**: longer-term bonds are more sensitive to interest rate changes (higher [[Duration]])

- For a [[Callable Bond]], the effective term depends on when the issuer exercises the call option, creating uncertainty in the bond's cash flows.

![[Media/Figures/Term_of_Bond.svg|340]]

> [!example]- Effect of Term on Price {Example}
> A $1{,}000$ face bond pays 6% annual coupons and yields 8%. Find the price for a 5-year term and a 10-year term.
>
> > [!answer]-
> > 5-year: $P = 60 \cdot a_{\overline{5}|8\%} + 1000(1.08)^{-5} = 60(3.9927) + 680.58 = 239.56 + 680.58 = 920.15$
> > 10-year: $P = 60 \cdot a_{\overline{10}|8\%} + 1000(1.08)^{-10} = 60(6.7101) + 463.19 = 402.61 + 463.19 = 865.80$
> > Longer term → lower price when yield > coupon rate.
