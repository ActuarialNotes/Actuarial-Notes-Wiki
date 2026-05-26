A **Survival Model** describes the distribution of a lifetime random variable $T \geq 0$, representing the time until death or failure. The model is characterized by the **survival function** $S(t)$, which gives the probability of surviving beyond time $t$.

> $$S(t) = P(T > t) = 1 - F(t)$$
>
> $$f(t) = -S'(t) = F'(t)$$

- $S(0) = 1$, $S(\infty) = 0$, and $S(t)$ is non-increasing
- The conditional probability of dying between ages $x$ and $x+t$, given alive at $x$, uses **actuarial notation**: $_tq_x = P(T_x \leq t)$ and $_tp_x = P(T_x > t) = S(x+t)/S(x)$
- $_{t}p_x = \dfrac{S(x+t)}{S(x)}$ and $_{t}q_x = 1 - {_t}p_x$
- The **[[Hazard Rate]]** $\mu(t)$ (force of mortality) links $f$, $S$: $f(t) = \mu(t)\,S(t)$

**Key relationship:**

$$S(t) = \exp\!\left(-\int_0^t \mu(s)\,ds\right)$$

> [!example]- Probability of Surviving to Age 75 Given Alive at 70 {Example}
> Suppose $S(t) = e^{-0.02t}$ for $t \geq 0$ (constant force of mortality). Find the probability that a life aged 70 survives to age 75.
>
> > [!answer]-
> > $${_5}p_{70} = \frac{S(75)}{S(70)} = \frac{e^{-0.02(75)}}{e^{-0.02(70)}} = e^{-0.02(5)} = e^{-0.1} \approx 0.9048$$

> [!example]- Finding the PDF from a Survival Function {Example}
> A survival function is given by $S(t) = \left(1 - \frac{t}{100}\right)^2$ for $0 \leq t \leq 100$. Find $f(t)$.
>
> > [!answer]-
> > $$f(t) = -S'(t) = -2\left(1 - \frac{t}{100}\right)\cdot\left(-\frac{1}{100}\right) = \frac{2}{100}\left(1 - \frac{t}{100}\right)$$
