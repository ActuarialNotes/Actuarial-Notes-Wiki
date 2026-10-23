---
id: "faml-4-17"
exam: "Exam FAM"
topic: "Whole Life Insurance"
learning_objective: "Present Value Random Variables for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Whole+Life+Insurance
  - Concepts/Median
  - Concepts/Future+Lifetime+Random+Variable
  - Concepts/Life+Table
answer: "A"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:7acc874c7a66c108903d5e8f8952fcd6c44a9dc07c9280bc4f1272a78854817c
  sources:
    - "SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q4.17, p.37 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Topics 7-10), Q4.17, p.25 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
    - "SOA Exam FAM Tables, Standard Ultimate Life Table, pp.20-21, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-4-17.md
---

For a special whole life policy on (48), you are given:

(i) The policy pays 5000 if the insured's death is before the median curtate future lifetime at issue and 10,000 if death is after the median curtate future lifetime at issue

(ii) Mortality follows the Standard Ultimate Life Table

(iii) Death benefits are paid at the end of the year of death

(iv) $i = 0.05$

Calculate the actuarial present value of benefits for this policy.

[A modified version of Question 6 on the Fall 2016 exam]

- A) 1130
- B) 1160
- C) 1190
- D) 1220
- E) 1250

## Explanation

The median of $K_{48}$ is the integer $m$ for which

$$P(K_{48} < m) \le 0.5 \text{ and } P(K_{48} > m) \le 0.5.$$

This is equivalent to finding $m$ for which

$$\frac{l_{48+m}}{l_{48}} \ge 0.5 \text{ and } \frac{l_{48+m+1}}{l_{48}} \le 0.5.$$

Based on the SULT and

$$\begin{align*}
l_{48}(0.5) &= (98{,}783.9)(0.5) \\
&= 49{,}391.95,
\end{align*}$$

we have $m = 40$ since

$$l_{88} \ge 49{,}391.95 \text{ and } l_{89} \le 49{,}391.95.$$

So:

$$\begin{align*}
APV &= 5000A_{48} + 5000\,{}_{40}E_{48}A_{88} \\
&= 5000A_{48} + 5000 \cdot {}_{20}E_{48} \cdot {}_{20}E_{68} \cdot A_{88} \\
&= 5000(0.17330) + 5000(0.35370)(0.20343)(0.72349) \\
&= 1126.79
\end{align*}$$

The answer is **A**.
