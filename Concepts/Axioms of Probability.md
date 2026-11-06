---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:c6e935234a2a91dbb4f012eb4705daef10bd848bbbae0ca9c1bbe9414314feb4
  sources:
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §1.3.2 Probability (Axioms 1-3, third axiom for countably many disjoint events, finite case), read 2026-11-06, sha256:6bac16281e4f438b39671ab9249f058d9f4ed54f5477614b361b29fa10e983c8 — https://www.probabilitycourse.com/chapter1/1_3_2_probability.php"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §1.3.3 Finding Probabilities (complement rule, P(empty)=0, P(A)<=1, P(A-B)=P(A)-P(A∩B), inclusion-exclusion n=2, monotonicity, with proofs from the axioms), read 2026-11-06, sha256:d9bbfac6df61983d64593563b88f919487a03c5ea8c140c3ee3bb97e36ca33ca — https://www.probabilitycourse.com/chapter1/1_3_3_finding_probabilities.php"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, Ch.1 §3 Probability Measure (Kolmogorov axioms a-c, countable additivity; probability as a function on the collection of events), read 2026-11-06, sha256:381bc53d4a8e0bf0259a5ce1093eb2d759a56e205c38c362ddb3b1a03879c7e6 — https://www.randomservices.org/random/prob/Probability.html"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Def. 1.1 sample space/outcomes/events, Def. 1.2 P(E)=Σ_{ω∈E} m(ω), Examples 1.6-1.9, set operations and Fig. 1.7, Thm 1.1 (P(E)≥0, P(Ω)=1, monotonicity, disjoint additivity, complement with proof), Thms 1.2-1.4 and Cor. 1.1 (pp.18-24, PDF pp.26-32), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Ex. 1.10, Def. 1.3 uniform m(ω)=1/n, Ex. 1.11 two dice 36 ordered pairs, no single correct sample space, Determination of Probabilities, Infinite Sample Spaces (countable; Ex. 1.13 geometric sum), Historical Remarks 36 ordered vs 21 unordered pairs (pp.24-30, PDF pp.32-38), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, introduction (calculus incl. series, differentiation, integration assumed, PDF p.1) and Topic 1 General Probability learning objective and outcomes a-g (PDF p.2), read 2026-11-06, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Axioms of Probability.md
---

The **Axioms of Probability** are the three rules that any valid [[Probability|probability]] $P$ on a [[Sample Space|sample space]] $S$ must satisfy: non-negativity, total probability and additivity.

> $$P(E) \geq 0$$

> $$P(S) = 1$$

> $$P\!\left(\bigcup_{i=1}^{\infty} E_i\right) = \sum_{i=1}^{\infty} P(E_i)$$

- $E$ is any [[Event|event]], and the third axiom holds whenever $E_1, E_2, \ldots$ are [[Mutually Exclusive Events|mutually exclusive]].
- Every other probability rule is derived from these three: the complement rule, $P(\varnothing) = 0$, $P(E) \leq 1$ and the addition rule for overlapping events.

> [!idea] The idea
> Probability behaves like a share of a whole. A share can't be negative, all the shares together make up the whole, and the share of two pieces that don't overlap is the sum of their shares. Every rule a candidate uses follows from these three facts, so a rule you forget can be rebuilt from them.

![[Media/Figures/Axioms_of_Probability.svg|340]]

## Checking a probability model

An insurer models the number of claims on a policy in one year. It assigns 0 claims probability 0.60, 1 claim 0.25, 2 claims 0.10, and 3 or more claims 0.05. Is this a valid probability?

| Axiom | Mathematical Statement | Description |
| :--- | :--- | :--- |
| **1. Non-negativity** | $P(E) \geq 0$ | No negative odds. You cannot have a less-than-zero chance of an event occurring. |
| **2. Total Probability** | $P(S) = 1$ | Something must happen. The probability of the entire sample space is 100%. |
| **3. Additivity** | $P\!\left(\bigcup_{i=1}^{\infty} E_i\right) = \sum_{i=1}^{\infty} P(E_i)$ | Add if no overlap. If events are [[Concepts/Mutually Exclusive Events]], the probability of "one or the other" is the sum of their individual probabilities. |

Check each axiom against the model.

- **Non-negativity.** All four probabilities are at least 0.
- **Total probability.** $0.60 + 0.25 + 0.10 + 0.05 = 1$.
- **Additivity.** The outcomes don't overlap, so every event's probability is the sum of its outcomes. "One or two claims" has probability $0.25 + 0.10 = 0.35$.

The model is valid. Had the four numbers added to 1.05, the second axiom would fail, whatever the individual numbers looked like.

## What the axioms imply

What is the probability of at least one claim? The axioms don't say it directly, but they imply the complement rule.

$A$ and $A^c$ are mutually exclusive and $A \cup A^c = S$. By Axiom 3:
$$P(A \cup A^c) = P(A) + P(A^c)$$
But $A \cup A^c = S$, so by Axiom 2:
$$P(S) = 1 = P(A) + P(A^c)$$
Therefore $P(A^c) = 1 - P(A)$. $\square$

- For the claim model, $P(\text{at least one claim}) = 1 - 0.60 = 0.40$.
- Taking $A = S$ gives $P(\varnothing) = 1 - 1 = 0$. The impossible event has probability 0.
- Since $P(A^c) \geq 0$ by Axiom 1, $P(A) \leq 1$. No probability exceeds 1.
- If $B \subseteq A$, then $A$ is $B$ together with the disjoint piece $A \cap B^c$. So $P(B) \leq P(A)$.

## Events that overlap

Axiom 3 applies only to mutually exclusive events. What if two events share outcomes? Let $A$ be "at least one claim" and $B$ "at most two claims".

- $P(A) = 0.40$ and $P(B) = 0.60 + 0.25 + 0.10 = 0.95$.
- They share "one or two claims", so $P(A \cap B) = 0.35$.
- Every policy is in $A$ or $B$, so $P(A \cup B) = 1$.

Adding gives $0.40 + 0.95 = 1.35$, which breaks the axioms. The overlap was counted twice. Split the union into pieces that don't overlap, $A$ and $B \cap A^c$. Then Axiom 3 applies, and $P(B \cap A^c) = P(B) - P(A \cap B)$.

> $$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$

- $0.40 + 0.95 - 0.35 = 1$, as it should be.
- This is the [[Probability Addition Rule|addition rule]]. It reduces to Axiom 3 when $P(A \cap B) = 0$.

> [!trap] Adding events that overlap
> A sum of probabilities above 1 is the sign. Before adding, check that no outcome lies in two of the events.

## Why infinitely many events?

A claim count has no natural upper limit. Suppose the count can be $0, 1, 2, \ldots$ with $P(N = k) = 0.5^{k+1}$. The event "at least one claim" is the union of infinitely many mutually exclusive events, $\{N = 1\}, \{N = 2\}, \ldots$.

$$P(N \geq 1) = 0.25 + 0.125 + 0.0625 + \cdots = 0.5$$

- Axiom 3 is written for a countable sequence of events so that sums like this one are allowed.
- With only two events at a time, an event built from infinitely many outcomes couldn't be given a probability by adding.
- The complement gives the same answer, $1 - P(N = 0) = 1 - 0.5 = 0.5$.

## Try it

> [!example]- Axioms satisfied? {Example}
> A probability model assigns $P(A) = 0.3$, $P(B) = 0.5$, and $P(A \cup B) = 0.9$, where $A$ and $B$ are mutually exclusive. Does this violate the axioms of probability?
>
> > [!answer]-
> > **Plan:** mutually exclusive events must add, by Axiom 3.
> >
> > Additivity requires $P(A \cup B) = P(A) + P(B) = 0.3 + 0.5 = 0.8$. The model states $P(A \cup B) = 0.9 \neq 0.8$, so **yes, it violates the third axiom**.

> [!example]- Two events that must overlap {Example}
> 60% of policyholders have an auto claim this year and 70% have a home claim. Show that at least 30% have both.
>
> > [!answer]-
> > **Plan:** combine the addition rule with $P(A \cup B) \leq 1$.
> >
> > $$
> > \begin{align*}
> > P(A \cap B) &= P(A) + P(B) - P(A \cup B) \\
> > &\geq 0.60 + 0.70 - 1 \\
> > &= 0.30
> > \end{align*}
> > $$
> >
> > Why must they overlap? Two shares of 0.60 and 0.70 can't fit side by side inside a whole of 1.

> [!example]- A complement from the axioms {Example}
> For the claim model on this page, show that $P(\text{no claims}) = 0.60$ follows from the other three probabilities.
>
> > [!answer]-
> > **Plan:** "no claims" is the complement of "at least one claim", whose outcomes are mutually exclusive.
> >
> > $$
> > \begin{align*}
> > P(\text{at least one}) &= 0.25 + 0.10 + 0.05 \\
> > &= 0.40 \\
> > P(\text{no claims}) &= 1 - 0.40 \\
> > &= 0.60
> > \end{align*}
> > $$
> >
> > The first line uses Axiom 3 and the second uses the complement rule, which came from Axioms 2 and 3.

> [!warning]- Exam traps
> - **Adding events that overlap.** $P(A \cup B) = P(A) + P(B)$ only for mutually exclusive events. Otherwise subtract $P(A \cap B)$.
> - **Probabilities that don't sum to 1.** A table of outcome probabilities must add to exactly 1. A missing outcome, such as "3 or more", is a common reason they don't.
> - **A "probability" outside $[0, 1]$.** A negative answer or one above 1 means an axiom was broken along the way, usually by an overlap counted twice.
