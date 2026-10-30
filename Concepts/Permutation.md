---
verification:
  status: verified
  confidence: high
  last_checked: 2026-09-27
  last_checked_by: agent:validate-v1
  content_hash: sha256:3a2dd61bcfc3e7be9cf1268d0a1ed9d40a31dd58c734821ecce46948775fd0ae
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §3.1 Def. 3.2 and Thm 3.2 p.80 (PDF p.88); §3.2 Thm 3.5 p.94 (PDF p.102), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, p.1 learning outcome 1b, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Permutation.md
---

A **Permutation** $P(n, k)$ counts the number of ways to select and arrange $k$ objects from $n$ distinct objects in a specific order.
- Permutations assume without replacement: you cannot select the same object twice
- Permutations differ from combinations by a factor of $k!$: the number of ways to order the selected objects
- Use permutations when sequence matters: ranking, scheduling, or assigning distinct roles

> $$P(n, k) = \frac{n!}{(n-k)!}$$

> $$= n \times (n-1) \times \cdots \times (n-k+1)$$

![[Media/Figures/Permutation.svg|340]]

### Permutations with restrictions

- **Fixing a set of items:** the number of permutations of $n$ distinct items that leave a specified set of $k$ items in their original positions is $(n-k)!$, since the remaining $n-k$ items can be arranged arbitrarily. There are $\binom{n}{k}$ such sets, which gives the term $\binom{n}{k}(n-k)!$ in [[Inclusion-Exclusion Principle|inclusion-exclusion]] counts of permutations with fixed points (derangements, on [[Combinatorics]]).
- **Circular permutations:** the number of distinct arrangements of $n$ distinct objects around a circle, counting arrangements that differ only by a rotation as the same, is $(n-1)!$. Seat one object anywhere and arrange the other $n-1$ relative to it: 7 people at a round table can be seated in $6! = 720$ ways.
- **Items that must be adjacent:** to count arrangements in which certain items must be adjacent, glue them into a single block, count the arrangements of the block together with the other items, and multiply by the number of orderings inside the block ($k!$ for a block of $k$). Five books in a row with two particular books together: $4! \times 2! = 48$ arrangements.

> [!example]- Assigning Ranked Prizes to Adjusters {Example}
> From 8 adjusters, an insurer awards a 1st, 2nd, and 3rd place performance bonus. How many distinct award outcomes are possible?
>
> > [!answer]-
> > Order matters (1st ≠ 2nd ≠ 3rd place), so this is a permutation:
> > $$P(8, 3) = \frac{8!}{(8-3)!} = \frac{8!}{5!} = 8 \times 7 \times 6 = 336$$
> > There are 336 distinct ways to assign the three ranked prizes, compared to only $\binom{8}{3} = 56$ unordered committees.
