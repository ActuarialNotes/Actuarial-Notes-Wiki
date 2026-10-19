---
id: "fams-044"
exam: "Exam FAM"
topic: "Individual Risk Model"
learning_objective: "Severity, Frequency, and Aggregate Models"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Individual+Risk+Model
  - Concepts/Binomial+Distribution
  - Concepts/Variance
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:758bc6daba5dcdcbfd9b5681a205c1614963b63c0bc886cfa9882763e374526c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-044.md
---

The repair costs for boats in a marina have the following characteristics:

| Boat type | Number of boats | Probability that repair is needed | Mean of repair cost given a repair | Variance of repair cost given a repair |
|---|---|---|---|---|
| Power boats | 100 | 0.3 | 300 | 10,000 |
| Sailboats | 300 | 0.1 | 1000 | 400,000 |
| Luxury yachts | 50 | 0.6 | 5000 | 2,000,000 |

At most one repair is required per boat each year. Repair incidence and cost are mutually independent.

The marina budgets an amount, $Y$, equal to the aggregate mean repair costs plus the standard deviation of the aggregate repair costs.

Calculate $Y$.

- A) 200,000
- B) 210,000
- C) 220,000
- D) 230,000
- E) 240,000

## Explanation

The number of repairs for each boat type has a binomial distribution.

For power boats:

$$\begin{align*}
E(S) &= 100(0.3)(300) \\
&= 9{,}000 \\
Var(S) &= 100(0.3)(10{,}000) + 100(0.3)(0.7)(300^2) \\
&= 2{,}190{,}000
\end{align*}$$

For sail boats:

$$\begin{align*}
E(S) &= 300(0.1)(1{,}000) \\
&= 30{,}000 \\
Var(S) &= 300(0.1)(400{,}000) + 300(0.1)(0.9)(1{,}000^2) \\
&= 39{,}000{,}000
\end{align*}$$

For luxury yachts:

$$\begin{align*}
E(S) &= 50(0.6)(5{,}000) \\
&= 150{,}000 \\
Var(S) &= 50(0.6)(0.4)(2{,}000{,}000) + 50(0.6)(0.4)(5{,}000^2) \\
&= 360{,}000{,}000
\end{align*}$$

The sums are 189,000 expected and a variance of 401,190,000 for a standard deviation of 20,030. The mean plus standard deviation is 209,030.

The answer is **B**.
