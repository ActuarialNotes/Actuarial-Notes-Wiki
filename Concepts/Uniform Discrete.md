The **Discrete Uniform Distribution** $X \sim \text{Unif}\{1, \ldots, n\}$ assigns equal probability to each of $n$ possible integer values. It is the natural model for any experiment where all outcomes are equally likely, such as rolling a fair die.

> $$P(X = k) = \frac{1}{n}, \quad k = 1, 2, \ldots, n$$

- $E[X] = (n+1)/2$ and $\text{Var}(X) = (n^2 - 1)/12$
- Over a general integer range $\{a, a+1, \ldots, b\}$ there are $n = b - a + 1$ values, with $E[X] = (a+b)/2$ and $\text{Var}(X) = (n^2-1)/12$. The variance depends only on **how many** values there are, not where the range sits — shifting a distribution never changes its spread.
- Do not confuse it with the [[Uniform Continuous Distribution|continuous uniform]] on $(a,b)$, whose variance is $(b-a)^2/12$. For $\{1,\ldots,6\}$ the discrete answer is $35/12 \approx 2.92$; treating it as continuous on $(1,6)$ gives $25/12 \approx 2.08$.

> [!example]- Rolling a Fair Six-Sided Die {Example}
> A fair six-sided die is rolled. Find the expected value and variance of the outcome $X$.
>
> > [!answer]-
> > Here $n = 6$, so:
> > $$E[X] = \frac{6+1}{2} = 3.5$$
> > $$\text{Var}(X) = \frac{6^2 - 1}{12} = \frac{35}{12} \approx 2.917$$

> [!example]- Deductible Applied to a Discrete Uniform Loss {Example}
> A loss $X$ is equally likely to be any integer from 1 to 10 (in thousands). A deductible of 4 applies, so the insurer pays $Y = (X-4)_+$. Find $E[Y]$.
>
> > [!answer]-
> > Each outcome has probability $1/10$. Losses of 1 through 4 pay nothing; losses of 5 through 10 pay $1, 2, \ldots, 6$:
> > $$
> > \begin{align*}
> > E[Y] &= \frac{1}{10}\sum_{k=5}^{10}(k - 4) \\
> >      &= \frac{1}{10}(1+2+3+4+5+6) \\
> >      &= \frac{21}{10} \\
> >      &= 2.1
> > \end{align*}
> > $$
> > The insurer expects to pay 2.1 thousand per loss, against a ground-up mean of $E[X] = 5.5$ — the deductible removes 3.4, more than the 4 it nominally withholds, because it also zeroes out the four smallest losses entirely.

> [!example]- A Range That Does Not Start at 1 {Example}
> Claim counts are equally likely to be any integer from 20 to 29. Find the mean and variance.
>
> > [!answer]-
> > There are $n = 29 - 20 + 1 = 10$ equally likely values:
> > $$
> > \begin{align*}
> > E[X] &= \frac{20 + 29}{2} = 24.5 \\
> > \text{Var}(X) &= \frac{10^2 - 1}{12} = \frac{99}{12} = 8.25
> > \end{align*}
> > $$
> > Applying $E[X] = (n+1)/2 = 5.5$ here would be the classic error: that formula assumes the range starts at 1.
