---
id: "pa-an-002"
exam: "Exam PA"
topic: "Predictive Analytics"
learning_objective: "Predictive Analytics Problem Definition"
difficulty: medium
type: multi-part
bloom: evaluate
wiki_link:
  - Concepts/Predictive+Analytics
  - Concepts/Data+Analytics
points: 2
---

The vice-president of a commercial auto insurer asks the actuarial team for "a model of our worst accounts".

## Part a (1 point)
Which restatement of the request defines a predictive modeling problem?

- A) List the accounts with the ten largest single losses last year
- B) Explain why last year's loss ratio on the commercial auto book rose
- C) Find the worst accounts using every variable in the data, letting the model decide what worst means
- D) Predict each account's loss ratio for the coming policy year, and check the predictions on accounts held out of the fit
- E) Rank the accounts in force by how much their premium grew over the last five years

### Answer
D

### Explanation
A predictive modeling problem fits a model to historical data to predict an outcome for cases it has not seen. It needs a stated target and a way to check the predictions on data the model did not see. Option **D** names the target (next year's loss ratio), the unit (the account) and the validation (accounts held out of the fit).

- **A** reports what happened last year, which is descriptive analytics, and the largest single loss is only one of several things "worst" could mean.
- **B** asks why something happened, which is diagnostic analytics.
- **C** leaves the target undefined. With no target the model has nothing to predict, and "worst" is still the vague word the restatement was meant to replace.
- **E** is a descriptive summary of past premium and says nothing about future losses.

## Part b (1 point)
Before any data is touched, what else must be settled with the vice-president besides the target? Name two things and say why each matters.

### Explanation
A full-credit answer names two of these and gives the reason for each:

1. **The unit of analysis**: the policy, the vehicle or the policy-year. Each gives a different data set and a different model.
2. **The decision the model feeds**: a rate change, an underwriting referral or a non-renewal. It fixes how the output must be presented and which variables may lawfully be used.
3. **The validation**: the hold-out data that will show the model works, agreed before the model is fitted.

**Sample answer.** The unit of analysis must be agreed, because a model of accounts and a model of vehicles need different data and answer different questions. The decision must be agreed too: if the model is used to decide non-renewals, the output has to be explained to underwriters and some variables may not be usable, which changes which model is appropriate.
