---
id: "faml-6-13"
exam: "Exam FAM"
topic: "Future Loss Random Variable"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Future+Loss+Random+Variable
  - Concepts/Expenses
  - Concepts/Whole+Life+Insurance
answer: "D"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:9b6bbc0b4eae77fb353196ec50c819a2610ca92c2bc487001b595a22226665fc
  sources:
    - "SOA Exam FAM-L Sample Questions (Oct 2024), Q6.13, p.60, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Oct 2024), Q6.13, p.41, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
    - "SOA Exam FAM Tables (Oct 2024), Standard Ultimate Life Table pp.20-21, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-13.md
---

For a fully discrete whole life insurance of 10,000 on (45), you are given:

(i) Commissions are 80% of the first year premium and 10% of subsequent premiums. There are no other expenses

(ii) Mortality follows the Standard Ultimate Life Table

(iii) $i = 0.05$

(iv) $_{0}L$ denotes the loss at issue random variable

(v) If $T_{45} = 10.5$, then ${}_{0}L = 4953$

Calculate $\mathrm{E}\left[{}_{0}L\right]$.

[A modified version of Question 19 on the Fall 2013 exam]

- A) -580
- B) -520
- C) -460
- D) -400
- E) -340

## Explanation

If $T_{45} = 10.5$, then $K_{45} = 10$ and $K_{45} + 1 = 11$.

$$\begin{align*}
{}_{0}L &= 10{,}000v^{K_{45}+1} - G(1-0.10)\ddot{a}_{\overline{K_{45}+1}|} + G(0.80-0.10) \\
&= 10{,}000v^{11} - 0.9G\ddot{a}_{\overline{11}|} + 0.7G
\end{align*}$$

$$\begin{align*}
4953 &= 10{,}000(0.58468) - 0.9G(8.72173) + 0.7G \\
G &= (5846.8 - 4953)/(7.14956) \\
&= 125.01
\end{align*}$$

$$\begin{align*}
E({}_{0}L) &= 10{,}000A_{45} - (1-0.1)G\ddot{a}_{45} + (0.8-0.1)G \\
&= (10{,}000)(0.15161) - (0.9)(125.01)(17.8162) + (0.7)(125.01) \\
&= -400.87
\end{align*}$$

The answer is **D**.
