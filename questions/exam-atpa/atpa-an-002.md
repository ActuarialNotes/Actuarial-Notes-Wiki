---
id: "atpa-an-002"
exam: "Exam ATPA"
topic: "Data Ethics"
learning_objective: "Ethical Foundations"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Data+Ethics
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:d70510311b093219ca968bb7eb1136d268d750c70bcf690c1f444be394ae5230
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-atpa/atpa-an-002.md
---

A year after launching a telematics discount, an insurer finds that 42% of participants in a protected group earn a discount, against 60% of participants in the reference group. The rating model does not use group membership as an input.

Determine which of the following statements are true.

- I. The adverse impact ratio is below 0.8, so a four-fifths screen flags the result for review.
- II. Because the ratio is below 0.8, the protected group's premiums exceed what its loss costs support.
- III. Because group membership is not a model input, screening the model's outcomes by group is unnecessary.

- A) I only
- B) I and II only
- C) I and III only
- D) II and III only
- E) The answer is not given by (A), (B), (C), or (D)

## Explanation

The adverse impact ratio compares the rates at which the two groups receive the favourable outcome:

$$
\text{AIR} = \frac{p_{\text{protected}}}{p_{\text{reference}}} = \frac{0.42}{0.60} = 0.70
$$

- **I is true.** 0.70 is below the four-fifths threshold of 0.8, so the screen flags the result for review.
- **II is false.** The screen compares outcomes, not costs. The groups may genuinely differ in how they drive, so a flag does not prove unfair discrimination. Whether premiums exceed what losses support is a separate check, the premium-to-loss-cost ratio, which needs each group's loss costs.
- **III is false.** Leaving a protected characteristic out of a model does not make it fair, because a correlated variable can act as a proxy. Fairness is tested on the model's outcomes by group, which is what the screen does.

Only I is true, so the answer is **A**.

**Why not the others**

- **B** accepts II, reading an outcome screen as a cost comparison.
- **C** accepts III, treating a model without the protected input as fair by construction.
- **D** rejects the one true statement and accepts both false ones.
- **E** would be right only for a combination (A) to (D) do not list, such as II only, III only, all three or none. Exactly I is true.
