---
id: "discda-an-032"
exam: "Exam DISC-DA"
topic: "Types of Plots"
learning_objective: "5. Analyzing Data With Visualizations"
difficulty: hard
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Types+of+Plots
  - Concepts/Exploratory+Data+Visualization
answer: "D"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:dcd954c3f739e16b9e286619aa243935e19da6755667d3676abc1027dba98bfa
  sources:
    - "Wickham, Çetinkaya-Rundel & Grolemund, R for Data Science (2e), Ch.10 'Exploratory data analysis', §10.5.2 geom_tile coloured by a count or average for two categorical variables, sha256:ab13c323616810e786eb9f6298ed5d4b9bc50d1cebfb753d2725f91684553432 — https://r4ds.hadley.nz/EDA.html"
    - "The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-032.md
---

An analyst draws a heat map of auto claim frequency (claims per car-year) by territory and vehicle use. The data are:

| Territory | Use | Car-years | Claims |
| :--- | :--- | ---: | ---: |
| T1 | Pleasure | 4,000 | 200 |
| T1 | Commute | 6,000 | 420 |
| T2 | Pleasure | 1,000 | 75 |
| T2 | Commute | 2,000 | 130 |

Which tile is darkest?

- A) T1, pleasure
- B) T1, commute
- C) T2, commute
- D) T2, pleasure

## Explanation

Each tile shows claims divided by car-years:

$$
\begin{align*}
f_{T1,\text{pleasure}} &= \frac{200}{4{,}000} \\
&= 0.050 \\
f_{T1,\text{commute}} &= \frac{420}{6{,}000} \\
&= 0.070 \\
f_{T2,\text{pleasure}} &= \frac{75}{1{,}000} \\
&= 0.075 \\
f_{T2,\text{commute}} &= \frac{130}{2{,}000} \\
&= 0.065
\end{align*}
$$

T2 pleasure has the highest frequency, 0.075. The answer is **D**.

**Why not the others**

- **A** — T1 pleasure has the lowest frequency, 0.050.
- **B** — T1 commute has the most claims (420), so it would be darkest on a heat map of counts, which mostly shows where the exposure is.
- **C** — T2 commute, at 0.065, is below both T1 commute and T2 pleasure.
