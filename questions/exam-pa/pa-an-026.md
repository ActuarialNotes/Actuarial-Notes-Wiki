---
id: "pa-an-026"
exam: "Exam PA"
topic: "Interaction"
learning_objective: "Generalized Linear Models"
difficulty: hard
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Interaction
  - Concepts/Link+Function
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5c998b01bb703b330c25d08096c2136786d8240e6f203aef824454a504353b1d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-pa/pa-an-026.md
---

A claim frequency model has an intercept, an indicator $x_1$ for a young driver, an indicator $x_2$ for an urban territory, and their interaction. Its fitted mean frequencies for the four combinations are:

| | Not urban ($x_2 = 0$) | Urban ($x_2 = 1$) |
| --- | ---: | ---: |
| Not young ($x_1 = 0$) | 0.10 | 0.20 |
| Young ($x_1 = 1$) | 0.15 | 0.36 |

The model uses a log link. Determine which of the following statements are true.

- I. The interaction coefficient is about 0.182.
- II. Had the model used the identity link, with the same four fitted means, its interaction coefficient would also be about 0.182.
- III. The expected frequency of a young urban driver is $e^{\hat{\beta}_3} \approx 1.2$ times that of a driver who is neither young nor urban.

- A) I only
- B) I and II only
- C) I and III only
- D) II and III only
- E) The answer is not given by (A), (B), (C), or (D)

## Explanation

With link $g$, the interaction coefficient of two indicators is

$$
\beta_3 = g(\mu_{11}) - g(\mu_{10}) - g(\mu_{01}) + g(\mu_{00})
$$

where the first subscript is $x_1$ and the second is $x_2$.

**I is true.** Under the log link,

$$
\beta_3 = \ln\frac{\mu_{11}\,\mu_{00}}{\mu_{10}\,\mu_{01}} = \ln\frac{0.36 \times 0.10}{0.15 \times 0.20} = \ln 1.2 = 0.182
$$

**II is false.** Under the identity link the same means give $\beta_3 = 0.36 - 0.15 - 0.20 + 0.10 = 0.11$. Whether two effects interact, and by how much, depends on the scale of the link.

**III is false.** The young urban driver's frequency is $\mu_{11}/\mu_{00} = 0.36 / 0.10 = 3.6$ times the base. The factor $e^{\hat{\beta}_3} = 1.2$ is only the part beyond the product of the two main effects, $\frac{0.15}{0.10} \times \frac{0.20}{0.10} = 3.0$.

Only I is true, so the answer is **A**.

**Why not the others**

- **B** accepts II, assuming an interaction coefficient is the same whatever the link.
- **C** accepts III, reading the interaction term alone as the combination's whole relativity.
- **D** accepts both of those errors and rejects the correct calculation in I.
- **E** would need another combination, but only I is true.
