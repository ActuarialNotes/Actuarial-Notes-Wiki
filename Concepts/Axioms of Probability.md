---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:c42b3c2ed77322fff165b0dd31abe3efc0e0178097551f9833945ff51f079b00
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

![[Media/Figures/Axioms_of_Probability.svg|340]]

The **Axioms of Probability** are the three rules that every [[Probability|probability]] $P$ on a [[Sample Space|sample space]] $S$ must satisfy.

The first axiom, **non-negativity**, states that for every [[Event|event]] $E$,

> $$P(E) \geq 0$$

The second axiom, **total probability**, states that the sample space has probability 1:

> $$P(S) = 1$$

The third axiom, **additivity**, states that for any sequence of [[Mutually Exclusive Events|mutually exclusive]] events $E_1, E_2, \ldots$, the probability of their union is the sum of their probabilities:

> $$\displaystyle P\!\left(\bigcup_{i=1}^{\infty} E_i\right) = \sum_{i=1}^{\infty} P(E_i)$$

- The sequence may be finite, as with two mutually exclusive events $E$ and $F$, where $P(E \cup F) = P(E) + P(F)$.

> [!idea] The idea
> Every other rule of probability follows from these three. For example, $E$ and its complement $E^c$ are mutually exclusive and together make up $S$, so the second and third axioms give $P(E) + P(E^c) = 1$.

> [!example]- An insurer assigns probability 0.60 to no claims on a policy in a year, 0.25 to one claim, 0.10 to two claims and 0.05 to three or more claims. Is this a valid probability? {Example}
> - Non-negativity holds: every probability is at least 0.
> - Total probability holds: the four outcomes are mutually exclusive and exhaustive, and $0.60 + 0.25 + 0.10 + 0.05 = 1$.
> - Additivity gives every other event its probability. "One or two claims" has probability $0.25 + 0.10 = 0.35$.
> - The model is valid. Had the four numbers added to 1.05, it would break the second axiom.

## The complement rule

The [[Event#Combining events|complement]] $E^c$ is the event that $E$ does not occur. Its probability is

> $$P(E^c) = 1 - P(E)$$

> [!example]- The number of claims $N$ on a policy is $k = 0, 1, 2, \ldots$ with probability $P(N = k) = 0.5^{k+1}$. What is the probability of at least one claim? {Example}
> - "At least one claim" is the union of the mutually exclusive events $\{N = 1\}, \{N = 2\}, \ldots$.
> - By additivity, its probability is $0.25 + 0.125 + 0.0625 + \cdots = 0.5$.
> - The complement rule gives the same answer more quickly: $1 - P(N = 0) = 1 - 0.5 = 0.5$.

## Bounds on a probability

The axioms also bound every probability. For every event $E$,

> $$0 \leq P(E) \leq 1$$

If every outcome of an event $E$ is also in an event $F$, $E \subseteq F$, then

> $$P(E) \leq P(F)$$

The [[Event#Special events|impossible event]] $\varnothing$ has probability $P(\varnothing) = 0$.

> [!example]- A claim model gives a probability of 0.40 to at least one claim. Can it give a probability of 0.45 to at least two claims? {Example}
> - Every policy with at least two claims has at least one claim, so "at least two" $\subseteq$ "at least one".
> - Its probability can be at most 0.40.
> - The model can't give it 0.45.

> [!trap] Adding events that overlap
> Additivity holds only for mutually exclusive events. If $P(E) = 0.40$ and $P(F) = 0.95$, then $0.40 + 0.95 = 1.35$ is above 1, which is the sign that the events overlap. Subtract the overlap once, by the [[Probability Addition Rule|addition rule]]: $P(E \cup F) = P(E) + P(F) - P(E \cap F)$.
