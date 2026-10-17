---
Title: "Implementation Considerations for VA Market Risk Benefits"
Authors: "Dylan Strother, John Adduci and Janelle Kern"
Publisher: "Society of Actuaries"
Year: "2019"
date: "2019"
Type: "Paper"
Available from: "[soa.org](https://www.soa.org/globalassets/assets/files/edu/2026/ila-201u/fr-2019-iss118-strother-adduci-kern.pdf)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e8fd357e567dfe2543130ee83852db77ba44eed475a1e3e2762c36776c13bed3
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/Implementation Considerations for VA Market Risk Benefits (The Financial Reporter - 2019).md
---
![[Implementation Considerations for VA Market Risk Benefits (The Financial Reporter - 2019) - Cover.svg]]

An article in The Financial Reporter, the Society of Actuaries Financial Reporting Section's newsletter (September 2019), on the market risk benefits (MRBs) introduced by FASB's ASU 2018-12, which made targeted improvements to the accounting for long-duration insurance contracts. It focuses on what companies need to know about MRBs and the implementation considerations in complying with the new standard.

> [!info] On the syllabus
> - [[Exam ILA-201U (SOA)|Exam ILA-201U]] — Outcomes 1b; the whole article (The Financial Reporter, Sep 2019) (as the syllabus states it)

## What Is an MRB?
- FASB defines an MRB as a benefit in addition to the account balance that protects a policyholder from "other than nominal capital market risk" and exposes the insurance company to it.
- Guaranteed minimum benefits (GMxBs) on variable, indexed and fixed annuities are generally MRBs under the new standards if the capital market risk is other than nominal, and annuitization guarantees on deferred annuities may also be; the death benefit on a variable universal life contract, and any amount that credits the account value, are not.
- The assessment of "other than nominal capital market risk" occurs at contract inception based on the economic environment at that time, and utilization assumptions are not used in it.

## Methodology Considerations
- Once the scope has been decided, MRBs follow fair value accounting, and MRBs are valued together as a compound MRB.
- The standard mentions a non-option method and an option method; the article discusses the non-option method, which calculates an "attributed fee" such that the MRB value is zero at inception.
- The non-option market risk benefit liability is calculated in five steps: project excess benefits and contract fees across each [[Risk-Neutral Valuation|risk-neutral]] scenario, calculate their present values, average across scenarios, calculate the attributed fee percentage (AF%) for newly issued policies, and calculate the MRB balance as the average present value of excess benefits minus AF% times the average present value of associated fees.
- Inputs beyond the in-force file are risk-neutral interest and equity scenarios, own credit risk, policyholder behavior assumptions and [[Risk Margin|risk margins]].
- Changes in the liability due to changes in instrument-specific credit risk are recognized below the line in other comprehensive income.

## Operational Considerations
- Disclosure requirements include aggregating MRBs with similar characteristics into categories and presenting a disaggregated roll forward of each category's reserves, which often requires many successive layered valuation runs.
- As of the transition date, the difference between the fair value and the carrying value of an MRB is recognized as an adjustment to retained earnings, and the cumulative effect of changes in instrument-specific credit risk is recognized as an adjustment to accumulated other comprehensive income.
- Meeting the retrospective transition adjustment may mean resurrecting models from the past, retrofitting current models, or using a practical expedient such as the ratio approach.

## Conclusion

## Sources
- [Implementation Considerations for VA Market Risk Benefits, The Financial Reporter, September 2019 (Society of Actuaries)](https://www.soa.org/globalassets/assets/files/edu/2026/ila-201u/fr-2019-iss118-strother-adduci-kern.pdf) — the document: title, authors, section headings and the text of the article (5 pages, sha256 584b30aa089c972be472dd1109868aecffaccda584e3fe21962d133539c751b1); the page header reads Issue 119 while the file's metadata reads Issue 118
- [SOA Exam ILA-201U Syllabus, 2026-2027](https://www.soa.org/globalassets/assets/files/edu/2026/ila-201u/2026-2027-ila-201u-syllabus.pdf) — the citation (Implementation Considerations for VA Market Risk Benefits, The Financial Reporter, Sep 2019) and the outcome it serves
