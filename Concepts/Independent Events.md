---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:0028459555c9c119b187f0e473238d1c6c3a3ec0d8d114f5cf889b4cf4367af7
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 Def. 4.1 independence (either event probability 0 counts as independent), Thm 4.1 independent iff P(E∩F)=P(E)P(F) (pp.139-140, PDF pp.147-148); Def. 4.2 mutual independence over every subset, pairwise does not imply mutual (p.141, PDF p.149); Exercise 7: A heads on first toss, B heads on second, C tosses match are pairwise independent but not independent (PDF p.159), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §1.4.1 Independence (complements of independent events independent; P(∪A_i)=1−∏(1−P(A_i)); warning not to confuse independence with disjointness), read 2026-11-06, sha256:fcf1aacf872ba059ed46a7a386f0e4725016d0ae10db09bd5d4f77d9883c35a7 — https://www.probabilitycourse.com/chapter1/1_4_1_independence.php"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), Probability Spaces > Independence (disjoint events with positive probability are dependent; probability 0 or 1 events independent of every event; pairwise vs mutual independence; Reliability: series reliability p1…pn, parallel 1−∏(1−pi), k out of n system works iff at least k components work), read 2026-11-06, sha256:5f47788c1c3a1a7a6b7b916b9d339bb59184c723dc6d2ccd05fd1a11639054c9 — https://www.randomservices.org/random/prob/Independence.html"
    - "CAS, Exam MAS-I Content Outline 2026, PDF p.3 (Domain A tasks, readings Daniel/Ross/Struppeck) and p.6 (Ross §§9.1-9.6; James et al. Chapters 1-7), read 2026-11-06, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Ross, Introduction to Probability Models, 12th ed., printed Contents (library scan, TU Ilmenau via GBV), PDF p.6: Ch 9 Reliability Theory, 9.2.1 Minimal Path and Minimal Cut Sets, 9.3 Reliability of Systems of Independent Components, 9.4 Bounds on the Reliability Function, 9.4.1 Method of Inclusion and Exclusion, read 2026-11-06, sha256:0c754803d244fd8e3d9343742c99e98ded9a331894a833711e17b018622023dc — https://www.gbv.de/dms/ilmenau/toc/1665053453.PDF"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability learning outcomes a-g (PDF p.2), Topic 2 outcome b (PDF p.3), read 2026-11-06, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Independent Events.md
---

![[Media/Figures/Independent_Events.svg|340]]

**Independent Events** are [[Event|events]] for which knowing that one occurred does not change the [[Probability|probability]] of the other. Two events $E$ and $F$ are independent when the probability that both occur is

> $$P(E \cap F) = P(E)\,P(F)$$

When $P(F) > 0$, this is the same as $P(E \mid F) = P(E)$, the [[Conditional Probability|conditional probability]] of $E$ given $F$.

> [!example]- 30% of an insurer's drivers are young, 13% have a claim, and 6% are young and have a claim. Are being young and having a claim independent? {Example}
> - Let $E$ be "young" and $F$ be "has a claim".
> - Independence would need $P(E \cap F) = 0.30 \times 0.13 = 0.039$.
> - The actual $P(E \cap F) = 0.06$ is larger, so the events are not independent. Young drivers have claims more often.

## Complements of independent events

If $E$ and $F$ are independent, so are $E$ and $F^c$, $E^c$ and $F$, and $E^c$ and $F^c$. So the probability that neither occurs is

> $$P(E^c \cap F^c) = \big(1 - P(E)\big)\big(1 - P(F)\big)$$

> [!example]- Two drivers are insured separately. Ana files a claim with probability 0.2 and Ben with probability 0.1, independently. What is the probability that at least one of them files a claim? {Example}
> - Neither files a claim with probability $(1 - 0.2)(1 - 0.1) = 0.72$.
> - "At least one" is the complement of "neither", so its probability is $1 - 0.72 = 0.28$.

## Mutually independent events

Events $E_1, E_2, \ldots, E_n$ are **mutually independent** when the product rule holds for every group of them. In particular, the probability that all of them occur is

> $$
> \begin{aligned}
> & P(E_1 \cap E_2 \cap \cdots \cap E_n) \\
> & \quad = P(E_1)\,P(E_2) \cdots P(E_n)
> \end{aligned}
> $$

The rule applies to any mix of events and complements, so a sequence of independent trials has the product of its trials' probabilities.

> [!example]- A driver has an accident in a year with probability 0.1, independently from year to year. What is the probability of no accident in years 1 and 2 and an accident in year 3? {Example}
> - No accident in a year has probability $1 - 0.1 = 0.9$.
> - The three years are independent, so the probability is $0.9 \times 0.9 \times 0.1 = 0.081$.

Independence of every pair is not enough for mutual independence.

> [!example]- A fair coin is tossed twice. Let $E$ be "the first toss is heads", $F$ be "the second toss is heads" and $G$ be "the two tosses match". Are $E$, $F$ and $G$ mutually independent? {Example}
> - Each event has probability $\frac{1}{2}$.
> - Each pair occurs together only on $(H, H)$, with probability $\frac{1}{4}$, which is $\frac{1}{2} \times \frac{1}{2}$. Every pair is independent.
> - All three occur only on $(H, H)$, so $P(E \cap F \cap G) = \frac{1}{4}$.
> - The product rule would need $\frac{1}{2} \times \frac{1}{2} \times \frac{1}{2} = \frac{1}{8}$, so the three events are not mutually independent.

## At least one of several independent events

If each of $n$ independent events has probability $p$, none of them occurs with probability $(1 - p)^n$. So the probability that at least one occurs is

> $$P(\text{at least one}) = 1 - (1 - p)^n$$

> [!example]- Five independent losses each exceed a deductible with probability 0.3. What is the probability that at least one exceeds it? {Example}
> - No loss exceeds the deductible with probability $0.7^5 = 0.16807$.
> - At least one exceeds it with probability $1 - 0.16807 = 0.83193$.

> [!trap] "At least one" as $np$
> Adding the probabilities gives $5 \times 0.3 = 1.5$, which is not a probability. The sum counts every overlap more than once. Use 1 minus the probability of none.

## Reliability of a system of independent components

A system built from independent components works with a probability, its **reliability**, that is a product. If component $i$ works with probability $r_i$, a series system works only if every component works:

> $$r_1\,r_2 \cdots r_n$$

A parallel system fails only if every component fails, so it works with probability

> $$1 - (1 - r_1)(1 - r_2) \cdots (1 - r_n)$$

> [!example]- Three independent components each work with probability 0.9. What is the reliability of the three in series, and in parallel? {Example}
> - In series, all three must work: $0.9^3 = 0.729$.
> - In parallel, all three must fail for the system to fail: $1 - 0.1^3 = 0.999$.
