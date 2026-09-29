---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:71350d2cb5117618c291b3750105fb0f2fc9176c6c19a76ad473c7c05a78a6a1
  sources:
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 4 Bonds (15-25%), learning outcome a), c), PDF p.4, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 40, solutions PDF p.12, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 136, solutions PDF p.37, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Questions (rev. Aug 2026), Q 139, questions PDF p.59, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §47 Callable Bonds and Serial Bonds, PDF p.420, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "U.S. SEC Investor.gov glossary, Callable or Redeemable Bonds (web page read 2026-09-28), sha256:db86cee96b21a36c190fcf34f474a1cbc56064484f608c5262ab6b487ad6fe5b — https://www.investor.gov/introduction-investing/investing-basics/glossary/callable-or-redeemable-bonds"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Call Price.md
---

The **call price** is the price at which an issuer may redeem a [[Callable Bond]] before maturity on a specified call date. The call price is typically set at or above [[Face Value]] to compensate the bondholder for the loss of future coupon income.

- The difference between the call price and the face value is the **[[Call Premium]]**:

> $$\text{Call Premium} = \text{Call Price} - \text{Face Value}$$

- In bond pricing problems, the call price replaces the [[Redemption Value]] $C$ in the bond formula when the issuer is assumed to call the bond:

> $$P_{\text{call}} = Fr \cdot a_{\overline{n_c}|j} + C_{\text{call}} \cdot v^{n_c}$$

- Where $n_c$ is the number of periods until the call date.

![[Media/Figures/Call_Price.svg|340]]

> [!example]- Bond Priced to a Call {Example}
> A $1{,}000$ face bond with 8% annual coupons can be called in 3 years at $1{,}050$. Find the price to yield 6%.
>
> > [!answer]-
> > $P = 80 \cdot a_{\overline{3}|6\%} + 1050(1.06)^{-3} = 80(2.6730) + 1050(0.839619) = 213.84 + 881.60 = 1095.44$
