---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a295a614b8fe95e63cbb7feb3fd202464452351f703adfbaca624595ddd168d2
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Hedging.md
---

**Hedging** is taking a position in one or more instruments whose value moves opposite to an existing exposure, so that the combined portfolio is insensitive to a chosen risk factor. A hedge is perfect only when the hedge instrument and the exposure move together exactly. Otherwise **basis risk** remains.

A hedge is **static** if it is set once and held, such as buying the matching put. It is **dynamic** if it is rebalanced as the exposure's sensitivities change, as in [[Delta Hedging|delta hedging]].

## Delta and gamma neutrality

An exposure of value $V$, hedged with $n_i$ units of each instrument $H_i$, is **delta-neutral** in the underlying price $S$ when

> $$\frac{\partial}{\partial S}\Big(V + \sum_i n_i H_i\Big) = 0$$

It is **gamma-neutral** when

> $$\frac{\partial^2}{\partial S^2}\Big(V + \sum_i n_i H_i\Big) = 0$$

Each condition needs its own instrument. The underlying has a delta of 1 and a gamma of 0, so gamma is neutralized with options first, and the delta that remains is then removed with a position in the underlying equal to minus that delta. A positive delta is hedged by shorting the underlying and a negative one by buying it. Vega and rho neutrality are added the same way, one instrument for each.

> [!example]- What hedge makes this guarantee book delta- and gamma-neutral? {Example}
> An insurer has written maturity guarantees (puts) on variable annuity funds. Measured per unit of the equity index, its book has delta $+450$ and gamma $-30$. It can trade the index and a listed put on the index with delta $-0.45$ and gamma $0.04$.
>
> > [!answer]-
> > - Only the put carries gamma, so it is solved first: $-30 + 0.04\,n = 0$ gives $n = 750$ puts.
> > - The puts add delta $750 \times (-0.45) = -337.5$, which leaves $450 - 337.5 = 112.5$.
> > - The index has delta 1, so the insurer shorts 112.5 units of it.
> > - The hedge is to buy 750 puts and short 112.5 units of the index. Fixing delta first and then adding the puts would undo the delta hedge.

## The minimum-variance hedge ratio

When an exposure is hedged with futures, the hedge ratio that minimizes the variance of the hedged position is

> $$h^* = \rho\,\frac{\sigma_S}{\sigma_F}$$

- $\sigma_S$ and $\sigma_F$ are the standard deviations of the exposure's and the futures' returns.
- $\rho$ is their [[Correlation|correlation]].

The hedge removes the fraction $\rho^2$ of the variance, which is the **hedge effectiveness**. What remains is basis risk.

> [!example]- How many futures contracts should this fund's hedge short, and how much volatility is left? {Example}
> A $\$50$ million variable annuity fund tracks a managed fund with return volatility $18\%$. The insurer hedges it with index futures whose returns have volatility $20\%$ and correlation $0.92$ with the fund. Each contract is $\$250$ times an index level of $5{,}000$.
>
> > [!answer]-
> > - The hedge ratio is $h^* = 0.92 \times 0.18/0.20 = 0.828$.
> > - Each contract is worth $250 \times 5{,}000 = \$1{,}250{,}000$, so the number of contracts is $0.828 \times 50{,}000{,}000 / 1{,}250{,}000 = 33.12$.
> > - The hedge removes $\rho^2 = 0.92^2 = 84.64\%$ of the variance.
> > - The residual volatility is $0.18\sqrt{1 - 0.8464} = 7.05\%$, about $\$3.53$ million on the fund.
> > - Short about 33 contracts. The $7.05\%$ that remains is basis risk, the part of the fund's return the index does not explain.

## Hedging embedded options in liabilities

An insurer hedging an [[Embedded Option|embedded option]] in a liability, such as a variable annuity guarantee or an indexed annuity's crediting, can hedge equity, interest-rate and volatility risk with traded instruments. [[Mortality|Mortality]], policyholder behaviour, basis, counterparty and correlation risk can be hedged only partly or not at all. The hedge quantities assume expected survivorship and lapses, so experience that differs from them becomes unhedged profit or loss.

Hedges fail when their assumptions fail. The usual causes are discrete rebalancing, jumps and gaps in the price, realized [[Volatility|volatility]] above the volatility the hedge assumed, illiquid instruments, [[Model Risk|model risk]] and [[Credit Risk|counterparty risk]].

> [!trap] Hedging the guarantee's Greeks instead of the book's
> An insurer that writes a guarantee is short the option. A maturity guarantee is a put with negative delta, so the insurer's book has positive delta and negative gamma. Hedging the put's own Greeks trades in the wrong direction and doubles the exposure.
