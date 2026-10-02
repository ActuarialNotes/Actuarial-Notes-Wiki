---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:e1c369cffb58d72f94048f6d8c465f9f44e5a0e27aa36f779e32dab192f7d113
  sources:
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.380, p.384-385, p.420, p.470, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA, Notation and terminology used for Exam FM, p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, p.4, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Term of Bond.md
---

The **term of a bond** is the time from the bond's issue date (or purchase date) to its **maturity date**, at which the [[Redemption Value]] is paid. The term determines:
- The number of [[Coupon]] payments: $n = \text{term} \times m$ where $m$ = payments per year
- The time factor in the present value formula: $v^n = (1+j)^{-n}$
- The exposure to **price risk**, measured by [[Duration]]: for a zero-coupon bond the [[Macaulay Duration|Macaulay duration]] equals the term, but for a coupon bond it also depends on the coupon rate and the yield, so the term alone does not determine it

- For a [[Callable Bond]], the effective term depends on when the issuer exercises the call option, creating uncertainty in the bond's cash flows.

![[Media/Figures/Term_of_Bond.svg|340]]

> [!example]- Effect of Term on Price {Example}
> A $1{,}000$ face bond pays 6% annual coupons and yields 8%. Find the price for a 5-year term and a 10-year term.
>
> > [!answer]-
> > 5-year: $P = 60 \cdot a_{\overline{5}|8\%} + 1000(1.08)^{-5} = 60(3.9927) + 680.58 = 239.56 + 680.58 = 920.15$
> > 10-year: $P = 60 \cdot a_{\overline{10}|8\%} + 1000(1.08)^{-10} = 60(6.7101) + 463.19 = 402.61 + 463.19 = 865.80$
> > Longer term → lower price when yield > coupon rate.
