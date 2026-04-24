$$f(x) = \frac{1}{\sigma\sqrt{2\pi}}\,\exp\!\left(-\frac{(x-\mu)^2}{2\sigma^2}\right), \quad x \in \mathbb{R}$$
$$\text{where } \mu = \text{mean},\quad \sigma^2 = \text{variance}$$

The Normal Distribution $X \sim N(\mu, \sigma^2)$ is a symmetric, bell-shaped continuous distribution on $(-\infty, \infty)$ fully characterized by its mean $\mu$ and variance $\sigma^2$.

Its CDF has no closed form and is evaluated via the standard normal $Z = (X - \mu)/\sigma \sim N(0,1)$ using $\Phi$ tables. By the Central Limit Theorem, sums of many independent random variables are approximately normal, making it foundational for aggregate loss models.

> [!example]- Probability that Aggregate Losses Exceed a Threshold {💡 Example}
> Annual aggregate losses $S \sim N(\mu = 50{,}000,\, \sigma^2 = 40{,}000{,}000)$. Find $P(S > 55{,}000)$.
>
> > [!answer]- Answer
> > Standardize: $\sigma = \sqrt{40{,}000{,}000} \approx 6{,}324.6$.
> > $$Z = \frac{55{,}000 - 50{,}000}{6{,}324.6} \approx 0.791$$
> > $$P(S > 55{,}000) = P(Z > 0.791) = 1 - \Phi(0.791) \approx 1 - 0.7855 = 0.2145$$
> > There is approximately a 21.5% probability that aggregate losses exceed \$55,000.
