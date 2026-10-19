---
id: "fm-an-001"
exam: "Financial Mathematics"
topic: "Annuity Due"
learning_objective: "Annuities/Cash Flows with Non-Contingent Payments"
difficulty: medium
type: multi-part
bloom: understand
wiki_link:
  - Concepts/Annuity+Due
  - Concepts/Annuity+Immediate
  - Concepts/Arithmetic+Increasing+Annuity
  - Concepts/Accumulated+Value
  - Concepts/Present+Value
points: 5
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2a138c3c936b5be9d1d2729112e536deabeaf26db825e8ac237f9b38f8bfcfa0
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fm/fm-an-001.md
---

Each part describes a series of annual payments and a valuation date, with time measured in years from today (time 0) and a constant annual effective interest rate $i$. Match each to the actuarial symbol that equals its value on that date. An option may be used more than once or not at all.

## Part a (1 point)
Ten payments of 1, at times 0, 1, ..., 9, valued at time 10.

- A) $a_{\overline{10}|}$
- B) $\ddot{a}_{\overline{10}|}$
- C) $s_{\overline{10}|}$
- D) $\ddot{s}_{\overline{10}|}$
- E) $(Ia)_{\overline{10}|}$

### Answer
D

### Explanation
Valued one period **after** the last payment, a series of level payments is an accumulated annuity-due: $\ddot{s}_{\overline{10}|} = (1+i)\,s_{\overline{10}|}$. **C** is the value at time 9, on the last payment's date — one year short. **A** and **B** are present values, at time $-1$ and time 0.

## Part b (1 point)
Ten payments of 1, at times 1, 2, ..., 10, valued at time 0.

- A) $a_{\overline{10}|}$
- B) $\ddot{a}_{\overline{10}|}$
- C) $s_{\overline{10}|}$
- D) $\ddot{s}_{\overline{10}|}$
- E) $(Ia)_{\overline{10}|}$

### Answer
A

### Explanation
Valued one period **before** the first payment: the annuity-immediate present value $a_{\overline{10}|}$. **B** would be right only if the first payment were at time 0. **C** and **D** are accumulated values at or after the last payment.

## Part c (1 point)
Payments of 1, 2, ..., 10, at times 1, 2, ..., 10 respectively, valued at time 0.

- A) $a_{\overline{10}|}$
- B) $\ddot{a}_{\overline{10}|}$
- C) $s_{\overline{10}|}$
- D) $\ddot{s}_{\overline{10}|}$
- E) $(Ia)_{\overline{10}|}$

### Answer
E

### Explanation
Payments rising by 1 each year, first payment of 1 one period after the valuation date: the increasing annuity-immediate, $(Ia)_{\overline{10}|} = \dfrac{\ddot{a}_{\overline{10}|} - 10v^{10}}{i}$. **A** treats every payment as 1; the level symbols cannot describe a non-level series.

## Part d (1 point)
Ten payments of 1, at times 0, 1, ..., 9, valued at time 9.

- A) $a_{\overline{10}|}$
- B) $\ddot{a}_{\overline{10}|}$
- C) $s_{\overline{10}|}$
- D) $\ddot{s}_{\overline{10}|}$
- E) $(Ia)_{\overline{10}|}$

### Answer
C

### Explanation
Valued **on** the date of the last payment, a level series is $s_{\overline{10}|}$, whatever the calendar dates are. Seeing a payment at time 0 and reaching for **D** is the fork: "due" or "immediate" describes where the valuation date sits relative to the payments, not whether the first payment is today. **D** is one year later (part a).

## Part e (1 point)
Ten payments of 1, at times 0, 1, ..., 9, valued at time $-1$ (one year ago).

- A) $a_{\overline{10}|}$
- B) $\ddot{a}_{\overline{10}|}$
- C) $s_{\overline{10}|}$
- D) $\ddot{s}_{\overline{10}|}$
- E) $(Ia)_{\overline{10}|}$

### Answer
A

### Explanation
The valuation date is one period before the first payment, so this is $a_{\overline{10}|}$ — the same symbol as part b, with the whole series shifted one year earlier. **B**, $\ddot{a}_{\overline{10}|}$, is the value at time 0, one year later: $\ddot{a}_{\overline{10}|} = (1+i)\,a_{\overline{10}|}$.

Option **B** is used by none of the five.
