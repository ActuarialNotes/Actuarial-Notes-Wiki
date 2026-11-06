---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:42a8a4beef2b74f9d4c075836e6a41431bf3f780d65d46af02b20a78dc89bc30
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Def. 1.1 sample space/outcomes/events, Def. 1.2 P(E)=Σ_{ω∈E} m(ω), Examples 1.6-1.9, set operations and Fig. 1.7, Thm 1.1 (P(E)≥0, P(Ω)=1, monotonicity, disjoint additivity, complement with proof), Thms 1.2-1.4 and Cor. 1.1 (pp.18-24, PDF pp.26-32), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Ex. 1.10, Def. 1.3 uniform m(ω)=1/n, Ex. 1.11 two dice 36 ordered pairs, no single correct sample space, Determination of Probabilities, Infinite Sample Spaces (countable; Ex. 1.13 geometric sum), Historical Remarks 36 ordered vs 21 unordered pairs (pp.24-30, PDF pp.32-38), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §3.1 A Counting Technique N = n1·n2·…·nr (p.76, PDF p.84); §3.2 Ex. 3.5 and binomial coefficients, a set of n elements has 2^n subsets (p.93, PDF p.101); §5.1 hypergeometric h(N,k,n,x) = C(k,x)C(N−k,n−x)/C(N,n) (p.193, PDF p.201), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §2.2 Ex. 2.7 continuous model assigns probability 0 to each single outcome, probabilities from a density over intervals (p.55, PDF p.63), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §1.3.1 Random Experiments (outcome, sample space = set of all possible outcomes, event = subset; union = 'or'/'at least', intersection = 'and'), read 2026-11-06, sha256:45b7306c1035a289566eaa2987945972aebd1eeab04d12c337bef7e23a4139e9 — https://www.probabilitycourse.com/chapter1/1_3_1_random_experiments.php"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, Ch.1 §2 Events and Random Variables: events, S always occurs and the empty set never occurs, discrete sample space = all subsets, disjoint = mutually exclusive, read 2026-11-06, sha256:510418f107a11631155faaf9854f524c0e241b1319a4bc335ace7a769ee0aec3 — https://www.randomservices.org/random/prob/Events.html"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, introduction (calculus incl. series, differentiation, integration assumed, PDF p.1) and Topic 1 General Probability learning objective and outcomes a-g (PDF p.2), read 2026-11-06, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Sample Space.md
---

![[Media/Figures/Sample_Space.svg|340]]

A **Sample Space** is the set of all possible outcomes of an experiment. When its outcomes can be listed, the sample space $S$ is

> $$S = \{s_1, s_2, \ldots\}$$

- $s_i$ is an outcome of the experiment.

> [!example] A coin is flipped and then a die is rolled. What is the sample space?
> - An outcome records both results, so it is an ordered pair (coin, die).
> - $S = \{(H, 1), (H, 2), \ldots, (H, 6), (T, 1), (T, 2), \ldots, (T, 6)\}$.
> - There are 2 results for the coin and 6 for the die, so by the multiplication principle on [[Combinatorics]], $|S| = 2 \times 6 = 12$.

## Each outcome once, none missing

The outcomes of a sample space must be

- **mutually exclusive**: no two outcomes can occur together, and
- **exhaustive**: every possible result of the experiment is one of them.

Then the probabilities of the outcomes add to 1:

> $$\sum_{s \in S} P(\{s\}) = 1$$

- $P(\{s\})$ is the [[Probability|probability]] of the outcome $s$.

> [!example] A policy year is recorded as No Claim, Claim or Large Claim. Is this a sample space?
> - The list is exhaustive: every policy year has no claim or a claim.
> - It is not mutually exclusive: a large claim is also a claim, so a year with a large claim matches two outcomes.
> - It is not a sample space. Replacing Claim with Small Claim gives one, $S = \{\text{No Claim}, \text{Small Claim}, \text{Large Claim}\}$.

## Finite, countable or uncountable

- A sample space is **finite** when it has a finite number of outcomes, like the 12 outcomes of the coin and the die.
- It is **countably infinite** when its outcomes can be listed but the list never ends. The number of claims in a year has $S = \{0, 1, 2, \ldots\}$.
- It is **uncountable** when its outcomes fill an interval. The time until the first claim has $S = (0, \infty)$. Its outcomes can't be listed, so probabilities come from intervals, through a [[Continuous Random Variable|continuous random variable]].

> [!trap] A sample space too coarse for the question
> Two dice are rolled and only their sum is recorded. That sample space, $\{2, 3, \ldots, 12\}$, can't answer "Did the first die show a 6?", because a sum of 8 could be $(6, 2)$ or $(2, 6)$. Choose outcomes detailed enough for every event the question asks about.
