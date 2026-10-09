---
target: Concepts/Premium Trend.md
created: 2026-09-12
---

## [F-001] Premium trend period is not systematically longer than the loss trend period
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/f2bc
- date: 2026-09-12
- severity: major
- status: open
- locus: bullet 2 ('The trend period n runs from the average written date…')
- claim: '…— further out than the loss trend period, because premium is trended from when policies were written rather than when losses occurred.'
- evidence: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 5 pp. 84-85 (PDF pp. 96-97): for CY 2011 earned premium projected to annual policies written 1/1/2013-12/31/2013, the average written date of policies earning in CY 2011 is 1/1/2011 and the average written date of the projection period is 6/30/2013 — a 2.5-year premium trend period. The loss trend period for the identical setup (Ch. 6, avg. loss date of AY 2011 = 7/1/2011 to avg. loss date of PY 2013 = 12/31/2013) is also 2.5 years. Werner makes the general point explicitly on p. 85: computing the premium trend period from earned dates instead of written dates gives 'still 2.5 years as each date was shifted by the same amount'. For 6-month policies Werner's trend-from date moves to 4/1/2011, making the premium trend period 2.25 years — i.e. *shorter*, not longer. The first half of the bullet (average written date to average written date) is correct and matches Werner p. 84.
- source_rank: 2
- proposed_action: Delete or replace the 'further out than the loss trend period' clause; for a standard annual-policy calendar-year analysis the two periods are the same length because both endpoints shift by the same six months, and for shorter policy terms the premium trend period is shorter.
- applied: false
- fingerprint: 704d2764d349

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/f2bc
- date: 2026-09-12
- status_set: verified
- confidence: medium
- checks_run: Recomputed both examples from scratch before reading the answers. One-step: 1.03^2 = 1.0609, 5,000,000 x 1.0609 = $5,304,500, and the 'overstate by 6% relative' remark checks at 6.09%. Two-step: Step 1 = 798/835 = 0.95569 (correctly the latest average *written* premium over the experience year's average *earned* premium, which is Werner's Appendix A Column 5 = Column 4 / Column 3), Step 2 = 1.010^1.75 = 1.017563, combined 0.97252, i.e. a 2.75% downward trend — all reproduce. The two-step rationale (the historical earned series still contains pre-shift policies, so the fitted trend misleads) matches Werner p. 86 (PDF p. 98) and the deductible-shift example he gives at Ch. 7 p. 132 (PDF p. 144). The premium-trend-period definition (average written date of policies earning in the historical period to average written date of policies in effect when the rates are) is Werner p. 84 verbatim — but the page's added claim that this period is 'further out than the loss trend period' is contradicted by Werner pp. 84-85 and is F-001 (major, open), which is why confidence is medium rather than high. Links, embed and LaTeX clean.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 5 pp. 82-88 (PDF pp. 94-100), Premium Trend: Table 5.24, One-Step Trending and the trend period (Figs. 5.26-5.27), Two-Step Trending, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Appendix A p. A-3 (PDF p. 341), Premium Trend Exhibit Sheet 3, Columns 4-9, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-001
- status: resolved
- note: Werner Ch.5 pp.84-85 (PDF pp.96-97) re-read: CY 2011 earned premium projected to annual policies written in 2013 trends from 1/1/2011 to 6/30/2013 = 2.5 years; 'The trend period is still 2.5 years as each date was shifted by the same amount' when measured between average earned dates; for six-month policies the trend-from date is 4/1/2011 and the length 2.25 years. The 'further out than the loss trend period' clause is deleted and bullet 2 now gives Werner's definition (average written date of policies earning in the experience period to the average written date of policies in effect while the rates are) with his 2.5- and 2.25-year cases.

## [F-002] Definition folds inflation-sensitive exposure bases into premium trend; Werner treats that as exposure trend
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: opening definition
- claim: Premium trend is 'the drift caused by shifts in amounts of insurance, limits, deductibles, mix of business and inflation-sensitive exposure bases'.
- evidence: Werner Ch.5 pp.81-82 (PDF pp.93-94) separates the two: 'Exposure Trend ... the average premium level can change over time due to inflation in lines of business with exposure bases that are inflation-sensitive, like payroll'; 'Premium Trend: In addition to inflationary pressure, the average premium level can change over time due to changes in the characteristics of the policies written. These changes are referred to as distributional changes, and the resulting change in average premium level is commonly referred to as premium trend.'
- source_rank: 2
- proposed_action: Define premium trend as distributional change and point inflation in the exposure base to Exposure Trend.
- applied: true
- fingerprint: 83e97e24f857

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-002
- status: resolved
- note: Definition now: drift from distributional shifts in the policies written, distinct from rate changes (on-levelling) and from inflation in an inflation-sensitive exposure base, which Werner treats as [[Exposure Trend]] (pp.81-82, PDF pp.93-94).

## [F-003] Measurement bullet presents exponential regression as the standard; Werner says curve-fitting is usually unnecessary
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: bullet 1
- claim: '... usually from written data (which reflects what is being sold now) fitted with an exponential regression over the last several quarters or years.'
- evidence: Werner Ch.5 p.84 (PDF p.96): 'Sometimes the actuary fits an exponential or linear trend to the data to guide the selection; however, as the changes in average written premium are normally pretty consistent from one time period to the next, curve-fitting is usually not necessary.' p.83 (PDF p.95): written premium is 'a leading indicator', and quarterly average written premium is often used; the average is per exposure.
- source_rank: 2
- proposed_action: Restate per Werner pp.83-84.
- applied: true
- fingerprint: 0a5021764dcf

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-003
- status: resolved
- note: Bullet 1 now: average premium per exposure at current rate level, usually written (a leading indicator), often quarterly; an exponential or linear fit may guide the selection though curve-fitting is usually unnecessary (Werner pp.83-84, PDF pp.95-96).

## [F-004] Premium trend in a pure premium indication called a 'double count'
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: bullet 'Applying premium trend in a Pure Premium Method indication'
- claim: 'Applying premium trend in a Pure Premium Method indication is a double count: that method never divides by premium, and the same phenomenon is captured there by exposure trend in the denominator.'
- evidence: Werner Ch.5 p.64 (PDF p.76): 'Only the loss ratio approach requires the actuary to estimate the premium to be collected during the future time period; therefore, if the actuary plans to utilize the pure premium approach, the adjustments included within this chapter are not required.' Premium trend is not double counted there — it simply has no premium to apply to — and exposure trend is Werner's term for inflation in the exposure base (p.81), not for distributional change.
- source_rank: 2
- proposed_action: Say premium trend is not needed for a pure premium indication, per Werner p.64.
- applied: true
- fingerprint: b8d3f966f081

## [F-004/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-004
- status: resolved
- note: Bullet now: 'Premium trend is not needed for a Pure Premium Method indication: only the loss ratio approach requires the actuary to estimate the premium to be collected in the future period.' (Werner p.64, PDF p.76.)

## [F-005] 'Where premium trend matters' bullet repeats the exposure-trend conflation and its examples are not Werner's
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: bullet 'Premium trend matters most where the exposure base inflates'
- claim: 'Premium trend matters most where the exposure base inflates (Exposure Trend) or where the book is drifting — rising homeowners amounts of insurance, higher liability limits, shifting deductible mix. Where the exposure base is a stable count and mix is stable, the trend is near zero and may be omitted.'
- evidence: Werner Ch.5 p.82 (PDF p.94) gives three representative circumstances: homeowners amount of insurance 'generally indexed such that it increases automatically with inflation', moving all insureds to a higher deductible, and acquiring a book of predominantly high-valued homes; and says the actuary must 'decide whether observed distributional shifts were caused by a one-time event or a shift that is expected to continue'. Inflation in the exposure base is exposure trend (p.81).
- source_rank: 2
- proposed_action: Use Werner's three examples and his one-time-or-continuing decision.
- applied: true
- fingerprint: 1bb3fa4df9f4

## [F-005/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-005
- status: resolved
- note: Bullet rewritten to Werner p.82 (PDF p.94): the three examples, the one-time-or-continuing decision, and 'where the mix is stable the trend is near zero'.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- status_set: verified
- confidence: medium
- checks_run: Re-read Werner Exposure Trend, Premium Trend, One-Step and Two-Step Trending this session. Formulas checked: average premium at CRL; trend factor (1+t)^n (p.86, 1.02^2.5 = 1.0508); two-step Step 1 = latest average written premium at CRL / historical average earned premium at CRL (p.86, 753/740 = 1.0176), Step 2 projected from the latest point's average written date (p.87). Examples recomputed before reading: 1.03^2 = 1.0609, 5,000,000 x 1.0609 = 5,304,500, LR overstated by 6.09% relative; 798/835 = 0.95569, 1.01^1.75 = 1.01757, product 0.97249, -2.75%.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 5 p.64 and pp.81-88 (PDF p.76, pp.93-100), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf
- note: F-001 resolved; four new minor findings fixed and resolved. Confidence medium: both worked examples are vault-authored (recomputed), and the first labels calendar-year earned premium 'accident year 2024' (Werner's 'calendar-accident year' usage makes this tolerable).
