---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:33852686f92d3c4d67e00d760fb9a8afb570fc9b3d1ccc87ea8a5cd17b409bb5
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §3.2 Thm 3.8 Inclusion-Exclusion Principle and proof: an outcome in k sets counted C(k,1)−C(k,2)+…=1 times (pp.104-105, PDF pp.112-113), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Thm 1.1 property 4, Thm 1.2 (pairwise disjoint), Thm 1.3 (P(E)=Σ P(E∩A_i) over a partition), Thm 1.4 with proof 'added twice … subtracted once' (pp.22-24, PDF pp.30-32), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §3.1 Fixed Points and hat check problem, derangements (PDF pp.90, 93); Example 3.12: P(A_i)=(n−1)!/n!, P(no fixed point)=1/2!−1/3!+…+(−1)^n/n!, table n=4: .375 (pp.105-106, PDF pp.113-114), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), Probability Spaces > Probability Measures (Boole's inequality; Bonferroni two-event bounds P(A)+P(B)−1 ≤ P(A∩B) ≤ P(B); general Bonferroni inequalities: truncated inclusion-exclusion sum is an upper bound if it ends on a positive term (m odd), lower bound if negative), read 2026-11-06, sha256:381bc53d4a8e0bf0259a5ce1093eb2d759a56e205c38c362ddb3b1a03879c7e6 — https://www.randomservices.org/random/prob/Probability.html"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §1.3.3 Finding Probabilities (P(A−B)=P(A)−P(A∩B); inclusion-exclusion for two and three events; complement), read 2026-11-06, sha256:256f9c0f56e043d695aa7631cad51a37c5fcffc82a2c24ff9ab5519641f8025b — https://www.probabilitycourse.com/chapter1/1_3_3_finding_probabilities.php"
    - "CAS, Exam MAS-I Content Outline 2026, PDF p.3 (Domain A tasks, readings Daniel/Ross/Struppeck) and p.6 (Ross §§9.1-9.6; James et al. Chapters 1-7), read 2026-11-06, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Ross, Introduction to Probability Models, 12th ed., printed Contents (library scan, TU Ilmenau via GBV), PDF p.6: Ch 9 Reliability Theory, 9.2.1 Minimal Path and Minimal Cut Sets, 9.3 Reliability of Systems of Independent Components, 9.4 Bounds on the Reliability Function, 9.4.1 Method of Inclusion and Exclusion, read 2026-11-06, sha256:0c754803d244fd8e3d9343742c99e98ded9a331894a833711e17b018622023dc — https://www.gbv.de/dms/ilmenau/toc/1665053453.PDF"
    - "Xing, ECE544 Lecture 11 Reliability Block Diagrams (UMass Dartmouth, Fall 2022), PDF pp.4-5 (series: functioning iff each component functions; parallel: at least one), p.9 (path sets, cut sets, minimal cut set: a set of components whose failure causes the system to fail), p.11 (system failure = all events in one or more mincuts; inclusion/exclusion), read 2026-11-06, sha256:725a5930f8439e9627f9139b86e6a48341b4f0b0b56f6b4330ad3e3d801f1c97 — https://xingteaching.sites.umassd.edu/files/2022/10/Lecture11-s.pdf"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability learning outcomes a-g (PDF p.2), Topic 2 outcome b (PDF p.3), read 2026-11-06, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
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
