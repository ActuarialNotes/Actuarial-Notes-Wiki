---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:3f54272fdcf84c8d1cf39e0ee1842661eceb0fcf860b6441c9e40841b8a12345
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Thm 1.4 p.24 (PDF p.32), Thm 3.8 Inclusion-Exclusion Principle p.104 (PDF p.112), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA Exam P Sample Solutions (Aug 2026 revision), Q1 p.2 and Q100 p.30, sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "Siegrist, Random (randomservices.org, HTML fetched 2026-10-30), Probability Spaces > Probability Measures: Boole's inequality P(union A_i) <= sum P(A_i); general Bonferroni inequalities — the inclusion-exclusion sum truncated after m terms is an upper bound for P(union) if m is odd and a lower bound if m is even — https://www.randomservices.org/random/prob/Probability.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Inclusion-Exclusion Principle.md
---

The **Inclusion-Exclusion Principle** gives the probability, or the size, of a union of overlapping [[Event|events]]. It adds the single events, subtracts the pairwise intersections, adds back the triple intersections, and so on, so that no outcome is counted more than once.

> $$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$

> $$
> \begin{aligned}
> P(A \cup B \cup C) = {}& P(A) + P(B) + P(C) \\
> &- P(A \cap B) - P(A \cap C) - P(B \cap C) \\
> &+ P(A \cap B \cap C)
> \end{aligned}
> $$

> $$
> \begin{aligned}
> P\Big(\bigcup_{i=1}^{n} A_i\Big) = {}& \sum_i P(A_i) - \sum_{i<j} P(A_i \cap A_j) \\
> &+ \sum_{i<j<k} P(A_i \cap A_j \cap A_k) - \cdots \\
> &+ (-1)^{n+1} P(A_1 \cap \cdots \cap A_n)
> \end{aligned}
> $$

- The signs alternate by the number of events in the intersection: plus for one, minus for two, plus for three.
- The same formula holds for the number of elements in a union of sets, $|A \cup B| = |A| + |B| - |A \cap B|$. It relies on [[Set Operations|set operations]] for the unions and intersections.
- For [[Mutually Exclusive Events|disjoint]] events every intersection is empty, so the rule reduces to the sum of the probabilities.
- The two-event case is the [[Probability Addition Rule|probability addition rule]].

> [!idea] The idea
> An outcome in all three events is added three times by the single events and subtracted three times by the pairs. The triple term adds it back once, so it is counted once. The alternating signs do the same for an outcome in any number of the events.

![[Media/Figures/Inclusion-Exclusion_Principle.svg|340]]

## Counting a union of three groups

An insurer has 1,000 customers. 500 hold auto ($A$), 350 hold home ($H$) and 200 hold life ($L$). 150 hold auto and home, 80 hold auto and life, 60 hold home and life, and 30 hold all three. How many hold at least one policy?

> $$|A \cup H \cup L| = 1050 - 290 + 30 = 790$$

The seven regions of the diagram show where each count went.

| Region | Customers |
|---|---|
| Auto only | 300 |
| Home only | 170 |
| Life only | 90 |
| Auto and home only | 120 |
| Auto and life only | 50 |
| Home and life only | 30 |
| All three | 30 |

The regions add to 790. The other 210 customers hold none of the three.

## Why the signs alternate

Follow two customers through the formula.

- A customer with auto and home only is added twice, by $|A|$ and $|H|$, and subtracted once, by $|A \cap H|$. Net count: 1.
- A customer with all three is added 3 times, subtracted 3 times by the three pairs, and added once by the triple. Net count: 1.

An outcome in $m$ of the events is counted $\binom{m}{1} - \binom{m}{2} + \binom{m}{3} - \cdots = 1$ times, for any $m \ge 1$. That identity is why the formula works for any number of events.

## Solving for one region

Questions often ask for a single region, such as "auto, but neither home nor life". Work from the inside out: the triple intersection first, then the pairs less the triple, then the singles less everything inside them.

> $$|A \cap H^c \cap L^c| = |A| - |A \cap H| - |A \cap L| + |A \cap H \cap L|$$

- On the example, $500 - 150 - 80 + 30 = 300$, the first row of the table.
- A region outside all the events is the total less the union, $1000 - 790 = 210$.

## Stopping early gives bounds

When the higher intersections are unknown, a truncated sum still says something. These are the Bonferroni inequalities. Stopping after a plus term gives an upper bound, and stopping after a minus term gives a lower bound.

> $$P\Big(\bigcup_i A_i\Big) \le \sum_i P(A_i)$$

> $$P\Big(\bigcup_i A_i\Big) \ge \sum_i P(A_i) - \sum_{i<j} P(A_i \cap A_j)$$

- On the example, as probabilities, the singles give $1.05$. That upper bound is too large to help.
- Singles less pairs give $1.05 - 0.29 = 0.76$, a lower bound.
- Adding the triple gives the exact $0.79$. With three events, that is the last term.

## Counting arrangements

The principle also counts outcomes that avoid every one of several properties. The number of orderings of $n$ items in which no item stays in its original place, a derangement, comes from inclusion-exclusion over the items that do stay put. That count is worked on [[Combinatorics]].

## On other exams

**MAS-I** uses the principle for the reliability of a system built from independent components. With minimal cut sets $C_1, \ldots, C_m$, the system fails when every component in at least one cut set fails. The probability of failure is the probability of a union, so the Bonferroni bounds bracket it.

- The first bound, the sum over cut sets, is an upper bound on the probability of failure and so a lower bound on reliability.
- The second bound, singles less pairs, is a lower bound on failure and an upper bound on reliability.

## Try it

> [!example]- Three overlapping coverages {Example}
> A policyholder may file an auto, home or liability claim, each with probability 0.3. Each pairwise intersection has probability 0.1, and all three occur with probability 0.05. Find the probability of at least one claim.
>
> > [!answer]-
> > **Plan:** apply the three-event formula term by term.
> > $$
> > \begin{align*}
> > P(A \cup B \cup C) &= 0.9 - 0.3 + 0.05 \\
> > &= 0.65
> > \end{align*}
> > $$

> [!example]- Solving for an event from "neither" {Example}
> 20% of patients visit both a physical therapist and a chiropractor, and 15% visit neither. The probability of visiting a chiropractor exceeds the probability of visiting a therapist by 0.10. Find the probability of visiting a therapist.
>
> > [!answer]-
> > **Plan:** write the union from "neither", then solve the two-event formula for $P(T)$.
> > $$
> > \begin{align*}
> > 0.85 &= P(T) + (P(T) + 0.10) - 0.20 \\
> > 2P(T) &= 0.95 \\
> > P(T) &= 0.475
> > \end{align*}
> > $$

> [!example]- Bounds from partial information {Example}
> Four events each have probability 0.1, and each pair intersects with probability 0.01. Nothing is known about larger intersections. Bound the probability of the union.
>
> > [!answer]-
> > **Plan:** stop the sum after the singles, then after the pairs.
> >
> > Upper bound: $4(0.1) = 0.40$. Lower bound: $0.40 - 6(0.01) = 0.34$, since there are $\binom{4}{2} = 6$ pairs.
> > If the events were independent, the union would be $1 - 0.9^4 = 0.3439$, inside the bounds.

> [!warning]- Exam traps
> - **The triple term left off.** Stopping after the pairs gives a lower bound, not the answer.
> - **Subtracting the triple when isolating a region.** A single-only region is $|A| - |A \cap H| - |A \cap L| + |A \cap H \cap L|$. The triple is added back because both pairs removed it.
> - **The wrong direction of a bound.** Singles bound the union from above. Singles less pairs bound it from below.
