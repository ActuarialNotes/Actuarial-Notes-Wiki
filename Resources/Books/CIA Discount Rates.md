---
Title: "IFRS 17 Discount Rates and Cash Flow Considerations for Property and Casualty Insurance Contracts"
Authors: "Canadian Institute of Actuaries"
Publisher: "Canadian Institute of Actuaries"
Year: "2025"
date: "2025"
Type: "Educational Note"
Code: "225109"
Available from: "[cia-ica.ca](https://www.cia-ica.ca/publications/225109e/)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:bdabfd809075faf1fb770ea23df3dde8313ec7d9bdd36baf8e87e1205f8e5a2f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/CIA Discount Rates.md
---
![[CIA Discount Rates - Cover.svg]]

A CIA educational note giving guidance on setting and applying discount rates, including cash flow considerations, to P&C insurance contracts under IFRS 17. Prepared by the Committee on Property and Casualty Insurance Financial Reporting and dated October 17, 2025 (document 225109), it is focused on the Canadian market; this version, updating those of June 2022, November 2022 and September 2024, expands the discussion of the illiquidity premium and updates the CIA illiquid reference curve parameters effective October 15, 2025. Illustrative examples, basic and with options, are in Excel files that form part of the note.

> [!info] On the syllabus
> - [[Exam 6C (CAS)|Exam 6C]] — objectives C1 and C2; the October 2025 note, with candidates responsible only for the basic Excel illustrations.

## Preamble
- Process
- Your feedback

## 1 Introduction
- A table summarizing IFRS 17.BC72 sets out the discount rate IFRS 17 uses for each purpose — current rates for the [[Fulfilment Cash Flows|fulfilment cash flows]], locked-in rates for the CSM, and rates at the incurred date for the OCI option under the PAA.
- The note supplements the CIA's Standards of Practice – Insurance and Chapter 3 (Discount Rates) of the *Application of IFRS 17 Insurance Contracts* note.

## 2 Terminology
- The note applies to the LRC and the LIC of insurance and reinsurance contracts issued and of reinsurance contracts held.
- The [[Forward Rate|forward rate]] over $[n-1, n]$ is implied by the [[Spot Rate|spot rates]] $y_n$:

> $$f_n = \frac{(1+y_n)^n}{(1+y_{n-1})^{n-1}} - 1$$

## 3 Determining estimates of future cash flows
- 3.1 Selecting a payment pattern
    - Payment patterns are normally derived from the entity's historical experience by homogeneous segment, and reflect the timing of salvage, subrogation and reinsurance recoveries.
- 3.2 Timing of future payments
    - Payments are commonly assumed to be made in the middle of each period, which may not suit seasonal claims, books changing significantly in volume, or very short payment patterns.

## 4 Determining discount rates
- 4.1 Discount rates
    - IFRS 17 permits a bottom-up approach (a liquid risk-free curve plus an illiquidity premium) or a top-down approach (a reference portfolio's yield less factors not relevant to the insurance contracts), and does not require the two to be reconciled.
- 4.2 Bottom-up approach
    - 4.2.1 Risk-free rate
    - 4.2.2 Illiquidity premium (theoretical)
    - Government of Canada bonds are considered risk-free; the drawback of the approach is the need to derive an illiquidity premium.
- 4.3 Top-down approach
    - 4.3.1 Selection of a reference portfolio
- 4.4 Reference portfolio discount rate
    - 4.4.1 Credit risk adjustment
        - The credit risk deducted from bond yields covers expected and unexpected credit losses, including default and downgrade risk.
    - 4.4.2 Market risk and other adjustments
- 4.5 Illiquidity premium based on reference portfolio
    - The combined approach sets the IFRS 17 discount rate as the risk-free rate at the valuation date plus a reference portfolio illiquidity premium derived top-down — fundamentally a bottom-up approach.
- 4.6 Liquidity of P&C insurance contract liabilities
    - 4.6.1 Insurance contracts and reinsurance contracts issued
        - For most standard P&C products the LRC is liquid and the LIC illiquid; title, mortgage and contract surety LRCs are examples of illiquid non-standard products.
    - 4.6.2 Liquidity of reinsurance contracts held
    - 4.6.3 Single illiquidity premium
        - IFRS 17 does not preclude a single illiquidity premium or yield curve for both the LIC and the LRC of a portfolio.
- 4.7 Duration of the observable market for discount rates
    - The observable market in Canada is 30 years.
- 4.8 Long-term discount rate (unobservable ultimate rate)

## 5 Reference curves
- 5.1 Introduction
    - The CIA's liquid and illiquid reference curves, published monthly through Fiera Capital, facilitate comparison of discount curves among entities.
- 5.2 Defining the reference curve
    - 5.2.1 Defining the reference curve in the observable period
        - Liquid curve: risk-free rate + 90% of the provincial bonds spread; illiquid curve: risk-free rate + 0.50% + X% of the Canadian investment grade bonds spread, with X% = 80% in years 1–3, 75% in year 4 and 70% in years 5+.
    - 5.2.2 Defining the reference curve in the unobservable period
- 5.3 Considerations for using the CIA reference curves as published for IFRS 17 discounting
    - 5.3.1 Appropriateness of the risk-free rates used
    - 5.3.2 Appropriateness of the reference portfolio used
    - 5.3.3 Appropriateness of the proportion of the spread deemed to be related to an illiquidity premium and shape of this illiquidity premium
    - 5.3.4 Appropriateness of the amount and shape of the additional illiquidity premium added to the illiquid reference curve
    - 5.3.5 Considerations for deviating from the reference curves
    - 5.3.6 Materiality considerations
    - The actuary would consider at each reporting date whether the published curves remain appropriate for the cash flows being discounted; deviating may be appropriate, for example, when a commutation clause makes a LIC less illiquid than the illiquid curve implies.

## 6 Insurance finance expense versus investment income
- The expected return on the insurer's assets may be lower than the discount rate, making investment income lower than the insurance finance expense; the actuary would understand the implications of discount rates that create a negative bias in investment results.

## 7 Suggested disclosures in the Appointed Actuary's report
- 7.1 Discount curves within the observable period
- 7.2 Discount curves beyond the observable period
- 7.3 Suggested disclosures when using the published reference curves
- The [[Appointed Actuary's Report]] would outline the methodology used to develop the discount curves for all insurance contract liabilities.

## 8 Discounting the estimates of future cash flows
- Discounting needs four assumptions: the undiscounted liability amount, its expected payment pattern, the expected timing of payments, and a [[Yield Curve|yield curve]] consistent with the cash flows.

## 9 Applying the risk adjustment and determining the fulfilment cash flows
- The actuary is responsible for including a [[Risk Adjustment for Non-Financial Risk|risk adjustment]], determined by the entity in accordance with IFRS 17.37, in the fulfilment cash flows:

> $$\text{Fulfilment cash flows} = \text{Discounted estimates of future cash flows} + \text{Risk adjustment}$$

## 10 Locked-in yield curve
- Locked-in curves are used to accrete interest on the CSM, to allocate IFIE under the [[Other Comprehensive Income Option|OCI option]], and under the PAA with a significant financing component; for P&C they are typically used only with the GMA for the LRC or the OCI option.

## 11 Insurance finance expense
- 11.1 Unwinding of discount
    - 11.1.1 Constant yield curve
    - 11.1.2 Unwinding using spot rates
    - 11.1.3 Expectations hypothesis
- 11.2 Effect of changes in discounting assumptions
- [[Insurance Finance Income or Expenses|Insurance finance expense]] may be viewed as the unwinding of discount plus the effect of changes in discounting assumptions; IFRS 17 does not require the two to be calculated separately.

## 12 Financial statement presentation
- 12.1 Statement of financial position
- 12.2 Statement of comprehensive income
- 12.3 Approaches for calculating breakdown of incurred claims and expenses into their components from first measurement date (beyond the current period)
- 12.4 Unwinding claims incurred in the current period
- 12.5 Calculating the insurance finance expense for claims incurred in the current accident year using the payment pattern of an individual claim
- 12.6 Calculating the insurance finance expense for claims incurred in the current accident year using the accident year payment pattern and an allocation between the LRC and LIC
- The change in discounted cash flows over a period is taken as the unwinding of discount, then the update of the discount curve, then the update of the cash flow assumptions (insurance service expense); IFRS 17 does not prescribe this order.

## 13 Acceptability of allocations
- The actuary may value the liabilities on a basis other than the financial-reporting portfolios and groups, and allocate the LIC estimates to them (IFRS 17.24, BC117).

## 14 Illustrative example
- 14.1 Overview
- 14.2 Appendix 1: Selection of payment pattern
- 14.3 Appendix 2: Selection of yield curve assumptions
    - 14.3.1 Reference portfolio yield curve
    - 14.3.2 Credit risk adjustment
    - 14.3.3 Market risk and other adjustments
    - 14.3.4 Determining the illiquidity premium
- 14.4 Appendix 3: Projection of undiscounted and discounted cash flows – current yield curve
- 14.5 Appendix 4: Projection of undiscounted and discounted cash flows – locked-in yield curve
    - 14.5.1 Appendix 5: Summary of LIC
    - 14.5.2 Appendix 6: Calculation of insurance finance expense and Appendix 7: Financial statement entries
- 14.6 Appendix 8 and 9: Calculation of insurance finance expense in the current period and underlying assumptions
- 14.7 Sources of data for illustrative examples
    - 14.7.1 Reference portfolio
    - 14.7.2 Risk-free rates
    - 14.7.3 Credit default and downgrade risk
- The appendices hold a more complex example — choosing the unwinding method, the OCI option and whether the risk adjustment is disaggregated — and a simplified one using the constant yield curve with neither election.

## Related readings
- [[CIA CSOP]] — the Standards of Practice – Insurance this note supplements
- [[CIA IFRS 17 - LRC]] — an earlier (June 2022) version of the LRC educational note this note's LRC discount-rate guidance is to be read with
- [[CIA IFRS 2]] — the Risk Adjustment educational note referenced in §9
- [[CIA IFRS 1]] — the Reinsurance educational note referenced in §3 for non-performance of reinsurers

## Sources
- [IFRS 17 Discount Rates and Cash Flow Considerations for Property and Casualty Insurance Contracts (CIA, 2025)](https://www.cia-ica.ca/publications/225109e/) — the landing page (publication date, accession no. 225109, related Excel files) and its PDF: title page, contents, preamble and the text of Sections 1–14
- [CAS Exam 6C Content Outline, Fall 2026](https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf) — the citation and the assigned scope
