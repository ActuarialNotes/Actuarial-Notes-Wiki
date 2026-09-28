---
verification:
  status: verified
  confidence: low
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:da57f63b10e8826b3676eb52f660fe3c3a0afd2bff0199ba519602ebbe659c79
  sources:
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 4 Bonds (15-25%), learning outcome a), c), PDF p.4, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 136, solutions PDF p.37, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Questions (rev. Aug 2026), Q 40, questions PDF p.19, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 40, solutions PDF p.12, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 42, solutions PDF p.13, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Questions (rev. Aug 2026), Q 43, questions PDF p.20, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 43, solutions PDF p.13, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 292, solutions PDF p.77, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §47 Callable Bonds and Serial Bonds, PDF p.420-421, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "U.S. SEC Investor.gov glossary, Callable or Redeemable Bonds (web page read 2026-09-28), sha256:db86cee96b21a36c190fcf34f474a1cbc56064484f608c5262ab6b487ad6fe5b — https://www.investor.gov/introduction-investing/investing-basics/glossary/callable-or-redeemable-bonds"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Callable Bond.md
---

A **callable bond** gives the **issuer** the right (but not the obligation) to redeem the bond before maturity at a specified [[Call Price]] on or after a specified call date. Issuers call bonds when interest rates fall, allowing them to refinance at a lower rate.

- For a callable bond, the investor faces reinvestment risk: if called early, the investor must reinvest at lower prevailing rates. The price of a callable bond is set so the investor achieves at least a **minimum yield** across all possible call scenarios:
- If bond is at **premium** (price $>$ redemption value): assume the earliest call date (worst case for investor)
- If bond is at **discount** (price $<$ redemption value): assume the latest call date (worst case for investor)

![[Media/Figures/Callable_Bond.svg|340]]

> [!example]- Callable Bond Price {Example}
> A $1{,}000$ bond with 8% annual coupons matures in 10 years but is callable at par after 5 years. Find the price to guarantee a minimum yield of 6%.
>
> > [!answer]-
> > Since price will exceed par (coupon > yield), assume call at year 5 (earliest call, worst case):
> > $P = 80 \cdot a_{\overline{5}|6\%} + 1000(1.06)^{-5} = 80(4.2124) + 747.26 = 336.99 + 747.26 = 1084.25$
