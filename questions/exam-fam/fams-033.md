---
id: "fams-033"
exam: "Exam FAM"
topic: "Coverage Modifications"
learning_objective: "Short-Term Insurance and Reinsurance Coverages"
difficulty: hard
type: multiple-choice
wiki_link:
  - Concepts/Coverage+Modifications
  - Concepts/Limited+Expected+Value
  - Concepts/Pareto+Distribution
  - Concepts/Coinsurance
  - Concepts/Short-Term+Insurance+Coverage
answer: "C"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:e0b56e467b1b26592d992cbae8d58aaf93a5a676cbaad2a87d13fb2d94382270
  sources:
    - "SOA Exam FAM-S sample questions (June 15, 2026), Q33, p.27, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM-S sample solutions (July 17, 2026), Q33, p.16, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-033.md
---

Annual prescription drug costs are modeled by a Pareto distribution with $\theta = 2000$ and $\alpha = 2$.

A prescription drug plan pays annual drug costs for an insured member subject to the following provisions:

(i) The insured pays 100% of costs up to the ordinary annual deductible of 250.

(ii) The insured then pays 25% of the costs between 250 and 2250.

(iii) The insured pays 100% of the costs above 2250 until the insured has paid 3600 in total.

(iv) The insured then pays 5% of the remaining costs.

Calculate the expected annual plan payment.

- A) 1120
- B) 1140
- C) 1160
- D) 1180
- E) 1200

## Explanation

$$\begin{align*}
E(X \wedge x) &= \frac{\theta}{\alpha - 1}\left[1 - \left(\frac{\theta}{x + \theta}\right)^{\alpha - 1}\right] \\
&= \frac{2000}{1}\left[1 - \frac{2000}{x + 2000}\right] \\
&= \frac{2000x}{x + 2000}
\end{align*}$$

| $x$ | $E(X \wedge x)$ |
|---|---|
| $\infty$ | 2000 |
| 250 | 222 |
| 2250 | 1059 |
| 5100 | 1437 |

$$\begin{align*}
&0.75[E(X \wedge 2250) - E(X \wedge 250)] + 0.95[E(X) - E(X \wedge 5100)] \\
&= 0.75(1059 - 222) + 0.95(2000 - 1437) \\
&= 1162.6
\end{align*}$$

The 5100 breakpoint was determined by when the insured's share reaches 3600:

$$3600 = 250 + 0.25(2250 - 250) + (5100 - 2250)$$

The answer is **C**.
