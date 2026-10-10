---
id: "discda-an-203"
exam: "Exam DISC-DA"
topic: "Chart Selection"
learning_objective: "6. Presenting Data Effectively"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Chart+Selection
  - Concepts/Visualization+Design+Principles
answer: "C"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:aaa087178477f65f606ad8e95afe881a495d60e90dae4de18431ab670eae113c
  sources:
    - "Few, 'Save the Pies for Dessert' (Perceptual Edge 2007), part-to-whole strength; slices judged only near 0/25/50/75/100%, sha256:9086dad31f86399e1aa1a219867779e4ee86fa4d25cfe3faa4d1323fbbe37b6d — https://www.perceptualedge.com/articles/visual_business_intelligence/save_the_pies_for_dessert.pdf"
    - "Few, 'Tapping the Power of Visual Perception' (Perceptual Edge 2004), PDF pp.3-6 (short-term memory 3-7 chunks, preattentive attributes, 2-D location and line length), sha256:8a67f265391dcb842b5fbe5dfbad54cd5546e10025a250ca297864d7f79fd60a — https://www.perceptualedge.com/articles/ie/visual_perception.pdf"
    - "Wilke, Fundamentals of Data Visualization (online), ch.26, sha256:d467dbb2f7ab77c6b7cd873dda31c897cb44ebf015a7df8107afe26ec30c8a94 — https://clauswilke.com/dataviz/no-3d.html"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-203.md
---
A presentation slide shows each of six product lines' share of a personal lines insurer's written premium as a pie chart: 18%, 17%, 17%, 16%, 16% and 16%. The presenter's point is that the six lines are now almost equal in size, but that personal auto, at 18%, is still the largest. Committee members say they cannot tell which slice is largest. What is the best diagnosis and fix?

- A) The pie needs a 3-D effect so the largest slice stands out from the rest
- B) The pie should be replaced by a line chart of the six shares in any order
- C) Slice areas cannot show such small differences; use sorted bars with labels
- D) The pie needs a different bright color for each of the six product lines

## Explanation

Readers judge 2-D position and length accurately but area and angle poorly, and a pie slice is easy to read only near simple fractions such as 25% or 50% (Few). Six slices between 16% and 18% are indistinguishable by area. Bars on a common baseline, sorted from largest to smallest and labeled with their values, make the one-point lead of personal auto visible while still showing that all six are close. The answer is **C**.

**Why not the others**

- **A** — 3-D distorts slice sizes, making slices at the front look bigger than they are (Wilke). It would make the comparison less accurate, not more.
- **B** — product lines have no order, so connecting them with a line implies a trend that is not there.
- **D** — the slices are already distinguishable as categories; the problem is comparing their sizes, which hue cannot encode.
