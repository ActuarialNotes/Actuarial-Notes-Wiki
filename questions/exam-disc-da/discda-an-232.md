---
id: "discda-an-232"
exam: "Exam DISC-DA"
topic: "Credit-Based Insurance Scoring"
learning_objective: "10. Ethical and Societal Considerations of Data Analytics"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Credit-Based+Insurance+Scoring
  - Concepts/Unfair+Discrimination
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8382f6842392992fc0fdf57686b2fb1eb788ef153fb90822f4bc6932ddb17afd
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-232.md
---

In an auto insurer's experience, drivers with high credit-based insurance scores have a loss ratio relativity of 0.80 and drivers with low scores a relativity of 1.25, relative to rates that do not use credit. The state then bans the use of credit, so every driver pays the same relativity of 1.00. Relative to the rate their own expected losses indicate, how much do high-score drivers pay under the ban?

- A) 0.80 times
- B) 1.00 times
- C) 1.25 times
- D) 1.56 times

## Explanation

Under the ban, high-score drivers pay a relativity of 1.00 although their indicated relativity is 0.80:

$$
\begin{align*}
\frac{1.00}{0.80} &= 1.25
\end{align*}
$$

They pay 1.25 times their indicated rate, while low-score drivers pay $\tfrac{1.00}{1.25} = 0.80$ times theirs. A ban does not remove the difference in expected cost; it moves premium from low-score to high-score drivers. Whether that transfer is fair is the societal question the scores raise. The answer is **C**.

**Why not the others**

- **A** — 0.80 is the high-score drivers' indicated relativity, or equally what low-score drivers pay relative to their indication.
- **B** — 1.00 is the relativity everyone is charged, not the comparison with each group's own expected cost.
- **D** — 1.56 is $\tfrac{1.25}{0.80}$, the ratio between the two groups' indicated rates, not what either group pays relative to its own.
