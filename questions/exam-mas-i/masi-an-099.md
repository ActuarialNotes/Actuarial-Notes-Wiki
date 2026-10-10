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
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e91f2128ceb96b41b4ba90093125f27bad593be5fcb1da575fc5739001da72bc
  sources: []
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
