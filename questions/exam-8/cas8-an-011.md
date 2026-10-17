---
id: "cas8-an-011"
exam: "Exam 8"
topic: "Reasonableness Testing"
learning_objective: "Excess, Deductible, and Individual Risk Rating"
difficulty: hard
type: multiple-choice
bloom: evaluate
wiki_link:
  - Concepts/Reasonableness+Testing
  - Concepts/Loss+Sensitive+Rating
  - Concepts/Expected+Loss
answer: "D"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c770a6a87be5adc5a8cebf018df9e2401c023464cbfc5bf1964670312f2ee4d3
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-8/cas8-an-011.md
---

An actuary is building a pricing model for loss-sensitive workers compensation plans. Expected losses come from the company's own loss-only estimates, which exclude loss adjustment expense. The per-occurrence excess losses come from applying a rating bureau's excess factors, which are ratios to the bureau's pure premium, to those estimates. The aggregate excess losses come from the company's own model.

As a check, the actuary adds the predicted primary, per-occurrence excess and aggregate excess losses for a range of plans and accounts. The sums come out consistently below the predicted total losses for those accounts.

Which response is most appropriate?

- A) Accept the result, because layered estimates are not expected to add back to the total
- B) Scale the primary losses up until each account's parts add back to its total
- C) Raise the aggregate excess losses, because the aggregate model is the company's own
- D) Check if the bureau pure premium carries items, like LAE, missing from the loss estimate
- E) Replace the company's expected losses with the bureau's pure premium for every account

## Explanation

Fisher et al. (Chapter 4, Consistency of Assumptions) recommend exactly this check: compare the sum of the predicted primary, per-occurrence excess and aggregate excess losses with the predicted total losses across the policies and accounts the plan might write. If the parts don't compare reasonably with the total, the assumptions behind the excess estimates should be investigated.

They also name a common cause. A rating bureau's "pure premium" is sometimes loaded with non-loss items, such as loss adjustment expense and loss-based assessments. Applying unadjusted bureau excess factors to a loss estimate that doesn't include those items (and so is smaller) can understate excess losses substantially. Here the per-occurrence excess factors are ratios to a bureau pure premium and are being applied to a loss-only estimate, so that is the first assumption to check. The answer is **D**.

**Why not the others**

- **A** abandons the check. Primary, per-occurrence excess and aggregate excess are layers of the same total loss, so their sum should compare reasonably with it.
- **B** forces the totals to match without finding the error, and puts the shortfall in the wrong layer.
- **C** blames the component with the least evidence against it. The mismatch between the bureau factors and the loss basis is the known suspect.
- **E** throws away the company's own experience to fix a mismatch that only needs the two to be put on the same basis.
