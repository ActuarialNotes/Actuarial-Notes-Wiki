---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:0811d88137b870d0e9719a6296a21eb0afebc62edac41d8f59a8e918973d3e19
  sources:
    - "CAS Exam 9 Content Outline, Fall 2026, p.5 task C5 wording; pp.7-8 text references (only Coval, Jurek & Stafford C5-C6 and Panning C3, C5 map to C5), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
    - "Panning, Managing Interest Rate Risk: ALM, Franchise Value, and Strategy (Willis Re, July 2006), pp.1-12 full-text searched (prepay, mortgage, refinanc, callable: none); Executive Summary p.2 (economic value exposed to interest rates; franchise value) duration of franchise value pp.8-9, asset and liability durations and total economic value pp.4, 10, sha256:9f569b0edf7a677b08716b2c06103c0c7826007d00c5a17c5f4d32f129e32278 — https://www.casact.org/sites/default/files/2021-03/9_Panning.pdf"
    - "Coval, Jurek & Stafford, The Economics of Structured Finance (HBS WP 09-060, 2008), full-text searched (prepay, pre-pay, refinanc: none); mortgages appear as collateral whose default and default correlation drive tranche losses (pp.5, 8-18), sha256:887b5c53aeb5367b127322c6972a1c41176e96dc613bc52eee296002b971c551 — https://www.hbs.edu/ris/Publication%20Files/09-060.pdf"
    - "Vanguard Mortgage-Backed Securities Index Fund Summary Prospectus, Dec 17 2021 (SEC EDGAR 497K), Principal Risks: prepayment risk and extension risk definitions, sha256:f382051f9bf3f9f05f66be55386fbb11b996ed87cae07f2ed81f1cf2fb989b8a — https://www.sec.gov/Archives/edgar/data/1021882/000168386321007296/f10518d1.htm"
    - "Federal Reserve Bank of New York, Liberty Street Economics, Convexity Event Risks in a Rising Interest Rate Environment (Mar 2014), sections Extension Risk; Duration and Convexity, sha256:ca74841f42335f144935a150bb0f54379fe00e5bb4f6866a9fd54ac5936179c0 — https://libertystreeteconomics.newyorkfed.org/2014/03/convexity-event-risks-in-a-rising-interest-rate-environment/"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Prepayment Risk.md
---

**Prepayment Risk** is the risk that borrowers repay principal earlier than scheduled — usually because interest rates have fallen and [[Refinancing|refinancing]] has become attractive — leaving the investor to reinvest at lower yields and capping the asset's price gain. Its mirror image, **extension risk**, is repayment slowing when rates rise.

- **Where it sits on Exam 9.** Task C5 of the Fall 2026 outline reads "Estimate and manage interest rate and credit risk (e.g., default, prepayment, reinsurance)". The outline names prepayment, with default and reinsurance, as an example of the [[Interest Rate Risk|interest rate]] and [[Credit Risk|credit risk]] of task C5, and says no more about it.
- **What the readings say.** C5's two readings, Panning's *Managing Interest Rate Risk* and Coval, Jurek & Stafford's *The Economics of Structured Finance*, do not treat prepayment: Panning's interest rate risk is the duration of an insurer's assets, liabilities and franchise value, and Coval, Jurek & Stafford's mortgage pools are about default and its correlation. Study those two readings for C5; the prepayment mechanics of a mortgage pool (SMM, CPR, the PSA benchmark) are on [[Mortgage-Backed Security]] and are not Exam 9 reading material.
