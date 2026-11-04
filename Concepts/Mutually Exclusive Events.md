---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:4079892b8aaa5d01958297ba9154ac4121fd05c15d02fe39d47cd292412c7e5c
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Thm 1.1 properties 4-5 (pp.22-23, PDF pp.30-31), Thm 1.2 (p.23, PDF p.31), Thm 1.4 (p.24, PDF p.32), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.2.2 Set Operations (difference, disjoint sets, partition), fetched 2026-09-28, sha256:f8c7bf7ece0a23a177de9f1eeff3631122625cb461fde905f05d4fa468ad03ba — https://www.probabilitycourse.com/chapter1/1_2_2_set_operations.php"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcomes 1a-1g (PDF p.2), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Thm 1.1 properties 1 and 3 (p.22, PDF p.30), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, §2.3 Probability Measures, increasing property, sha256:381bc53d4a8e0bf0259a5ce1093eb2d759a56e205c38c362ddb3b1a03879c7e6 — https://www.randomservices.org/random/prob/Probability.html"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Thm 1.1 properties 4-5 (pp.22-23, PDF pp.30-31), Thm 1.2 and Thm 1.3 (p.23, PDF p.31); §4.1 Def. 4.1 (p.139, PDF p.147) and Thm 4.1 independence iff P(E∩F)=P(E)P(F) (p.140, PDF p.148), read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.2.2 Set Operations (mutually exclusive / disjoint sets; partitions), fetched 2026-11-04, sha256:4025d5e8caa7de295a64d919f3cfc5b2f48996971272f227a574e5e7c4c5f9fd — https://www.probabilitycourse.com/chapter1/1_2_2_set_operations.php"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcomes a-g (PDF p.2; vault Exam P-1 page numbers them 1-7), re-read 2026-11-04, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Mutually Exclusive Events.md
---

Two events $A$ and $B$ are **Mutually Exclusive** (disjoint) if they cannot both occur simultaneously.

> $$A \cap B = \emptyset \implies P(A \cap B) = 0$$

- For mutually exclusive events, the [[Probability Addition Rule]] simplifies to $P(A \cup B) = P(A) + P(B)$
- The addition rule simplification extends to any finite collection: if $A_1, A_2, \ldots, A_n$ are pairwise mutually exclusive, then $P\!\left(\bigcup_{i=1}^n A_i\right) = \sum_{i=1}^n P(A_i)$
- Compared with [[Independent Events|independence]]: two mutually exclusive events that each have positive probability are never independent, because $P(A \cap B) = 0$ while $P(A)\,P(B) > 0$.

> [!idea] The idea
> Disjoint events have no overlap to double count, so their probabilities simply add. That is why splitting an outcome into classes that are mutually exclusive and cover every case is so useful: any one class's probability is 1 minus the others.

![[Media/Figures/Mutually_Exclusive_Events.svg|340]]

### Three or more events

- If $A$ and $C$ are mutually exclusive, every intersection that contains both of them is empty: $A \cap B \cap C \subseteq A \cap C = \emptyset$ for any event $B$, so $P(A \cap B \cap C) = 0$.

> $$A \cap C = \emptyset \implies P(A \cap B \cap C) = 0$$

- So in the three-event addition rule, the $P(A \cap C)$ and $P(A \cap B \cap C)$ terms both vanish when $A$ and $C$ are mutually exclusive.
- If $C$ is mutually exclusive with both $A$ and $B$, then $A \cap B \cap C$ is a subset of each of $A \cap C$ and $B \cap C$, so it is empty too and has probability 0.

> [!example]- Insurance Claim Type {Example}
> Each claim is classified as exactly one of property damage ($D$), bodily injury ($B$), or other. $P(D) = 0.60$ and $P(B) = 0.35$. Find the probability that a claim is property damage or bodily injury, and the probability that it is classified as other.
>
> > [!answer]-
> > Since $D$ and $B$ are mutually exclusive:
> > $$P(D \cup B) = P(D) + P(B) = 0.60 + 0.35 = 0.95$$
> > The three classes are mutually exclusive and cover every claim, so "other" is the complement of $D \cup B$:
> > $$P(\text{other}) = 1 - 0.95 = 0.05$$

> [!tip]- How it appears on the exam
> - **Exam P** (General Probability, objective 4): the page is tagged on 8 Exam P questions in the bank.
> - Three events where one pair, or two pairs, are mutually exclusive, so some intersections in the three-event addition rule vanish; often another pair is independent in the same question.
> - Classifications into exactly one category (cancer stages, claim types, call lengths), given probabilities of combined categories; solve for a single category.
> - Events defined in words over several periods (thefts per year, two groups of policyholders), where the task is to see which events cannot occur together.

> [!warning]- Exam traps
> - **Mutually exclusive taken for independent.** If $A$ and $C$ are mutually exclusive, $P(A \cap C) = 0$, not $P(A)\,P(C)$; multiplying puts a positive overlap into the addition rule and understates the union.
> - **Adding probabilities of events that overlap.** Calls lasting 2–4 minutes and calls lasting 3–5 minutes share the 3–4 minute range, so their percentages can't be added; break them into disjoint intervals first.
> - **Exclusive but not exhaustive.** "1 minus the rest" gives a category's probability only when the classes also cover every outcome; if they don't, the remainder includes outcomes in none of the listed classes.
