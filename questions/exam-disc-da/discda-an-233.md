---
id: "discda-an-233"
exam: "Exam DISC-DA"
topic: "Presentation Visualization"
learning_objective: "6. Presenting Data Effectively"
difficulty: medium
type: multiple-choice
bloom: evaluate
wiki_link:
  - Concepts/Presentation+Visualization
  - Concepts/Visualization+Design+Principles
answer: "D"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:0c3f049cd32200b167a09fcdf2b4f0280343e1be3f3eada942c68348e193d0b0
  sources:
    - "Wickham, Cetinkaya-Rundel & Grolemund, R for Data Science 2e, ch.11 Communication (tens or hundreds of plots; audience; title summarizes main finding), sha256:0756a2408a456cd5dc71f64d18a17f636dd57cfea2a817568f38689421eab088 — https://r4ds.hadley.nz/communication"
    - "Wilke, Fundamentals of Data Visualization (online), ch.22, sha256:06e044ab60f5f837e5bf29d6954d0ecd8bf1cf87819f1547cdd16bbcdd163724 — https://clauswilke.com/dataviz/figure-titles-captions.html"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-233.md
---

An actuary's chart for the claims committee shows quarterly litigation rates for four claim offices. Its title is "Litigation rate by office, 2022–2025". The finding is that Office C's litigation rate has doubled since its staff was cut, while the other offices are flat. Which title best serves the committee?

- A) Quarterly litigation rates for four claim offices, 2022–2025
- B) Litigation rates: Offices A, B, C and D compared by quarter
- C) Office comparison of litigation (percent of claims litigated)
- D) Office C's litigation rate doubled after its staff cut

## Explanation

The purpose of a presentation title is to state the main finding, not to describe the chart (*R for Data Science*, ch. 11; Wilke, ch. 22). Only option D tells the committee what to take away. The axis titles and units can carry the description of what is plotted. The answer is **D**.

**Why not the others**

- **A** — describes the chart's contents and period, which leaves the reader to find the point.
- **B** — names the offices and the comparison but still states no conclusion.
- **C** — adds the unit, which belongs on the axis title, and again states no finding.
