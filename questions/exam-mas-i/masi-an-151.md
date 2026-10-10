---
id: "masi-an-151"
exam: "Exam MAS-I"
topic: "Ordinal Logistic Regression"
learning_objective: "Extended Linear Models"
difficulty: medium
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Ordinal+Logistic+Regression
  - Concepts/Link+Function
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:918cfc24bc71e60184c12d9438bade53958f2ede27ba11df2232d180caf92b20
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-151.md
---

Auto claims are banded as small ($Y = 1$), medium ($Y = 2$) or large ($Y = 3$). An actuary fits a proportional odds model

$$
\ln\!\left(\frac{\gamma_j}{1 - \gamma_j}\right) = \theta_j + \beta x, \qquad \gamma_j = P(Y \le j), \quad j = 1, 2,
$$

where $x = 1$ for a commercial vehicle and $x = 0$ for a private one. The estimates are $\theta_1 = 0.5$, $\theta_2 = 2.0$ and $\beta = -0.7$.

Which of the following statements is correct?

- A) At each cut-point, a commercial claim's odds of being at or below that band are about half a private claim's
- B) Commercial claims are more likely than private claims to be small, since the coefficient on the commercial indicator is negative
- C) Each band's probability for a commercial claim is the private claim's probability for that band multiplied by $e^{-0.7}$
- D) The commercial-to-private odds ratio is larger at the second cut-point than at the first, because $\theta_2$ exceeds $\theta_1$
- E) A private-vehicle claim is in the medium band with probability $e^{2.0}/(1 + e^{2.0}) = 0.881$, read off the second cut-point

## Explanation

Exponentiating the model gives the odds of "band $j$ or below":

$$
\frac{\gamma_j}{1 - \gamma_j} = e^{\theta_j}\,e^{\beta x}
$$

The cut-point factor $e^{\theta_j}$ cancels when a commercial claim is compared with a private one, so at **every** cut-point

$$
\begin{align*}
\text{odds ratio} &= e^{\beta} \\
&= e^{-0.7} \\
&= 0.497
\end{align*}
$$

A commercial claim's odds of being at or below any band are about half a private claim's. The answer is **A**.

The band probabilities show what this means:

| | $\gamma_1$ | $\gamma_2$ | small | medium | large |
| :--- | ---: | ---: | ---: | ---: | ---: |
| Private ($x = 0$) | 0.6225 | 0.8808 | 0.6225 | 0.2583 | 0.1192 |
| Commercial ($x = 1$) | 0.4502 | 0.7858 | 0.4502 | 0.3357 | 0.2142 |

Halving the odds of "at or below" pushes commercial claims toward the **higher** bands.

**Why not the others**

- **B** — reverses the sign convention. In this parameterisation a negative $\beta$ *lowers* the odds of the lower categories. A negative coefficient means "more likely small" only when output reports the latent-variable form $\theta_j - x\beta^*$, where the sign is flipped.
- **C** — applies the odds ratio to category probabilities. It multiplies cumulative *odds*, not the probability of each band: the medium-band probability actually rises, from 0.258 to 0.336.
- **D** — misses the proportional odds assumption. There is one $\beta$ for all cut-points, so the odds ratio is $e^{-0.7}$ at both; the $\theta_j$ cancel out of the ratio.
- **E** — reads a cumulative probability as a category probability. The second cut-point gives $\gamma_2 = P(Y \le 2) = 0.881$, small *or* medium. The medium band alone has probability 0.881 - 0.622 = 0.258.
