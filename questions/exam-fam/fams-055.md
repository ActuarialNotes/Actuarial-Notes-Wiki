---
id: "fams-055"
exam: "Exam FAM"
topic: "Limited Fluctuation Credibility"
learning_objective: "Introduction to Credibility"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Limited+Fluctuation+Credibility
  - Concepts/Full+Credibility+Standard
  - Concepts/Uniform+Continuous+Distribution
answer: "B"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:5340e7fc9003a1f4cb1758d053d9dd6ec0f6f0a2bc4ebcefe219ca84d36f2860
  sources:
    - "SOA Exam FAM-S sample questions (June 15, 2026), Q55, p.45, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM-S sample solutions (July 17, 2026), Q55, p.25, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-055.md
---

A company has determined that the limited fluctuation full credibility standard is 2000 claims if:

(i) The total number of claims is to be within 3% of the true value with probability $p$.

(ii) The number of claims follows a Poisson distribution.

The standard is changed so that the total cost of claims is to be within 5% of the true value with probability $p$, where claim severity has probability density function:

$$f(x) = \frac{1}{10{,}000}, \quad 0 \le x \le 10{,}000$$

Calculate the expected number of claims necessary to obtain full credibility under the new standard using limited fluctuation credibility.

- A) 720
- B) 960
- C) 2160
- D) 2667
- E) 2880

## Explanation

For the severity distribution the mean is 5,000 and the variance is $10{,}000^2/12$. For credibility based on accuracy with regard to the number of claims,

$$2000 = \left(\frac{z}{0.03}\right)^2, \quad z^2 = 1.8$$

where $z$ is the appropriate value from the standard normal distribution. For credibility based on accuracy with regard to the total cost of claims, the number of claims needed is

$$\begin{align*}
&\frac{z^2}{0.05^2}\left(1 + \frac{10000^2/12}{5000^2}\right) \\
&= 960.
\end{align*}$$

The answer is **B**.
