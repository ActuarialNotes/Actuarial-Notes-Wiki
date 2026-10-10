---
id: "discda-an-206"
exam: "Exam DISC-DA"
topic: "Visualization Design Principles"
learning_objective: "6. Presenting Data Effectively"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Visualization+Design+Principles
  - Concepts/Presentation+Visualization
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7625b322b0a6761362b1c08a4dcf8f63f0518d67650b51e2f7d2c6365a95c789
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-206.md
---
A claims dashboard chart shows monthly average severity for 10 regions as 10 lines, each a different saturated color from a rainbow palette, with Region 4 in red and Region 6 in green. The legend is alphabetical. The message for the audience is that Region 4's severity has jumped since June. Which redesign best applies sound design principles?

- A) Show Region 4 in one strong color, the other regions in gray, labeled directly
- B) Keep all ten colors but switch the palette so Regions 4 and 6 are blue and orange
- C) Add a second chart that repeats the ten lines with markers of ten different shapes
- D) Keep the colors, add a gray background grid, and move the legend into the plot area

## Explanation

A preattentive difference, one line in a strong color among gray ones, draws the eye to the message at once while the gray lines keep the comparison. Direct labels remove the work of matching ten colors to a legend; qualitative color scales stop working well beyond about three to five categories (Wilke), and short-term memory holds only a handful of chunks (Few). Dropping the red-green pair also helps the roughly 10% of men with red-green color deficiency. The answer is **A**.

**Why not the others**

- **B** — fixing one color pair helps color-blind readers, but ten hues still have to be matched to a legend and nothing points to Region 4.
- **C** — redundant shapes help distinguish groups, but ten shapes on ten lines add clutter and still do not focus attention on the finding.
- **D** — a background grid adds non-data ink, and moving the legend does not reduce the ten-way matching task.
