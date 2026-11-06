---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:c1acf540720ef37993aa81061d5f49ef4d35d686d7603149d4c5bebe0704b141
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Thm 1.1 property 4, Thm 1.2 (pairwise disjoint), Thm 1.3 (P(E)=Σ P(E∩A_i) over a partition), Thm 1.4 with proof 'added twice … subtracted once' (pp.22-24, PDF pp.30-32), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §3.2 Thm 3.8 Inclusion-Exclusion Principle and proof: an outcome in k sets counted C(k,1)−C(k,2)+…=1 times (pp.104-105, PDF pp.112-113), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 Def. 4.1 independence (either event probability 0 counts as independent), Thm 4.1 independent iff P(E∩F)=P(E)P(F) (pp.139-140, PDF pp.147-148); Def. 4.2 mutual independence over every subset, pairwise does not imply mutual (p.141, PDF p.149); Exercise 7: A heads on first toss, B heads on second, C tosses match are pairwise independent but not independent (PDF p.159), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §1.3.3 Finding Probabilities (P(A−B)=P(A)−P(A∩B); inclusion-exclusion for two and three events; complement), read 2026-11-06, sha256:256f9c0f56e043d695aa7631cad51a37c5fcffc82a2c24ff9ab5519641f8025b — https://www.probabilitycourse.com/chapter1/1_3_3_finding_probabilities.php"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §1.4.1 Independence (complements of independent events independent; P(∪A_i)=1−∏(1−P(A_i)); warning not to confuse independence with disjointness), read 2026-11-06, sha256:fcf1aacf872ba059ed46a7a386f0e4725016d0ae10db09bd5d4f77d9883c35a7 — https://www.probabilitycourse.com/chapter1/1_4_1_independence.php"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), Probability Spaces > Probability Measures (Boole's inequality; Bonferroni two-event bounds P(A)+P(B)−1 ≤ P(A∩B) ≤ P(B); general Bonferroni inequalities: truncated inclusion-exclusion sum is an upper bound if it ends on a positive term (m odd), lower bound if negative), read 2026-11-06, sha256:381bc53d4a8e0bf0259a5ce1093eb2d759a56e205c38c362ddb3b1a03879c7e6 — https://www.randomservices.org/random/prob/Probability.html"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability learning outcomes a-g (PDF p.2), Topic 2 outcome b (PDF p.3), read 2026-11-06, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Probability Addition Rule.md
---

The **Probability Addition Rule** gives the probability that at least one of two [[Event|events]] $A$ or $B$ occurs. It adds the two probabilities and subtracts the probability that both occur, so the overlap is counted once.

> $$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$

- $A \cup B$ is "$A$ or $B$ or both" and $A \cap B$ is "both $A$ and $B$".
- When $A$ and $B$ are [[Mutually Exclusive Events|mutually exclusive]], $P(A \cap B) = 0$ and the rule reduces to $P(A) + P(B)$.
- When $A$ and $B$ are [[Independent Events|independent]], $P(A \cap B) = P(A)\,P(B)$.
- The rule for any number of events is the [[Inclusion-Exclusion Principle|inclusion-exclusion principle]].

> [!idea] The idea
> Adding $P(A)$ and $P(B)$ counts every outcome in both events twice. The addition rule subtracts the overlap once, so each outcome in $A \cup B$ is counted exactly once. The larger the overlap, the smaller the union.

![[Media/Figures/Probability_Addition_Rule.svg|340]]

## Why not just add?

Over a year, 30% of an insurer's homeowners policyholders file a property claim and 20% file a liability claim. 8% file both. Out of 100 policyholders, the four regions are:

| | Liability | No liability | Total |
|---|---|---|---|
| Property | 8 | 22 | 30 |
| No property | 12 | 58 | 70 |
| Total | 20 | 80 | 100 |

Adding 30 and 20 gives 50. But the 8 policyholders with both claims are in the 30 and in the 20, so they were counted twice. The policyholders with at least one claim are $22 + 8 + 12 = 42$.

> $$P(\text{property} \cup \text{liability}) = 0.30 + 0.20 - 0.08 = 0.42$$

## Only one, exactly one, neither

Questions often ask for a region other than the union. Each one is read off the same table.

- **Property but not liability** is the property total less the overlap.

> $$P(A \cap B^c) = P(A) - P(A \cap B)$$

- On the example this is $0.30 - 0.08 = 0.22$.
- **Exactly one** claim type is the two "only" regions added, $0.22 + 0.12 = 0.34$. The overlap is subtracted twice, once from each event.

> $$P(\text{exactly one of } A, B) = P(A) + P(B) - 2P(A \cap B)$$

- The same answer is the union less the overlap, $0.42 - 0.08 = 0.34$.
- **Neither** is the complement of the union, $1 - 0.42 = 0.58$.

Exam questions often state the events in complement form, such as "no emergency room visits" or "neither". Turn each statement into $P(A)$, $P(B)$ or $P(A \cup B)$ first, then solve the addition rule for the missing piece.

## Mutually exclusive or independent?

The overlap term is where the two most common assumptions about events enter.

- If property and liability claims were **mutually exclusive**, no one could file both. The overlap would be 0 and the union would be 0.50.
- If they were **independent**, the overlap would be $0.30 \times 0.20 = 0.06$ and the union would be $0.30 + 0.20 - 0.06 = 0.44$.
- Independent events with positive probabilities do overlap. Exactly one of them then occurs with probability $P(A)(1 - P(B)) + (1 - P(A))P(B)$.

> [!trap] Independent read as mutually exclusive
> Independent events overlap, with $P(A \cap B) = P(A)\,P(B)$. Adding their probabilities gives 0.50 here instead of 0.44. The plain sum is usually among the options.

## Three events

Add a third claim type. 25% of policyholders file a glass claim $C$. The overlaps are $P(A \cap C) = 0.10$, $P(B \cap C) = 0.05$, and 3% file all three.

> $$
> \begin{align*}
> P(A \cup B \cup C) &= P(A) + P(B) + P(C) \\
> &\quad - P(A \cap B) - P(A \cap C) - P(B \cap C) \\
> &\quad + P(A \cap B \cap C)
> \end{align*}
> $$

- On the example, $0.75 - 0.23 + 0.03 = 0.55$.
- A policyholder with all three claims is added three times by the single events and subtracted three times by the pairs. The last term adds them back once.
- Each "exactly two" region is a pairwise overlap less the triple overlap. The three regions together hold $0.23 - 3(0.03) = 0.14$.

> $$
> \begin{aligned}
> P(\text{exactly two}) = {}& P(A \cap B) + P(A \cap C) + P(B \cap C) \\
> &- 3P(A \cap B \cap C)
> \end{aligned}
> $$

- When the triple overlap is empty, exactly two occur with probability equal to the sum of the pairwise overlaps.
- When some pairs are mutually exclusive, only the other pairs contribute. If $A \cap C$ and $B \cap C$ are both empty, exactly two can occur only as $A \cap B$, so the probability is $P(A \cap B)$.

## When the overlap is not given

Suppose only $P(A) = 0.30$ and $P(B) = 0.20$ are known. Then $P(A \cap B)$ is not determined, only bounded.

- The overlap lies inside both events, so it is at most the smaller probability, 0.20.
- The union is at most 1, so the addition rule forces $P(A \cap B) \ge P(A) + P(B) - 1$. Here that lower bound is negative, so the overlap can be 0.

> $$\max(0,\ P(A) + P(B) - 1) \le P(A \cap B) \le \min(P(A),\ P(B))$$

- The union therefore runs from $\max(P(A), P(B))$, when one event contains the other, up to $\min(1,\ P(A) + P(B))$. On the example, it lies between 0.30 and 0.50.

## Try it

> [!example]- Given in complement form {Example}
> A medical policyholder has probability 0.75 of no emergency room visits this year, 0.80 of no hospital stays, and 0.62 of neither. Find the probability of at least one emergency room visit and at least one hospital stay.
>
> > [!answer]-
> > **Plan:** turn each statement into a probability of an event, then solve the addition rule for the overlap.
> >
> > Let $E$ be at least one emergency room visit and $H$ at least one hospital stay. Then $P(E) = 0.25$, $P(H) = 0.20$ and $P(E \cup H) = 1 - 0.62 = 0.38$.
> > $$
> > \begin{align*}
> > P(E \cap H) &= P(E) + P(H) - P(E \cup H) \\
> > &= 0.25 + 0.20 - 0.38 \\
> > &= 0.07
> > \end{align*}
> > $$
> > "Neither" is the complement of the union, not of the overlap.

> [!example]- Exactly one of two independent events {Example}
> A policyholder has an auto claim with probability 0.4 and a home claim with probability 0.25, independently. Find the probability of exactly one type of claim.
>
> > [!answer]-
> > **Plan:** add the two "only" regions, each a product because the events are independent.
> > $$
> > \begin{align*}
> > P(\text{exactly one}) &= 0.4(0.75) + 0.6(0.25) \\
> > &= 0.30 + 0.15 \\
> > &= 0.45
> > \end{align*}
> > $$
> > Check: $P(A \cup B) = 0.4 + 0.25 - 0.10 = 0.55$, and $0.55 - 0.10 = 0.45$.

> [!example]- A range, not a value {Example}
> Only $P(A) = 0.5$ and $P(B) = 0.7$ are known. What values can $P(A \cup B)$ and $P(\text{neither})$ take?
>
> > [!answer]-
> > **Plan:** bound the overlap, then carry the bounds through the addition rule.
> >
> > $P(A \cap B)$ lies between $0.5 + 0.7 - 1 = 0.2$ and $\min(0.5, 0.7) = 0.5$. So $P(A \cup B) = 1.2 - P(A \cap B)$ lies between 0.7 and 1, and $P(\text{neither})$ lies between 0 and 0.3.
> > Assuming independence would give the single value 0.85, which the question did not license.

> [!warning]- Exam traps
> - **Independent read as mutually exclusive.** Independent events overlap by $P(A)\,P(B)$. The plain sum overstates the union.
> - **The triple term left off.** Stopping after the pairwise subtractions undercounts the union by $P(A \cap B \cap C)$.
> - **The union given for "exactly one".** "At least one" subtracts the overlap once. "Exactly one" subtracts it twice.
> - **One value when a range is asked.** Without $P(A \cap B)$, the answer is the interval the bounds allow.
