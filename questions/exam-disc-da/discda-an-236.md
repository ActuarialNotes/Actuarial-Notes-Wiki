---
id: "discda-an-236"
exam: "Exam DISC-DA"
topic: "Predictive Analytics"
learning_objective: "10. Ethical and Societal Considerations of Data Analytics"
difficulty: easy
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Predictive+Analytics
answer: "C"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:3f1aeeea8c33afc612b5ecac9200d8b5850837191a1ccdef99875227c158e1d5
  sources:
    - "CAS Exam PCPA Content Outline 2025 (v.8), PDF pp.1-5, sha256:e22ce369f08e1feec88b1ed8a9273c67fd585b1c62193ea3105fe1fe8077189f — https://www.casact.org/sites/default/files/2024-05/Exam_PCPA_2025_F_Content_Outlines.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-236.md
---

A commercial auto insurer asks its analytics team for "a model of our worst accounts." Before any data are pulled, what should the team settle first?

- A) Whether to fit a generalized linear model or a decision tree
- B) What share of the data to hold out for validation
- C) What "worst" means as a target, the unit of analysis, the decision the model will feed, and how it will be validated
- D) Which external data vendors to buy predictors from

## Explanation

A predictive modeling project starts by framing the business problem. "Worst" could mean the highest loss ratio, the highest claim frequency or the largest single loss, and each gives a different model. The unit of analysis (policy, vehicle or policy-year), the decision the model feeds, which also fixes which variables may lawfully be used, and the validation plan all follow from that framing. The answer is **C**.

**Why not the others**

- **A** — the choice of method comes later in the workflow, after the problem is framed and the data reviewed and explored.
- **B** — the hold-out split is a step of fitting and validating the model, not of framing the problem.
- **D** — which data to acquire depends on the target and on which variables may lawfully be used, so it cannot be settled first.
