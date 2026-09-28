---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:4e8fb100dd8a3dfbea4b93f7390998074fef8c5ed72d4d5983227d3701f37d38
  sources:
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 4 Bonds (15-25%), learning outcome a)-b), PDF p.4, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §43 The Various Pricing Formulas of a Bond, PDF p.384-385, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA Exam FM Sample Questions (rev. Aug 2026), Q 40, questions PDF p.19, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Coupon Rate.md
---

The **coupon rate** $r$ is the rate applied to the face value $F$ of a bond to determine each periodic interest payment.

> $$r = \frac{\text{Coupon}}{F}$$

- For a bond paying semi-annually with a $6\%$ annual coupon rate, the per-period coupon rate is $r = 3\%$.
- The coupon rate is fixed at issuance and does not change over the life of the bond.
- It is distinct from the [[Yield Rate]] $j$, which reflects the bond's actual return given its market price.
- When the coupon rate equals the yield rate ($r = j$ for $F = C$), the bond prices at par.
- The coupon rate determines the size of the coupon cash flows; the yield rate determines how those cash flows are discounted.

![[Media/Figures/Coupon_Rate.svg|340]]

> [!example]- Identifying the Coupon Rate {Example}
> A bond with face value \$$1{,}000$ pays annual coupons of \$$45$. What is the annual coupon rate, and is the bond trading at a premium or discount if the yield rate is $5\%$?
>
> > [!answer]-
> > $$r = \frac{45}{1000} = 4.5\%$$
> > Since the coupon rate ($4.5\%$) is less than the yield rate ($5\%$), we have $Fr < Cj$, so the bond sells at a **discount** (price below face value).
