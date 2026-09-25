---
target: Resources/Books/CIA Discount Rates.md
created: 2026-09-25
---

## [F-001] Contents omits sections 6-14 of an assigned-in-full note
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- severity: major
- status: open
- locus: ## Contents table
- claim: Contents lists sections 1-2, 3, 4 and 5 only.
- evidence: CIA PCFRC, Educational Note: IFRS 17 Discount Rates and Cash Flow Considerations for Property and Casualty Insurance Contracts (October 2025), https://www.cia-ica.ca/publications/225109e/ (PDF dl_file.php?p=628504&fid=628505), sha256 ba5d55e4e3429fa74681b03719336d5e186a812856f0445a5c4f8438fec5c4dc, PDF bookmark outline: after 5 (Reference curves, p.22) the note continues with 6 Insurance finance expense versus investment income (p.26); 7 Suggested disclosures in the Appointed Actuary's report (p.26, 7.1-7.3); 8 Discounting the estimates of future cash flows (p.27); 9 Applying the risk adjustment and determining the fulfilment cash flows (p.28); 10 Locked-in yield curve (p.28); 11 Insurance finance expense (p.29; 11.1 unwinding of discount - constant yield curve, spot rates, expectations hypothesis; 11.2 effect of changes in discounting assumptions); 12 Financial statement presentation (p.31, 12.1-12.6); 13 Acceptability of allocations (p.39); 14 Illustrative example (p.39, Appendices 1-9). CAS Exam 6C Content Outline Fall 2026, https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf, sha256 1bd4b2b802cf0976c797bc068c2903fa8deaf43d9366a85aadf5b34a568275c1 (p.7) assigns the note with no section exclusions ('Candidates are responsible only for the basic Excel illustrations'). The omitted half includes the IFIE / unwinding / locked-in-curve mechanics a candidate is examined on.
- source_rank: 2
- proposed_action: Add rows for sections 6-14 to the Contents table from the bookmark outline.
- applied: false
- fingerprint: 1bf962d61579

## [F-002] Liquidity bullet contradicts s.4.6.1 categorisation
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- severity: major
- status: open
- locus: ## The judgements the exam probes, bullet 'How illiquid are P&C liabilities?'
- claim: Claim payments are largely fixed by the claims process ... so there is a case for a meaningful illiquidity premium - but a claimant can accelerate settlement, and short-tail liabilities are not illiquid in any useful sense.
- evidence: CIA PCFRC, Educational Note: IFRS 17 Discount Rates and Cash Flow Considerations for Property and Casualty Insurance Contracts (October 2025), https://www.cia-ica.ca/publications/225109e/ (PDF dl_file.php?p=628504&fid=628505), sha256 ba5d55e4e3429fa74681b03719336d5e186a812856f0445a5c4f8438fec5c4dc s.4.6.1 (pp.20-21) table 'Liquidity of Canadian P&C Insurance Contract Liabilities': for most standard P&C products the LRC is 'Liquid' (policyholder can cancel and receive value without significant exit costs) and the LIC is 'Illiquid'; non-standard exceptions are title/warranty insurance and LTD claims with a lump-sum option. The distinction is LRC vs LIC and contract features (exit value, exit costs, inherent value - s.4.6, pp.18-19), not short vs long tail. 'accelerat*' occurs 0 times in the note; 'short tail' occurs only in s.12 (pp.35, 38) about IFIE calculation practicality.
- source_rank: 2
- proposed_action: Restate per s.4.6.1: LRC generally liquid, LIC generally illiquid, with the listed non-standard exceptions. Needs authored prose.
- applied: false
- fingerprint: 47a78ca11703

## [F-003] 'Requires a deviation' overstates s.5.3.5
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- severity: minor
- status: open
- locus: ## The judgements the exam probes, bullet 'Using the CIA reference curves'
- claim: Published curves are a convenience, not a safe harbour: s.5.3 lists what must be true ... and requires a deviation where it is not.
- evidence: CIA PCFRC, Educational Note: IFRS 17 Discount Rates and Cash Flow Considerations for Property and Casualty Insurance Contracts (October 2025), https://www.cia-ica.ca/publications/225109e/ (PDF dl_file.php?p=628504&fid=628505), sha256 ba5d55e4e3429fa74681b03719336d5e186a812856f0445a5c4f8438fec5c4dc s.5.3.5 (pp.25-26): 'The actuary would consider at each calculation date whether the use of the reference curves remains suitable ... Examples of when deviating from the reference curves may be appropriate include ...' (consistency with associated companies, multiple currencies, sudden economic change, illiquidity). The note's language is 'would consider' / 'may be appropriate', not a requirement; 'safe harbour' occurs 0 times.
- source_rank: 2
- proposed_action: Change 'requires a deviation' to the note's 'would consider whether ... deviating may be appropriate'.
- applied: false
- fingerprint: d9cac3f0720b

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- status_set: in_review
- checks_run: syllabus diff (Oct 2025, C1-C2, basic Excel only - match); frontmatter vs cover and CIA landing page (publication date 22-10-2025); outline built from the PDF bookmark outline first, then the page's Contents table diffed (sections 3-5 subsections all correct and correctly attributed; 6-14 missing); full-text search of named claims (reconcile p.13 matches; mid-period payment p.12 matches; accelerate, safe harbour, short tail); s.4.6 and 5.3.5 read; wiki links; Available-from URL fetched (200)
- sources_checked: CIA PCFRC, Educational Note: IFRS 17 Discount Rates and Cash Flow Considerations for Property and Casualty Insurance Contracts (October 2025), https://www.cia-ica.ca/publications/225109e/ (PDF dl_file.php?p=628504&fid=628505), sha256 ba5d55e4e3429fa74681b03719336d5e186a812856f0445a5c4f8438fec5c4dc; CAS Exam 6C Content Outline Fall 2026, https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf, sha256 1bd4b2b802cf0976c797bc068c2903fa8deaf43d9366a85aadf5b34a568275c1
- note: Section 1-5 outline is accurate, and 'IFRS 17 does not require the two to reconcile' matches p.13. The page covers only the first half of the note, and the liquidity bullet contradicts s.4.6.1 (two major findings). Left in_review.
