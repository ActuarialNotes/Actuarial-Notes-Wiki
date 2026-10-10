---
aliases:
  - Long-Tail Insurance Liability
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ee235ce724acf92124d6f12d4939e41a79c16177662677fac0add3dab775af1d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Long-Tail Liability.md
---
A **long-tail liability** is an insurance or pension obligation whose cash flows continue beyond the longest maturity of the bonds available to back it, usually taken as beyond about 30 years, such as a pension plan, a payout annuity, long-term care insurance or a long-dated guarantee. Because the bond market runs out before the liability does, the cash flows in the tail can't be matched, so the insurer bears reinvestment risk on them, along with long-horizon [[Inflation|inflation]] and [[Longevity Risk|longevity risk]], and may back them with assets other than fixed income.

> $$L = \sum_{t \le T^{*}} CF_t\,v^t + v^{T^{*}} \sum_{t > T^{*}} CF_t\,(1 + r)^{-(t - T^{*})}$$

> $$\Delta S \approx -\frac{\partial L}{\partial r}\,\Delta r$$

- **Symbols:** $CF_t$ is the liability cash flow at time $t$, $v^t$ the discount factor from bonds available today, and $T^{*}$ the longest maturity at which bonds can be bought. The tail, the cash flows after $T^{*}$, must be funded at time $T^{*}$ by reinvesting at a rate $r$ that is unknown today, so its value depends on an assumption. $\Delta S$ is the change in surplus when that assumed reinvestment rate changes, with the assets that back the first $T^{*}$ years unaffected.
- **The bond market runs out:** In most markets the longest liquid government and corporate bonds mature in about 30 years, while a pension promised to a young member, or an annuity on a 55-year-old, can pay for 50 years or more. An insurer can match the first part with bonds but must roll the tail forward, which leaves it exposed to the level of rates when it reinvests. Valuation standards limit this risk on paper by setting an ultimate reinvestment rate or extrapolating the [[Yield Curve|yield curve]] beyond its last liquid point, but the economic risk remains.
- **Reinvestment risk on the tail:** Because the tail is discounted twice, once at today's rates to $T^{*}$ and again at the future rate beyond it, a fall in long-run rates raises the value of the liability without any offsetting gain in the assets. [[Reinvestment Risk|Reinvestment risk]] on the tail is the main obstacle to [[Immunization|immunizing]] a long-tail liability, and a duration match built only from available bonds leaves it open.
- **Inflation:** Many long-tail liabilities, such as indexed pensions and long-term care benefits, grow with prices or wages. Inflation-linked bonds hedge part of this, but they are scarce and short of the longest maturities, and over 50 years even modest unexpected inflation compounds into a large cost.
- **Longevity:** The tail exists only because people live a long time, so the cash flows beyond 30 years are the ones most affected by improvements in mortality. Longevity risk and reinvestment risk compound: a longer life adds cash flows exactly where they are hardest to match.
- **The case for non-fixed-income assets:** Real estate, infrastructure, private equity and public equity have long or indefinite lives and cash flows that tend to rise with inflation, and they offer higher expected returns than long bonds. The SOA's research paper on backing long-term insurance liabilities with non-fixed-income assets argues that holding them against the tail can lower the cost of funding it and partly hedge inflation.
- **The costs of non-fixed-income assets:** These assets are volatile and their cash flows are uncertain, so they add surplus volatility. Regulators charge much more capital for them than for bonds, many are illiquid and valued by appraisal, and accounting may report their price swings in earnings. The insurer must judge whether the expected return outweighs the capital, volatility and liquidity costs over the tail's horizon.
- **Not the same as long-tail lines:** In property and casualty insurance, [[Long Tail Lines|long-tail lines]] are lines such as workers compensation and general liability, whose claims take years to be reported and settled. That is a reserving idea about the uncertainty of the ultimate loss, while a long-tail liability in ALM is about the length of a known or estimated cash flow stream compared with the assets available.

> [!example]- Surplus Sensitivity to the Reinvestment Rate on the Tail {Example}
> An insurer owes 100 at the end of each year for 60 years. Bonds are available to 30 years, and the yield curve is flat at 4%, so the first 30 payments and the amount needed at year 30 can both be funded today at 4%. The amount needed at year 30 depends on the rate $r$ at which the tail can then be funded. The insurer holds assets equal to the liability valued at $r = 4\%$. Find the liability at $r = 4\%$ and $r = 3\%$, and the change in surplus if the reinvestment rate turns out to be 3%.
>
> > [!answer]-
> > The first 30 payments are an annuity at 4%. The tail is an annuity at rate $r$ valued at year 30, then discounted to today at 4%.
> > $$
> > \begin{align*}
> > \text{Front} &= 100\,a_{\overline{30}|4\%} \\
> > &= 1{,}729.20 \\
> > \text{Tail}(4\%) &= 100\,a_{\overline{30}|4\%} \times 1.04^{-30} \\
> > &= 1{,}729.20 \times 0.30832 \\
> > &= 533.15 \\
> > \text{Tail}(3\%) &= 100\,a_{\overline{30}|3\%} \times 1.04^{-30} \\
> > &= 1{,}960.04 \times 0.30832 \\
> > &= 604.32
> > \end{align*}
> > $$
> > The liability is \$2,262.35 at 4% and \$2,333.52 at 3%. The assets were set equal to the first value and don't change when the future reinvestment rate does, so the surplus falls by \$71.17, or 3.1% of the liability. The tail is only 24% of the liability's present value, but it carries all of this sensitivity, and a further fall to 2% would raise the tail to 690.52.

> [!example]- Backing the Tail with Equities {Example}
> In the first example, the insurer must have 1,960.04 at year 30 to fund the tail if the reinvestment rate is then 3%. Instead of buying a 30-year zero-coupon bond, it considers equities with an expected return of 6.5% a year and volatility of 16%, modelled as lognormal. How much must it invest in equities so that the expected value at year 30 is 1,960.04, what is the probability of falling short with that amount, and how much would give a 75% chance of having enough?
>
> > [!answer]-
> > The amount that meets the target on average is the target discounted at 6.5%.
> > $$
> > \begin{align*}
> > X &= 1{,}960.04 \times 1.065^{-30} \\
> > &= 296.33
> > \end{align*}
> > $$
> > Under the lognormal model the log return over 30 years has mean $30\left[\ln 1.065 - \tfrac{1}{2}(0.16)^2\right] = 1.5052$ and standard deviation $0.16\sqrt{30} = 0.8764$.
> > $$
> > \begin{align*}
> > P(\text{shortfall}) &= \Phi\left(\frac{\ln(1{,}960.04 / 296.33) - 1.5052}{0.8764}\right) \\
> > &= \Phi(0.438) \\
> > &= 0.67
> > \end{align*}
> > $$
> > Investing 296.33 in equities, about half the 604.32 that bonds would need at 3%, leaves a 67% chance of falling short, because the median outcome is well below the mean. For a 75% chance of having enough, the investment must be $1{,}960.04 / e^{1.5052 - 0.6745(0.8764)} = 785.70$, more than the bond cost. The expected return is real, but the volatility, and the capital a regulator would require on top, make equities a costly way to remove tail risk unless the insurer can accept a high chance of a shortfall.

> [!tip]- How it appears on the exam
> - **CP-351, learning objective 2d:** Candidates evaluate the difficulties of investing for long-tail liabilities beyond 30 years, such as inflation and longevity, from the research paper on backing long-term insurance liabilities with non-fixed-income assets and the reading on ALM for life, annuities and pensions. Expect a written answer on reinvestment risk on the tail, inflation and longevity, and the case for and against non-fixed-income assets.
> - **Asset allocation:** Learning objective 3a asks candidates to develop and critique asset allocation strategies for long-tail insurance liabilities and pension plans. Questions may describe a block of payout annuities or a pension plan and ask how to back the tail and what capital, volatility and liquidity costs that brings.
> - **Supporting calculations:** A present value under different reinvestment rates, or the cost of backing the tail with a risky asset, often supports the written answer.

> [!warning]- Exam traps
> - **Confusing it with long-tail lines:** A long-tail line in property and casualty reserving is about slow claim reporting and settlement. Answering a CP-351 question about long-tail liabilities with development factors misses the investment problem entirely.
> - **Discounting the tail at today's rate alone:** Discounting cash flows beyond the last bond at today's curve treats the reinvestment rate as known. The tail's value depends on the future rate, so a valuation that ignores this understates the risk.
> - **Expected return is not certainty:** Funding the tail at an equity's expected return leaves a large chance of shortfall, because the median 30-year outcome is far below the mean. A recommendation for non-fixed-income assets must address volatility and capital, not just return.
> - **Inflation hedges are partial:** Real estate and infrastructure income tends to rise with inflation, but not one for one and not every year. Calling them a full inflation hedge for indexed pensions overstates their protection.
