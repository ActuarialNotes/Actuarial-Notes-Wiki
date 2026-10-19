---
id: "faml-7-41"
exam: "Exam FAM"
topic: "Future Loss Random Variable"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: hard
type: multiple-choice
wiki_link:
  - Concepts/Future+Loss+Random+Variable
  - Concepts/Percentile
  - Concepts/Life+Table
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:f325da081dc05e97960fcd88d32cf243d7fe1b5edf3dcae1012264a4f7d59216
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-7-41.md
---

For a special fully discrete 20-year term insurance of 100,000 with a return of premium endowment benefit on (70), you are given:

i) If the insured survives the 20-year term, all gross premiums are returned with interest at 5% at the end of 20 years

ii) The gross premium is 6,750

iii) Renewal commissions are 5% of premium

iv) $_{5}L$ is the gross future loss random variable at time 5, given the insured is alive at time 5

v) Mortality follows the Standard Ultimate Life Table

iv) $i = 0.05$

Calculate the 90th percentile of $_{5}L$.

- A) 24,170
- B) 40,430
- C) 49,200
- D) 58,370
- E) 78,170

## Explanation

For deaths in the first fifteen years, the values of the loss function decrease. The loss if the policyholder survives the term is not part of that pattern. The value of this loss is:

$$\begin{align*}
{}_{5}L &= v^{15}\,6750\,\ddot{s}_{\overline{20}|} - 0.95(6750)\ddot{a}_{\overline{15}|} \\
&= 0.48102(6750)(34.71925) - 0.95(6750)(10.89864) \\
&= 112{,}729.41 - 69{,}887.53 \\
&= 42{,}842.
\end{align*}$$

Assume that the 90th percentile is higher than this value. Then, we want the first 10% of deaths. $0.90l_{75} = 76{,}683.15$, which is between $l_{79}$ and $l_{80}$. The loss for deaths between these ages is:

$$\begin{align*}
100{,}000v^{5} &= 0.95(6750)\ddot{a}_{\overline{5}|} \\
&= 100{,}000(0.78353) - 0.95(6750)(4.54595) \\
&= 78{,}353 - 29{,}151 \\
&= 49{,}202.
\end{align*}$$

Because this value is larger than 42,842, it is the solution.

The answer is **C**.
