---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:ec1a0f1a71127300604bec8775331ced7b22c58de44ed99a9843708bd9593ff5
  sources:
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.384-385, p.396, p.421, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA, Notation and terminology used for Exam FM, p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 421, solutions PDF p.110, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Questions (rev. Aug 2026), Q 139, questions PDF p.59, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Redemption Value.md
---

The **redemption value** $C$ is the amount paid to the bondholder at maturity (when the bond is "redeemed"). For most bonds, the redemption value equals the [[Face Value]] ($C = F$, called redemption **at par**). However, redemption can occur at a premium ($C > F$) or discount ($C < F$). That describes $C$ against $F$; whether the bond is *bought* at a [[Premium|premium]] or [[Discount|discount]] compares the price $P$ with $C$.

- The basic bond price formula uses $C$ as the terminal payment:

> $$P = Fr \cdot a_{\overline{n}|j} + C \cdot v^n$$

- For [[Callable Bond]]s, the redemption value may vary by call date, and the buyer must calculate the worst-case yield (minimum yield) to determine the appropriate price.

![[Media/Figures/Redemption_Value.svg|340]]

> [!example]- Bond Redeemable at a Premium {Example}
> A $1{,}000$ face bond with 6% annual coupons matures in 5 years with redemption at $1{,}050$. Price at yield $7\%$.
>
> > [!answer]-
> > $P = 1000(0.06) \cdot a_{\overline{5}|7\%} + 1050(1.07)^{-5} = 60(4.1002) + 1050(0.712986)$
> > $= 246.01 + 748.64 = 994.65$
> >
> > The bond is redeemable at a premium ($C = 1{,}050 > F$) but is bought at a discount ($P = 994.65 < C$): its modified coupon rate $g = 60/1{,}050 = 5.71\%$ is below the 7% yield.
