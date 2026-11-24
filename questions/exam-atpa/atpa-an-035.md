---
id: "atpa-an-035"
exam: "Exam ATPA"
topic: "Proxy Discrimination"
learning_objective: "Advanced Predictive Analytics Models"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Proxy+Discrimination
  - Concepts/Bias
answer: "A"
points: 1
---

In a book of policies the true pure premium is

$$
E[Y \mid x, z] = 300 + 40x + 120z
$$

where $x = 1$ for territory 2 and $z = 1$ for membership of a protected group. Half the policyholders in territory 2 belong to the group, against a quarter elsewhere. A model is fitted with territory but without $z$.

How much of the model's fitted territory 2 effect is borrowed from the protected characteristic?

- A) 30
- B) 40
- C) 60
- D) 70
- E) 120

## Explanation

Leaving $z$ out biases the coefficient on $x$, as an omitted variable does in any regression. The fitted coefficient converges to

$$
\beta_x + \beta_z\,\delta
$$

For a 0/1 variable, the slope of $z$ on $x$ is the difference in group shares:

$$
\delta = 0.50 - 0.25 = 0.25
$$

The borrowed part is $\beta_z\delta = 120(0.25) = \mathbf{30}$, and the fitted territory effect is 40 + 30 = 70. Checking by averages, territory 2 is charged 300 + 40 + 120(0.50) = 400 and the rest 300 + 120(0.25) = 330, a difference of 70. The answer is **A**.

**Why not the others**

- **B** — 40 is territory 2's own effect, $\beta_x$, the part that is not borrowed.
- **C** — multiplies $\beta_z$ by territory 2's group share, 0.50, instead of by the difference in shares.
- **D** — 70 is the whole fitted territory effect, own and borrowed together.
- **E** — 120 is the full effect of $z$, as if every territory 2 policyholder and no one else were in the group.
