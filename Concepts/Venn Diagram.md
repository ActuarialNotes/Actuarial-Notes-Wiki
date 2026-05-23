- A **Venn Diagram** is a visual tool used to represent the relationships between different sets.
- They are used for calculating the intersections and unions of multiple events.
- The most common calculation derived from a Venn Diagram is finding the probability of the Union.

$$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$

![[Media/Venn_Diagram_Example.png|300]]

## Notation
* **Universal Set ($S$):** The rectangle representing every possible outcome (Total Probability = 1).
* **Sets ($A, B$):** The circles representing specific events.
* **The Intersection ($A \cap B$):** The overlapping region where *both* events occur.
* **The Union ($A \cup B$):** The total area covered by both circles.

## How to Solve Problems with a Venn Diagram
Actuarial exams often use specific phrasing that maps directly to regions of a Venn Diagram.


| Phrasing in Problem | Mathematical Notation | Venn Region |
| :--- | :--- | :--- |
| "Both $A$ and $B$" | $A \cap B$ | The central overlap. |
| "Either $A$ or $B$" | $A \cup B$ | Everything inside both circles. |
| "Neither $A$ nor $B$" | $(A \cup B)^c$ | The space outside both circles. |
| "$A$ but not $B$" | $A \setminus B$ | The "crescent moon" of $A$ only. |
| "Exactly one of $A$ or $B$" | $(A \setminus B) \cup (B \setminus A)$ | Both crescent moons (no overlap). |


> [!example]- The Insurance Policyholder {Example}
> 
> ### The Big Idea
> We are looking for the "empty space" in the universal rectangle. To find it, we first need to find the total "footprint" of the policyholders (the Union) and subtract that from the total probability of 1.
> 
> * $P(A) = 0.70$
> * $P(H) = 0.40$
> * $P(A \cap H) = 0.20$
> 
> **Step 1: Find the Union (Anyone with at least one policy)**
> $$P(A \cup H) = 0.70 + 0.40 - 0.20 = \mathbf{0.90}$$
> 
> **Step 2: Find the complement (Neither)**
> $$P(\text{Neither}) = 1 - P(A \cup H) = 1 - 0.90 = \mathbf{0.10}$$
> 
> > [!tip] Common Trap
> > When filling out a Venn Diagram, **always start from the center (the intersection) and work your way out.** > > If you just put "70" in the Auto circle, you've forgotten that 20 of those people also have Homeowners. The "Auto Only" region is actually $70 - 20 = 50$.
