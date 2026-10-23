---
id: "faml-3-02"
exam: "Exam FAM"
topic: "Life Table"
learning_objective: "Mortality Models"
difficulty: hard
type: multiple-choice
wiki_link:
  - Concepts/Life+Table
  - Concepts/Fractional+Age+Assumption
  - Concepts/Future+Lifetime+Random+Variable
answer: "D"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:d35e2897c186d2c74b780d14b5a1b7e8336b23cad7da84e2a1f7312a0414655a
  sources:
    - "SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q3.2, p.14 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Topics 7-10), Q3.2, p.10 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-3-02.md
---

You are given:

(i) The following extract from a mortality table with a one-year select period:

| $x$ | $l_{[x]}$ | $d_{[x]}$ | $l_{x+1}$ | $x+1$ |
|---|---|---|---|---|
| 65 | 1000 | 40 | - | 66 |
| 66 | 955 | 45 | - | 67 |

(ii) Deaths are uniformly distributed over each year of age

$\mathring{e}_{[65]} = 15.0$

Calculate $\mathring{e}_{[66]}$.

[Question 19 on the Spring 2013 exam]

- A) 14.1
- B) 14.3
- C) 14.5
- D) 14.7
- E) 14.9

## Explanation

$$\begin{align*}
l_{65+1} &= 1000 - 40 \\
&= 960
\end{align*}$$

$$\begin{align*}
l_{66+1} &= 955 - 45 \\
&= 910
\end{align*}$$

$$\mathring{e}_{[65]} = \int_{0}^{1} {}_{t}p_{[65]}\,dt + p_{[65]}\int_{0}^{1} {}_{t}p_{66}\,dt + p_{[65]}\,p_{66}\,\mathring{e}_{67}$$

$$15.0 = \left[1 - \left(\frac{1}{2}\right)\left(\frac{40}{1000}\right)\right] + \frac{960}{1000}\left[1 - \left(\frac{1}{2}\right)\left(\frac{50}{960}\right)\right] + \left(\frac{960}{1000}\right)\left(\frac{910}{960}\right)\mathring{e}_{67}$$

$$\begin{align*}
\mathring{e}_{67} &= \frac{15(1000) - (980 + 935)}{910} \\
&= 14.37912
\end{align*}$$

$$\begin{align*}
\mathring{e}_{[66]} &= \int_{0}^{1} {}_{t}p_{[66]}\,dt + p_{[66]}\,\mathring{e}_{67} \\
&= \left[1 - \left(\frac{1}{2}\right)\left(\frac{45}{955}\right)\right] + \left(\frac{910}{955}\right)\mathring{e}_{67} \\
&= \left[1 - \left(\frac{1}{2}\right)\left(\frac{45}{955}\right)\right] + \left(\frac{910}{955}\right)(14.37912) \\
&= 14.678
\end{align*}$$

Note that because deaths are uniformly distributed over each year of age, $\int_{0}^{1} {}_{t}p_{x}\,dt = 1 - 0.5q_{x}$.

The answer is **D**.
