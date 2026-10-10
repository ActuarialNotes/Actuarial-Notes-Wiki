---
id: "masi-an-101"
exam: "Exam MAS-I"
topic: "Offset Variable"
learning_objective: "Extended Linear Models"
difficulty: medium
type: free-entry
bloom: apply
wiki_link:
  - Concepts/Offset+Variable
  - Concepts/Poisson+Regression
  - Concepts/Link+Function
answer: "-0.8557"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:5e9f763aa00b417022685f07e71463c8387c369eebd685647b5a722db5cebaa4
  sources:
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (rank 3 for MAS-I), §2.6 Offsets, printed pp.17-19 (PDF pp.27-29): an offset is a predictor whose coefficient is constrained to 1, on the linear-predictor scale (logged for a log link); deductible factors offset as ln(factor); multiple offsets added after logging; exposure offset ln(exposures) in a claim-count model, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (rank 3 for MAS-I), §9.1-9.2, PDF p.100 (coverage-option factors such as deductibles estimated outside the GLM and included as an offset), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "R documentation, stats::glm, offset argument (one or more offset terms, summed); null.deviance and df.null; na.action, sha256:6b9a6fad58fad62386050ceba47abe28e40241544dd71d20df000fc40563d6c3 — https://stat.ethz.ch/R-manual/R-devel/library/stats/html/glm.html"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-101.md
---

An insurer refits its claim-frequency model as a Poisson GLM with a log link. Its deductible relativities were set in a separate study and are not to be re-estimated, so each record's offset carries both its exposure and its established deductible relativity. One record has 0.5 car-years of exposure and a \$1,000 deductible, whose established relativity is 0.85.

Calculate the value of the offset for this record. Give your answer to four decimal places, e.g. -1.2345.

## Explanation

Under a log link the model is multiplicative on the mean,

$$
\mu_i = \text{exposure}_i \times \text{deductible relativity}_i \times e^{\beta_0 + \beta_1 x_{i1} + \cdots}
$$

so on the linear-predictor scale each known factor enters as its **logarithm**, and the logs add:

$$
\begin{aligned}
\text{offset} &= \ln(0.5) + \ln(0.85) \\
&= -0.69315 - 0.16252 \\
&= -0.85567
\end{aligned}
$$

The offset is **-0.8557**.

**Common wrong entries**

- **0.4250** — the product 0.5 × 0.85 entered unlogged; the offset must be on the scale of the linear predictor, so a log link needs $\ln(0.425)$, which is the same $-0.8557$.
- **-0.6931** — the exposure alone; the deductible relativity is then re-estimated (or ignored) instead of carried forward.
- **-0.1625** — the deductible relativity alone, forgetting that exposure belongs in the offset too.
