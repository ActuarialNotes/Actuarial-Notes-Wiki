---
id: "discrm-an-462"
exam: "Exam DISC-RM"
topic: "Basic Risk Measures"
learning_objective: "1. Introduction to Risk Management"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Basic+Risk+Measures
  - Concepts/Standard+Deviation
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b15572638af58f79190fedc0d26c19db387588920e879683c1354449734b8baf
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-rm/discrm-an-462.md
---
Two of a company's exposures can each produce an annual loss anywhere from \$0 to \$1,000,000. For Exposure X a loss of \$1,000,000 has a probability of 0.001 a year; for Exposure Y it has a probability of 0.10. A junior analyst reports that the two exposures are equally risky because their ranges are equal. Which statement best evaluates the analyst's conclusion?

- A) It is unsound, because the range ignores how likely the extreme outcomes are
- B) It is sound, because the range measures the worst-case spread of outcomes
- C) It is unsound, because Exposure X has the larger range once probabilities apply
- D) It is sound, because equal ranges imply equal standard deviations

## Explanation

The range, highest outcome minus lowest, is a rough measure of the worst-case spread. It treats an extreme that occurs once in a thousand years the same as one that occurs once in ten, so it cannot tell these exposures apart. A measure that uses every outcome and its probability, such as the standard deviation, would show Exposure Y as far riskier. The answer is **A**.

**Why not the others**

- **B** — The range does describe the worst-case spread, but that is exactly why it is incomplete: it says nothing about likelihood.
- **C** — The range does not depend on probabilities at all; both ranges are \$1,000,000.
- **D** — Equal ranges do not imply equal standard deviations. The standard deviation weights each deviation by its probability, so Y's is much larger.
