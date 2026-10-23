---
id: "fams-104"
exam: "Exam FAM"
topic: "Lognormal Distribution"
learning_objective: "Option Pricing Fundamentals"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Lognormal+Distribution
answer: "D"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:30366877e560109b367140218e943dd29f5ae5aa4e34593c5bd7530fef505aeb
  sources:
    - "SOA Exam FAM Sample Questions, Syllabus Topics 1-6 (June 15, 2026), Q104, p.86, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Syllabus Topics 1-6 (July 17, 2026), Q104, p.41, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-104.md
---

An insurer offers a three-year contract with a guaranteed minimum of the policyholder's original investment.

You are given:

(i) The policyholder invests a premium of 1000.

(ii) The insurer keeps 2.5% of the premium to cover expenses, then invests the remainder in a mutual fund.

(iii) The mutual fund investment value follows the lognormal distribution with parameters $\mu = 0.075$ and $\sigma = 0.15$ per year.

(iv) The continuously compounded risk-free rate of interest is 6.5%.

(v) The mutual fund does not pay dividends.

Calculate the probability that the insurer's guarantee applies at the maturity date.

- A) 0.165
- B) 0.181
- C) 0.193
- D) 0.221
- E) 0.257

## Explanation

$$\begin{align*}
S_0 &= 1000(1 - 0.025) \\
&= 975
\end{align*}$$

$$S_3/S_0 \sim LN(3\mu, 3^{0.5}\sigma), \quad \ln(S_3/S_0) \sim N(3 \times 0.075 = 0.225,\ 3 \times 0.15^2)$$

Therefore, $\ln(S_3) \sim N[0.225 + \ln(975) = 7.10744,\ 0.0675]$.

$$\begin{align*}
\Pr(S_3 < 1000) &= \Pr[\ln(S_3) < \ln(1000) = 6.90776] \\
&= \Pr\left[Z < \frac{6.90776 - 7.10744}{\sqrt{0.0675}}\right] \\
&= \Pr[Z < -0.76857] \\
&= 0.221
\end{align*}$$

The answer is **D**.
