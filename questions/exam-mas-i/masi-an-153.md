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
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:0f9f498e32278ce81197cfa1c17ae9f3ca3ed9ad853ad61219d3bf0f98c7c227
  sources:
    - "Rodriguez, Lecture Notes on Generalized Linear Models (Princeton), Ch.5 Log-Linear Models for Contingency Tables, PDF pp.3-5 (independence test on (I-1)(J-1) d.f.; multinomial and Poisson models give the same fitted values and test) and pp.13-14 (block independence SE + P; conditional independence), sha256:b98785861711e5e1355ef6f0f2d60e0f655b512c68dc73f295953527563444d2 — https://grodri.github.io/glms/notes/c5.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
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
