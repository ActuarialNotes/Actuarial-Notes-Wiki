---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:867dc04a457b03f71c0b6b60c61da67fd54227faf439673e3d653cb15fcd119e
  sources:
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 4 Bonds (15-25%), learning outcome a), PDF p.4, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "SOA Exam FM Sample Questions (rev. Aug 2026), Q 43, questions PDF p.20, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 43, solutions PDF p.13, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "Achievable, FINRA SIE course — Debt securities, Bond fundamentals: Features (web page read 2026-09-28), 'call premium' paragraph, sha256:5f832c9229d83f6f5f9dedfd417b2d522c4030f7c4938ea299365a18fca947fa — https://app.achievable.me/study/finra-sie/learn/bond-fundamentals-features"
    - "U.S. SEC Investor.gov glossary, Callable or Redeemable Bonds (web page read 2026-09-28), sha256:db86cee96b21a36c190fcf34f474a1cbc56064484f608c5262ab6b487ad6fe5b — https://www.investor.gov/introduction-investing/investing-basics/glossary/callable-or-redeemable-bonds"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §47 Callable Bonds and Serial Bonds, PDF p.421, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Call Premium.md
---

The **call premium** is the amount by which the [[Call Price]] of a [[Callable Bond]] exceeds its [[Face Value]]:

> $$\text{Call Premium} = \text{Call Price} - \text{Face Value}$$

- It compensates the bondholder for giving up future coupon income if the bond is called early.
- The call premium typically declines as the call date approaches maturity, eventually reaching zero at maturity (where call price = face value).
- From the issuer's perspective, the call premium is a cost of the call option. Higher call premiums make bonds more attractive to investors but increase the issuer's redemption cost.

![[Media/Figures/Call_Premium.svg|340]]

> [!example]- Identifying the Call Premium {Example}
> A bond with $1{,}000$ face value is callable at $1{,}030$ after 2 years and at $1{,}015$ after 4 years.
>
> > [!answer]-
> > Call premium at year 2: $1030 - 1000 = 30$.
> > Call premium at year 4: $1015 - 1000 = 15$.
> > The declining call premium schedule gives the issuer an increasing financial incentive to delay calling, while protecting the investor if called early.
