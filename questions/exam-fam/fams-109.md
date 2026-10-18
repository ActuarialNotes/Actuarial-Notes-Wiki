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
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ee26b9cbfb98dc9faff7f273068e077835456aba9ef1b04afa552ab1a5f36dd1
  sources: []
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
y_p &= \Phi[(1 + p)/2] \\
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
