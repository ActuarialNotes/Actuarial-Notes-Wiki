---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a3a423415c3776de18ce98883e3bf234ec919d426fb2a1fb0b2b7e34aa0d7ad7
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Structured Product.md
---

A **structured product** is a package of a fixed-income instrument and one or more options, sold as a single note or contract, whose payoff at maturity is a formula in the return of an index or other underlying. The classic forms are the principal-protected note (a zero-coupon bond plus a call) and the buffered note (the index with its downside partly absorbed and its upside capped). In insurance the same design appears as the structured-product, or registered index-linked, variable annuity, whose buffer or floor is a put spread the insurer has written.

> $$\text{PPN} = N\,e^{-rT} + p\,N\,C(1)$$

> $$\Pi_{\text{buffer}} = 1 + \min\left(C,\ R^+\right) - (-b - R)^+$$

> $$\Pi_{\text{buffer}} = 1 + (x - 1)^+ - \big(x - (1 + C)\big)^+ - \big((1 - b) - x\big)^+$$

> $$\Pi_{\text{floor}} = x + \big((1 - f) - x\big)^+ - \big(x - (1 + C)\big)^+$$

- **Symbols:** $N$ is the note's principal, $r$ the continuously compounded risk-free rate, $T$ the term and $p$ the participation rate. $C(k)$ and $P(k)$ are the prices of calls and puts on the index per \$1, struck at $k$ times its starting level. $x = S_T/S_0$ is the index's price relative at maturity and $R = x - 1$ its price return, with $R^+ = \max(R, 0)$. $C$ is the cap, $b$ the buffer and $f$ the floor, each as a fraction of the starting index.
- **Principal-protected note:** The issuer buys a zero-coupon bond that grows to $N$ at maturity and spends what is left, after its fee, on at-the-money calls. Low rates make the bond dearer, and high volatility makes the call dearer, and either lowers the participation rate the note can offer. Hull treats it as the first of the trading strategies built from options. The protection is only as good as the issuer's credit.
- **Buffer:** With a buffer of $b$, the issuer absorbs the first $b$ of any loss and the holder bears the rest, so a $25\%$ fall costs the holder $15\%$ under a $10\%$ buffer. As options, the holder owns a zero-coupon bond and an at-the-money call, and has sold a call at the cap and a put at $1 - b$. Equivalently, it holds the index with a put spread, long the at-the-money put and short the put at $1 - b$, and is short the call at the cap.
- **Floor:** With a floor of $f$, the holder's loss is limited to $f$ and the issuer bears everything beyond it, so the holder owns the index, a put struck at $1 - f$, and has sold the call at the cap. A buffer protects against small and moderate falls and leaves the holder exposed in a crash, while a floor protects against crashes and leaves the holder bearing the first losses. The holder chooses which tail to give up.
- **Registered index-linked annuities:** A RILA credits the account value with a buffered or floored index return each term, often one to six years, with caps or participation rates reset at renewal. Because the policyholder can lose principal it is registered as a security. Relative to a direct index investment, the insurer under a buffer is short the at-the-money put and long the put at $1 - b$, under a floor it is short the put at $1 - f$, and in both it is long the call at the cap. It hedges those positions and keeps a spread for expenses and profit. [[Indexed Annuity|Fixed indexed annuities]] are the special case with a full $0\%$ floor.
- **Valuation:** Each piece is a European option on the price index, so the product's fair value is the sum of the pieces' [[Black-Scholes Model|Black-Scholes]] prices, plus the bond. The issuer sets the cap so that this sum, plus its margin, equals the amount invested. The index return excludes dividends, so the dividend yield is a cost to the holder and lowers the value of the calls.

> [!example]- A 10% Buffer and a 15% Cap, Valued as Options {Example}
> A one-year RILA segment credits the index's price return with a $15\%$ cap and a $10\%$ buffer. With $r = 0.04$, dividend yield $q = 0.02$ and $\sigma = 0.18$, Black-Scholes gives these prices per \$1 of index: $C(1) = 0.07973$, $C(1.15) = 0.02831$ and $P(0.90) = 0.02377$. Decompose the payoff into options, check it at index returns of $+25\%$, $-5\%$ and $-20\%$, and value the segment per \$1 invested.
>
> > [!answer]-
> > The payoff is a zero-coupon bond, plus an at-the-money call, less a call at $1.15$ and a put at $0.90$. At $x = 1.25$ it is $1 + 0.25 - 0.10 - 0 = 1.15$, the cap. At $x = 0.95$ it is $1 + 0 - 0 - 0 = 1.00$, inside the buffer. At $x = 0.80$ it is $1 + 0 - 0 - 0.10 = 0.90$, the $20\%$ loss less the $10\%$ buffer.
> > $$
> > \begin{align*}
> > V &= e^{-0.04} + C(1) - C(1.15) - P(0.90) \\
> > &= 0.96079 + 0.07973 - 0.02831 - 0.02377 \\
> > &= 0.98845
> > \end{align*}
> > $$
> > Each \$1 buys a package worth about \$0.988, leaving the insurer $1.16\%$ for expenses, capital and profit. The same terms cost about \$0.998 with a $20\%$ cap and \$0.976 with a $10\%$ cap, so the cap is the lever the insurer resets when rates or volatility change. The policyholder's sold put at $0.90$ is what pays for the higher cap than a $0\%$-floor indexed annuity can offer.

> [!example]- Participation in a Five-Year Principal-Protected Note {Example}
> A bank issues a five-year note on \$1,000 that returns the principal plus a share $p$ of any rise in an index, with no cap. The issuer keeps $1\%$ of the principal as its fee. Using $r = 0.04$, $q = 0.02$ and $\sigma = 0.18$, price the five-year at-the-money call and find the participation rate.
>
> > [!answer]-
> > With $T = 5$, $\sigma\sqrt{T} = 0.402492$.
> > $$
> > \begin{align*}
> > d_1 &= \frac{(0.04 - 0.02 + 0.0162)(5)}{0.402492} \\
> > &= 0.44970 \\
> > d_2 &= 0.44970 - 0.402492 \\
> > &= 0.04721 \\
> > C(1) &= e^{-0.10}N(0.44970) - e^{-0.20}N(0.04721) \\
> > &= 0.904837(0.673536) - 0.818731(0.518825) \\
> > &= 0.184662
> > \end{align*}
> > $$
> > The bond costs $e^{-0.20} = 0.818731$ of the principal, and after the $1\%$ fee $0.171269$ is left for calls.
> > $$
> > \begin{align*}
> > p &= \frac{0.171269}{0.184662} \\
> > &= 0.9275
> > \end{align*}
> > $$
> > The note can offer about $93\%$ participation. If rates fell to $2\%$, the bond would cost more and the call less, but the first effect dominates, so participation would fall to about $59\%$, which is why such notes are hard to sell when rates are low.

> [!tip]- How it appears on the exam
> - **INV-201:** The objective asks candidates to "identify and evaluate embedded options in liabilities", naming the structured-product based variable annuity, read in the SOA's introduction to registered index-linked annuities. Expect to decompose a buffer or floor design into a bond and options, value it with Black-Scholes, and say which positions the insurer must hedge.
> - **Design questions:** Questions give a buffer or floor and ask for the cap the insurer can afford, or compare the two designs' payoffs at several index returns and explain who bears which tail.
> - **Market strategies:** The trading-strategy readings in Hull include the principal-protected note, so a question may ask for the participation rate a note can offer, as in the second example, and how it moves with rates and volatility.

> [!warning]- Exam traps
> - **Buffer versus floor:** Under a $10\%$ buffer a $25\%$ fall costs the holder $15\%$, while under a $10\%$ floor it costs $10\%$. Swapping them reverses who bears the crash risk, and the two decompose into different puts.
> - **Long or short the put:** Relative to holding the index, a buffer holder owns the at-the-money put and has sold the put at $1 - b$. The insurer writing a buffer is short the at-the-money put and long the put at $1 - b$, and it is the net put spread that matters, not either put alone.
> - **Dividends:** The product credits the price return, so the call is priced with the dividend yield. Valuing it on total return overstates the upside the holder receives.
> - **Credit risk:** A principal-protected note guarantees principal only if the issuer pays. Valuing the bond at the risk-free rate ignores the issuer's credit spread, which a RILA's insurer guarantee and a bank note's issuer both carry.
