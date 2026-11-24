---
id: "atpa-an-001"
exam: "Exam ATPA"
topic: "Data Ethics"
learning_objective: "Ethical Foundations"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Data+Ethics
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9851325e68f596707a49d76ef1bedfc6eae866637bd19e94f061bd5da80699c5
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-atpa/atpa-an-001.md
---

An insurer reviews a new auto rating model for fairness before filing it. The model does not use any protected characteristic. For policyholders in a protected group, the review finds:

| | Group average | Portfolio average |
| :--- | ---: | ---: |
| Premium | \$1,320 | \$1,100 |
| Loss cost | \$780 | \$750 |

Using the premium-to-loss-cost ratio, which conclusion is best supported?

- A) The group's premium is 20% above the portfolio average, so its premium is excessive whatever its losses are.
- B) The group pays about 15% more than its loss costs support, so the variables driving its premium should be examined.
- C) The ratio is about 0.87, so the group is charged less than its loss costs support.
- D) The model does not use the protected characteristic, so the premium difference cannot be unfair discrimination.
- E) The group's loss cost is above the portfolio average, so its higher premium is fully supported by its losses.

## Explanation

The premium-to-loss-cost ratio compares the group's premium relativity with its loss cost relativity:

$$
R_g = \frac{\bar{P}_g / \bar{P}}{\bar{L}_g / \bar{L}} = \frac{1{,}320 / 1{,}100}{780 / 750} = \frac{1.20}{1.04} = 1.154
$$

A ratio well above 1 means the group pays more than its losses support, here by about 15%. The next step is to find which variables drive the difference, since a variable correlated with the protected characteristic can act as a proxy for it. The answer is **B**.

**Why not the others**

- **A** looks only at the premium relativity of 1.20 and ignores that the group's loss cost is also 4% above average. Part of the higher premium is supported.
- **C** inverts the ratio, dividing the loss cost relativity by the premium relativity ($R = 1.04/1.20 = 0.87$).
- **D** is the trap of treating a model as fair because the protected variable was left out. A correlated variable can stand in for it, so fairness is tested on outcomes by group.
- **E** notices that losses are above average but not that premium is much further above average. A 4% higher loss cost supports a relativity near 1.04, not 1.20.
