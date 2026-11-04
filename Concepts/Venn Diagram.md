---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:3cb9624bdd35b000b492f5c1fcea20b9150d0ee8e0e54f424e2ce29b6ac636ba
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 set operations and Venn Fig. 1.7, Thm 1.1-1.4 incl. Thm 1.4 proof 'added twice' (pp.21-24, PDF pp.29-32); Infinite Sample Spaces (pp.28-29, PDF pp.36-37), read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Venn Diagram.md
---

A **Venn Diagram** is a visual tool that represents the relationships between different sets. It is used to calculate the intersections and unions of multiple events. For two events, the probability of the union is:

> $$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$

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

> [!idea] The idea
> Adding the probabilities of overlapping events counts the overlap twice. A Venn diagram cuts overlapping events into regions that don't overlap, so their probabilities simply add. A union, "neither" or "exactly one" is then a sum of regions. Every total the question gives is an equation in those regions.

![[Media/Figures/Venn_Diagram.svg|340]]

### Exactly one of two events

- "Exactly one of $A$ or $B$" is the two crescents, $A \cap B^c$ and $A^c \cap B$. The union counts the overlap once, so subtracting it once more leaves only the crescents.

> $$P(\text{exactly one of } A, B) = P(A) + P(B) - 2P(A \cap B)$$

### Three events: eight regions

- A Venn diagram of three events $A$, $B$, $C$ splits the sample space into eight disjoint regions: three "only one event" regions, three "exactly two events" regions, the region in all three events, and the region outside all three.
- The seven regions inside the circles partition $A \cup B \cup C$. The eighth, $(A \cup B \cup C)^c$, is "none of the events".
- Each event's total is the sum of its "only" region, the two "exactly two" regions that include it, and the all-three region.

> $$P(A) = P(A \cap B^c \cap C^c) + P(A \cap B \cap C^c) + P(A \cap B^c \cap C) + P(A \cap B \cap C)$$

- To solve a three-event problem, give each unknown region a symbol, write every given total (an event, an intersection, "only one", "exactly two", the overall total) as a sum of regions, and solve the resulting linear equations, working from the centre out.

> [!example]- Three Newspapers {Example}
> In a group of 120 people, 50 read paper $X$, 45 read $Y$ and 40 read $Z$; 20 read only $X$, 25 only $Y$, 15 only $Z$, and 5 read all three. How many read exactly two papers, and how many read none?
>
> > [!answer]-
> > Let $a$, $b$, $c$ be the "exactly two" regions $X \cap Y$ only, $X \cap Z$ only and $Y \cap Z$ only. Each paper's total is its only region, its two exactly-two regions and the centre:
> > $$
> > \begin{align*}
> > X:&\quad 20 + a + b + 5 = 50 \\
> > Y:&\quad 25 + a + c + 5 = 45 \\
> > Z:&\quad 15 + b + c + 5 = 40
> > \end{align*}
> > $$
> > So $a + b = 25$, $a + c = 15$ and $b + c = 20$. Adding the three gives $2(a + b + c) = 60$, so $a + b + c = 30$ read exactly two. Individually, $a = 10$, $b = 15$ and $c = 5$.
> >
> > The union is the seven regions inside the circles: $20 + 25 + 15 + 30 + 5 = 95$, so $120 - 95 = 25$ read none.

> [!example]- The Insurance Policyholder {Example}
> Let $A$ be the event that a policyholder has an auto policy and $H$ the event that they have a homeowners policy, with $P(A) = 0.70$, $P(H) = 0.40$, $P(A \cap H) = 0.20$. Find the probability of a policyholder having neither policy.
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

> [!tip]- How it appears on the exam
> - **Exam P** (General Probability, objectives 1, 4–5): the page is tagged on 9 Exam P questions in the bank. Each is built on two or three overlapping groups.
> - Three groups are given with their "only one" counts and the all-three count, such as risk factors in a driver or patient study. The question asks for the total or for the number in exactly two.
> - Portfolio or client profiles list group totals and some pairwise and triple overlaps. The question asks for a region such as "none of the three" or "auto only".
> - Some answers are in symbols. Given $x\%$, $y\%$ and $z\%$ for some regions, the question asks for the expression for another region.

> [!warning]- Exam traps
> - **A pairwise count used as an "exactly two" region.** "30 own $A$ and $B$" includes those who own all three. The region "$A$ and $B$ only" is $30$ minus the centre. Putting $30$ in that region counts the centre twice.
> - **Exactly one, at least one, at most one.** At least one of two is the union. Exactly one is the union less the overlap. At most one is $1 - P(A \cap B)$. Answering with the union when "exactly one" is asked keeps the overlap in.
> - **Forgetting the outside region.** The eight regions of a three-event diagram add to the whole group. When the question asks for the size of the group, the "none" region must be added or shown to be empty.
