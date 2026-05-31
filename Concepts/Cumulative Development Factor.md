**Cumulative Development Factor** (CDF, also called loss development factor or LDF) is the product of all age-to-age factors from a given maturity age to ultimate, representing the total development expected from that point forward.

> $$\text{CDF}_{n \to \text{ult}}$$
>
> $$= f_{n \to n{+}1} \times f_{n{+}1 \to n{+}2} \times \cdots \times \text{Tail Factor}$$

> $$\text{Ultimate}$$
>
> $$= \text{Reported at age }n \;\times\; \text{CDF}_{n \to \text{ult}}$$

- CDF $\geq 1.0$ for all lines where losses do not decrease; $\%$ reported $= 1/\text{CDF}$ and $\%$ unreported $= 1 - 1/\text{CDF}$, which are used directly in the [[Bornhuetter Ferguson Method]] and [[Cape Cod Method]]
- CDFs decrease monotonically with age — a 12-month CDF is always larger than a 24-month CDF for the same line, as more of the ultimate is already captured
- The [[Tail Factor]] is the final multiplier from the last observable triangle age to ultimate; omitting it (setting tail $= 1.0$) understates the CDF for long-tail lines
- CDFs are often presented as a table from each age to ultimate, computed by multiplying backward from the tail

> [!example]- CDF Calculation and Use {Example}
> Selected age-to-age factors: $f_{12\text{-}24} = 1.500$, $f_{24\text{-}36} = 1.200$, $f_{36\text{-}48} = 1.050$, tail $= 1.020$.
>
> > [!answer]-
> > $\text{CDF}_{12\text{-ult}} = 1.500 \times 1.200 \times 1.050 \times 1.020 = 1.928$
> >
> > $\text{CDF}_{24\text{-ult}} = 1.200 \times 1.050 \times 1.020 = 1.285$
> >
> > $\text{CDF}_{36\text{-ult}} = 1.050 \times 1.020 = 1.071$
> >
> > AY with $\$600{,}000$ reported at 12 months: Ultimate $= 600{,}000 \times 1.928 = \$1{,}156{,}800$; $\%$ unreported $= 1 - 1/1.928 = 48.1\%$
