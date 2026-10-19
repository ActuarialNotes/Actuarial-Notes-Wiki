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
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9b6bbc0b4eae77fb353196ec50c819a2610ca92c2bc487001b595a22226665fc
  sources: []
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
