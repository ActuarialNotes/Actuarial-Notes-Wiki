**Whole Life Insurance** is a life insurance policy that pays a benefit of 1 (one unit) at the moment of the insured's death, regardless of when death occurs. The **net single premium** (expected present value of the benefit) is denoted $\bar{A}_x$ for a life aged $x$.

> $$\bar{A}_x = E\!\left[e^{-\delta T_x}\right] = \int_0^\infty e^{-\delta t} \, {_t}p_x \, \mu_{x+t}\,dt$$
>
> $$\text{Var}\!\left(e^{-\delta T_x}\right) = {}^{2}\!\bar{A}_x - \left(\bar{A}_x\right)^2$$

- $\delta$ is the **force of interest** (continuous discounting); under discrete discounting at rate $i$, the benefit is paid at end of year of death with APV $A_x = \sum_{k=0}^\infty v^{k+1} {_k}p_x\, q_{x+k}$
- **Recursion:** $A_x = v\,q_x + v\,p_x\,A_{x+1}$
- Under a **constant force of mortality** $\mu$ and force of interest $\delta$: $\bar{A}_x = \dfrac{\mu}{\mu + \delta}$
- The **variance** uses the **double-force-of-interest trick**: ${}^2\!\bar{A}_x$ is $\bar{A}_x$ evaluated at $2\delta$

> [!example]- Net Single Premium Under Constant Force of Mortality {Example}
> A life is subject to constant force of mortality $\mu = 0.02$ and the force of interest is $\delta = 0.05$. Calculate $\bar{A}_x$.
>
> > [!answer]-
> > $$\bar{A}_x = \frac{\mu}{\mu + \delta} = \frac{0.02}{0.02 + 0.05} = \frac{0.02}{0.07} \approx 0.2857$$

> [!example]- Variance of the Present Value of the Benefit {Example}
> Using the same assumptions ($\mu = 0.02$, $\delta = 0.05$), find the variance of $v^{T_x}$.
>
> > [!answer]-
> > Compute ${}^2\!\bar{A}_x$ by doubling the force of interest:
> > $${}^2\!\bar{A}_x = \frac{0.02}{0.02 + 2(0.05)} = \frac{0.02}{0.12} \approx 0.1667$$
> > $$\text{Var}(v^{T_x}) = {}^2\!\bar{A}_x - (\bar{A}_x)^2 = 0.1667 - (0.2857)^2 \approx 0.1667 - 0.0816 = 0.0851$$
