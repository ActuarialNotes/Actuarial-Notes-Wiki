---
target: Resources/Books/CIA PAA.md
created: 2026-09-25
---

## [F-001] Says the one-year coverage test applies to the group, not the contract; IFRS 17.53(b) tests each contract
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- severity: major
- status: open
- locus: Contents table, row 3 (Coverage period considerations)
- claim: the coverage period is the group's, not the contract's, and depends on the contract boundary
- evidence: CIA Educational Note, Assessing Eligibility for the Premium Allocation Approach Under IFRS 17 for P&C and L&H Insurance Contracts (June 2022, doc 222091), https://www.casact.org/sites/default/files/2023-05/6C_CIA_Educational_Note_Assessing_Eligibility_for_the_Premium_Allocation_Approach.pdf sha256:9be65b3ac37f848e62a4a5df1359e2dfc4a33f0452ac43d226b0777cb1aa3f33 §2, PDF p.7, quoting IFRS 17.53(b): 'the coverage period of each contract in the group ... is one year or less'; PDF p.8: 'If the coverage period for all contracts in the group is one year or less, the group is automatically eligible' and key issue 'determining whether the contracts in a group each has a coverage period of 12 months or less (Section 3)'. The page inverted the test.
- source_rank: 2
- proposed_action: Delete 'is the group's, not the contract's, and' (transcription-level deletion).
- applied: true
- fingerprint: 1c74c45e6e4b

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- resolves: F-001
- status: resolved
- note: Deleted the inverted clause; row 3 now reads 'the coverage period depends on the contract boundary', which §3 (PDF p.9, IFRS 17.34) supports.

## [F-002] Says FCF variability is a separate disqualifier assessed before the materiality test; the note says the opposite on both counts
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- severity: major
- status: open
- locus: The two things that most often break eligibility, bullet 2
- claim: Variability in the fulfilment cash flows relating to remaining coverage, which is a separate disqualifier from the materiality test and is assessed *before* it.
- evidence: CIA Educational Note, Assessing Eligibility for the Premium Allocation Approach Under IFRS 17 for P&C and L&H Insurance Contracts (June 2022, doc 222091), https://www.casact.org/sites/default/files/2023-05/6C_CIA_Educational_Note_Assessing_Eligibility_for_the_Premium_Allocation_Approach.pdf sha256:9be65b3ac37f848e62a4a5df1359e2dfc4a33f0452ac43d226b0777cb1aa3f33 §2, PDF p.8: 'An expectation of significant variability in the FCF would not by itself make a group ineligible for the PAA, but would disqualify the group from PAA eligibility if such variability is expected to create a material difference between the PAA and GMA estimates of the LRC.' PDF p.9: 'If the GMA and PAA estimates of the LRC differ materially based upon expected future estimates of the FCF, the group would not be eligible for the PAA, and there would be no need to assess the impact of variability in the FCF' - i.e. variability is part of the 53(a) assessment and practically comes after the expected-value comparison.
- source_rank: 2
- proposed_action: Delete the clause (transcription-level deletion); an author may add the note's 'not by itself disqualifying' point.
- applied: true
- fingerprint: 6dc29377bed9

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- resolves: F-002
- status: resolved
- note: Deleted the clause; the bullet now names FCF variability relating to remaining coverage without characterising its order or independence.

## [F-003] Contents rows 3, 5, 6 attribute or omit content: risk-attaching reinsurance is §7, 'financial-risk' driver unsourced, §6's conclusion missing
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- severity: minor
- status: open
- locus: Contents table, rows 3, 5 and 6
- claim: 3: risk-attaching reinsurance and multi-year policies are where the one-year gate fails; 5: drivers include cash flows sensitive to financial risk; 6: eligibility does not remove the onerousness test
- evidence: CIA Educational Note, Assessing Eligibility for the Premium Allocation Approach Under IFRS 17 for P&C and L&H Insurance Contracts (June 2022, doc 222091), https://www.casact.org/sites/default/files/2023-05/6C_CIA_Educational_Note_Assessing_Eligibility_for_the_Premium_Allocation_Approach.pdf sha256:9be65b3ac37f848e62a4a5df1359e2dfc4a33f0452ac43d226b0777cb1aa3f33: one-year risk-attaching reinsurance held (boundary up to two years, so no automatic eligibility) is discussed in §7, PDF p.17-18, not §3; multi-year products are in §3 (repricing restrictions, p.9-10) and §5 (p.16). §5 / IFRS 17.54 (quoted p.7) name embedded derivatives and length of coverage period as drivers; 'financial risk' appears only in the IFRS 17.32 definition quote (p.6). §6 (PDF p.16-17) concludes that 'the eligibility test in IFRS 17.53(a) would always be passed for onerous contracts, as there could never be a material difference between the PAA and GMA estimates of the LRC' - the row does not say this.
- source_rank: 2
- proposed_action: Move 'risk-attaching reinsurance' to row 7; drop 'cash flows sensitive to financial risk' from row 5; add §6's conclusion that onerous groups always pass 53(a). Rewording, left for an author.
- applied: false
- fingerprint: 30831add1b90

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- status_set: verified
- confidence: high
- checks_run: syllabus diff (June 2022, C1-C2, no exclusions); contents built from printed TOC and bookmark outline (agree) then compared; section attribution; full-text search of asserted terms; wiki-link check; frontmatter vs title page
- sources_checked: CIA Educational Note, Assessing Eligibility for the Premium Allocation Approach Under IFRS 17 for P&C and L&H Insurance Contracts (June 2022, doc 222091), https://www.casact.org/sites/default/files/2023-05/6C_CIA_Educational_Note_Assessing_Eligibility_for_the_Premium_Allocation_Approach.pdf sha256:9be65b3ac37f848e62a4a5df1359e2dfc4a33f0452ac43d226b0777cb1aa3f33 — printed TOC and bookmark outline; §§2, 3, 5, 6, 7; CAS Exam 6C Content Outline Fall 2026, https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf sha256:1bd4b2b802cf0976c797bc068c2903fa8deaf43d9366a85aadf5b34a568275c1
- note: Title, date, doc, objectives C1/C2 match. Contents table matches all 8 sections, 4.1-4.3 and Appendices A-C. Two gateways match IFRS 17.53 as quoted. Two major misstatements fixed by deletion (F-001 group vs contract coverage test; F-002 variability ordering) and resolved. F-003 (minor attribution/omission) left open for an author.
