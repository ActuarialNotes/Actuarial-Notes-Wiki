$$P(n, k) = \frac{n!}{(n-k)!} = n \times (n-1) \times \cdots \times (n-k+1)$$
$$\text{where } n = \text{total objects},\quad k = \text{objects arranged}$$

A Permutation $P(n, k)$ counts the number of ways to select and **arrange** $k$ objects from $n$ distinct objects in a specific order, without replacement.

Permutations differ from combinations by a factor of $k!$ — the number of ways to order the selected objects. Use permutations when sequence matters (e.g., ranking, scheduling, assigning distinct roles) and combinations when only membership matters.

> [!example]- Assigning Ranked Prizes to Adjusters {💡 Example}
> From 8 adjusters, an insurer awards a 1st, 2nd, and 3rd place performance bonus. How many distinct award outcomes are possible?
>
> > [!answer]- Answer
> > Order matters (1st ≠ 2nd ≠ 3rd place), so this is a permutation:
> > $$P(8, 3) = \frac{8!}{(8-3)!} = \frac{8!}{5!} = 8 \times 7 \times 6 = 336$$
> > There are 336 distinct ways to assign the three ranked prizes, compared to only $\binom{8}{3} = 56$ unordered committees.
