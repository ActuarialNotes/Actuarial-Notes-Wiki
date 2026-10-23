---
id: "faml-6-45"
exam: "Exam FAM"
topic: "Percentile"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: hard
type: multiple-choice
wiki_link:
  - Concepts/Percentile
  - Concepts/Future+Loss+Random+Variable
  - Concepts/Whole+Life+Insurance
  - Concepts/Fractional+Age+Assumption
answer: "E"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:6312835b2e5564ff829efb0e730dd8968f1b1205c54db6a689dd266e51ae73d8
  sources:
    - "SOA Exam FAM Sample Questions, Syllabus Topics 7-10 (August 18, 2026), Q6.45, p.84, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Syllabus Topics 7-10 (August 18, 2026), Q6.45, p.58, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
    - "SOA Exam FAM Tables (undated; file 2024-10-exam-fam-tables.pdf), Standard Ultimate Life Table, pp.20-21, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-45.md
---

For a fully continuous whole life insurance of 100,000 on (35), you are given:

(i) The annual rate of premium is 560

(ii) Mortality follows the Standard Ultimate Life Table

(iii) Deaths are uniformly distributed over each year of age

(iv) $i = 0.05$

Calculate the 75th percentile of the loss at issue random variable for this policy.

[A modified version of Question 8 on the Spring 2017 exam]

- A) 610
- B) 630
- C) 650
- D) 670
- E) 690

## Explanation

$$\begin{align*}
L_{0} &= 100{,}000v^{T} - 560\bar{a}_{\overline{T}|} \\
&= \left(100{,}000 + \frac{560}{\delta}\right)e^{-\delta T} - \frac{560}{\delta}
\end{align*}$$

Since $L_{0}$ is a decreasing function of $T$, the 75th percentile of $L_{0}$ is $L_{0}(t)$ where $t$ is such that $\Pr[T_{35} > t] = 0.75$.

$$\begin{align*}
\frac{l_{35+t}}{l_{35}} &= 0.75 \\
l_{35+t} &= 0.75l_{35} \\
&= 0.75 \times 99{,}556.7 \\
&= 74{,}667.5
\end{align*}$$

$$l_{81} < 74{,}667.5 < l_{80}$$

$$\begin{align*}
t &= (80 - 35) + s \\
l_{80+s} &= sl_{81} + (1 - s)l_{80} \\
74{,}667.5 &= 73{,}186.3s + 75{,}657.2(1 - s) \\
s &= 0.40054 \\
t &= 45.40054
\end{align*}$$

$$\begin{align*}
L_{0}(45.40054) &= \left(100{,}000 + \frac{560}{\ln(1.05)}\right)e^{-45.40054\ln(1.05)} - \frac{560}{\ln(1.05)} \\
&= 689.25
\end{align*}$$

The answer is **E**.
