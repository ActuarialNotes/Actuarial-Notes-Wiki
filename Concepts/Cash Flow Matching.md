---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:4611e0164ec00c9fe721b281ac46494c9e8c8fb35253738f01bd43aaf7d6ae6c
  sources:
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 37, solutions PDF p.12, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 192, solutions PDF p.49, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 346, solutions PDF p.92, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 432, solutions PDF pp.112-113, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 147, solutions PDF p.40, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, pp.489-490, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Cash Flow Matching.md
---

**Cash flow matching** (also called **dedication**) is a portfolio strategy in which asset cash flows are structured to exactly equal liability cash flows at every future date, eliminating both [[Price Risk]] and [[Reinvestment Risk]] entirely.

- Unlike [[Redington Immunization]], which only protects against small parallel rate shifts and needs periodic rebalancing, a matched portfolio requires **no rebalancing** once constructed — each liability is funded directly by a matching asset cash flow.
- It is more conservative, and typically more expensive, than immunization: it removes reinvestment risk at the cost of reduced flexibility.
- Construction proceeds **backwards** from the last liability date — fund the final liability first, then the second-to-last, and so on.
- A coupon bond bought for a later liability also pays coupons on the earlier dates, so those coupons reduce the amount still to be funded at each earlier date.

> [!example]- Cash Flow Matching a Two-Period Liability {Example}
> A company has liabilities of \$$5{,}000$ due at time 1 and \$$10{,}000$ due at time 2. Zero-coupon bonds are available at all maturities. Show how to construct a cash flow matched portfolio.
>
> > [!answer]-
> > **Step 1 — Fund the time-2 liability:** Buy a 2-year zero-coupon bond with face value \$$10{,}000$. At time 2 it pays exactly \$$10{,}000$. ✓
> >
> > **Step 2 — Fund the time-1 liability:** Buy a 1-year zero-coupon bond with face value \$$5{,}000$. At time 1 it pays exactly \$$5{,}000$. ✓
> >
> > The portfolio cost is $\dfrac{10{,}000}{(1+s_2)^2} + \dfrac{5{,}000}{1+s_1}$, where $s_1, s_2$ are the current spot rates. Once purchased, no rebalancing is needed and the liabilities are fully funded regardless of future interest rate movements.

> [!example]- Matching with a Coupon Bond {Example}
> A pension fund must pay $1{,}000$ at time 1 and $2{,}000$ at time 2. It can buy a 1-year zero-coupon bond and a 2-year bond with 5% annual coupons. Find the face amount of each bond that exactly matches the liabilities.
>
> > [!answer]-
> > **Time 2 first:** the 2-year bond pays its face $F$ plus a coupon of $0.05F$ at time 2, so
> > $$
> > \begin{align*}
> > 1.05F &= 2{,}000 \\
> > F &= 1{,}904.76
> > \end{align*}
> > $$
> > **Then time 1:** that bond also pays a coupon of $0.05(1{,}904.76) = 95.24$ at time 1, so the zero-coupon bond only has to supply the rest:
> > $$1{,}000 - 95.24 = 904.76$$
> > Buy a 2-year bond with face $1{,}904.76$ and a 1-year zero-coupon bond with face $904.76$; the asset cash flows are exactly $1{,}000$ at time 1 and $2{,}000$ at time 2.
