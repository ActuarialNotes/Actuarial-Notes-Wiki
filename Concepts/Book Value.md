---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:c7e305d73f8ec09aa5ea2142d12fce45e7ed0a9aef220b93d576b8adde8eef53
  sources:
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 97, solutions PDF pp.27-28, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.396-397, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.334-335, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA study note FM-23-05, Broverman, Review of Calculator Functions for the Texas Instruments BA II Plus, p.21, sha256:1b71586cc1b08d7bc36c04ecb3d4e6b367fce30f394e63efafc879e6b6e466fa — https://www.soa.org/globalassets/assets/files/edu/FM-23-05.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Book Value.md
---

**Book value** of a bond is the value assigned to the bond on the issuer's or investor's books, typically equal to the present value of future cash flows at the original yield rate.

**Prospective formula** (present value of remaining cash flows):

> $$BV_k = Fr \cdot a_{\overline{n-k}|j} + C \cdot v^{n-k}$$

**Retrospective formula** (price accumulated minus coupons accumulated):

> $$BV_k = P(1+j)^k - Fr \cdot s_{\overline{k}|j}$$

- The **book value** of a bond at time $k$ (immediately after the $k$-th coupon is paid) is the amortized value of the bond at that point, using the original [[Yield Rate]] $j$.
- It equals the present value of all remaining cash flows (coupons and redemption) discounted at $j$, and also equals the price accumulated at $j$ minus the accumulated coupons.
- At time 0, $BV_0 = P$ (the purchase price). At time $n$, $BV_n = C$ (the redemption value).
- For a **premium bond** ($P > C$), the book value decreases from $P$ toward $C$ over time (amortization of premium). For a **discount bond** ($P < C$), it increases from $P$ toward $C$ (accumulation of discount).
- Book value is used in the [[Amortization Schedule]] for bonds: each coupon period the investor earns $j \cdot BV_{k-1}$ in yield, and the difference between the coupon $Fr$ and the yield $j \cdot BV_{k-1}$ is the write-down (premium) or write-up (discount) of the book value.

![[Media/Figures/Book_Value.svg|340]]

> [!example]- Book Value of a Premium Bond {Example}
> A \$$1{,}000$ face value 3-year annual-coupon bond has coupon rate $8\%$ and yield rate $6\%$. Find the book value after the 2nd coupon.
>
> > [!answer]-
> > First find the price: $P = 80\,a_{\overline{3}|6\%} + 1000\,v^3 = 80(2.6730) + 1000(0.839619) = 213.84 + 839.62 = \$1{,}053.46$.
> >
> > **Prospective**: $BV_2 = 80\,a_{\overline{1}|6\%} + 1000\,v^1 = 80(0.9434) + 1000(0.9434) = 75.47 + 943.40 = \$1{,}018.87$
> >
> > **Retrospective**: $BV_2 = 1053.46(1.06)^2 - 80\,s_{\overline{2}|6\%} = 1053.46(1.1236) - 80(2.0600) = 1183.67 - 164.80 = \$1{,}018.87$
> >
> > Both methods give \$$1{,}018.87$. The book value has moved from \$$1{,}053.46$ at time 0 toward \$$1{,}000$ at maturity, as expected for a premium bond.
