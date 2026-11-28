---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:625029c13cc94fa738ca887276c11f8881639c8ec16a9187aaef6ceb01ea202d
  sources:
    - "Grinstead & Snell, Introduction to Probability, §3.1 Thm 3.1, Def. 3.2, Thm 3.2 (PDF p.88); factorial 0!=1 (PDF p.88), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Random Services, Combinatorial Structures: permutations with indistinguishable objects; round table (n-1)!; couples seating exercise (2880, 1152, 384), sha256:63ef90fd651593defb33d7772ecbe92f6198b6b655219a5cb726c76cdc393ccb — https://www.randomservices.org/random/foundations/Structures.html"
    - "Siegrist, Random Services, The Matching Problem: permutations fixing a set J of k positions, (n-j)!, sha256:6c44b9152bd3fe3f4e53e442c55bb21d299ee229e7ae996e5bb893b424b2857f — https://www.randomservices.org/random/urn/Matching.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Permutation.md
---

![[Media/Figures/Permutation.svg|340]]

A **Permutation** is an ordered arrangement of distinct objects. The number of permutations of $k$ objects chosen from $n$ distinct objects, ${}_{n}P_{k}$, is

> $${}_{n}P_{k} = n \times (n-1) \times \cdots \times (n-k+1)$$

> $${}_{n}P_{k} = \frac{n!}{(n-k)!}$$

- $n!$, read "$n$ factorial", is $n \times (n-1) \times \cdots \times 2 \times 1$, with $0! = 1$.
- $k \le n$.

> [!example]- In a race with 10 runners, how many ways are there to award gold, silver and bronze medals? {Example}
> - Any of the 10 runners could win gold. Once gold is awarded, there are 9 remaining runners who could win silver, then 8 who could win bronze.
> - ${}_{10}P_{3} = 10 \times 9 \times 8 = 720$.

## Permutations of all $n$ objects

When all $n$ objects are arranged, $k = n$ and the number of permutations is

> $${}_{n}P_{n} = n!$$

> [!example]- A 4-digit PIN is chosen at random, each digit from 0 to 9. What is the probability that its 4 digits are all different? {Example}
> - The sample space is every 4-digit PIN. Digits may repeat, so $|S| = 10^4 = 10{,}000$.
> - A PIN with all digits different is an ordered arrangement of 4 of the 10 digits, so $|E| = {}_{10}P_{4} = 10 \times 9 \times 8 \times 7 = 5{,}040$.
> - The [[Probability|probability]] is $P(E) = \frac{5{,}040}{10{,}000} = 0.504$.

## Arrangements with repeated objects

When the $n$ objects are not all distinct, arranging identical objects among themselves produces no new arrangement. If there are $r$ types of object, the number of distinct arrangements of all $n$ is

> $$\frac{n!}{n_1!\, n_2! \cdots n_r!}$$

- $n_i$ is the number of identical objects of type $i$, with $n_1 + n_2 + \cdots + n_r = n$.

> [!example]- How many distinct arrangements are there of the letters in LOSS? {Example}
> - There are $n = 4$ letters: one L, one O and two S's.
> - Swapping the two S's gives the same arrangement, so divide the $4!$ arrangements by $2!$.
> - There are $\frac{4!}{1!\,1!\,2!} = \frac{24}{2} = 12$ distinct arrangements.

## Permutations that leave some objects in place

The number of permutations of $n$ distinct objects that leave a specified set of $k$ objects in their original positions is

> $$(n-k)!$$

The other $n-k$ objects can be arranged in any order.

## Arrangements around a circle

The number of distinct arrangements of $n$ distinct objects around a circle, counting arrangements that differ only by a rotation as the same, is

> $$(n-1)!$$

Seat one object anywhere, then arrange the other $n-1$ relative to it.

## Objects that must be adjacent

When $k$ particular objects must be adjacent, glue them into a single block. The block and the other $n-k$ objects are $n-k+1$ units to arrange, and the objects inside the block can be ordered in $k!$ ways, so the number of arrangements is

> $$(n-k+1)! \times k!$$
