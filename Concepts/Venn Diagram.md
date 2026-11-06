---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:ed523bd2e8f61675d12aab3c06008d6e8d8241235dbb853159e5d389ae01acd6
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Def. 1.1 sample space/outcomes/events, Def. 1.2 P(E)=Σ_{ω∈E} m(ω), Examples 1.6-1.9, set operations and Fig. 1.7, Thm 1.1 (P(E)≥0, P(Ω)=1, monotonicity, disjoint additivity, complement with proof), Thms 1.2-1.4 and Cor. 1.1 (pp.18-24, PDF pp.26-32), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §1.2.1 Venn Diagrams (rectangle = universal set S, sets as closed regions), read 2026-11-06, sha256:17ef1be99b65701d11585defc07269bc6c4794f12c04b4d5332b7b4e6128cad9 — https://www.probabilitycourse.com/chapter1/1_2_1_venn.php"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §1.2.2 Set Operations (union, intersection, complement, difference, mutually exclusive, partitions, De Morgan's law, distributive law), read 2026-11-06, sha256:ad6875e63227a79d1d04f5560bf8509caf6fced03dbdf7091b5a89d2db7f487e — https://www.probabilitycourse.com/chapter1/1_2_2_set_operations.php"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §1.3.3 Finding Probabilities (complement rule, P(empty)=0, P(A)<=1, P(A-B)=P(A)-P(A∩B), inclusion-exclusion n=2, monotonicity, with proofs from the axioms), read 2026-11-06, sha256:d9bbfac6df61983d64593563b88f919487a03c5ea8c140c3ee3bb97e36ca33ca — https://www.probabilitycourse.com/chapter1/1_3_3_finding_probabilities.php"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, Ch.0 §1 Sets: universal set, empty set, power set, union/intersection/difference/complement, De Morgan's laws, distributive laws, symmetric difference, Venn diagrams, partitions, read 2026-11-06, sha256:88ae6adae225bb78dcf149c6e9807cc4de3d615bf803a343f73b387d3729824a — https://www.randomservices.org/random/foundations/Sets.html"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, introduction (calculus incl. series, differentiation, integration assumed, PDF p.1) and Topic 1 General Probability learning objective and outcomes a-g (PDF p.2), read 2026-11-06, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Venn Diagram.md
---

A **Venn Diagram** is a picture of [[Set Theory|sets]] that shows how they overlap: a rectangle for the [[Sample Space|sample space]] and a circle for each [[Event|event]]. It is used to calculate the intersections and unions of several events. For two events, the probability of the union is:

> $$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$

- $A \cap B$ is the overlap of the circles, where both events occur, and $A \cup B$ is everything inside either circle.
- The circles cut the rectangle into regions that don't overlap. Two events give four regions and three events give eight.
- A count of people works the same way as a probability. Divide every region by the total to move from one to the other.

> [!idea] The idea
> Adding the probabilities of overlapping events counts the overlap twice. A Venn diagram cuts overlapping events into regions that don't overlap, so their probabilities simply add. A union, "neither" or "exactly one" is then a sum of regions, and every total the question gives is an equation in those regions.

![[Media/Figures/Venn_Diagram.svg|340]]

## Filling the diagram from the centre out

An insurer has 100 policyholders. 70 have an auto policy ($A$), 40 have a homeowners policy ($H$), and 20 have both. How many are in each region?

The overlap is given directly, so start there. Each circle's total includes the overlap, so the "only" regions are the totals less the overlap. Whatever is left is outside both circles.

| Region | Policyholders |
|---|---|
| auto only | $70 - 20 = 50$ |
| both | 20 |
| home only | $40 - 20 = 20$ |
| neither | $100 - 50 - 20 - 20 = 10$ |

> [!trap] Starting from the circle totals
> When filling out a Venn Diagram, **always start from the center (the intersection) and work your way out.** If you just put "70" in the Auto circle, you've forgotten that 20 of those people also have Homeowners. The "Auto Only" region is actually $70 - 20 = 50$.

## Reading the regions

The diagram has a fixed key.

- **$S$**: Universal Set — the rectangle representing every possible outcome (Total Probability = 1)
- **$A, B$**: the circles representing specific events.

Actuarial exams often use specific phrasing that maps directly to regions of a Venn diagram.

| Phrasing in Problem | Mathematical Notation | Venn Region |
| :--- | :--- | :--- |
| "Both $A$ and $B$" | $A \cap B$ | The central overlap. |
| "Either $A$ or $B$" | $A \cup B$ | Everything inside both circles. |
| "Neither $A$ nor $B$" | $(A \cup B)^c$ | The space outside both circles. |
| "$A$ but not $B$" | $A \setminus B$ | The "crescent moon" of $A$ only. |
| "Exactly one of $A$ or $B$" | $(A \setminus B) \cup (B \setminus A)$ | Both crescent moons (no overlap). |

As probabilities, the policyholders give $P(A) = 0.70$, $P(H) = 0.40$ and $P(A \cap H) = 0.20$. What is the probability of neither policy? First find the union, then take its complement.

> $$P(A \cup H) = 0.70 + 0.40 - 0.20 = 0.90$$

> $$P(\text{Neither}) = 1 - P(A \cup H) = 1 - 0.90 = 0.10$$

The answer matches the 10 policyholders in the "neither" region.

## Exactly one of two events

How many policyholders have exactly one of the two policies? That is the two crescents, $50 + 20 = 70$.

The union counts the overlap once. Subtracting it once more leaves only the crescents.

> $$P(\text{exactly one of } A, B) = P(A) + P(B) - 2P(A \cap B)$$

- With $B = H$, $0.70 + 0.40 - 2(0.20) = 0.70$, the same as the crescents.
- "At least one" is the union, 0.90. "At most one" is $1 - P(A \cap H) = 0.80$.

## Three events: eight regions

Now add a third policy. 26 of the 100 policyholders have life insurance ($L$). 15 have auto and life, 10 have homeowners and life, and 5 have all three.

A Venn diagram of three events splits the sample space into eight disjoint regions:

- three "only one event" regions,
- three "exactly two events" regions,
- the region in all three events,
- and the region outside all three, "none of the events".

The seven regions inside the circles partition $A \cup H \cup L$. Each event's total is the sum of its "only" region, the two "exactly two" regions that include it, and the all-three region.

> $$P(A) = P(A \cap H^c \cap L^c) + P(A \cap H \cap L^c) + P(A \cap H^c \cap L) + P(A \cap H \cap L)$$

Work from the centre out, as before.

| Region | Policyholders |
|---|---|
| all three | 5 |
| auto and home only | $20 - 5 = 15$ |
| auto and life only | $15 - 5 = 10$ |
| home and life only | $10 - 5 = 5$ |
| auto only | $70 - 15 - 10 - 5 = 40$ |
| home only | $40 - 15 - 5 - 5 = 15$ |
| life only | $26 - 10 - 5 - 5 = 6$ |
| none | $100 - 96 = 4$ |

- The seven inside regions add to 96, which is $P(A \cup H \cup L) = 0.96$.
- To solve a three-event problem, give each unknown region a symbol, and write every given total as a sum of regions. The totals may be an event, an intersection, "only one", "exactly two" or the overall total. Then solve the linear equations, working from the centre out.
- The same union comes from the [[Inclusion-Exclusion Principle|inclusion-exclusion principle]], $70 + 40 + 26 - 20 - 15 - 10 + 5 = 96$.

## Try it

> [!example]- Three newspapers {Example}
> In a group of 120 people, 50 read paper $X$, 45 read $Y$ and 40 read $Z$. 20 read only $X$, 25 only $Y$, 15 only $Z$, and 5 read all three. How many read exactly two papers, and how many read none?
>
> > [!answer]-
> > **Plan:** name the three "exactly two" regions and write each paper's total as a sum of its regions.
> >
> > Let $a$, $b$, $c$ be the "exactly two" regions $X \cap Y$ only, $X \cap Z$ only and $Y \cap Z$ only.
> > $$
> > \begin{align*}
> > X:&\quad 20 + a + b + 5 = 50 \\
> > Y:&\quad 25 + a + c + 5 = 45 \\
> > Z:&\quad 15 + b + c + 5 = 40
> > \end{align*}
> > $$
> > So $a + b = 25$, $a + c = 15$ and $b + c = 20$. Adding the three gives $2(a + b + c) = 60$, so $a + b + c = 30$ read exactly two. Individually, $a = 10$, $b = 15$ and $c = 5$.
> >
> > The union is the seven regions inside the circles, $20 + 25 + 15 + 30 + 5 = 95$, so $120 - 95 = 25$ read none.

> [!example]- An answer in symbols {Example}
> In a survey, $x\%$ of respondents have auto insurance, $y\%$ have homeowners insurance and $z\%$ have both. Find the percentage with auto only, and the percentage with neither.
>
> > [!answer]-
> > **Plan:** put $z$ in the centre, then work outwards.
> >
> > - Auto only is the auto circle less the centre, $x - z$.
> > - Home only is $y - z$.
> > - Neither is what is left of 100.
> >
> > $$100 - (x - z) - (y - z) - z = 100 - x - y + z$$
> >
> > Why $+z$? Subtracting $x$ and $y$ removes the centre twice, so it is added back once.

> [!warning]- Exam traps
> - **A pairwise count used as an "exactly two" region.** "30 own $A$ and $B$" includes those who own all three. The region "$A$ and $B$ only" is $30$ minus the centre. Putting $30$ in that region counts the centre twice.
> - **Exactly one, at least one, at most one.** At least one of two is the union. Exactly one is the union less the overlap. At most one is $1 - P(A \cap B)$. Answering with the union when "exactly one" is asked keeps the overlap in.
> - **Forgetting the outside region.** The eight regions of a three-event diagram add to the whole group. When the question asks for the size of the group, the "none" region must be added or shown to be empty.
