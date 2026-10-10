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
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:2cf8c5c279da922239e5c1d7fa6a4955f0045ab19bcebd5acbe3bbd0f7ec5254
  sources:
    - "DrivenData, Deon default Data Science Ethics Checklist (checklist.yml), sections A-E, items A.1-E.4, sha256:d1d2681923bba6f52c2900bae79d61e4ebe1a5ae8c1d19274b69a915277e4631 — https://raw.githubusercontent.com/drivendataorg/deon/main/deon/assets/checklist.yml"
    - "15 U.S.C. §6802 (Cornell LII), (a)-(b), sha256:3fca2e8411b1bad536f5fe8ef6f197c521f95a16ecc96af2419d6af0a039dc51 — https://www.law.cornell.edu/uscode/text/15/6802"
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
