$$d = \frac{i}{1+i} = 1 - v$$

The **effective annual discount rate** $d$ is the interest paid at the **beginning** of a period on a loan of 1, rather than at the end. If you borrow 1 today and repay 1 at year-end, the interest charge of $d$ is deducted upfront so you receive only $1-d$ now. The key relationships among $d$, the effective rate $i$, and the discount factor $v = (1+i)^{-1}$ are:

$$d = \frac{i}{1+i} = 1 - v = iv \qquad \text{and} \qquad i = \frac{d}{1-d}$$

Because interest is collected at the start rather than the end, $d < i$ for any positive interest rate. The nominal discount rate convertible $m$-thly, $d^{(m)}$, satisfies $\left(1 - \frac{d^{(m)}}{m}\right)^m = 1 - d = v$, and as $m \to \infty$, $d^{(m)} \to \delta$.

> [!example]- Finding the Discount Rate from an Effective Rate {💡 Example}
> The effective annual interest rate is $i = 8\%$. Find the effective annual discount rate $d$ and verify the relationship $d = iv$.
>
> > [!answer]- Answer
> > $$d = \frac{i}{1+i} = \frac{0.08}{1.08} \approx 0.07407 = 7.407\%$$
> > Check: $v = 1/1.08 \approx 0.92593$, so $iv = 0.08 \times 0.92593 \approx 0.07407$. ✓
