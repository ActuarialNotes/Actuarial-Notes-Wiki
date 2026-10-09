---
target: Concepts/Overall Rate Level Indication.md
created: 2026-09-12
---

## [F-001] Displayed rounding chain does not reproduce the stated indicated factor
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/f2bc
- date: 2026-09-12
- severity: minor
- status: open
- locus: Example 1 'Full Overall Indication', indicated-factor display
- claim: The page shows (0.794 + 0.06)/(1 - 0.23 - 0.05) = 0.854/0.72 = 1.1854, an indication of +18.5%.
- evidence: Recomputation: 0.854/0.72 = 1.186111, i.e. +18.6%, not 1.1854. The 1.1854 is right but comes from the unrounded loss ratio: total trended losses $21,365K / on-level premium $26,925K = 0.793500, and (0.7935 + 0.06)/0.72 = 1.185417. The page rounds the loss ratio to 79.4% one line earlier and then carries 0.854 into a division that yields a different answer. Every other figure in the example reproduces exactly: 7,100 x 1.16 x 1.06^3 x 1.10 = 10,790K; 6,200 x 1.38 x 1.06^2 x 1.10 = 10,575K; 12,000 x 1.085 = 13,020K; 13,500 x 1.030 = 13,905K; credibility 0.80 x 18.5% + 0.20 x 2.0% = 15.2%; and all three sensitivity rows (+13.4%, +15.4%, +15.3%). The formula itself matches Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 8 pp. 143-145 (PDF pp. 155-157): Indicated Change Factor = (Loss & LAE Ratio + Fixed Expense Ratio)/(1.0 - Variable Expense % - Target UW Profit %), with Werner's own check (0.65 + 0.065)/(1.0 - 0.25 - 0.10) = 1.10.
- source_rank: 5
- proposed_action: Show the unrounded loss ratio in the division — (0.7935 + 0.06)/0.72 = 1.1854 — rather than 0.854/0.72. Not applied here: the alternative repair (keeping 0.854 and restating the indication as +18.6%, which would move the credibility-weighted answer to +15.3%) is an equally defensible reading, so the choice is the author's.
- applied: false
- fingerprint: 55eca7cee320

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/f2bc
- date: 2026-09-12
- status_set: verified
- confidence: high
- checks_run: Recomputed the whole indication from scratch before reading any stated figure. Losses: 7,100 x 1.16 x 1.06^3 x 1.10 = $10,790.1K; 6,200 x 1.38 x 1.06^2 x 1.10 = $10,574.9K. On-level premium: $13,020K and $13,905K. Loss ratios 82.87% and 76.05%; combined 21,365/26,925 = 79.35%. Indicated factor (0.7935 + 0.06)/0.72 = 1.18542 = +18.5%; credibility 0.80(18.5) + 0.20(2.0) = +15.2%. Re-derived all three sensitivity rows independently: loss trend 4% -> 20,370K losses, LR 75.66%, +13.42%; AY 2024 CDF 1.30 -> 20,752K, LR 77.07%, +15.38%; profit 3% -> 0.8535/0.74 = +15.34%. Every one matches the table. The headline formula matches Werner Ch. 8 p. 143 (PDF p. 155) exactly, and the ordering of the build-up (premium to current rate level and trended; losses developed, trended, adjusted for benefit/coverage change, loaded for ALAE and ULAE; fixed in the numerator and variable in the denominator; profit; credibility; selection) tracks Werner Chs. 5-8. One minor finding on a displayed rounding chain (F-001, open): 0.854/0.72 = 1.1861, not the stated 1.1854, which comes from the unrounded 0.7935. Links, embed and LaTeX clean.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 8 pp. 141-146 (PDF pp. 153-158), Overall Indication: Pure Premium Method, Loss Ratio Method, derivation of the indicated rate change formula, and Werner-s check (0.65 + 0.065)/(1.0 - 0.25 - 0.10) = 1.10, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-001
- status: resolved
- note: Recomputed: 21,365/26,925 = 0.79350; (0.7935 + 0.06)/0.72 = 1.18542 (+18.5%), whereas 0.854/0.72 = 1.18611. The display now carries the unrounded ratio — combined loss ratio shown as 79.35% and the division as (0.7935 + 0.06)/(1 - 0.23 - 0.05) = 0.8535/0.72 = 1.1854 — so the printed chain reproduces the stated +18.5% and the credibility-weighted +15.2% (0.80 x 18.54% + 0.20 x 2.0% = 15.23%) is unchanged. Formula per Werner Ch.8 p.143 (PDF p.155).

## [F-002] Build-up said to follow 'the order Werner performs it'; Werner prescribes no order, and the losses step put large-loss and catastrophe adjustments after trending
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: intro line to the numbered build-up, and steps 1-2
- claim: 'The build-up, in the order Werner performs it:' ... '2. Losses — reported losses developed to ultimate, trended to the future cost level, adjusted for large losses, catastrophes and any benefit or coverage change, then loaded for ALAE and ULAE.' Step 1 omitted premium development.
- evidence: Werner Ch.6 p.94 (PDF p.106): 'This text will not prescribe a specific order for the various adjustments to historical losses', but extraordinary losses are removed first and replaced with a provision, and a catastrophe provision is added to losses already trended and developed. Werner Ch.5 p.64 (PDF p.76): premium is brought to current rate level, developed to ultimate if still changing, and trended. Same issue as Loss and Loss Adjustment Expense F-003.
- source_rank: 2
- proposed_action: Say the list follows Werner's chapters, not an order; put the large-loss and catastrophe replacement first; add premium development.
- applied: true
- fingerprint: 8927f995c98f

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-002
- status: resolved
- note: Intro now 'following Werner & Modlin's chapters'; step 1 adds 'developed to ultimate where it is still changing'; step 2 now replaces extraordinary losses with a long-term provision before developing and trending and says Werner prescribes no single order (Werner p.64, PDF p.76; p.94, PDF p.106).

## [F-003] Net cost of reinsurance placed under the profit step
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: build-up step 4
- claim: '4. Profit — the target underwriting profit provision Q_T, plus the net cost of reinsurance if the analysis is gross.'
- evidence: Werner Ch.7 p.137 (PDF p.149) and Ch.6 p.99 (PDF p.111): 'the net cost of the non-proportional reinsurance (i.e., the cost of the reinsurance minus the expected recoveries) may be included as an expense item in the overall rate level indication'; Ch.7 summary p.139 (PDF p.151): 'companies may also explicitly consider the cost of reinsurance as an expense'. It is an expense, not part of the profit provision.
- source_rank: 2
- proposed_action: Move it to the expense step.
- applied: true
- fingerprint: 05423b5376b9

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-003
- status: resolved
- note: Step 3 now ends 'the net cost of non-proportional reinsurance may be included as an expense item'; step 4 is the profit provision alone (Werner p.137, PDF p.149).

## [F-004] Unsourced claims about regulators and ASOP 13, and a causal claim the numbers do not show
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: bullets 'Weighting across years' and 'The indication is an estimate with a distribution'; example 1 closing paragraph; example 2 closing paragraph
- claim: '... belongs in the documentation and is what a reviewing regulator will ask for'; 'the two years disagree by nearly seven points, most of which comes from the 1.38 CDF on the immature year'; 'This is the practical reason ASOP 13 devotes itself to trending procedures, and why the trend selection is the first thing a reviewing actuary or regulator interrogates.'
- evidence: No source read (Werner Ch.8, ASOP 13) says what a regulator asks for or interrogates first, or why ASOP 13 exists. ASOP 13 §3.8 (PDF p.8) asks for documentation 'in a form such that another actuary qualified in the same practice area could assess the reasonableness of the actuary's work'. The CDF claim is not shown by the numbers: AY 2024 has the larger CDF yet the lower loss ratio (76.1% vs 82.9%), so the 1.38 does not explain the gap. Werner Ch.8 p.147 (PDF p.159) gives the weighting choices as summing across years (premium-weighting) or selecting weights favouring recent years.
- source_rank: 2
- proposed_action: Delete the regulator and 'reason ASOP 13 exists' claims; restate the weighting bullet per Werner p.147; say only that the less mature year rests on a 1.38 CDF.
- applied: true
- fingerprint: 3218605691c6

## [F-004/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-004
- status: resolved
- note: Weighting bullet now Werner p.147 (PDF p.159); regulator clause deleted; example 1's closing now says 'the two years disagree by nearly seven points while the less mature year rests on a 1.38 CDF'; example 2's closing now says ASOP 13 sets the standard for the trending procedure, including documentation another actuary could assess (§3.8).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- status_set: verified
- confidence: medium
- checks_run: Headline formula against Werner p.143 (rendered) and p.145's worked +10%; pure premium indicated rate / current rate - 1 against pp.141, 146; LR method gives a change and PP a rate against p.146; credibility and selection steps against Werner's chapter plan (p.141). Example 1 recomputed before reading: 7,100 x 1.16 x 1.06^3 x 1.10 = 10,790.1K; 6,200 x 1.38 x 1.06^2 x 1.10 = 10,574.9K; premium 13,020K and 13,905K; LRs 82.87% and 76.05%; 21,365/26,925 = 79.35%; 0.8535/0.72 = 1.18542; 0.8 x 18.54 + 0.2 x 2.0 = 15.2%. Sensitivities re-derived: trend 4% -> +13.41%; AY 2024 CDF 1.30 -> +15.38%; profit 3% -> +15.34%.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 5 p.64 (PDF p.76); Ch. 6 p.94 (PDF p.106); Ch. 7 pp.137, 139 (PDF pp.149, 151); Ch. 8 pp.141-148 (PDF pp.153-160), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; ASOP No. 13, Trending Procedures in Property/Casualty Insurance (ASB, 2009), Section 3.8, p.4 (PDF p.8), sha256:5d985e9cbf666cda56b67bb6489e2f1430313278145e87816c7b2297dcd59acd — https://www.casact.org/sites/default/files/2021-03/5_ASOP_13.pdf
- note: F-001 resolved; three new minor findings fixed and resolved. Confidence medium: vault-authored examples and framing (retention remark, 'estimate with a distribution').
