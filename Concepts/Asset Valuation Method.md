---
aliases:
  - Asset Valuation
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:da2adb944c0507ad1bb06a3385de6da3376c455530d82a95897fd7f0eb7d521a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Asset Valuation Method.md
---
An **Asset Valuation Method** is the rule a pension actuary uses to set the value of a plan's assets for a [[Valuation|valuation]]. The value is either the [[Market Value|market value]] or an actuarial value of assets (AVA) that smooths market value by recognizing investment gains and losses gradually, usually kept within a corridor around market value. Smoothing makes contributions more stable, at the cost of recognizing the fund's true position later.

> $$E_t = MV_{t-1}(1+i) + (C_t - B_t)(1+i)^{1/2}$$

> $$G_t = MV_t - E_t$$

> $$AVA_t^{*} = MV_t - \sum_{k=0}^{n-1}\frac{n-1-k}{n}\,G_{t-k}$$

> $$AVA_t = \min\big(\max(AVA_t^{*},\ (1-c)MV_t),\ (1+c)MV_t\big)$$

- **Symbols:** $MV_t$ is the market value at the valuation date and $E_t$ is the value expected from last year's market value, the year's contributions $C_t$ and benefits $B_t$ (paid mid-year here) and the assumed return $i$. $G_t$ is the investment gain (a loss when negative), $n$ is the smoothing period, and the sum is the part of the last $n$ years' gains not yet recognized. $c$ is the corridor width, such as 10% or 20%.
- **Deferred-gain smoothing:** Each year's gain is recognized one $n$th at a time, so the current year's gain is $(n-1)/n$ deferred and a gain $n-1$ years old is fully recognized. Because the method starts from market value and removes only the deferred amounts, the AVA cannot drift away from market value permanently.
- **The corridor:** The corridor caps how far the AVA can be from market value. In a severe market fall the corridor binds, and part of the deferred loss is recognized at once, so smoothing never hides more than a fraction $c$ of the fund's value.
- **Other methods:** An average of past market values adjusted for cash flows, or a write-up of the expected value toward market value by a fixed fraction each year, smooths in a similar way. Bonds can be held at amortized cost to match a liability valued at a book yield. Every smoothed method needs a test that it is unbiased, meaning it is not designed to stay above or below market value.
- **Cost stability:** Contributions are the [[Normal Cost|normal cost]] plus an amortization of the unfunded liability, so a smoothed asset value spreads each investment gain over both the smoothing period and the amortization period. That lowers year-to-year contribution volatility, but a loss recognized later is a loss still owed, and the funded ratio on an AVA overstates security after a fall.
- **Purpose decides the method:** A [[Going-Concern Valuation|going-concern valuation]] may use a smoothed value, and in the U.S. the minimum funding rules allow averaging over a period of up to 24 months within 90% to 110% of market value. A solvency or hypothetical wind-up valuation asks what the assets would settle the benefits for today, so market value is the natural basis, and regulators permit smoothing there only within limits they set. Accounting standards measure plan assets at fair value.
- **Consistency with the liability:** If the liability is valued at current market yields and the assets are smoothed, the funded ratio mixes two dates. Smoothing assets that hedge the liability, such as long bonds, breaks the hedge in the valuation even when it works in the market.

> [!example]- Five-Year Smoothing With a 10% Corridor {Example}
> A plan smooths gains over five years with a corridor of 90% to 110% of market value, and assumes a 6% return. Last year's market value was \$95,000,000, contributions of \$3,000,000 and benefits of \$6,000,000 were paid mid-year, and the market value is now \$82,000,000. In the previous four years, newest first, the plan had gains of \$4,000,000 and \$3,000,000, a loss of \$2,000,000 and a gain of \$5,000,000. Find the actuarial value of assets.
>
> > [!answer]-
> > Working in millions:
> > $$
> > \begin{align*}
> > E_t &= 95(1.06) + (3 - 6)(1.06)^{1/2} \\
> > &= 97.611 \\
> > G_t &= 82 - 97.611 \\
> > &= -15.611 \\
> > \text{Deferred} &= 0.8(-15.611) + 0.6(4) + 0.4(3) + 0.2(-2) + 0(5) \\
> > &= -9.289 \\
> > AVA_t^{*} &= 82 - (-9.289) \\
> > &= 91.289
> > \end{align*}
> > $$
> > The corridor allows at most $1.10 \times 82 = 90.200$, so the AVA is \$90,200,000. The corridor forces \$1,089,000 of the deferred loss to be recognized now, and \$8,200,000 of loss remains to be recognized in later years.

> [!example]- What Smoothing Does to the Contribution {Example}
> The plan in the previous example has an actuarial accrued liability of \$100,000,000 and a normal cost of \$4,000,000. The unfunded liability is amortized over 10 years by payments at the start of each year at 6%. Compare this year's contribution on market value and on the smoothed value.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \ddot{a}_{\overline{10}|6\%} &= 7.80169 \\
> > C_{MV} &= 4{,}000{,}000 + \frac{18{,}000{,}000}{7.80169} \\
> > &= 6{,}307{,}192 \\
> > C_{AVA} &= 4{,}000{,}000 + \frac{9{,}800{,}000}{7.80169} \\
> > &= 5{,}256{,}138
> > \end{align*}
> > $$
> > Smoothing holds this year's contribution about \$1,051,000 lower. The \$8,200,000 still deferred will enter the unfunded liability over the next four years unless later gains offset it, so the sponsor trades a sharp increase now for a gradual one.

> [!tip]- How it appears on the exam
> - **RET-201:** Candidates analyze and communicate the effect of different asset valuation methods on cost stability. Typical questions compute an AVA under a smoothing method with a corridor, then compare contributions or funded ratios on market and smoothed values and explain the trade-off to a sponsor.
> - **RET-301:** Candidates analyze asset valuation methods appropriate for Canadian regulatory purposes, which means judging which methods suit a going-concern valuation and which a solvency or hypothetical wind-up valuation, and whether a method is consistent with how the liability is measured.

> [!warning]- Exam traps
> - **Deferral fractions:** With five-year smoothing the current year's gain is four-fifths deferred, not all of it. Deferring the full current gain, or recognizing a five-year-old gain only partly, gets every fraction wrong by one year.
> - **Corridor last:** The corridor is applied to the smoothed value after the deferrals are removed. Applying it to market value alone, or to each year's gain, gives a different number.
> - **Expected value timing:** The expected value credits interest on mid-year cash flows for half a year. Ignoring the cash flows, or crediting a full year on them, puts part of the cash flow into the gain.
> - **Smoothed funded ratio:** After a market fall the funded ratio on a smoothed value is higher than on market value. Reporting it as the plan's solvency position overstates the security of the benefits.
