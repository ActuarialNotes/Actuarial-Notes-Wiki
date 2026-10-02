---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:7a566a03c782e3b6028fc47e7911645dd53718a6853229ca2667a9af4a14f72c
  sources:
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 421, solutions PDF p.110, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Questions (rev. Aug 2026), Q 421, questions PDF pp.178-179, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf"
    - "SOA Exam FM Sample Questions (rev. Aug 2026), Q 139, questions PDF p.59, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 139, solutions PDF p.38, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA, Notation and terminology used for Exam FM, p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.384, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.396, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Premium.md
---

A **premium** bond is a [[Bonds|bond]] whose price $P$ is above its [[Redemption Value|redemption value]] $C$. The excess $P - C$ is the **premium**.

> $$P > C$$

> $$P - C = (Fr - Cj)\,a_{\overline{n}|j}$$

- $F$ is the [[Face Value|face value]], $r$ the coupon rate per period, $j$ the yield rate per period and $n$ the number of coupons left. The premium is positive exactly when $Fr > Cj$, that is, when the **modified coupon rate** $g = Fr/C$ is above the yield rate: $P - C = C(g - j)\,a_{\overline{n}|j}$.
- Unless an exam question says otherwise, the redemption value equals the face value (SOA's FM notation note). With $C = F$ the test reduces to the familiar one: the coupon rate is **above** the yield rate, and the price is above par. When $C \neq F$, compare the price with $C$ and the yield with $g$, not with $F$ and $r$.
- The premium $P - C$ is written off gradually through the [[Amortization of Premium|amortization of premium]] as the [[Book Value|book value]] falls to $C$ at redemption.
- The opposite case, a price below the redemption value, is a bond bought at a [[Discount]].

> [!example]- Identifying a Premium Bond {Example}
> A \$$1{,}000$ par bond, redeemable at par, with 7% annual coupons is priced to yield 5%. Is it a discount or premium bond?
>
> > [!answer]-
> > Here $C = F = 1{,}000$, so $g$ equals the 7% coupon rate, which exceeds the 5% yield. The price rises above the redemption value:
> > $$P > C = \$1{,}000$$
> > The bond sells at a premium; the \$$(P - 1{,}000)$ premium is amortized against the above-market coupons over the bond's life.

> [!example]- A Premium Bond Priced Below Its Face Value {Example}
> A 10-year bond with face value $1{,}000$ and 5% annual coupons will be redeemed for $950$. It is bought to yield 5.2% annually. Find the price, and decide whether the bond is bought at a premium or a discount.
>
> > [!answer]-
> > The coupon is $Fr = 50$ and $Cj = 950(0.052) = 49.40$. The modified coupon rate is
> > $$g = \frac{Fr}{C} = \frac{50}{950} = 5.263\% > 5.2\%$$
> > so the bond is bought at a premium:
> >
> > $$
> > \begin{align*}
> > P - C &= (Fr - Cj)\,a_{\overline{10}|5.2\%} \\
> > &= (50 - 49.40)(7.6473) \\
> > &= 4.59 \\
> > P &= 950 + 4.59 \\
> > &= 954.59
> > \end{align*}
> > $$
> >
> > The price is below the $1{,}000$ face value and the 5% coupon rate is below the 5.2% yield, yet the bond is bought at a premium of \$$4.59$: it is redeemed for only $950$, so its book value is written down from $954.59$ to $950$.
