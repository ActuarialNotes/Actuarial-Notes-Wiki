The **marginal probability function** of $X$ is obtained from the [[Joint Probability Function]] $p(x,y)$ by summing over all values of $Y$:
$$p_X(x) = P(X = x) = \sum_y p(x, y)$$

Similarly $p_Y(y) = \sum_x p(x,y)$. In the continuous case, the marginal PDF is:
$$f_X(x) = \int_{-\infty}^{\infty} f(x,y)\,dy$$

Marginal distributions describe the behavior of each variable in isolation, ignoring the joint structure. They are the starting point for computing [[Moments for Joint Distributions]] and assessing [[Independent Random Variables|independence]].

> [!example]- Finding a Marginal PMF {💡 Example}
> Joint PMF: $p(1,1) = 0.2$, $p(1,2) = 0.3$, $p(2,1) = 0.1$, $p(2,2) = 0.4$. Find $p_X(x)$.
>
> > [!answer]- Answer
> > $$p_X(1) = p(1,1) + p(1,2) = 0.2 + 0.3 = 0.5$$
> > $$p_X(2) = p(2,1) + p(2,2) = 0.1 + 0.4 = 0.5$$
