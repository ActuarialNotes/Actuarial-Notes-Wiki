---
id: "cas8-an-001"
exam: "Exam 8"
topic: "Rate Class Validity"
learning_objective: "Classification Ratemaking"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Rate+Class+Validity
  - Concepts/Rating+Class
  - Concepts/Statistical+Significance
answer: "E"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a785eedc751c9739ac73fc5d0a2517f504f7701628627490d465275f37d3c727
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-8/cas8-an-001.md
---

A commercial property frequency GLM includes occupancy class. One occupancy class has only 35 policies. On the full modelling data its relativity is 2.40, with a p-value below 0.01. The record with the largest Cook's distance is a single fire loss in that class. Refitting without that record gives the class a relativity of 0.70, with a p-value of 0.02. The other classes' relativities barely change.

Which conclusion about the validity of this rate class is best supported?

- A) The class is riskier than average, because the full-data estimate is significant at the 1% level
- B) The class is safer than average, so the fire loss should be removed from the data permanently
- C) The class should be split further, to isolate risks like the one that had the fire
- D) The model's link function is wrong, so the whole model needs to be rebuilt before any class is judged
- E) The class's indication is unstable, so neither estimate should be given full weight

## Explanation

Goldburd et al. (Section 6.4) define model stability as the sensitivity of the model to changes in the data, and give exactly this example: a large loss in a class with few members. With the loss, the model says with high confidence that the class is very risky. Without it, the model says with nearly the same confidence that the class is safe. A rate class whose relativity swings from 2.40 to 0.70 on one record does not reflect a lasting difference in expected cost. Neither figure should be given full weight. The remedy is more data, a broader group to credibility-weight toward, or a limit on large losses. The answer is **E**.

**Why not the others**

- **A** treats significance as proof of validity. Significance is measured on the data that produced it, and here one record decides it.
- **B** swings to the other extreme. The fire is real experience of that kind of risk. Dropping it just makes the class look too safe.
- **C** makes the problem worse. A finer split leaves even fewer policies per class, and its estimates are even less stable.
- **D** misreads the diagnostic. The other classes barely move, so the problem is one class's thin data, not the model's form.
