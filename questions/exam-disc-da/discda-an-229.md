---
id: "discda-an-229"
exam: "Exam DISC-DA"
topic: "Data Ethics"
learning_objective: "10. Ethical and Societal Considerations of Data Analytics"
difficulty: easy
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Data+Ethics
  - Concepts/Data+Ethics+Checklist
answer: "D"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2cf8c5c279da922239e5c1d7fa6a4955f0045ab19bcebd5acbe3bbd0f7ec5254
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-229.md
---

An insurer collected detailed home-inspection photographs from policyholders to settle property claims. The marketing department now wants to run an image model over the photographs to target policyholders for home-improvement loan offers from a partner bank. Which data ethics principle is most directly at issue?

- A) Accountability, because no one has been named to own the image model
- B) Transparency, because the image model's output would be hard to explain
- C) Fairness, because the offers might differ across protected groups
- D) Consent, because the photos were given for claims, not for marketing

## Explanation

Consent is tied to a purpose: policyholders supplied the photographs to settle claims, and that consent does not automatically extend to a different use such as marketing a partner's loans. Using the data for the new purpose would at least require telling them and obtaining agreement. Sharing nonpublic personal information with a nonaffiliated bank would also raise GLBA's notice and opt-out requirements. The answer is **D**.

**Why not the others**

- **A** — accountability matters for any model, but nothing in the scenario says ownership is missing; the problem arises before any model is built.
- **B** — explainability is a concern for decisions about individuals; here the issue is whether the data may be used at all.
- **C** — fairness could become a concern, but the immediate problem is using data beyond the purpose it was given for.
