**Macaulay duration** $D_{Mac}$ is the weighted-average time to receipt of a bond's cash flows, where each cash flow is weighted by its [[Present Value]] as a fraction of total price:

$$D_{Mac} = \frac{\displaystyle\sum_{t=1}^{n} t \cdot C_t \cdot v^t}{\displaystyle\sum_{t=1}^{n} C_t \cdot v^t} = \frac{\displaystyle\sum_{t} t \cdot \text{PV}(C_t)}{P}$$

where $v = 1/(1+j)$ and $P$ is the bond price. Macaulay duration is measured in time units (years). The relationship to [[Modified Duration]] is $D_{Mod} = D_{Mac}/(1+j)$.

For a [[Perpetuity]], $D_{Mac} = (1+j)/j = 1/d$ years.

> [!example]- Macaulay Duration of a Bond {💡 Example}
> A 2-year bond pays $100$ per year plus $1000$ at maturity, priced at $j = 5\%$. Find $D_{Mac}$.
>
> > [!answer]- Answer
> > $\text{PV}_1 = 100/1.05 = 95.24$, $\text{PV}_2 = 1100/1.05^2 = 997.73$. $P = 95.24 + 997.73 = 1092.97$.
> > $$D_{Mac} = \frac{1 \times 95.24 + 2 \times 997.73}{1092.97} = \frac{95.24 + 1995.46}{1092.97} = \frac{2090.70}{1092.97} = 1.913 \text{ years}$$
