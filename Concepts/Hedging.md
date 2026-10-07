---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ca36c0485b0c3d7e7f68f938a095d459a82ab04cd2870c00b313b7eaad53b397
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Hedging.md
---

**Hedging** is taking a position in one or more instruments whose value moves opposite to an existing exposure, so that the combined portfolio is insensitive to a chosen risk factor. A hedge is **static** if it is set once and held (for example, buying the matching put), or **dynamic** if it is rebalanced as sensitivities change ([[Delta Hedging|delta hedging]]); it is **perfect** only when the hedge instrument and the exposure move together exactly, otherwise **basis risk** remains.

> $$\frac{\partial}{\partial S}\Big(V + \sum_i n_i H_i\Big) = 0$$

> $$\frac{\partial^2}{\partial S^2}\Big(V + \sum_i n_i H_i\Big) = 0$$

> $$h^* = \rho\,\frac{\sigma_S}{\sigma_F}$$

- The first two blocks are **delta-neutral** and **gamma-neutral** conditions: $V$ is the exposure, $H_i$ the hedge instruments and $n_i$ the quantities held. Each condition needs its own instrument, and the underlying itself has zero gamma, so gamma is neutralized with options first and the delta is then fixed with the underlying; vega and rho neutrality are added the same way
- $h^*$ is the **minimum-variance hedge ratio** for hedging an exposure with futures: $\sigma_S$ and $\sigma_F$ are the standard deviations of the exposure's and the futures' returns and $\rho$ their [[Correlation|correlation]]; the hedge removes the fraction $\rho^2$ of the variance (the **hedge effectiveness**)
- An insurer hedging an embedded option in a liability (a variable annuity GMxB, an indexed annuity crediting) can hedge **equity, interest-rate and volatility** risk with traded instruments; [[Mortality|mortality]], policyholder behaviour, basis, counterparty and correlation risk can be hedged only partly or not at all
- Hedges fail when their assumptions fail: discrete rebalancing, jumps and gaps, realized [[Volatility|volatility]] above the hedge's, liquidity, [[Model Risk|model]] and [[Credit Risk|counterparty]] risk

> [!example]- Making a Guarantee Book Delta- and Gamma-Neutral {Example}
> An insurer has written maturity guarantees (puts) on variable annuity funds. Measured per unit of the equity index, its book has delta $+450$ and gamma $-30$. It can trade the index and a listed put on the index with delta $-0.45$ and gamma $0.04$. Find the hedge that makes the book delta- and gamma-neutral.
>
> > [!answer]-
> > Gamma first, since only the option carries gamma:
> > $$
> > \begin{align*}
> > -30 + 0.04\,n &= 0 \\
> > n &= 750 \text{ puts}
> > \end{align*}
> > $$
> > The puts add delta $750(-0.45) = -337.5$, leaving
> > $$
> > \begin{align*}
> > \Delta &= 450 - 337.5 \\
> >        &= 112.5
> > \end{align*}
> > $$
> > so the insurer **buys 750 puts and shorts 112.5 units of the index**. Fixing delta first and then adding the options would undo the delta hedge.

> [!example]- Minimum-Variance Hedge with Basis Risk {Example}
> A $\$50$ million variable annuity fund tracks a managed fund with return volatility $18\%$. The insurer hedges it with index futures whose returns have volatility $20\%$ and correlation $0.92$ with the fund. Each contract is $\$250$ times an index level of $5{,}000$. Find the number of contracts to short and the volatility left after hedging.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > h^* &= 0.92 \times \frac{0.18}{0.20} \\
> >     &= 0.828 \\
> > N^* &= \frac{0.828 \times 50{,}000{,}000}{250 \times 5{,}000} \\
> >     &= 33.12
> > \end{align*}
> > $$
> > Short about $33$ contracts. The hedge removes $\rho^2 = 84.64\%$ of the variance; the residual volatility is
> > $$
> > \begin{align*}
> > \sigma_{\text{resid}} &= 0.18\sqrt{1 - 0.92^2} \\
> >                      &= 0.0705
> > \end{align*}
> > $$
> > or about $\$3.53$ million on the fund. The $7.05\%$ that remains is basis risk, the part of the fund's return the index does not explain.

> [!tip]- How it appears on the exam
> - **INV-201** ("the Greeks of derivatives"; "static and dynamic hedging"): given the Greeks of a liability and of available instruments, find the positions that neutralize two or three of delta, gamma and vega, then evaluate what the hedge leaves exposed.
> - **INV-201** (hedging "embedded options in liabilities"): describe a hedge program for a GMxB, an indexed annuity or a RILA, separating hedgeable equity, rate and volatility risk from the partly hedgeable mortality, lapse, basis and counterparty risks, as a written answer.
> - **INV-201** ("how hedge strategies may fail"): diagnose a hedge program's losses from given hedge results (gaps, realized volatility, basis, model error).

> [!warning]- Exam traps
> - **Solving delta before gamma.** The underlying has no gamma but the options have delta; neutralize gamma with options, then rebalance delta with the underlying, or the delta hedge is broken by the option trade.
> - **Sign of the liability's Greeks.** An insurer *writing* a guarantee is short the option. A GMMB is a put, with negative delta, so the insurer's book has *positive* delta and negative gamma; hedging the put's own Greeks instead of the book's trades in the wrong direction and doubles the exposure.
> - **Treating the hedge ratio as the correlation or the volatility ratio alone.** $h^* = \rho\,\sigma_S/\sigma_F$; using $\rho$ or $\sigma_S/\sigma_F$ by itself over- or under-hedges.
> - **Claiming mortality or lapse risk is hedged by the equity hedge.** The hedge quantities assume expected survivorship and lapses; any experience different from that becomes unhedged P&L.
