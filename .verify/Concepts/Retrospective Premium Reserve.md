---
target: Concepts/Retrospective Premium Reserve.md
created: 2026-10-11
---

## [F-001] Example stem reads cumulative where it means incremental
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rda
- date: 2026-10-11
- severity: minor
- status: open
- locus: example 'PDLD and CPDLD Ratios from Plan Parameters', stem
- claim: 'Losses emerge 80% by the first adjustment, 12% by the second and 8% by the third (the last). The loss capping ratios are 0.90, 0.60 and 0.40.'
- evidence: The working treats 12% and 8% as incremental emergence (weights summing to 100%) and uses 0.60 and 0.40 directly in PDLD_n = [(CL_n - CL_{n-1})/(L_n - L_{n-1})] x LCF x TM, i.e. as incremental capping ratios. Teng and Perkins distinguish the capping ratio developed through each adjustment from the incremental one used in the PDLD (PDF pp.17, eq. 5.2) and weight CPDLDs by 'the percentage of losses to emerge in each period' (p.11). Read literally ('12% by the second'), the stem is inconsistent with 80% by the first. The arithmetic itself is right: 1.5296, 0.6864, 0.4576; CPDLD 1.3427, 0.5949, 0.4576.
- source_rank: 2
- proposed_action: Say 'a further 12% ... and a further 8%' and 'The incremental loss capping ratios are'.
- applied: false
- fingerprint: 986a4db722c8

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rda
- date: 2026-10-11
- status_set: in_review
- checks_run: definition, sign convention (retro reserve = negative of the premium asset, p.2), formulas 2.1-2.4 and CPDLD weighting, the 27/18-month lag, collectibility; both examples recomputed blind (asset A 1.43, B 0.97, total 2.40; misapplied 1.3427 overstates by 1.35)
- sources_checked: Teng and Perkins, Estimating the Premium Asset on Retrospectively Rated Policies (PCAS LXXXIII, 1996, pp.611-647), PDF pp.1-13, 17-18, sha256:30efb7917ebbc6361393f76652a21d97e1915032f94667699904248d1bd900f1 — https://www.casact.org/sites/default/files/2021-03/7_Teng_and_Perkins.pdf; Feldblum, Discussion of Estimating the Premium Asset on Retrospectively Rated Policies (PCAS LXXXV, 1998, pp.274-315), PDF pp.1-2, 21-24, sha256:1c572191d2239553f306dc29ba1186f3c3477e06b1652562ab55acd4c8bc04ed — https://www.casact.org/sites/default/files/2021-03/7_Teng_and_Perkins_Discussion_of_Paper.pdf
- note: To be re-verified in the clean-up round after F-001.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rdb
- date: 2026-10-11
- resolves: F-001
- status: resolved
- note: Stem now reads 'Losses emerge 80% by the first adjustment, a further 12% by the second and a further 8% by the third (the last). The incremental loss capping ratios are 0.90, 0.60 and 0.40.' The working and its numbers are unchanged and match this reading.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rdb
- date: 2026-10-11
- status_set: verified
- confidence: high
- checks_run: edited stem re-read against the working; sweep checks stand: definition and sign convention, every formula, both examples recomputed blind (PDLD 1.5296/0.6864/0.4576; CPDLD 1.3427/0.5949/0.4576; asset 1.43 + 0.97 = 2.40)
- sources_checked: Teng and Perkins, Estimating the Premium Asset on Retrospectively Rated Policies (PCAS LXXXIII, 1996, pp.611-647), PDF pp.1-13 (definition, EBNR, retro reserve, formulas 2.1-2.4, empirical lags, CPDLD), 17 (incremental capping ratio, eq. 5.2), 18 (collectibility), sha256:30efb7917ebbc6361393f76652a21d97e1915032f94667699904248d1bd900f1 — https://www.casact.org/sites/default/files/2021-03/7_Teng_and_Perkins.pdf; Feldblum, Discussion of Estimating the Premium Asset on Retrospectively Rated Policies (PCAS LXXXV, 1998, pp.274-315), PDF pp.1-2, 21-24, sha256:1c572191d2239553f306dc29ba1186f3c3477e06b1652562ab55acd4c8bc04ed — https://www.casact.org/sites/default/files/2021-03/7_Teng_and_Perkins_Discussion_of_Paper.pdf
- note: The page's mention of Table M and the per-accident loss elimination ratio for capping ratios is Teng and Perkins Section 5, which Exam 7 and GI-301 both exclude; it is correct as stated.
