---
verification:
  status: stale
  confidence: null
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:97efd96ae6ba8dff972384cb40c420d09e2988b42edb543170305ecb896e7aa1
  sources:
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 42, solutions PDF p.13, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 421, solutions PDF p.110, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA, Notation and terminology used for Exam FM, p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.384, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.396, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.397, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Discount.md
---

A **Discount** is the amount $C - P$ by which a [[Bonds|bond]]'s price $P$ falls below its [[Redemption Value|redemption value]] $C$. A bond with $P < C$ is bought at a discount.

For a bond with [[Face Value|face value]] $F$, coupon rate $r$ per period, yield rate $j$ per period and $n$ coupons left, the discount is

> $$C - P = (Cj - Fr)\,a_{\overline{n}|j}$$

- $Fr$ is the coupon.
- $a_{\overline{n}|j}$ is the present value of an annuity-immediate of 1 per period for $n$ periods at rate $j$.

The discount is positive exactly when $Fr < Cj$, that is, when the **modified coupon rate** $g = Fr/C$ is below the yield rate. In terms of $g$, the discount is

> $$C - P = C(j - g)\,a_{\overline{n}|j}$$

Unless an exam question says otherwise, the redemption value equals the face value (SOA's FM notation note). With $C = F$, $g$ is the coupon rate, so a bond whose coupon rate is below its yield rate sells below par. The discount is earned gradually through the [[Accumulation of Discount|accumulation of discount]] as the [[Book Value|book value]] rises to $C$ at redemption. The opposite case, a price above the redemption value, is a bond bought at a [[Premium|premium]].

> [!example]- A $\$1{,}000$ par bond redeemable at par pays 4% annual coupons and is priced to yield 6%. Is it bought at a discount or premium? {Example}
> - Here $C = F = 1{,}000$, so $g$ equals the 4% coupon rate.
> - The 4% modified coupon rate is below the 6% yield, so $Cj = 60$ exceeds $Fr = 40$.
> - The price is below the $\$1{,}000$ redemption value, so the bond is bought at a discount.

> [!example]- What is this bond's price, and is it bought at a premium or a discount? {Example}
> A 10-year bond with face value $1{,}000$ and 5% annual coupons will be redeemed for $1{,}100$. It is bought to yield 5.2% annually.
>
> > [!answer]-
> > - The coupon is $Fr = 50$ and $Cj = 1{,}100 \times 0.052 = 57.20$.
> > - The modified coupon rate is $g = 50/1{,}100 = 4.545\%$, below the 5.2% yield, so the bond is bought at a discount.
> > - At 5.2%, $a_{\overline{10}|} = 7.6473$.
> > - The discount is $C - P = (57.20 - 50) \times 7.6473 = 55.06$.
> > - The price is $P = 1{,}100 - 55.06 = 1{,}044.94$.
> > - The price is above the $1{,}000$ face value, yet the bond is bought at a discount of $55.06$, because it is redeemed for $1{,}100$.

> [!trap] Comparing the price with the face value
> When $C \neq F$, a discount is judged against the redemption value. Compare the price with $C$ and the yield with $g$, not with $F$ and $r$. The bond above costs $1{,}044.94$, more than its face value, and is still bought at a discount.
