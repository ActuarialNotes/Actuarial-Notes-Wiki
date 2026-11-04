---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:4a660c7cfbaa6b3ae7bad17cba78ad05760d3d01fae1ba84e33dac40b201663c
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §3.1 Thm 3.2 (p.80, PDF p.88) and §3.2 Thm 3.5 C(n,j)=(n)_j/j! (p.94, PDF p.102), read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Combination.md
---

A **Combination** $\binom{n}{k}$ ("$n$ choose $k$") counts the number of ways to select $k$ objects from $n$ distinct objects when order does not matter.

> $$\binom{n}{k} = \frac{n!}{k!\,(n-k)!}$$

- A combination assumes no replacement, so the same object cannot be selected twice.
- $n$ is the total number of objects and $k$ is the number of objects selected.
- The identity $\binom{n}{k} = \binom{n}{n-k}$ reflects that choosing $k$ items to include is equivalent to choosing $n-k$ to exclude
- Combinations appear in the [[Binomial Distribution|Binomial]] distribution, [[Hypergeometric Distribution|Hypergeometric]] distribution, and the [[Inclusion-Exclusion Principle]] for counting

> [!idea] The idea
> Ordered picks are easy to count, but a committee has no order. A combination is a [[Permutation|permutation]] with the order forgotten. There are $n!/(n-k)!$ ordered ways to pick $k$ objects. Every unordered group appears among them $k!$ times, once for each way of ordering it, so dividing by $k!$ counts each group once. With 8 adjusters there are 336 ordered picks of 3. Each committee appears $3! = 6$ times among them, so there are 56 committees.

![[Media/Figures/Combination.svg|340]]

### Selections from several categories

- When a population is split into disjoint categories of sizes $N_1, \ldots, N_r$, a selection with exactly $k_i$ members from category $i$ is made by choosing from each category separately. By the multiplication principle, the number of such selections is the product of the number of ways for each category:

> $$\binom{N_1}{k_1}\binom{N_2}{k_2}\cdots\binom{N_r}{k_r}$$

- The categories must cover everyone: when the counts asked for sum to less than the selection size, the remaining members are chosen from the leftover category (those with none of the attributes), which adds a combination factor for them.
- Dividing the product by $\binom{N}{n}$, the number of all selections of size $n$, gives the probability of that composition under the multivariate [[Hypergeometric Distribution|hypergeometric]] distribution.

### Pascal's rule and the hockey-stick identity

- **Pascal's rule:** for $1 \le k \le n$, choosing $k$ objects from $n+1$ either leaves out a fixed object or includes it, so

> $$\binom{n+1}{k} = \binom{n}{k} + \binom{n}{k-1}$$

- **Hockey-stick identity:** for $k \le n$,

> $$\sum_{m=k}^{n}\binom{m}{k} = \binom{n+1}{k+1}$$

- It follows from Pascal's rule written as $\binom{m}{k} = \binom{m+1}{k+1} - \binom{m}{k+1}$, which makes the sum telescope (with $\binom{k}{k+1} = 0$). For example, $1 + 3 + 6 + 10 + 15 = \binom{7}{3} = 35$.
- It evaluates sums of falling-factorial terms, since $m(m-1)\cdots(m-k+1) = k!\binom{m}{k}$. The simplest case is $\sum_{m=1}^{n} m = \binom{n+1}{2}$.

> [!example]- Selecting a Claims Committee {Example}
> An insurer needs to form a committee of 3 adjusters from a pool of 8. How many different committees are possible?
>
> > [!answer]-
> > Order does not matter (a committee $\{A, B, C\}$ is the same regardless of selection order), so:
> > $$\binom{8}{3} = \frac{8!}{3!\,5!} = \frac{8 \times 7 \times 6}{3 \times 2 \times 1} = \frac{336}{6} = 56$$
> > There are 56 possible committees.

> [!tip]- How it appears on the exam
> - **Exam P** (General Probability, objective 2): a group is split into types, such as claims by line (workers compensation, homeowners, auto), smokers by habit (heavy, light, non-smokers) or cards by rank. Some members are drawn at random, and the question asks for the probability of a given mix. That probability is the product of one combination per type over $\binom{N}{n}$.
> - **Exam P**: a lottery or casino draw, where the probability that every chosen number is drawn is a ratio of combinations.
> - **Exam P**: combinations paired with an ordered step, such as choosing a subcommittee and then a chair and a secretary from it.

> [!warning]- Exam traps
> - **A combination where order matters.** When the selected objects get distinct roles (chair and secretary, 1st and 2nd prize), the count is $\binom{n}{k}\,k!$, a [[Permutation|permutation]]. The combination $\binom{n}{k}$ alone is too small by a factor of $k!$.
> - **A binomial where the draw is without replacement.** Drawing from a finite group without replacement changes the proportions after every draw, so the probability of a mix is a ratio of combinations (the [[Hypergeometric Distribution|hypergeometric]]), not $\binom{n}{k}p^k(1-p)^{n-k}$. The binomial answer is close for a large group, which is what makes it tempting.
