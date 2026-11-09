---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:56346320d57ba8e2fbdb4d67dcfc445f16e61f69490a7cbefe3dde78b87b110d
  sources:
    - "Levin, Discrete Mathematics: An Open Introduction (4th ed.), §0.1 What is Discrete Mathematics? (objects individually separate and distinct, contrasted with the intervals of calculus), read 2026-11-06, sha256:ff3d5233b8d550726430f4d4ddf082cf192cd0cdcb7b1b27972d7e7c6c274773 — https://discrete.openmathbooks.org/dmoi4/sec_intro-intro.html"
    - "Levin, Discrete Mathematics: An Open Introduction (4th ed.), §0.2 Discrete Structures (implication false only when hypothesis true and conclusion false; Def. converse Q→P and contrapositive ¬Q→¬P; converse not equivalent), read 2026-11-06, sha256:006647200a59feee0cafe9809efd0a5e876e5d62198dded7ed547bb6efa57422 — https://discrete.openmathbooks.org/dmoi4/sec_intro-structures.html"
    - "Levin, Discrete Mathematics: An Open Introduction (4th ed.), §1.3 Rules of Logic (truth table of ¬P∨Q identical to P→Q), read 2026-11-06, sha256:ffc0b596025abccfcb8925529780567b385af4ac29f318bcff9fffd3e1f8fdfa — https://discrete.openmathbooks.org/dmoi4/sec_logic-rules.html"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §3.1 A Counting Technique N = n1·n2·…·nr (p.76, PDF p.84); §3.2 Ex. 3.5 and binomial coefficients, a set of n elements has 2^n subsets (p.93, PDF p.101); §5.1 hypergeometric h(N,k,n,x) = C(k,x)C(N−k,n−x)/C(N,n) (p.193, PDF p.201), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, Ch.0 §1 Sets: universal set, empty set, power set, union/intersection/difference/complement, De Morgan's laws, distributive laws, symmetric difference, Venn diagrams, partitions, read 2026-11-06, sha256:88ae6adae225bb78dcf149c6e9807cc4de3d615bf803a343f73b387d3729824a — https://www.randomservices.org/random/foundations/Sets.html"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, introduction (calculus incl. series, differentiation, integration assumed, PDF p.1) and Topic 1 General Probability learning objective and outcomes a-g (PDF p.2), read 2026-11-06, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Discrete Mathematics.md
---

![[Media/Figures/Discrete_Mathematics.svg|340]]

**Discrete Mathematics** is the branch of mathematics that studies countable, separate objects, such as sets, whole numbers and finite arrangements. In probability, it describes [[Event|events]] as sets and counts the outcomes in them.

Exam P uses three parts of it:

- [[Set Theory]] writes an event described in words as a set.
- [[Combinatorics]] counts the outcomes in an event without listing them.
- Sums over discrete values give the probabilities and means of a [[Discrete Random Variable|discrete random variable]].

> [!example]- An insurer offers 4 optional coverages, and a policy may include any of them. If a policy is chosen at random from all possible policies, what is the probability that it has exactly 2 coverages? {Example}
> - Each coverage is in or out of a policy, so there are $2^4 = 16$ possible policies, one for each [[Combination#Number of subsets of a set|subset]] of the 4 coverages.
> - The policies with exactly 2 coverages are the combinations of 2 coverages from 4, $\binom{4}{2} = 6$.
> - The [[Probability|probability]] is $\frac{6}{16} = 0.375$.

## Conditional statements

A statement "if $E$, then $F$" says that every outcome in $E$ is also in $F$:

> $$E \subseteq F$$

The statement fails only when $E$ occurs and $F$ does not. Its **contrapositive**, "if not $F$, then not $E$", is the same statement, $F^c \subseteq E^c$.

> [!example]- An insurer offers 4 optional coverages, and every policy with flood coverage must also have fire coverage. How many of the 16 possible policies are allowed? {Example}
> - The rule fails only for a policy with flood and without fire.
> - In such a policy the other 2 coverages are free, so there are $2^2 = 4$ of them.
> - The allowed policies number $16 - 4 = 12$.

> [!trap] Reversing "if … then"
> "If flood, then fire" does not mean "if fire, then flood". A policy may have fire coverage without flood coverage. Only the contrapositive, "if no fire, then no flood", says the same thing.
