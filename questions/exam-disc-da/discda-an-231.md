---
id: "discda-an-231"
exam: "Exam DISC-DA"
topic: "Unfair Discrimination"
learning_objective: "10. Ethical and Societal Considerations of Data Analytics"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Unfair+Discrimination
  - Concepts/Proxy+Discrimination
  - Concepts/Credit-Based+Insurance+Scoring
answer: "C"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:6d8d36db77b0b5897266e4aaa44b4079ec24ce12c0c6af3b93e6fd35c4ea77b1
  sources:
    - "DrivenData, Deon default Data Science Ethics Checklist (checklist.yml), sections A-E, items A.1-E.4, sha256:d1d2681923bba6f52c2900bae79d61e4ebe1a5ae8c1d19274b69a915277e4631 — https://raw.githubusercontent.com/drivendataorg/deon/main/deon/assets/checklist.yml"
    - "Colorado SB21-169 as signed (C.R.S. 10-3-1104.9), (1), (3)(b), (6), (7)(a), (8)(b), PDF pp.2-8, sha256:7fda1f5b30f27b3908e2f2f35e008babcf71235bbfcb905fb7d4627174a5942b — https://leg.colorado.gov/sites/default/files/2021a_169_signed.pdf"
    - "CAS Statement of Principles Regarding P&C Insurance Ratemaking (1988; reinstated May 2021 for U.S. reference), Principle 4, sha256:f240ea62dd033aac827c2073e56c0a4061d5c84531e5cf6be02d333a8f9f2140 — https://www.casact.org/sites/default/files/2021-05/Statement-Of-Principles-Ratemaking.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-231.md
---

An insurer's new homeowners pricing model does not use race or any other protected characteristic as an input. An outside test finds that, for households in predominantly minority neighborhoods, average premiums are 12% above what their average loss costs would support, while for other households premiums and loss costs are in line. Which conclusion is best supported?

- A) The model cannot discriminate, because no protected characteristic is an input
- B) The difference must reflect expected cost, because the model was fitted to loss data
- C) Inputs may act as proxies for race; test and review the variables driving the gap
- D) The insurer must stop writing homeowners business in the affected neighborhoods

## Explanation

Leaving a protected characteristic out of a model does not prevent its effect from entering through correlated inputs: this is **proxy discrimination**. The test that matters is the model's outcomes by group, and here the group pays more than its loss costs support, which is the definition of a rate difference without a cost basis. The insurer should find which inputs drive the gap and whether they relate to loss or only to the group, as Colorado's law, for example, requires insurers using external data to test. The answer is **C**.

**Why not the others**

- **A** — checks the input list rather than the outcomes; correlated variables can reproduce a prohibited variable's effect.
- **B** — fitting to loss data does not guarantee that premiums match loss costs for every group; the test shows they do not here.
- **D** — refusing to write in an area raises its own unfair discrimination issue, and the right response is to investigate and correct the model.
