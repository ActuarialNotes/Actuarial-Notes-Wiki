---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:6a2a50d8d552fa7e55ee0023ad00d51917317077d2844f73093a2fe856be782e
  sources:
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 4 Bonds (15-25%), learning outcome a)-b), PDF p.4, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 326, solutions PDF p.86, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Questions (rev. Aug 2026), Q 138, questions PDF p.58, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 138, solutions PDF p.38, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 421, solutions PDF p.110, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 7, solutions PDF p.5, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §44 Amortization of Premium or Discount, PDF p.396-397, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Amortization of Premium.md
---

**Amortization of premium** refers to the gradual reduction of a bond premium (excess of price over [[Face Value]]) over the bond's life. When a bond is purchased at a **premium** (price $P > C$, the [[Face Value]]/redemption value), the premium is written down each period.

- The premium amortized in period $t$ equals the excess coupon over the yield earned:

> $$\text{Premium amortized in period } t$$

> $$= (Fr - Cj) \cdot v^{n-t+1}$$

- Where $F$ = face, $r$ = coupon rate per period, $C$ = redemption value, $j$ = yield rate.
- The [[Book Value]] decreases each period toward $C$ at maturity.

![[Media/Figures/Amortization_of_Premium.svg|340]]

> [!example]- Premium Bond Amortization {Example}
> A $1{,}000$ face bond with 8% annual coupons is bought at 7% yield for 5 years (price = \$$1041.00$). Find the premium amortized in year 1.
>
> > [!answer]-
> > Coupon $= 80$. Interest earned $= 0.07 \times 1041.00 = 72.87$. Premium amortized $= 80 - 72.87 = 7.13$. Book value after year 1: $1041.00 - 7.13 = 1033.87$.
