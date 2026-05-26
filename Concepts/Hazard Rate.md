The **Hazard Rate** $\mu(t)$ (also called the **force of mortality** in life contingencies, or the **failure rate** in reliability) is the instantaneous rate of failure at time $t$ given survival to $t$.

> $$\mu(t) = \frac{f(t)}{S(t)} = -\frac{d}{dt}\ln S(t)$$
>
> $$S(t) = \exp\!\left(-\int_0^t \mu(s)\,ds\right)$$

- Also written $h(t)$ or $\lambda(t)$ depending on context; in life tables it is $\mu_x$
- A **constant** hazard rate $\mu(t) = \mu$ corresponds to the [[Exponential]] distribution: $S(t) = e^{-\mu t}$
- The **cumulative hazard function** $H(t) = \int_0^t \mu(s)\,ds = -\ln S(t)$
- An **increasing** hazard rate indicates aging (e.g., Weibull with shape $> 1$)
- A **decreasing** hazard rate indicates infant-mortality effects (Weibull with shape $< 1$)

**Gompertz–Makeham model (common in life insurance):**
$$\mu_x = A + Bc^x, \quad A \geq 0,\, B > 0,\, c > 1$$

> [!example]- Computing the Hazard Rate from a Survival Function {Example}
> The survival function is $S(t) = e^{-0.05t^2}$. Find the hazard rate $\mu(t)$.
>
> > [!answer]-
> > $$\mu(t) = -\frac{d}{dt}\ln S(t) = -\frac{d}{dt}(-0.05t^2) = 0.10t$$
> > The hazard rate increases linearly with time, indicating an aging population.

> [!example]- Recovering the Survival Function from a Hazard Rate {Example}
> A force of mortality is $\mu(t) = 0.02 + 0.001t$. Find $S(5)$.
>
> > [!answer]-
> > $$H(5) = \int_0^5 (0.02 + 0.001t)\,dt = \left[0.02t + 0.0005t^2\right]_0^5 = 0.10 + 0.0125 = 0.1125$$
> > $$S(5) = e^{-0.1125} \approx 0.8935$$
