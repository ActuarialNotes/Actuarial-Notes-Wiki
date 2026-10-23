---
id: "fams-092"
exam: "Exam FAM"
topic: "Limited Fluctuation Credibility"
learning_objective: "Introduction to Credibility"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Limited+Fluctuation+Credibility
  - Concepts/Full+Credibility+Standard
  - Concepts/Severity+Distribution
answer: "C"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:8741ddc6c44d946593646552aed87f47e61ecf890bf99f98fbc0037918947a9c
  sources:
    - "SOA Exam FAM Sample Questions, Syllabus Topics 1-6 (June 15, 2026), Q92, p.74, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Syllabus Topics 1-6 (July 17, 2026), Q92, p.36, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-092.md
---

You are given:

(i) Claim frequency follows a Poisson distribution.

(ii) Claim frequency and claim severity are independent.

(iii) The probability density function of claim severity is

$$f(x) = \frac{3(100)^3}{x^4}, \quad x > 100$$

Calculate the expected number of claims needed so the observed total cost of claims is within 5% of the true value with probability 0.95.

- A) 1444
- B) 1537
- C) 2049
- D) 3586
- E) 8196

## Explanation

For the severity distribution, we have

$$\begin{align*}
E(X) &= \int_{100}^{\infty} 3(100)^3 x^{-3}\,dx \\
&= 150 \\
E(X^2) &= \int_{100}^{\infty} 3(100)^3 x^{-2}\,dx \\
&= 30{,}000
\end{align*}$$

and

$$\begin{align*}
\sigma_X^2 &= 30{,}000 - 150^2 \\
&= 7500
\end{align*}$$

The standard for full credibility is

$$\begin{align*}
\left(\frac{1.96}{0.05}\right)^2\left(1 + CV_X^2\right) &= \left(\frac{1.96}{0.05}\right)^2\left(1 + \frac{7500}{150^2}\right) \\
&= 2048.85
\end{align*}$$

Round up to 2049.

The answer is **C**.
