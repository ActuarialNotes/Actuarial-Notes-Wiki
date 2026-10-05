---
target: Concepts/Multi-State Model.md
created: 2026-10-04
---

## [F-001] Joint-life multi-state model listed with three states; the source uses four
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: body, last bullet ('In continuous time ... Joint Life statuses (both alive, one alive, both dead) are another multi-state model')
- claim: Joint Life statuses (both alive, one alive, both dead) are another multi-state model.
- evidence: Daniel, 'Multi-state transition models with actuarial applications' (CAS/SOA reprint), Example 1.3 multiple-life models, PDF p.3: 'Our subject is the pair of statuses, and the possible states are: 1) both are intact, 2) (x) is intact but (y) has failed, 3) (y) is intact but (x) has failed, and 4) both have failed.' The page lumps states 2 and 3 into 'one alive'. That lumped process is not Markov in general: when (x) and (y) have different mortality, the transition probability out of 'one alive' depends on which life survived, i.e. on history. The joint-life status (fails at first death) and last-survivor status (fails at the last) are themselves correctly described elsewhere (Struppeck, 'Life Contingencies', CAS study note, PDF p.11). Low consequence on MAS-I, where joint-life probabilities are computed from independent single-life models, hence minor.
- source_rank: 3
- proposed_action: List the four states as Daniel does - both alive, only (x) alive, only (y) alive, both dead - or say 'one alive' may be merged only when the survivor's identity does not matter. Needs a human to word it; not auto-fixed.
- applied: false
- fingerprint: c0f64cf91086

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: medium
- checks_run: APV formula against Daniel Thm 2.12 (cash flow while in state, constant benefit, compound discount); (P_ii)^n vs P^n_ii against Daniel Thm 1.19 and its warning; disability states and transitions against Daniel Ex. 1.4 and Heriot-Watt Fig. 5; non-homogeneous products against Daniel Thm 1.18; intensity = force of mortality against Heriot-Watt Sec. 5.1 and Struppeck; joint-life states against Daniel Ex. 1.3 (finding F-001); examples recomputed in Python before comparing: row H of P^2 = (0.7425, 0.1500, 0.1075), 0.85^2 = 0.7225, gap 0.02 = (0.10)(0.20), APV = ,312.93 - all match; links resolve; LaTeX balanced
- sources_checked: Daniel, 'Multi-state transition models with actuarial applications' (2004; reprinted by CAS and SOA): Sec. 1.1 Examples 1.1 (alive-dead), 1.3 (multiple lives, four states), 1.4 (disability) PDF pp.2-3; Sec. 1.2 Def. 1.7 non-homogeneous Markov chain, Thm 1.18 kQ_n = Q_n ... Q_{n+k-1}, 'Warning on interpretation' and Thm 1.19 kP(i)_n = P(i)_n ... P(i)_{n+k-1} (staying vs. being in a state), Example 1.20 PDF pp.4-8; Sec. 2.3 Thm 2.12 APV of cash flows while in states = sum_k kQ(s,i)_n x C x kv_n PDF p.16, sha256:0ca2c70a5c022a0032026ae139bd59e9fee3142d0455ed071e2d8698573200f8 - https://www.casact.org/sites/default/files/database/studynotes_daniel.pdf; Heriot-Watt University F79AF lecture notes, Ch. 5 'Markov Multiple-State Models': Sec. 5.1 two-state alive-dead model, death governed by the transition intensity mu^ad (the force of mortality) PDF pp.1-5; Sec. 5.2 general model with age-dependent intensities PDF pp.5-6; Sec. 5.3 Fig. 5 disability model Able/Ill/Dead with recovery PDF pp.7-8, sha256:84d9098f7ae74942523f1ab7fae8739d963e6428c314b43ec41c7e1b28b0a6b1 - https://www.macs.hw.ac.uk/~andrea/f79af/notes5.pdf; Struppeck, 'Life Contingencies', CAS Study Note (Oct 2014, rev. Sept 2015) - MAS-I syllabus reading: hazard rate used for mortality is the 'force of mortality'; joint-life annuity pays until one dies, last-survivor until both have died, PDF p.11, sha256:8ea3f762df47e0c143b217219e7aa7033709e55f2a6378de25ed385673e3a849 - https://www.casact.org/sites/default/files/2021-03/MAS-I_Struppeck.pdf; Ross, Introduction to Probability Models, Ch. 4 (course-hosted copy on NTNU TMA4265 page; edition earlier than the 11th-13th the 2026 outline lists): Sec. 4.2 Chapman-Kolmogorov pp.189-190, sha256:9f01ac6c0ef8a6a641de075fe6af109d7215bad8c33734807fd654d4a1ad53e1 - https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf
- note: One minor finding open (F-001: joint-life model given three states, Daniel uses four). Confidence medium: the multi-state claims rest on a CAS/SOA-reprinted study note and university notes (rank 3); only the force-of-mortality and joint/last-survivor semantics have a rank-2 MAS-I reading (Struppeck).

## [C-002] Dollar figure in C-001 checks_run lost to shell expansion
- entry_type: correction
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- locus: log entry C-001, checks_run
- note: Erratum to C-001 (same run): the checks_run text reads "APV = ,312.93" because the recorder command was double-quoted and the shell expanded "$2". The recomputed figure, which matches the page, is APV = $2,312.93 (10,000 x (0.10/1.05 + 0.15/1.05^2)). No change to the status or to the page.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: The last bullet now lists the pair-of-lives model with Daniel's four states — "A pair of lives (x) and (y) is another multi-state model, with four states: both alive, only (x) alive, only (y) alive, and both dead. The joint-life status fails at the first death and the last-survivor status at the last." — replacing "Joint Life statuses (both alive, one alive, both dead)". Daniel, "Multi-state transition models with actuarial applications" (CAS study note reprint), Example 1.3, PDF p.3: "the joint status x:y that fails when the first of (x) and (y) fails ... the last-survivor status that fails when the last of (x) and (y) fails ... the possible states are: 1) both are intact, 2) (x) is intact but (y) has failed, 3) (y) is intact but (x) has failed, and 4) both have failed", sha256:0ca2c70a5c022a0032026ae139bd59e9fee3142d0455ed071e2d8698573200f8; Struppeck, Life Contingencies (MAS-I reading) PDF p.11: the joint-life annuity pays until one of the two dies, the last-survivor annuity until both have died, sha256:8ea3f762df47e0c143b217219e7aa7033709e55f2a6378de25ed385673e3a849. Edit committed by an interrupted earlier attempt of this run (commit 6669d816); reviewed this session, no further change.

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: All four sources re-fetched this session (hash-identical to run 8861); every bullet re-read against them, the edited last bullet against Daniel Ex. 1.3 and Struppeck p.11. Examples recomputed in Python: row H of P^2 = (0.7425, 0.1500, 0.1075); 0.85^2 = 0.7225, gap 0.02 = (0.10)(0.20); APV = 10,000 x (0.095238 + 0.136054) = 2,312.93. 5 links resolve (vault_links exact). verify_check clean.
- sources_checked: Daniel, 'Multi-state transition models with actuarial applications' (2004; CAS study note reprint): Examples 1.1, 1.3 (pair of lives: joint status fails at the first failure, last-survivor at the last; four states), 1.4 (disability, moving back and forth) PDF pp.2-3; Thm 1.18 kQ_n = Q_n … Q_{n+k-1} PDF p.7; 'Warning on interpretation' and Thm 1.19 kP(i)_n = P(i)_n … P(i)_{n+k-1} (being in vs remaining in a state) PDF p.7; Thm 2.12 APV of cash flows while in states PDF p.16, sha256:0ca2c70a5c022a0032026ae139bd59e9fee3142d0455ed071e2d8698573200f8 — https://www.casact.org/sites/default/files/database/studynotes_daniel.pdf; Struppeck, 'Life Contingencies', CAS Study Note (Oct 2014, rev. Sept 2015) — MAS-I syllabus reading, PDF p.11 (the hazard rate for mortality is the force of mortality; joint-life annuity pays until one of the two dies, last-survivor until both have died), sha256:8ea3f762df47e0c143b217219e7aa7033709e55f2a6378de25ed385673e3a849 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Struppeck.pdf; Heriot-Watt University F79AF lecture notes, Ch. 5 'Markov Multiple-State Models': §5.1 alive-dead model with the force of mortality as the transition intensity μ^ad PDF pp.1-3; §5.2 age-dependent intensities PDF p.6; §5.3 Fig. 5 Able/Ill/Dead disability model with recovery PDF pp.7-8, sha256:84d9098f7ae74942523f1ab7fae8739d963e6428c314b43ec41c7e1b28b0a6b1 — https://www.macs.hw.ac.uk/~andrea/f79af/notes5.pdf; Ross, Introduction to Probability Models, Ch. 4 (course-hosted copy on the NTNU TMA4265 page; an edition earlier than the 11th-13th the 2026 outline lists): §4.2 Chapman-Kolmogorov pp.189-191, sha256:9f01ac6c0ef8a6a641de075fe6af109d7215bad8c33734807fd654d4a1ad53e1 — https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf
- note: Resolve run: F-001 closed. Medium: the multi-state claims rest on a CAS-reprinted study note and university notes (rank 3); the force-of-mortality and joint / last-survivor semantics also have the MAS-I reading (Struppeck, rank 2). No open findings.
