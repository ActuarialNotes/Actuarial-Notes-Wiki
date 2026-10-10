---
id: "discda-an-200"
exam: "Exam DISC-DA"
topic: "Presentation Visualization"
learning_objective: "6. Presenting Data Effectively"
difficulty: easy
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Presentation+Visualization
answer: "B"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:11e597878dc8feb3882b9883c641e5d4258761f791552cfd5934cce986b6f07f
  sources:
    - "Knaflic, storytellingwithdata.com 'what's the Big Idea?' (2014), post text (Duarte's three components; Big Idea per slide), sha256:7e3d6bc6a5569611af30442ec33abec445e2b13cedf29732830382d2ba903180 — https://www.storytellingwithdata.com/blog/2014/02/whats-big-idea"
    - "Knaflic, storytellingwithdata.com 'exploratory vs explanatory analysis' (2014), post text, sha256:e20900367da7a69b5ba71cc68788da59db582996755bf398664c57f4acd0229a — https://www.storytellingwithdata.com/blog/2014/04/exploratory-vs-explanatory-analysis"
    - "Wickham, Cetinkaya-Rundel & Grolemund, R for Data Science 2e, ch.11 Communication (tens or hundreds of plots; audience; title summarizes main finding), sha256:0756a2408a456cd5dc71f64d18a17f636dd57cfea2a817568f38689421eab088 — https://r4ds.hadley.nz/communication"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-200.md
---
A commercial lines actuary has finished three weeks of exploratory analysis of workers compensation claims and found that claims from one newly acquired book are settling 40% slower than the rest. She has been given ten minutes at the next underwriting leadership meeting. What should she do **first** in preparing her presentation visualization?

- A) Choose the chart type that best displays settlement times for every book of business
- B) Identify what the audience must know or decide and state the finding in one sentence
- C) Collect all of the exploratory plots she produced into an appendix for the meeting deck
- D) Apply the company's standard color palette and fonts to the exploratory settlement charts

## Explanation

A presentation visualization starts from its audience and its message. Knaflic's advice is to be able to state the whole point in one complete sentence, the Big Idea, before choosing or designing any chart; here, something like "Claims from the acquired book settle 40% slower than the rest, which raises its cost". The chart type and the design follow from that message. The answer is **B**.

**Why not the others**

- **A** — choosing a chart first reverses the order. Until the message is fixed she cannot know which comparison the chart has to make, and a chart of "every book" may bury the one book that matters.
- **C** — the exploratory plots were made to find the finding. Most of them are not shown to the audience at all, and gathering them is not the first step.
- **D** — formatting is the last step and cannot make a chart without a clear message work.
