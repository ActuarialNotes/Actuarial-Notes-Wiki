---
Title: "IFRS 17 Discount Rates and Cash Flow Considerations for Property and Casualty Insurance Contracts"
Author: "Canadian Institute of Actuaries"
Year: "2025"
date: "2025"
Publisher: "Canadian Institute of Actuaries"
Type: "Educational Note"
Available from: "[cia-ica.ca](https://www.cia-ica.ca/publications/225109e/)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9b3e2010310d4f1d255e1056966c45c36978106f74d3ee885ac27dd1b50b98c9
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/CIA Discount Rates.md
---
![[CIA Discount Rates - Cover.svg]]

The CIA's October 2025 note on **[[IFRS 17 Discount Rates|IFRS 17 discount rates]]** and the cash flows they are applied to. Read for [[Exam 6C (CAS)|Exam 6C]] objectives C1 and C2. The syllabus makes candidates **responsible only for the basic Excel illustrations** in the note.

## Contents

| Section | Subject |
|---|---|
| 1–2 | Introduction; terminology |
| **3** | **Determining estimates of future cash flows** — 3.1 selecting a payment pattern · 3.2 timing of future payments |
| **4** | **Determining discount rates** — 4.1 discount rates · 4.2 **bottom-up** (4.2.1 risk-free rate, 4.2.2 theoretical illiquidity premium) · 4.3 **top-down** (4.3.1 selection of a reference portfolio) · 4.4 reference portfolio discount rate (4.4.1 credit risk adjustment, 4.4.2 market risk and other adjustments) · 4.5 illiquidity premium based on the reference portfolio · 4.6 liquidity of P&C insurance contract liabilities (contracts issued; **liquidity of reinsurance held**; a single illiquidity premium) · 4.7 duration of the observable market · 4.8 the long-term (unobservable ultimate) rate |
| **5** | **Reference curves** — defining the curve in the observable and unobservable periods, and considerations for using the **CIA-published reference curves**: appropriateness of the risk-free rates, of the reference portfolio, of the share of spread treated as illiquidity premium and its shape, of any additional illiquidity premium on the illiquid curve, when to deviate, and [[Materiality\|materiality]] |

## The principle

IFRS 17 requires a rate that reflects the **characteristics of the liability** — its currency, timing and liquidity — and **not** the return on the assets backing it. That is the break from pre-2023 Canadian practice, where the discount rate was derived from the insurer's own portfolio (see [[CIA IFRS 17 - Comparison]]).

**Bottom-up**: risk-free curve **plus** an illiquidity premium. **Top-down**: the yield on a reference portfolio **less** credit risk and other adjustments not relevant to the liability. IFRS 17 does not require the two to reconcile.

## The judgements the exam probes

- **How illiquid are P&C liabilities?** Claim payments are largely fixed by the claims process rather than by the policyholder, so there is a case for a meaningful illiquidity premium — but a claimant can accelerate settlement, and short-tail liabilities are not illiquid in any useful sense. §4.6 is where this is argued, and the answer moves the liability.
- **Reinsurance held** may not share the illiquidity characteristics of the underlying (§4.6.2), yet a single premium is often applied (§4.6.3).
- **Beyond the observable market.** Canadian bond markets thin out at long durations; §4.7–4.8 govern where observation stops and an ultimate rate takes over, and how the curve is bridged — the assumption that dominates long-tail liability values.
- **Using the CIA reference curves.** Published curves are a convenience, not a safe harbour: §5.3 lists what must be true of the insurer's own liabilities before the curve is appropriate, and requires a deviation where it is not.
- **Payment pattern and timing** (§3) matter as much as the curve: mid-period versus end-period assumptions, and the pattern selected, change the discount as much as a rate change of practical size.

## Related readings
- [[CIA Duration]] — duration of interest-rate-sensitive insurance liabilities and assets
- [[CIA IFRS 2]] — the risk adjustment, the other half of the measurement
- [[CIA IFRS 17 - Comparison]] — the change from asset-based discounting

## Links
- [IFRS 17 Discount Rates and Cash Flow Considerations for P&C Insurance Contracts (CIA)](https://www.cia-ica.ca/publications/225109e/)
