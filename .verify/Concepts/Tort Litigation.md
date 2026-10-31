---
target: Concepts/Tort Litigation.md
created: 2026-10-31
---

## [F-001] Annuity-immediate formula labelled annuity-due
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:31Z/75be
- date: 2026-10-31
- severity: major
- status: open
- locus: example 'Building a Bodily Injury Award', first line of answer
- claim: Future income loss, as an annuity-due-style present value ... = $70,000 x (1 - 1.02^-25)/0.02
- evidence: (1 - v^n)/i is the annuity-immediate present value; an annuity-due is (1 - v^n)/d = that times 1.02 (19.914, giving 1,393,942). The arithmetic shown (19.523 x 70,000 = 1,366,610) is the annuity-immediate value, so the label is what is wrong. Standard interest theory (rank 3/5).
- source_rank: 5
- proposed_action: Drop 'annuity-due-style' (done); the numbers stand.
- applied: true
- fingerprint: b2974187c036

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:31Z/75be
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Removed the 'annuity-due-style' label; the formula and arithmetic are unchanged and correct as an annuity-immediate.

## [F-002] Unsourced claim about discount-rate sensitivity
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:31Z/75be
- date: 2026-10-31
- severity: minor
- status: open
- locus: example answer, last paragraph
- claim: a 1% change in [the prescribed discount rate] moves liability reserves far more than a change in claim frequency does
- evidence: Not stated in the SOA tort-law study note or Davidson; it is a comparison with no stated magnitude for 'a change in claim frequency'. No source read this session supports it.
- source_rank: 5
- proposed_action: Source it or soften to what the example shows (74% of this award is the discounted income stream).
- applied: false
- fingerprint: 6290bc041976

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:31Z/75be
- date: 2026-10-31
- status_set: in_review
- checks_run: trilogy and $100,000 cap (1978 dollars, inflation-indexed) vs SOA note p. 64 and Davidson; costs-follow-the-event vs SOA note p. 61 (Canada uses loser pays, a significant fraction at the judge's discretion); U.S./Canada comparison vs SOA note p. 64; example arithmetic recomputed (a_25 at 2% = 19.523; 1,846,610; 1,477,288; 1,382,288; 74%)
- sources_checked: Davidson, The Cap on Non-Pecuniary General Damages (CAS Exam 6C reading), pp. 1-5 (the 1978 trilogy and the non-pecuniary cap), sha256:9b544951d4a031e08f3c40a9a30b552764f705bc09a7a6ea2af3d57e5907149f — https://www.casact.org/sites/default/files/2021-03/6C_Davidson.pdf; Cappelletti, Tort Law: Topics for General Insurance Actuaries (SOA study note, rev. May 2025), §3 p. 8 fn 11; §6 pp. 53-64 (loser pays in Canada, $100,000 trilogy cap indexed to inflation, U.S. noneconomic awards much greater), sha256:5316698581bb73d51dbcfb9a74ea92254fed6fc2b018253e2b26abc346ca2a6f — https://www.soa.org/globalassets/assets/files/edu/2025/fall/study-note/2025-11-gi-201-study-note-tort-law.pdf
- note: Left in_review: the Canadian points the trilogy sources do not cover — contributory-negligence apportionment, deduction of collateral (accident) benefits from tort awards, court-prescribed discount rates, and the elements a plaintiff must prove — need an Exam 6C reading on Ontario/Canadian tort (e.g. the Exam 6C auto-insurance readings) that was not read this session. One major label error fixed (F-001); one minor open (F-002).

## [F-003] Collateral-benefit deduction stated as a general rule of tort damages
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:39Z/6fca
- date: 2026-10-31
- severity: major
- status: open
- locus: bullet 'Tort damages are reduced by [[Collateral Benefits]] already received, and future losses ...'
- claim: Tort damages are reduced by Collateral Benefits already received.
- evidence: Stated without condition, but in Canada the deduction is statutory and specific to auto. Harris pp. 3-4 (text decoded): IBC lists 'the collateral sources rule' as an area ripe for reform, because 'the collateral source rule means that plaintiffs have the potential for double recovery - once from the wrongdoer and secondly from insurance, sick pay and disability plans'. SOA study note PDF p. 12 (printed p. 10) s. 3.2: the collateral source rule bars evidence of other compensation and 'allows the plaintiff to potentially make a double recovery' unless reformed. Even within Ontario auto, Marshall p. 46 says the offset of accident benefits against tort is 'unclear, opening the possibility of duplicate or double recovery', p. 72 'potential for double dipping', and p. 73 rec. 25 asks for 'full deductibility of accident benefits awards from tort awards'. Alberta report p. 161: Alberta's 2004 auto reform included 'collateral sources amendments'. A student would read the bullet as the general Canadian rule.
- source_rank: 2
- proposed_action: Delete the clause (done). The auto-specific statutory deduction stays on [[Collateral Benefits]]; the worked example (an auto collision with accident benefits deducted from the same head of loss) is unchanged.
- applied: true
- fingerprint: 189105c99360

## [F-004] Unsourced or contradicted characterisation of tort claims' reserving profile
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:39Z/6fca
- date: 2026-10-31
- severity: minor
- status: open
- locus: bullet 'Actuarial consequences'
- claim: tort claims are long-tailed, severity-driven, and sensitive to judicial trend, so they carry the largest reserve uncertainty in a P&C book. Development patterns depend on court backlogs, limitation periods and settlement practice as much as on injury severity.
- evidence: 'Severity-driven' is contradicted for Canadian auto BI: Marshall p. 71 quotes FSCO's review that BI claims costs rose about 88% from 2004 to 2013 'mainly due to a significant increase in the frequency of these claims'; SOA note PDF p. 8 classes auto liability among 'routine torts ... frequent with relatively low severity'. 'The largest reserve uncertainty in a P&C book' and 'as much as on injury severity' appear in no source read. The rest is supported: long tail - Alberta report p. 192 (litigated claims settle 3-4 years, occasionally 5-8 years after loss), SOA PDF p. 14 (lag 'often measured in years'); judicial trend - SOA PDF p. 11 ('court decisions can act much like tort reform'), Alberta p. 185; development drivers - Alberta p. 188 (insurer first hears of a claim at the 2-year limitation period), p. 192 (court/JDR backlog, mediation).
- source_rank: 2
- proposed_action: Delete 'severity-driven', the 'largest reserve uncertainty' clause and 'as much as on injury severity' (done); the sourced remainder stands.
- applied: true
- fingerprint: a2c8949a59f5

## [F-005] Two unsourced explanatory clauses on liability and contributory negligence
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:39Z/6fca
- date: 2026-10-31
- severity: minor
- status: open
- locus: bullets 'What must be proved' and 'Contributory negligence'
- claim: '... which is why liability is contested rather than conceded' and 'Canada uses apportionment rather than the old bar to recovery.'
- evidence: The elements and apportionment are sourced: SOA note PDF p. 31 (printed p. 29) 'tort law requires the plaintiff to prove an act of negligence by the defendant that caused them harm', PDF p. 60 'negligence is a breach in the duty of reasonable care', PDF p. 33 (SCC 1998: plaintiff must establish a prima facie case of negligence on a balance of probabilities); BC Negligence Act s. 1(1) and Alberta Contributory Negligence Act s. 1(1): liability 'is in proportion to the degree to which each person was at fault' (so 30% at fault recovers 70%). Neither the causal claim about why liability is contested nor the history of an 'old bar to recovery' appears in any source read.
- source_rank: 2
- proposed_action: Delete both clauses (done).
- applied: true
- fingerprint: 2ef796cb50fe

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:39Z/6fca
- date: 2026-10-31
- resolves: F-002
- status: resolved
- note: Deleted the unsourced sentence (prescribed discount rate 'one of the most consequential numbers' and the 1%-vs-frequency comparison). The example now ends on what its own arithmetic shows: 74% of the award is the discounted income stream (1,366,610 / 1,846,610 = 0.740).

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:39Z/6fca
- date: 2026-10-31
- resolves: F-003
- status: resolved
- note: Clause deleted; the bullet now reads 'Future losses are converted to present value using court-prescribed or evidence-based discount rates', sourced to BC Law and Equity Act s. 56 (rates prescribed by regulation, net of wage growth for lost earnings and of price inflation for other future damages).

## [F-004/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:39Z/6fca
- date: 2026-10-31
- resolves: F-004
- status: resolved
- note: Unsourced and contradicted phrases deleted; remaining claims cited to the Alberta report pp. 185, 188, 192 and the SOA note PDF pp. 11, 14.

## [F-005/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:39Z/6fca
- date: 2026-10-31
- resolves: F-005
- status: resolved
- note: Both clauses deleted.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:39Z/6fca
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: elements of negligence vs SOA note PDF pp. 31, 33, 60; contributory-negligence apportionment vs BC Negligence Act s. 1 and Alberta Contributory Negligence Act ss. 1-2; damages split pecuniary/non-pecuniary vs SOA PDF p. 5 fn 6; trilogy cap and loser-pays (prior pass, re-read SOA PDF pp. 63-66); no-fault replacing tort for cost/delay vs Alberta report pp. 52-57, 73-78; court-prescribed discount rates vs BC Law and Equity Act s. 56; collateral benefits vs Harris pp. 3-4, SOA PDF p. 12, Marshall pp. 46, 72-73, Alberta p. 161; long tail / judicial trend / development drivers vs Alberta pp. 185, 188, 192 and SOA PDF pp. 11, 14; example recomputed (a_25 at 2% = 19.52346, 1,366,642 unrounded vs 1,366,610 from rounded factor; 1,846,610; x0.8 = 1,477,288; less 95,000 = 1,382,288; 74.0%)
- sources_checked: Davidson, The Cap on Non-Pecuniary General Damages (CAS Exam 6C reading), pp. 1-5 (the 1978 trilogy and the non-pecuniary cap), sha256:9b544951d4a031e08f3c40a9a30b552764f705bc09a7a6ea2af3d57e5907149f — https://www.casact.org/sites/default/files/2021-03/6C_Davidson.pdf; Cappelletti, Tort Law: Topics for General Insurance Actuaries (SOA GI-201 study note, rev. May 2025), PDF pp. 5, 8, 10-15, 31, 33, 60-66 (printed pp. 3, 6, 8-13, 29, 31, 58-64), sha256:5316698581bb73d51dbcfb9a74ea92254fed6fc2b018253e2b26abc346ca2a6f — https://www.soa.org/globalassets/assets/files/edu/2025/fall/study-note/2025-11-gi-201-study-note-tort-law.pdf; Automobile Insurance Advisory Committee, Report on Fundamental Reform of the Alberta Automobile Insurance Compensation System (2020; CAS Exam 6C reading), pp. 52, 55, 73-78, 85-86, 184-188, 192, sha256:2fb0e97ad65126b5f2bcd44abf9f1215a21f2240dc2be147e9df66f86e8a163e — https://www.casact.org/sites/default/files/2021-05/6C_Alberta_Auto_Reform.pdf; Marshall, Fair Benefits Fairly Delivered: A Review of the Auto Insurance System in Ontario (2017; CAS Exam 6C reading), pp. 8, 11, 15, 46, 71-73, sha256:326913d5117f8dc2cc937a10f31f2d6fa712b509e040cd63220c2a8843b9d8fc — https://www.casact.org/sites/default/files/2021-03/6C_Marshall.pdf; Harris, Tort Reform Tension (Canadian Underwriter, 2005; CAS Exam 6C reading to Fall 2025), pp. 1-5 (text layer font-shifted by +29; decoded), sha256:a3ce120729ed687d0ef2fff8beb0f2228250c9bc869e4151d9669c134fac35d7 — https://www.casact.org/sites/default/files/2021-03/6C_Harris.pdf; British Columbia, Negligence Act, RSBC 1996 c. 333, s. 1 (apportionment of liability), sha256:60a11965a28bea6404152e1f5e4f300f4f61a1583f5f29e597e6677a735e34b2 — https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/96333_01; Alberta, Contributory Negligence Act, RSA 2000 c. C-27, ss. 1-2 (apportionment of liability), sha256:29bb28f7ffd94841f33d8678e4ec7aa827cd42832e4d87aceba4725bbab00bfe — https://kings-printer.alberta.ca/documents/Acts/C27.pdf; British Columbia, Law and Equity Act, RSBC 1996 c. 253, s. 56 (discount rates), sha256:fe5fbf9f78fd1eba8ba3f454bea9eefb0d960f6209f195dc77074bc352acb4bf — https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/96253_01
- note: Remaining claims sourced; four unsourced or overbroad passages deleted as applied fixes (F-003 to F-005) and F-002 resolved by deletion. Confidence medium: the elements of negligence rest on the SOA study note rather than a Canadian case (SCC and Ontario e-Laws pages would not render for the fetcher), and contributory negligence/discount rates are cited to BC and Alberta statutes, not every province. The example's 19.523 factor is the rounded annuity factor; 70,000 x 19.52346 = 1,366,642, so the stated 1,366,610 is consistent to rounding.
