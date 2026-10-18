---
id: "fams-029"
exam: "Exam FAM"
topic: "Stop-Loss Reinsurance"
learning_objective: "Short-Term Insurance and Reinsurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Stop-Loss+Reinsurance
  - Concepts/Aggregate+Loss+Model
  - Concepts/Deductible
  - Concepts/Payment
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:84089b4127ae69a22e3a7ff1ea5f6368b647f9b044764c1f94e8d9ee614b48cd
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-029.md
---

For a stop-loss insurance on a three person group:

(i) Loss amounts are independent.

(ii) The distribution of loss amount for each person is:

| Loss Amount | Probability |
|---|---|
| 0 | 0.4 |
| 1 | 0.3 |
| 2 | 0.2 |
| 3 | 0.1 |

(iii) The stop-loss insurance has a deductible of 1 for the group.

Calculate the net stop-loss premium.

- A) 2.00
- B) 2.03
- C) 2.06
- D) 2.09
- E) 2.12

## Explanation

Let $X$ = losses on one life and $S$ = total losses.

$$\begin{align*}
E(X) &= 0.3(1) + 0.2(2) + 0.1(3) \\
&= 1 \\
E(S) &= 3E(X) \\
&= 3(1) \\
&= 3
\end{align*}$$

$$\begin{align*}
E[(S-1)_+] &= E(S) - 1[1 - F_S(0)] \\
&= 3 - 1[1 - f_S(0)] \\
&= 3 - (1 - 0.4^3) \\
&= 2.064
\end{align*}$$

Alternatively, the expected retained payment is

$$\begin{align*}
0f_S(0) + 1[1 - f_S(0)] &= 0.936
\end{align*}$$

and the stop-loss premium is $3 - 0.936 = 2.064$.

The answer is **C**.
