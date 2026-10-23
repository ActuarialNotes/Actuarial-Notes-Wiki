---
id: "faml-7-29"
exam: "Exam FAM"
topic: "Policy Value"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Policy+Value
  - Concepts/Expenses
  - Concepts/Equivalence+Principle
  - Concepts/Whole+Life+Insurance
answer: "E"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:b70e30f1c9602733d32340d0634695b8f33052de115559bd4ce797c6aa0c4956
  sources:
    - "SOA Exam FAM-L Sample Questions (October 2024), Q7.29, p.118, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (October 2024), Q7.29, p.79, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-7-29.md
---

For a fully discrete whole life insurance of *B* on (*x*), you are given:

(i) Expenses, incurred at the beginning of each year, equal 30 in the first year and 5 in subsequent years

(ii) The net premium policy value at the end of year 10 is 2290

(iii) Gross premiums are calculated using the equivalence principle

(iv) $i = 0.04$

(v) $\ddot{a}_{x} = 14.8$

(vi) $\ddot{a}_{x+10} = 11.4$

Calculate $_{10}V^{g}$, the gross premium policy value at the end of year 10.

[A modified version of Question 16 on the Fall 2017 exam]

- A) 2190
- B) 2210
- C) 2230
- D) 2250
- E) 2270

## Explanation

$$\begin{align*}
V_{10} = 2{,}290 &= B\left(1 - \frac{\ddot{a}_{x+10}}{\ddot{a}_{x}}\right) \\
&= B\left(1 - \frac{11.4}{14.8}\right) \\
\Rightarrow B &= 9{,}968.24
\end{align*}$$

$$G\ddot{a}_{x} = 25 + 5\ddot{a}_{x} + B \times A_{x}$$

$$\begin{align*}
A_{x} &= 1 - d\ddot{a}_{x} \\
&= 1 - \left(\frac{0.04}{1.04} \times 14.8\right) \\
&= 0.430769231
\end{align*}$$

$$\begin{align*}
G \times 14.8 &= 25 + 5 \times 14.8 + 9{,}968.24 \times 0.430769231 \\
\Rightarrow G &= 296.82
\end{align*}$$

$${}_{10}V^{g} = 9{,}968.24A_{x+10} + 5\ddot{a}_{x+10} - 296.82\ddot{a}_{x+10}$$

$$\begin{align*}
A_{x+10} &= 1 - d\ddot{a}_{x+10} \\
&= 1 - \left(\frac{0.04}{1.04} \times 11.4\right) \\
&= 0.561538462
\end{align*}$$

$$\begin{align*}
{}_{10}V^{g} &= 9{,}968.24 \times 0.561538462 + 5 \times 11.4 - 296.82 \times 11.4 \\
\Rightarrow {}_{10}V^{g} &= 2{,}270.80
\end{align*}$$

Alternatively, the expense net premium is based on the extra expenses in year 1, so

$$\begin{align*}
P^{e} &= (30 - 5)/14.8 \\
&= 1.68919
\end{align*}$$

$$\begin{align*}
{}_{10}V^{e} &= 0 - 1.68919(11.4) \\
&= -19.26
\end{align*}$$

$$\begin{align*}
{}_{10}V^{g} &= {}_{10}V^{n} + {}_{10}V^{e} \\
&= 2290 - 19.26 \\
&= 2270.74
\end{align*}$$

The answer is **E**.
