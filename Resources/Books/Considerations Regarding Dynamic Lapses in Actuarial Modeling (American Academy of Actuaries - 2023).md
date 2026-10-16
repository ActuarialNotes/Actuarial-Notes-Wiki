---
Title: "Considerations Regarding Dynamic Lapses in Actuarial Modeling"
Authors: "American Academy of Actuaries Life Experience Committee"
Publisher: "American Academy of Actuaries"
Year: "2023"
date: "2023"
Type: "Paper"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:dbaf3d927edb4d927330d3027e51fd5828fb3530ae450ae3d003c85e9b661960
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/Considerations Regarding Dynamic Lapses in Actuarial Modeling (American Academy of Actuaries - 2023).md
---
![[Considerations Regarding Dynamic Lapses in Actuarial Modeling (American Academy of Actuaries - 2023) - Cover.svg]]

A public policy issue paper of the American Academy of Actuaries' Life Experience Committee, dated December 2023. It explores the items that impact lapses and the impact of dynamic lapses on various life and annuity products, offers sample formulas for use in modeling, discusses how predictive analytics could be an alternative approach to modeling lapse behaviors, and provides sources of information on lapses. It is not an actuarial standard of practice and is a list of considerations and resources rather than guidance.

> [!info] On the syllabus
> - [[Exam CP-312 (SOA)|Exam CP-312]] — the whole paper, for outcomes 1a and 1b (Topic 1).

## Introduction
- In principle-based reserving, asset adequacy and profitability testing, actuaries often need lapse assumptions (static and dynamic) where current data may be thin.
- Early-year lapses are detrimental where acquisition costs are not yet covered, and later lapses lower than anticipated can be detrimental where later benefits are more expensive.
- Deferred annuities can have very dynamic lapses, because the contractowner is aware of interest rate movements and alternative investments.

## Understanding What Drives a Contractowner's Decision to Lapse
- Baseline lapses are expected; of more interest to the actuary are unexpected, or dynamic, [[Lapse|lapses]], primarily influenced by interest rates and/or equity market changes, and also by negative corporate press or company downgrades.
- Factors that also affect one company's lapses against another's: surrender charges, credited rates against rates on similar products elsewhere, field force marketing and loyalty, availability of information about the guarantee, distribution channel, duration from issue and policy size, type of product sold, and other guarantees under the contract.

## Information Needed in Developing a Lapse Functional Form
- Shape of the lapse function: typically half a U shape, with little dynamism when the difference between market and crediting rates is small and acceleration as it grows.
- Maximum lapse rates (some companies cap lapses, such as at 40%, others allow 100%) and minimum lapse rates (some products, such as long-term care, can approach or equal 0%).
- Competitor rate: identify the competitors, define how their rates are set, and anticipate how quickly they react to changes in interest rates.

## Sample Excess Lapse Function—Life Products
- A formula from Statutory Valuation of Individual Life and Annuity Contracts adjusts the base lapse rate up or down depending on whether the credited interest rate plus the surrender charge is lower or higher than the competitor rate.

## Alternate Sample Excess Lapse Function—Life Products
- A simpler form expresses the dynamism in multiples of the base lapse rates: lapse rate equals a rate from a table times a dynamic lapse adjustment, shown for a ULSG product.

## Sample Dynamic Lapse Formula—Fixed Annuities
- Dynamic lapse or withdrawal rates make renewal rates more responsive to the current interest rate environment, and are usually based on the competitiveness of the credited rates and the magnitude of the current surrender charges.

## Sample Dynamic Lapse Formula—Variable Annuities
- The in-the-moneyness of any guaranteed benefits has a significant impact on variable annuity lapses, and the stock market level can also influence them.
- Example 1: Lapse Rate = Max{Floor; Base Lapse Rate × Dynamic Adjustment Factor}, where the adjustment factor depends on the moneyness (AV/GV) of the guarantee.
- Example 2: a predictive-analysis formula, Lapse Rate = Max{Floor; Y}, with Y a logistic function of regression-fitted predictive data fields.

## Finding More Information From the Company
- Talking to the sales force, reading the contract, application and prospectus, looking at replacements, and spending time in service centers.

## Understanding the Definitions, Modeling Approach, and Their Potential Significance
- Review the granularity of assumptions and the difference between historical experience and future expectations.

## Using Predictive Analytics to Model Dynamic Lapse Behaviors
- Predictive analytics can solve the interplay between base and dynamic lapses by solving for both simultaneously.
- It allows increased granularity in assumptions without relying on non-credible actual-to-expected results for ever smaller blocks, and can foresee which policyholders in a pool are more likely to surrender.

## Sources of Information
- SOA/LIMRA studies, consulting firms' studies, research papers on optimal or efficient behavior, and Statutory Valuation of Individual Life and Annuity Contracts.

## Summary

## Sources
- [Considerations Regarding Dynamic Lapses in Actuarial Modeling (American Academy of Actuaries, December 2023)](https://actuary.org/wp-content/uploads/2023/12/life-paper-dynamic-lapses_0.pdf) — the document: title page, committee, limitations statement, table of contents and the text of each section
- [CP 312 Syllabus, Nov 2026/Mar 2027 (SOA)](https://www.soa.org/globalassets/assets/files/edu/2026/cp-312/2026-2027-cp-312-syllabus.pdf) — the citation and the learning outcomes the paper is assigned to
