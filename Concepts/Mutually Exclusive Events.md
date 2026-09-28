---
verification:
  status: verified
  confidence: high
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:c8dbe9f300a7d81223492518bca454bfbb7255f46402b22b92d22bd41bc0b473
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Thm 1.1 properties 4-5 (pp.22-23, PDF pp.30-31), Thm 1.2 (p.23, PDF p.31), Thm 1.4 (p.24, PDF p.32), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.2.2 Set Operations (difference, disjoint sets, partition), fetched 2026-09-28, sha256:f8c7bf7ece0a23a177de9f1eeff3631122625cb461fde905f05d4fa468ad03ba — https://www.probabilitycourse.com/chapter1/1_2_2_set_operations.php"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcomes 1a-1g (PDF p.2), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Mutually Exclusive Events.md
---

Two events $A$ and $B$ are **Mutually Exclusive** (disjoint) if they cannot both occur simultaneously.
- For mutually exclusive events, the [[Probability Addition Rule]] simplifies to $P(A \cup B) = P(A) + P(B)$
- The addition rule simplification extends to any finite collection: if $A_1, A_2, \ldots, A_n$ are pairwise mutually exclusive, then $P\!\left(\bigcup_{i=1}^n A_i\right) = \sum_{i=1}^n P(A_i)$

> $$A \cap B = \emptyset \implies P(A \cap B) = 0$$

![[Media/Figures/Mutually_Exclusive_Events.svg|340]]

> [!example]- Insurance Claim Type {Example}
> Each claim is classified as exactly one of property damage ($D$), bodily injury ($B$), or other. $P(D) = 0.60$ and $P(B) = 0.35$. Find the probability that a claim is property damage or bodily injury, and the probability that it is classified as other.
>
> > [!answer]-
> > Since $D$ and $B$ are mutually exclusive:
> > $$P(D \cup B) = P(D) + P(B) = 0.60 + 0.35 = 0.95$$
> > The three classes are mutually exclusive and cover every claim, so "other" is the complement of $D \cup B$:
> > $$P(\text{other}) = 1 - 0.95 = 0.05$$
