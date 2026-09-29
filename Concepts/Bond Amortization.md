---
verification:
  status: in_review
  confidence: null
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:765accc14cf229f6cfaf9cde4fc1a6b9f548ce7825b52cb8be3204908cad4ac4
  sources:
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 4 Bonds (15-25%), learning outcome a)-b), PDF p.4, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §44 Amortization of Premium or Discount, PDF p.396-398, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Broverman, Review of Calculator Functions for the Texas Instruments BA II Plus (SOA study note FM-23-05), PDF p.21, sha256:1b71586cc1b08d7bc36c04ecb3d4e6b367fce30f394e63efafc879e6b6e466fa — https://www.soa.org/globalassets/assets/files/edu/FM-23-05.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Bond Amortization.md
---

**Bond amortization** is the division of each [[Coupon|coupon]] of a [[Bonds|bond]] into **interest earned** at the yield rate and a **principal adjustment** that moves the [[Book Value|book value]] from the price $P$ to the [[Redemption Value|redemption value]] $C$. The **bond amortization schedule** sets this out coupon by coupon, the way a loan's [[Amortization Schedule|amortization schedule]] does for its payments.

> $$I_t = j\,B_{t-1}$$

> $$PR_t = Fr - I_t = (Fr - Cj)\,v^{\,n-t+1}$$

> $$B_t = B_{t-1} - PR_t$$

- $Fr$ is the coupon, $j$ the yield rate per coupon period at which the bond was bought, $n$ the number of coupons and $v = 1/(1+j)$. $B_t$ is the book value just after the $t$-th coupon, starting at $B_0 = P$ and ending at $B_n = C$.
- $PR_t > 0$ when the bond was bought at a [[Premium|premium]]: the book value is written down each period ([[Amortization of Premium|amortization of premium]]). $PR_t < 0$ when it was bought at a [[Discount|discount]]: the book value is written up ([[Accumulation of Discount|accumulation of discount]]).
- The principal adjustments form a geometric progression with ratio $1 + j$ and add up to the premium or discount, $\sum_{t=1}^{n} PR_t = P - C$. The interest column adds up to the coupons less that amount, $\sum_{t=1}^{n} I_t = nFr - (P - C)$.
- One row can be found without the rest of the table: value $B_{t-1}$ at the original yield from the remaining coupons and redemption value, then take $I_t$ and $PR_t$ from it.

> [!example]- A Full Schedule for a Bond Redeemable Above Par {Example}
> A 3-year bond with face value $1{,}000$ pays 8% annual coupons and is redeemable at $1{,}050$. It is bought to yield 7%. Construct the bond amortization schedule.
>
> > [!answer]-
> > The coupon is $Fr = 80$ and $Cj = 1{,}050(0.07) = 73.50$, so the bond is bought at a premium:
> >
> > $$
> > \begin{align*}
> > P &= C + (Fr - Cj)\,a_{\overline{3}|7\%} \\
> > &= 1{,}050 + 6.50(2.624316) \\
> > &= 1{,}067.058
> > \end{align*}
> > $$
> >
> > | $t$ | Coupon | Interest $I_t$ | Principal adjustment $PR_t$ | Book value $B_t$ |
> > |---|---|---|---|---|
> > | 0 | | | | $1{,}067.058$ |
> > | 1 | $80.000$ | $74.694$ | $5.306$ | $1{,}061.752$ |
> > | 2 | $80.000$ | $74.323$ | $5.677$ | $1{,}056.075$ |
> > | 3 | $80.000$ | $73.925$ | $6.075$ | $1{,}050.000$ |
> > | Total | $240.000$ | $222.942$ | $17.058$ | |
> >
> > Each $I_t$ is $7\%$ of the book value above it (e.g. $0.07 \times 1{,}067.058 = 74.694$). The adjustments grow by the factor $1.07$ and add up to the premium $P - C = 17.058$, so the book value ends at the redemption value $1{,}050$, not at the $1{,}000$ face value.

> [!example]- One Row of a Long Schedule {Example}
> A bond with face amount $1{,}000$, redeemable at par, pays a coupon of 5% per period and has 20 coupons until maturity. It is bought to yield 6% per period. Find the interest earned and the principal adjustment in the 5th coupon, and the book value just after it.
>
> > [!answer]-
> > The book value just after the 4th coupon is the value of the 16 coupons and the redemption value still to come:
> >
> > $$
> > \begin{align*}
> > B_4 &= 50\,a_{\overline{16}|6\%} + 1{,}000\,v^{16} \\
> > &= 50(10.105895) + 1{,}000(0.393646) \\
> > &= 898.94 \\
> > I_5 &= 0.06(898.94) \\
> > &= 53.94 \\
> > PR_5 &= 50 - 53.94 \\
> > &= -3.94 \\
> > B_5 &= 898.94 + 3.94 \\
> > &= 902.88
> > \end{align*}
> > $$
> >
> > The bond was bought at a discount (price $885.30$), so the 5th coupon writes the book value up by $3.94$. As a check, $(Fr - Cj)\,v^{16} = (50 - 60)(0.393646) = -3.94$.
