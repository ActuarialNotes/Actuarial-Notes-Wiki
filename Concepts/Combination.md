$$\binom{n}{k} = \frac{n!}{k!\,(n-k)!}$$
$$\text{where } n = \text{total objects},\quad k = \text{objects selected}$$

A Combination $\binom{n}{k}$ (read "$n$ choose $k$") counts the number of ways to select $k$ objects from $n$ distinct objects when **order does not matter** and **replacement is not allowed**.

Combinations appear in the binomial and hypergeometric distributions, in inclusion-exclusion counting, and wherever the identity of the selected group matters but not the order of selection. The identity $\binom{n}{k} = \binom{n}{n-k}$ reflects that choosing $k$ items to include is equivalent to choosing $n-k$ to exclude.

> [!example]- Selecting a Claims Committee {💡 Example}
> An insurer needs to form a committee of 3 adjusters from a pool of 8. How many different committees are possible?
>
> > [!answer]- Answer
> > Order does not matter (a committee $\{A, B, C\}$ is the same regardless of selection order), so:
> > $$\binom{8}{3} = \frac{8!}{3!\,5!} = \frac{8 \times 7 \times 6}{3 \times 2 \times 1} = \frac{336}{6} = 56$$
> > There are 56 possible committees.
