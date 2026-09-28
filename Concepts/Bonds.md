---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:10d654a7a43c4c1fcba91334bf58ba433c4ff198de90f8d05b7c768ac5790aa1
  sources:
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 4 Bonds (15-25%), learning outcome a), PDF p.4, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §42 Types of Bonds, PDF p.380, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §43 The Various Pricing Formulas of a Bond, PDF p.384-385, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Broverman, Review of Calculator Functions for the Texas Instruments BA II Plus (SOA study note FM-23-05), PDF p.21, sha256:1b71586cc1b08d7bc36c04ecb3d4e6b367fce30f394e63efafc879e6b6e466fa — https://www.soa.org/globalassets/assets/files/edu/FM-23-05.pdf"
    - "SOA Exam FM Sample Questions (rev. Aug 2026), Q 40, questions PDF p.19, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Bonds.md
---

A **bond** is a fixed-income debt instrument in which an issuer (borrower) promises to pay the bondholder (lender) periodic [[Coupon]] payments and to return the [[Face Value]] (par value) at maturity. Key bond terms:

- **[[Face Value]]** — Principal amount repaid at maturity (par value)
- **[[Coupon Rate]]** — Annual interest rate applied to face value to set coupon payments
- **[[Coupon]]** — Periodic interest payment = Face Value × Coupon Rate / payments per year
- **[[Yield Rate]]** — Rate of return actually earned by the bondholder (may differ from coupon rate)
- **[[Bond Price|Price]]** — Present value of all future cash flows at the yield rate
- **[[Term of Bond]]** — Time from issue to maturity
- **[[Book Value]]** — Amortized value of the bond at any point during its term

- The **basic bond price formula**: $P = Fr \cdot a_{\overline{n}|j} + C \cdot v^n$ where $F$ = face value, $r$ = coupon rate per period, $C$ = redemption value, $n$ = number of coupons, $j$ = yield rate per period.

![[Media/Figures/Bonds.svg|340]]

> [!example]- Bond Pricing {Example}
> A $1{,}000$ face value 5-year bond with 6% annual coupons is priced at a yield of 7%.
>
> > [!answer]-
> > $P = 60 \cdot a_{\overline{5}|7\%} + 1000v^5 = 60(4.1002) + 1000(0.7130) = 246.01 + 713.00 = 959.00$. The bond sells at a **discount** (price < face) because coupon rate < yield rate.
