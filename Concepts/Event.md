---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:6309d6a9ea352d78a8f630111a6a7b97d7ec06a1f4a7e6a943bd9d0dfd3affce
  sources:
    - "https://math.dartmouth.edu/~prob/prob/prob.pdf, §1.2 Def. 1.1-1.2, Examples 1.6, 1.8, Thm 1.1, PDF pp.26-31, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Random Experiments | Sample Space | Trials | Events, §1.3.1, sha256:6912978eea25788df4fcb5837fd63b5e733eaad3682b7f8d2d9de4219c0a6001 — https://www.probabilitycourse.com/chapter1/1_3_1_random_experiments.php"
    - "Events and Random Variables, Ch.1 §2 Events, sha256:510418f107a11631155faaf9854f524c0e241b1319a4bc335ace7a769ee0aec3 — https://www.randomservices.org/random/prob/Events.html"
    - "https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf, Topic 1, outcomes a-g, PDF p.2, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Event.md
---

![[Media/Figures/Event.svg|340]]

An **Event** is a set of outcomes of an experiment. An event $E$ is a subset of the [[Sample Space|sample space]] $S$, written

> $$E \subseteq S$$

The event $E$ is said to occur when the outcome of the experiment is in $E$.

> [!example]- A fair die is rolled. What is the event "an even number is rolled", and what is its probability? {Example}
> - The sample space is $S = \{1, 2, 3, 4, 5, 6\}$.
> - The outcomes that make the statement true are 2, 4 and 6, so $E = \{2, 4, 6\}$.
> - The 6 outcomes are equally likely, so the [[Probability|probability]] is $P(E) = \frac{|E|}{|S|} = \frac{3}{6} = 0.5$.

## Special events

- A **simple event** contains exactly one outcome, such as $\{4\}$.
- The sample space $S$ is the **certain event**. It always occurs, and $P(S) = 1$.
- The empty set $\varnothing$ is the **impossible event**. It never occurs, and $P(\varnothing) = 0$.

## Combining events

The words "and", "or" and "not" combine events through the [[Set Operations|set operations]] intersection, union and complement:

| Words | Event | Its outcomes |
| --- | --- | --- |
| $E$ and $F$ | $E \cap F$ | in both $E$ and $F$ |
| $E$ or $F$ | $E \cup F$ | in $E$, in $F$, or in both |
| not $E$ | $E^c$ | in $S$ but not in $E$ |

- Events with no outcome in common, $E \cap F = \varnothing$, are [[Mutually Exclusive Events|mutually exclusive]].

> [!example]- A fair die is rolled. Let $E$ be "an even number is rolled" and $F$ be "at least 4 is rolled". What are $E \cap F$, $E \cup F$ and $E^c$? {Example}
> - $E = \{2, 4, 6\}$ and $F = \{4, 5, 6\}$.
> - $E \cap F = \{4, 6\}$, the outcomes in both.
> - $E \cup F = \{2, 4, 5, 6\}$, the outcomes in either.
> - $E^c = \{1, 3, 5\}$, the outcomes not in $E$.

> [!trap] 'At least' versus 'more than'
> "At least 4" is $\{4, 5, 6\}$, but "more than 4" is $\{5, 6\}$. List the outcomes before treating two descriptions as the same event.
