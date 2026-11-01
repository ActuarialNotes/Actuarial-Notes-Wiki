---
target: Concepts/Trend.md
created: 2026-10-31
---

## [F-001] Exposure trend said to apply only in the pure premium method
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T18:55Z/3416
- date: 2026-10-31
- severity: major
- status: open
- locus: bullets, exposure trend
- claim: Exposure trend (e.g., wage growth for workers comp payroll) is applied only in the Pure Premium Method to adjust the denominator of the pure premium calculation.
- evidence: Werner & Modlin ch.5 p.82 (PDF p.94): for inflation-sensitive exposure bases 'it is typical to project exposures (and thus premium) to future inflationary levels', and the ch.5 summary p.88 lists 'exposure trend (when applicable)' among the adjustments the actuary must make to premium in a loss ratio analysis. Ch.4 p.62 says how exposure trend enters the indication 'depends on several factors such as whether the loss ratio or pure premium method is employed and how loss trends are calculated', and ch.6 p.119 (PDF p.131) that company frequency trends already carry the net effect of exposure change unless the denominator is adjusted. So 'only in the Pure Premium Method' is contradicted.
- source_rank: 3
- proposed_action: Restate the bullet to Werner & Modlin: arises with inflation-sensitive exposure bases; projected as part of premium in a loss ratio analysis; its effect on a pure premium indication depends on how loss trends were measured.
- applied: true
- fingerprint: 20a12fdf324b

## [F-002] Loss trend drivers omit frequency
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T18:55Z/3416
- date: 2026-10-31
- severity: minor
- status: open
- locus: bullets, loss trend
- claim: Loss trend captures inflation, social inflation, and severity changes.
- evidence: Werner & Modlin ch.6 pp.109-110 (PDF pp.121-122): 'These changes in frequency and severity are referred to as loss trends'; drivers named are monetary inflation, increasing medical costs, advancements in safety technology, social influences (ASOP 13's definition) and distributional changes. The page's list left frequency out of what loss trend is.
- source_rank: 3
- proposed_action: Restate to W&M: change in claim frequency and severity, with W&M's drivers.
- applied: true
- fingerprint: 0e33276a807a

## [F-003] Trend-to date given as 'midpoint of future rating period' without saying which period
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T18:55Z/3416
- date: 2026-10-31
- severity: minor
- status: open
- locus: formula 2; bullet 3; example stem
- claim: Trend Period = Midpoint of future rating period - Midpoint of historical period; trend-to date is the 'midpoint of the prospective rating period'.
- evidence: Werner & Modlin ch.6 p.113 (PDF p.125): the trend period runs from the average loss occurrence date of the experience period to the average loss occurrence date of the forecast period; with rates effective 1/1/2015 for one year on annual policies the trend-to date is 12/31/2015, the midpoint of the two years the policies' coverage spans, not the midpoint of the year the rates are in effect (4.5 years from AY 2011). The SOA's FAM-S sample solutions (Q76, Q96, Q107) use the same dates but call the forecast date 'the midpoint of the effective period' (e.g., Q96: rates effective April 1 CY9, midpoint of the effective period April 1 CY10). 'Midpoint of future rating period', undefined, reads naturally as the midpoint of the period the rates are in effect, which is six months early for annual policies. Terminology difference CAS vs SOA noted, not reconciled.
- source_rank: 1
- proposed_action: Restate the formula in W&M's words (average accident date of forecast period minus that of experience period), say in the bullet what the forecast period's midpoint is, and relabel the example's two dates accordingly.
- applied: true
- fingerprint: baf3a3727f78

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T18:55Z/3416
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Bullet restated to Werner & Modlin ch.4 p.62 / ch.5 pp.82, 88 / ch.6 p.119 in this run.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T18:55Z/3416
- date: 2026-10-31
- resolves: F-002
- status: resolved
- note: Bullet restated to Werner & Modlin ch.6 pp.109-110 in this run.

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T18:55Z/3416
- date: 2026-10-31
- resolves: F-003
- status: resolved
- note: Formula, bullet and example labels restated to Werner & Modlin ch.6 p.113 in this run; the example's numbers are unchanged.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T18:55Z/3416
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: read every link first (Loss Ratio Method, Pure Premium Method: right pages, U.S./CAS-SOA neutral); every formula and bullet against Werner & Modlin ch.4-6; trend-period convention against the SOA FAM-S sample solutions; example recomputed before reading its answer
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 4 pp.61-62 (Exposure Trend); Ch. 5 pp.81-82, 88; Ch. 6 pp.109-110 (Loss Trend), 112-115 (trend periods), 119 (PDF pp.73-74, 93-94, 100, 121-122, 124-127, 131), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; SOA Exam FAM-S sample solutions (Oct 2024), Q69, Q76, Q95, Q96, Q107 (pp.29, 31, 37), sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf
- note: Exponential trend factor (1+r)^n matches W&M ch.6 (e.g. 1.01^4.5). Example recomputed independently: 1.04^3 = 1.124864 -> 1,124,864; 1.02^3 = 1.061208 -> 53,060,400; 1,124,864/53,060,400 = 0.02120 per $1 = $2.12 per $100 payroll, as printed. Three findings (one major, two minor) fixed by restatement in this run. Brown & Lennox (FAM's and ASTAM's reading, ch.4.6-4.7.2) is commercial and was not read; FAM-S solutions Q69/Q76/Q95/Q96/Q107 show the SOA applies the same trend-from/trend-to convention under the name 'midpoint of the effective period'. Rule 6: no other exam had this page verified (it was unverified), so no re-check is owed.
