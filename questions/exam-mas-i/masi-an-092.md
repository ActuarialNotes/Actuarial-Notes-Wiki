---
id: "masi-an-092"
exam: "Exam MAS-I"
topic: "Extended Linear Model"
learning_objective: "Extended Linear Models"
difficulty: medium
type: multiple-choice
bloom: evaluate
wiki_link:
  - Concepts/Extended+Linear+Model
  - Concepts/Model+Structure
  - Concepts/Gamma
  - Concepts/Link+Function
  - Concepts/Variance+Function
  - Concepts/Severity
answer: "E"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:e1bd935e09386f2bce997bc667969a31f3765fe72df4ea484d0873c61a6b380c
  sources:
    - "Goldburd, Khare & Tevet, Generalized Linear Models for Insurance Rating, CAS Monograph No. 5 (CAS syllabus reading for MAS-II, Exam 8 and PCPA), 2.2 Table 1 exponential family variance functions: normal 1, Poisson mu, gamma mu^2, Tweedie mu^p, PDF p.17, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "Goldburd, Khare & Tevet, Generalized Linear Models for Insurance Rating, CAS Monograph No. 5 (CAS syllabus reading for MAS-II, Exam 8 and PCPA), 2.1.2 link function: g(mu_i) equals the linear predictor; log link gives a multiplicative rating structure, PDF pp.14-16, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "Goldburd, Khare & Tevet, Generalized Linear Models for Insurance Rating, CAS Monograph No. 5 (CAS syllabus reading for MAS-II, Exam 8 and PCPA), 2.7.1 gamma for severity: right-skewed, bounded at zero, V(mu) = mu^2, PDF p.29, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "CAS Exam MAS-I Content Outline 2026, Domain C tasks 1-9 and readings (Dobson & Barnett, Hogg, James et al., Larsen), PDF p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-092.md
---

An actuary is choosing an extended linear model for individual claim severity in a commercial property book. Exploratory analysis shows:

- every severity is strictly positive and the distribution is strongly right-skewed;
- within groups of similar risks, the standard deviation of severity is roughly proportional to the group's mean, so the coefficient of variation is roughly constant across groups;
- the rating plan is multiplicative, and it needs the model's fitted values to be **mean** severities on the dollar scale, with no further adjustment.

Which of the following models best meets all of these requirements?

- A) Normal response, identity link, fitted to severity
- B) Normal response, identity link, fitted to the log of severity
- C) Normal response, log link, fitted to severity
- D) Poisson response, log link, fitted to severity
- E) Gamma response, log link, fitted to severity

## Explanation

Judge each candidate against the three stated criteria: positive skewed response, standard deviation proportional to the mean, and multiplicative fitted **means**.

A standard deviation proportional to the mean is a variance proportional to $\mu^2$:

$$
\text{Var}(Y) = \phi\,\mu^2 \quad\Longleftrightarrow\quad \frac{\sqrt{\text{Var}(Y)}}{\mu} = \sqrt{\phi}\ \text{(constant)}
$$

which is the Gamma variance function $V(\mu) = \mu^2$. A log link makes the model multiplicative, $\mu = e^{\beta_0} \cdot e^{\beta_1 x_1} \cdots$, keeps every fitted mean positive, and models $\ln E[Y]$, so $e^{\hat\eta}$ is the fitted mean itself. The answer is **E**.

**Why not the others**

- **A** — the identity link is additive, not multiplicative, can produce negative fitted severities, and the Normal assumes a constant variance, contradicting the spread that grows with the mean.
- **B** — regressing $\ln Y$ fixes the skew and is multiplicative, but it models $E[\ln Y]$; exponentiating returns the geometric mean (the median, if $\ln Y$ is symmetric), which understates the mean of a right-skewed severity unless a retransformation correction is applied — failing the third criterion.
- **C** — the log link gives multiplicative, positive means, but the Normal still assumes $\text{Var}(Y)$ is the same for every risk, so large risks are over-weighted relative to the observed spread.
- **D** — the Poisson variance is proportional to $\mu$, not $\mu^2$, so the standard deviation would grow only like $\sqrt{\mu}$; the coefficient of variation would fall as severity rises, which the data contradict.
