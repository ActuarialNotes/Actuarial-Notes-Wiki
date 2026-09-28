---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:9d23b8a717b906ea9c257c2c8b483317927f2a2bb21e1f49a78cda77938ee773
  sources:
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 4 Bonds (15-25%), learning outcome a)-b), PDF p.4, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 326, solutions PDF p.86, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Questions (rev. Aug 2026), Q 140, questions PDF p.59, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 140, solutions PDF p.38, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §44 Amortization of Premium or Discount, PDF p.396-397, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Broverman, Review of Calculator Functions for the Texas Instruments BA II Plus (SOA study note FM-23-05), PDF p.21, sha256:1b71586cc1b08d7bc36c04ecb3d4e6b367fce30f394e63efafc879e6b6e466fa — https://www.soa.org/globalassets/assets/files/edu/FM-23-05.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Accumulation of Discount.md
---

**Accumulation of discount** refers to the gradual increase in [[Book Value]] of a discount bond toward its [[Face Value]] (or [[Redemption Value]]) over the bond's life. When a bond is purchased at a **discount** (price $P < C$), the discount is written up each period.

- The discount accumulated in period $t$ equals the shortfall of the coupon below the yield earned:

> $$\text{Discount accumulated in period } t$$

> $$= (Cj - Fr) \cdot v^{n-t+1}$$

- Where $j$ = yield rate per period.
- The [[Book Value]] increases each period toward $C$ at maturity — this is the mirror image of [[Amortization of Premium]].

![[Media/Figures/Accumulation_of_Discount.svg|340]]

> [!example]- Discount Bond Accumulation {Example}
> A $1{,}000$ face bond with 5% annual coupons is bought at 6% yield for 3 years (price $= \$973.27$). Find the discount accumulated in year 1.
>
> > [!answer]-
> > Coupon $= 50$. Interest earned $= 0.06 \times 973.27 = 58.40$. Discount accumulated $= 58.40 - 50 = 8.40$. Book value after year 1: $973.27 + 8.40 = 981.67$.
