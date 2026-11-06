---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:e3255a96c119efaac9a1dd0a1b038135a58c5c7804c22a09c8345c0159ffd1af
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Thm 1.1 property 4, Thm 1.2 (pairwise disjoint), Thm 1.3 (P(E)=Σ P(E∩A_i) over a partition), Thm 1.4 with proof 'added twice … subtracted once' (pp.22-24, PDF pp.30-32), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 Def. 4.1 independence (either event probability 0 counts as independent), Thm 4.1 independent iff P(E∩F)=P(E)P(F) (pp.139-140, PDF pp.147-148); Def. 4.2 mutual independence over every subset, pairwise does not imply mutual (p.141, PDF p.149); Exercise 7: A heads on first toss, B heads on second, C tosses match are pairwise independent but not independent (PDF p.159), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), Probability Spaces > Independence (disjoint events with positive probability are dependent; probability 0 or 1 events independent of every event; pairwise vs mutual independence; Reliability: series reliability p1…pn, parallel 1−∏(1−pi), k out of n system works iff at least k components work), read 2026-11-06, sha256:5f47788c1c3a1a7a6b7b916b9d339bb59184c723dc6d2ccd05fd1a11639054c9 — https://www.randomservices.org/random/prob/Independence.html"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §1.4.1 Independence (complements of independent events independent; P(∪A_i)=1−∏(1−P(A_i)); warning not to confuse independence with disjointness), read 2026-11-06, sha256:fcf1aacf872ba059ed46a7a386f0e4725016d0ae10db09bd5d4f77d9883c35a7 — https://www.probabilitycourse.com/chapter1/1_4_1_independence.php"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability learning outcomes a-g (PDF p.2), Topic 2 outcome b (PDF p.3), read 2026-11-06, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
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
