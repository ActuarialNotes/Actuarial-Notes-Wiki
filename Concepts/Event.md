---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:c114ca8bbb6aa642cb42b59f868c8ad882552debbebcdb725cd5b3928ee5173d
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Def. 1.1 sample space/outcomes/events, Def. 1.2 P(E)=Σ_{ω∈E} m(ω), Examples 1.6-1.9, set operations and Fig. 1.7, Thm 1.1 (P(E)≥0, P(Ω)=1, monotonicity, disjoint additivity, complement with proof), Thms 1.2-1.4 and Cor. 1.1 (pp.18-24, PDF pp.26-32), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §3.1 A Counting Technique N = n1·n2·…·nr (p.76, PDF p.84); §3.2 Ex. 3.5 and binomial coefficients, a set of n elements has 2^n subsets (p.93, PDF p.101); §5.1 hypergeometric h(N,k,n,x) = C(k,x)C(N−k,n−x)/C(N,n) (p.193, PDF p.201), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §1.3.1 Random Experiments (outcome, sample space = set of all possible outcomes, event = subset; union = 'or'/'at least', intersection = 'and'), read 2026-11-06, sha256:45b7306c1035a289566eaa2987945972aebd1eeab04d12c337bef7e23a4139e9 — https://www.probabilitycourse.com/chapter1/1_3_1_random_experiments.php"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, Ch.1 §2 Events and Random Variables: events, S always occurs and the empty set never occurs, discrete sample space = all subsets, disjoint = mutually exclusive, read 2026-11-06, sha256:510418f107a11631155faaf9854f524c0e241b1319a4bc335ace7a769ee0aec3 — https://www.randomservices.org/random/prob/Events.html"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, introduction (calculus incl. series, differentiation, integration assumed, PDF p.1) and Topic 1 General Probability learning objective and outcomes a-g (PDF p.2), read 2026-11-06, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
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

> [!trap] Similar words, different event
> "At least 4" is $\{4, 5, 6\}$, but "more than 4" is $\{5, 6\}$. List the outcomes before treating two descriptions as the same event.
