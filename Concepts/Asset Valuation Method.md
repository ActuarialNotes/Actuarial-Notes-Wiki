---
aliases:
  - Asset Valuation
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:540324e738f48552f44c1b4256739292e821101bdb6686df99f4aa2f1ee3f5d8
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Asset Valuation Method.md
---

An **Asset Valuation Method** is the rule a pension actuary uses to set the value of a plan's assets for a [[Valuation|valuation]]. The value is either the [[Market Value|market value]] or an actuarial value of assets (AVA) that smooths market value by recognizing investment gains and losses gradually, usually within a corridor around market value.

Smoothing makes contributions more stable, at the cost of recognizing the fund's true position later. It is applied to each year's investment gain. With last year's market value $MV_{t-1}$, the year's contributions $C_t$ and benefits $B_t$ paid mid-year, and an assumed return $i$, the expected market value is

> $$E_t = MV_{t-1}(1+i) + (C_t - B_t)(1+i)^{1/2}$$

The investment gain, a loss when negative, is

> $$G_t = MV_t - E_t$$

- $MV_t$ is the market value at the valuation date.

The expected value credits interest on the mid-year cash flows for half a year. Ignoring them, or crediting a full year, puts part of the cash flow into the gain.

## Deferred-gain smoothing

Each year's gain is recognized one $n$th at a time over a smoothing period of $n$ years, so the smoothed value before the corridor is

> $$AVA_t^{*} = MV_t - \sum_{k=0}^{n-1}\frac{n-1-k}{n}\,G_{t-k}$$

- The sum is the part of the last $n$ years' gains not yet recognized.

The current year's gain is $(n-1)/n$ deferred, and a gain $n-1$ years old is fully recognized. Because the method starts from market value and removes only the deferred amounts, the AVA cannot drift away from market value permanently.

> [!trap] Deferring the current year's gain in full
> With five-year smoothing the current year's gain is four-fifths deferred, not all of it. Deferring the full current gain, or recognizing a five-year-old gain only partly, gets every fraction wrong by one year.

## The corridor

The corridor caps how far the AVA can be from market value. With a corridor width $c$, such as 10% or 20%, the AVA is

> $$AVA_t = \min\big(\max(AVA_t^{*},\ (1-c)MV_t),\ (1+c)MV_t\big)$$

The corridor is applied to the smoothed value after the deferrals are removed, not to each year's gain. In a severe market fall it binds, and part of the deferred loss is recognized at once, so smoothing never hides more than a fraction $c$ of the fund's value.

> [!example]- What is this plan's actuarial value of assets? {Example}
> A plan smooths gains over five years with a corridor of 90% to 110% of market value, and assumes a 6% return. Last year's market value was $\$95{,}000{,}000$. Contributions of $\$3{,}000{,}000$ and benefits of $\$6{,}000{,}000$ were paid mid-year, and the market value is now $\$82{,}000{,}000$. The gains of the previous four years, newest first, were $\$4{,}000{,}000$, $\$3{,}000{,}000$, $-\$2{,}000{,}000$ and $\$5{,}000{,}000$.
>
> > [!answer]-
> > - Working in millions, the expected value is $95(1.06) + (3 - 6)(1.06)^{1/2} = 97.611$.
> > - The gain is $82 - 97.611 = -15.611$, a loss.
> > - The deferred amount is $0.8(-15.611) + 0.6(4) + 0.4(3) + 0.2(-2) + 0(5) = -9.289$.
> > - The smoothed value is $82 - (-9.289) = 91.289$.
> > - The corridor allows at most $1.10 \times 82 = 90.200$, so the AVA is $\$90{,}200{,}000$.
> > - The corridor forces $\$1{,}089{,}000$ of the deferred loss to be recognized now, and $\$8{,}200{,}000$ of loss remains to be recognized in later years.

## Other smoothing methods

An average of past market values adjusted for cash flows, or a write-up of the expected value toward market value by a fixed fraction each year, smooths in a similar way. Bonds can be held at amortized cost to match a liability valued at a book yield. Every smoothed method needs a test that it is unbiased, meaning it is not designed to stay above or below market value.

## Smoothing and cost stability

Contributions are the [[Normal Cost|normal cost]] plus an amortization of the unfunded liability, so a smoothed asset value spreads each investment gain over both the smoothing period and the amortization period. That lowers year-to-year contribution volatility, but a loss recognized later is a loss still owed. After a market fall the funded ratio on an AVA is higher than on market value, and reporting it as the plan's solvency position overstates the security of the benefits.

> [!example]- How much lower is this year's contribution on the smoothed value than on market value? {Example}
> The plan in the previous example has an actuarial accrued liability of $\$100{,}000{,}000$ and a normal cost of $\$4{,}000{,}000$. The unfunded liability is amortized over 10 years by payments at the start of each year at 6%.
>
> > [!answer]-
> > - The amortization factor is $\ddot{a}_{\overline{10}|6\%} = 7.80169$.
> > - On market value the unfunded liability is $100 - 82 = \$18{,}000{,}000$, so the contribution is $4{,}000{,}000 + 18{,}000{,}000/7.80169 = \$6{,}307{,}192$.
> > - On the AVA it is $100 - 90.2 = \$9{,}800{,}000$, so the contribution is $4{,}000{,}000 + 9{,}800{,}000/7.80169 = \$5{,}256{,}138$.
> > - Smoothing holds this year's contribution about $\$1{,}051{,}000$ lower.
> > - The $\$8{,}200{,}000$ still deferred will enter the unfunded liability over the next four years unless later gains offset it.

## Choosing a method by purpose

A [[Going-Concern Valuation|going-concern valuation]] may use a smoothed value. In the U.S. the minimum funding rules allow averaging over a period of up to 24 months within 90% to 110% of market value. A solvency or hypothetical wind-up valuation asks what the assets would settle the benefits for today, so market value is the natural basis, and regulators permit smoothing there only within limits they set. Accounting standards measure plan assets at fair value.

If the liability is valued at current market yields and the assets are smoothed, the funded ratio mixes two dates. Smoothing assets that hedge the liability, such as long bonds, breaks the hedge in the valuation even when it works in the market.
