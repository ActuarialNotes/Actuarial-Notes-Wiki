---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:78e1a1585a0f8305bafa6be1e8b963672213d3f2a90281f9381ae18d5faabcde
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Embedded Option.md
---

An **embedded option** is a right written into a security, an insurance contract or a pension plan rather than traded on its own, which lets one party change the cash flows when doing so is in its interest. The holder may be the issuer of a bond, the investor, a policyholder or a plan member, and the party that granted the right is short the option, so its value has to be priced into the contract, held as a liability and, where possible, [[Hedging|hedged]].

> $$P_{\text{callable}} = P_{\text{straight}} - C$$

> $$P_{\text{putable}} = P_{\text{straight}} + P$$

> $$c = \min\left(\text{cap},\ \max\left(0,\ p\,R\right)\right)$$

> $$P_0 = \frac{1}{N}\sum_{n=1}^{N}\sum_{t} \frac{CF_{t,n}}{\prod_{k=1}^{t}\left(1 + r_{k,n} + \text{OAS}\right)}$$

- **Symbols:** $P_{\text{straight}}$ is the value of the same bond with no option, $C$ is the value of the issuer's call and $P$ the value of the investor's put. In the crediting formula, $c$ is the rate credited to an indexed annuity for the period, $R$ is the index return and $p$ the participation rate. In the last block $CF_{t,n}$ and $r_{k,n}$ are the cash flow at time $t$ and the short rate in period $k$ on interest rate path $n$ of $N$, and OAS is the option-adjusted spread that makes the model value equal the market price $P_0$.
- **In assets:** A [[Callable Bond|callable bond]] gives the issuer a call, which it exercises when rates fall, so the investor's price is capped and the investor faces [[Reinvestment Risk|reinvestment risk]]. A putable bond gives the investor the right to sell back at par when rates rise. In a mortgage-backed security every borrower holds the option to prepay, which is the source of [[Prepayment Risk|prepayment risk]] and of the security's negative convexity.
- **In insurance liabilities:** An indexed annuity credits a share of an index's gain up to a cap with a floor of zero, which is a call spread the insurer has sold. The guarantees on [[Equity-Linked Insurance|variable annuities]], the [[Guaranteed Minimum Death Benefit|GMDB]], [[Guaranteed Minimum Maturity Benefit|GMMB]], [[Guaranteed Minimum Income Benefit|GMIB]] and [[Guaranteed Minimum Withdrawal Benefit|GMWB]], each pay at least $(G - F)^+$ in some form and so are put options on the fund. A registered index-linked annuity's buffer or floor shares index losses between the policyholder and the insurer. Minimum interest rates, guaranteed annuity rates and the right to [[Lapse|surrender]] at book value are options too, and surrenders rise when rates rise.
- **In pension plans:** A plan that lets members choose a lump sum computed on a fixed interest rate or mortality basis, retire early on subsidized reduction factors, choose among optional forms of payment, or switch between plan designs has granted options to its members. Each option costs the sponsor most when the member's choice is worth the most, and members choose with their own information about health and plans.
- **Valuation:** An option's value comes from [[Risk-Neutral Valuation|risk-neutral valuation]], with [[Black-Scholes Model|Black-Scholes]] formulas for simple equity options and simulation for path-dependent guarantees or interest rate options. For bonds, the cash flows are projected along simulated rate paths and the OAS is the spread left after the option has been valued, the compensation for credit and liquidity rather than for the option.
- **Rates and behaviour:** Because the cash flows depend on rates, effective duration and convexity, found by repricing at shifted rates, replace the cash-flow measures. For liabilities, exercise depends on policyholder or member behaviour, so the value rests on a lapse, utilization or election assumption as much as on market inputs.
- **Hedging:** Equity, interest rate and volatility exposures can be hedged with traded futures, swaps and options, through [[Delta Hedging|delta]], rho and vega hedges. Policyholder behaviour, mortality, basis between the fund and the hedge instrument, counterparty and correlation risks can be hedged only partly or not at all, which is why a hedged guarantee still produces gains and losses.

> [!example]- The Crediting Option in an Indexed Annuity {Example}
> An indexed annuity credits $100\%$ of the annual index return, capped at $6\%$, with a floor of $0\%$. Find the credits in three years when the index returns $+10\%$, $+3\%$ and $-8\%$. Then price one year's crediting option per \$1 of premium with Black-Scholes, using illustrative inputs: risk-free rate $4\%$, index dividend yield $2\%$ and volatility $18\%$.
>
> > [!answer]-
> > The credits are $6\%$, $3\%$ and $0\%$. The payoff $\min(0.06, \max(0, R))$ equals a call struck at the money less a call struck $6\%$ out of the money, a call spread. With $S_0 = 1$, $T = 1$ and $\sigma^2/2 = 0.0162$:
> > $$
> > \begin{align*}
> > d_1(1.00) &= \frac{0 + 0.0362}{0.18} \\
> > &= 0.2011 \\
> > d_1(1.06) &= \frac{-0.05827 + 0.0362}{0.18} \\
> > &= -0.1226 \\
> > C(1.00) &= 0.98020(0.57969) - 0.96079(0.50842) \\
> > &= 0.07973 \\
> > C(1.06) &= 0.98020(0.45121) - 1.06(0.96079)(0.38110) \\
> > &= 0.05415 \\
> > \text{Option cost} &= 0.07973 - 0.05415 \\
> > &= 0.02558
> > \end{align*}
> > $$
> > Here $d_2 = d_1 - 0.18$, giving $0.0211$ and $-0.3026$. The insurer must fund about $2.56\%$ of the premium each year from the yield on its bonds, after expenses and profit. The cap is the lever: when rates fall or volatility rises, the call spread costs more and the insurer lowers the cap at renewal.

> [!example]- A Pension Lump Sum on a Fixed Rate {Example}
> A plan pays a retiring member \$20,000 a year at the start of each year for 20 years, or a lump sum computed at a fixed plan rate of $6\%$. Ignore mortality for simplicity. Find the cost of the lump sum option to the sponsor when market rates are $4\%$, $6\%$ and $8\%$.
>
> > [!answer]-
> > The lump sum is the annuity's value at $6\%$, and the member chooses whichever is worth more at the market rate.
> > $$
> > \begin{align*}
> > LS &= 20{,}000\,\ddot{a}_{\overline{20}|6\%} \\
> > &= 243{,}162.33 \\
> > A_{4\%} &= 20{,}000\,\ddot{a}_{\overline{20}|4\%} \\
> > &= 282{,}678.79 \\
> > A_{8\%} &= 20{,}000\,\ddot{a}_{\overline{20}|8\%} \\
> > &= 212{,}071.98
> > \end{align*}
> > $$
> > At $4\%$ the member keeps the annuity and the option costs nothing, and at $6\%$ the two are equal. At $8\%$ the member takes the lump sum, which costs the sponsor $243{,}162.33 - 212{,}071.98 = \$31{,}090.35$ more than the annuity's market value. The sponsor has written a put on interest rates, and members in poor health add an anti-selection cost, because they are the ones most likely to take the cash.

> [!tip]- How it appears on the exam
> - **INV-201:** The objectives ask candidates to identify and evaluate embedded options in indexed annuities, structured-product variable annuities and GMxB riders, and to explain how they are hedged. Expect to decompose a crediting formula or guarantee into options, to name which risks can be hedged and which can only be partly hedged, and to explain why a hedge program still shows gains and losses.
> - **RET-101:** The sponsor-risk objective lists embedded options among the plan options to assess, read in the SOA's 2011 catalogue and survey of embedded options in pension plans. Questions ask which plan features are options, who holds them, when they are exercised against the sponsor, and how the risk can be mitigated.

> [!warning]- Exam traps
> - **Who holds the option:** A call on a bond belongs to the issuer and lowers the investor's price, while a put belongs to the investor and raises it. Getting the holder wrong reverses the sign of the adjustment to the straight bond's value.
> - **Floors are not free:** An indexed annuity's zero floor and a GMMB's guarantee are options the insurer has sold, even if no separate fee is shown. Their cost is paid through a lower cap, a lower participation rate or a fee on the fund.
> - **OAS is after the option:** The option-adjusted spread is what remains after the option's cost is removed. A callable bond's nominal spread is larger, and comparing its nominal spread with an option-free bond's spread overstates its value.
> - **Behaviour is not rational exercise:** Policyholders and members do not exercise options as a pricing model would, so assuming optimal exercise overstates some costs and assuming none understates them. The assumption is a source of basis risk in the hedge.
