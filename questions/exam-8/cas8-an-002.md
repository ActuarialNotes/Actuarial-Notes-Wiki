---
id: "cas8-an-002"
exam: "Exam 8"
topic: "Rate Class Validity"
learning_objective: "Classification Ratemaking"
difficulty: medium
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Rate+Class+Validity
  - Concepts/Credibility
  - Concepts/Homogeneity
  - Concepts/Complement+of+Credibility
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:256a86ae5cd606629ee9e02375a4a37bee70e633daacc8459ef13e773a962075
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-8/cas8-an-002.md
---

Determine which of the following statements about evaluating the validity of rate classes are true.

- I. Under ASOP No. 12, when the available data are not sufficient for credible inferences about each class, the actuary balances predictability against homogeneity.
- II. A finer set of classes that lowers the squared error on the data used to fit it has thereby been shown to be valid.
- III. In a lasso credibility model, a class with plenty of exposure whose modelled coefficient is penalized to zero has experience too close to its complement to deviate from it.

- A) I only
- B) I and II only
- C) I and III only
- D) II and III only
- E) The answer is not given by (A), (B), (C), or (D)

## Explanation

- **I is true.** ASOP No. 12, Section 3.3.2(b): classes should be large enough to allow credible statistical inferences, and when the data are not sufficient, the actuary should balance considerations of predictability with considerations of homogeneity.
- **II is false.** More classes always fit the data that estimated them at least as well, because each extra class is free to chase that data's noise. A split is shown to be valid only when it predicts data it never saw, such as a holdout period, better than the coarser scheme does.
- **III is true.** Holmes and Casotto (Section 6.3.2) give two cases where lasso credibility gives the complement full credibility. One is a segment with enough data whose experience is too similar to the complement to deviate. The other is a segment with too little data to pass the lasso credibility threshold. With plenty of exposure, this class is the first case.

Statements I and III are true, so the answer is **C**.

**Why not the others**

- **A** misses III, reading a zero lasso coefficient as a sign of no data when this class has plenty.
- **B** and **D** accept II, judging a split on the data that fitted it.
- **E** would need all three statements true, or a set no option lists; II is false.
