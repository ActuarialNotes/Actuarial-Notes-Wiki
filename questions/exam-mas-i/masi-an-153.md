---
id: "masi-an-153"
exam: "Exam MAS-I"
topic: "Log-Linear Model"
learning_objective: "Extended Linear Models"
difficulty: medium
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Log-Linear+Model
  - Concepts/Poisson+Regression
  - Concepts/Deviance
  - Concepts/Interaction
answer: "D"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:0f9f498e32278ce81197cfa1c17ae9f3ca3ed9ad853ad61219d3bf0f98c7c227
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-153.md
---

Determine which of the following statements about log-linear models for contingency tables are true.

- I. For a table with 3 rows and 4 columns, the deviance of the independence model is compared with a chi-squared distribution with 11 degrees of freedom.
- II. The independence model gives the same fitted counts whether the cell counts are treated as independent Poisson variables or as multinomial with the grand total fixed.
- III. In a three-way table with classifying variables $A$, $B$ and $C$, the model $AB + C$ allows $A$ and $B$ to be associated but makes the pair $(A, B)$ independent of $C$.

- A) I only
- B) I and II only
- C) I and III only
- D) II and III only
- E) The answer is not given by (A), (B), (C), or (D)

## Explanation

**I is false.** The independence model $\ln\mu_{ij} = \eta + \alpha_i + \beta_j$ has $(I - 1) + (J - 1) + 1$ parameters, and the table has $IJ$ cells, so its deviance has

$$
\begin{align*}
IJ - 1 - (I - 1) - (J - 1) &= (I - 1)(J - 1) \\
&= (3 - 1)(4 - 1) \\
&= 6
\end{align*}
$$

degrees of freedom. Eleven is $IJ - 1$, the count for a model with only an intercept.

**II is true.** Conditioning independent Poisson counts on their total gives a multinomial distribution, and a model that contains the intercept reproduces the grand total exactly. Either way the fitted counts are $\hat\mu_{ij} = y_{i\cdot}\,y_{\cdot j}/n$, and the deviance and its test are the same. This is why a Poisson log-linear fit can be used whatever the sampling scheme.

**III is true.** $AB + C$ contains the $A \times B$ interaction, so $A$ and $B$ may be associated, but no term links either of them to $C$: the expected counts factor as $\mu_{ijk} \propto \pi_{ij\cdot}\,\pi_{\cdot\cdot k}$, which is joint independence of $(A, B)$ and $C$.

Statements II and III are true, so the answer is **D**.

**Why not the others**

- **A**, **B** and **C** each include statement I, which uses $IJ - 1$ instead of $(I - 1)(J - 1)$ degrees of freedom.
- **E** would require a different true set; II and III together are exactly option D.
