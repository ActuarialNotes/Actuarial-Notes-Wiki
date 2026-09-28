---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-27
  last_checked_by: agent:validate-v1
  content_hash: sha256:eb0c10f7695b9b94dda92b507f8ed6bb63b941ad30b19d17376491a2836d1b06
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Theorem 1.1 (p.22, PDF p.30), Theorem 1.2 (p.23, PDF p.31), countable spaces (pp.28-29, PDF pp.36-37), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.3.2 Probability — Axioms of Probability, fetched 2026-09-27, sha256:ec9c2c3c0edfb4599a9fcd8511745e673f7a2c9a3ec43f3c6b03dd3036864705 — https://www.probabilitycourse.com/chapter1/1_3_2_probability.php"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcome 1a (PDF p.2), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 2
  open_critical: 0
  log: .verify/Concepts/Axioms of Probability.md
---

The **Axioms of Probability** are three foundational rules that any valid [[Concepts/Probability]] $P$ must satisfy:
- Non-Negativity
- Total Probability
- Additivity

| Axiom | Mathematical Statement | Description |
| :--- | :--- | :--- |
| **1. Non-negativity** | $P(E) \geq 0$ | No negative odds. You cannot have a less-than-zero chance of an event occurring. |
| **2. Total Probability** | $P(S) = 1$ | Something must happen. The probability of the entire sample space is 100%. |
| **3. Additivity** | $P\!\left(\bigcup_{i=1}^{\infty} E_i\right) = \sum_{i=1}^{\infty} P(E_i)$ | Add if no overlap. If events are [[Concepts/Mutually Exclusive Events]], the probability of "one or the other" is the sum of their individual probabilities. |

![[Media/Figures/Axioms_of_Probability.svg|340]]

> [!example]- Axioms satisfied? {Example}
> A probability model assigns $P(A) = 0.3$, $P(B) = 0.5$, and $P(A \cup B) = 0.9$ where $A$ and $B$ are mutually exclusive. Does this violate the axioms of probability?
> 
> > [!answer]-
> > If $A$ and $B$ are mutually exclusive, countable additivity requires $P(A \cup B) = P(A) + P(B) = 0.3 + 0.5 = 0.8$. Since the model states $P(A \cup B) = 0.9 \neq 0.8$, **yes, it violates the third axiom**.

> [!example]- Deriving the Complement Rule from the Axioms {Example}
> Using only the three axioms of probability, prove that $P(A^c) = 1 - P(A)$.
>
> > [!answer]-
> > $A$ and $A^c$ are mutually exclusive (disjoint) and $A \cup A^c = S$. By Axiom 3 (additivity):
> > $$P(A \cup A^c) = P(A) + P(A^c)$$
> > But $A \cup A^c = S$, so by Axiom 2:
> > $$P(S) = 1 = P(A) + P(A^c)$$
> > Therefore $P(A^c) = 1 - P(A)$. $\square$
