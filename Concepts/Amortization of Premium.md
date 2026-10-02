---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:1d68660240573b64fc6bc00397bb5aacedb7ed244ffd530c82a96b623cc0e4d1
  sources:
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 421, solutions PDF p.110, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 326, solutions PDF pp.86-87, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Questions (rev. Aug 2026), Q 138, questions PDF pp.58-59, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 138, solutions PDF p.38, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA, Notation and terminology used for Exam FM, p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.396-397, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Amortization of Premium.md
---

**Amortization of premium** is the gradual write-down of a [[Premium|premium]] bond's [[Book Value|book value]] from its price $P$ to its [[Redemption Value|redemption value]] $C$ over the bond's life. A bond is bought at a premium when $P > C$, and the premium $P - C$ is written down a piece at a time out of each coupon. ($C$ equals the [[Face Value|face value]] $F$ unless a question says otherwise, but the premium is always measured against $C$.)

- The premium amortized in period $t$ equals the excess coupon over the yield earned:

> $$\text{Premium amortized in period } t$$

> $$= (Fr - Cj) \cdot v^{n-t+1}$$

- Where $F$ = face, $r$ = coupon rate per period, $C$ = redemption value, $j$ = yield rate.
- The [[Book Value]] decreases each period toward $C$ at maturity.

![[Media/Figures/Amortization_of_Premium.svg|340]]

> [!example]- Premium Bond Amortization {Example}
> A $1{,}000$ face bond, redeemable at par, with 8% annual coupons is bought at 7% yield for 5 years (price = \$$1041.00$). Find the premium amortized in year 1.
>
> > [!answer]-
> > Coupon $= 80$. Interest earned $= 0.07 \times 1041.00 = 72.87$. Premium amortized $= 80 - 72.87 = 7.13$. Book value after year 1: $1041.00 - 7.13 = 1033.87$.
