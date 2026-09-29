---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:901d9ae92522bd160e580314f69bfe9c7ed7db9cd6dea672d30a8f4e935ca325
  sources:
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.380, p.384-385, p.396, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA, Notation and terminology used for Exam FM, p.1-2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "SOA Exam FM Sample Questions (rev. Aug 2026), Q 40, questions PDF pp.19-20, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 421, solutions PDF p.110, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA study note FM-23-05, Broverman, Review of Calculator Functions for the Texas Instruments BA II Plus, p.21, sha256:1b71586cc1b08d7bc36c04ecb3d4e6b367fce30f394e63efafc879e6b6e466fa — https://www.soa.org/globalassets/assets/files/edu/FM-23-05.pdf"
  open_findings: 0
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
> > $P = 60 \cdot a_{\overline{5}|7\%} + 1000v^5 = 60(4.1002) + 1000(0.712986) = 246.01 + 712.99 = 959.00$. The bond is redeemed at par ($C = F = 1{,}000$), so it sells at a **discount** (price below the redemption value) because its 6% coupon rate is below the 7% yield rate.
