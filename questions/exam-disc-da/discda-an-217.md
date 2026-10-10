---
id: "discda-an-217"
exam: "Exam DISC-DA"
topic: "Insurance Data Regulation"
learning_objective: "10. Ethical and Societal Considerations of Data Analytics"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Insurance+Data+Regulation
answer: "D"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e4305868d449e86a5768a95d4fedec1c3cc78bc3a02fc6a46e6b6f8cc36e94d5
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-217.md
---

An insurer domiciled in State P determines that an intruder accessed a database holding names and Social Security numbers. The data cover 300 residents of State Q and 200 residents of State R, and in both states the breach has a reasonable likelihood of materially harming the affected residents. States P, Q and R have all enacted the NAIC Insurance Data Security Model Law as written. Under the model law's notification test, which commissioners must the insurer notify within 72 hours of its determination?

- A) State P's commissioner only
- B) State P's, State Q's and State R's commissioners
- C) State Q's commissioner only
- D) State P's and State Q's commissioners

## Explanation

The model law (Section 6A) requires notice to a state's commissioner, within 72 hours of determining that a cybersecurity event occurred, if that state is the insurer's state of domicile, **or** if the nonpublic information of 250 or more of the state's residents is involved and either notice to a government body is required under other law or the event is reasonably likely to cause material harm.

- **P:** the state of domicile, so notice is required regardless of numbers.
- **Q:** 300 residents is at least 250 and material harm is likely, so notice is required.
- **R:** 200 residents is below 250 and R is not the domicile, so the test is not met.

The answer is **D**.

**Why not the others**

- **A** — overlooks the second trigger: a non-domiciliary state with 250 or more affected residents must also be told.
- **B** — applies the harm condition without the 250-resident threshold.
- **C** — overlooks the domicile trigger, which applies whatever the number of residents.
