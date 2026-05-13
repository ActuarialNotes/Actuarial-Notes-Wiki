A **Venn Diagram** is a visual tool used to represent the relationships between different sets. In actuarial probability, they are indispensable for calculating the intersections and unions of multiple events.

<div align="center">
<svg width="400" height="250" viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="10" width="380" height="230" rx="10" fill="none" stroke="#666" stroke-width="2" />
  <text x="25" y="35" font-family="Arial, sans-serif" font-size="16" fill="#666" font-style="italic">S</text>

  <circle cx="160" cy="130" r="80" fill="rgba(66, 135, 245, 0.3)" stroke="#4287f5" stroke-width="2" />
  <text x="110" y="135" font-family="Arial, sans-serif" font-size="18" fill="#4287f5" font-weight="bold">A</text>

  <circle cx="240" cy="130" r="80" fill="rgba(245, 66, 66, 0.3)" stroke="#f54242" stroke-width="2" />
  <text x="275" y="135" font-family="Arial, sans-serif" font-size="18" fill="#f54242" font-weight="bold">B</text>

  <text x="200" y="135" font-family="serif" font-size="14" fill="#333" text-anchor="middle" font-weight="bold">A ∩ B</text>
</svg>
</div>

### Core Components
* **Universal Set ($S$):** The rectangle representing every possible outcome (Total Probability = 1).
* **Sets ($A, B$):** The circles representing specific events.
* **The Intersection ($A \cap B$):** The overlapping region where *both* events occur.
* **The Union ($A \cup B$):** The total area covered by both circles.

### The "Word Problem" Translator
Actuarial exams often use specific phrasing that maps directly to regions of a Venn Diagram.

| Phrasing in Problem | Mathematical Notation | Venn Region |
| :--- | :--- | :--- |
| "Both $A$ and $B$" | $A \cap B$ | The central overlap. |
| "Either $A$ or $B$" | $A \cup B$ | Everything inside both circles. |
| "Neither $A$ nor $B$" | $(A \cup B)^c$ | The space outside both circles. |
| "$A$ but not $B$" | $A \setminus B$ | The "crescent moon" of $A$ only. |
| "Exactly one of $A$ or $B$" | $(A \setminus B) \cup (B \setminus A)$ | Both crescent moons (no overlap). |

### The General Addition Rule
The most common calculation derived from a Venn Diagram is finding the probability of the Union. Because the intersection is counted twice if you simply add $P(A)$ and $P(B)$, we must subtract it once:

$$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$

> [!example]- The Insurance Policyholder {💡 Example}
> 
> ### The Big Idea
> We are looking for the "empty space" in the universal rectangle. To find it, we first need to find the total "footprint" of the policyholders (the Union) and subtract that from the total probability of 1.
> 
> ### The Setup
> * $P(A) = 0.70$
> * $P(H) = 0.40$
> * $P(A \cap H) = 0.20$
> 
> ### The Solve
> **Step 1: Find the Union (Anyone with at least one policy)**
> $$P(A \cup H) = 0.70 + 0.40 - 0.20 = \mathbf{0.90}$$
> 
> **Step 2: Find the complement (Neither)**
> $$P(\text{Neither}) = 1 - P(A \cup H) = 1 - 0.90 = \mathbf{0.10}$$
> 
> > [!tip] Common Trap
> > When filling out a Venn Diagram, **always start from the center (the intersection) and work your way out.** > > If you just put "70" in the Auto circle, you've forgotten that 20 of those people also have Homeowners. The "Auto Only" region is actually $70 - 20 = 50$.
