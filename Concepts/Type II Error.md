A **Type II Error** occurs when a [[Hypothesis Testing|hypothesis test]] **fails to reject a false null hypothesis** $H_0$. It is also called a **false negative**.

> $$\beta = P(\text{Fail to Reject } H_0 \mid H_0 \text{ is false})$$
>
> $$\text{Power} = 1 - \beta = P(\text{Reject } H_0 \mid H_0 \text{ is false})$$

- $\beta$ depends on the true value of the parameter, the significance level $\alpha$, and the sample size $n$
- Increasing sample size $n$ **decreases** $\beta$ (increases power) for a fixed $\alpha$
- Decreasing $\alpha$ generally **increases** $\beta$ — there is a trade-off between Type I and Type II errors
- In actuarial contexts, a Type II Error might mean failing to detect an inadequate premium rate

> [!example]- Power of a Test {Example}
> A test of $H_0: \mu = 100$ vs. $H_1: \mu = 110$ uses a sample of $n = 25$ with $\sigma = 20$ and $\alpha = 0.05$ (one-sided, upper). Find the power (probability of rejecting $H_0$ when the true mean is 110).
>
> > [!answer]-
> > The critical value is $c = 100 + 1.645 \cdot (20/\sqrt{25}) = 100 + 6.58 = 106.58$.
> > Power $= P(\bar{X} > 106.58 \mid \mu = 110) = P\!\left(Z > \frac{106.58 - 110}{20/5}\right) = P(Z > -0.855) = \Phi(0.855) \approx 0.804$.
> > So $\beta = 1 - 0.804 = 0.196$; there is about a 20% chance of a Type II Error.
