---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e125512830ad1db488ea5b4748907b4d098bebf044ce05bc868a8edbcb82c2d2
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Interest Rate Derivative.md
---
An **Interest Rate Derivative** is a [[Derivative Instrument|derivative]] whose payoff depends on the level of interest rates or on the price of an interest-rate-sensitive security. The main ones are swaps, futures, caps and floors, and swaptions. In [[Asset-Liability Management|asset-liability management]] they change the interest rate sensitivity of assets or surplus without buying or selling the underlying bonds.

## Interest rate swap

In an interest rate swap two parties exchange a fixed rate for a floating rate on the same notional $N$, and the notional itself is never paid. The value of a swap that receives the fixed rate $K$ is

> $$V_{\text{rec}} = N\,(K - S)\,A$$

- $S$ is the current par swap rate.
- $A$ is the annuity factor, the present value of receiving 1 per year on every fixed payment date.

The annuity factor is

> $$A = \sum_{i=1}^{n} \Delta_i\,Z(0, T_i)$$

- $\Delta_i$ is the length of period $i$ in years, 0.5 for semiannual payments.
- $Z(0, T_i)$ is the discount factor to the payment date $T_i$.

The par swap rate is

> $$S = \frac{1 - Z(0, T_n)}{A}$$

Receiving fixed is like holding a fixed-rate bond financed by issuing a floating-rate note, so a receive-fixed swap gains when rates fall. A par swap has zero value when it is entered, so an insurer can add duration through a swap without spending cash. The gain in value when rates fall by one basis point, the DV01, of a receive-fixed swap on a reset date is approximately

> $$\text{DV01}_{\text{rec}} \approx N\left(A - \Delta_1 Z(0, T_1)\right) \times 0.0001$$

The floating leg behaves like a bond that matures at the next reset date, which is why only its first period, $\Delta_1 Z(0, T_1)$, is subtracted. A position that gains when rates fall has a positive DV01.

Long-dated liabilities, such as pensions and payout annuities, often have a longer duration than the bonds available or affordable. Receive-fixed swaps add the missing duration on top of the bonds already held, which is the core technique of liability-driven investing.

> [!example]- What notional of 10-year receive-fixed swaps closes this insurer's surplus DV01 gap? {Example}
> An insurer holds assets of $\$5{,}000$ million with modified duration 5.0 and liabilities of $\$4{,}600$ million with modified duration 7.5. The swap curve is flat at 4%, with semiannual payments, and the insurer can enter 10-year receive-fixed par swaps on a reset date.
>
> > [!answer]-
> > - The DV01 of each side is its value times its duration times 0.0001: $\text{DV01}_A = 5{,}000(5.0)(0.0001) = 2.50$ and $\text{DV01}_L = 4{,}600(7.5)(0.0001) = 3.45$, in millions.
> > - The gap is $3.45 - 2.50 = 0.95$, so the surplus loses $\$0.95$ million for each basis point fall in rates.
> > - Each period's discount factor is $1.02^{-i}$, so $A = \sum_{i=1}^{20} 0.5(1.02)^{-i} = 8.1757$.
> > - Per $\$1$ million notional, $\text{DV01}_{\text{rec}} = 1{,}000{,}000\,(8.1757 - 0.5/1.02)(0.0001) = \$768.55$.
> > - The notional is $950{,}000/768.55 \times \$1$ million $= \$1{,}236$ million, about $\$1.24$ billion.
> > - The assets now behave as if their duration were $3.45/(5{,}000 \times 0.0001) = 6.9$, which matches the liabilities' dollar duration.

## Interest rate futures

Interest rate futures, such as Treasury bond futures, are exchange-traded contracts with gains and losses paid each day through [[Daily Settlement|daily settlement]]. The number of contracts that moves a portfolio's DV01 to a target is

> $$\frac{\text{DV01}_{\text{target}} - \text{DV01}_{\text{portfolio}}}{\text{DV01}_{\text{futures}}}$$

- $\text{DV01}_{\text{futures}}$ is the DV01 of one contract. For a Treasury future it is roughly the DV01 of the cheapest-to-deliver bond divided by its conversion factor.

## Caps and floors

For each period in which the floating rate $L$ is above the strike $K$, a cap pays

> $$N \Delta \max(L - K, 0)$$

and for each period in which it is below, a floor pays

> $$N \Delta \max(K - L, 0)$$

- $\Delta$ is the length of the period in years.

An insurer that guarantees a minimum crediting rate on [[Universal Life Insurance|universal life]] or annuity accounts loses when rates fall, so it can buy floors. One that faces surrenders when rates rise can buy caps.

## Swaptions

A [[Swaption|swaption]] is an option to enter a swap at a fixed rate on a future date. A receiver swaption, the right to receive fixed, pays off when rates fall below its strike. It hedges [[Embedded Option|embedded options]] that cost the insurer most in a low-rate world, such as guaranteed annuity rates and minimum interest guarantees. A payer swaption hedges the opposite risk, such as disintermediation when rates rise. At expiry, the rate difference is valued with the annuity factor at the swap rate then prevailing, not at the strike.

> [!example]- What does this receiver swaption pay at expiry if the 10-year swap rate is then 2.5%, or 4.5%? {Example}
> An insurer's guaranteed annuity rates become costly if long rates fall below about 3.5%. It buys a receiver swaption on $\$500$ million notional, with a strike of 3.5%, expiring in 5 years, on a 10-year swap with semiannual payments.
>
> > [!answer]-
> > - At 2.5% the insurer exercises and receives 3.5% on a swap worth 2.5%.
> > - The annuity factor at the new swap rate discounts each period at 1.25%, so $A = \sum_{i=1}^{20} 0.5(1.0125)^{-i} = 8.7997$.
> > - The payoff is $500 \times (0.035 - 0.025) \times 8.7997 = \$44.0$ million, available just as the cost of the guarantee rises.
> > - At 4.5% the market rate is above the strike, so the insurer lets the swaption expire and loses only the premium it paid.
> > - Unlike a receive-fixed swap, the swaption protects against falling rates while keeping the gain when rates rise.

## Counterparty and basis risk

An over-the-counter swap is exposed to the default of the other party. A credit support annex (CSA) to the ISDA master agreement requires the party that is losing to post collateral, usually cash or government bonds, and standardized swaps are now often cleared through a central counterparty ([[Central Clearing|central clearing]]). Collateral reduces credit risk but creates liquidity risk. A sharp rise in rates forces a receive-fixed swap holder to post cash quickly, as UK pension funds using leveraged liability-driven funds found in 2022.

A hedge is only as good as the match between the derivative's rate and the rate that values the liabilities. If the liabilities are discounted on a government or corporate curve while the swap moves with the swap curve, the gap between them, the swap spread, is left unhedged.

> [!trap] Receiving versus paying fixed
> A receive-fixed swap gains when rates fall, so it adds duration to the assets. Choosing a payer swap to hedge a liability that rises when rates fall doubles the exposure.
