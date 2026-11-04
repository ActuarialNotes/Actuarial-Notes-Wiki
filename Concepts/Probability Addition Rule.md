---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:2a59482c3e42649cb82b5c3fc50fbc3838eb46616fabc469e270a224704ad11e
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 set operations and Venn Fig. 1.7, Thm 1.1-1.4 incl. Thm 1.4 proof 'added twice' (pp.21-24, PDF pp.29-32); Infinite Sample Spaces (pp.28-29, PDF pp.36-37), read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Probability Addition Rule.md
---

The **Probability Addition Rule** gives the probability that at least one of two events $A$ or $B$ occurs, correcting for the double-counting of outcomes in their intersection.

> $$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$

- Also known as the Inclusion-Exclusion Principle
- When events are [[Mutually Exclusive Events|mutually exclusive]], $P(A \cap B) = 0$ and the rule reduces to simple addition
- The larger the overlap $P(A \cap B)$, the smaller the union $P(A \cup B)$.
- For three events the rule extends to include all pairwise and triple intersections:

> $$P(A \cup B \cup C) = P(A)+P(B)+P(C) - P(A \cap B) - P(A \cap C) - P(B \cap C) + P(A \cap B \cap C)$$

> [!idea] The idea
> Adding $P(A)$ and $P(B)$ counts every outcome in both events twice. The addition rule subtracts the overlap once, so each outcome in $A \cup B$ is counted exactly once. With three events, the single events add the triple overlap three times and the pairs subtract it three times. The rule therefore adds it back once.

![[Media/Figures/Probability_Addition_Rule.svg|340]]

### Only one, exactly one, exactly two

- "$A$ but not $B$" has probability $P(A \cap B^c) = P(A) - P(A \cap B)$: subtract the joint probability with $B$ from the probability of $A$.
- "Exactly one of $A$ and $B$" is the union of the two mutually exclusive events ($A$ occurs and $B$ does not) and ($B$ occurs and $A$ does not), so its probability is the sum of the two "only" probabilities.

> $$
> \begin{align*}
> P(\text{exactly one of } A, B) &= P(A \cap B^c) + P(A^c \cap B) \\
> &= P(A) + P(B) - 2P(A \cap B)
> \end{align*}
> $$

- Equivalently, the probability that exactly one of $A$ or $B$ occurs is $P(A \cup B) - P(A \cap B)$: the union with the intersection taken out.
- When $A$ and $B$ are independent, so are $A$ and $B^c$, and each "only" probability is a product: exactly one has probability $P(A)(1 - P(B)) + (1 - P(A))P(B)$.
- For three events, each "exactly two" region is a pairwise intersection less the triple intersection, so:

> $$P(\text{exactly two of } A, B, C) = P(A \cap B) + P(A \cap C) + P(B \cap C) - 3P(A \cap B \cap C)$$

- When the triple intersection is empty, the probability that exactly two occur is the sum of the pairwise intersection probabilities.
- When some pairs are mutually exclusive, only the remaining pairs contribute: if $A \cap C = B \cap C = \emptyset$, exactly two of the three can occur only as $A \cap B$, so the probability that exactly two occur is $P(A \cap B)$.

### When the overlap is not given

- If $P(A \cap B)$ is not given, it is only bounded. $A \cap B$ lies inside both events, so $P(A \cap B)$ is at most the smaller of $P(A)$ and $P(B)$. Since $P(A \cup B) \leq 1$, the addition rule forces $P(A \cap B) \geq P(A) + P(B) - 1$.

> $$\max(0,\ P(A) + P(B) - 1) \leq P(A \cap B) \leq \min(P(A),\ P(B))$$

- So $P(A \cup B)$ ranges from $\max(P(A), P(B))$, when one event contains the other, up to $\min(1, P(A) + P(B))$. The probability $P(\text{neither}) = 1 - P(A \cup B)$ ranges accordingly.

> [!example]- Only, Exactly One, and Bounds {Example}
> (a) $P(A) = 0.5$, $P(B) = 0.4$ and $P(A \cap B) = 0.15$. Find the probability that exactly one of $A$, $B$ occurs. (b) If instead only $P(A) = 0.5$ and $P(B) = 0.7$ are known, what values can $P(A \cup B)$ take?
>
> > [!answer]-
> > (a) The two "only" probabilities are $0.5 - 0.15 = 0.35$ and $0.4 - 0.15 = 0.25$, so
> > $$P(\text{exactly one}) = 0.35 + 0.25 = 0.60$$
> > Check: $P(A \cup B) = 0.5 + 0.4 - 0.15 = 0.75$, and $0.75 - 0.15 = 0.60$.
> >
> > (b) $P(A \cap B)$ lies between $0.5 + 0.7 - 1 = 0.2$ and $\min(0.5, 0.7) = 0.5$. So $P(A \cup B) = 1.2 - P(A \cap B)$ lies between $0.7$ and $1$, and $P(\text{neither})$ lies between $0$ and $0.3$.

> [!example]- Probability of at Least One Coverage Trigger {Example}
> For a commercial policy, the probability of a fire loss is 0.05, a flood loss is 0.03, and both losses in the same year is 0.01. What is the probability of at least one loss?
>
> > [!answer]-
> > Let $F$ = fire and $L$ = flood. Applying the addition rule:
> > $$P(F \cup L) = P(F) + P(L) - P(F \cap L) = 0.05 + 0.03 - 0.01 = 0.07$$
> > There is a 7% probability of experiencing at least one loss in the year.

> [!tip]- How it appears on the exam
> - **Exam P** (General Probability, objective 5): the page is tagged on 25 Exam P questions in the bank. Most of them are two- or three-event problems.
> - Two events are given in complement form, such as "no fillings", "no root canals" or "at least one". The task is to recover $P(A \cap B)$ or $P(A \cup B)$ and answer for the asked region.
> - Questions ask for "exactly one" of two events. The events are often independent, so the overlap is a product.
> - Some questions give three events that mix independent and mutually exclusive pairs, or give "at least one" and "exactly two" totals. The task is to solve for one event's probability.
> - When the overlap is not given, the task is to state the range of values a probability can take, from the bounds on $P(A \cap B)$.

> [!warning]- Exam traps
> - **Independent read as mutually exclusive.** Independent events overlap: $P(A \cap B) = P(A)\,P(B)$, not $0$. With fire $0.2$ and theft $0.3$ independent, $P(\text{at least one}) = 0.2 + 0.3 - 0.06 = 0.44$, not $0.5$.
> - **The triple term left off.** Stopping after the pairwise subtractions undercounts the union by $P(A \cap B \cap C)$.
> - **Union given for "exactly one".** Subtracting the overlap once gives at least one. "Exactly one" subtracts it twice. An answer equal to $P(A \cup B)$ is the sign.
> - **One value when a range is asked.** Without $P(A \cap B)$, assuming independence produces a single number. The question wants the interval the bounds allow.
