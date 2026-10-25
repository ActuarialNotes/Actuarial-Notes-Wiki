---
id: "fams-109"
exam: "Exam FAM"
topic: "Limited Fluctuation Credibility"
learning_objective: "Introduction to Credibility"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Limited+Fluctuation+Credibility
  - Concepts/Partial+Credibility
  - Concepts/Full+Credibility+Standard
  - Concepts/Credibility
answer: "C"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-25
  last_checked_by: agent:validate-v1
  content_hash: sha256:b32624d8971a8c3de12ddceb4de0b7ff6d73a292c2adf34d4d745ac113c6a06a
  sources:
    - "SOA Exam FAM Sample Questions, Syllabus Topics 1-6 (June 15, 2026), Q109, p.91, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Syllabus Topics 1-6 (July 17, 2026), Q109, p.43, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-109.md
---

You are given the following for a class of auto insurance:

(i) For a large group of auto insurance companies, the recent annual loss per insured for this class has a mean of 800 and a standard deviation of 300.

(ii) Last year, Company Z had 150 insureds in this class with an average loss per insured of 750.

The full credibility standard is set so that the observed annual loss per insured is within 5% of the true value with probability 0.95.

Calculate Company Z's net premium for this class using limited fluctuation credibility and the normal approximation.

- A) 753
- B) 758
- C) 761
- D) 769
- E) 789

## Explanation

$p = 0.95$

$r = 0.05$

$$\begin{align*}
y_p &= \Phi[(1 + p)/2] \text{ (as printed)} \\
&= \Phi[0.975] \\
&= 1.95996
\end{align*}$$

(using the Normal Distribution Calculator)

$$\begin{align*}
\lambda_0 &= (1.95996/0.05)^2 \\
&= 1536.5773
\end{align*}$$

Use formula 16.6 to calculate the number of exposure units (insureds) required for full credibility:

$$\begin{align*}
n &\ge \lambda_0(\text{standard deviation/sample mean})^2 \\
&= 1536.5773(300/750)^2 \\
&= 245.85
\end{align*}$$

$$\begin{align*}
\text{Partial credibility} &= (150/245.85)^{0.5} \\
&= 0.7811
\end{align*}$$

$$\begin{align*}
&0.7811(750) + (1 - 0.7811)800 \\
&= 760.945
\end{align*}$$

The answer is **C**.
