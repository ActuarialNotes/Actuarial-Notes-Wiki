---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:124d760db5ad297ccf6a089e946879418a441a4727a91700aa6e3fd185ddd5fd
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Thm 1.1 property 4 pp.22-23 (PDF pp.30-31), Thm 1.4 p.24 (PDF p.32), Thm 3.8 Inclusion-Exclusion Principle p.104 (PDF p.112), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA Exam P Sample Solutions (Aug 2026 revision), Q1 and Q3 p.2, sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.3.3 Finding Probabilities (P(A−B)=P(A)−P(A∩B), A−B=A∩B^c; Example 1.11 either but not both), fetched 2026-10-30, sha256:984952f1ea762230cb0c228497cb48dced7032a55616e2ef6ca339338bd2fdfb — https://www.probabilitycourse.com/chapter1/1_3_3_finding_probabilities.php"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.4.1 Independence (A, B independent ⇒ A and B^c, A^c and B independent), fetched 2026-10-30, sha256:d3a628b19b7630f57b78839bd1c92defb3988d4897dcdab840d5811dc5522dbd — https://www.probabilitycourse.com/chapter1/1_4_1_independence.php"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, §2.3 Probability Measures, difference rule, increasing property, Bonferroni's inequality, two-event bounds P(A)+P(B)−1 ≤ P(A∩B), three-event exercise (exactly two = 0.21 reproduced by Σpairwise − 3·triple), sha256:381bc53d4a8e0bf0259a5ce1093eb2d759a56e205c38c362ddb3b1a03879c7e6 — https://www.randomservices.org/random/prob/Probability.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Probability Addition Rule.md
---

The **Probability Addition Rule** gives the probability that at least one of two events $A$ or $B$ occurs, correcting for the double-counting of outcomes in their intersection.
- Also known as the Inclusion-Exclusion Principle
- When events are [[Mutually Exclusive Events|mutually exclusive]], $P(A \cap B) = 0$ and the rule reduces to simple addition
- For three events the rule extends to include all pairwise and triple intersections:

> $$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$

> $$P(A \cup B \cup C) = P(A)+P(B)+P(C) - P(A \cap B) - P(A \cap C) - P(B \cap C) + P(A \cap B \cap C)$$

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

- If $P(A \cap B)$ is not given, it is only bounded: $A \cap B$ lies inside both events, and $P(A \cup B) \leq 1$ forces $P(A \cap B) \geq P(A) + P(B) - 1$.

> $$\max(0,\ P(A) + P(B) - 1) \leq P(A \cap B) \leq \min(P(A),\ P(B))$$

- So $P(A \cup B)$ ranges from $\max(P(A), P(B))$, when one event contains the other, up to $\min(1, P(A) + P(B))$, and $P(\text{neither}) = 1 - P(A \cup B)$ ranges accordingly.

> [!example]- Only, Exactly One, and Bounds {Example}
> (a) $P(A) = 0.5$, $P(B) = 0.4$ and $P(A \cap B) = 0.15$. Find the probability that exactly one of $A$, $B$ occurs. (b) If instead only $P(A) = 0.5$ and $P(B) = 0.7$ are known, what values can $P(A \cup B)$ take?
>
> > [!answer]-
> > (a) The two "only" probabilities are $0.5 - 0.15 = 0.35$ and $0.4 - 0.15 = 0.25$, so
> > $$P(\text{exactly one}) = 0.35 + 0.25 = 0.60$$
> > Check: $P(A \cup B) = 0.5 + 0.4 - 0.15 = 0.75$, and $0.75 - 0.15 = 0.60$.
> >
> > (b) $P(A \cap B)$ lies between $0.5 + 0.7 - 1 = 0.2$ and $\min(0.5, 0.7) = 0.5$, so $P(A \cup B) = 1.2 - P(A \cap B)$ lies between $0.7$ and $1$, and $P(\text{neither})$ between $0$ and $0.3$.

> [!example]- Probability of at Least One Coverage Trigger {Example}
> For a commercial policy, the probability of a fire loss is 0.05, a flood loss is 0.03, and both losses in the same year is 0.01. What is the probability of at least one loss?
>
> > [!answer]-
> > Let $F$ = fire and $L$ = flood. Applying the addition rule:
> > $$P(F \cup L) = P(F) + P(L) - P(F \cap L) = 0.05 + 0.03 - 0.01 = 0.07$$
> > There is a 7% probability of experiencing at least one loss in the year.
