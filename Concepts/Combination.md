A **Combination** $\binom{n}{k}$ ("$n$ choose $k$") counts the number of ways to select $k$ objects from $n$ distinct objects when order does not matter.
- Combinations assume no replacement: you cannot select the same object twice:

> $$\binom{n}{k} = \frac{n!}{k!\,(n-k)!}$$

- $n$ is the total number of objects and $k$ is the number of objects selected
- The identity $\binom{n}{k} = \binom{n}{n-k}$ reflects that choosing $k$ items to include is equivalent to choosing $n-k$ to exclude
- Combinations appear in the [[Binomial]] distribution, [[Hypergeometric]] distribution, and the [[Inclusion-Exclusion Principle]] for counting

> [!example]- Selecting a Claims Committee {Example}
> An insurer needs to form a committee of 3 adjusters from a pool of 8. How many different committees are possible?
>
> > [!answer]-
> > Order does not matter (a committee $\{A, B, C\}$ is the same regardless of selection order), so:
> > $$\binom{8}{3} = \frac{8!}{3!\,5!} = \frac{8 \times 7 \times 6}{3 \times 2 \times 1} = \frac{336}{6} = 56$$
> > There are 56 possible committees.
