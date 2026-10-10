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
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:0e9d289c5311a477deb4b53257a623603c73f76a64457179e45650c7f75b3a05
  sources:
    - "Wickham, Çetinkaya-Rundel & Grolemund, R for Data Science (2e), Ch.1 'Data visualization', §1.5.2 stacked bar plots; position = \"fill\" relative frequency for groups of unequal size, sha256:871721caf69ea711517d9a4f0f627806da4200f6f7fd0068aa89530943339ad4 — https://r4ds.hadley.nz/data-visualize.html"
    - "The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf"
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
