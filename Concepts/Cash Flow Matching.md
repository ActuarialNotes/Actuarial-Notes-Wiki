---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:de0a2d1581f40276fe5a90d896f2a38c4fb5b125e3415b17ff07d16131a68184
  sources:
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §56 Full Immunization and Dedication, PDF p.489, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §55 Redington Immunization and Convexity, PDF p.480, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 147, solutions PDF p.40, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 432, solutions PDF p.112, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 333, solutions PDF p.88, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 37, solutions PDF p.12, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 192, solutions PDF p.49, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 346, solutions PDF p.92, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 157, solutions PDF p.41, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Questions (rev. Aug 2026), Q 39, questions PDF p.19, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 5 General Cash Flows, Portfolios, and Asset Liability Management (20-30%), learning outcomes a)-c), PDF p.5, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Cash Flow Matching.md
---

**Cash flow matching** (also called **dedication**) is a portfolio strategy in which asset cash flows are structured to exactly equal liability cash flows at every future date, eliminating both [[Price Risk]] and [[Reinvestment Risk]] entirely.

- Unlike [[Redington Immunization]], which only protects against small parallel rate shifts and needs periodic rebalancing, a matched portfolio requires **no rebalancing** once constructed — each liability is funded directly by a matching asset cash flow.
- It is more conservative, and typically more expensive, than immunization: it removes reinvestment risk at the cost of reduced flexibility.
- Construction proceeds **backwards** from the last liability date — fund the final liability first, then the second-to-last, and so on.
- Any asset cash flow exceeding the liability at a given date carries forward as an offset to the next liability.

> [!example]- Cash Flow Matching a Two-Period Liability {Example}
> A company has liabilities of \$$5{,}000$ due at time 1 and \$$10{,}000$ due at time 2. Zero-coupon bonds are available at all maturities. Show how to construct a cash flow matched portfolio.
>
> > [!answer]-
> > **Step 1 — Fund the time-2 liability:** Buy a 2-year zero-coupon bond with face value \$$10{,}000$. At time 2 it pays exactly \$$10{,}000$. ✓
> >
> > **Step 2 — Fund the time-1 liability:** Buy a 1-year zero-coupon bond with face value \$$5{,}000$. At time 1 it pays exactly \$$5{,}000$. ✓
> >
> > The portfolio cost is $\dfrac{10{,}000}{(1+s_2)^2} + \dfrac{5{,}000}{1+s_1}$, where $s_1, s_2$ are the current spot rates. Once purchased, no rebalancing is needed and the liabilities are fully funded regardless of future interest rate movements.
