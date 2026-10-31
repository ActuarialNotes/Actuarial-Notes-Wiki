---
target: Concepts/Tort Reform.md
created: 2026-10-31
---

## [F-001] Sweeping unsourced claim that every Canadian reform's saving eroded
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:31Z/75be
- date: 2026-10-31
- severity: minor
- status: open
- locus: bullet 'Savings are real but decay'
- claim: Every Canadian reform has produced an initial cost reduction followed by erosion, through judicial interpretation ..., migration of cost ..., and inflation eating a fixed-dollar deductible.
- evidence: No source read this session states this. The SOA tort-law study note (p. 8) says general tort reform 'has not occurred' in Canada, because the 1978 trilogy cap already limits noneconomic damages — so the reforms the page means are auto-insurance product reforms (thresholds, deductibles), which that note does not cover. The page should cite the auto-reform source it relies on.
- source_rank: 2
- proposed_action: Cite a source for the erosion pattern (e.g. an Exam 6C auto-reform reading) or soften 'every'; consider saying the reforms meant are auto-insurance reforms, since the SOA note says Canada has not had general tort reform.
- applied: false
- fingerprint: f56120067a55

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:31Z/75be
- date: 2026-10-31
- status_set: in_review
- checks_run: definition vs Friedland fn 20 and SOA note p. 8; reform categories (caps on damages, collateral-source coordination, prejudgment interest) vs SOA note §3; judicial non-pecuniary cap vs SOA note p. 64
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch. 4 p. 44 fn 20 (definition of tort reform); Ch. 7 p. 96; Ch. 10 p. 177, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; Cappelletti, Tort Law: Topics for General Insurance Actuaries (SOA study note, rev. May 2025), §3 pp. 8-12 (definition; collateral source, noneconomic damages and prejudgment interest reforms; prospective vs retroactive); §6 p. 64 (Canadian cap), sha256:5316698581bb73d51dbcfb9a74ea92254fed6fc2b018253e2b26abc346ca2a6f — https://www.soa.org/globalassets/assets/files/edu/2025/fall/study-note/2025-11-gi-201-study-note-tort-law.pdf
- note: Left in_review: the page is chiefly about Canadian auto-insurance reform (verbal thresholds and deductibles, Quebec's public scheme, limitation periods, durable vs first-year savings, distributional effect, FCT scenarios), and no Canadian auto-reform source was read this session. The definition and the generic reform categories agree with Friedland and the SOA note. One minor finding open (F-001).

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:39Z/6fca
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Reworded to say what the readings support: 'Canadian auto-insurance reforms that kept a tort component have typically produced an initial cost reduction followed by erosion, through judicial interpretation of the new boundary.' Sources: Alberta report p. 76 ('In jurisdictions where the tort component was maintained, the pricing problems continued and the remedies implemented, if effective at all, were only so in the short term'), p. 186 (premiums fell only 2004-2011 after the 2004 reform; 'the eventual erosion of the law reform' after a January 2012 court decision), p. 185 (court decisions reinterpreting 'minor injury'); Marshall p. 8 ('periods of cost reduction have inevitably been followed by cost increases') and p. 11. 'Every' was false: Alberta p. 74 says Manitoba's 1994 pure no-fault plan cut premiums 34% in its first two years and premiums 'remained stable over the long term'.

## [F-002] Erosion mechanisms not in the sources; inflation one contradicted by indexed Canadian deductibles
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:39Z/6fca
- date: 2026-10-31
- severity: minor
- status: open
- locus: bullet 'Savings are real but decay'; example answer, item 4 'Migration'
- claim: erosion ... through ... migration of cost to uncapped heads of damage, and inflation eating a fixed-dollar deductible; example item 4: 'Cost moves to heads of damage the reform did not touch'.
- evidence: Marshall p. 15: Ontario's tort deductible ($37,385.17, on pain-and-suffering awards under $124,616.21) has 'amounts linked to annual inflation'; Alberta report p. 185: the minor-injury award cap ($5,296) 'is indexed for inflation' - so an inflation-eroded fixed-dollar deductible does not describe the Canadian reforms. 'Migration' of cost to untouched heads of damage is stated in none of the Alberta report, Marshall, Harris or the SOA note (searches for 'migrat' and 'shift in cost': 0 hits). The sources attribute the erosion to court decisions and claims behaviour (Alberta pp. 184-186). The example's item 2 is kept: it is a hypothetical unindexed deductible, its arithmetic holds (a fixed D over awards growing 5% falls by 1 - 1/1.05 = 4.8% a year, 'roughly 5%'), and it says the erosion is avoided if the deductible is indexed, consistent with Marshall p. 15.
- source_rank: 2
- proposed_action: Delete the two clauses and example item 4, renumbering 'Four forces' to 'Three' (done).
- applied: true
- fingerprint: ea83040dc20d

## [F-003] Three unsourced assertions
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:39Z/6fca
- date: 2026-10-31
- severity: minor
- status: open
- locus: bullets 'The standard measures' (Procedural), 'Distributional effect', 'The reverse also happens'
- claim: 'mandatory mediation' as a standard reform measure; 'Reform is therefore regressive within the claimant population'; 'Both directions must be in the FCT scenario set for an insurer heavily exposed to a reformed line.'
- evidence: Mediation appears in the sources only as a dispute-resolution step and a cost (Alberta report p. 192; Marshall p. 13), never as a reform measure. No source characterises reform as 'regressive'; what the sources do say is kept - Alberta p. 85 (Ontario's threshold expected to remove the right to sue for about 88% of the traffic injured, with no recovery for moderate non-economic claims), pp. 53-54 (Kopstein: compensate minor injuries less to fund the catastrophically injured), Marshall p. 15 (deductible applies only to awards under $124,616.21). The FCT prescription is in no source read (the CIA FCT page fetched returned no standard text). The roll-back and judicial-widening sentence is kept: Alberta p. 74 (Ontario 1994/1996 restored tort rights), p. 185 (2012 court decision put an injury category outside the cap).
- source_rank: 2
- proposed_action: Delete the three passages (done).
- applied: true
- fingerprint: d9bdb95e4974

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:39Z/6fca
- date: 2026-10-31
- resolves: F-002
- status: resolved
- note: Clauses and example item 4 deleted; 'Four forces' changed to 'Three'.

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:39Z/6fca
- date: 2026-10-31
- resolves: F-003
- status: resolved
- note: The three passages deleted.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:39Z/6fca
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: definition and reform list vs Friedland fn 20, SOA note PDF pp. 10-15 (caps, collateral source, prejudgment interest, statute of limitations reform), Harris pp. 2-5 (structured settlements, prejudgment interest, double costs), Marshall pp. 72-73 (expert evidence); Canadian auto as the lever vs Alberta pp. 55, 76; verbal threshold and deductible vs Marshall p. 15; Quebec 1978 pure no-fault abolishing the right to sue vs Alberta p. 52; statutory minor-injury caps vs Alberta pp. 77-78, 185; erosion vs Alberta pp. 74, 76, 184-186 and Marshall pp. 8, 11; trade-off vs Alberta pp. 55, 85; distributional effect vs Alberta pp. 53-54, 85, Marshall p. 15; roll-back and judicial widening vs Alberta pp. 74, 185; rate-filing treatment vs FSCO filing guidelines p. 15 s. 4.b.5; example arithmetic (1/1.05 = 0.952, ~5% a year)
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch. 4 p. 44 fn 20 (definition of tort reform); Ch. 7 p. 96; Ch. 10 p. 177, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; Cappelletti, Tort Law: Topics for General Insurance Actuaries (SOA GI-201 study note, rev. May 2025), PDF pp. 5, 8, 10-15, 31, 33, 60-66 (printed pp. 3, 6, 8-13, 29, 31, 58-64), sha256:5316698581bb73d51dbcfb9a74ea92254fed6fc2b018253e2b26abc346ca2a6f — https://www.soa.org/globalassets/assets/files/edu/2025/fall/study-note/2025-11-gi-201-study-note-tort-law.pdf; Automobile Insurance Advisory Committee, Report on Fundamental Reform of the Alberta Automobile Insurance Compensation System (2020; CAS Exam 6C reading), pp. 52, 55, 73-78, 85-86, 184-188, 192, sha256:2fb0e97ad65126b5f2bcd44abf9f1215a21f2240dc2be147e9df66f86e8a163e — https://www.casact.org/sites/default/files/2021-05/6C_Alberta_Auto_Reform.pdf; Marshall, Fair Benefits Fairly Delivered: A Review of the Auto Insurance System in Ontario (2017; CAS Exam 6C reading), pp. 8, 11, 15, 46, 71-73, sha256:326913d5117f8dc2cc937a10f31f2d6fa712b509e040cd63220c2a8843b9d8fc — https://www.casact.org/sites/default/files/2021-03/6C_Marshall.pdf; Harris, Tort Reform Tension (Canadian Underwriter, 2005; CAS Exam 6C reading to Fall 2025), pp. 1-5 (text layer font-shifted by +29; decoded), sha256:a3ce120729ed687d0ef2fff8beb0f2228250c9bc869e4151d9669c134fac35d7 — https://www.casact.org/sites/default/files/2021-03/6C_Harris.pdf; FSCO, Private Passenger Automobile Filing Guidelines - Major (CAS Exam 6C reading), p. 15, s. 4.b.5 Automobile Insurance Reform Adjustment Factors, sha256:c2069298d69234c392d1fdb56795b12ad5d2a75331f3c8183045213e63b4c06e — https://www.casact.org/sites/default/files/2023-08/6C_FSRA_Private_Passenger_Auto_Filing_Major.PDF
- note: F-001 resolved by the wording fix it asked for; two further minor findings fixed by deletion. Confidence medium: the Canadian reform history rests on the Alberta committee report and Marshall (both CAS Exam 6C readings; the Alberta report and Harris were replaced/retired for Fall 2026 but remain the published documents cited), and the procedural measures (shorter limitation periods, expert-evidence rules) are sourced generically (SOA s. 3.9, Marshall recs 22 and 24) rather than to a Canadian statute.

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T17:32Z/4562
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: Added Friedland bullet: restate historical claims 'as if they occurred in the new legal environment', factor 0.67 = 1 - 33%, pro rata 0.75 for the reform year (PDF 139); severities adjusted for trend and regulatory reform while frequency gets -1.5% trend and the rate level change (PDF 210), severities at 2008 level 'after adjustment for trend and tort reform' (PDF 217); tort reform may invalidate the development assumption, consider other techniques or adjust the selected factors (PDF 102). Erosion by court reinterpretation spot-checked in the Alberta report pp.74, 185. Example arithmetic unchanged (1/1.05).
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, Version 3, 2010), Ch.7 p.96 (PDF 102); Ch.8 pp.133-134 (PDF 139-140); Ch.11 pp.204, 211 (PDF 210, 217), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; Automobile Insurance Advisory Committee, Report on Fundamental Reform of the Alberta Automobile Insurance Compensation System (2020), pp.74, 185, sha256:2fb0e97ad65126b5f2bcd44abf9f1215a21f2240dc2be147e9df66f86e8a163e — https://www.casact.org/sites/default/files/2021-05/6C_Alberta_Auto_Reform.pdf
- note: Addition checks against Friedland Ch.7, 8 and 11. The Canadian material rests on the earlier-today pass (C-002) and was spot-checked, not re-read in full; medium kept.
