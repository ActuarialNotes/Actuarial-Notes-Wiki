---
id: "masi-an-130"
exam: "Exam MAS-I"
topic: "Exploratory Data Analysis"
learning_objective: "Extended Linear Models"
difficulty: medium
type: multiple-choice
bloom: evaluate
wiki_link:
  - Concepts/Exploratory+Data+Analysis
  - Concepts/Gamma
  - Concepts/Generalized+Linear+Model
  - Concepts/Variance+Function
  - Concepts/Box+Plot
  - Concepts/Histogram
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:6926db33589a428383007dae557c3596aea86300bb34db3a93d8f571aab31281
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-130.md
---

Exploratory analysis of commercial property claim severity (claims with payment only) shows:

- A histogram: every claim is positive, with a strong right skew and a long right tail.
- Side-by-side box plots by occupancy class: the medians are 3, 6 and 12 (thousands), and the interquartile ranges are 2, 4 and 8. Each box's spread is in the same proportion to its median.
- A scatter plot against building value: severity rises with value, in a wedge that widens steadily as value increases.

The actuary wants the GLM whose response distribution is consistent with the response's range of values and its skew, and whose variance changes with the mean the way these plots show. Which specification is most appropriate?

- A) Gamma distribution with a log link
- B) Poisson distribution with a log link
- C) Normal distribution with an identity link
- D) Tweedie distribution with power 1.5 and a log link
- E) Inverse Gaussian distribution with a log link

## Explanation

Read each plot for what it says about the response:

- **Range and skew** (histogram): strictly positive and right-skewed, so a continuous, positive, skewed distribution.
- **Variance against mean** (box plots): as the median doubles from 3 to 6 to 12, the IQR doubles from 2 to 4 to 8. Spread proportional to the centre means the standard deviation is proportional to the mean:

$$
\text{SD}(Y) \propto \mu \quad\Longleftrightarrow\quad \text{Var}(Y) \propto \mu^2
$$

That is the gamma variance function, $V(\mu) = \mu^2$. The widening wedge in the scatter plot is the same fact seen against a predictor, and the log link keeps fitted means positive and makes the effects multiplicative. The answer is **A**.

**Why not the others**

- **B** — the Poisson is for counts, and its variance is proportional to $\mu$, so its standard deviation grows only like $\sqrt{\mu}$ — slower than these plots show.
- **C** — the normal allows negative values, is symmetric, and assumes constant variance; all three are contradicted by the plots.
- **D** — a Tweedie with power between 1 and 2 is built for a point mass at zero plus a positive tail (pure premium). These are claims with payment, with no zeros, and its variance $\mu^{1.5}$ grows more slowly than the plots show.
- **E** — the inverse Gaussian has $V(\mu) = \mu^3$, so its standard deviation grows like $\mu^{1.5}$: doubling the median would multiply the spread by about 2.8, not 2.
