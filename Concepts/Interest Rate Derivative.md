---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c3d3c6faccc707e39b734f1f345e6ed86b526502e337a4daeb95ad08c71b49cd
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Interest Rate Derivative.md
---

An **interest rate derivative** is a [[Derivative Instrument|derivative]] whose payoff depends on the level of interest rates or on the price of an interest-rate-sensitive security. The main ones are swaps, futures, caps and floors, and swaptions, and in [[Asset-Liability Management|asset-liability management]] they are used to change the interest rate sensitivity of assets or surplus without buying or selling the underlying bonds.

> $$V_{\text{rec}} = N\,(K - S)\,A$$

> $$A = \sum_{i=1}^{n} \Delta_i\,Z(0, T_i)$$

> $$S = \frac{1 - Z(0, T_n)}{A}$$

> $$\text{DV01}_{\text{rec}} \approx N\left(A - \Delta_1 Z(0, T_1)\right) \times 0.0001$$

- **Symbols:** For a swap on notional $N$, $K$ is the fixed rate the receiver gets, $S$ the current par swap rate and $A$ the annuity factor, the present value of receiving 1 per year on every fixed payment date. $\Delta_i$ is the length of period $i$ in years (0.5 for semiannual payments) and $Z(0, T_i)$ the discount factor to its payment date $T_i$. DV01 is the gain in value when rates fall by one basis point, so a position that gains when rates fall has a positive DV01.
- **Interest rate swap:** The two parties exchange a fixed rate for a floating rate on the same notional, and the notional itself is never paid. Receiving fixed is like holding a fixed-rate bond financed by issuing a floating-rate note, so a receive-fixed swap gains when rates fall. The floating leg behaves like a bond that matures at the next reset date, which is why only its first period, $\Delta_1 Z(0, T_1)$, is subtracted in the DV01. A par swap has zero value when it is entered, so an insurer can add duration through a swap without spending cash.
- **Futures:** Interest rate futures, such as Treasury bond futures, are exchange-traded contracts with gains and losses paid each day through [[Daily Settlement|daily settlement]]. To move a portfolio's DV01 to a target, the number of contracts is $(\text{DV01}_{\text{target}} - \text{DV01}_{\text{portfolio}}) / \text{DV01}_{\text{futures}}$, where a Treasury future's DV01 is roughly that of the cheapest-to-deliver bond divided by its conversion factor.
- **Caps and floors:** A cap pays $N \Delta \max(L - K, 0)$ for each period in which the floating rate $L$ is above the strike $K$, and a floor pays $N \Delta \max(K - L, 0)$ when it is below. An insurer that guarantees a minimum crediting rate on [[Universal Life Insurance|universal life]] or annuity accounts loses when rates fall, so it can buy floors. One that faces surrenders when rates rise can buy caps.
- **Swaptions:** A [[Swaption|swaption]] is an option to enter a swap at a fixed rate on a future date. A receiver swaption, the right to receive fixed, pays off when rates fall below its strike, so it hedges [[Embedded Option|embedded options]] that cost the insurer most in a low-rate world, such as guaranteed annuity rates and minimum interest guarantees. A payer swaption hedges the opposite risk, such as disintermediation when rates rise.
- **Extending asset duration:** Long-dated liabilities, such as pensions and payout annuities, often have a longer duration than the bonds available or affordable. Receive-fixed swaps add the missing duration on top of the bonds already held, which is the core technique of liability-driven investing.
- **Counterparty risk and collateral:** An over-the-counter swap is exposed to the default of the other party. A credit support annex (CSA) to the ISDA master agreement requires the party that is losing to post collateral, usually cash or government bonds, and standardized swaps are now often cleared through a central counterparty ([[Central Clearing|central clearing]]). Collateral reduces credit risk but creates liquidity risk: a sharp rise in rates forces a receive-fixed swap holder to post cash quickly, as UK pension funds using leveraged liability-driven funds found in 2022.
- **Basis risk:** A hedge is only as good as the match between the derivative's rate and the rate that values the liabilities. If liabilities are discounted on a government or corporate curve while the swap moves with the swap curve, the gap between them, the swap spread, is left unhedged.

> [!example]- Closing a Surplus DV01 Gap with Receive-Fixed Swaps {Example}
> An insurer holds assets of \$5,000 million with modified duration 5.0 and liabilities of \$4,600 million with modified duration 7.5. The swap curve is flat at 4%, with semiannual payments, and the insurer can enter 10-year receive-fixed par swaps on a reset date. Find the surplus DV01 gap, the DV01 of the swap per \$1 million notional, the notional needed to close the gap, and the effective asset duration after the swaps.
>
> > [!answer]-
> > The DV01 of each side is its value times its duration times 0.0001.
> > $$
> > \begin{align*}
> > \text{DV01}_A &= 5{,}000(5.0)(0.0001) \\
> > &= 2.50 \\
> > \text{DV01}_L &= 4{,}600(7.5)(0.0001) \\
> > &= 3.45 \\
> > \text{Gap} &= 3.45 - 2.50 \\
> > &= 0.95
> > \end{align*}
> > $$
> > The surplus loses \$0.95 million for each basis point fall in rates. On a flat 4% semiannual curve, each period's discount factor is $1.02^{-i}$.
> > $$
> > \begin{align*}
> > A &= \sum_{i=1}^{20} 0.5(1.02)^{-i} \\
> > &= 8.1757 \\
> > \text{DV01}_{\text{rec}} &= 1{,}000{,}000\left(8.1757 - \tfrac{0.5}{1.02}\right)(0.0001) \\
> > &= 768.55 \\
> > N &= \frac{950{,}000}{768.55} \times 1{,}000{,}000 \\
> > &= 1{,}236 \text{ million}
> > \end{align*}
> > $$
> > Receiving fixed on about \$1.24 billion notional closes the gap. The swaps cost nothing to enter, and the assets now behave as if their duration were $3.45 / (5{,}000 \times 0.0001) = 6.9$, the duration that matches the liabilities' dollar duration. The insurer now has to post collateral if rates rise, and it carries swap spread risk if the liabilities are not discounted on the swap curve.

> [!example]- A Receiver Swaption Hedging a Rate Guarantee {Example}
> An insurer has written deferred annuities whose guaranteed annuity rates become costly if long rates fall below about 3.5%. It buys a receiver swaption on \$500 million notional, with a strike of 3.5%, expiring in 5 years, on a 10-year swap with semiannual payments. Find the swaption's payoff at expiry if the 10-year swap rate is then (a) 2.5% and (b) 4.5%.
>
> > [!answer]-
> > In case (a) the insurer exercises and receives 3.5% on a swap worth 2.5%. The annuity factor is valued at the new swap rate, so each period is discounted at 1.25%.
> > $$
> > \begin{align*}
> > A(2.5\%) &= \sum_{i=1}^{20} 0.5(1.0125)^{-i} \\
> > &= 8.7997 \\
> > \text{Payoff} &= 500 \times (0.035 - 0.025) \times 8.7997 \\
> > &= 44.0 \text{ million}
> > \end{align*}
> > $$
> > The payoff is \$44.0 million, which is available just as the cost of the guarantee rises. In case (b) the market rate is above the strike, so the insurer lets the swaption expire and loses only the premium it paid. Unlike a receive-fixed swap, the swaption protects against falling rates while keeping the gain when rates rise, which suits a guarantee that only bites in one direction.

> [!tip]- How it appears on the exam
> - **CP-351, learning objective 3f:** Candidates understand interest rate derivatives and use them to mitigate interest rate risk, from Veronesi's chapters on forwards, swaps, futures and options and the reading on ALM for life, annuities and pensions. Expect to value a swap, compute its DV01 and find the notional or number of futures contracts that closes a duration or DV01 gap.
> - **Choosing the instrument:** Questions describe a liability, such as a minimum crediting rate, a guaranteed annuity option or a pension plan's long liabilities, and ask which derivative hedges it and why, with the trade-offs of cost, collateral and basis risk.
> - **Links to other objectives:** The derivatives serve the interest rate risk objective 3b and the market risk objective 3e, so a hedging calculation often follows a duration or key rate duration measurement.

> [!warning]- Exam traps
> - **Receive versus pay:** A receive-fixed swap gains when rates fall, so it adds duration to the assets. Choosing a payer swap to hedge a liability that rises when rates fall doubles the exposure.
> - **The floating leg's DV01:** On a reset date, the floating leg has the DV01 of a bond that matures at the next reset. Ignoring it overstates the swap's DV01 slightly, which matters for the notional on a large hedge.
> - **Annuity factor at the right rate:** A swaption's payoff at expiry discounts the rate difference at the swap rate then prevailing, not at the strike. Using the strike's annuity factor gives the wrong payoff.
> - **Zero value is not zero risk:** A par swap costs nothing to enter, but it carries a large DV01 and requires collateral as rates move. Treating it as a free hedge ignores the liquidity needed to meet collateral calls.
> - **Swaps hedge rates, not spreads:** If the liabilities are discounted with a credit spread or on a government curve, a swap leaves the spread or swap spread unhedged. The surplus can still move when those spreads change.
