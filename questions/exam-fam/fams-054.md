---
id: "fams-054"
exam: "Exam FAM"
topic: "Maximum Likelihood Estimation"
learning_objective: "Parametric Estimation"
difficulty: hard
type: multiple-choice
wiki_link:
  - Concepts/Maximum+Likelihood+Estimation
  - Concepts/Truncation
  - Concepts/Censoring
  - Concepts/Uniform+Continuous+Distribution
answer: "D"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:456c8d2151ba788d7938eccd078c75ab56786f3280f58a4335bfe578bd914efd
  sources:
    - "SOA Exam FAM-S sample questions (June 15, 2026), Q54, p.44, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM-S sample solutions (July 17, 2026), Q54, p.24, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-054.md
---

You are given:

(i) At time 4 hours, there are 5 working light bulbs.

(ii) The 5 bulbs are observed for $p$ more hours.

(iii) Three light bulbs burn out at times 5, 9, and 13 hours, while the remaining light bulbs are still working at time $4 + p$ hours.

(iv) The distribution of failure times is uniform on $(0, \omega)$.

(v) The maximum likelihood estimate of $\omega$ is 29.

Calculate $p$.

- A) Less than 10
- B) At least 10, but less than 12
- C) At least 12, but less than 14
- D) At least 14, but less than 16
- E) At least 16

## Explanation

$$\begin{align*}
L(\omega) &= \frac{\dfrac{1}{\omega}\cdot\dfrac{1}{\omega}\cdot\dfrac{1}{\omega}\left(\dfrac{\omega-4-p}{\omega}\right)^2}{\left(\dfrac{\omega-4}{\omega}\right)^5} \\
&= \frac{(\omega-4-p)^2}{(\omega-4)^5}
\end{align*}$$

$$\begin{align*}
l(\omega) &= 2\ln(\omega-4-p) - 5\ln(\omega-4) \\
l'(\omega) &= \frac{2}{\omega-4-p} - \frac{5}{\omega-4} \\
           &= 0 \\
0 = l'(29) &= \frac{2}{25-p} - \frac{5}{25} \\
\Rightarrow p &= 15.
\end{align*}$$

The denominator in the likelihood function is $S(4)$ to the power of five to reflect the fact that it is known that each observation is greater than 4.

The answer is **D**.
