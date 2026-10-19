---
id: "cas5-an-010"
exam: "Exam 5"
topic: "Loss Elimination Ratio"
learning_objective: "Ratemaking"
difficulty: medium
type: free-entry
bloom: apply
wiki_link:
  - Concepts/Loss+Elimination+Ratio
  - Concepts/Deductible+Rating
  - Concepts/Limited+Expected+Value
answer: "0.889"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:d3e54752815cbeece5a0b26787bc277314037cb769b73e23a06bded2013f8c1e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-5/cas5-an-010.md
---

A homeowners insurer is pricing a \$500 deductible option. Its base policy has a \$250 deductible. The ground-up size-of-loss distribution, from policies with no deductible, is:

| Ground-up loss size | Number of claims | Total ground-up losses |
|---|---|---|
| \$0 to \$250 | 300 | \$40,000 |
| \$250 to \$500 | 250 | \$92,000 |
| Over \$500 | 450 | \$1,368,000 |

Assume all expenses are variable. Calculate the indicated rate relativity of the \$500 deductible to the \$250 base deductible. Give your answer to three decimal places.

## Explanation

The loss elimination ratio at deductible $d$ is the share of ground-up losses below $d$: every claim contributes its loss up to $d$.

$$
\begin{align*}
\text{Total losses} &= 40{,}000 + 92{,}000 + 1{,}368{,}000 \\
&= 1{,}500{,}000 \\[4pt]
\text{Eliminated at } 250 &= 40{,}000 + (250 + 450)(250) \\
&= 215{,}000 \\
\text{LER}(250) &= 215{,}000 / 1{,}500{,}000 \\
&= 0.14333 \\[4pt]
\text{Eliminated at } 500 &= 40{,}000 + 92{,}000 + 450(500) \\
&= 357{,}000 \\
\text{LER}(500) &= 357{,}000 / 1{,}500{,}000 \\
&= 0.23800
\end{align*}
$$

With all expenses variable, a deductible's rate is proportional to the losses it leaves, one minus the LER. Relative to the \$250 base:

$$
\text{Relativity} = \frac{1 - \text{LER}(500)}{1 - \text{LER}(250)} = \frac{0.76200}{0.85667} = \mathbf{0.889}
$$

**Common wrong entries**

- **0.762** — one minus LER(500) is the relativity to *full coverage*, not to the \$250 base deductible. The base already eliminates 14.3% of losses, so the relativity must be taken relative to what the base covers.
- **0.905** — subtracting the extra elimination, LER(500) less LER(250), from 1 takes it out of full-coverage losses instead of from the losses the \$250 deductible still covers.
- **0.643** — measuring with claim *counts* (the share of claims each deductible removes entirely) ignores that every claim over the deductible still contributes the first \$250 or \$500; rates depend on loss dollars, not counts.
