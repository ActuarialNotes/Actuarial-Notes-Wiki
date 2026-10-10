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
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:6d8d36db77b0b5897266e4aaa44b4079ec24ce12c0c6af3b93e6fd35c4ea77b1
  sources: []
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
