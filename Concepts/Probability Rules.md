---
verification:
  status: stale
  confidence: null
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:7e978d2892c0a73f3c929d802772d88a3ae960b6ac47b55efa91c093db752446
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Thm 1.1 property 5 (p.22, PDF p.30), Thm 1.4 (p.24, PDF p.32), Def. 4.1 (p.139, PDF p.147), Thm 4.1 (p.140, PDF p.148), Bayes formula and eqs. (4.2)-(4.3) (pp.145-146, PDF pp.153-154), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.3.2 Probability — Axioms of Probability, fetched 2026-09-28, sha256:ce6639e8688b5f1a5d2d5c4430f172a938d0a6573450984852a1415e28e93df1 — https://www.probabilitycourse.com/chapter1/1_3_2_probability.php"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Probability Rules.md
---

The **Probability Rules** are the identities, derived from the [[Axioms of Probability|axioms of probability]], that combine and decompose the [[Probability|probabilities]] of [[Event|events]]: the complement, addition, multiplication and total-probability rules.

The complement rule is that the probability that an event $E$ does not occur is

> $$P(E^c) = 1 - P(E)$$

- $E^c$ is the complement of $E$, the outcomes of the [[Sample Space|sample space]] $S$ that are not in $E$.

Read the other way, $P(E) = 1 - P(E^c)$. This is the faster route whenever the complement has fewer outcomes. The probability that at least one of several events occurs is 1 minus the probability that none of them occurs. For a count $N$, the event $N \ge k$ is the complement of $N \le k - 1$, so $P(N \ge k) = 1 - P(N \le k - 1)$.

> [!example]- Each of 5 independent policies files a claim with probability 0.10. What is the probability that at least one files a claim? {Example}
> - The complement of "at least one claim" is "no claims".
> - Each policy files no claim with probability $0.90$, and the policies are independent, so $P(\text{no claims}) = 0.90^5 = 0.59049$.
> - The probability of at least one claim is $1 - 0.59049 = 0.40951 \approx 0.41$.

## The addition rule

For events $E$ and $F$, the probability that at least one occurs, by the [[Probability Addition Rule|addition rule]], is

> $$P(E \cup F) = P(E) + P(F) - P(E \cap F)$$

- $P(E \cap F)$ is the probability that both occur.

The rule subtracts the overlap so that it is not counted twice. Adding $P(E)$ and $P(F)$ alone overstates the probability of the union of events that are not mutually exclusive. For [[Mutually Exclusive Events|mutually exclusive]] events the intersection is empty, and the rule reduces to $P(E) + P(F)$. Three or more events need the [[Inclusion-Exclusion Principle|inclusion-exclusion principle]]. The probability that neither event occurs is $1 - P(E \cup F)$, by the complement rule.

> [!example]- 60% of policyholders hold auto coverage, 45% hold home coverage and 25% hold both. What is the probability that a policyholder holds neither? {Example}
> - Let $E$ be "holds auto" and $F$ be "holds home".
> - The probability of holding at least one is $P(E \cup F) = 0.60 + 0.45 - 0.25 = 0.80$.
> - Holding neither is the complement, so its probability is $1 - 0.80 = 0.20$.

## The multiplication rule

For events $E$ and $F$, the probability that both occur, by the [[Probability Multiplication Rule|multiplication rule]], is

> $$P(E \cap F) = P(E \mid F)\,P(F)$$

- $P(E \mid F)$ is the [[Conditional Probability|conditional probability]] of $E$ given $F$.

The rule rearranges the definition of conditional probability, $P(E \mid F) = P(E \cap F)/P(F)$. It simplifies to $P(E)\,P(F)$ exactly when $E$ and $F$ are [[Independent Events|independent]]. Along a probability tree, the probability of a path is the product of the conditional probabilities on its branches.

> [!example]- An urn holds 4 defective and 6 sound parts. Three are drawn without replacement. What is the probability that all three are sound? {Example}
> - Without replacement the draws are dependent, so the probabilities are chained rather than $0.6$ raised to the third power.
> - The first part is sound with probability $\frac{6}{10}$.
> - Given a sound first part, 5 of the 9 left are sound, and given two sound parts, 4 of the 8 left are sound.
> - The probability that all three are sound is $\frac{6}{10} \times \frac{5}{9} \times \frac{4}{8} = \frac{1}{6}$.

## The law of total probability

If the events $F_1, F_2, \ldots, F_n$ partition the sample space, the probability of an event $E$, by the [[The Law of Total Probability|law of total probability]], is

> $$P(E) = \sum_{i=1}^{n} P(E \mid F_i)\,P(F_i)$$

- $F_1, \ldots, F_n$ partition $S$ when they are mutually exclusive and their union is $S$.

Because the $F_i$ partition $S$, their probabilities sum to 1. Each term $P(E \mid F_i)\,P(F_i)$ is $P(E \cap F_i)$. Reversing the conditioning gives [[Bayes Theorem|Bayes' theorem]].

> [!example]- 30% of drivers file a claim with probability 0.2 and the rest with probability 0.1. What is the probability that a driver files a claim? {Example}
> - The two groups of drivers partition the drivers, with probabilities $0.3$ and $0.7$.
> - The probability of a claim is $0.2 \times 0.3 + 0.1 \times 0.7 = 0.06 + 0.07 = 0.13$.

> [!trap] Mutually exclusive is not independent
> Mutually exclusive events with positive probability are dependent. If $E$ occurs, $F$ cannot, so $P(E \mid F) = 0 \ne P(E)$. Multiplying their probabilities to get $P(E \cap F)$ is wrong: the intersection is empty and its probability is 0.
