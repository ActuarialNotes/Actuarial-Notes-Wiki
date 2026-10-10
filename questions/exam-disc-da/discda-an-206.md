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
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:7625b322b0a6761362b1c08a4dcf8f63f0518d67650b51e2f7d2c6365a95c789
  sources:
    - "Few, 'Tapping the Power of Visual Perception' (Perceptual Edge 2004), PDF pp.3-6 (short-term memory 3-7 chunks, preattentive attributes, 2-D location and line length), sha256:8a67f265391dcb842b5fbe5dfbad54cd5546e10025a250ca297864d7f79fd60a — https://www.perceptualedge.com/articles/ie/visual_perception.pdf"
    - "Few, 'Practical Rules for Using Color in Charts' (Perceptual Edge 2008), Rules 3-9; ~10% of males and 1% of females colorblind, sha256:baf8d7c97cbac13933ec37efd691dc7ab4af6b799a6e8f28023019d4726006ef — https://www.perceptualedge.com/articles/visual_business_intelligence/rules_for_using_color.pdf"
    - "Wilke, Fundamentals of Data Visualization (online), ch.19, sha256:a0a9d0529e2a5b92a35071db8e96bfce0e8f2a8941900173eb08effbad24be41 — https://clauswilke.com/dataviz/color-pitfalls.html"
    - "Wilke, Fundamentals of Data Visualization (online), ch.20, sha256:3bfb247d79ee5c09a0daf09a8b47a56d6e519226a2b4abd5ce4747c744d3f3e8 — https://clauswilke.com/dataviz/redundant-coding.html"
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
