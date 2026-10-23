---
id: "faml-4-04"
exam: "Exam FAM"
topic: "Whole Life Insurance"
learning_objective: "Present Value Random Variables for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Whole+Life+Insurance
  - Concepts/Variance
  - Concepts/Future+Lifetime+Random+Variable
  - Concepts/Payable+Continuously
answer: "A"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:3182ec2f6155f81180433c26f501c6b6f3be9428145c4d252fab2350a2f1eecb
  sources:
    - "SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q4.4, p.28 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Topics 7-10), Q4.4, p.19 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-4-04.md
---

For a special increasing whole life insurance on (40), payable at the moment of death, you are given:

(i) The death benefit at time $t$ is $b_{t} = 1 + 0.2t, \quad t \ge 0$

(ii) The interest discount factor at time $t$ is $v(t) = (1 + 0.2t)^{-2}, \quad t \ge 0$

(iii) $_{t}p_{40}\,\mu_{40+t} = \begin{cases} 0.025, & 0 \le t < 40 \\ 0, & \text{otherwise} \end{cases}$

(iv) $Z$ is the present value random variable for this insurance

Calculate Var($Z$).

[Question 8 on the Spring 2013 exam]

- A) 0.036
- B) 0.038
- C) 0.040
- D) 0.042
- E) 0.044

## Explanation

$$\begin{align*}
Var(Z) &= E(Z^{2}) - E(Z)^{2}
\end{align*}$$

$$\begin{align*}
E(Z) &= E\left[(1 + 0.2T)(1 + 0.2T)^{-2}\right] \\
&= E\left[(1 + 0.2T)^{-1}\right] \\
&= \int_{0}^{40} \frac{1}{(1 + 0.2t)} f_{T}(t)\,dt \\
&= \frac{1}{40}\int_{0}^{40} \frac{1}{1 + 0.2t}\,dt \\
&= \frac{1}{40}\,\frac{1}{0.2}\,\ln(1 + 0.2t)\Big|_{0}^{40} \\
&= \frac{1}{8}\ln(9) \\
&= 0.27465
\end{align*}$$

$$\begin{align*}
E(Z^{2}) &= E\{(1 + 0.2T)^{2}[(1 + 0.2T)^{-2}]^{2}\} \\
&= E[(1 + 0.2T)^{-2}] \\
&= \int_{0}^{40} \frac{1}{(1 + 0.2t)^{2}} f_{T}(t)\text{ (as printed)} \\
&= \frac{1}{40}\,\frac{1}{0.2}\left[\frac{-1}{(1 + 0.2t)}\right]_{0}^{40} \\
&= \frac{1}{8}\left(1 - \frac{1}{9}\right) \\
&= \frac{1}{9} \\
&= 0.11111
\end{align*}$$

$$\begin{align*}
Var(Z) &= 0.11111 - (0.27465)^{2} \\
&= 0.03568
\end{align*}$$

The answer is **A**.
