---
id: "masi-an-154"
exam: "Exam MAS-I"
topic: "Log-Linear Model"
learning_objective: "Extended Linear Models"
difficulty: hard
type: multiple-choice
bloom: evaluate
wiki_link:
  - Concepts/Log-Linear+Model
  - Concepts/Deviance
  - Concepts/Likelihood+Ratio+Test
  - Concepts/Chi-Squared+Distribution
  - Concepts/Interaction
  - Concepts/Model+Selection
answer: "B"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:4dc68be781fe872dc73b9dfab4a62af9aa4beae94bff71deb721e1a982322028
  sources:
    - "Rodriguez, Lecture Notes on Generalized Linear Models (Princeton), Ch.5 Log-Linear Models for Contingency Tables, PDF pp.3-5 (independence test on (I-1)(J-1) d.f.; multinomial and Poisson models give the same fitted values and test) and pp.13-14 (block independence SE + P; conditional independence), sha256:b98785861711e5e1355ef6f0f2d60e0f655b512c68dc73f295953527563444d2 — https://grodri.github.io/glms/notes/c5.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-154.md
---

Commercial auto policies are cross-classified by territory $T$ (3 levels), vehicle use $U$ (2 levels: service, delivery) and whether a claim was made in the year $Y$ (2 levels), giving 12 cells. Poisson log-linear models are fitted with these results:

| Model | Deviance | Degrees of freedom |
| :--- | ---: | ---: |
| $T + U + Y$ | 48.2 | 7 |
| $T + UY$ | 22.8 | 6 |
| $TU + Y$ | 31.5 | 5 |
| $TU + UY$ | 6.1 | 4 |
| $TU + TY$ | 25.9 | 3 |
| $TU + TY + UY$ | 2.3 | 2 |
| $TUY$ (saturated) | 0.0 | 0 |

The 95th percentiles of the chi-squared distribution are 3.841 (1 df), 5.991 (2 df), 7.815 (3 df), 9.488 (4 df), 11.070 (5 df), 12.592 (6 df) and 14.067 (7 df).

The actuary's criteria are: a model must fit (its deviance is not significant at the 5% level), and a term is kept only if dropping it raises the deviance significantly at the 5% level.

Which model and interpretation should the actuary choose?

- A) $TU + Y$, because adding the $TU$ term to complete independence lowers the deviance significantly
- B) $TU + UY$, under which territory and claim occurrence are independent once vehicle use is known
- C) $TU + UY$, under which claim occurrence is independent of both territory and vehicle use
- D) $TU + TY + UY$, since it has the lowest deviance of the unsaturated models
- E) $TUY$, since its deviance of zero means it reproduces every cell count exactly

## Explanation

**Which models fit.** Compare each deviance with the chi-squared percentile for its degrees of freedom:

| Model | Deviance | Critical value | Fits? |
| :--- | ---: | ---: | :--- |
| $T + U + Y$ | 48.2 | 14.067 | No |
| $T + UY$ | 22.8 | 12.592 | No |
| $TU + Y$ | 31.5 | 11.070 | No |
| $TU + UY$ | 6.1 | 9.488 | Yes |
| $TU + TY$ | 25.9 | 7.815 | No |
| $TU + TY + UY$ | 2.3 | 5.991 | Yes |

**Which terms are needed.** Start from the larger fitting model and test each term by the drop in deviance:

$$
\begin{align*}
TY \text{ (from } TU + TY + UY \text{ to } TU + UY) &: 6.1 - 2.3 = 3.8 \text{ on } 2 \text{ df} < 5.991 \\
UY \text{ (from } TU + UY \text{ to } TU + Y) &: 31.5 - 6.1 = 25.4 \text{ on } 1 \text{ df} > 3.841 \\
TU \text{ (from } TU + UY \text{ to } T + UY) &: 22.8 - 6.1 = 16.7 \text{ on } 2 \text{ df} > 5.991
\end{align*}
$$

$TY$ can be dropped; $UY$ and $TU$ cannot. The chosen model is $TU + UY$. It contains no term linking $T$ and $Y$ directly, so the expected counts factor as $\mu_{ijk} \propto \pi_{ij\cdot}\,\pi_{\cdot jk}/\pi_{\cdot j\cdot}$: territory and claim occurrence are **conditionally independent given vehicle use**. Territory appears to affect claims only through its mix of service and delivery vehicles. The answer is **B**.

**Why not the others**

- **A** — stops at the first significant improvement. Adding $TU$ does lower the deviance by 48.2 - 31.5 = 16.7 on 2 df, but $TU + Y$ still fails the fit test (31.5 > 11.070), and adding $UY$ lowers the deviance by a further 25.4 on 1 df.
- **C** — picks the right model but misreads it. The $UY$ term is there precisely because claim occurrence *is* associated with vehicle use; only the $T$–$Y$ link is absent.
- **D** — chooses by lowest deviance alone. A bigger model always fits at least as well; its extra $TY$ term buys a drop of only 3.8 on 2 df, which is not significant.
- **E** — the saturated model has zero deviance by construction (one parameter per cell), so it explains nothing and fails the parsimony criterion.
