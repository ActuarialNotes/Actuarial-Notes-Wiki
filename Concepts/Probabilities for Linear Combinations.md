$$L = c_1 X_1 + c_2 X_2 + \cdots + c_n X_n \sim N\!\left(\sum_i c_i\mu_i,\ \sum_i c_i^2\sigma_i^2\right)$$
$$\text{where } X_1, \ldots, X_n \text{ are independent normal random variables}$$

A Linear Combination of independent random variables is any weighted sum $L = \sum c_i X_i$ for constants $c_i$.

When the $X_i$ are independent normals, $L$ is itself normal with the mean and variance shown above, enabling exact probability calculations via standardization.

> [!example]- Probability That Portfolio Loss Exceeds a Threshold {💡 Example}
> Two independent losses: $X_1 \sim N(100, 10^2)$ and $X_2 \sim N(200, 15^2)$. Find $P(X_1 + X_2 > 340)$.
>
> > [!answer]- Answer
> > The sum $L = X_1 + X_2$ is normal with:
> > $$\mu_L = 100+200 = 300, \qquad \sigma_L = \sqrt{10^2+15^2} = \sqrt{325} \approx 18.03$$
> > Standardising:
> > $$P(L > 340) = P\!\left(Z > \frac{340-300}{18.03}\right) = P(Z > 2.22) \approx 0.0132$$
