---
id: "discrm-an-461"
exam: "Exam DISC-RM"
topic: "Basic Risk Measures"
learning_objective: "1. Introduction to Risk Management"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Basic+Risk+Measures
  - Concepts/Expected+Value
  - Concepts/Median
answer: "B"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:ee83d4697e62b773e7b0e0eacc029397335459e09d3c4acf2376eddde7a806b7
  sources:
    - "Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s06 expected value; median = 50% mark, sha256:b1b3f4d398fc20b80cf6d2c1861bf4bdf0a442a933224686daa102c72ecb18be — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s06-01-quantification-of-uncertainty-.html"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-rm/discrm-an-461.md
---
A risk manager estimates a store's annual theft and vandalism loss as \$0 with probability 0.70, \$5,000 with probability 0.20, \$20,000 with probability 0.08 and \$200,000 with probability 0.02. What are the expected annual loss and the median annual loss?

- A) Expected loss \$5,000; median \$6,600
- B) Expected loss \$6,600; median \$0
- C) Expected loss \$6,600; median \$5,000
- D) Expected loss \$56,250; median \$0

## Explanation

The expected value weights each outcome by its probability:

$$
\begin{align*}
E[X] &= 0(0.70) + 5{,}000(0.20) + 20{,}000(0.08) + 200{,}000(0.02) \\
&= 0 + 1{,}000 + 1{,}600 + 4{,}000 \\
&= 6{,}600
\end{align*}
$$

The median is the 50 percent mark. The outcome \$0 alone has probability 0.70, so more than half the probability lies at \$0 and the median is **\$0**. The answer is **B**. The mean is far above the median because the rare \$200,000 loss pulls it up.

**Why not the others**

- **A** — \$5,000 is the most likely *nonzero* loss, not the expected value, and the two figures are swapped.
- **C** — \$5,000 is not the median: the cumulative probability already passes 0.50 at \$0.
- **D** — \$56,250 is the simple average of the four listed outcomes, which ignores their probabilities.
