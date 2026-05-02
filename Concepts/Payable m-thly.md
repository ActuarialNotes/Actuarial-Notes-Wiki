An annuity **payable $m$-thly** makes $m$ payments per year of $1/m$ each, totaling $1$ per year. The present value of a whole-life or $n$-year [[Annuity Immediate]] payable $m$-thly uses the modified annuity symbol $a^{(m)}_{\overline{n}|}$:

$$a^{(m)}_{\overline{n}|} = \frac{1 - v^n}{i^{(m)}}$$

where $i^{(m)}$ is the [[Nominal Interest Rate Convertible m-thly]] and $v = 1/(1+i)$. Payable $m$-thly annuities arise when cash flows occur monthly, quarterly, or semi-annually rather than annually.

> [!example]- Monthly Annuity Present Value {💡 Example}
> A 10-year annuity pays $100$ per month (end of month). Find the present value at $i = 6\%$ effective annual.
>
> > [!answer]- Answer
> > $i^{(12)} = 12[(1.06)^{1/12}-1] = 12(0.004868) = 5.842\%$. Annual payment = $1200$.
> > $$\text{PV} = 1200 \cdot \frac{1-(1.06)^{-10}}{i^{(12)}} = 1200 \cdot \frac{0.44161}{0.05842} = 1200 \times 7.557 = 9068$$
