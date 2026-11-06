---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:3cb9624bdd35b000b492f5c1fcea20b9150d0ee8e0e54f424e2ce29b6ac636ba
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 set operations and Figure 1.7 Venn diagrams (pp.21-22, PDF pp.29-30), Thm 1.4 (p.24, PDF p.32), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.2.1 Venn Diagrams, fetched 2026-09-28, sha256:2fe78c16c34bc692e154703fc87319338f8983e53c9914321e49e0fd8e5344ab — https://www.probabilitycourse.com/chapter1/1_2_1_venn.php"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.2.2 Set Operations (difference, disjoint sets, partition), fetched 2026-09-28, sha256:f8c7bf7ece0a23a177de9f1eeff3631122625cb461fde905f05d4fa468ad03ba — https://www.probabilitycourse.com/chapter1/1_2_2_set_operations.php"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcome 1a (PDF p.2), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, §2.3 Probability Measures, three-event exercise (exactly one / exactly two as unions of A∩B∩C^c-type regions; none = (A∪B∪C)^c), inclusion-exclusion proof by accounting (seven disjoint regions of A∪B∪C), sha256:381bc53d4a8e0bf0259a5ce1093eb2d759a56e205c38c362ddb3b1a03879c7e6 — https://www.randomservices.org/random/prob/Probability.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, §1.1 Sets (partitions), sha256:88ae6adae225bb78dcf149c6e9807cc4de3d615bf803a343f73b387d3729824a — https://www.randomservices.org/random/foundations/Sets.html"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.3.3 Finding Probabilities (Example 1.11: either but not both = P(A−B)+P(B−A); P(A−B)=P(A)−P(A∩B)), fetched 2026-10-30, sha256:984952f1ea762230cb0c228497cb48dced7032a55616e2ef6ca339338bd2fdfb — https://www.probabilitycourse.com/chapter1/1_3_3_finding_probabilities.php"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Thm 1.2 and Thm 1.3 (p.23, PDF p.31), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Thm 1.1 property 4 (p.22, PDF p.30), Thm 1.2 and Thm 1.3 (p.23, PDF p.31), Thm 1.4 (p.24, PDF p.32), read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.3.3 Finding Probabilities (P(A−B)=P(A)−P(A∩B); Example: either but not both = P(A−B)+P(B−A)), fetched 2026-11-04, sha256:63d80d6b505c6ee80359645000bca6d4788ae1c97446662a77dd6deb07c7e946 — https://www.probabilitycourse.com/chapter1/1_3_3_finding_probabilities.php"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcomes a-g (PDF p.2; vault Exam P-1 page numbers them 1-7), re-read 2026-11-04, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 set operations and Venn Fig. 1.7, Thm 1.1-1.4 incl. Thm 1.4 proof 'added twice' (pp.21-24, PDF pp.29-32); Infinite Sample Spaces (pp.28-29, PDF pp.36-37), read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
  open_findings: 0
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
