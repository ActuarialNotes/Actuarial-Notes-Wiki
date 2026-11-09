---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:805c440e75b1c61bfcb95a432f9d483f914d02233f0d2f850337b878faea40ec
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Def. 1.1 sample space/outcomes/events, Def. 1.2 P(E)=Σ_{ω∈E} m(ω), Examples 1.6-1.9, set operations and Fig. 1.7, Thm 1.1 (P(E)≥0, P(Ω)=1, monotonicity, disjoint additivity, complement with proof), Thms 1.2-1.4 and Cor. 1.1 (pp.18-24, PDF pp.26-32), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Ex. 1.10, Def. 1.3 uniform m(ω)=1/n, Ex. 1.11 two dice 36 ordered pairs, no single correct sample space, Determination of Probabilities, Infinite Sample Spaces (countable; Ex. 1.13 geometric sum), Historical Remarks 36 ordered vs 21 unordered pairs (pp.24-30, PDF pp.32-38), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.1 Ex. 1.3 de Méré, 1−(5/6)^4 = .518 (pp.4-5, PDF pp.12-13), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §3.1 A Counting Technique N = n1·n2·…·nr (p.76, PDF p.84); §3.2 Ex. 3.5 and binomial coefficients, a set of n elements has 2^n subsets (p.93, PDF p.101); §5.1 hypergeometric h(N,k,n,x) = C(k,x)C(N−k,n−x)/C(N,n) (p.193, PDF p.201), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, Ch.1 §3 Probability Measure (Kolmogorov axioms a-c, countable additivity; probability as a function on the collection of events), read 2026-11-06, sha256:381bc53d4a8e0bf0259a5ce1093eb2d759a56e205c38c362ddb3b1a03879c7e6 — https://www.randomservices.org/random/prob/Probability.html"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, introduction (calculus incl. series, differentiation, integration assumed, PDF p.1) and Topic 1 General Probability learning objective and outcomes a-g (PDF p.2), read 2026-11-06, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Probability.md
---

![[Media/Figures/Probability.svg|340]]

A **Probability** is a measure of how likely an [[Event|event]] is to occur. Probabilities are assigned by a [[Set Function|set function]] $P$ that maps each event $E$ in a [[Sample Space|sample space]] $S$ to a real number $P(E)$ between 0 and 1, and that satisfies the [[Axioms of Probability|axioms of probability]].

If all outcomes in a finite sample space $S$ are equally likely, then the probability of an event $E$ is

> $$P(E) = \frac{|E|}{|S|}$$

- $|E|$ is the number of outcomes in the event $E$.
- $|S|$ is the number of outcomes in the sample space $S$.

> [!example]- Two fair coins are flipped. What is the probability that both coins are heads? {Example}
> The sample space lists every outcome of the experiment:
>
> | Coin 1 | Coin 2 |
> | ------ | ------ |
> | T      | T      |
> | T      | H      |
> | H      | T      |
> | H      | H      |
>
> - Because the coins are fair and flipped independently, the 4 outcomes are equally likely, so $|S| = 4$.
> - The event that both coins are heads contains one outcome, $E = \{(H, H)\}$, so $|E| = 1$.
> - The probability that both coins are heads is $P(E) = \frac{1}{4} = 0.25$.

## When outcomes are not equally likely

When the outcomes of a finite sample space $S$ are not equally likely, the probability of an event $E$ is the sum of the probabilities of the outcomes in it:

> $$P(E) = \sum_{s \in E} P(\{s\})$$

- $s$ is an outcome in the event $E$.
- $P(\{s\})$ is the probability of the event containing the single outcome $s$.
- When every outcome is equally likely, each $P(\{s\}) = \frac{1}{|S|}$, and the sum is $\frac{|E|}{|S|}$.

> [!example]- A biased coin lands heads with probability 0.7. It is flipped twice, independently. What is the probability of exactly one head? {Example}
> The sample space and the probability of each outcome:
>
> | Outcome | Probability |
> | ------- | ----------- |
> | (T, T)  | $0.3 \times 0.3 = 0.09$ |
> | (T, H)  | $0.3 \times 0.7 = 0.21$ |
> | (H, T)  | $0.7 \times 0.3 = 0.21$ |
> | (H, H)  | $0.7 \times 0.7 = 0.49$ |
>
> - The event of exactly one head contains two outcomes: $E = \{(T, H), (H, T)\}$.
> - Adding the probabilities of the outcomes in $E$ gives $P(E) = 0.21 + 0.21 = 0.42$.

> [!trap] Choose the sample space carefully
> Sometimes outcomes look unequal only because of how the sample space was defined.
>
> For example, if two fair dice are rolled, then the sums $2, 3, \ldots, 12$ are **not** equally likely. A sum of 7 can happen 6 ways, while a sum of 2 can happen only 1 way.
>
> Using the 36 ordered pairs $(d_1, d_2)$ as the sample space makes the outcomes equally likely again, so $P(\text{sum} = 7) = \frac{6}{36} = \frac{1}{6}$.
