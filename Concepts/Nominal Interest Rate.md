$$i^{(m)} = m\left[(1+i)^{1/m} - 1\right]$$

The **nominal interest rate** $i^{(m)}$ is a quoted annual rate convertible (compounded) $m$ times per year. Rather than crediting interest once at year-end, the year is divided into $m$ sub-periods each earning a periodic rate of $i^{(m)}/m$. The two-way relationship with the effective annual rate $i$ is:

$$\left(1 + \frac{i^{(m)}}{m}\right)^m = 1 + i \qquad \Longleftrightarrow \qquad i^{(m)} = m\left[(1+i)^{1/m} - 1\right]$$

As $m \to \infty$ the nominal rate converges to the [[Force of Interest]]: $\displaystyle\lim_{m\to\infty} i^{(m)} = \delta = \ln(1+i)$. For a fixed effective rate, $i^{(m)}$ is a decreasing function of $m$ — more frequent compounding requires a smaller stated rate to achieve the same year-end accumulation.

> [!example]- Converting a Nominal Rate to an Effective Rate {💡 Example}
> A savings account advertises a nominal interest rate of $i^{(12)} = 6\%$ convertible monthly. Find the equivalent effective annual interest rate.
>
> > [!answer]- Answer
> > The monthly periodic rate is $6\%/12 = 0.5\%$, so:
> > $$i = \left(1 + \frac{0.06}{12}\right)^{12} - 1 = (1.005)^{12} - 1 \approx 6.168\%$$
