---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:4aa340214ace97f6fa10d2a9ec11d722627787e1b5e89c0fa8717b460ab0263c
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

A **discount** bond is a [[Bonds|bond]] whose price $P$ is below its [[Redemption Value|redemption value]] $C$. The shortfall $C - P$ is the **discount**.

> $$P < C$$

> $$C - P = (Cj - Fr)\,a_{\overline{n}|j}$$

- $F$ is the [[Face Value|face value]], $r$ the coupon rate per period, $j$ the yield rate per period and $n$ the number of coupons left. The discount is positive exactly when $Fr < Cj$, that is, when the **modified coupon rate** $g = Fr/C$ is below the yield rate: $C - P = C(j - g)\,a_{\overline{n}|j}$.
- Unless an exam question says otherwise, the redemption value equals the face value (SOA's FM notation note). With $C = F$ the test reduces to the familiar one: the coupon rate is **below** the yield rate, and the price is below par. When $C \neq F$, compare the price with $C$ and the yield with $g$, not with $F$ and $r$.
- The discount $C - P$ is earned gradually through the [[Accumulation of Discount|accumulation of discount]] as the [[Book Value|book value]] rises to $C$ at redemption.
- The opposite case, a price above the redemption value, is a bond bought at a [[Premium]].

> [!example]- Identifying a Discount Bond {Example}
> A \$$1{,}000$ par bond, redeemable at par, with 4% annual coupons is priced to yield 6%. Is it a discount or premium bond?
>
> > [!answer]-
> > Here $C = F = 1{,}000$, so $g$ equals the 4% coupon rate, which is below the 6% yield. The price falls below the redemption value to compensate the buyer:
> > $$P < C = \$1{,}000$$
> > The bond sells at a discount; the buyer's return combines the coupons with the accretion of the \$$(1{,}000 - P)$ discount up to the redemption value at maturity.

> [!example]- A Discount Bond Priced Above Its Face Value {Example}
> A 10-year bond with face value $1{,}000$ and 5% annual coupons will be redeemed for $1{,}100$. It is bought to yield 5.2% annually. Find the price, and decide whether the bond is bought at a premium or a discount.
>
> > [!answer]-
> > The coupon is $Fr = 50$ and $Cj = 1{,}100(0.052) = 57.20$. The modified coupon rate is
> > $$g = \frac{Fr}{C} = \frac{50}{1{,}100} = 4.545\% < 5.2\%$$
> > so the bond is bought at a discount:
> >
> > $$
> > \begin{align*}
> > C - P &= (Cj - Fr)\,a_{\overline{10}|5.2\%} \\
> > &= (57.20 - 50)(7.6473) \\
> > &= 55.06 \\
> > P &= 1{,}100 - 55.06 \\
> > &= 1{,}044.94
> > \end{align*}
> > $$
> >
> > The price is above the $1{,}000$ face value, yet the bond is bought at a discount of \$$55.06$: it is redeemed for $1{,}100$, so its book value is written up from $1{,}044.94$ to $1{,}100$.
