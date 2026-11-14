---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:910b4f7535924444b7de342a3e3b734093e7ade6df91fb64bec2dc12d5165e24
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Embedded Option.md
---
An **Embedded Option** is a right written into a security, an insurance contract or a pension plan rather than traded on its own, which lets one party change the cash flows when doing so is in its interest. The party that granted the right is short the option, so its value has to be priced into the contract, held as a liability and, where possible, [[Hedging|hedged]].

The holder may be the issuer of a bond, the investor, a policyholder or a plan member. For a bond, the price with a call held by the issuer is

> $$P_{\text{callable}} = P_{\text{straight}} - C$$

and the price with a put held by the investor is

> $$P_{\text{putable}} = P_{\text{straight}} + P$$

- $P_{\text{straight}}$ is the value of the same bond with no option.
- $C$ is the value of the issuer's call.
- $P$ is the value of the investor's put.

## Embedded options in assets

A [[Callable Bond|callable bond]] gives the issuer a call, which it exercises when rates fall, so the investor's price is capped and the investor faces [[Reinvestment Risk|reinvestment risk]]. A putable bond gives the investor the right to sell back at par when rates rise. In a [[Mortgage-Backed Security|mortgage-backed security]] every borrower holds the option to prepay, which is the source of [[Prepayment Risk|prepayment risk]] and of the security's negative convexity.

Because the cash flows depend on rates, effective duration and convexity, found by repricing at shifted rates, replace the cash-flow measures. The bond's cash flows are projected along simulated interest rate paths, and its price is

> $$P_0 = \frac{1}{N}\sum_{n=1}^{N}\sum_{t} \frac{CF_{t,n}}{\prod_{k=1}^{t}\left(1 + r_{k,n} + \text{OAS}\right)}$$

- $P_0$ is the bond's market price.
- $CF_{t,n}$ is the cash flow at time $t$ on interest rate path $n$ of $N$.
- $r_{k,n}$ is the short rate in period $k$ on path $n$.
- $\text{OAS}$ is the option-adjusted spread, the spread that makes the model value equal the market price.

The OAS is the spread left after the option has been valued, the compensation for credit and liquidity rather than for the option. A callable bond's nominal spread is larger, so comparing its nominal spread with an option-free bond's spread overstates its value.

## Embedded options in insurance liabilities

An indexed annuity credits a share of an index's gain up to a cap, with a floor of zero. The rate credited for the period is

> $$c = \min\left(\text{cap},\ \max\left(0,\ p\,R\right)\right)$$

- $R$ is the index return for the period.
- $p$ is the participation rate.

With $p = 100\%$ this payoff is a call struck at the money less a call struck at the cap, a call spread the insurer has sold. The floor is not free. Its cost is paid through a lower cap, a lower participation rate or a fee on the fund, and when rates fall or volatility rises the call spread costs more and the insurer lowers the cap at renewal.

> [!example]- What does one year of this indexed annuity's crediting option cost per $\$1$ of premium? {Example}
> An indexed annuity credits 100% of the annual index return, capped at 6%, with a floor of 0%. Price it with [[Black-Scholes Model|Black-Scholes]] using illustrative inputs: risk-free rate 4%, index dividend yield 2% and volatility 18%.
>
> > [!answer]-
> > - Index returns of $+10\%$, $+3\%$ and $-8\%$ would be credited $6\%$, $3\%$ and $0\%$.
> > - The payoff is a call with strike $1.00$ less a call with strike $1.06$, on an index starting at $1$, for $T = 1$.
> > - For the strike $1.00$, $d_1 = 0.2011$ and $d_2 = 0.0211$, so $C(1.00) = 0.98020(0.57969) - 0.96079(0.50842) = 0.07973$.
> > - For the strike $1.06$, $d_1 = -0.1226$ and $d_2 = -0.3026$, so $C(1.06) = 0.98020(0.45121) - 1.06(0.96079)(0.38110) = 0.05415$.
> > - The option costs $0.07973 - 0.05415 = 0.02558$, about 2.56% of the premium each year, which the insurer funds from the yield on its bonds after expenses and profit.

The guarantees on [[Equity-Linked Insurance|variable annuities]] are options too. The [[Guaranteed Minimum Death Benefit|GMDB]], [[Guaranteed Minimum Maturity Benefit|GMMB]], [[Guaranteed Minimum Income Benefit|GMIB]] and [[Guaranteed Minimum Withdrawal Benefit|GMWB]] each pay at least $(G - F)^+$ in some form, where $G$ is the guaranteed amount and $F$ the fund value, so each is a put option on the fund. A registered index-linked annuity's buffer or floor shares index losses between the policyholder and the insurer. Minimum interest rates, guaranteed annuity rates and the right to [[Lapse|surrender]] at book value are options as well, and surrenders rise when rates rise.

## Embedded options in pension plans

A plan that lets members choose a lump sum computed on a fixed interest rate or mortality basis, retire early on subsidized reduction factors, choose among optional forms of payment, or switch between plan designs has granted options to its members. Each option costs the sponsor most when the member's choice is worth the most, and members choose with their own information about their health and plans.

> [!example]- What does this lump sum option cost the sponsor when market rates are 4%, 6% and 8%? {Example}
> A plan pays a retiring member $\$20{,}000$ a year at the start of each year for 20 years, or a lump sum computed at a fixed plan rate of 6%. Ignore mortality.
>
> > [!answer]-
> > - The lump sum is the annuity's value at 6%, $20{,}000\,\ddot{a}_{\overline{20}|6\%} = \$243{,}162.33$.
> > - At 4% the annuity is worth $20{,}000\,\ddot{a}_{\overline{20}|4\%} = \$282{,}678.79$, so the member keeps it and the option costs nothing.
> > - At 6% the two are equal, and the option costs nothing.
> > - At 8% the annuity is worth $20{,}000\,\ddot{a}_{\overline{20}|8\%} = \$212{,}071.98$, so the member takes the lump sum.
> > - The option then costs the sponsor $243{,}162.33 - 212{,}071.98 = \$31{,}090.35$. The sponsor has written a put on interest rates, and members in poor health add an anti-selection cost.

## Valuation and hedging

An option's value comes from [[Risk-Neutral Valuation|risk-neutral valuation]], with [[Black-Scholes Model|Black-Scholes]] formulas for simple equity options and simulation for path-dependent guarantees or interest rate options. For liabilities, exercise depends on policyholder or member behaviour, so the value rests on a lapse, utilization or election assumption as much as on market inputs. Policyholders and members do not exercise options as a pricing model would. Assuming optimal exercise overstates some costs, and assuming none understates them.

Equity, interest rate and volatility exposures can be hedged with traded futures, swaps and options, through [[Delta Hedging|delta]], rho and vega hedges. Policyholder behaviour, mortality, basis between the fund and the hedge instrument, counterparty and correlation risks can be hedged only partly or not at all, which is why a hedged guarantee still produces gains and losses.

> [!trap] Getting the holder of the option wrong
> A call on a bond belongs to the issuer and lowers the investor's price, while a put belongs to the investor and raises it. Getting the holder wrong reverses the sign of the adjustment to the straight bond's value.
