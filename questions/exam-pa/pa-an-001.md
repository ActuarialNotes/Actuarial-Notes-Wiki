---
id: "pa-an-001"
exam: "Exam PA"
topic: "Data Analytics"
learning_objective: "Predictive Analytics Problem Definition"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Data+Analytics
  - Concepts/Predictive+Analytics
answer: "C"
points: 1
---

An auto insurer's analytics team has built a model that gives every new claim a probability of being fraudulent. The special investigations unit can open about 60 files a month. The claims director now asks for a tool that says which claims the unit should open each month.

Which of the following must be added to the fraud model to turn it into the tool the director asks for?

- A) Nothing, because a score that ranks claims by fraud probability already says which to open
- B) A breakdown of last year's confirmed fraud by region and claim type
- C) The cost of an investigation, the expected saving on each claim and the unit's capacity
- D) A second model that predicts which claims will be litigated
- E) Several more years of fraud history, so the scores are more stable

## Explanation

The fraud score estimates an outcome that is not yet known for each claim, so it is predictive analytics. The director asks what should be done, which is prescriptive analytics. A prescriptive tool combines a prediction with costs and constraints to recommend an action. Here the action is which claims to open, the costs are the cost of an investigation and the saving it is expected to bring, and the constraint is the 60 files a month. The answer is **C**.

**Why not the others**

- **A** calls the prediction itself prescriptive. A high fraud probability on a small claim may not be worth an investigation, and the score says nothing about the unit's capacity.
- **B** is diagnostic analytics: it explains where past fraud came from but recommends no action on this month's claims.
- **D** adds another prediction. Two predictive models are still not a decision until costs and the constraint are brought in.
- **E** may improve the score, but a better prediction is still a prediction.
