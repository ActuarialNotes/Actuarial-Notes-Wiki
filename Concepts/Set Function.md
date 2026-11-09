---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:6d1e5f42c44bea3bdaa4a07c3c9984f75c0f746b7ebaed0bc1cc1430892d78a5
  sources:
    - "Zakon, Mathematical Analysis (LibreTexts), §7.4 Set Functions. Additivity. Continuity, Definitions 1-2 (a set function is a mapping whose domain is a set family; real, extended-real, complex or vector valued; additive = finitely additive over disjoint unions; σ-additive = countably additive), read 2026-11-06, sha256:b7576cfefd9854cddf2318991ed41d91329929384b91ef4307ecf1eef865e4e9 — https://math.libretexts.org/Bookshelves/Analysis/Mathematical_Analysis_(Zakon)/07%3A_Volume_and_Measure/7.04%3A_Set_Functions._Additivity._Continuity"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Def. 1.1 sample space/outcomes/events, Def. 1.2 P(E)=Σ_{ω∈E} m(ω), Examples 1.6-1.9, set operations and Fig. 1.7, Thm 1.1 (P(E)≥0, P(Ω)=1, monotonicity, disjoint additivity, complement with proof), Thms 1.2-1.4 and Cor. 1.1 (pp.18-24, PDF pp.26-32), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, Ch.1 §3 Probability Measure (Kolmogorov axioms a-c, countable additivity; probability as a function on the collection of events), read 2026-11-06, sha256:381bc53d4a8e0bf0259a5ce1093eb2d759a56e205c38c362ddb3b1a03879c7e6 — https://www.randomservices.org/random/prob/Probability.html"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, introduction (calculus incl. series, differentiation, integration assumed, PDF p.1) and Topic 1 General Probability learning objective and outcomes a-g (PDF p.2), read 2026-11-06, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Set Function.md
---

![[Media/Figures/Set_Function.svg|340]]

A **Set Function** is a function whose input is a set and whose output is a real number. A set function $f$ defined on a collection $\mathcal{F}$ of sets is written

> $$f : \mathcal{F} \to \mathbb{R}$$

- $\mathbb{R}$ is the set of real numbers.

A [[Probability|probability]] $P$ is a set function whose collection is the [[Event|events]] of a [[Sample Space|sample space]] $S$.

> [!example]- A fair die is rolled. What number does the probability set function $P$ assign to the event $E = \{2, 4, 6\}$? {Example}
> - The input of $P$ is the whole event $E$, not a single outcome.
> - The 6 outcomes are equally likely, so $P(E) = \frac{|E|}{|S|} = \frac{3}{6} = 0.5$.
> - $P$ assigns a number in the same way to each of the $2^6 = 64$ [[Combination#Number of subsets of a set|subsets]] of $S = \{1, 2, 3, 4, 5, 6\}$.

## Additive set functions

A set function $f$ is **additive** when, for any two sets $E$ and $F$ in $\mathcal{F}$ with no element in common, the number it assigns to their union is

> $$f(E \cup F) = f(E) + f(F)$$

The number of elements in a set, $|E|$, is an additive set function. So is a probability, whose additivity is the third of the [[Axioms of Probability|axioms of probability]].

> [!example]- An agent has 100 clients. 35 have only an auto policy, 20 have only a homeowners policy and 25 have both. What is the probability that a client chosen at random has at least one policy? {Example}
> - The three groups have no client in common, so their counts add.
> - The number of clients with at least one policy is $35 + 20 + 25 = 80$.
> - Each of the 100 clients is equally likely to be chosen, so the probability is $\frac{80}{100} = 0.8$.

> [!example]- Let $g(E) = 1$ if a set $E$ has at least one element, and $g(E) = 0$ if $E$ is empty. Is $g$ additive? {Example}
> - $g$ is a set function, because it assigns one real number to each set.
> - Take $E = \{1\}$ and $F = \{2\}$, which have no element in common.
> - $g(E) + g(F) = 1 + 1 = 2$, but $g(E \cup F) = g(\{1, 2\}) = 1$.
> - $g$ is not additive.

> [!trap] Adding sets that overlap
> Additivity holds only for sets with no element in common. If 60 clients have auto and 45 have homeowners, $60 + 45 = 105$ counts the 25 clients with both twice. The count with at least one policy is $60 + 45 - 25 = 80$, by the [[Probability Addition Rule|addition rule]].
