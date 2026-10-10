---
id: "masi-an-099"
exam: "Exam MAS-I"
topic: "Control Variable"
learning_objective: "Extended Linear Models"
difficulty: easy
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Control+Variable
  - Concepts/Generalized+Linear+Model
  - Concepts/Offset+Variable
  - Concepts/Rating+Variable
answer: "A"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:e91f2128ceb96b41b4ba90093125f27bad593be5fcb1da575fc5739001da72bc
  sources:
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (rank 3 for MAS-I), §5.1, PDF p.56 (a temporal variable such as year included as a 'control variable' so that trend and development effects do not influence the rating variables' estimates), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (rank 3 for MAS-I), §2.9 Correlation Among Predictors, PDF p.37 (the GLM sorts out each variable's unique effect from correlated variables; two-way correlation tables before modeling), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (rank 3 for MAS-I), §2.6 Offsets, printed pp.17-19 (PDF pp.27-29): an offset is a predictor whose coefficient is constrained to 1, on the linear-predictor scale (logged for a log link); deductible factors offset as ln(factor); multiple offsets added after logging; exposure offset ln(exposures) in a claim-count model, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-099.md
---

A homeowners claim-frequency GLM is fitted to five accident years of data. Over those years frequency trended upward, and the share of newer homes in the book grew steadily. Home age will be a rating variable; the rating plan will **not** vary by accident year. How should accident year be treated in the model?

- A) Include it as a categorical predictor, estimate its effect, and leave that effect out of the rates
- B) Leave it out, because a variable that will not be in the rating plan does not belong in the model
- C) Include it as an offset, so that its coefficient is fixed at 1 and nothing extra is estimated
- D) Include it as a categorical predictor and build its fitted relativities into the rates
- E) Use it as a prior weight, so that the most recent accident years count for more in the fit

## Explanation

Accident year has a real effect on frequency (the trend) and is correlated with a rating variable (newer homes are concentrated in later years). Left out, the model would credit part of the trend to home age — newer homes would look worse than they are because they sit in the higher-frequency years. Included as a **control variable**, its effect is estimated so the home-age relativities are measured net of it, and it is then dropped when the rates are built (or the rates are set at a single chosen year's level). The answer is **A**.

**Why not the others**

- **B** — the fork: "not in the rating plan, so not in the model" causes omitted-variable bias in the correlated rating variable.
- **C** — an offset imposes a *known* effect with a fixed coefficient; the trend is unknown and must be estimated, and an offset of the year number itself has no meaning.
- **D** — the stated plan does not vary by accident year; the trend is handled by trending losses to the future period, not by a rating factor.
- **E** — a prior weight changes how much each record counts, not its expected value, so the trend would still leak into the home-age coefficients.
