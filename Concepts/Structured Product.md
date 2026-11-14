---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8369a858fcfa9209997f1b8c8ff865a5f2877815b893812f8460d2c61dadb1d1
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Structured Product.md
---
A **Structured Product** is a package of a fixed-income instrument and one or more options, sold as a single note or contract, whose payoff at maturity is a formula in the return of an index or other underlying. In insurance the same design appears as the structured-product, or registered index-linked, variable annuity, whose buffer or floor is a put spread the insurer has written.

Each piece is a European option on the price index, so the product's fair value is the sum of the pieces' [[Black-Scholes Model|Black-Scholes]] prices, plus the bond. The issuer sets the terms so that this sum, plus its margin, equals the amount invested. The index return excludes dividends, so the dividend yield is a cost to the holder and lowers the value of the calls.

Throughout, $C(k)$ and $P(k)$ are the prices of calls and puts on the index per \$1, struck at $k$ times its starting level, and $x = S_T/S_0$ is the index's price relative at maturity.

## Principal-protected note

A principal-protected note on principal $N$ for a term $T$ returns the principal plus a share $p$, the participation rate, of any rise in the index. The issuer buys a zero-coupon bond that grows to $N$ at maturity and spends what is left, after its fee, on at-the-money calls, so the note's value at issue is

> $$\text{PPN} = N\,e^{-rT} + p\,N\,C(1)$$

- $r$ is the continuously compounded risk-free rate.

Low rates make the bond dearer, and high volatility makes the call dearer, and either lowers the participation rate the note can offer. Hull treats the note as the first of the trading strategies built from options. The protection is only as good as the issuer's credit.

> [!example]- What participation rate can this five-year principal-protected note offer? {Example}
> A bank issues a five-year note on \$1,000 that returns the principal plus a share $p$ of any rise in an index, with no cap. The issuer keeps $1\%$ of the principal as its fee. Use $r = 0.04$, dividend yield $q = 0.02$ and $\sigma = 0.18$.
>
> > [!answer]-
> > - With $T = 5$, $\sigma\sqrt{T} = 0.402492$.
> > - $d_1 = (0.04 - 0.02 + 0.0162)(5)/0.402492 = 0.44970$, and $d_2 = 0.44970 - 0.402492 = 0.04721$.
> > - $C(1) = e^{-0.10}N(0.44970) - e^{-0.20}N(0.04721) = 0.904837(0.673536) - 0.818731(0.518825) = 0.184662$.
> > - The bond costs $e^{-0.20} = 0.818731$ of the principal, so after the $1\%$ fee $0.171269$ is left for calls.
> > - $p = 0.171269/0.184662 = 0.9275$, so the note can offer about $93\%$ participation.
> > - If rates fell to $2\%$, the bond would cost more and the call less, but the first effect dominates, so participation would fall to about $59\%$.

## Buffered note

With a buffer $b$, the issuer absorbs the first $b$ of any loss and the holder bears the rest, while the upside is capped at $C$. The payoff per \$1 is

> $$\Pi_{\text{buffer}} = 1 + \min\left(C,\ R^+\right) - (-b - R)^+$$

- $R = x - 1$ is the index's price return, and $R^+ = \max(R, 0)$.
- $C$ and $b$ are fractions of the starting index.

So a $25\%$ fall costs the holder $15\%$ under a $10\%$ buffer. As options, the holder owns a zero-coupon bond and an at-the-money call, and has sold a call at the cap and a put at $1 - b$, so the payoff is also

> $$\Pi_{\text{buffer}} = 1 + (x - 1)^+ - \big(x - (1 + C)\big)^+ - \big((1 - b) - x\big)^+$$

Equivalently, the holder holds the index with a put spread, long the at-the-money put and short the put at $1 - b$, and is short the call at the cap.

> [!example]- What is this one-year buffered segment worth per \$1 invested? {Example}
> A one-year segment credits the index's price return with a $15\%$ cap and a $10\%$ buffer. With $r = 0.04$, $q = 0.02$ and $\sigma = 0.18$, Black-Scholes gives these prices per \$1 of index:
>
> | Option | Price |
> | :--- | ---: |
> | $C(1)$ | 0.07973 |
> | $C(1.15)$ | 0.02831 |
> | $P(0.90)$ | 0.02377 |
>
> > [!answer]-
> > - The payoff is a zero-coupon bond, plus an at-the-money call, less a call at $1.15$ and a put at $0.90$.
> > - At $x = 1.25$ it is $1 + 0.25 - 0.10 - 0 = 1.15$, the cap. At $x = 0.95$ it is $1.00$, inside the buffer. At $x = 0.80$ it is $1 - 0.10 = 0.90$, the $20\%$ loss less the $10\%$ buffer.
> > - Its value is $e^{-0.04} + C(1) - C(1.15) - P(0.90) = 0.96079 + 0.07973 - 0.02831 - 0.02377 = 0.98845$.
> > - Each \$1 buys a package worth about \$0.988, leaving the insurer $1.16\%$ for expenses, capital and profit.
> > - The same terms are worth about \$0.998 with a $20\%$ cap and \$0.976 with a $10\%$ cap, so the cap is the lever the insurer resets when rates or volatility change.

## Floor

With a floor $f$, the holder's loss is limited to $f$ and the issuer bears everything beyond it. The holder owns the index and a put struck at $1 - f$, and has sold the call at the cap, so the payoff per \$1 is

> $$\Pi_{\text{floor}} = x + \big((1 - f) - x\big)^+ - \big(x - (1 + C)\big)^+$$

A buffer protects against small and moderate falls and leaves the holder exposed in a crash, while a floor protects against crashes and leaves the holder bearing the first losses.

## Registered index-linked annuities

A registered index-linked annuity (RILA) credits the account value with a buffered or floored index return each term, often one to six years, with caps or participation rates reset at renewal. Because the policyholder can lose principal it is registered as a security. Relative to a direct index investment, the insurer is short the at-the-money put and long the put at $1 - b$ under a buffer, and short the put at $1 - f$ under a floor. In both it is long the call at the cap. It hedges those positions and keeps a spread for expenses and profit. [[Indexed Annuity|Fixed indexed annuities]] are the special case with a full $0\%$ floor. The policyholder's sold put at $1 - b$ is what pays for a higher cap than a $0\%$-floor indexed annuity can offer.

> [!trap] Confusing a buffer with a floor
> Under a $10\%$ buffer a $25\%$ fall costs the holder $15\%$, while under a $10\%$ floor it costs $10\%$. Swapping them reverses who bears the crash risk, and the two decompose into different puts.
