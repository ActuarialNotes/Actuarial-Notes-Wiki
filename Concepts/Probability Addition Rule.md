---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:cb8eba4193fba4ef7d9269b36338f28ff932240dd63f8c86dafa53cea70edcbc
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

![[Media/Figures/Probability_Addition_Rule.svg|340]]

The **Probability Addition Rule** gives the [[Probability|probability]] that at least one of two [[Event|events]] occurs. For events $E$ and $F$, that probability is

> $$P(E \cup F) = P(E) + P(F) - P(E \cap F)$$

- $P(E \cap F)$ is the probability that both $E$ and $F$ occur.

When $E$ and $F$ are [[Mutually Exclusive Events|mutually exclusive]], $P(E \cap F) = 0$ and the rule is the sum $P(E) + P(F)$.

> [!idea] The idea
> Adding $P(E)$ and $P(F)$ counts the outcomes in both events twice, so the overlap is subtracted once.

> [!example]- Over a year, 30% of an insurer's policyholders file a property claim, 20% file a liability claim and 8% file both. What is the probability that a policyholder files at least one of the two? {Example}
> - Let $E$ be "a property claim" and $F$ be "a liability claim".
> - The probability of at least one is $P(E \cup F)$, which is $0.30 + 0.20 - 0.08 = 0.42$.

## Counting the elements of a union

The same rule counts the elements of a union of two sets:

> $$|E \cup F| = |E| + |F| - |E \cap F|$$

> [!example]- An agent has 100 clients. 60 have an auto policy, 45 have a homeowners policy and 25 have both. How many clients have neither policy? {Example}
> - The clients with at least one policy number $60 + 45 - 25 = 80$.
> - Neither is the rest of the 100, so $100 - 80 = 20$ clients have neither policy.

## Finding the probability of an intersection

When the union is known, the rule gives the probability that both events occur:

> $$P(E \cap F) = P(E) + P(F) - P(E \cup F)$$

> [!example]- A policyholder has probability 0.75 of no emergency room visit this year, 0.80 of no hospital stay and 0.62 of neither. What is the probability of at least one emergency room visit and at least one hospital stay? {Example}
> - Let $E$ be "at least one emergency room visit" and $F$ be "at least one hospital stay", so $P(E) = 0.25$ and $P(F) = 0.20$.
> - "Neither" is the complement of the union, so $P(E \cup F) = 1 - 0.62 = 0.38$.
> - The probability of both is $P(E \cap F)$, which is $0.25 + 0.20 - 0.38 = 0.07$.

For three or more events, the rule extends to the [[Inclusion-Exclusion Principle|inclusion-exclusion principle]].

## Exactly one of two events

The event that exactly one of $E$ and $F$ occurs is the union with the intersection taken out. Its probability is

> $$P(E \cup F) - P(E \cap F)$$

By the addition rule, this is $P(E) + P(F) - 2P(E \cap F)$.

## Exactly two of three events

For three events $E$, $F$ and $G$, each region where exactly two occur is a pairwise intersection less the triple intersection. The probability that exactly two occur is

> $$P(E \cap F) + P(E \cap G) + P(F \cap G) - 3P(E \cap F \cap G)$$

When the triple intersection is empty, the probability that exactly two occur is the sum of the pairwise intersection probabilities.

## When the overlap is not given

If $P(E \cap F)$ is not given, it is only bounded. The intersection lies inside both events, so its probability is at most the smaller of $P(E)$ and $P(F)$. Since $P(E \cup F) \leq 1$, the addition rule forces $P(E \cap F) \geq P(E) + P(F) - 1$. The bounds are

> $$\max(0,\ P(E) + P(F) - 1) \leq P(E \cap F) \leq \min(P(E),\ P(F))$$

So $P(E \cup F)$ ranges from $\max(P(E), P(F))$, when one event contains the other, up to $\min(1, P(E) + P(F))$.

> [!trap] Independent read as mutually exclusive
> [[Independent Events|Independent]] events with positive probabilities overlap, with $P(E \cap F) = P(E)\,P(F)$. If property and liability claims were independent, the overlap would be $0.30 \times 0.20 = 0.06$ and the union $0.30 + 0.20 - 0.06 = 0.44$. The plain sum, $0.50$, is wrong.
