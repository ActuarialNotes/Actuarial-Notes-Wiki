---
id: "pa-an-003"
exam: "Exam PA"
topic: "Statistics"
learning_objective: "Predictive Analytics Problem Definition"
difficulty: easy
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Statistics
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7108a01b0958b821b5157b3fab48b0f758c8d0ea77a63c1796fc1a06dd92bad4
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-pa/pa-an-003.md
---

An insurer changed how new claims are assigned to adjusters. Before the change, claims took 46 days on average to settle. A manager asks, "Is the new process faster?" An analyst takes a random sample of 80 claims reported after the change; their average settlement time is 41 days.

Determine which of the following statements are true.

- I. The sample's average settlement time of 41 days is a statistic.
- II. The difference between the sample's average and the true average settlement time of all claims under the new process is a statistic.
- III. Deciding whether the sample is consistent with an average of 46 days under the new process is a hypothesis test.

- A) I only
- B) I and II only
- C) I and III only
- D) II and III only
- E) The answer is not given by (A), (B), (C), or (D)

## Explanation

A statistic is a function of the sample that does not depend on any unknown parameter. Hypothesis testing uses a statistic to decide whether the data are consistent with a stated value of a parameter.

**I is true.** The average of the 80 sampled settlement times is computed from the observations alone, so it is a statistic.

**II is false.** The true average settlement time under the new process is the unknown parameter the manager is asking about. A quantity that depends on it, like $\bar{X} - \mu$, is not a statistic.

**III is true.** "Is it faster?" becomes a question that can be analyzed by asking whether the data are consistent with the stated value of 46 days, which is a hypothesis test.

I and III are true, so the answer is **C**.

**Why not the others**

- **A** rejects III, missing that turning the manager's question into a decision about a stated value is what a hypothesis test does.
- **B** and **D** accept II, treating a quantity that involves the unknown true average as if it could be computed from the sample.
- **E** would need a different combination, but I and III are true and II is false.
