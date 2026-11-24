---
id: "pa-an-010"
exam: "Exam PA"
topic: "Data Design"
learning_objective: "Data Exploration and Visualization"
difficulty: hard
type: multiple-choice
bloom: evaluate
wiki_link:
  - Concepts/Data+Design
answer: "B"
points: 1
---

An actuary is building a homeowners claim frequency and severity model to price policies written in 2027. The data were extracted on 31 March 2026: every policy in force on 1 January 2026, with its claims from accident years 2021 to 2025.

Determine which of the following statements about this data design are true.

- I. Because the extract holds only policies in force on 1 January 2026, policies that lapsed or were cancelled during 2021 to 2025 are missing, so the model describes the policies that stayed.
- II. Accident year 2025's losses as reported at 31 March 2026, used without development, understate losses for the newest business.
- III. Storing the data as totals by territory and year loses nothing, because the policy-level detail can be recovered later by splitting the totals.

- A) I only
- B) I and II only
- C) I and III only
- D) II and III only
- E) The answer is not given by (A), (B), (C), or (D)

## Explanation

Effective data design fits the time frame, the sampling and the granularity to the question before any model is fitted.

**I is true.** An extract of policies in force today leaves out those that lapsed or were cancelled during the period, so a model fitted to it describes the survivors. The records should come from the population the predictions are for, here all policies written.

**II is true.** The latest accident years are immature. Accident year 2025 is only three months past its end at the extract date, so its losses need development or the year should be excluded.

**III is false.** Fine data can be aggregated later, but aggregated data cannot be split again. Territory totals also hide how predictors such as the age of the home vary within a territory.

I and II are true, so the answer is **B**.

**Why not the others**

- **A** rejects II, treating reported losses as if they were ultimate losses.
- **C** and **D** accept III, reversing the granularity rule: detail can be summed away, never recovered.
- **D** also rejects I, missing that sampling from the policies in force today selects the survivors.
- **E** would need a different combination, but I and II are true and III is false.
