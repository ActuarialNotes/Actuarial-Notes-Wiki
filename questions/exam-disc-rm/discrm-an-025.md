---
id: "discrm-an-025"
exam: "Exam DISC-RM"
topic: "Risk Identification"
learning_objective: "Risk Identification as a Team"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Risk+Identification
answer: "D"
points: 1
---

A risk manager forms a team to identify a company's exposures. Working alone, the risk manager would find a particular dependence on one supplier with probability 0.6, the purchasing director with probability 0.3, and the plant manager with probability 0.25. If each member misses the exposure independently of the others, what is the probability that at least one of them finds it?

- A) 0.045
- B) 0.21
- C) 0.60
- D) 0.79

## Explanation

The team misses the exposure only if every member misses it:

$$
\begin{align*}
P(\text{found}) &= 1 - (1 - 0.6)(1 - 0.3)(1 - 0.25) \\
&= 1 - (0.4)(0.7)(0.75) \\
&= 1 - 0.21 \\
&= \mathbf{0.79}
\end{align*}
$$

The answer is **D**. The gain over the risk manager's 0.6 comes from members who see the business differently, which is why identification is done by a team.

**Why not the others**

- **A** — 0.045 is $(0.6)(0.3)(0.25)$, the probability that *all three* find it.
- **B** — 0.21 is the probability that all three miss it, the complement of the answer.
- **C** — 0.60 is the best individual's chance, which ignores what the other members add.
