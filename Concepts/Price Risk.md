---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:d25c7838828f1316ae61b23e3c546a46b40c850e44dac39f55390c10b60a2111
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Price Risk.md
---

**Price Risk** is the risk that the market value of a [[Bonds|bond]] or fixed-income portfolio falls because interest rates rise. It is also called [[Interest Rate Risk|interest rate risk]].

For a change $\Delta j$ in yield, the percentage change in the price $P$ of a bond or portfolio is approximately

> $$\frac{\Delta P}{P} \approx -D_{Mod}\,\Delta j$$

- $\Delta P$ is the change in price.
- $D_{Mod}$ is the [[Modified Duration|modified duration]].

Bond prices and yields move in opposite directions, so an unexpected rise in yields is an immediate capital loss for an investor who must sell before maturity. A bond with a longer [[Macaulay Duration|Macaulay duration]] carries more price risk. A 1% rise in yield causes a much larger percentage price drop for a 20-year bond than for a 2-year bond.

> [!example]- Two portfolios worth $\$1{,}000{,}000$ each have modified durations 10 and 2. What does each lose, approximately, when yields rise by 0.5%? {Example}
> - The change in yield is $\Delta j = 0.005$.
> - The first portfolio changes by about $-10 \times 0.005 \times 1{,}000{,}000 = -\$50{,}000$.
> - The second changes by about $-2 \times 0.005 \times 1{,}000{,}000 = -\$10{,}000$.
> - The first portfolio loses five times as much for the same rise in yields, because its duration is five times as long.

## Price risk and reinvestment risk

Price risk is the complement of [[Reinvestment Risk|reinvestment risk]]. A strategy that reduces one typically increases the other. [[Redington Immunization]] and [[Cash Flow Matching|cash flow matching]] manage both for an institution with known future liabilities.
