---
id: "discda-an-221"
exam: "Exam DISC-DA"
topic: "Data Ethics Checklist"
learning_objective: "10. Ethical and Societal Considerations of Data Analytics"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Data+Ethics+Checklist
  - Concepts/Proxy+Discrimination
  - Concepts/Confusion+Matrix
answer: "D"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:3ada46c86614aaba367576fb4c69f3ab6d2296be079b5712fd1a58a57664687e
  sources:
    - "DrivenData, Deon default Data Science Ethics Checklist (checklist.yml), sections A-E, items A.1-E.4, sha256:d1d2681923bba6f52c2900bae79d61e4ebe1a5ae8c1d19274b69a915277e4631 — https://raw.githubusercontent.com/drivendataorg/deon/main/deon/assets/checklist.yml"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-221.md
---

After launch, an insurer's claims fraud triage model is found to refer legitimate claims for investigation, delaying payment, at twice the rate in one group of neighborhoods as in others, although confirmed fraud rates are similar across the neighborhoods. Which Deon checklist item addresses the test that should have caught this before launch?

- A) Informed consent
- B) Data security
- C) Auditability
- D) Fairness across groups

## Explanation

The problem is a difference in **false positive rates** between groups: legitimate claimants in some neighborhoods are wrongly flagged more often. Deon's modeling item D.2, *fairness across groups*, asks whether the model's results have been tested for fairness with respect to different affected groups, for example for disparate error rates. The answer is **D**. Monitoring after deployment (E.1) is what found it; D.2 is the check that should have come first.

**Why not the others**

- **A** — informed consent concerns whether people agreed to the data's use, not how the model's errors fall.
- **B** — data security concerns protecting stored data from unauthorized access.
- **C** — auditability concerns whether the analysis is documented and reproducible. It helps investigate the problem but does not test for it.
