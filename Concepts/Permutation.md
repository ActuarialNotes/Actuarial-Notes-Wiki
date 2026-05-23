- A **Permutation** $P(n, k)$ counts the number of ways to select and arrange $k$ objects from $n$ distinct objects in a specific order
- Permutations assume without replacement. You can't select the same object twice.
- $$P(n, k) = \frac{n!}{(n-k)!}$$
- $$\frac{n!}{(n-k)!} = n \times (n-1) \times \cdots \times (n-k+1)$$
- $n$ is the total number of objects and
- $k$ is the number of objects selected and arranged
- Permutations differ from combinations by a factor of $k!$: the number of ways to order the selected objects.
- Use permutations when sequence matters
  - Ranking
  - Scheduling
  - Assigning distinct roles

> [!example]- Assigning Ranked Prizes to Adjusters {Example}
> From 8 adjusters, an insurer awards a 1st, 2nd, and 3rd place performance bonus. How many distinct award outcomes are possible?
>
> > [!answer]- Answer
> > Order matters (1st ≠ 2nd ≠ 3rd place), so this is a permutation:
> > $$P(8, 3) = \frac{8!}{(8-3)!} = \frac{8!}{5!} = 8 \times 7 \times 6 = 336$$
> > There are 336 distinct ways to assign the three ranked prizes, compared to only $\binom{8}{3} = 56$ unordered committees.
