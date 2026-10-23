---
id: "fams-103"
exam: "Exam FAM"
topic: "Binomial Option Pricing Model"
learning_objective: "Option Pricing Fundamentals"
difficulty: hard
type: multiple-choice
wiki_link:
  - Concepts/Binomial+Option+Pricing+Model
  - Concepts/Risk-Neutral+Valuation
  - Concepts/European+Option
  - Concepts/Payoff
answer: "E"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:df1f8f0334c55fa13564c6e55cfad83ba7b9b40c996c43c7815fe661b8b3ee3e
  sources:
    - "SOA Exam FAM Sample Questions, Syllabus Topics 1-6 (June 15, 2026), Q103, p.85, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Syllabus Topics 1-6 (July 17, 2026), Q103, p.40, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-103.md
---

The price movements of a non-dividend paying stock are modeled by a binomial tree with one-year periods.

You are given:

(i) The current price of the stock is 100.

(ii) $u = 1.24$

(iii) The risk-neutral probability of an up move is 0.406.

(iv) The continuously compounded risk-free interest rate is 2%.

The price of a 2-year $K$-strike European put option on the stock is 25.05.

Calculate $K$.

- A) 123.50
- B) 124.00
- C) 124.50
- D) 125.00
- E) 125.50

## Explanation

You are given $p^* = 0.406$ and $u = 124/100 = 1.24$ and $r = .02$.

Therefore

$$\begin{align*}
p^* &= (e^r - d)/(u - d) \\
\Rightarrow d &= (e^r - up^*)/(1 - p^*) \\
&= 0.87
\end{align*}$$

$$\begin{align*}
S_{uu} &= 153.76 \\
S_{ud} &= 107.88 \\
S_{dd} &= 75.69 \\
P &= 25.05
\end{align*}$$

$$C = e^{-2r}\left[Max(S_{uu} - K, 0)(p^*)^2 + 2Max(S_{ud} - K, 0)p^*(1 - p^*) + Max(S_{dd} - K, 0)(1 - p^*)^2\right]$$

$$P = e^{-2r}\left[Max(K - S_{uu}, 0)(p^*)^2 + 2Max(K - S_{ud}, 0)p^*(1 - p^*) + Max(K - S_{dd}, 0)(1 - p^*)^2\right]$$

$$K = 125.50$$

The answer is **E**.
