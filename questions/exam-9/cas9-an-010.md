---
id: "cas9-an-010"
exam: "Exam 9"
topic: "Risk"
learning_objective: "Enterprise Risk Management (ERM)"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Risk
  - Concepts/Correlation
  - Concepts/Risk+Modeling
  - Concepts/Risk+Capital
answer: "D"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:92a409558bbe00c79aac4f2b9b1e4ba6cd63912a9bcb9bf96589a985107e70ea
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-9/cas9-an-010.md
---

An insurer measures three risks separately, each as the capital it would need on its own: market risk 60, non-life underwriting risk 80 and counterparty default risk 30. It aggregates them with the correlation matrix that the EU Solvency II Directive (2009/138/EC, Annex IV) prescribes for these modules:

| | Market | Default | Non-life |
|---|---|---|---|
| Market | 1 | 0.25 | 0.25 |
| Default | 0.25 | 1 | 0.5 |
| Non-life | 0.25 | 0.5 | 1 |

The aggregate is the square root of the sum, over every combination of risks $i$ and $j$, of $\text{Corr}_{i,j} \times C_i \times C_j$.

Calculate the aggregate capital for the three risks.

- A) 104.40
- B) 117.26
- C) 124.10
- D) 128.84
- E) 170.00

## Explanation

Summing over every ordered pair $(i, j)$ counts each cross term twice:

$$
C^2 = 60^2 + 80^2 + 30^2 + 2\left[0.25(60)(80) + 0.25(60)(30) + 0.5(80)(30)\right]
$$

$$
C^2 = 10{,}900 + 2\,(1{,}200 + 450 + 1{,}200) = 16{,}600, \qquad C = \mathbf{128.84}
$$

The three risks together need 128.84 rather than 170: the diversification credit is 41.16. The default risk earns the least credit because it is the most correlated with the largest risk, non-life underwriting. The answer is **D**.

**Why not the others**

- **A** — 104.40 treats the risks as independent (every correlation zero), the largest diversification credit possible.
- **B** — 117.26 counts each cross term once, though the sum runs over both $(i, j)$ and $(j, i)$.
- **C** — 124.10 reads the default/non-life correlation as 0.25 instead of 0.5.
- **E** — 170.00 adds the standalone capitals, which assumes the risks are perfectly correlated.
