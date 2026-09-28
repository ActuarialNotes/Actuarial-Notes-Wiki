---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-27
  last_checked_by: agent:validate-v1
  content_hash: sha256:dc552c26baac984951d80c2918d273b7eea5f88011ce6f1063d79c7b9d28ca77
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 set operations and Figure 1.7 Venn diagrams (pp.21-22, PDF pp.29-30), Theorem 1.4 and Corollary 1.1 (p.24, PDF p.32), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.2.1 Venn Diagrams, fetched 2026-09-27, sha256:918553ec01dda7da540a1f051713ec597d9e4a9e612a4ee5dfc03a08f6e96287 — https://www.probabilitycourse.com/chapter1/1_2_1_venn.php"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.2.2 Set Operations (incl. De Morgan's law, mutually exclusive), fetched 2026-09-27, sha256:aae5ce2766d2602e6bbdf92038d7bafdceca10b66ead36612dc7c6b31a35e12b — https://www.probabilitycourse.com/chapter1/1_2_2_set_operations.php"
    - "SOA Exam P Sample Solutions (Aug 2026 revision), Q182 (PDF pp.54-55) and Q258 (PDF pp.75-76), Venn-diagram solutions, sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcome 1a (PDF p.2), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 2
  open_critical: 0
  log: .verify/Concepts/Venn Diagram.md
---

A **Venn Diagram** is a visual tool used to represent the relationships between different sets, used for calculating the intersections and unions of multiple events. The most common calculation derived from a Venn Diagram is finding the probability of the union.

> $$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$

![[Media/Figures/Venn_Diagram.svg|340]]

- **$S$**: Universal Set — the rectangle representing every possible outcome (Total Probability = 1)
- **$A, B$**: Sets A and B — the circles representing specific events
- **$A \cap B$**: Intersection — the overlapping region where *both* events occur
- **$A \cup B$**: Union — the total area covered by both circles
- Actuarial exams often use specific phrasing that maps directly to regions of a Venn Diagram

| Phrasing in Problem | Mathematical Notation | Venn Region |
| :--- | :--- | :--- |
| "Both $A$ and $B$" | $A \cap B$ | The central overlap. |
| "Either $A$ or $B$" | $A \cup B$ | Everything inside both circles. |
| "Neither $A$ nor $B$" | $(A \cup B)^c$ | The space outside both circles. |
| "$A$ but not $B$" | $A \setminus B$ | The "crescent moon" of $A$ only. |
| "Exactly one of $A$ or $B$" | $(A \setminus B) \cup (B \setminus A)$ | Both crescent moons (no overlap). |

> [!example]- The Insurance Policyholder {Example}
> $P(A) = 0.70$, $P(H) = 0.40$, $P(A \cap H) = 0.20$. Find the probability of a policyholder having neither policy.
>
> > [!answer]-
> > **Step 1: Find the Union (Anyone with at least one policy)**
> > $$P(A \cup H) = 0.70 + 0.40 - 0.20 = 0.90$$
> >
> > **Step 2: Find the complement (Neither)**
> > $$P(\text{Neither}) = 1 - P(A \cup H) = 1 - 0.90 = 0.10$$
> >
> > > [!tip] Common Trap
> > > When filling out a Venn Diagram, **always start from the center (the intersection) and work your way out.** If you just put "70" in the Auto circle, you've forgotten that 20 of those people also have Homeowners. The "Auto Only" region is actually $70 - 20 = 50$.
