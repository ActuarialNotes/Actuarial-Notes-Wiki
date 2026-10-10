---
id: "discda-an-220"
exam: "Exam DISC-DA"
topic: "Data Ethics Checklist"
learning_objective: "10. Ethical and Societal Considerations of Data Analytics"
difficulty: easy
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Data+Ethics+Checklist
  - Concepts/Data+Ethics
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9b97d2116b9e0e5a34fcf2cca6828830c5c9efdfea301f6dd294243ab1d3b8e0
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-220.md
---

A team applying the Deon data science ethics checklist to a telematics pricing project finds that trip data from former policyholders are being kept indefinitely after their policies end. Under which section of the checklist is this concern raised?

- A) Data collection
- B) Data storage
- C) Analysis
- D) Deployment

## Explanation

Deon's **Data Storage** section asks about data security, a way for people to have their data removed, and a **data retention plan**: "Is there a schedule or plan to delete the data after it is no longer needed?" Keeping former policyholders' trip data indefinitely fails that item. The answer is **B**.

**Why not the others**

- **A** — collection items concern consent, collection bias and limiting what personal data are gathered in the first place, not how long they are kept.
- **C** — analysis items concern blind spots, dataset bias, honest representation, privacy in analysis and auditability.
- **D** — deployment items concern monitoring, redress, rollback and unintended use of a model in production.
