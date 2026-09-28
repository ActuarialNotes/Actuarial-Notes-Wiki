---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:f2f080c225faaa2622e527ab4c8f99f7681be3686f4b35f7327d135833b2a23f
  sources:
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 42, solutions PDF p.13, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 4 Bonds, learning outcome a), PDF p.4, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §44, PDF p.396-397, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
  open_findings: 2
  open_critical: 0
  log: .verify/Concepts/Discount.md
---

A **discount** bond is a [[Bonds|bond]] whose price $P$ is below its [[Face Value|face value]] (redemption value) $F$.

> $$P < F$$

- Occurs when the coupon rate is **below** the yield rate, so the price must fall below par to make up the yield shortfall.
- The gap $F - P$ is earned gradually through the [[Accumulation of Discount|accumulation of discount]] as the book value rises to $F$ by maturity.
- The opposite case, a price above par, is a bond bought at a [[Premium]].

> [!example]- Identifying a Discount Bond {Example}
> A \$$1{,}000$ par bond with 4% annual coupons is priced to yield 6%. Is it a discount or premium bond?
>
> > [!answer]-
> > The 4% coupon rate is below the 6% yield, so the price falls below par to compensate the buyer:
> > $$P < F = \$1{,}000$$
> > The bond sells at a discount; the buyer's return combines the coupons with the accretion of the \$$(1{,}000 - P)$ discount up to par at maturity.
