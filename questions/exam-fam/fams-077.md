---
id: "fams-077"
exam: "Exam FAM"
topic: "Put-Call Parity"
learning_objective: "Option Pricing Fundamentals"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Put-Call+Parity
answer: "C"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:c15fba39f90cd4ea3e407987262f2ce2579fc4c3d901b92463c9aa8acc9b5d93
  sources:
    - "SOA Exam FAM Sample Questions, Syllabus Topics 1-6 (June 15, 2026), Q77, p.62, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Syllabus Topics 1-6 (July 17, 2026), Q77, p.32, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-077.md
---

You are given:

i) The current price to buy one share of XYZ stock is 500.

ii) The stock does not pay dividends.

iii) The continuously compounded risk-free interest rate is 6%.

iv) A European call option on one share of XYZ stock with a strike price of $K$ that expires in one year costs 66.59.

v) A European put option on one share of XYZ stock with a strike price of $K$ that expires in one year costs 18.64.

Using put-call parity, calculate the strike price, $K$.

- A) 449
- B) 452
- C) 480
- D) 559
- E) 582

## Explanation

$$66.59 - 18.64 = 500 - K\cdot\exp(-0.06)$$

and so

$$\begin{align*}
K &= (500 - 66.59 + 18.64)/\exp(-0.06) \\
&= 480.
\end{align*}$$

The answer is **C**.
