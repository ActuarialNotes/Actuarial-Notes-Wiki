---
target: Concepts/Underwriting Year.md
created: 2026-09-13
---

## [F-001] Underwriting year defined by bind date rather than effective date
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/f8d9
- date: 2026-09-13
- severity: minor
- status: open
- locus: opening definition sentence
- claim: Underwriting Year groups all premium and losses by the year in which the contract was bound.
- evidence: Friedland Ch.3, printed p.41 (PDF p.47): 'Underwriting year data, which is frequently used by reinsurers, refers to claims data grouped by the year in which the reinsurance policy became effective.' Effective (inception) date, not bind date: a treaty bound in December 2023 and effective 1/1/2024 is UY 2024 under Friedland, UY 2023 under the page's sentence. The page's own examples use inception ('a quota share treaty incepting 1/1/2024', 'a treaty bound 1/1/2024' where bind and inception coincide), so only the defining sentence diverges. Friedland printed pp.41-42 also confirms the rest of the page's UY framing: policy year and underwriting year are treated together, the advantage is 'a true match between claims and exposures', and the primary disadvantage is 'the extended time frame... a policy year can extend over a 24-month time period', which is exactly the page's 24-month exposure window for a 2024 treaty on annual policies.
- source_rank: 2
- proposed_action: Define the cohort by the year the contract became effective (incepted), matching Friedland p.41.
- applied: false
- fingerprint: 1881a0b19464

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/f8d9
- date: 2026-09-13
- status_set: verified
- confidence: medium
- checks_run: Friedland printed p.41 defines the basis -- 'Underwriting year data, which is frequently used by reinsurers, refers to claims data grouped by the year in which the reinsurance policy became effective' -- and treats policy year and underwriting year together, which confirms the page's 'on a direct book, underwriting year and policy year are the same thing'. The advantage the page states (exact match of premium to exposure under one set of contract terms) is Friedland p.42, 'a true match between claims and exposures (e.g., premiums)'; the disadvantage (slowest-developing basis) is the same page, 'the extended time frame... generally resulting in a longer time until all the claims are reported and a longer time until the ultimate claims can be reliably estimated', and Friedland's 24-month span is exactly the page's window. Worked the exposure-window example independently: a treaty incepting 1/1/2024 covering 12-month policies written through 12/31/2024 is exposed to accidents through 12/31/2025, a 24-month window, with reports running well past it at a nine-month average lag -- correct. The 'same claim, three cohorts' table is right on its own definitions (UY 2024 by treaty, PY 2024 by 7/1/2024 policy inception, AY 2025 by the 3/15/2025 accident). One finding: F-001, the defining sentence uses the bind date where Friedland uses the effective date. Medium confidence because three claims are outside this source -- Lloyd's year of account terminology, UY as the standard basis for treaty reinsurance pricing, and BF/expected-loss being the usual reserving choice at early UY maturities -- all plausible and consistent with Friedland's leverage argument, but not stated in the Exam 5 readings I could reach. LaTeX balanced; links and embed resolve.
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch.3 printed pp.41-42 (PDF pp.47-48), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/database/studynotes_friedland_estimating.pdf

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-001
- status: resolved
- note: Already fixed in commit 2276b9a0: the definition and the loss-ratio formula now group by the year the reinsurance contract became effective (incepted), matching Friedland 2010 Ch.3 printed p.41 (PDF p.47) and Friedland, Reserving for Reinsurance, printed pp.35-36 (PDF pp.37-38), 'the year in which the reinsurance policy became effective (i.e., the year in which the contract was incepted)'.

## [F-002] Example's accident window ends 12/31/2025; Friedland's convention and the page's own bullet end it 12/30
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: nit
- status: open
- locus: Example 'How Long a 2024 Treaty Stays Exposed', answer
- claim: The last policy … is written 12/31/2024 and expires 12/31/2025 … Accident dates run 1/1/2024 through 12/31/2025.
- evidence: Friedland 2010 Ch.3 printed p.41 (PDF p.47): 'claims for annual policies with a beginning effective date of December 31, 2008 will have occurrence dates between December 31, 2008 and December 30, 2009'; Reserving for Reinsurance printed p.36 (PDF p.38): a 1/1/2020 treaty covers policies with 'accident dates between January 1, 2020 and December 30, 2021'. The page's own second bullet already uses this convention (12/30/2025, 12/29/2026); the example used another.
- source_rank: 2
- proposed_action: End the example's accident window at 12/30/2025.
- applied: true
- fingerprint: 859a92e0fc4f

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-002
- status: resolved
- note: Example now ends the last policy and the accident window at 12/30/2025, Friedland's convention (2010 p.41; Reserving for Reinsurance p.36). Still a 24-month window.

## [F-003] Treaty said to be 'barely half-written' at 12/31/2024
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: Example 'How Long a 2024 Treaty Stays Exposed', answer, last paragraph
- claim: At 12 months of maturity (12/31/2024) the treaty is barely half-written
- evidence: By the example's own terms the treaty covers policies written during calendar 2024, so at 12/31/2024 every subject policy has been written; what is incomplete is the earning — with writings spread through the year, about half the premium is earned. Friedland, Reserving for Reinsurance, printed p.36 (PDF p.38) names exactly this: at immature underwriting years 'the written premium is not fully earned'.
- source_rank: 2
- proposed_action: Say the premium is only about half-earned.
- applied: true
- fingerprint: 37e0c7c4685d

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-003
- status: resolved
- note: Changed to 'the treaty's premium is only about half-earned' (Reserving for Reinsurance printed p.36, PDF p.38).

## [F-004] 'Year of account', UY as the pricing standard and 'usually' BF/expected are not in the sources
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: opening sentence ('also called year of account'); fourth bullet
- claim: Underwriting Year, also called year of account or treaty year … UY is standard at Lloyd's and in treaty reinsurance pricing, and it is the basis on which a reinsurer's BF and expected loss reserving is usually performed.
- evidence: Friedland, Reserving for Reinsurance, printed p.35 (PDF p.37): 'Underwriting year is also referred to as treaty year and contract year'; UY 'is frequently used by European reinsurers and Lloyds of London' (also Friedland 2010 p.40: at Lloyd's 'financial reporting by underwriting year is more common'). 'Year of account' occurs nowhere in either text. On pricing it says only that UY experience 'can be important when underwriting or pricing changes occur' (p.36). On methods: immature UYs have 'highly leveraged' CDFs and unearned premium (p.36), and the expected method is used when development factors 'are too highly leveraged' (p.51, PDF p.53) — which supports the reasoning, not 'usually'. Reinsurers 'often use underwriting year aggregation for the development of best estimates' while relying on accident year for financial reporting (p.36). These were the three claims the 2026-09-13 pass left as unsourced.
- source_rank: 2
- proposed_action: Use the source's aliases (treaty year, contract year) and restate the bullet in the study note's terms.
- applied: true
- fingerprint: 182fc99f9713

## [F-004/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-004
- status: resolved
- note: Aliases now 'treaty year or contract year'; fourth bullet rewritten to Reserving for Reinsurance printed pp.35-36, 51 (PDF pp.37-38, 53): UY frequently used by European reinsurers and at Lloyd's, reinsurers often estimate ultimates by UY while reporting by accident year, and at early maturities (leveraged CDFs, unearned premium) the expected and BF methods take over from the chain ladder.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- status_set: verified
- confidence: medium
- checks_run: Re-verified the lines changed since the 2026-09-13 pass (commit 2276b9a0): inception wording, the risks-attaching three-calendar-year / 36-month window and its dates (12/31/2024 treaty: policies to 12/30/2025, accidents to 12/29/2026) all match Reserving for Reinsurance printed p.36 (PDF p.38), which gives the same example for 2020. Whole page re-read against both Friedland texts; both examples re-worked (24-month window; UY 2024 / PY 2024 / AY 2025; 1/1/2024 to 3/15/2025 is about 15 months).
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch.3 pp.40-42 (PDF pp.46-48), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; Friedland, Reserving for Reinsurance (CAS Exam 7 study note), Ch.2 printed pp.35-37 (PDF pp.37-39), Ch.3 printed pp.49, 51-52 (PDF pp.51, 53-54), sha256:6da495a26206ececf40a3c3fc8fb3db04556c940242f5bcffe2b21b7e4445ceb — https://www.casact.org/sites/default/files/2022-11/Exam7_Study_Note_Friedland.pdf
- note: Stale page re-verified. F-001 already fixed; three new findings (one nit, two minor) found and fixed. Medium: vault-authored examples.
