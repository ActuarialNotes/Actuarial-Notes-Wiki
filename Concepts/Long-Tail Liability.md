---
aliases:
  - Long-Tail Insurance Liability
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a6f14e38fa32240fb7c5711c8c4c36064c278257d5d5721e31341c4596795fa9
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Long-Tail Liability.md
---
A **Long-Tail Liability** is an insurance or pension obligation whose cash flows continue beyond the longest maturity of the bonds available to back it, usually taken as beyond about 30 years, such as a pension plan, a payout annuity, long-term care insurance or a long-dated guarantee. The cash flows in the tail can't be matched, so the insurer bears reinvestment risk on them, along with long-horizon [[Inflation|inflation]] and [[Longevity Risk|longevity risk]].

In most markets the longest liquid government and corporate bonds mature in about 30 years, while a pension promised to a young member, or an annuity on a 55-year-old, can pay for 50 years or more. If bonds can be bought to a longest maturity $T^{*}$, the liability's value is

> $$L = \sum_{t \le T^{*}} CF_t\,v^t + v^{T^{*}}\,V_{T^{*}}(r)$$

- $CF_t$ is the liability cash flow at time $t$.
- $v^t$ is the discount factor from bonds available today.
- $V_{T^{*}}(r)$ is the value at time $T^{*}$ of the tail, the cash flows after $T^{*}$.

The tail must be funded at time $T^{*}$ by reinvesting at a rate $r$ that is unknown today, so its value at $T^{*}$ is

> $$V_{T^{*}}(r) = \sum_{t > T^{*}} CF_t\,(1 + r)^{-(t - T^{*})}$$

Valuation standards limit this risk on paper by setting an ultimate reinvestment rate or extrapolating the [[Yield Curve|yield curve]] beyond its last liquid point, but the economic risk remains.

## Reinvestment risk on the tail

The tail is discounted twice, at today's rates to $T^{*}$ and at the future rate beyond it, so a fall in long-run rates raises the value of the liability with no offsetting gain in the assets. If the assumed reinvestment rate changes by $\Delta r$, with the assets backing the first $T^{*}$ years unaffected, the change in surplus is

> $$\Delta S \approx -\frac{\partial L}{\partial r}\,\Delta r$$

[[Reinvestment Risk|Reinvestment risk]] on the tail is the main obstacle to [[Immunization|immunizing]] a long-tail liability, and a duration match built only from available bonds leaves it open.

> [!example]- How much does this insurer's surplus fall if the tail is funded at 3% rather than 4%? {Example}
> An insurer owes 100 at the end of each year for 60 years. Bonds are available to 30 years and the yield curve is flat at 4%. It holds assets equal to the liability valued with a reinvestment rate of 4%.
>
> > [!answer]-
> > - The first 30 payments are an annuity at 4%: $100\,a_{\overline{30}|4\%} = 1{,}729.20$.
> > - The tail is a 30-year annuity at rate $r$, valued at year 30 and discounted to today with $1.04^{-30} = 0.30832$.
> > - At $r = 4\%$ the tail is worth $1{,}729.20 \times 0.30832 = 533.15$, so the liability is $2{,}262.35$.
> > - At $r = 3\%$ the tail is worth $100\,a_{\overline{30}|3\%} \times 0.30832 = 1{,}960.04 \times 0.30832 = 604.32$, so the liability is $2{,}333.52$.
> > - The assets don't change with the future reinvestment rate, so the surplus falls by $71.17$, or 3.1% of the liability.
> > - The tail is only 24% of the liability's present value but carries all of this sensitivity.

## Inflation and longevity

Many long-tail liabilities, such as indexed pensions and long-term care benefits, grow with prices or wages. Inflation-linked bonds hedge part of this, but they are scarce and short of the longest maturities. Over 50 years even modest unexpected inflation compounds into a large cost.

The tail exists only because people live a long time, so the cash flows beyond 30 years are the ones most affected by improvements in mortality. Longevity risk and reinvestment risk compound, since a longer life adds cash flows exactly where they are hardest to match.

## Non-fixed-income assets

Real estate, infrastructure, private equity and public equity have long or indefinite lives, cash flows that tend to rise with inflation, and higher expected returns than long bonds. The SOA's research paper on backing long-term insurance liabilities with non-fixed-income assets argues that holding them against the tail can lower the cost of funding it and partly hedge inflation. Their income rises with inflation, but not one for one and not every year, so they are a partial hedge for indexed pensions.

These assets are volatile and their cash flows uncertain, so they add surplus volatility. Regulators charge much more capital for them than for bonds, many are illiquid and valued by appraisal, and accounting may report their price swings in earnings. The insurer judges whether the expected return outweighs the capital, volatility and liquidity costs over the tail's horizon.

> [!example]- How much must this insurer put in equities to fund the tail, and how likely is a shortfall? {Example}
> The insurer above needs 1,960.04 at year 30 to fund the tail at 3%, which a 30-year zero-coupon bond would cost 604.32 today. Instead it considers equities with an expected return of 6.5% a year and volatility of 16%, modelled as lognormal.
>
> > [!answer]-
> > - The amount that meets the target on average is $1{,}960.04 \times 1.065^{-30} = 296.33$.
> > - The 30-year log return has mean $30\left[\ln 1.065 - \tfrac{1}{2}(0.16)^2\right] = 1.5052$.
> > - Its standard deviation is $0.16\sqrt{30} = 0.8764$.
> > - A shortfall means a log return below $\ln(1{,}960.04 / 296.33) = 1.8892$, which is $(1.8892 - 1.5052)/0.8764 = 0.438$ standard deviations above the mean.
> > - The probability of a shortfall is $\Phi(0.438) = 0.67$, because the median outcome is well below the mean.
> > - For a 75% chance of having enough, the investment must be $1{,}960.04 / e^{1.5052 - 0.6745 \times 0.8764} = 785.70$, more than the bond's 604.32.
> > - Funding the tail at the equities' expected return leaves a high chance of shortfall, and the capital a regulator requires comes on top.

## Long-tail lines

In property and casualty insurance, [[Long Tail Lines|long-tail lines]] are lines such as workers compensation and general liability, whose claims take years to be reported and settled. That is a reserving idea about the uncertainty of the ultimate loss. A long-tail liability in ALM is about the length of a known or estimated cash flow stream compared with the assets available.

> [!trap] Discounting the tail at today's rate alone
> Discounting the cash flows beyond the last bond at today's curve treats the reinvestment rate as known. The tail's value depends on the future rate, so this understates the risk: in the example above a fall from 4% to 3% costs 3.1% of the liability.
