---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:9953c32b7f081bbcc5b7c0d884ed886e585504ba5e06c577cffb21bea830bc43
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 conditional probability P(F|E)=P(F∩E)/P(E), E as the new sample space (pp.133-134, PDF pp.141-142), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 Def. 4.1 independence (either event probability 0 counts as independent), Thm 4.1 independent iff P(E∩F)=P(E)P(F) (pp.139-140, PDF pp.147-148); Def. 4.2 mutual independence over every subset, pairwise does not imply mutual (p.141, PDF p.149); Exercise 7: A heads on first toss, B heads on second, C tosses match are pairwise independent but not independent (PDF p.159), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §1.4.0 Conditional Probability (definition; conditional probability is a probability measure, P(A^c|C)=1−P(A|C); chain rule), read 2026-11-06, sha256:6068941689f60230e24fc4ad4a1589902e6d5d4e9f080efa97d0ade85a2d6e4a — https://www.probabilitycourse.com/chapter1/1_4_0_conditional_probability.php"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §1.4.2 Law of Total Probability (partition of S; P(A)=Σ P(A|B_i)P(B_i)), read 2026-11-06, sha256:e670bbb6d9b77df6d4a0c8d7fa5d5317d0bc1991eb0f7fb8e4df15a2b41a3825 — https://www.probabilitycourse.com/chapter1/1_4_2_total_probability.php"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §3.1 Counting Technique (stages, multiply, PDF pp.83-84), Thm 3.1 n!, Def 3.2 and Thm 3.2 k-permutations n(n−1)…(n−k+1) (PDF p.88); §3.2 binomial coefficients C(n,j) = number of j-subsets, Thm 3.4 Pascal recurrence, Thm 3.5 C(n,j)=(n)_j/j! (pp.93-94, PDF pp.101-102), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability learning outcomes a-g (PDF p.2), Topic 2 outcome b (PDF p.3), read 2026-11-06, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Probability Multiplication Rule.md
---

![[Media/Figures/Probability_Multiplication_Rule.svg|340]]

The **Probability Multiplication Rule** gives the [[Probability|probability]] that two [[Event|events]] both occur from a [[Conditional Probability|conditional probability]]. For events $E$ and $F$, the probability that both occur is

> $$P(E \cap F) = P(E)\,P(F \mid E)$$

> $$P(E \cap F) = P(F)\,P(E \mid F)$$

- $P(F \mid E)$ is the probability of $F$ given that $E$ has occurred.
- When $E$ and $F$ are [[Independent Events|independent]], $P(F \mid E) = P(F)$ and the rule is $P(E \cap F) = P(E)\,P(F)$.

Use the form whose conditional probability the question gives.

> [!idea] The idea
> The probability that both occur is the share of outcomes in which $E$ occurs, times the share of those in which $F$ also occurs.

> [!example]- 60% of an insurer's customers insure more than one car. Of those customers, 20% insure a sports car. What is the probability that a customer insures more than one car and a sports car? {Example}
> - Let $E$ be "insures more than one car" and $F$ be "insures a sports car".
> - "Of those customers, 20%" is the conditional probability $P(F \mid E) = 0.20$.
> - $P(E \cap F) = 0.60 \times 0.20 = 0.12$.

## A chain of events

For three events, each factor conditions on everything before it:

> $$
> \begin{aligned}
> P(E_1 \cap E_2 \cap E_3) = {} & P(E_1)\,P(E_2 \mid E_1) \\
> & \times P(E_3 \mid E_1 \cap E_2)
> \end{aligned}
> $$

The chain extends to any number of events, one conditional factor per event. Draws without replacement are a chain, because each draw changes what is left.

> [!example]- A portfolio has 10 policies, 4 of which will have a claim. Two policies are drawn at random without replacement. What is the probability that both have a claim? {Example}
> - The first policy has a claim with probability $\frac{4}{10}$.
> - Given that, 3 of the 9 policies left have a claim, so the second has a claim with probability $\frac{3}{9}$.
> - Both have a claim with probability $\frac{4}{10} \times \frac{3}{9} = \frac{2}{15} \approx 0.133$.

> [!example]- From the same 10 policies, policies are drawn without replacement until one with a claim is found. What is the probability that the first claim is on the third draw? {Example}
> - The event is no claim, then no claim, then a claim.
> - The factors are $\frac{6}{10}$, then $\frac{5}{9}$ with 5 claim-free policies left of 9, then $\frac{4}{8}$ with all 4 claims left of 8.
> - The probability is $\frac{6}{10} \times \frac{5}{9} \times \frac{4}{8} = \frac{1}{6}$.

> [!trap] Unconditional factors without replacement
> Without replacement, each later factor must reflect what was already drawn. Using $0.4 \times 0.4 = 0.16$ for two claims treats the draws as independent, which is right only with replacement. Without it, the answer is $\frac{4}{10} \times \frac{3}{9} \approx 0.133$.
