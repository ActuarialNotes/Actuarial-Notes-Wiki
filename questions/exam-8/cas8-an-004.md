---
id: "cas8-an-004"
exam: "Exam 8"
topic: "Model Implementation"
learning_objective: "Classification Ratemaking"
difficulty: medium
type: multiple-choice
bloom: evaluate
wiki_link:
  - Concepts/Model+Implementation
  - Concepts/Deductible+Rating
  - Concepts/Offset+Variable
  - Concepts/Loss+Elimination+Ratio
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:36385619e55b563b327dd69b9c243e4a37cb40b0a731ba24110cbc4247fd5832
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-8/cas8-an-004.md
---

A homeowners pure premium GLM includes deductible as a categorical variable, with the \$500 deductible as the base level. The model returns a factor of 1.06 for the \$1,000 deductible, and the estimate is highly significant. Underwriters confirm that they sometimes require a higher deductible on risks they consider worse.

Which approach to the deductible factors should be implemented in the new rating plan?

- A) Derive deductible factors by loss elimination outside the GLM, and enter them as an offset
- B) Implement the 1.06 factor, because it is significant and predicts losses on the current book
- C) Remove deductible from both the model and the plan, and charge every policy the \$500 base rate
- D) Take the deductible factor from a severity GLM instead, where a positive coefficient is expected
- E) Keep the GLM factor but cap it at 1.00, so that more coverage never costs less

## Explanation

Goldburd et al. (Section 9.1) discuss exactly this result. A higher deductible earning a factor above 1 does not mean less coverage costs more. It reflects **selection**: insureds with a big appetite for risk choose high deductibles, and underwriters impose them on risks they see as worse. The factor may well predict the *existing* book. But a coverage option priced on anything other than its loss elimination changes how future insureds choose options, so the past pattern would not repeat.

The monograph's recommendation is to estimate factors for coverage options (deductibles, ILFs, peril groups) outside the GLM, using traditional loss elimination techniques, and to include them in the GLM as an offset. The other variables are then fitted around a fixed, defensible deductible structure. The answer is **A**.

**Why not the others**

- **B** confuses prediction on the current book with a price for future buyers. Charging more for less coverage would also change who chooses the higher deductible.
- **C** throws away a real coverage difference. The \$1,000 deductible does eliminate losses and deserves a credit.
- **D** picks a model where the sign is distorted for another reason. In a severity model, the deductible removes many small claims, so the average claim rises. That factor isn't the cost of the coverage either.
- **E** patches the symptom. A capped GLM factor still mixes selection with loss elimination, so it is still not the price of the option.
