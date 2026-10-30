---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:6e1646e8b497f90dbd858b60511bb220598d757333dd994234fce7716a35144c
  sources:
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §55 Redington Immunization and Convexity, PDF p.479, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §55 Redington Immunization and Convexity, PDF p.480, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §56 Full Immunization and Dedication, PDF p.486, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA Exam FM Sample Questions (rev. Aug 2026), Q 268, questions PDF p.113, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 268, solutions PDF p.69, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 295, solutions PDF p.77, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 181, solutions PDF p.47, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 333, solutions PDF p.88, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 432, solutions PDF p.112, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 106, solutions PDF p.30, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 5 General Cash Flows, Portfolios, and Asset Liability Management (20-30%), learning outcomes a)-c), PDF p.5, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "SOA study note FM-24-17, Alps, Using Duration and Convexity to Approximate Change in Present Value (2017), §1 Introduction, 'predicated on a flat yield curve', PDF p.3, sha256:530436d4707ecadba3a7bef6e1a9661b8d9e9bb173486edfb6924bc4a4992040 — https://www.soa.org/globalassets/assets/Files/Edu/2017/fm-duration-convexity-present-value.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 103, solutions PDF p.29 ('The yield curve structure is not relevant'), sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Immunization.md
---

**Immunization** is a [[Portfolio]] management strategy that protects the value of a surplus (assets minus liabilities) against adverse interest rate movements. The two main types are:

- **[[Redington Immunization]]**: protects against small parallel yield shifts; requires three conditions
- **[[Full Immunization]]**: protects against any single interest rate shift (up or down)

**Redington Immunization conditions** (at current yield $i$):
1. $PV(assets) = PV(liabilities)$
2. $D_{Mac}(assets) = D_{Mac}(liabilities)$ ([[Duration Matching]])
3. $C_{assets} > C_{liabilities}$ ([[Convexity]] of assets exceeds liabilities)

![[Media/Figures/Immunization.svg|340]]

### What immunization assumes about the yield curve

- Redington and full immunization are developed under a flat yield curve: one rate discounts the cash flows at every term, and a change in interest rates moves that single rate (a parallel shift of the curve).
- Neither gives any guarantee when the yield curve shifts in a non-parallel way, for example when short-term rates move more than long-term rates.
- The need to immunize comes from the chance that interest rates change, which exists whatever the current shape of the yield curve: an upward-sloping, flat or inverted curve does not reduce it.

> [!example]- Verifying Redington Immunization {Example}
> Assets: $PV = 10000$, $D_{Mac} = 5$, convexity $= 30$. Liabilities: $PV = 10000$, $D_{Mac} = 5$, convexity $= 25$. Is Redington immunization achieved?
>
> > [!answer]-
> > Condition 1: $PV_A = PV_L = 10000$
> > Condition 2: $D_{Mac,A} = D_{Mac,L} = 5$
> > Condition 3: $C_A = 30 > C_L = 25$
> > All three conditions are met — Redington immunization is achieved.
