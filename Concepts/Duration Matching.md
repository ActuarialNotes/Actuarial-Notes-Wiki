**Duration matching** (also called **Redington immunization** when combined with convexity conditions) is a strategy to protect a [[Portfolio]] against small, parallel shifts in interest rates by matching the [[Duration]] of assets to the duration of liabilities.

For basic duration matching:
$$D_{assets} = D_{liabilities}$$
$$PV_{assets} = PV_{liabilities}$$

This ensures that if interest rates change slightly, the change in asset value approximately equals the change in liability value. For **full [[Immunization]]** (protection against any single interest rate change), [[Convexity]] must also satisfy $C_{assets} \geq C_{liabilities}$.

> [!example]- Matching Duration {💡 Example}
> A liability of $10{,}000$ is due in 5 years. At $i=6\%$, $PV = 7472.58$ and Macaulay duration $= 5$ years. What asset portfolio should be constructed?
>
> > [!answer]- Answer
> > Purchase bonds with total market value $\$7{,}472.58$ and weighted Macaulay duration of exactly 5 years, ensuring the portfolio's value moves in tandem with the liability under small rate changes.
