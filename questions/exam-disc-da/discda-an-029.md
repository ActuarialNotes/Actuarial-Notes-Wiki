---
id: "discda-an-029"
exam: "Exam DISC-DA"
topic: "Exploratory Data Visualization"
learning_objective: "5. Analyzing Data With Visualizations"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Exploratory+Data+Visualization
  - Concepts/Types+of+Plots
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:0e9d289c5311a477deb4b53257a623603c73f76a64457179e45650c7f75b3a05
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-029.md
---

Channel A has 40,000 policies, 8,000 of them with a prior claim. Channel B has 10,000 policies, 3,000 of them with a prior claim. A stacked bar chart of counts shows Channel A's prior-claim segment far taller than Channel B's. What share of each channel's policies has a prior claim?

- A) A: 16%; B: 6%
- B) A: 20%; B: 30%
- C) A: 20%; B: 7.5%
- D) A: 72.7%; B: 27.3%

## Explanation

Compare proportions within each channel, which is what a stacked bar chart scaled so that every bar has the same height shows:

$$
\begin{align*}
\text{Share}_A &= \frac{8{,}000}{40{,}000} \\
&= 20\% \\
\text{Share}_B &= \frac{3{,}000}{10{,}000} \\
&= 30\%
\end{align*}
$$

Channel B has the higher share; Channel A's taller segment reflects its size. The answer is **B**.

**Why not the others**

- **A** — 16% and 6% divide each channel's count by all 50,000 policies, which mixes the channels' sizes back in.
- **C** — 7.5% divides Channel B's 3,000 by Channel A's 40,000 policies.
- **D** — 72.7% and 27.3% split the 11,000 prior-claim policies between channels: how the prior-claim business divides, not each channel's mix.
