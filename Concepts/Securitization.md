---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:744f446c75eddd29b8afc6c591adcf592609105a8f0e61f3f37764ca3fb184e5
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Securitization.md
---

**Securitization** is the transfer of a pool of assets — or of a defined block of insurance risk — to a bankruptcy-remote **special purpose vehicle** (SPV) that funds itself by issuing securities to capital-market investors, who are paid only from what the pool produces. In insurance it is how [[Catastrophe Risk|catastrophe risk]] moves from insurers' balance sheets to investors, through [[CAT Bonds|cat bonds]] and other [[Insurance-Linked Securities|insurance-linked securities]].

> $$\sum_{j} \text{CF}_j = \text{CF}_{\text{pool}} - \text{Fees}$$

- $\text{CF}_j$ is the cash flow to the $j$-th class of security. Whether the classes are pro-rata (a *pass-through*) or prioritised tranches ([[Structured Finance]]), investors collectively receive exactly what the pool produces: securitization repackages risk and return, it does not create them.
- **The originator gains** funding and liquidity, capital relief (the assets or risk leave its balance sheet) and a transfer of risk to parties who can hold it more cheaply. **Investors gain** exposures cut to the risk level they want and, for insurance risk, returns largely uncorrelated with the rest of their portfolio.
- **Its weak points are incentives and correlation.** An originator that sells everything it makes has little reason to underwrite carefully ([[Moral Hazard|moral hazard]]) and every reason to sell its worst assets ([[Adverse Selection|adverse selection]]); after [[Dodd-Frank]], U.S. securitizers must generally retain at least $5\%$ of the credit risk. Correlated defaults defeat the diversification the ratings assumed, and mortgage pools add [[Prepayment Risk|prepayment risk]].
- **Why securitize catastrophe risk** (Cummins): a mega-catastrophe is large relative to reinsurers' capital but small relative to capital markets — a \$100 billion loss is well under $1\%$ of the value of U.S. stocks and bonds. Catastrophe losses are nearly uncorrelated with financial markets, so investors earn a diversifier. The securities are **fully collateralised**, removing the [[Reinsurance Credit Risk|reinsurer credit risk]] that is worst exactly when a catastrophe strikes. And multi-year terms lock in price through the reinsurance cycle.
- **What it costs:** higher fixed set-up costs (legal, modelling, rating, the SPV), disclosure of the sponsor's exposure, and — unless the trigger is the sponsor's own losses — **basis risk**, which can also cost the contract its treatment as reinsurance. Cummins's view is that securitization complements [[Reinsurance|reinsurance]] rather than replacing it.

> [!example]- Reinsurer Promise vs. Collateral in the 1-in-100 Year {Example}
> An insurer needs $\$100$ million of protection on a layer that is fully used with probability $1\%$ a year and untouched otherwise. Option A is a traditional reinsurer whose default probability is $0.5\%$ in an ordinary year but $8\%$ *given* the industry catastrophe that exhausts the layer. Option B is a fully collateralised cat bond. Compare expected recoveries.
>
> > [!answer]-
> > The expected loss to the layer is $0.01 \times \$100\text{M} = \$1.00\text{M}$.
> >
> > $$
> > \begin{align*}
> > E[\text{Recovery}_A] &= 0.01 \times \$100\text{M} \times (1 - 0.08) \\
> > &= \$0.92\text{M} \\[4pt]
> > \text{Credit shortfall}_A &= \$1.00\text{M} - \$0.92\text{M} \\
> > &= \$0.08\text{M}
> > \end{align*}
> > $$
> >
> > Using the ordinary-year default rate, the shortfall would have been estimated at $0.01 \times \$100\text{M} \times 0.005 = \$0.005\text{M}$ — the correlation between the catastrophe and the reinsurer's failure makes it **16 times** larger.
> >
> > Option B's recovery is the full $\$1.00\text{M}$: the principal sits in a collateral trust, so there is no counterparty to fail — provided the collateral itself is safe, which 2008 tested when Lehman Brothers' failure as swap counterparty impaired several cat bonds. That is part of what the insurer buys with the cat bond's higher cost.

> [!example]- Risk Retention: Vertical Slice vs. First-Loss Piece {Example}
> An originator securitizes a $\$500$ million pool of auto loans and retains $5\%$ ($\$25$ million). Expected pool losses are $2\%$ ($\$10$ million). Lax underwriting would raise them to $4\%$ ($\$20$ million). How much of the extra $\$10$ million does the originator bear if its retention is (a) a $5\%$ vertical slice of every tranche, (b) a $\$25$ million first-loss piece?
>
> > [!answer]-
> > (a) A vertical slice bears $5\%$ of every loss:
> >
> > $$0.05 \times \$10\text{M} = \$0.5\text{M}$$
> >
> > (b) A first-loss piece absorbs every dollar of pool loss up to $\$25$ million. While pool losses stay below that, the originator bears the **whole** $\$10$ million increase.
> >
> > The horizontal retention makes the originator pay for its own underwriting; the vertical slice mostly signals. The same logic is why a cat bond sponsor often keeps a share of its own layer.
