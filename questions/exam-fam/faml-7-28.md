---
id: "faml-7-28"
exam: "Exam FAM"
topic: "Policy Value"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Policy+Value
  - Concepts/Equivalence+Principle
  - Concepts/Whole+Life+Insurance
answer: "D"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:138eb325406d2e626f91d5931a938ba4f9a55fb898f7f5bd36a5dca5f879de5c
  sources:
    - "SOA Exam FAM-L Sample Questions (October 2024), Q7.28, p.117, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (October 2024), Q7.28, p.78, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-7-28.md
---

For a special fully discrete whole life insurance of 1,000 on (45), you are given:

(i) The net premiums for year *k* are:

$$\begin{cases} P, & k = 1, 2, \ldots, 20 \\ P + W, & k = 21, 22, \ldots \end{cases}$$

(ii) Mortality follows the Standard Ultimate Life Table

(iii) $i = 0.05$

(iv) $_{20}V$, the net premium policy value at the end of the 20th year, is 0

Calculate *W*.

[A modified version of Question 15 on the Fall 2017 exam]

- A) 12
- B) 16
- C) 20
- D) 24
- E) 28

## Explanation

$${}_{20}V = 0 \Longrightarrow 1000A_{65} = (P + W) \times \ddot{a}_{65}$$

At issue, present value of benefits must equal present value of premium, so:

$$1000A_{45} = P\ddot{a}_{45} + W\;{}_{20}E_{45} \times \ddot{a}_{65}$$

$$354.77 = (P + W)(13.5498) \Rightarrow P + W = 26.182674 \Rightarrow P = 26.182674 - W$$

$$\begin{align*}
151.61 &= 17.8162P + W(0.35994)(13.5498) \\
151.61 &= 17.8162(26.182674 - W) + W(0.35994)(13.5498)
\end{align*}$$

$$\Rightarrow W = 24.33447$$

The answer is **D**.
