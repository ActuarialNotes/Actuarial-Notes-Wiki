---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:3078d23dcf7024785a503f63eac61e6428f0ce198959b715eec169957d011f50
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Def. 1.3 p.25 (PDF p.33); §3.1 Def. 3.2, Thms 3.1-3.2 p.80 (PDF p.88); §3.2 Thm 3.5 and n!/(j!(n-j)!) pp.94-95 (PDF pp.102-103), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, p.1 learning outcome 1b, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §3.1 A Counting Technique p.76 (PDF p.84); Ex. 3.6 Poker Hands p.95 (PDF p.103); Historical Remarks, derangements w_1=0, w_2=1 (PDF pp.93-94), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "H. Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), fetched 2026-10-30, §2.1.0 Counting (multiplication principle) sha256:342319616112f470d1ff3cef050a29341a88a548e285cb6a328a2729d52b50df — https://www.probabilitycourse.com/chapter2/2_1_0_counting.php; §2.1.1 Ordered Sampling with Replacement (n options for each of k positions) sha256:fa301b74fb68f1fa983074b20a905e02c78520c4d5881b98cef798b9b9fce90a — https://www.probabilitycourse.com/chapter2/2_1_1_ordered_with_replacement.php; §2.1.2 Ordered Sampling without Replacement sha256:ea03a74b8351fba96d351a027350a67fa84dbc937f05aa938c98ea34ee33cdb0 — https://www.probabilitycourse.com/chapter2/2_1_2_ordered_without_replacement.php"
    - "K. Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random Services), fetched 2026-10-30, Finite Sampling Models §6 The Matching Problem (derangements; b_n(0) = n! Σ (-1)^j/j! by inclusion-exclusion with #{X_i=i, i∈J} = (n-j)! and C(n,j) sets J) sha256:6c44b9152bd3fe3f4e53e442c55bb21d299ee229e7ae996e5bb893b424b2857f — https://www.randomservices.org/random/urn/Matching.html; §1 Introduction (X_i uniformly distributed on D for each i) sha256:32cb2b68070d4a61c61ff3772b9eb371ed582196aa3d7ec4ad65c254056d22fe — https://www.randomservices.org/random/urn/Introduction.html; §4 Order Statistics (given X_i = x, X_j uniform on D∖{x}) sha256:8b4b38e1ca6a79fcc598b1bebf75fc7b9694f0592411d2ef539a6c727f139c77 — https://www.randomservices.org/random/urn/OrderStatistics.html; Foundations §1.8 Combinatorial Structures, round-table exercise ('Seat one, distinguished person arbitrarily') sha256:63ef90fd651593defb33d7772ecbe92f6198b6b655219a5cb726c76cdc393ccb — https://www.randomservices.org/random/foundations/Structures.html"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §3.1 A Counting Technique (PDF p.84: N = n1·n2·…·nr), Thm 3.1 n·(n−1)·…·1 and Thm 3.2 (PDF p.88); Thm 3.5 C(n,j)=(n)_j/j! (PDF p.102), read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "K. Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random Services), Foundations §1.8 Combinatorial Structures, fetched 2026-11-04: samples classed by whether order is important and whether objects are replaced (n^k; n^(k)); each combination has k! orderings, n^(k)=C(n,k)k!; committee then officers C(n,k)k^(j); distinguishable permutations of n objects with n_i identical of type i = n!/(n_1!…n_k!); round table (n−1)!, sha256:63ef90fd651593defb33d7772ecbe92f6198b6b655219a5cb726c76cdc393ccb — https://www.randomservices.org/random/foundations/Structures.html"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §2.1.3 Unordered Sampling without Replacement, fetched 2026-11-04: 'at least one ace' via the complement 1−C(48,3)/C(52,3), sha256:52a6cbe27c0bca8f163590511a11a4fd49e832983d99ea4080a88576e6d03d6e — https://www.probabilitycourse.com/chapter2/2_1_3_unordered_without_replacement.php"
    - "University of Washington CSE 312 (Summer 2025), lecture 04 'Counting & Probability', slides 9-11 (PDF pp.9-11): 'A Solution with a Problem' — choosing three aces then any of the remaining cards counts the same hand by two different choices; fix by disjoint cases (exactly 3, exactly 4) and the sum rule, sha256:c4fa59f36b5e5807d7b5a2e6be22f69c56afcee00c9b72bd3f0ab72f8a2521eb — https://courses.cs.washington.edu/courses/cse312/25su/lecture/04-counting-probability.pdf"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability learning outcomes a-g (PDF p.2) and Topic 2 learning outcome b (PDF p.3), read 2026-11-04 for the objective numbers in the exam tip, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §3.1 Theorems 3.1-3.2 and n! (p.80, PDF p.88), read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Combinatorics.md
---

**Combinatorics** is the branch of [[Discrete Mathematics|discrete mathematics]] that counts the ways to arrange, select or partition objects. In probability it counts the outcomes of an experiment whose outcomes are equally likely.

> $$P(A) = \frac{|A|}{|S|}$$

> $$n! = n \times (n-1) \times \cdots \times 2 \times 1$$

- $|A|$ is the number of outcomes in the event $A$ and $|S|$ the number in the sample space. The first formula needs every outcome to be equally likely.
- $n!$ is the number of ways to arrange $n$ distinct objects in a row.
- The two basic problems are **ordered** arrangements, [[Permutation|permutations]], and **unordered** selections, [[Combination|combinations]].

> [!idea] The idea
> When every outcome is equally likely, a probability is a count over a count. Almost every count is built in stages: multiply the number of choices at each stage. Before counting, settle two things: whether repetition is allowed, and whether the order of the choices matters. When it doesn't, divide out the orderings that were counted as different.

![[Media/Figures/Combinatorics.svg|340]]

## Probability as counting

A box holds 12 claim files: 5 auto, 4 home and 3 workers compensation. Three files are drawn at random without replacement. What is the probability that all three are auto?

Every set of 3 files is equally likely, and there are $\binom{12}{3} = 220$ of them. The sets of 3 auto files number $\binom{5}{3} = 10$.

> $$P(\text{all auto}) = \frac{10}{220} \approx 0.0455$$

## Build in stages and multiply

The **multiplication principle** says that if an outcome is built in stages, with $m_1$ choices at the first stage and $m_2$ at the second whatever was chosen first, there are $m_1 \times m_2 \times \cdots$ outcomes.

- Drawing the 3 files in order gives $12 \times 11 \times 10 = 1{,}320$ ordered draws.
- Each set of 3 files appears $3! = 6$ times among them, once per ordering. So there are $1{,}320 / 6 = 220$ sets.
- Counted in order, the all-auto draws number $5 \times 4 \times 3 = 60$, and $60 / 1{,}320$ is again about 0.0455.

> [!trap] Numerator and denominator on different footings
> Counting the event in order and the sample space without order puts the answer off by a factor of $3!$. Decide once whether order matters, and count both that way.

## With or without replacement

Three new claims are each assigned to one of 4 adjusters, and an adjuster may get more than one. Each claim has 4 choices, so there are $4^3 = 64$ assignments. If the three claims must go to different adjusters, there are $4 \times 3 \times 2 = 24$.

- With repetition allowed, $m$ positions with $n$ choices each give $n^m$ ordered arrangements.
- With distinct items, the count is $P(n, m) = n!/(n - m)!$ ordered, or $\binom{n}{m}$ unordered.
- If the assignments are equally likely, all three claims go to different adjusters with probability $24/64 = 0.375$.

## One of each, and at least one

Back to the 12 files. One file of each type can be drawn in $5 \times 4 \times 3 = 60$ ways, a product of one choice per type. The probability is $60 / 220 \approx 0.273$.

At least one workers compensation file is easiest by the complement. The draws with none choose all 3 from the other 9 files.

> $$P(\text{at least one WC}) = 1 - \frac{\binom{9}{3}}{220} = 1 - \frac{84}{220} \approx 0.618$$

Choosing one WC file first and then any 2 of the other 11 gives $3 \times 55 = 165$, not 136. A draw with two WC files is counted twice, once for each WC file chosen "first".

## Repeated values and symmetry

A count with one repeated value is built in stages too. Choose the repeated value, then choose which positions hold it, then fill the remaining positions with different values.

In a uniformly random seating or ordering, each person is equally likely to be in any position. So one person's position can be fixed without loss of generality, and another given person is then equally likely to be in each remaining position. Around a round table of 8, two given people sit next to each other with probability $2/7$: fix the first, and the second has 7 equally likely seats, 2 of them adjacent.

## Derangements

A **derangement** is a permutation of $n$ items in which no item stays in its original position. The number of derangements is written $D_n$.

- A permutation that fixes a chosen set of $k$ items arranges the other $n - k$ freely, in $(n - k)!$ ways. There are $\binom{n}{k}$ such sets.
- By the [[Inclusion-Exclusion Principle|inclusion-exclusion principle]] over the fixed items, the permutations with at least one fixed point number:

> $$\sum_{k=1}^{n} (-1)^{k+1}\binom{n}{k}(n-k)!$$

- Subtracting that from $n!$ gives the derangements.

> $$D_n = n!\sum_{k=0}^{n}\frac{(-1)^k}{k!}$$

- For example, $D_3 = 3!\left(1 - 1 + \frac{1}{2} - \frac{1}{6}\right) = 2$. Of the six orderings of three items, only the two cyclic shifts move every item.
- If 4 adjusters' files are handed back at random, nobody gets their own with probability $D_4 / 4! = 9/24 = 0.375$.

## On other exams

**MAS-I** counts the minimal path sets of a reliability system. In a $k$-out-of-$n$ system, a minimal path set is any set of exactly $k$ working components, so there are $\binom{n}{k}$ of them. For two systems in series, a minimal path set takes one from each system, so the counts multiply.

## Try it

> [!example]- A lottery draw {Example}
> A lottery draws 3 numbers from $\{1, 2, 3, 4, 5\}$ without replacement. How many equally likely outcomes are there if order does not matter?
>
> > [!answer]-
> > **Plan:** order is irrelevant and there is no replacement, so count combinations.
> > $$\binom{5}{3} = \frac{5!}{3!\,2!} = 10$$
> > Each outcome has probability $1/10$.

> [!example]- Strings with exactly one pair {Example}
> How many 4-digit strings, digits 0 to 9 with leading zeros allowed, contain one digit exactly twice and two other digits once each?
>
> > [!answer]-
> > **Plan:** choose the repeated digit, then its positions, then fill the other two positions in order.
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

> [!example]- At least two of a type {Example}
> A committee of 4 is chosen at random from 6 actuaries and 5 underwriters. Find the probability that it includes at least 2 actuaries.
>
> > [!answer]-
> > **Plan:** count each case, exactly 2, 3 or 4 actuaries, as a product of combinations, and add.
> > $$
> > \begin{align*}
> > \text{exactly 2} &: \binom{6}{2}\binom{5}{2} = 150 \\
> > \text{exactly 3} &: \binom{6}{3}\binom{5}{1} = 100 \\
> > \text{exactly 4} &: \binom{6}{4} = 15
> > \end{align*}
> > $$
> > The probability is $265 / \binom{11}{4} = 265/330 \approx 0.803$.

> [!warning]- Exam traps
> - **Numerator and denominator on different footings.** Count both ordered, or both unordered.
> - **Overcounting "at least one".** Choosing one item of the type first and then "any" for the rest counts a selection several times. Count by cases or take the complement of "none".
> - **With and without replacement.** $n^m$ is for repetition allowed. "Without replacement", "different" and "distinct" mean $P(n, m)$ or $\binom{n}{m}$.
