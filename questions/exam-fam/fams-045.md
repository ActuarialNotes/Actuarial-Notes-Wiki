---
id: "fams-045"
exam: "Exam FAM"
topic: "Payment Random Variable"
learning_objective: "Short-Term Insurance and Reinsurance Coverages"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Payment+Random+Variable
  - Concepts/Deductible
  - Concepts/Coverage+Modifications
answer: "B"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:8c5ddd98b433eb0da57f05f3bbc45b11533cdb07748661fdc3c3ebde2d563f35
  sources:
    - "SOA Exam FAM-S sample questions (June 15, 2026), Q45, p.37, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM-S sample solutions (July 17, 2026), Q45, p.21, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-045.md
---

For an insurance policy:

(i) Losses can be 100, 200 or 300 with respective probabilities 0.2, 0.2, and 0.6.

(ii) The policy has an ordinary deductible of 150 per loss.

(iii) $Y^P$ is the claim payment per payment random variable.

Calculate $\mathrm{Var}(X^P)$ (as printed).

- A) 1500
- B) 1875
- C) 2250
- D) 2625
- E) 3000

## Explanation

$$\begin{align*}
S_X(150) &= 1 - 0.2 \\
&= 0.8
\end{align*}$$

$$f_{Y^P}(y) = \frac{f_X(y + 150)}{S_X(150)}$$

$$\begin{align*}
f_{Y^P}(50) &= \frac{0.2}{0.8} \\
&= 0.25 \\
f_{Y^P}(150) &= \frac{0.6}{0.8} \\
&= 0.75
\end{align*}$$

$$\begin{align*}
E(Y^P) &= 0.25(50) + 0.75(150) \\
&= 125 \\
E\left[(Y^P)^2\right] &= 0.25(50^2) + 0.75(150^2) \\
&= 17{,}500 \\
Var(Y^P) &= 17{,}500 - 125^2 \\
&= 1{,}875
\end{align*}$$

The answer is **B**.
