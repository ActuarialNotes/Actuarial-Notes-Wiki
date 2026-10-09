---
target: Concepts/Reserving Data Organization.md
created: 2026-09-13
---

## [F-001] Report year called 'required' for claims-made; Friedland says preferred
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/f8d9
- date: 2026-09-13
- severity: nit
- status: open
- locus: bullet on Report Year
- claim: Report Year is required for claims-made business and preferred for severity triangles.
- evidence: Friedland Ch.3, printed p.42 (PDF p.48): for claims-made lines (medical malpractice, products liability, E&O, D&O) 'actuaries often prefer to use report year data for developing estimates of unpaid claims' -- a preference, not a requirement. Friedland adds cautions on the same page that cut against 'required': for some claims-made policies 'the notification date rather than the report date triggers the coverage', and extended reporting endorsements mean 'development beyond 12 months may be possible even for annual policies'. The rest of the bullet is confirmed on printed pp.42-43: the claim count 'is fixed at the close of the year (other than for claims reported but not recorded)', and report year techniques 'only measure development on known claims and not pure IBNR'.
- source_rank: 2
- proposed_action: Say report year is the customary/preferred basis for claims-made business rather than required.
- applied: false
- fingerprint: 8dc187a48259

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/f8d9
- date: 2026-09-13
- status_set: verified
- confidence: high
- checks_run: Each time basis diffed against Friedland Ch.3. Accident year: 'by far, the most common grouping of claims data for the actuarial analysis of unpaid claims' (printed p.40), with the caution that for self-insureds with high deductibles accident year data 'can mask changes in retention levels' (p.41). Policy/underwriting year: 'the greatest advantage... is a true match between claims and exposures', 'particularly useful for self-insureds where only one policy may apply', disadvantage 'the extended time frame... a policy year can extend over a 24-month time period' -- which is the page's 'longer, more leveraged development pattern' (pp.41-42). Report year: claim count 'is fixed at the close of the year (other than for claims reported but not recorded)', giving 'more stable data and more readily determinable development patterns', and report year techniques 'only measure development on known claims and not pure IBNR' (pp.42-43) -- the page's 'no pure IBNR, fixed count denominator' is exact. Calendar year: 'Calendar year data is transactional data... The primary uses of calendar year data for the actuary are the aggregation of exposures and diagnostic testing when analyzing accident year claims data' (p.39), which supports the page's 'never a cohort, always a diagnostic' bullet. Segmentation bullets (homogeneity vs credibility, gross/ceded/net kept separate, consistent recovery treatment, counts alongside dollars) match Ch.3's data discussion and Ch.5's limited-claims triangles (p.73). Worked the calendar-year-effect example independently: every factor on the 12/31/2024 diagonal exceeds its historical average (1.61 vs 1.53, 1.26 vs 1.20, 1.14 vs 1.08) at every maturity, which is the signature of a diagonal effect rather than an accident-year one, and the prescribed response (average case outstanding and closure-rate diagnostics, then Berquist-Sherman restatement) is Friedland's. One wording nit filed (F-001). LaTeX balanced; links and embed resolve.
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch.3 'Understanding the Types of Data Used in the Estimation of Unpaid Claims', printed pp.39-43 (PDF pp.45-49), and Ch.5 printed p.73 (PDF p.79), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/database/studynotes_friedland_estimating.pdf

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-001
- status: resolved
- note: Stands. Friedland Ch.3 printed p.42 (PDF p.48): for claims-made lines 'actuaries often prefer to use report year data' — a preference. Bullet rewritten: report year is the basis actuaries often prefer for claims-made business; no pure IBNR (p.43) and claim count fixed at the close of the year (p.42). The unsourced 'preferred for severity triangles' was dropped with it.

## [F-002] 'Retro programs' as a policy-year use is not in the source
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: nit
- status: open
- locus: Policy Year / Underwriting Year bullet
- claim: used where the contract, not the calendar, defines the cohort — reinsurance, large-deductible and retro programs
- evidence: Friedland Ch.3 printed pp.41-42 (PDF pp.47-48) names reinsurers (underwriting year), a 'shift from full coverage to large deductible policies' and self-insureds; 'retro' occurs nowhere in the text (full-text search this session).
- source_rank: 2
- proposed_action: Drop 'retro'.
- applied: true
- fingerprint: e7395470c4ab

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-002
- status: resolved
- note: 'and retro' deleted; the bullet now names reinsurance and large-deductible programs, as Friedland Ch.3 pp.41-42 (PDF pp.47-48) does.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- status_set: verified
- confidence: medium
- checks_run: F-001 re-read and fixed; each time basis diffed against Friedland Ch.3 (calendar year a diagnostic and exposure basis, accident year the most common, policy/underwriting year the true match with 24-month span, report year fixed count and no pure IBNR); segmentation bullets against Ch.3 p.29 (homogeneity characteristics) and Ch.14; calendar-year example recomputed (1.61 > 1.53, 1.26 > 1.20, 1.14 > 1.08 on the latest diagonal).
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch.3 pp.29, 39-43 (PDF pp.35, 45-49), Ch.4 p.44 (PDF p.50), Ch.5 p.73 (PDF p.79), Ch.13 p.288 (PDF p.294), Ch.14 pp.330-331 (PDF pp.336-337), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- note: F-001 fixed; one nit (F-002) found and fixed. Medium rather than the earlier high because the page carries vault-authored worked examples.
