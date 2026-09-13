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
