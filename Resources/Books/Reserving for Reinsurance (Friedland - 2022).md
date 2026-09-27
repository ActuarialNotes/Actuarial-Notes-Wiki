---
Title: "Reserving for Reinsurance"
Authors: "Jacqueline Friedland"
Publisher: "Casualty Actuarial Society"
Year: "2023"
date: "2023"
Type: "Study Note"
Available from: "[casact.org](https://www.casact.org/sites/default/files/2022-11/Exam7_Study_Note_Friedland.pdf)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:18ddd77c806e56021703084a12e11a466cd0a68304197f6d9dc2cec788dc5368
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/Reserving for Reinsurance (Friedland - 2022).md
---
![[Reserving for Reinsurance (Friedland - 2022) - Cover.svg]]

A CAS study note on estimating unpaid losses from the perspective of reinsurance, for actuaries at reinsurers and at the insurers that cede losses to them. It is also meant for actuaries at self-insurers and captive insurers that use reinsurance. It assumes a knowledge of basic reserving and focuses on the differences in reserving for reinsurance versus primary insurance, not on the mechanics of the traditional techniques; the author presents it as a supplement to her Estimating Unpaid Claims Using Basic Techniques. Its three chapters cover reinsurance terminology, functions, types and contract provisions; data requirements; and the methods frequently used for reinsurance.

> [!info] On the syllabus
> - [[Exam 7 (CAS)|Exam 7]] — objectives A15–A17; the whole study note.

## Preface
- The author views the text as a supplement to her earlier *Estimating Unpaid Claims Using Basic Techniques* and encourages readers to be familiar with that text first.
- Concepts are presented simply for readers worldwide, and the examples use no currency.
- Figures in the tables and exhibits carry more decimals than shown, so totals may not agree exactly because of rounding.

## 1 Introduction
- The text addresses the estimation of [[Unpaid Claims|unpaid losses]] from the perspective of [[Reinsurance|reinsurance]], "insurance for insurers", and focuses on how reserving for reinsurance differs from primary insurance.
- *Reserves* means an amount booked in a financial statement, which may differ from the actuary's estimate of unpaid losses.
- Appropriate reserves matter to internal management, investors, insurance regulators and rating agencies; a reinsurer reporting significant adverse development could face a downgrade, and primary insurers typically require minimum ratings of their reinsurers.
- Basic Reinsurance Terminology
    - The reinsured (ceding company, or cedent) cedes business, and the reinsurer assumes it; under IFRS 17 ceded contracts are [[Reinsurance Contracts Held|reinsurance contracts held]].
    - A reinsurer can reinsure what it has assumed through a retrocession, in which the ceding reinsurer is the retrocedent and the assuming reinsurer the retrocessionaire.
    - For a primary insurer, gross is direct plus assumed business, ceded is business transferred through reinsurance, and [[Net of Reinsurance|net]] is gross less ceded; for a reinsurer, gross is assumed business and ceded is business retroceded.
    - The retention, or attachment point, is what the ceding company keeps for its own account; a working layer is a range with relatively predictable, fairly frequent losses, whose boundary depends on the organization's risk appetite.
    - Reinsurers often receive data by [[Bordereau|bordereau]] (plural bordereaux), a detailed periodic report of premiums or losses affected by reinsurance.
    - Counterparty default risk is the risk that the reinsurer cannot meet its obligations, in which case the liability falls back to the ceding company ([[Reinsurance Credit Risk]]).
- Functions of Reinsurance
    - Promote Stability
        - Ceding companies retain smaller, more predictable claims and cede unusual, infrequent ones, which stabilises results within and between years and can decrease the probability of ruin.
    - Increase Capacity
        - A primary insurer asked to write a stadium with a 500 million limit, against a net retention of 5 million, could seek the other 495 million from reinsurers.
    - Protect Against Catastrophes
        - Cover for single and multiple catastrophic events, natural and man-made, and for casualty occurrences involving many insureds.
    - Manage Capital and Solvency Margin
        - The ceded commission on the unearned premium reserve transfers statutory surplus from the reinsurer to the cedent, and ceded premium lowers the net premium-to-surplus ratio (the solvency margin).
    - Access Technical Expertise
        - Reinsurers provide underwriting, marketing, claims, loss prevention and pricing expertise, particularly to small insurers and those entering new lines or regions.
    - Other Functions of Reinsurance
        - Withdrawal from a line of business, geographic area or production source, and arbitrage when reinsurance costs less than the premium collected.
- Types of Reinsurance
    - Reinsurance contracts are manuscript, tailored to the parties, so exceptions to any generalisation are common; they are categorised as treaty or facultative and as proportional or non-proportional ([[Types of Reinsurance]]).
    - Treaty and Facultative Reinsurance
        - Treaty Reinsurance
            - Under [[Treaty Reinsurance|treaty reinsurance]] the cedant cedes, and the reinsurers assume, all business within the treaty's terms, including policies not yet written; its most important characteristic is the absence of individual underwriting by the reinsurer.
        - Facultative Reinsurance
            - A [[Facultative Reinsurance|facultative]] cession is not automatic: each risk is submitted and may be accepted or rejected, often under a certificate of reinsurance. Its primary purpose is capacity, and the reinsurer's own underwriting can mitigate adverse selection.
        - Examples of Treaty and Facultative Reinsurance
            - Treaty cover up to a size threshold (total insured value, number of employees) with facultative cover above it, or treaty cover for auto with facultative cover for environmental liability.
        - Hybrid of Treaty and Facultative Reinsurance
            - Facultative automatic, facultative obligatory and facultative semi-obligatory agreements blend the two.
    - Proportional and Non-Proportional Reinsurance
        - Proportional (pro rata) reinsurance shares premiums and losses by the cession percentage, usually with a ceding commission, and provides capacity and surplus relief; non-proportional reinsurance provides stability.
        - Quota Share Reinsurance
            - Under a [[Quota Share|quota share]] the gross, net and ceded loss ratios are the same (Table 1.2: 180% on every basis at a 60% cession); a variable quota share varies the percentage by risk characteristics.
            - A quota share usually applies to the ceding company's net retained account, after all other reinsurance except perhaps catastrophe excess of loss, though practices vary.
        - Surplus Share Reinsurance
            - A [[Surplus Share|surplus share]] cedes the part of each risk above the retained line, up to a capacity expressed as a multiple of that line: a three-line treaty lets a cedant with a 2.5 million line write 10 million limits, ceding $(\text{Limit} - \text{Line})/\text{Limit}$ of each loss.
        - Functions of Proportional Reinsurance
            - Mainly managing capital and solvency margins and increasing capacity, which surplus share does most effectively.
    - Non-Proportional Reinsurance
        - In non-proportional, or [[Excess of Loss|excess of loss]], reinsurance the reinsurer's response depends on the size of the loss; the main types are excess per risk, excess per occurrence and catastrophe, annual aggregate excess of loss, and clash.
        - Excess Per Risk Reinsurance
            - A 7 million excess of 3 million per-risk cover pays 3.5 million of a 6.5 million loss and nothing of a 3 million loss.
        - Excess Per Occurrence Reinsurance and Catastrophe Reinsurance
            - The subject loss is the sum of all losses from one event. Most catastrophe contracts provide a [[Reinstatements|reinstatement]] of the limit, and reinstatement premium should be tracked separately because it may be earned immediately and can distort the premium-loss relationships behind expected loss ratios.
        - Example of Excess Per Risk and Catastrophe Reinsurance
            - With per-risk cover inuring to the benefit of the catastrophe cover, a wildfire costing 27 million gross cedes 5 million per risk; the 22 million left exceeds the 20 million catastrophe retention by 2 million.
        - Annual Aggregate Excess of Loss Reinsurance
            - [[Aggregate Excess of Loss|Aggregate excess of loss]] (aggregate stop-loss) guarantees that losses will not exceed a threshold stated as a loss ratio or an amount; it usually protects net results, best protects capital, and is often unavailable or very expensive.
        - Clash
            - [[Clash Cover|Clash]] reinsurance is a casualty contract attaching above all other policy limits, for multiple claims arising from one event; the definition of a clash event is critical.
    - Finite Risk Reinsurance
        - [[Finite Reinsurance|Finite risk reinsurance]] combines risk transfer and risk financing in a multi-year contract, includes investment income explicitly, limits the reinsurer's assumption of risk, and shares results with the ceding company.
        - Loss Portfolio Transfers
            - A [[Loss Portfolio Transfer|loss portfolio transfer]] transfers, at a specified accounting date, all or part of the liability for future loss payments; its premium reflects the time value of money, timing is the main element of risk, and total nominal losses are usually limited.
        - Adverse Development Cover
            - An [[Adverse Development Cover|adverse development cover]] reimburses losses above a retention set at or above the held reserves, without transferring the reserves; a key use is in mergers and acquisitions.
- Reinsurance Concepts and Contract Provisions Influencing the Estimation of Unpaid Losses
    - Losses-Occurring-During and Risks-Attaching
        - The business-covered clause says whether a contract covers [[Losses-Occurring-During and Risks-Attaching|losses occurring during]] its term, whenever the underlying policy was issued, or only policies that incept during its term, which can expire after the contract does.
    - Subscription Percentage
        - When several reinsurers share a placement, the actuary needs the percentage subscribed, since any cover not fully placed stays with the primary insurer.
    - Commutation Clause
        - In a [[Commutations|commutation]] the reinsurer pays the present value of funds not yet due in exchange for terminating all future obligations; commuted contracts may develop differently, so actuaries frequently exclude them from historical data.
- Conclusion
    - The text is an introduction focused on basic reserving methods, not on complex towers or internal reinsurance within a group.

## 2 Data Requirements
- Introduction
    - ASOP 23 defines data as numerical, census or classification information, not general or qualitative information; the ISAP Glossary says data are usually quantitative but may be qualitative.
- Sufficient and Reliable Data
    - Sufficiency
        - The development method assumes consistency in mix of business, attachment points and policy limits, and claim processing; manuscript contracts and changes at the cedants or the reinsurer make that consistency harder to achieve ([[Data Issues]]).
    - Reliability
        - Validating data is harder for reinsurers: different cedant and broker systems, bordereaux that differ in content, labelling and frequency, reporting lags, gaps in claim and expense information, manuscript policies, and the reinsurer's own coding.
- Homogeneity and Credibility of Data
    - Homogeneity
        - The Solvency II homogeneous risk group (HRG) frames [[Homogeneity|segmentation]] by coverage, reporting pattern, case reserving, settlement pattern, reopening, severity and volume.
    - Credibility
        - [[Credibility]] is the predictive value attached to a set of data (ASOP 25); dividing data into too many homogeneous groups leaves too little volume in each.
    - Differences in Considerations Related to Homogeneity and Credibility for Reinsurance versus Insurance
        - A reinsurer segments by type of contract (treaty or facultative, pro rata or excess, with aggregate stop-loss and finite covers apart) rather than by sub-coverage or jurisdiction, and may segment excess covers by attachment point.
        - Patrik's priority-ordered list runs from line of business, type of contract and type of cover, through the primary line and attachment point for casualty, contract terms and type of ceding company, to the intermediary.
        - Combining treaty and facultative data may be inappropriate when their relative volume is changing and their development patterns differ.
- Organization of Data by Experience Period
    - Reinsurers aggregate by accident year or by underwriting (treaty, contract) year; statutory reporting in the United States and Canada requires accident year results.
    - Accident Year Aggregation
        - [[Accident Year|Accident year]] groups losses by occurrence date against calendar year earned premium; it is easy, used by industry benchmarks such as the RAA and AM Best, and tracks economic, regulatory and catastrophe effects, but can mismatch losses and premiums.
    - Underwriting (Treaty) Year Aggregation
        - [[Underwriting Year|Underwriting year]] groups losses by the year the reinsurance contract incepted, like policy year for primary insurance, and truly matches losses with premiums.
        - An underwriting year of annual risks-attaching contracts covers accident dates across three calendar years, so losses take longer to report and ultimates longer to estimate, and cumulative factors for immature years are highly leveraged.
    - Allocation to Accident Year from Underwriting Year
        - Treaty-year results are allocated to accident year by how premium is earned over the contract period, using earnings profiles when loss dates are not reported, particularly for treaty proportional business.
- Knowledge of Reinsurance Terms and Conditions
    - The actuary needs the business covered and exclusions, ceding percentages, lines, retentions and limits, per risk or per occurrence, stop-loss terms, and the treatment of LAE and recoveries, and documents historical terms as they change.
- Types of Data
    - Reinsurers rely on paid losses, case reserves (including additional case reserves, ACR, set by the reinsurer) and reported losses, with written and earned premiums, but usually lack claim counts and exposures, which limits triangle diagnostics.
    - Bordereau Reporting
        - [[Bordereau|Bordereaux]] arrive monthly, quarterly, semi-annually or annually; the less frequent the reporting, the greater the lag in the reinsurer's reporting and settlement patterns, and a bordereau's loss detail is far less complete than the ceding company's claim files.
    - Loss Adjustment Expenses
        - [[Unallocated Loss Adjustment Expenses ULAE|ULAE]] are frequently excluded from cover; [[Allocated Loss Adjustment Expense|ALAE]] may be included with the loss, included pro rata, or not included (Table 2.1).
    - Multiple Currencies
        - Translating data to a common currency at the exchange rates of a single point in time avoids the influence of exchange-rate fluctuations.
    - Large Losses
        - Unusually [[Large Loss|large losses]] may be excluded from the initial projection and added back as a case-specific projection of the reported portion plus a smoothed IBNR provision.
    - Recoveries
        - Deductibles, [[Salvage and Subrogation|salvage and subrogation]] generally apply before the cession, so a 1.5 million subrogation received years later on a claim well into the layer benefits only the reinsurer.
    - Challenges with Data for Reinsurer
        - Influence of Change in Operations and the Environment
            - Operational changes at the reinsurer and at its cedants, acquisitions and divestitures, and legal reforms all affect ceded reporting and payment patterns.
        - Other Experience Typically Excluded from Development Analyses
            - Discontinued business is often excluded, and asbestos, environmental and abuse exposures may not suit development triangles.
        - Reporting Lags
            - Claims reach the reinsurer only after the ceding company has reported and investigated them, and excess claims take longer still; contracts may require reporting above a threshold, or of certain claim types regardless of amount.
        - Heterogeneity of Contract Wordings
- Sources of Data
    - Large reinsurers use internal data; smaller ones often need external data for development and tail factors, trend rates and expected loss ratios.
    - Reinsurance Association of America (RAA)
        - A biannual loss development study, published since 1969, by accident year for casualty excess reinsurance, split by treaty and facultative and five ranges of attachment point.
    - Best’s Aggregates & Averages
        - [[Schedule P]] shows three non-proportional assumed reinsurance lines with 10 accident years and no claim counts, too short for excess of loss and not refined enough by type of reinsurance.
    - Internet Searches
    - Shortcomings of External Data
        - External data may mislead through differences in wording, mix, type of reinsurance, underwriting, claims handling and coding.
- Conclusion – Importance of Understanding the Data

## 3 Methods Frequently Used to Estimate Unpaid Losses for Reinsurance
- Introductory Comments
    - Unpaid losses are estimated gross, ceded and net. Ceded data often have limited credibility, so actuaries typically project gross and net of reinsurance and take ceded as the difference ([[Ceded Loss Reserve]]).
- Review of the Development, Expected, and Bornhuetter-Ferguson Methods
    - Development Method
        - Key Assumptions
            - The [[Chain Ladder Method|development method]] assumes values recorded to date will develop like prior years; reinsurers use it with reported and paid losses and with premiums, and it assumes consistent retentions, participation percentages and limits.
        - Mechanics
            - Seven steps: compile the triangle, calculate [[Age to Age Factor|age-to-age factors]] and their averages, select factors and a [[Tail Factor|tail factor]], calculate [[Cumulative Development Factor|cumulative factors]], and project ultimate values.
        - Considerations in Selecting Age-to-Age Factors
            - Smooth progression, stability down each column, credibility (with benchmark factors when it is low) and the applicability of history; factors are more volatile for reinsurance than for primary insurance, and for non-proportional than for proportional reinsurance.
    - Expected Method
        - Key Assumptions
            - The [[Expected Loss Method|expected method]] assumes an a priori estimate predicts total unpaid losses better than the experience to date.
        - Mechanics
            - Expected losses are most often an expected loss ratio times earned premium; reinsurers typically lack the claim counts and exposures for frequency-severity or exposure approaches.
    - Bornhuetter-Ferguson Method
        - Key Assumptions
            - The [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson method]] assumes unreported (unpaid) losses will develop based on expected losses.
        - Mechanics
            - Ultimate losses are actual reported (paid) losses plus expected losses times the percentage unreported (unpaid).
    - Further Comments about the Development, Expected, and Bornhuetter-Ferguson Methods
        - Detailed Calculations
        - Differences in Assumptions for Reinsurance and Primary Insurance
            - Early age-to-age factors and tail factors are often higher for reinsurance, loss trends are higher for excess of loss, premium [[On-Leveling|on-level]] factors are less precise, and adjustments for tort and product reform are less used.
        - Effect of Changes in Currency Exchange Rates
            - Restating the triangle at one date's exchange rates shows the true pattern (a 12–24 factor of 3.00 in every year); converting each diagonal at its own year-end rate gives 12–24 factors from 2.80 to 3.13.
- Background About Examples
    - The examples disguise the worldwide aggregated data of the largest reinsurers, so they are far more stable than a single HRG; one reinsurer maintains more than 500 HRGs and another more than 1,000.
    - Average Age-to-Age Factors
        - Simple three-year, medial seven-year and volume-weighted five-year averages.
    - Tail Factors
        - The reported tail is the larger of 1.00 and the latest observed factor; the paid tail comes from the reported projections of the most mature years.
    - Expected Loss Ratios
        - Selected from the latest five years of reported development projections, without adjustment for trend or rate level; treaty-year premium is adjusted to reflect earnings through the valuation date.
    - GL Captive Insurer
        - The last two examples take the ceding company's perspective, using GL Self-Insurer from *Estimating Unpaid Claims Using Basic Techniques*.
- Comparison of Age-to-Age Factors and Development Patterns
    - Primary Insurance and Reinsurance for a Similar Type of Business
        - Comparison of Volatility in Age-to-Age Factors
            - For professional lines, the standard deviation of reported 12–24 factors is 0.50 for primary insurance and 0.84 for reinsurance, and of paid 12–24 factors 0.73 and 2.91.
        - Longer Reported and Payment Patterns for Reinsurance versus Primary Insurance
            - Reinsurance patterns are slower because claims must first be recognised by the ceding company, take time to develop beyond its attachment point, and are delayed by bordereau reporting.
    - Proportional and Non-proportional Reinsurance for the Same Line of Business
        - Comparison of Volatility in the Age-to-Age Factors of Proportional versus Non-proportional Reinsurance
        - Longer Reporting and Payment Patterns for Non-proportional versus Proportional Reinsurance
        - Variability in Ratios of Paid-to-Reported Losses
            - Without claim counts or exposures, the paid-to-reported ratio is one of the few triangle [[Data Diagnostic Analysis|diagnostics]] a reinsurance actuary can review; an unchanged ratio does not prove that nothing has changed.
        - Premium Development
            - Written premium by treaty year develops, more so for risks-attaching reinsurance, and ultimate losses for treaty years whose premium is not fully earned are reduced to the portion from occurrences before the valuation date.
        - Concluding Remarks
            - Proportional reinsurance attaches from the ground up, while non-proportional reinsurance is excess of loss coverage, so its development is more volatile and longer.
    - Property Reinsurance excluding Catastrophe and Property Reinsurance Catastrophe
        - Catastrophe and Large Loss Events
            - Reinsurers reserve catastrophes from ground-up, contract-by-contract exposure assessments rather than aggregated development analyses, supplemented by [[Catastrophe Modelling|catastrophe models]].
        - Comparison of Volatility in Age-to-Age Factors
            - Table 3.11 removes the known catastrophes, develops the rest and adds their estimated ultimates: (reported − catastrophe reported) × reported cumulative factor + estimated ultimate catastrophe losses.
- Implications of Volatility in Loss Development Experience
    - Volatile age-to-age factors make the development projections, the expected loss ratios drawn from them, and the Bornhuetter-Ferguson projections all uncertain.
    - Observations
        - The standard deviation of indicated ultimate loss ratios runs from 0.04 for professional lines primary insurance to 0.64 for property catastrophe reinsurance (Table 3.12).
    - Range of Indicated IBNR and Total Unpaid
        - The [[Range of Indications|range of indicated IBNR]] across methods is wider for reinsurance than for primary insurance, for non-proportional than for proportional reinsurance, and for catastrophe than for non-catastrophe property.
- Quota Share and Stop-Loss Reinsurance Examples
    - Quota Share Reinsurance
        - Quota share age-to-age factors are identical gross, ceded and net; the ceded percentage applies to ultimate, paid, case and IBNR, by year when it changes, and on a risks-attaching treaty it follows the underlying policy year, not the accident year.
    - Stop-Loss Reinsurance
        - Excess per occurrence inures to the quota share, which inures to the stop-loss, which applies last to protect the net result: in Table 3.15, 2,986 gross less 400 per occurrence, times 70% retained, gives 1,810, capped by the 1,500 stop-loss limit.
- Conclusion
    - The methods should not be applied mechanically; actuaries should meet regularly with underwriting and claims personnel before deciding the reserves to book.

## Related readings
- [[Estimating Unpaid Claims Using Basic Techniques (Friedland - 2010)]] — the author's earlier text, which the preface asks readers to know first and whose methods and GL Self-Insurer example Chapter 3 builds on
- [[ASOP 23 - Data Quality (ASB - 2016)]] — cited in Chapter 2 (revised edition, December 2016) for its definitions of data and appropriate data and its requirements for reviewing data
- [[ASOP 43 - Property Casualty Unpaid Claim Estimates (ASB - 2007)]] — cited in Chapter 1 for the use of the term reserves
- [[Basic Ratemaking (Werner - 2016)]] — cited in Chapter 3 (chapter 5) for examples of premium on-level factors

## Sources
- [Reserving for Reinsurance (Casualty Actuarial Society)](https://www.casact.org/sites/default/files/2022-11/Exam7_Study_Note_Friedland.pdf) — the document: title page, copyright page, table of contents and bookmark outline, preface, and the text and tables of Chapters 1–3 that the points above are taken from. The headings follow the bookmarks, which include a Bordereau Reporting section (p. 38) that the printed contents page omits. The exhibits Chapter 3 refers to are published separately ("Exhibits available online") and were not read. The copyright page reads "© 2023 Casualty Actuarial Society" and the document prints no other date (its PDF metadata gives a creation date of 30 January 2023), so this page dates it 2023, although the content outline cites it as "CAS Study Note, 2022", the file sits in the site's November 2022 upload folder, and the vault's filename keeps the outline's 2022.
- [CAS Exam 7 Content Outline, Fall 2026](https://www.casact.org/sites/default/files/2026-03/Exam_7_CO_2026_Fall.pdf) — the citation and the assigned scope
