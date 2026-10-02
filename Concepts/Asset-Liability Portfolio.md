---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:79aa6124bd9f26fbc057fde0fb217257071c63041f31f2fe075f5b13f1b1871d
  sources:
    - "SOA Financial Mathematics Exam syllabus, December 2026, p.5, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "SOA Exam FM Sample Questions (rev. Aug 2026), Q 268, questions PDF p.113, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 268, solutions PDF pp.69-70, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 333, solutions PDF p.88, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 382, solutions PDF p.101, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, pp.479-480, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, pp.486-489, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Asset-Liability Portfolio.md
---

An **asset-liability portfolio** is the combined position of an institution's assets and the liabilities they are held to fund, valued together. Its **surplus** — the present value of the asset cash flows $A_t$ less that of the liability cash flows $L_t$ — is what asset-liability management protects against changes in the interest rate $i$.

> $$S(i) = \sum_{t} v^t \left(A_t - L_t\right) = PV_A(i) - PV_L(i)$$

- **[[Cash Flow Matching]]** (dedication): choose assets whose cash flow on each date exactly equals the liability cash flow due that date, which protects the surplus against any movement in interest rates
- **[[Redington Immunization]]**: equal present values, equal [[Modified Duration|modified durations]] ([[Duration Matching]]), and asset [[Convexity]] *greater than* liability convexity — all three are required; it protects against small changes in $i$
- **[[Full Immunization]]** (single liability): equal present values, equal durations, and one asset cash flow before and one after the liability — the surplus is positive for any immediate change in $i$
- Banks, insurers and pension funds manage their assets and liabilities together because their net worth — the surplus — fluctuates with the interest rate ([[Immunization]] is the general name for the duration-based strategies)

![[Media/Figures/Asset-Liability_Portfolio.svg|340]]

> [!example]- Simple ALM {Example}
> An insurer has a liability of $50{,}000$ due in exactly 4 years at $i=5\%$. Describe a cash-flow-matched portfolio.
>
> > [!answer]-
> > Purchase a 4-year zero-coupon bond with face value $50{,}000$ at a cost of
> > $$50{,}000(1.05)^{-4} = 41{,}135.12$$
> > The bond's single cash flow exactly matches the liability, so the surplus is zero at every interest rate: the position carries no interest rate risk.
