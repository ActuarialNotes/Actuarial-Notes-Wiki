---
target: Concepts/Probable Maximum Loss.md
created: 2026-10-10
---

## [F-001] Post-event MCT points protected by the top layer misstated
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv04
- date: 2026-10-10
- severity: minor
- status: open
- locus: example 'Sizing a Catastrophe Programme', bullet 'Buy the top layer'
- claim: '... worth the 17 points of post-event MCT ratio it protects.'
- evidence: Recomputed on the example's own figures: buying the 350M-430M layer cuts the net loss from 120M to 40M. At the example's tax ratio (88/120), the after-tax loss falls from 88.0M to 29.3M. MCT then rises from (390-88)/230 = 131.3% to (390-29.3)/230 = 156.8%, a gain of 25.5 points. 17 points matches nothing; it is close to 40/230, the pre-tax retention alone.
- source_rank: 5
- proposed_action: Change 17 to 'roughly 26' (arithmetic fix).
- applied: true
- fingerprint: 29af9a23e6d8

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv04
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Applied: 'the roughly 26 points'; recomputation 131.3% -> 156.8% shown in F-001.

## [F-002] Page is framed as Canadian catastrophe PML; DISC-RM's per-location sense is one bullet
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv04
- date: 2026-10-10
- severity: minor
- status: open
- locus: lead and body (DISC-RM 9.5, 10.1 link this page)
- claim: Lead defines PML as 'the loss an insurer's portfolio would suffer from a catastrophe of a specified return period — commonly the 1-in-500 year event for earthquake under OSFI's requirements', and the body and example are OSFI/MCT.
- evidence: DISC-RM 9.5 'Determining Potential Loss Severity' and 10.1 'Estimating Probable Maximum Loss of Business Income' use the U.S. property-underwriting sense: IRMI 'probable maximum loss' = 'the maximum loss expected at a given location in the event of a fire ... in dollars or as a percentage of total values'. The page carries that sense in one bullet; the U.S. framing a DISC reader needs (PML vs MFL vs MPL vs NLE, protection assumptions) is otherwise absent.
- source_rank: 3
- proposed_action: Give the per-location underwriting sense its own section or page (lead decision; noted by writer C in followups).
- applied: false
- fingerprint: 8b107c6dd1c5

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv04
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: 1-in-500 earthquake PML, gross vs net, modelled quantity, model uncertainty against OSFI B-9; MCT 100%/150% against OSFI MCT 2026; per-location bullet against IRMI PML/MFL/MPL; 1-0.998^30 = 5.83%; example recomputed (net 40+80 = 120M; MCT 131%; 350M-430M layer; 550M model -> 240M retained)
- sources_checked: OSFI, Guideline B-9 Earthquake Exposure Sound Practices (PML500, gross/net PML, models), definitions of PML, PML500, gross/net PML; models, sha256:e826e5e04f4c4170671288527ae7bebd0ace06ac940254e7d5ecd3adbe92f37e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/earthquake-exposure-sound-practices; OSFI, Minimum Capital Test Guideline (2026), ch.1 (100% minimum, 150% supervisory target), ch.1 100% minimum, 150% supervisory target, sha256:80450516aa1bb0a7534ceedcf50e39966406ecdcd52d0109af4a94d3439959ce — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2026; IRMI Glossary, 'probable maximum loss (PML)', entry, sha256:f5a52026910edc505ad6eca7e31f08994d2ab6ffd9b55e16685b3e6d2cd4e8ee — https://www.irmi.com/term/insurance-definitions/probable-maximum-loss; IRMI Glossary, 'maximum foreseeable loss (MFL)', entry, sha256:ac6a852f104fe279e0909ec10a83934963490673519be7caa5ceef6192b7151c — https://www.irmi.com/term/insurance-definitions/maximum-foreseeable-loss; IRMI Glossary, 'maximum possible loss (MPL)', entry, sha256:5216b2a4bb6e2fd2293be9003732c8549708b87e7e3be408b39de7a8a93e50e9 — https://www.irmi.com/term/insurance-definitions/maximum-possible-loss
- note: OSFI documents are primary for the Canadian content. The FCT/ORSA bullet was not checked against CIA/OSFI text. F-001 fixed; F-002 (minor, framing) open. Medium.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv04
- date: 2026-10-10
- resolves: F-002
- status: resolved
- note: No change (lead decision): the page keeps its Canadian/Exam 6C framing; DISC-RM's per-location sense is covered by the per-location bullet, which matches IRMI's PML, MFL and MPL entries (largest loss expected at a location from a fire, in dollars or as a percentage of total values; MFL worst likely from a single event; MPL worst possible).

## [F-003] MCT denominator named 'Base Solvency Buffer', a LICAT term
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T00:36Z/1567
- date: 2026-10-18
- severity: major
- status: open
- locus: example stem
- claim: Capital available is $390 million and the base solvency buffer is $230 million.
- evidence: OSFI Guideline A-4 (Dec 2017) p.3: 'For P&C insurers, the MICAT and the MCT guidelines define the capital requirement amount as the minimum capital required, while for life insurers the capital requirement amount is referred to as the Base Solvency Buffer in the LICAT.' A full-text search of the MCT guideline (2024) for 'base solvency buffer' returns 0 hits; its denominator is 'minimum capital required' = target-level capital required less the diversification credit, divided by 1.5 (§1.1.1-§1.1.2). OSFI Guideline A-4, Regulatory Capital and Internal Capital Targets (December 2017), p.3, sha256:f68346b481f701b9a9ccac13cac872c8e7c009c96d2a7a51b66e523c00e6b1fa — https://www.casact.org/sites/default/files/2021-03/6C_OSFI_Target_Capital.pdf; OSFI, Minimum Capital Test Guideline (2024), Guideline A, §1.1.1, §1.1.2, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024
- source_rank: 1
- proposed_action: Name the MCT's denominator as the guideline does - minimum capital required (target-level capital required less the diversification credit, divided by 1.5); the ratio arithmetic is otherwise unaffected where the figure is a given input.
- applied: false
- fingerprint: fc64def29935

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T00:50Z/dd77
- date: 2026-10-18
- resolves: F-003
- status: resolved
- note: Applied: 'Base Solvency Buffer' renamed to the MCT's term, minimum capital required, per A-4 p.3: 'For P&C insurers, the MICAT and the MCT guidelines define the capital requirement amount as the minimum capital required, while for life insurers the capital requirement amount is referred to as the Base Solvency Buffer in the LICAT.' MCT 2024 §1.1.1: 'The MCT ratio is expressed as the capital available over the minimum capital required.' Stem now reads 'minimum capital required under the MCT is $230 million'. (390 - 88)/230 = 131.3% unchanged.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T00:50Z/dd77
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: delta check of the changed stem line against MCT 2024 §1.1.1-§1.2.1 and A-4 p.3 (minimum capital required is the MCT's denominator; 'base solvency buffer' 0 hits in the guideline); (390 - 88)/230 = 131.3% recomputed
- sources_checked: OSFI, Minimum Capital Test Guideline (2024), Guideline A, §1.1.1, §1.1.2, §1.2.1, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024; OSFI Guideline A-4, Regulatory Capital and Internal Capital Targets (December 2017), p.3, sha256:f68346b481f701b9a9ccac13cac872c8e7c009c96d2a7a51b66e523c00e6b1fa — https://www.casact.org/sites/default/files/2021-03/6C_OSFI_Target_Capital.pdf; OSFI, Guideline B-9 Earthquake Exposure Sound Practices (PML500, gross/net PML, models), definitions of PML, PML500, gross/net PML; models, sha256:e826e5e04f4c4170671288527ae7bebd0ace06ac940254e7d5ecd3adbe92f37e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/earthquake-exposure-sound-practices; OSFI, Minimum Capital Test Guideline (2026), ch.1 (100% minimum, 150% supervisory target), ch.1 100% minimum, 150% supervisory target, sha256:80450516aa1bb0a7534ceedcf50e39966406ecdcd52d0109af4a94d3439959ce — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2026; IRMI Glossary, 'probable maximum loss (PML)', entry, sha256:f5a52026910edc505ad6eca7e31f08994d2ab6ffd9b55e16685b3e6d2cd4e8ee — https://www.irmi.com/term/insurance-definitions/probable-maximum-loss; IRMI Glossary, 'maximum foreseeable loss (MFL)', entry, sha256:ac6a852f104fe279e0909ec10a83934963490673519be7caa5ceef6192b7151c — https://www.irmi.com/term/insurance-definitions/maximum-foreseeable-loss; IRMI Glossary, 'maximum possible loss (MPL)', entry, sha256:5216b2a4bb6e2fd2293be9003732c8549708b87e7e3be408b39de7a8a93e50e9 — https://www.irmi.com/term/insurance-definitions/maximum-possible-loss
- note: Re-verified for the one changed line only; F-003 resolved, no open findings. The other sources are carried from the 2026-10-10 pass (C-001), which checked the unchanged content; they were not re-read in this run.

## [F-004] Net PML said to be after reinstatement premiums
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:54Z/2103
- date: 2026-10-31
- severity: minor
- status: open
- locus: 'Gross and net PML are different questions' bullet
- claim: net PML — after reinsurance and after any reinstatement premiums — is what actually hits capital.
- evidence: OSFI B-9 (2013) defines net PML as 'the PML after deductibles and catastrophic and other reinsurance protection'; reinstatements are not in it. The LMA guidance (PDF p.9) and the SOA GI-301 note (p.3) put reinstatements in a separate measure, final net loss ('net loss ... plus any reinstatements'). The page folds the final-net measure into net PML.
- source_rank: 1
- proposed_action: Delete 'and after any reinstatement premiums' so net PML reads as OSFI defines it.
- applied: true
- fingerprint: 37607765aa22

## [F-004/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:54Z/2103
- date: 2026-10-31
- resolves: F-004
- status: resolved
- note: Deleted the clause; the bullet now reads 'net PML — after reinsurance — is what actually hits capital', as B-9 defines net PML.

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:54Z/2103
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: whole page: lead and VaR form against B-9's PML definition (return period loss); per-location sense against IRMI PML/MFL/MPL (re-fetched) and, for business income, consistent with the verified Business Income Coverage page (rank 4); modelled quantity, model uncertainty, data quality, gross/net, FCT against B-9 re-read; new interpolation bullet against the 2012, 2013, 2015 and 2018 reports; interpolation example recomputed (65M on probability, 60M on return periods); 30-year probability 5.8%; capital example recomputed (net 120M; (390-88)/230 = 131.3%; top layer to ~156.8%, about 26 points; 550M model gives 240M retained; 310M recovery); rule 10: the example's points (0.010/40M, 0.004/70M) are none of the questions' (2012 Q9, 2013 Q24, 2018 Q16)
- sources_checked: OSFI, Guideline B-9 Earthquake Exposure Sound Practices (2013), current web text: Principle 2 data quality, Principle 3 models (significant uncertainty, wide range of results from model to model, consider more than one model), Principle 4 PML estimates (data quality, non-modelled exposures, model uncertainty, multiple regions), financial resources against gross PML, FCT earthquake scenario, definitions (PML as return period loss for probabilistic models; gross and net PML), sha256:0421fe099975731fb9a3d9d47c1b484be4fd79f8891b7c54c5edc3c15efc03fd — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/earthquake-exposure-sound-practices-guideline-2013; OSFI, Earthquake Exposure Sound Practices — Letter (2013), Appendix A (PML250 and PML500 at return periods, gross and net PML definitions), sha256:64484c9bebbdb759294daf5cf7cadcb550b00028793dc69e2441c3c5567dbade — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/earthquake-exposure-sound-practices; IRMI Glossary, 'probable maximum loss (PML)' (a property loss control term: the maximum loss expected at a given location from a fire, in dollars or as a percentage of total values), sha256:571dfca5c63cde057b827d8cb7f28c3b8071793b5076b6dcf5d191a89e3da739 — https://www.irmi.com/term/insurance-definitions/probable-maximum-loss; 'maximum foreseeable loss (MFL)' and 'maximum possible loss (MPL)' entries, same site, read this run; SOA, An Overview of Catastrophe Modeling Output (GI-301 study note, May 2025), pp.1-3 (printed): OEP/AEP/CEP; AAL = sum p_i L_i; independent Bernoulli events at most once; OEP(L_i) = 1 - prod(1 - p_j); return period = 1/OEP; RPL = PML; TVaR the average loss above a return period; ground-up, gross, net and final net (plus reinstatements) losses; demand surge; secondary uncertainty, sha256:e3826f24e743ccb668df1033fd90465e42c77f1c751682e0805edd748c2ce95e — https://www.soa.org/globalassets/assets/files/edu/2025/fall/study-note/2025-11-gi-301-study-note-catastrophe-output.pdf; Lloyd's Market Association, Catastrophe Modelling: Guidance for Non-Catastrophe Modellers (June 2013), PDF pp.7-9 (ELT from the financial module; EP curve; OEP and AEP; VaR and TVaR; ELT; CoV; ground-up, gross, net and final net losses; RMS weighting academic models into a blended frequency), sha256:a09d4b5333c2e7e3a2f0c7b28a1c083cf66f274ef65f79b07e7d876bfb88fbb9 — https://web.actuaries.ie/sites/default/files/erm-resources/catastrophe_modelling_guidance_for_non_catastrophe_modellers.pdf; CAS Exam 8 Fall 2012 — sample answers and examiner's report, Q9(b), PDF p.51 (1/25 = 0.04; linearly interpolate; eyeballing the graph and treating the curve as discrete (selecting 5M or 10M) are errors), sha256:f0a8a4e1060ad54d4a69208dd574d53dbcafc29ceddbabe7be0a2da2e0f9232b — https://www.casact.org/sites/default/files/2021-03/f12-8.pdf; CAS Exam 8 Fall 2013 — sample answers and examiner's report, Q24(a), PDF pp.90-91 (1/250 = 0.004; linear interpolation between OEP points 0.002 and 0.005), sha256:8e644179a5722b0d1968c3d9caa38514a01ca4cded397441dd1d9af00d3cc9dc — https://www.casact.org/sites/default/files/2021-03/13-8.pdf; CAS Exam 8 Fall 2015 — sample answers and examiner's report, Q22(b), PDF p.94 (discrete distribution: select the loss amount rather than interpolate), sha256:02718b9e95a9c4fc0203158467fe573920d774e0498460bb2dee0d6b4db1a0df — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam8_15-8.pdf; CAS Exam 8 Fall 2018 — sample answers and examiner's report, Q16(a), PDF pp.86-87 (interpolate the exceedance probabilities; common mistakes: using return period years for interpolation), sha256:7993ff15f4c6aae538bde337a57fbbf775aab27f3a232b8a828458ac52a330c4 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam8_18-8.pdf; OSFI, Minimum Capital Test Guideline (2026), ch.1 (100% minimum, 150% supervisory target), sha256:80450516aa1bb0a7534ceedcf50e39966406ecdcd52d0109af4a94d3439959ce — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2026 (carried from C-002, not re-read); OSFI Guideline A-4 (December 2017), p.3 (minimum capital required for P&C), sha256:f68346b481f701b9a9ccac13cac872c8e7c009c96d2a7a51b66e523c00e6b1fa — https://www.casact.org/sites/default/files/2021-03/6C_OSFI_Target_Capital.pdf (carried from C-002, not re-read)
- note: Whole-page check after the writer's Exam 9 G8 passage; this is also the re-check for Exam 6C and DISC-RM (rule 6), which this page is verified for. One clause cut (F-004). The ORSA / internal-target clause rests on the MCT and A-4 carried from C-002; B-9 confirms the FCT earthquake scenario. Source hashes: every CAS and USGS PDF re-fetched from its URL this run and hashed; each matches the hash the writer cited.
