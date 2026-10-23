---
id: "fams-056"
exam: "Exam FAM"
topic: "Maximum Likelihood Estimation"
learning_objective: "Parametric Estimation"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Maximum+Likelihood+Estimation
  - Concepts/Grouped+Data
  - Concepts/Single-Parameter+Pareto+Distribution
answer: "B"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:a60561172ecaead54fbcf915ac9a3ad3e82dfdfb566cfab19b5b5b2f466787f3
  sources:
    - "SOA Exam FAM Sample Questions, Syllabus Topics 1-6 (June 15, 2026), Q56, p.46, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Syllabus Topics 1-6 (July 17, 2026), Q56, p.25, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-056.md
---

For a group of policies, you are given:

(i) Losses follow the distribution function

$$F(x) = 1 - \theta/x, \quad x > \theta.$$

(ii) A sample of 20 losses resulted in the following:

| Interval | Number of Losses |
|---|---|
| (0,10] | 9 |
| (10, 25] | 6 |
| $(25, \infty)$ | 5 |

Calculate the maximum likelihood estimate of $\theta$.

- A) 5.00
- B) 5.50
- C) 5.75
- D) 6.00
- E) 6.25

## Explanation

$$\begin{align*}
L(\theta) &= \left(1 - \frac{\theta}{10}\right)^9 \left(\frac{\theta}{10} - \frac{\theta}{25}\right)^6 \left(\frac{\theta}{25}\right)^5 \\
&\propto (10-\theta)^9\,\theta^{11}
\end{align*}$$

$$\begin{align*}
l(\theta) &= 9\ln(10-\theta) + 11\ln(\theta) \\
l'(\theta) &= -\frac{9}{10-\theta} + \frac{11}{\theta} \\
           &= 0 \\
11(10-\theta) &= 9\theta \\
110 &= 20\theta \\
\theta &= 110/20 \\
&= 5.5.
\end{align*}$$

The answer is **B**.
