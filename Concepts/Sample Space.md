---
verification:
  status: in_review
  confidence: null
  last_checked: 2026-11-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:b833162c99f5280293e2cf2ae0bfd048df2543b5bf43d2086b6f2657b48838e6
  sources:
    - "https://math.dartmouth.edu/~prob/prob/prob.pdf, §1.2 Def. 1.1, PDF p.26, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "https://math.dartmouth.edu/~prob/prob/prob.pdf, §1.2 Infinite Sample Spaces, PDF pp.36-37, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Random Experiments | Sample Space | Trials | Events, §1.3.1 Random Experiments, sha256:6912978eea25788df4fcb5837fd63b5e733eaad3682b7f8d2d9de4219c0a6001 — https://www.probabilitycourse.com/chapter1/1_3_1_random_experiments.php"
    - "Events and Random Variables, Sample Spaces; The Set of Outcomes; Events, sha256:510418f107a11631155faaf9854f524c0e241b1319a4bc335ace7a769ee0aec3 — https://www.randomservices.org/random/prob/Events.html"
    - "https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf, Topic 1, outcome a, PDF p.2, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "https://math.dartmouth.edu/~prob/prob/prob.pdf, §1.2 Ex. 2.7, PDF p.63, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Sample Space.md
---

![[Media/Figures/Sample_Space.svg|340]]

A **Sample Space** is the set of all possible outcomes of an experiment. When its outcomes can be listed, the sample space $S$ is

> $$S = \{s_1, s_2, \ldots\}$$

- $s_i$ is an outcome of the experiment.

> [!example]- A coin is flipped and then a die is rolled. What is the sample space? {Example}
> - An outcome records both results, so it is an ordered pair (coin, die).
> - The sample space $S$ holds the pairs $(H, 1)$, $(H, 2)$, …, $(H, 6)$ and $(T, 1)$, $(T, 2)$, …, $(T, 6)$.
> - There are 2 results for the coin and 6 for the die, so by the [[Combinatorics#The multiplication principle|multiplication principle]], $|S| = 2 \times 6 = 12$.

## Requirements of outcomes in a sample space

The outcomes of a sample space must be

- **[[Mutually Exclusive Events|mutually exclusive]]**: no two outcomes can occur together, and
- **exhaustive**: every possible result of the experiment is one of them.

Then the probabilities of the outcomes add to 1:

> $$\sum_{s \in S} P(\{s\}) = 1$$

- $P(\{s\})$ is the [[Probability|probability]] of the event containing the single outcome $s$.

> [!example]- A policy year is recorded as No Claim, Claim or Large Claim. Is this a sample space? {Example}
> - The list is exhaustive: every policy year has no claim or a claim.
> - It is not mutually exclusive: a large claim is also a claim, so a year with a large claim matches two outcomes.
> - It is not a sample space. Replacing Claim with Small Claim gives one, $S = \{\text{No Claim}, \text{Small Claim}, \text{Large Claim}\}$.

## Types of sample spaces

- A sample space is **finite** when it has a finite number of outcomes, like the 12 outcomes of the coin and the die.
- It is **countably infinite** when its outcomes can be listed but the list never ends. The number of claims in a year has $S = \{0, 1, 2, \ldots\}$.
- It is **uncountable** when its outcomes fill an interval. The time until the first claim has $S = (0, \infty)$. Its outcomes can't be listed, so probabilities come from intervals, through a [[Continuous Random Variable|continuous random variable]].

> [!trap] A sample space too coarse for the question
> Two dice are rolled and only their sum is recorded. That sample space, $\{2, 3, \ldots, 12\}$, can't answer "Did the first die show a 6?", because a sum of 8 could be $(6, 2)$ or $(2, 6)$. Choose outcomes detailed enough for every event the question asks about.
