---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:ed7c38e69596655409769c9c82963d237fa6d7de02f96cff2b2a4f5bc74cbb61
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Def. 1.3 p.25 (PDF p.33); §3.1 Def. 3.2, Thms 3.1-3.2 p.80 (PDF p.88); §3.2 Thm 3.5 and n!/(j!(n-j)!) pp.94-95 (PDF pp.102-103), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, p.1 learning outcome 1b, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §3.1 A Counting Technique p.76 (PDF p.84); Ex. 3.6 Poker Hands p.95 (PDF p.103); Historical Remarks, derangements w_1=0, w_2=1 (PDF pp.93-94), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "H. Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), fetched 2026-10-30, §2.1.0 Counting (multiplication principle) sha256:342319616112f470d1ff3cef050a29341a88a548e285cb6a328a2729d52b50df — https://www.probabilitycourse.com/chapter2/2_1_0_counting.php; §2.1.1 Ordered Sampling with Replacement (n options for each of k positions) sha256:fa301b74fb68f1fa983074b20a905e02c78520c4d5881b98cef798b9b9fce90a — https://www.probabilitycourse.com/chapter2/2_1_1_ordered_with_replacement.php; §2.1.2 Ordered Sampling without Replacement sha256:ea03a74b8351fba96d351a027350a67fa84dbc937f05aa938c98ea34ee33cdb0 — https://www.probabilitycourse.com/chapter2/2_1_2_ordered_without_replacement.php"
    - "K. Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random Services), fetched 2026-10-30, Finite Sampling Models §6 The Matching Problem (derangements; b_n(0) = n! Σ (-1)^j/j! by inclusion-exclusion with #{X_i=i, i∈J} = (n-j)! and C(n,j) sets J) sha256:6c44b9152bd3fe3f4e53e442c55bb21d299ee229e7ae996e5bb893b424b2857f — https://www.randomservices.org/random/urn/Matching.html; §1 Introduction (X_i uniformly distributed on D for each i) sha256:32cb2b68070d4a61c61ff3772b9eb371ed582196aa3d7ec4ad65c254056d22fe — https://www.randomservices.org/random/urn/Introduction.html; §4 Order Statistics (given X_i = x, X_j uniform on D∖{x}) sha256:8b4b38e1ca6a79fcc598b1bebf75fc7b9694f0592411d2ef539a6c727f139c77 — https://www.randomservices.org/random/urn/OrderStatistics.html; Foundations §1.8 Combinatorial Structures, round-table exercise ('Seat one, distinguished person arbitrarily') sha256:63ef90fd651593defb33d7772ecbe92f6198b6b655219a5cb726c76cdc393ccb — https://www.randomservices.org/random/foundations/Structures.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Combinatorics.md
---

**Combinatorics** is a branch of [[Discrete Mathematics]] concerned with counting the number of ways to arrange, select, or partition objects.
- It provides the tools needed to compute probabilities when outcomes are equally likely
- The two fundamental problems are counting **ordered** arrangements ([[Permutation]]s) and **unordered** selections ([[Combination]]s)
- In probability, combinatorics determines the sizes of events and sample spaces: $P(A) = |A| / |S|$ for uniform experiments

> $$|\text{arrangements of } n \text{ objects}| = n!$$

> $$= n \times (n-1) \times \cdots \times 2 \times 1$$

![[Media/Figures/Combinatorics.svg|340]]

### Counting rules

- **Multiplication principle:** if an outcome is built in stages, with $m_1$ choices at the first stage, $m_2$ at the second (whatever was chosen before), and so on, the number of outcomes is the product of the number of choices at each stage, $m_1 \times m_2 \times \cdots$. It is the rule behind $n!$, $P(n, k)$ and $\binom{n}{k}\,k!$.
- A count with one repeated value is built in stages too: choose the repeated value, then choose which positions hold it, then fill the remaining positions with different values, and multiply the counts.
- **With replacement:** when repetition is allowed (sampling with replacement, items not necessarily distinct), each of the $m$ positions independently has $n$ choices, giving $n^m$ ordered arrangements. When the items must be distinct the count is $P(n, m) = n!/(n-m)!$ instead.
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
