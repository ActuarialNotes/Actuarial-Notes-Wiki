---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:3a3e2bc91467adbec6735951d2428204c2366c09c0bb4cb39ce49b94a41e7795
  sources:
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 4 Bonds (15-25%), learning outcome a), PDF p.4, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §43 The Various Pricing Formulas of a Bond, PDF p.384-385, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §47 Callable Bonds and Serial Bonds, PDF p.420, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "U.S. SEC Investor.gov glossary, Callable or Redeemable Bonds (web page read 2026-09-28), sha256:db86cee96b21a36c190fcf34f474a1cbc56064484f608c5262ab6b487ad6fe5b — https://www.investor.gov/introduction-investing/investing-basics/glossary/callable-or-redeemable-bonds"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Non-Callable Bond.md
---

A **non-callable bond** (also called a **bullet bond**) cannot be redeemed by the issuer before its stated maturity date. The bondholder receives all scheduled [[Coupon]] payments and the [[Redemption Value]] at maturity with certainty, eliminating **call risk** and **reinvestment risk** from early redemption.

- The price of a non-callable bond is straightforward:

> $$P = Fr \cdot a_{\overline{n}|j} + C \cdot v^n$$

- With no uncertainty about the term $n$, non-callable bonds are simpler to analyze than [[Callable Bond]]s and are the baseline case for bond pricing on Exam FM.

![[Media/Figures/Non-Callable_Bond.svg|340]]

> [!example]- Non-Callable vs. Callable Pricing {Example}
> A non-callable $1{,}000$ face bond pays 7% annual coupons and matures in 8 years. Price at 5% yield.
>
> > [!answer]-
> > $P = 70 \cdot a_{\overline{8}|5\%} + 1000(1.05)^{-8} = 70(6.4632) + 676.84 = 452.42 + 676.84 = 1129.26$
> > This bond is priced at a **premium** since coupon rate (7%) > yield (5%).
