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
