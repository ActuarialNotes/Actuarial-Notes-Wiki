---
id: "fams-108"
exam: "Exam FAM"
topic: "Binomial Option Pricing Model"
learning_objective: "Option Pricing Fundamentals"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Binomial+Option+Pricing+Model
  - Concepts/Risk-Neutral+Valuation
  - Concepts/European+Option
  - Concepts/Payoff
answer: "A"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:676199275d876b397091a10e3e688a98505836ee74b5cab0f0093d5b333c881d
  sources:
    - "SOA Exam FAM Sample Questions, Syllabus Topics 1-6 (June 15, 2026), Q108, p.90, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Syllabus Topics 1-6 (July 17, 2026), Q108, p.43, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-108.md
---

A put option has strike price 70 and matures in one year. You are given:

(i) The current price of the underlying stock is 75.

(ii) The stock price in one year will be either 100 or 60.

(iii) The true probability of an upward price movement is 40%.

(iv) The continuously compounded risk-free interest rate is 3%.

Calculate the price of the option.

- A) 5.51
- B) 5.82
- C) 6.53
- D) 7.92
- E) 8.27

## Explanation

$$\begin{align*}
q &= \frac{100 - 75e^{0.03}}{100 - 60} \\
&= 0.568
\end{align*}$$

$$\begin{align*}
P_u &= \max(0, 70 - 100) \\
&= 0 \\
P_d &= \max(0, 70 - 60) \\
&= 10
\end{align*}$$

$$\begin{align*}
\text{Price} &= e^{-0.03}(10)(0.568) \\
&= 5.51
\end{align*}$$

The answer is **A**.
