$$P(A) = \frac{|A|}{|S|}, \quad 0 \leq P(A) \leq 1$$
$$\text{where } S = \text{the sample space of all possible outcomes}$$
A **Probability** $P$ is a [[Set Function]] that assigns to each event $E$ in a sample space $S$ a real number $P(A) \in [0, 1]$ that represents the likelihood that $A$ occurs. $P$ must satisfy three fundamental axioms:

1. $P(S) = 1$
2. $P(E) \geq 0$ for all events $E$
3. $P\!\left(\bigcup_{i=1}^{\infty} E_i\right) = \sum_{i=1}^{\infty} P(E_i)$ for any sequence of [[Concepts/Mutually Exclusive Events]].

---

> [!example]- Probability of a Fair Die {💡 Example}
> What is the probability of rolling an even number on a fair, six-sided die?
> > [!answer]- Answer
> > $E = \text{even number} = \{2, 4, 6\}$
> > $P(E) = P(\{2, 4, 6\}) = P(\{2\}) + P(\{4\}) + P(\{6\})$
> > $\frac{1}{6} + \frac{1}{6} + \frac{1}{6} = \frac{1}{2} = 50\%$