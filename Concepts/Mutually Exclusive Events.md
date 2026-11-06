---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:f053b9a5905e40664ab2e0a04cee29edcb1fa3192196f891e42738e9052e98e1
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Thm 1.1 properties 4-5 (pp.22-23, PDF pp.30-31), Thm 1.2 (p.23, PDF p.31), Thm 1.4 (p.24, PDF p.32), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.2.2 Set Operations (difference, disjoint sets, partition), fetched 2026-09-28, sha256:f8c7bf7ece0a23a177de9f1eeff3631122625cb461fde905f05d4fa468ad03ba — https://www.probabilitycourse.com/chapter1/1_2_2_set_operations.php"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcomes 1a-1g (PDF p.2), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Thm 1.1 properties 1 and 3 (p.22, PDF p.30), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, §2.3 Probability Measures, increasing property, sha256:381bc53d4a8e0bf0259a5ce1093eb2d759a56e205c38c362ddb3b1a03879c7e6 — https://www.randomservices.org/random/prob/Probability.html"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Thm 1.1 properties 4-5 (pp.22-23, PDF pp.30-31), Thm 1.2 and Thm 1.3 (p.23, PDF p.31); §4.1 Def. 4.1 (p.139, PDF p.147) and Thm 4.1 independence iff P(E∩F)=P(E)P(F) (p.140, PDF p.148), read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.2.2 Set Operations (mutually exclusive / disjoint sets; partitions), fetched 2026-11-04, sha256:4025d5e8caa7de295a64d919f3cfc5b2f48996971272f227a574e5e7c4c5f9fd — https://www.probabilitycourse.com/chapter1/1_2_2_set_operations.php"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcomes a-g (PDF p.2; vault Exam P-1 page numbers them 1-7), re-read 2026-11-04, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 set operations and Venn Fig. 1.7, Thm 1.1-1.4 incl. Thm 1.4 proof 'added twice' (pp.21-24, PDF pp.29-32); Infinite Sample Spaces (pp.28-29, PDF pp.36-37), read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Mutually Exclusive Events.md
---

Two [[Event|events]] $A$ and $B$ are **Mutually Exclusive** (disjoint) if they cannot both occur. Their intersection is empty, so its probability is 0.

> $$A \cap B = \emptyset \implies P(A \cap B) = 0$$

- For mutually exclusive events, the [[Probability Addition Rule|addition rule]] reduces to $P(A \cup B) = P(A) + P(B)$.
- The same holds for any finite collection. If $A_1, \ldots, A_n$ are pairwise mutually exclusive, the probability of their union is $\sum_{i=1}^n P(A_i)$.
- Mutually exclusive is not the same as [[Independent Events|independent]]. Two mutually exclusive events that each have positive probability are never independent.

> [!idea] The idea
> Adding the probabilities of two events usually counts their overlap twice. Mutually exclusive events have no overlap to double count, so their probabilities simply add.

![[Media/Figures/Mutually_Exclusive_Events.svg|340]]

## Events that cannot happen together

Let $N$ be the number of claims a policyholder files in a year.

| Claims $N$ | Probability |
|---|---|
| 0 | 0.60 |
| 1 | 0.25 |
| 2 | 0.10 |
| 3 or more | 0.05 |

"No claims" and "exactly one claim" cannot both happen, so they are mutually exclusive. The probability of at most one claim is $0.60 + 0.25 = 0.85$.

Now take "at most one claim" and "at least one claim". Their probabilities are 0.85 and 0.40, which add to 1.25. A probability above 1 shows the events overlap: both contain $N = 1$. The addition rule gives the right answer.

> $$P(N \le 1 \text{ or } N \ge 1) = 0.85 + 0.40 - 0.25 = 1$$

## Mutually exclusive and exhaustive: one minus the rest

The four rows of the table are mutually exclusive, and together they cover every outcome. Classes like these form a partition, and their probabilities add to 1. So any one class's probability is 1 minus the others.

> $$P(N \ge 3) = 1 - 0.60 - 0.25 - 0.10 = 0.05$$

This is how a question that classifies every claim into exactly one type, or every patient into exactly one stage, is solved for a single class.

## Overlapping ranges, made disjoint

"One or two claims" has probability 0.35 and "two or more claims" has probability 0.15. Both include $N = 2$, so their probabilities cannot be added. Break the union into pieces that do not overlap: $\{1\}$, $\{2\}$ and $\{3 \text{ or more}\}$.

> $$P(N \ge 1) = 0.25 + 0.10 + 0.05 = 0.40$$

The addition rule agrees: $0.35 + 0.15 - 0.10 = 0.40$. Ranges of a time or an amount, such as calls lasting 2 to 4 minutes and calls lasting 3 to 5 minutes, overlap the same way.

## Mutually exclusive is not independent

Learning that a policyholder filed no claims says for certain that they did not file exactly one. So $P(N = 1 \mid N = 0) = 0$, while $P(N = 1) = 0.25$. Mutually exclusive events are as dependent as two events can be.

- Independence would need $P(A \cap B) = P(A)\,P(B) = 0.60 \times 0.25 = 0.15$.
- Mutual exclusivity forces $P(A \cap B) = 0$.
- Both can hold only when one of the events has probability 0.

> [!trap] Mutually exclusive taken for independent
> If $A$ and $C$ are mutually exclusive, $P(A \cap C) = 0$, not $P(A)\,P(C)$. Multiplying puts a positive overlap into the addition rule and understates the union.

## Three or more events

If $A$ and $C$ are mutually exclusive, every intersection that contains both of them is empty too. For any event $B$, $A \cap B \cap C$ lies inside $A \cap C$.

> $$A \cap C = \emptyset \implies P(A \cap B \cap C) = 0$$

- In the three-event addition rule, the $P(A \cap C)$ and $P(A \cap B \cap C)$ terms then both vanish.
- If $C$ is mutually exclusive with both $A$ and $B$, then $A \cap B \cap C$ lies inside each of $A \cap C$ and $B \cap C$. It is empty and has probability 0.
- Questions often mix the two kinds of pair: one pair independent, another mutually exclusive. Each pair's overlap is then a product or a zero.

## Try it

> [!example]- Classifying claims {Example}
> Each claim is classified as exactly one of property damage $D$, bodily injury $B$, or other. $P(D) = 0.60$ and $P(B) = 0.35$. Find the probability that a claim is property damage or bodily injury, and the probability that it is "other".
>
> > [!answer]-
> > **Plan:** the classes are mutually exclusive and exhaustive, so add two of them and take the third as the complement.
> > $$P(D \cup B) = 0.60 + 0.35 = 0.95$$
> > $$P(\text{other}) = 1 - 0.95 = 0.05$$

> [!example]- One independent pair, one exclusive pair {Example}
> $P(A) = 0.3$, $P(B) = 0.4$ and $P(C) = 0.2$. $A$ and $B$ are independent, and $C$ is mutually exclusive with both $A$ and $B$. Find $P(A \cup B \cup C)$.
>
> > [!answer]-
> > **Plan:** fill each overlap term from the relationship of its pair, then apply the three-event rule.
> >
> > $P(A \cap B) = 0.3 \times 0.4 = 0.12$. The overlaps with $C$, and the triple, are 0.
> > $$
> > \begin{align*}
> > P(A \cup B \cup C) &= 0.3 + 0.4 + 0.2 - 0.12 \\
> > &= 0.78
> > \end{align*}
> > $$

> [!example]- Overlapping call lengths {Example}
> 40% of calls last 2 to 4 minutes, 30% last 3 to 5 minutes and 15% last 3 to 4 minutes. Find the share of calls lasting 2 to 5 minutes.
>
> > [!answer]-
> > **Plan:** split the range into disjoint pieces.
> >
> > 2 to 3 minutes: $0.40 - 0.15 = 0.25$. 3 to 4 minutes: $0.15$. 4 to 5 minutes: $0.30 - 0.15 = 0.15$.
> >
> > Total: $0.25 + 0.15 + 0.15 = 0.55$.
> > Adding 0.40 and 0.30 counts the 3 to 4 minute calls twice.

> [!warning]- Exam traps
> - **Mutually exclusive taken for independent.** The overlap is 0, not a product.
> - **Adding probabilities of events that overlap.** Split overlapping ranges into disjoint pieces first.
> - **Exclusive but not exhaustive.** "1 minus the rest" gives a class's probability only when the classes cover every outcome. Otherwise the remainder includes outcomes in none of the listed classes.
