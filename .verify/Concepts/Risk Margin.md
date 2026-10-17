---
target: Concepts/Risk Margin.md
created: 2026-10-16
---

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rba
- date: 2026-10-16
- status_set: in_review
- checks_run: Exam 7 section checked against Marshall et al.: sources of uncertainty, balanced scorecard, seven external categories, correlation bands, independence of the three sources, normal vs lognormal at 75%/90%, additional analysis; worked example recomputed (CoV 11.18%, normal 7.54% / $15.1M, lognormal 7.14% / $14.3M, 7.8% and 5.3% without external) and the lognormal-margin formula reproduced against Marshall Figure 3 (CoV 8.7% -> 5.6%); MCT example arithmetic recomputed (DC 21.08, 155.92, 103.95, 240.5%); link check
- sources_checked: Marshall et al., A Framework for Assessing Risk Margins (2008), Sections 1.2, 2.2, 2.5-2.7 (pp.4-27), Figure 3 p.21, Section 4.1 pp.31-36, sha256:534ad0edf3b2294d2d1421b1d17df1fc0837f1fe3a4e430db347a6abbcc8c774 — https://www.casact.org/sites/default/files/2021-03/7_Marshall_et_al.pdf
- note: Exam 7 section verified against Marshall et al. with no findings. The Exam 6C sections (MCT risk margins, the MCT example, the IFRS 17 risk adjustment, Solvency II) were not checked against their sources in this run, so the page stays in_review.

## [C-002] Exam 6C half left for the Exam 6C campaign
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rba
- date: 2026-10-16
- note: Run e7rba checked only the Exam 7 half of this page (the lead's Exam 7 sentence, the first formula block, 'Exam 7: a margin over the central estimate' and the 'Consolidating CoVs' example) against Marshall et al. (2008); it holds. Not checked, because none of this packet's readings covers them: the lead's MCT sentence and the target-capital formula, 'Exam 6C: the MCT risk margins (Canada)', 'The accounting margin: IFRS 17' and the 'MCT Risk Margins to a Ratio' example. Their sources are OSFI's Minimum Capital Test guideline effective January 1, 2024 (the version the Exam 6C Fall 2026 outline cites, with exclusions), IFRS 17 and the CIA/OSFI material on the risk adjustment, and the Solvency II delegated regulation. The example's arithmetic is internally consistent (DC 21.08, minimum capital 103.95, MCT 240.5%), and its divide-by-1.5 agrees with the MCT guideline sec. 1.1.1 as quoted in .verify/Concepts/MCT.md F-001, but that is a cross-reference, not a check.

## [F-001] IFRS 17 risk adjustment techniques stated as common practice; the source lists them as potential methods and adds a margin method
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rma
- date: 2026-10-16
- severity: minor
- status: open
- locus: 'The accounting margin: IFRS 17', second sentence
- claim: It is entity-specific and is commonly set by a confidence-level, cost-of-capital or CTE technique.
- evidence: CIA Educational Note 224090, IFRS 17 Risk Adjustment for Non-Financial Risk for P&C Insurance Contracts (Aug 2024), p.7 quotes Ed Note IFRS 17 Application Q4.3: 'there is no single correct way for an entity to set the risk adjustment ... Potential methods include, but are not limited to, quantile techniques, such as the confidence level or Conditional Tail Expectation ("CTE"), or cost of capital techniques.' p.8: the note 'does not prescribe which approach or method to use'. Preamble p.5: Sections 4, 5 and 6 cover quantile methods, the cost of capital method and the margin method. The note says nothing about which is common, and the page omits the margin method the assigned note treats as a third method. The rest of the paragraph holds: compensation 'the entity requires' (p.7); IFRS 17.119 quoted on p.17 requires disclosing the confidence level corresponding to any other technique; MfADs were the IFRS 4 practice the RA succeeded (pp.8-9). Source: sha256:c34ba39e72404117d9827b3a71f478242b379024de017eea798f7f0e337d9d71 — https://www.cia-ica.ca/app/themes/wicket/custom/dl_file.php?p=348400&fid=348401 (the 'Download publication' link on https://www.cia-ica.ca/publications/224090e/, the edition the Exam 6C Fall 2026 outline p.9 cites).
- source_rank: 2
- proposed_action: Restate to the note: the CIA's educational note names quantile techniques (the confidence level or CTE), cost-of-capital techniques and a margin method among the ways to set it, and prescribes none.
- applied: false
- fingerprint: 4716413a774f

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rmb
- date: 2026-10-16
- resolves: F-001
- status: resolved
- note: Restated in clean-up run e7rmb to the CIA note's own words (p.7 Q4.3, p.8, Preamble p.5): 'It is entity-specific. The CIA's educational note names quantile techniques (the confidence level or CTE), cost-of-capital techniques and a margin method among the ways to set it, and prescribes none.' The unsupported 'commonly' is gone; the rest of the paragraph is unchanged.

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rmb
- date: 2026-10-16
- status_set: verified
- confidence: high
- checks_run: Carried forward from e7rba/e7rbb: Exam 7 half against Marshall et al. (sources of uncertainty, scorecard, seven external categories, correlation bands, independence, normal vs lognormal, additional analysis; CoV example recomputed). This run: MCT sentence and target-capital formula, every bullet of 'Exam 6C: the MCT risk margins' diffed against MCT 2024 §1.1.1-1.1.2 (component lists, CTE 99% one-year with terminal provision, divide by 1.5), §1.1.5 (100% minimum, 150% supervisory target, internal target per A-4), §4.2.1 (LIC factors applied to best estimate excluding the risk adjustment), §7.1/7.2.4 (operational formula in CR0 and premiums, 30% cap of CR0), §8.1 (DC formula, A = market + credit, I = insurance, R = 50%); outline exclusions checked (none of these sections excluded; risk factors not examinable and none stated); IFRS 17 paragraph against CIA Ed Note 224090 (finding F-001, restated); Solvency II cost-of-capital sentence against IFoA paper §8.1; MCT example recomputed blind (sqrt(19300)=138.92, DC 21.08, target 155.92, minimum 103.95, ratio 240.5%, $94.1M above the 150% target; operational 17 under the 30% x 160 = 48 cap) and matches; Canadian framing kept
- sources_checked: Marshall et al., A Framework for Assessing Risk Margins (2008), Sections 1.2, 2.2, 2.5-2.7 (pp.4-27), Figure 3 p.21, Section 4.1 pp.31-36, sha256:534ad0edf3b2294d2d1421b1d17df1fc0837f1fe3a4e430db347a6abbcc8c774 — https://www.casact.org/sites/default/files/2021-03/7_Marshall_et_al.pdf; OSFI, Minimum Capital Test Guideline (effective January 1, 2024), §1.1.1, §1.1.2, §1.1.5, Chapter 4 intro, §4.2.1, §7.1, §7.2.4, §8.1, sha256:73dfe0b0df117d4a5899005f6d5be9dc7930b013a7ca4c81c9f4cfaa28ac758f — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024; CIA Educational Note 224090, IFRS 17 Risk Adjustment for Non-Financial Risk for Property and Casualty Insurance Contracts (August 2024), Preamble p.5, Sections 1-2 pp.7-9, §3.1.2 p.11, §3.6.2 p.17, sha256:c34ba39e72404117d9827b3a71f478242b379024de017eea798f7f0e337d9d71 — https://www.cia-ica.ca/app/themes/wicket/custom/dl_file.php?p=348400&fid=348401; IFoA GIROC Working Party, Solvency II Technical Provisions for General Insurers (August 2013), Section 8.1 p.62, sha256:fc39e40d7ad3454c21080ab24d61c546e25910f2abb6f14175bfff76c4250df7 — https://www.actuaries.org.uk/system/files/documents/pdf/sii-tp-wp-paper-giro40.pdf; CAS Exam 6C Content Outline, Fall 2026, pp.9, 12-13 (MCT citation and excluded sections; CIA IFRS 2 citation), sha256:1bd4b2b802cf0976c797bc068c2903fa8deaf43d9366a85aadf5b34a568275c1 — https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf
- note: Both halves now checked against their sources. Exam 7 half from e7rba/e7rbb (Marshall et al. 2008); Exam 6C half against OSFI's MCT guideline effective 1 January 2024, the CIA's August 2024 risk-adjustment educational note, the IFoA Solvency II paper and the Fall 2026 outline. One minor finding (IFRS 17 'commonly') restated and resolved. Not stated on the page and left as is: §1.1.2 also lists right-of-use assets among market risks, which the page's 'and other exposures' covers; the LIC margin's 1.10 multiplier is not mentioned.
