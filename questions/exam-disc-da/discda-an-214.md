---
id: "discda-an-214"
exam: "Exam DISC-DA"
topic: "Claims Modeling Dataset"
learning_objective: "9. Preparing Data for Insurance Applications"
difficulty: easy
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Claims+Modeling+Dataset
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:14a47b301085f04ae1b9de7551fb0dac6852b506230783c3b1059af835f8efdb
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-214.md
---

A personal auto insurer is building a model to predict, at first notice of loss, which bodily injury claims will become severe. Which candidate feature from the claims data warehouse would introduce data leakage?

- A) Total paid on the claim as of the data extract date
- B) Number of days between the accident and the report
- C) Cause-of-loss code entered at first notice of loss
- D) Bodily injury limit on the policy in force at the accident

## Explanation

Data leakage is using information that would not be available when the model makes its prediction, which makes it look better on historical data than it will be in use. The amount paid as of the extract date accumulates after first notice and is part of the outcome being predicted. The answer is **A**.

**Why not the others**

- **B** — the reporting lag is known the moment the claim is reported.
- **C** — the cause-of-loss code is recorded at first notice, so it is available at scoring time.
- **D** — the policy limit comes from the policy record and is known when the claim is reported.
