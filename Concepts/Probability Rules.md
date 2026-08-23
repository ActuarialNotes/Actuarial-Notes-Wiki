---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:20574b51c4b3ba25f8b2601fa1e65b246bf0a27a62e79c5489f0d19fe2bedef8
  sources: []
  open_findings: 0
  log: .verify/Concepts/Probability Rules.md
---

**Probability Rules** are the small set of identities, derived from the [[Axioms of Probability]], used to combine and decompose event probabilities: the complement, addition, multiplication, and total-probability rules.

> $$P(A^c) = 1 - P(A)$$

> $$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$

> $$P(A \cap B) = P(A \mid B)\,P(B)$$

> $$P(A) = \sum_i P(A \mid B_i)\,P(B_i)$$

- The [[Probability Addition Rule|addition rule]] subtracts the overlap so it is not counted twice; for [[Mutually Exclusive Events]] the intersection is empty and the rule reduces to $P(A) + P(B)$. Three or more events need the [[Inclusion-Exclusion Principle]].
- The [[Probability Multiplication Rule|multiplication rule]] simplifies to $P(A)\,P(B)$ exactly when $A$ and $B$ are [[Independent Events|independent]].
- The last identity is [[The Law of Total Probability]], valid when $\{B_i\}$ partitions the [[Sample Space]]; reversing the conditioning gives [[Bayes Theorem]].
- **Mutually exclusive is not independent.** Disjoint events with positive probability are strongly *dependent*: knowing $A$ occurred guarantees $B$ did not, so $P(A \mid B) = 0 \neq P(A)$.
- The complement rule is the workhorse shortcut — "at least one" is almost always faster as $1 - P(\text{none})$.

> [!example]- Policyholders Holding Auto or Home Coverage {Example}
> 60% of policyholders hold auto coverage, 45% hold home coverage, and 25% hold both. Find the probability a policyholder holds at least one, and the probability they hold neither.
>
> > [!answer]-
> > By the addition rule:
> > $$
> > \begin{align*}
> > P(A \cup H) &= P(A) + P(H) - P(A \cap H) \\
> >             &= 0.60 + 0.45 - 0.25 \\
> >             &= 0.80
> > \end{align*}
> > $$
> > By the complement rule, $P(\text{neither}) = 1 - 0.80 = 0.20$.

> [!example]- "At Least One" via the Complement {Example}
> Each of 5 independent policies files a claim with probability 0.10. Find the probability that at least one files a claim.
>
> > [!answer]-
> > Enumerating one, two, three... claims is slow. Complement instead:
> > $$
> > \begin{align*}
> > P(\text{at least one}) &= 1 - P(\text{no claims}) \\
> >                        &= 1 - (0.90)^5 \\
> >                        &= 1 - 0.59049 \\
> >                        &= 0.41
> > \end{align*}
> > $$

> [!example]- Chaining the Multiplication Rule {Example}
> An urn holds 4 defective and 6 sound parts. Three are drawn without replacement. Find the probability all three are sound.
>
> > [!answer]-
> > Without replacement the draws are dependent, so chain conditionals rather than raising $0.6$ to the third power:
> > $$
> > \begin{align*}
> > P(S_1 \cap S_2 \cap S_3) &= P(S_1)\,P(S_2 \mid S_1)\,P(S_3 \mid S_1 \cap S_2) \\
> >                          &= \frac{6}{10} \cdot \frac{5}{9} \cdot \frac{4}{8} \\
> >                          &= \frac{120}{720} \\
> >                          &= \frac{1}{6}
> > \end{align*}
> > $$
