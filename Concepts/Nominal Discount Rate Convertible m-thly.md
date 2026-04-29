The **nominal discount rate convertible $m$-thly**, denoted $d^{(m)}$, is an annual discount rate under which interest is paid at the **beginning** of each of $m$ sub-periods per year at rate $d^{(m)}/m$.

The relationship to the effective annual rate $i$ (and effective discount rate $d$) is:
$$\left(1 - \frac{d^{(m)}}{m}\right)^m = 1 - d = v = \frac{1}{1+i}$$

$$d^{(m)} = m\!\left[1 - v^{1/m}\right] = m\!\left[1 - (1+i)^{-1/m}\right]$$

As $m \to \infty$, $d^{(m)} \to \delta$ (the [[Force of Interest]]). The nominal discount rate satisfies $d^{(m)} < i^{(m)}$ for all $m$.

> [!example]- Finding Nominal Discount Rate {💡 Example}
> The effective annual interest rate is $6\%$. Find $d^{(12)}$.
>
> > [!answer]- Answer
> > $v = 1/1.06$. Thus $d^{(12)} = 12[1 - (1.06)^{-1/12}] = 12[1 - 0.99515] = 12(0.00485) = 5.82\%$.
