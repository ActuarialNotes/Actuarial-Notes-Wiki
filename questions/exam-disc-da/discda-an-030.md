---
id: "discda-an-030"
exam: "Exam DISC-DA"
topic: "Exploratory Data Visualization"
learning_objective: "5. Analyzing Data With Visualizations"
difficulty: medium
type: multiple-choice
bloom: evaluate
wiki_link:
  - Concepts/Exploratory+Data+Visualization
  - Concepts/Scatter+Plot
answer: "A"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:d3dbe23d9344b8d81954e2fe350f9e5deb1f379b4c420370f22f5ddd7a073e44
  sources:
    - "Wickham, Çetinkaya-Rundel & Grolemund, R for Data Science (2e), Ch.10 'Exploratory data analysis', §10.5.3 overplotting; alpha; geom_bin2d / geom_hex fill by count; transparency challenging for very large data, sha256:ab13c323616810e786eb9f6298ed5d4b9bc50d1cebfb753d2725f91684553432 — https://r4ds.hadley.nz/EDA.html"
    - "The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-030.md
---

A scatter plot of claim severity against coverage limit for 300,000 claims is a solid black mass in its lower left corner, so the analyst cannot tell where most claims lie. Which change best restores what the plot can show?

- A) Bin the points in two dimensions, such as hexagonal bins coloured by count
- B) Enlarge the points so that each individual claim is easier to see
- C) Replace the plot with a bar chart of the overall mean severity
- D) Remove the claims in the dense corner as overplotted outliers

## Explanation

With hundreds of thousands of points, a scatter plot overplots: points pile on top of each other and the density of the data can no longer be judged. Binning in two dimensions (rectangular or hexagonal bins, each coloured by how many points fall in it) shows where the claims concentrate while keeping the relationship visible; transparency is the alternative for smaller data. The answer is **A**.

**Why not the others**

- **B** — larger points overlap more, making the overplotting worse.
- **C** — one mean discards the relationship between severity and limit that the plot was made to show.
- **D** — the dense corner is where most claims are; they are typical, not outliers, and removing them hides the bulk of the data.
