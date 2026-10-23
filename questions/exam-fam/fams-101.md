---
id: "fams-101"
exam: "Exam FAM"
topic: "Put-Call Parity"
learning_objective: "Option Pricing Fundamentals"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Put-Call+Parity
  - Concepts/Black-Scholes+Model
  - Concepts/European+Option
answer: "B"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:c1405f173ef99744fb693b78888c756cf3ee3c6e939949d0deb9f5d783173f5f
  sources:
    - "SOA Exam FAM Sample Questions, Syllabus Topics 1-6 (June 15, 2026), Q101, p.83, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Syllabus Topics 1-6 (July 17, 2026), Q101, p.40, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-101.md
---

You are given:

(i) The Black-Scholes-Merton framework applies.

(ii) The prices of some 6-month European options on non-dividend paying Stock Y are:

| Strike Price | Price of Call Option | Price of Put Option |
|---|---|---|
| 525 | 55.92 | $x$ |
| 550 | 45.46 | 64.57 |

The continuously compounded risk-free rate is 3.25%.

Calculate $x$.

- A) 50.03
- B) 50.43
- C) 50.83
- D) 51.03
- E) 51.23

## Explanation

Using put-call parity and the 550-strike options, we have:

$$\begin{align*}
45.46 - 64.57 &= S_0 - 550e^{(-0.0325)(0.5)} \\
\Rightarrow S_0 &= 522.0247
\end{align*}$$

Using the current stock price and put-call parity with the 525-strike options:

$$\begin{align*}
55.92 - x &= 522.0247 - 525e^{(-0.0325)(0.5)} \\
\Rightarrow x &= 50.43
\end{align*}$$

The answer is **B**.
