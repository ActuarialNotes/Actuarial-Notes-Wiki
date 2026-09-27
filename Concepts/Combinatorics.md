---
verification:
  status: verified
  confidence: high
  last_checked: 2026-09-27
  last_checked_by: agent:validate-v1
  content_hash: sha256:43997ee99a992611bab52dac4e7920c82aca9d866a959fea78cd6956020574c0
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Def. 1.3 p.25 (PDF p.33); §3.1 Def. 3.2, Thms 3.1-3.2 p.80 (PDF p.88); §3.2 Thm 3.5 and n!/(j!(n-j)!) pp.94-95 (PDF pp.102-103), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, p.1 learning outcome 1b, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Combinatorics.md
---

**Combinatorics** is a branch of [[Discrete Mathematics]] concerned with counting the number of ways to arrange, select, or partition objects.
- It provides the tools needed to compute probabilities when outcomes are equally likely
- The two fundamental problems are counting **ordered** arrangements ([[Permutation]]s) and **unordered** selections ([[Combination]]s)
- In probability, combinatorics determines the sizes of events and sample spaces: $P(A) = |A| / |S|$ for uniform experiments

> $$|\text{arrangements of } n \text{ objects}| = n!$$

> $$= n \times (n-1) \times \cdots \times 2 \times 1$$

![[Media/Figures/Combinatorics.svg|340]]

> [!example]- Counting Equally Likely Outcomes for a Lottery {Example}
> A lottery draws 3 numbers from $\{1, 2, 3, 4, 5\}$ without replacement. How many equally likely outcomes are there if order does not matter?
>
> > [!answer]-
> > This is a combination problem (order irrelevant, no replacement):
> > $$\binom{5}{3} = \frac{5!}{3!\,2!} = \frac{120}{6 \times 2} = 10$$
> > There are 10 equally likely outcomes, so each has probability $1/10 = 0.10$.
