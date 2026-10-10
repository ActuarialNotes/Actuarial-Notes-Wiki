---
id: "discda-an-202"
exam: "Exam DISC-DA"
topic: "Chart Selection"
learning_objective: "6. Presenting Data Effectively"
difficulty: easy
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Chart+Selection
  - Concepts/Presentation+Visualization
answer: "A"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:d54afb53897fe9c581eef27c025af8a057c94853d30698b4c319b63cbd315a00
  sources:
    - "Few, 'Eenie, Meenie, Minie, Moe: Selecting the Right Graph for Your Message' (Perceptual Edge 2004), PDF pp.3-7, seven message types and encodings table, sha256:6e1fc0374f53de68c72c7ec62a48895011abf17e0272c18493d8fee58376553a — https://www.perceptualedge.com/articles/ie/the_right_graph.pdf"
    - "Wilke, Fundamentals of Data Visualization (online), ch.6, sha256:5550b27f5be4dee9f495b8c4cd02609c713c46cf9dff80b372f34bd48a2d371f — https://clauswilke.com/dataviz/visualizing-amounts.html"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-202.md
---
A pricing actuary wants to show the pricing committee which 8 of the company's 45 territories have the highest loss ratios, so that the committee can see at a glance which territory is worst and how far down the list the problem extends. Territory names are long. Which display best suits this message?

- A) Horizontal bars starting at zero, sorted from the highest loss ratio to the lowest
- B) A line chart connecting the 8 territories' loss ratios in alphabetical order
- C) A pie chart showing each of the 8 territories' share of the combined loss ratio
- D) A table of all 45 territories' loss ratios listed in territory-code order

## Explanation

The message is a **ranking**: categories ordered by size. Few's guidance for a ranking is bars, sorted in descending order to stress the largest values; horizontal bars leave room for long category labels without rotating them (Wilke), and bars start at zero because their length encodes the value. The answer is **A**.

**Why not the others**

- **B** — a line implies a sequence such as time. Connecting unordered territories suggests a trend that does not exist, and alphabetical order hides the ranking.
- **C** — loss ratios are not parts of a whole, so a pie of "shares" of a loss ratio has no meaning, and slices are hard to rank.
- **D** — a table suits looking up exact values. Forty-five rows in code order make the reader find the worst eight themselves.
