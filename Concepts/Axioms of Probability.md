The **Axioms of Probability** (also called **Kolmogorov's axioms**) are three foundational rules that any valid [[Concepts/Probability]] $P$ must satisfy:
- Total Probability
- Non-Negativity
- Additivity

| Axiom | Mathematical Statement | Description |
| :--- | :--- | :--- |
| **1. Total Probability** | $P(S) = 1$ | Something must happen. The probability of the entire sample space is 100%. |
| **2. Non-negativity** | $P(E) \geq 0$ | No negative odds. You cannot have a less-than-zero chance of an event occurring. |
| **3. Additivity** | $P\!\left(\bigcup_{i=1}^{\infty} E_i\right) = \sum_{i=1}^{\infty} P(E_i)$ | Add if no overlap. If events are [[Concepts/Mutually Exclusive Events]], the probability of "one or the other" is the sum of their individual probabilities. |

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
