$$f(x) = \frac{1}{x\sigma\sqrt{2\pi}}\exp\!\left(-\frac{(\ln x - \mu)^2}{2\sigma^2}\right), \quad x > 0$$
$$\text{where } \mu \in \mathbb{R} = \text{log-mean},\; \sigma > 0 = \text{log-standard deviation}$$

The **Lognormal distribution** $X \sim \text{Lognormal}(\mu, \sigma^2)$ applies when $\ln X \sim N(\mu, \sigma^2)$. It is widely used to model insurance losses, asset prices, and any quantity that must be positive and right-skewed.

$$E[X] = e^{\mu + \sigma^2/2}, \qquad \text{Var}(X) = e^{2\mu+\sigma^2}(e^{\sigma^2}-1)$$
$$F(x) = \Phi\!\left(\frac{\ln x - \mu}{\sigma}\right)$$

> [!example]- Probability a Loss Exceeds a Threshold {💡 Example}
> Losses follow $X \sim \text{Lognormal}(\mu = 6,\, \sigma = 1.5)$. Find $P(X > 1000)$.
>
> > [!answer]- Answer
> > $$P(X > 1000) = 1 - \Phi\!\left(\frac{\ln 1000 - 6}{1.5}\right) = 1 - \Phi\!\left(\frac{6.908 - 6}{1.5}\right) = 1 - \Phi(0.605) \approx 1 - 0.7274 = 0.2726$$
