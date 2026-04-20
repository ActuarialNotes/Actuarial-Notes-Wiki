$$f(x) = \frac{1}{\theta}\,e^{-x/\theta}, \quad x > 0$$
$$\text{where } \theta > 0 = \text{mean (scale parameter)}$$

The Exponential Distribution $X \sim \text{Exp}(\theta)$ is a continuous distribution on $(0, \infty)$ commonly used to model the time between events or the size of insurance losses.

Its mean is $E[X] = \theta$, variance is $\text{Var}(X) = \theta^2$, and CDF is $F(x) = 1 - e^{-x/\theta}$. Its defining property is **memorylessness**: $P(X > s + t \mid X > s) = P(X > t)$, making it the unique continuous distribution with no aging effect.

> [!example]- Probability a Loss Exceeds the Deductible {💡 Example}
> Ground-up losses follow $X \sim \text{Exp}(\theta = 500)$. A deductible of $d = 300$ applies. What proportion of losses result in a claim payment?
>
> > [!answer]- Answer
> > A payment is triggered only when $X > 300$:
> > $$P(X > 300) = 1 - F(300) = e^{-300/500} = e^{-0.6} \approx 0.5488$$
> > About 54.9% of losses exceed the deductible and generate a payment.
