---
id: "atpa-an-036"
exam: "Exam ATPA"
topic: "Proxy Discrimination"
learning_objective: "Advanced Predictive Analytics Models"
difficulty: hard
type: multi-part
bloom: evaluate
wiki_link:
  - Concepts/Proxy+Discrimination
  - Concepts/Bias
  - Concepts/Explainability
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:6326f313adc26d006164d3a8da69ba5cb44dfaaae304f356d5c9991d3c732f61
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-atpa/atpa-an-036.md
---

An insurer's new auto pricing model is a GBM with about 40 rating variables. Race and ethnicity are not among them, and the insurer does not collect them. A consumer group says the model charges one ethnic group more than its losses justify. The chief actuary replies that the model cannot discriminate by ethnicity because ethnicity is not an input.

Evaluate the chief actuary's reply, and recommend how the insurer should test the model and what it could do if a problem is found.

### Explanation

A full-credit answer makes these points:

1. **The reply is wrong.** A variable correlated with a protected characteristic carries part of its effect when the characteristic is left out: the fitted effect of a variable $x$ becomes $\beta_x + \beta_z\delta$, its own effect plus a part borrowed from $z$. Omitting $z$ does not prevent proxy discrimination and can hide it.
2. **A GBM makes this harder to see.** A tree ensemble can rebuild a protected characteristic from several variables that are each harmless on their own, so checking variables one at a time can miss a proxy.
3. **Test the outputs first.** Compare predicted premiums, decline rates and loss ratios across the groups. A premium difference with no matching loss difference is the signal.
4. **Then find the variables.** Where group membership can be obtained or inferred for testing only, refit with it included and see which effects shrink, and check how well the model's inputs or score predict it. Using the characteristic to test is not rating on it, but the rules on collecting and using it still apply.
5. **Mitigate.** Drop or replace a variable whose power is mostly borrowed with one closer to the cause of loss, or fit with $z$ included and price every record at its portfolio average (Pope and Sydnor). Record the tests, the choice and its cost in accuracy in the model's documentation, and check which characteristics are protected in the jurisdiction.

**Sample answer.** The reply does not hold. Leaving ethnicity out does not stop a correlated variable, such as territory, from carrying part of its effect, and a GBM can rebuild it from several variables that each look harmless. I would first compare the model's premiums and loss ratios across ethnic groups, using inferred membership for testing only; a premium gap with no loss gap is the evidence. If one appears, I would refit with the inferred characteristic to see which variables' effects shrink, and test how well the score predicts it. A variable whose effect is mostly borrowed would be dropped or replaced by one closer to the cause of loss, or the model refitted with the characteristic and priced at its portfolio average. The tests, the decision and the accuracy given up would go in the model documentation.
