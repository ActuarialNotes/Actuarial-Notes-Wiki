---
id: "fm-an-002"
exam: "Financial Mathematics"
topic: "Macaulay Duration"
learning_objective: "General Cash Flows, Portfolios, and Asset Liability Management"
difficulty: hard
type: free-entry
bloom: analyze
wiki_link:
  - Concepts/Macaulay+Duration
  - Concepts/Bonds
  - Concepts/Coupon+Rate
  - Concepts/Level+Annuity
  - Concepts/Perpetuity
answer: "DBCAE"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5c959e0851162ca96f02b8134ec94c92e5dced4dc53e63ab464c69b88c1b46c7
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fm/fm-an-002.md
---

At an annual effective interest rate of 5%, put the following cash-flow streams in order from **smallest** Macaulay duration to **largest**. Enter the letters with no spaces, e.g. ABCDE.

- (A) A 10-year zero-coupon bond
- (B) A 10-year bond with 8% annual coupons, redeemed at par
- (C) A 10-year bond with 2% annual coupons, redeemed at par
- (D) A 10-year level annuity-immediate with annual payments
- (E) A level perpetuity-immediate with annual payments

## Explanation

Macaulay duration is the present-value-weighted average time of the cash flows, $D = \sum t\,v^t C_t \big/ \sum v^t C_t$ with $v = 1/1.05$:

$$
\begin{aligned}
\text{(D) 10-year annuity-immediate: } & D = 5.10 \\
\text{(B) 8\% coupon bond: } & D = 7.54 \\
\text{(C) 2\% coupon bond: } & D = 9.01 \\
\text{(A) zero-coupon bond: } & D = 10 \\
\text{(E) perpetuity-immediate: } & D = \frac{1+i}{i} = \frac{1.05}{0.05} = 21
\end{aligned}
$$

The order is **DBCAE**. The structure, without computing: the annuity spreads its value evenly over ten years, so its weighted average time is near the middle; a coupon bond adds a large redemption at year 10, pulling its duration toward 10 — the smaller the coupons, the more weight sits at year 10; a zero-coupon bond has all its weight at year 10; and a perpetuity's payments never stop, though the discounting keeps its duration finite.

**Common wrong entries**

- **DCBAE** — believing a higher coupon rate lengthens duration. Larger coupons put *more* of the value early, so the 8% bond has the **shorter** duration (7.54 against 9.01).
- **DBCEA** — treating the perpetuity like a level annuity whose duration sits near the middle of its payments, and so below a 10-year bond's. Its payments never stop, and its duration is $D = (1+i)/i = 21$, the largest here — not its present value $a_{\overline{\infty}|} = 1/i = 20$, which is a different quantity.
- **A, B and C in any order after D** — taking a bond's duration to be its term, 10 for all three. Only the zero-coupon bond's duration equals its maturity; every coupon brings the weighted average time forward.
