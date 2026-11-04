---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:a5b95e99a1df3987fcabf19ffe6c40398d0afb6005fee9c0b67cff581fc6dca0
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §3.1 Thm 3.2 k-permutations (n)_k (p.80, PDF p.88); Thm 3.5 (PDF p.102), read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Permutation.md
---

A **Permutation** $P(n, k)$ counts the number of ways to select and arrange $k$ objects from $n$ distinct objects in a specific order.

> $$P(n, k) = \frac{n!}{(n-k)!}$$

> $$= n \times (n-1) \times \cdots \times (n-k+1)$$

- A permutation assumes no replacement, so the same object cannot be selected twice.
- Permutations differ from combinations by a factor of $k!$, the number of ways to order the selected objects.
- Use permutations when sequence matters, as in ranking, scheduling or assigning distinct roles.

> [!idea] The idea
> Ranking 3 prizes among 8 adjusters means filling 3 places in order. A permutation fills the $k$ places one at a time. Any of the $n$ objects can go first, $n-1$ are left for the second, and so on down to $n-k+1$ for the last. The multiplication principle multiplies these choices, so the 3 ranked prizes can be awarded in $8 \times 7 \times 6$ ways. The factorial form $n!/(n-k)!$ is the same product written compactly, because the $(n-k)!$ cancels the factors for the places that are never filled.

![[Media/Figures/Permutation.svg|340]]

### Permutations with restrictions

- **Fixing a set of items:** the number of permutations of $n$ distinct items that leave a specified set of $k$ items in their original positions is $(n-k)!$, since the remaining $n-k$ items can be arranged arbitrarily. There are $\binom{n}{k}$ such sets, which gives the term $\binom{n}{k}(n-k)!$ in [[Inclusion-Exclusion Principle|inclusion-exclusion]] counts of permutations with fixed points (derangements, on [[Combinatorics]]).
- **Circular permutations:** the number of distinct arrangements of $n$ distinct objects around a circle, counting arrangements that differ only by a rotation as the same, is $(n-1)!$. Seat one object anywhere and arrange the other $n-1$ relative to it. For example, 7 people at a round table can be seated in $6! = 720$ ways.
- **Items that must be adjacent:** to count arrangements in which certain items must be adjacent, glue them into a single block, count the arrangements of the block together with the other items, and multiply by the number of orderings inside the block ($k!$ for a block of $k$). For example, five books in a row with two particular books kept together give $4! \times 2! = 48$ arrangements.

> [!example]- Assigning Ranked Prizes to Adjusters {Example}
> From 8 adjusters, an insurer awards a 1st, 2nd, and 3rd place performance bonus. How many distinct award outcomes are possible?
>
> > [!answer]-
> > Order matters (1st ≠ 2nd ≠ 3rd place), so this is a permutation:
> > $$P(8, 3) = \frac{8!}{(8-3)!} = \frac{8!}{5!} = 8 \times 7 \times 6 = 336$$
> > There are 336 distinct ways to assign the three ranked prizes, compared to only $\binom{8}{3} = 56$ unordered committees.

> [!tip]- How it appears on the exam
> - **Exam P** (General Probability, objective 2): ranked prizes, officer posts or schedules, where each selected object gets a distinct role and the count is $P(n, k)$.
> - **Exam P**: an ordered step follows an unordered one, such as choosing a subcommittee and then a chair and a secretary from it. The count is then a [[Combination|combination]] times a permutation.
> - Arrangements with a restriction, such as items kept together or seats around a table, are counted with the rules above. The count usually feeds a probability, the favourable arrangements over all $n!$.

> [!warning]- Exam traps
> - **Forgetting the order inside a block.** Gluing $k$ items together and arranging the blocks counts each arrangement of the block once. Without the $k!$ orderings inside it, the answer is too small by that factor.
> - **Treating a circle as a row.** Around a table, $n!$ counts every rotation of the same seating separately and is $n$ times too large. The count is $(n-1)!$.
> - **Identical objects counted as distinct.** $n!$ assumes every object is different. With repeated objects, divide by the factorial of each group of identical ones, or the count includes swaps that change nothing.
