---
id: "masi-an-152"
exam: "Exam MAS-I"
topic: "Ordinal Logistic Regression"
learning_objective: "Extended Linear Models"
difficulty: medium
type: multi-part
bloom: apply
wiki_link:
  - Concepts/Ordinal+Logistic+Regression
  - Concepts/Link+Function
points: 2
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:c672a92537144306b2cf7af04467d5e14cf8a47e1e8aba2fa31fea553f6ca4b8
  sources:
    - "Rodriguez, Lecture Notes on Generalized Linear Models (Princeton), Ch.6 Multinomial Response Models, §6.5.2-6.5.3, PDF pp.17-19 (cumulative link model with one beta for all cut-points; latent-variable form with beta* = -beta; proportional odds model logit(gamma_ij) = theta_j + x'beta), sha256:f559d07ae73bdf381de5c19a9f0621419c635e5c6495c0135af940ae36807cbb — https://grodri.github.io/glms/notes/c6.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-152.md
---

A workers' compensation insurer grades each injury as minor ($Y = 1$), moderate ($Y = 2$), serious ($Y = 3$) or severe ($Y = 4$). It fits a proportional odds model

$$
\ln\!\left(\frac{\gamma_j}{1 - \gamma_j}\right) = \theta_j + \beta_1 x_1 + \beta_2 x_2, \qquad \gamma_j = P(Y \le j), \quad j = 1, 2, 3,
$$

with these estimates:

| Parameter | Estimate |
| :--- | ---: |
| $\theta_1$ | -0.4 |
| $\theta_2$ | 1.1 |
| $\theta_3$ | 2.6 |
| $\beta_1$ (attorney involved: $x_1 = 1$, otherwise 0) | -0.9 |
| $\beta_2$ (claimant age in decades: $x_2 = \text{age}/10$) | -0.15 |

Consider a 40-year-old claimant who has an attorney.

## Part a (1 point)
Calculate the probability that this claimant's injury is graded moderate ($Y = 2$). Give your answer to three decimal places.

### Answer
0.271

### Explanation
The covariates contribute the same amount at every cut-point:

$$
\begin{align*}
\beta_1 x_1 + \beta_2 x_2 &= -0.9(1) - 0.15(4) \\
&= -1.5
\end{align*}
$$

Invert the logit at the first two cut-points:

$$
\begin{align*}
\gamma_1 &= \frac{1}{1 + e^{-(-0.4 - 1.5)}} \\
&= \frac{1}{1 + e^{1.9}} \\
&= 0.1301 \\[4pt]
\gamma_2 &= \frac{1}{1 + e^{-(1.1 - 1.5)}} \\
&= \frac{1}{1 + e^{0.4}} \\
&= 0.4013
\end{align*}
$$

A category probability is the difference of adjacent cumulative probabilities:

$$
\begin{align*}
P(Y = 2) &= \gamma_2 - \gamma_1 \\
&= 0.4013 - 0.1301 \\
&= \mathbf{0.271}
\end{align*}
$$

**Common wrong entries**

- **0.401** — stops at $\gamma_2$, which is $P(Y \le 2)$, minor *or* moderate, instead of subtracting $\gamma_1$.
- **0.181** — subtracts the covariate effect instead of adding it ($\theta_j + 1.5$), the sign convention of the latent-variable form.
- **0.336** — leaves out the age term, using $-0.9$ as the whole covariate effect.

## Part b (1 point)
Calculate the probability that this claimant's injury is graded severe ($Y = 4$). Give your answer to three decimal places.

### Answer
0.250

### Explanation
The top category is everything above the last cut-point:

$$
\begin{align*}
\gamma_3 &= \frac{1}{1 + e^{-(2.6 - 1.5)}} \\
&= \frac{1}{1 + e^{-1.1}} \\
&= 0.7503 \\[4pt]
P(Y = 4) &= 1 - \gamma_3 \\
&= \mathbf{0.250}
\end{align*}
$$

The full distribution is $(0.130,\ 0.271,\ 0.349,\ 0.250)$, which sums to 1.

**Common wrong entries**

- **0.750** — reports $\gamma_3 = P(Y \le 3)$ instead of its complement.
- **0.016** — reverses the sign of the covariate effect, as in part (a).
- **0.155** — leaves out the age term.
