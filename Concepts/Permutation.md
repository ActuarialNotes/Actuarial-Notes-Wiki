---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:b2513782c6819cac24f99d5a709d7aeb56f8a9b67b3141373a34b0456a41bc7a
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §3.1 Def. 3.2 and Thm 3.2 p.80 (PDF p.88); §3.2 Thm 3.5 p.94 (PDF p.102), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, p.1 learning outcome 1b, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "K. Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random Services), fetched 2026-10-30, Finite Sampling Models §6 The Matching Problem (#{X_i = i for all i in J} = (n-j)!; C(n,j) subsets) sha256:6c44b9152bd3fe3f4e53e442c55bb21d299ee229e7ae996e5bb893b424b2857f — https://www.randomservices.org/random/urn/Matching.html; Foundations §1.8 Combinatorial Structures, Arrangements exercises (round table (n-1)!; couples/men together 384, 2880; books by subject) sha256:63ef90fd651593defb33d7772ecbe92f6198b6b655219a5cb726c76cdc393ccb — https://www.randomservices.org/random/foundations/Structures.html"
    - "R. Sekhon & R. Bloom, Applied Finite Mathematics (LibreTexts, CC BY-NC-SA 4.0), §7.3 Permutations, Example 5 ('we tie A and B together and treat them as one person … 3! 2! = 12'), fetched 2026-10-30, sha256:34d1761b4d54b6366e27427f706a44729ef59ca2056c035d524253d882c9c500 — https://math.libretexts.org/Bookshelves/Applied_Mathematics/Applied_Finite_Mathematics_(Sekhon_and_Bloom)/07:_Sets_and_Counting/7.03:_Permutations"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §3.1 Thm 3.1, Def. 3.2, Thm 3.2 n·(n−1)·…·(n−k+1) (PDF p.88); A Counting Technique (PDF p.84), read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "K. Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random Services), Foundations §1.8 Combinatorial Structures, fetched 2026-11-04: samples classed by whether order is important and whether objects are replaced (n^k; n^(k)); each combination has k! orderings, n^(k)=C(n,k)k!; committee then officers C(n,k)k^(j); distinguishable permutations of n objects with n_i identical of type i = n!/(n_1!…n_k!); round table (n−1)!, sha256:63ef90fd651593defb33d7772ecbe92f6198b6b655219a5cb726c76cdc393ccb — https://www.randomservices.org/random/foundations/Structures.html"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability learning outcomes a-g (PDF p.2) and Topic 2 learning outcome b (PDF p.3), read 2026-11-04 for the objective numbers in the exam tip, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §3.1 Thm 3.2 k-permutations (n)_k (p.80, PDF p.88); Thm 3.5 (PDF p.102), read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Permutation.md
---

A **Permutation** $P(n, k)$ counts the ways to select $k$ objects from $n$ distinct objects and arrange them in order.

> $$P(n, k) = \frac{n!}{(n-k)!}$$

> $$P(n, k) = n \times (n-1) \times \cdots \times (n-k+1)$$

- A permutation assumes no replacement, so the same object cannot be selected twice.
- Permutations differ from [[Combination|combinations]] by a factor of $k!$, the number of ways to order the selected objects.
- Use a permutation when the sequence matters, as in ranking, scheduling or assigning distinct roles.

> [!idea] The idea
> A permutation fills $k$ places one at a time. Any of the $n$ objects can go first, $n - 1$ are left for the second, and so on. The [[Combinatorics|multiplication principle]] multiplies these choices. The factorial form is the same product, because $(n-k)!$ cancels the factors for the places that are never filled.

![[Media/Figures/Permutation.svg|340]]

## Filling places in order

An insurer awards a 1st, 2nd and 3rd place bonus among 8 adjusters. How many outcomes are there?

| Place | Choices left |
|---|---|
| 1st | 8 |
| 2nd | 7 |
| 3rd | 6 |

> $$P(8, 3) = 8 \times 7 \times 6 = 336$$

## Ordered versus unordered

A committee of 3 from the same 8 is not ranked, so there are only $\binom{8}{3} = 56$ committees. Each committee can be ranked in $3! = 6$ ways, and $56 \times 6 = 336$.

> $$P(n, k) = \binom{n}{k}\,k!$$

When a selection is followed by an ordered step, the count is a combination times a permutation. Choosing 4 of the 8 for a subcommittee and then a chair and a secretary from the 4 gives $\binom{8}{4} \times P(4, 2) = 70 \times 12 = 840$. Choosing the chair and secretary first and then 2 more members gives $P(8, 2)\binom{6}{2} = 56 \times 15 = 840$ too.

## All $n$ in a row, and identical objects

All 8 adjusters can be put in a review rota in $8! = 40{,}320$ ways, the case $k = n$.

$n!$ assumes every object is different. Suppose 8 claim files are queued and only their types matter: 3 auto, 3 home and 2 workers compensation. Swapping two auto files changes nothing, so divide by the orderings within each type.

> $$\frac{8!}{3!\,3!\,2!} = 560$$

## Permutations with restrictions

- **Items that must be adjacent.** Glue them into one block, arrange the block with the other items, and multiply by the orderings inside the block. Two given adjusters together in the rota of 8 give $7! \times 2! = 10{,}080$ arrangements. A random rota puts them together with probability $10{,}080 / 40{,}320 = 0.25$.
- **Around a circle.** Arrangements that differ only by a rotation are the same. Seat one object anywhere and arrange the others relative to it, giving $(n-1)!$. The 8 adjusters can sit around a round table in $7! = 5{,}040$ ways.
- **Fixing a set of items.** The permutations of $n$ items that leave a given set of $k$ items in place number $(n - k)!$, since only the other items move. With $\binom{n}{k}$ such sets, the term $\binom{n}{k}(n-k)!$ appears in [[Inclusion-Exclusion Principle|inclusion-exclusion]] counts of permutations with fixed points. The derangement count is on [[Combinatorics]].

> [!trap] Forgetting the order inside a block
> Gluing two items and arranging the block counts each arrangement of the block once. Without the $2!$ inside it, the rota count is $7! = 5{,}040$, half the right answer.

## Try it

> [!example]- Officers of a committee {Example}
> A committee of 10 names a president, a vice-president and a treasurer. How many outcomes are there?
>
> > [!answer]-
> > **Plan:** three distinct roles filled in order.
> > $$P(10, 3) = 10 \times 9 \times 8 = 720$$

> [!example]- Together at a round table {Example}
> Six people sit at random around a round table. Find the probability that two given people sit next to each other.
>
> > [!answer]-
> > **Plan:** count the circular arrangements with the pair glued, over all circular arrangements.
> >
> > All arrangements: $5! = 120$. With the pair as one block, there are 5 units around the table, so $4! \times 2! = 48$.
> >
> > The probability is $48/120 = 0.4$. Fixing one of the two people, the other has 5 seats, 2 of them adjacent, which gives $2/5$ again.

> [!example]- Claim histories {Example}
> Over 7 policy years, a policyholder had 4 claim-free years, 2 years with one claim and 1 year with two claims. How many distinct year-by-year histories fit?
>
> > [!answer]-
> > **Plan:** arrange 7 years, then divide by the orderings within each group of identical years.
> > $$\frac{7!}{4!\,2!\,1!} = 105$$
> > Swapping two claim-free years gives the same history, so $7!$ alone overcounts.

> [!warning]- Exam traps
> - **Forgetting the order inside a block.** Multiply by the $k!$ orderings inside a block of $k$.
> - **Treating a circle as a row.** Around a table, $n!$ counts every rotation of the same seating separately and is $n$ times too large.
> - **Identical objects counted as distinct.** Divide by the factorial of each group of identical objects.
> - **A permutation where order doesn't matter.** An unranked committee is $\binom{n}{k}$, smaller than $P(n, k)$ by $k!$.
