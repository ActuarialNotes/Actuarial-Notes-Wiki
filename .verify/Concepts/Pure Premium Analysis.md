---
target: Concepts/Pure Premium Analysis.md
created: 2026-10-31
---

## [F-001] Class indication as PP / (rate x PLR) - 1 holds only when all expenses are variable
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:34Z/d6ef
- date: 2026-10-31
- severity: major
- status: open
- locus: Example 'Testing Rate Adequacy by Class', premise and 'Indicated change' column
- claim: With a 'permissible loss ratio of 62%', the indicated change is projected PP / (rate x PLR) - 1.
- evidence: Werner Ch.7 p.139 (PDF p.151) defines the total PLR = 1 - F - V - Q_T and the variable PLR = 1 - V - Q_T, and says 'If all expenses are treated as variable expenses, the VPLR and PLR are the same.' The loss ratio indication (Ch.8 pp.145-146, PDF pp.157-158) is (LR + F)/(1 - V - Q_T). PP/(rate x PLR) - 1 = LR/PLR - 1 equals that only when F = 0: e.g. LR 0.60, F 0.10, V 0.20, Q 0.05 gives -7.7% by the page's ratio and -6.7% by Werner's formula. The direction test in bullet 2 (ratio above 1.0 means inadequate) holds in general, since LR > 1 - F - V - Q iff LR + F > 1 - V - Q; only the magnitude needs the condition. Recomputed the example: 1.984, 2.480, 1.116 implied PP; -6.25%, +12.5%, +11.1%.
- source_rank: 2
- proposed_action: State the source's condition in the example's premise.
- applied: true
- fingerprint: 505eec570e4d

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:34Z/d6ef
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Applied: the premise now adds 'all expenses are treated as variable, so the permissible loss ratio and the variable permissible loss ratio are the same' (Werner p.139's condition). The figures are unchanged and now follow.

## [F-002] Class indications combined by exposure rather than premium
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:34Z/d6ef
- date: 2026-10-31
- severity: minor
- status: open
- locus: Example 'Testing Rate Adequacy by Class', closing paragraph
- claim: 'The overall indication is the exposure-weighted combination of these.'
- evidence: The class indications are loss-ratio-type ratios (projected PP over rate x PLR). Their overall is sum(PP_i X_i) / sum(rate_i PLR X_i) - 1, i.e. each class's ratio weighted by its premium at current rates, rate_i x X_i. Werner Ch.8 p.147 (PDF p.159): summing losses and dividing by premium 'is equivalent to weighting each year's loss and LAE ratio (pure premium) by the relevant premium (or exposure)', premium for a ratio to premium and exposure for a pure premium. Exposure weights would be correct only for the pure premiums themselves, not for these ratios.
- source_rank: 2
- proposed_action: Read 'premium-weighted'.
- applied: true
- fingerprint: 378f51b27ce1

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:34Z/d6ef
- date: 2026-10-31
- resolves: F-002
- status: resolved
- note: Applied: 'exposure-weighted' replaced by 'premium-weighted'.

## [F-003] Rate changes named as something pure premium must explain
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:34Z/d6ef
- date: 2026-10-31
- severity: minor
- status: open
- locus: bullet 5 (reserving)
- claim: 'A series that jumps in a way trend and rate changes cannot explain points at the estimate'.
- evidence: Bullet 1 of the same page, and Werner Ch.8 p.146 (PDF p.158): the pure premium statistic is losses over exposures and does not require premium at current rate level, so a rate change does not move it. Friedland Ch.15 (PDF p.352) asks for pure premiums, frequencies and severities to be reviewed 'for reasonableness from the perspective of year-to-year changes'; rate changes are relevant to claim ratios, not to pure premiums.
- source_rank: 2
- proposed_action: Delete 'and rate changes'.
- applied: true
- fingerprint: a4bfcdce0da7

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:34Z/d6ef
- date: 2026-10-31
- resolves: F-003
- status: resolved
- note: Applied: the clause now reads 'in a way trend cannot explain'.

## [F-004] Frequency/severity remedies not in the readings
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:34Z/d6ef
- date: 2026-10-31
- severity: minor
- status: open
- locus: bullet 4 ('actionable')
- claim: A frequency problem calls for underwriting, classification and risk-control responses; a severity problem calls for rate, limits, deductibles and claims handling.
- evidence: Neither Werner (Ch.1, 8, 9 read; frequency and severity defined, pure premium = frequency x severity) nor Friedland Ch.15 assigns remedies to a frequency versus a severity problem. Werner Ch.14 pp.263-264 lists loss-reduction actions (portfolio, coverage, loss control) without tying them to frequency or severity. Stated as fact with no source.
- source_rank: 2
- proposed_action: Cite a source for the mapping or drop the bullet.
- applied: false
- fingerprint: 3a0ba6a14a3a

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:34Z/d6ef
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: Router left this concept unnamed; searched Werner for 'pure premium approach' (Ch.9) and 'pure premium method' (Ch.8) and Friedland for 'pure premiums' (Ch.15 final checks). Definition and both formulas against Werner Ch.8/Ch.9 (PP = losses and LAE / exposures; relativity_i = PP_i / PP_base). Bullet 1 against Ch.8 p.146 (no premium at current rate level needed; preferable when on-level premium is hard; must be used for a new line). Bullet 2 against Ch.7 p.139 and Ch.8 pp.145-146 (F-001). Bullet 3 against Ch.9 (univariate distortion, credibility; multivariate as the remedy). Bullet 5 against Friedland Ch.15 p.352. Both examples recomputed before reading the answers: PP $300/$220/$150, relativities 2.00/1.47/1.00; implied PP 1.984/2.480/1.116, changes -6.25%/+12.5%/+11.1%. All reproduce.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.7 p.139 and Ch.8 pp.145-149 (PDF pp.151, 157-161), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.9 pp.161, 165-166 (PDF pp.173, 177-178), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, v3 2010), Ch. 15 Evaluation of Techniques (PDF p.352), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- note: Three fixes applied (one major missing condition, two minor). One minor unsourced bullet (frequency/severity remedies, F-004) left open. Display of -6.25% as -6.2% is round-half-even, not an error.
