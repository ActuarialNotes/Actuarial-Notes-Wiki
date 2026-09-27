---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-27
  last_checked_by: agent:validate-v1
  content_hash: sha256:6fe255a119296c29cb4534cd440ed2f64b046b7d2b648ac8ac5d154d4000a617
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Thm 1.1 property 4 pp.22-23 (PDF pp.30-31), Thm 1.2 p.23 (PDF p.31), Thm 1.4 p.24 (PDF p.32), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA Exam P Sample Solutions (Aug 2026 revision), Q100 p.30 and Q351 p.98, sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "SOA Probability Exam syllabus, November 2026, General Probability learning outcomes a, c-g, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Mutually Exclusive Events.md
---

Two events $A$ and $B$ are **Mutually Exclusive** (disjoint) if they cannot both occur simultaneously.
- For mutually exclusive events, the [[Probability Addition Rule]] simplifies to $P(A \cup B) = P(A) + P(B)$
- The addition rule simplification extends to any finite collection: if $A_1, A_2, \ldots, A_n$ are pairwise mutually exclusive, then $P\!\left(\bigcup_{i=1}^n A_i\right) = \sum_{i=1}^n P(A_i)$

> $$A \cap B = \emptyset \implies P(A \cap B) = 0$$

![[Media/Figures/Mutually_Exclusive_Events.svg|340]]

> [!example]- Insurance Claim Type {Example}
> A single claim is classified as either property damage ($P$) or bodily injury ($B$), but not both. $P(P) = 0.60$ and $P(B) = 0.35$.
>
> > [!answer]-
> > Since $P$ and $B$ are mutually exclusive:
> > $$P(P \cup B) = P(P) + P(B) = 0.60 + 0.35 = 0.95$$
> > There is a 5% probability the claim is neither type (e.g., classified as "other").
