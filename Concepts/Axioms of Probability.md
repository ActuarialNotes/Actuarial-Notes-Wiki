$$P(A) \geq 0 \quad \text{for every event } A$$
$$P(S) = 1$$
$$ P\!\left(\bigcup_{i=1}^{\infty} A_i\right) = \sum_{i=1}^{\infty} P(A_i)  \quad \text{where } A_1, A_2, \ldots \text{are mutually exclusive}$$

The Axioms of Probability (Kolmogorov's axioms) are three foundational rules that any valid [[Concepts/Probability]] $P$ must satisfy:

1. **Non-negativity**: Probability is > 0
2. **Normalization**: The probability of the sample space is 1.
3. **Countable Additivity**: The probability of the union of mutually exclusive events is the sum of the probability of each event.

---

> [!example]- Axioms satisfied? {💡 Example}
> A probability model assigns $P(A) = 0.3$, $P(B) = 0.5$, and $P(A \cup B) = 0.9$ where $A$ and $B$ are mutually exclusive. Does this violate the axioms of probability?
> 
> > [!answer]- Answer
> > If $A$ and $B$ are mutually exclusive, countable additivity requires $P(A \cup B) = P(A) + P(B) = 0.3 + 0.5 = 0.8$. Since the model states $P(A \cup B) = 0.9 \neq 0.8$, **yes, it violates the third axiom**.

> [!example]- Deriving the Complement Rule from the Axioms {💡 Example}
> Using only the three axioms of probability, prove that $P(A^c) = 1 - P(A)$.
>
> > [!answer]- Answer
> > $A$ and $A^c$ are mutually exclusive (disjoint) and $A \cup A^c = S$. By Axiom 3 (additivity):
> > $$P(A \cup A^c) = P(A) + P(A^c)$$
> > But $A \cup A^c = S$, so by Axiom 2:
> > $$P(S) = 1 = P(A) + P(A^c)$$
> > Therefore $P(A^c) = 1 - P(A)$. $\square$
