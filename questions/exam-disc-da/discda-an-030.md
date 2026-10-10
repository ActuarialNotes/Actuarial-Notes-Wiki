---
id: "discda-an-030"
exam: "Exam DISC-DA"
topic: "Exploratory Data Visualization"
learning_objective: "Analyzing Data With Visualizations"
difficulty: medium
type: multiple-choice
bloom: evaluate
wiki_link:
  - Concepts/Exploratory+Data+Visualization
  - Concepts/Scatter+Plot
answer: "A"
points: 1
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
