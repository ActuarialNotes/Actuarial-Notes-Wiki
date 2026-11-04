---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:3078d23dcf7024785a503f63eac61e6428f0ce198959b715eec169957d011f50
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §3.1 Theorems 3.1-3.2 and n! (p.80, PDF p.88), read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Combinatorics.md
---

**Combinatorics** is a branch of [[Discrete Mathematics]] concerned with counting the number of ways to arrange, select, or partition objects.

> $$|\text{arrangements of } n \text{ objects}| = n!$$

> $$= n \times (n-1) \times \cdots \times 2 \times 1$$

- Combinatorics provides the tools needed to compute probabilities when outcomes are equally likely.
- The two fundamental problems are counting **ordered** arrangements ([[Permutation]]s) and **unordered** selections ([[Combination]]s).
- In probability, combinatorics determines the sizes of events and sample spaces: $P(A) = |A| / |S|$ for uniform experiments

> [!idea] The idea
> When every outcome is equally likely, the probability of an event is the number of outcomes in the event divided by the number in the sample space, so the work is counting. Combinatorics builds almost every count in stages and multiplies the number of choices at each stage. For example, $n!$ is $n$ choices for the first place times $n-1$ for the second, and so on down to 1. Before counting, settle whether repetition is allowed and whether the order of the choices matters. When order doesn't matter, divide out the orderings that were counted as different.

![[Media/Figures/Combinatorics.svg|340]]

### Counting rules

- **Multiplication principle:** if an outcome is built in stages, with $m_1$ choices at the first stage, $m_2$ at the second (whatever was chosen before), and so on, the number of outcomes is the product of the number of choices at each stage, $m_1 \times m_2 \times \cdots$. It is the rule behind $n!$, $P(n, k)$ and $\binom{n}{k}\,k!$.
- A count with one repeated value is built in stages too: choose the repeated value, then choose which positions hold it, then fill the remaining positions with different values, and multiply the counts.
- **With replacement:** when repetition is allowed (sampling with replacement, items not necessarily distinct), each of the $m$ positions independently has $n$ choices, giving $n^m$ ordered arrangements. When the items must be distinct, the count is $P(n, m) = n!/(n-m)!$ instead.
- **Symmetry in a random arrangement:** in a uniformly random seating or ordering, each person is equally likely to be in any position, so one person's position can be fixed without loss of generality; another given person is then equally likely to occupy each of the remaining positions.

### Derangements

A **derangement** is a permutation of $n$ items with no fixed point: no item stays in its original position. The number of derangements of $n$ items is written $D_n$.

- A [[Permutation]] that fixes a chosen set of $k$ items arranges the other $n-k$ freely, so there are $\binom{n}{k}(n-k)!$ of them. By [[Inclusion-Exclusion Principle|inclusion-exclusion]] over the set of fixed items, the number of permutations with at least one fixed point is the alternating sum

> $$\sum_{k=1}^{n} (-1)^{k+1}\binom{n}{k}(n-k)!$$

- Subtracting that from $n!$ gives the number of derangements:

> $$D_n = n!\sum_{k=0}^{n}\frac{(-1)^k}{k!}$$

- For example, $D_3 = 3!\left(1 - 1 + \tfrac{1}{2} - \tfrac{1}{6}\right) = 2$: of the six orderings of three items, only the two cyclic shifts move every item.
- The probability that a random permutation of $n$ items has no fixed point is $D_n/n!$.

> [!example]- Counting strings with exactly one pair {Example}
> How many 4-digit strings (digits 0 to 9, leading zeros allowed) contain one digit exactly twice and two other digits once each?
>
> > [!answer]-
> > Build the string in stages and multiply:
> > $$
> > \begin{align*}
> > \text{repeated digit} &: 10 \\
> > \text{positions for it} &: \binom{4}{2} = 6 \\
> > \text{other two positions} &: 9 \times 8 = 72 \\
> > \text{total} &= 10 \times 6 \times 72 \\
> > &= 4{,}320
> > \end{align*}
> > $$
> > The last two positions use $9 \times 8$, not $\binom{9}{2}$, because the positions are already fixed and the two digits in them are ordered.

> [!example]- Counting Equally Likely Outcomes for a Lottery {Example}
> A lottery draws 3 numbers from $\{1, 2, 3, 4, 5\}$ without replacement. How many equally likely outcomes are there if order does not matter?
>
> > [!answer]-
> > This is a combination problem (order irrelevant, no replacement):
> > $$\binom{5}{3} = \frac{5!}{3!\,2!} = \frac{120}{6 \times 2} = 10$$
> > There are 10 equally likely outcomes, so each has probability $1/10 = 0.10$.

> [!tip]- How it appears on the exam
> - **Exam P** (General Probability, objective 2): a group is made of several types, such as claims by line of business, smokers and non-smokers, or cards by rank. Some members are selected at random, and the question asks for the probability of a given mix. That probability is a product of [[Combination|combinations]] over the number of all selections.
> - **Exam P**: committees, lotteries and draws without replacement, sometimes with a condition such as "at least two" or "none of a type" that splits the count into cases.
> - **Exam P**: arrangements and assignments of roles, where order matters and the count is a [[Permutation]] or a product of stage counts.

> [!warning]- Exam traps
> - **Numerator and denominator on different footings.** Counting ordered outcomes in one and unordered in the other gives an answer off by a factorial. Decide once whether order matters and count both the event and the sample space that way.
> - **Overcounting "at least one".** Choosing one item of the required type first and then "any" for the rest counts the same selection several times. Count by cases (exactly one, exactly two, …) or take the complement of "none".
> - **With and without replacement.** $n^m$ is for repetition allowed. Drawing distinct items is $P(n, m)$ ordered or $\binom{n}{m}$ unordered. The question's "without replacement", "different" or "distinct" decides which.
