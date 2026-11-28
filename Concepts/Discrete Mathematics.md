---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:56346320d57ba8e2fbdb4d67dcfc445f16e61f69490a7cbefe3dde78b87b110d
  sources:
    - "https://discrete.openmathbooks.org/dmoi4/sec_intro-intro.html, §0.1 What is Discrete Mathematics?, sha256:ae371cc171109338a8313bcd524fe04d1aebaf6d2e018c94e300a28577e24732 — https://discrete.openmathbooks.org/dmoi4/sec_intro-intro.html"
    - "https://discrete.openmathbooks.org/dmoi4/sec_logic-rules.html, §1.3 Rules of Logic, Implications are Disjunctions and contrapositive theorem, sha256:ec16f87ae8d0915d42ed0baff5be05c95d6b9ea4f73a81acff40af6191ce38aa — https://discrete.openmathbooks.org/dmoi4/sec_logic-rules.html"
    - "https://www.randomservices.org/random/foundations/Sets.html, Sets and subsets, sha256:88ae6adae225bb78dcf149c6e9807cc4de3d615bf803a343f73b387d3729824a — https://www.randomservices.org/random/foundations/Sets.html"
    - "https://math.dartmouth.edu/~prob/prob/prob.pdf, p.193, PDF p.201; p.233 Expected Value of Discrete Random Variables, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf, Topic 1 General Probability, PDF p.2, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
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
