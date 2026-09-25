---
target: Resources/Books/CIA Runoff.md
created: 2026-09-25
---

## [F-001] 'Deficiency in every single year' overstated and unsourced
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- severity: minor
- status: open
- locus: ## The problem, last sentence
- claim: Subtracting one from the other without adjustment reports a deficiency in every single year, whether or not the estimate was any good.
- evidence: CIA PCFRC, Educational Note: Evaluation of the Runoff of P&C Claim Liabilities when the Liabilities are Discounted in Accordance with Accepted Actuarial Practice (Minor Amendment, June 2011, Document 211064), https://www.casact.org/sites/default/files/2021-03/6C_CIA_Runoff.pdf, sha256 632d770b86fd2789e0d437477439edbda78d4c1d25b2c0ca0ca519c14abb7f36 s.1.2 (pp.3-4) says only that the undiscounted approaches 'must be modified or replaced' and that equation (b) is adjusted by discounting terms 2-3 or 'subtracting a term for the portion of the investment income earned during calendar year t'. It never says the unadjusted result is a deficiency every year. Recomputation (rank 5, falsifies only): unadjusted (b) is biased toward deficiency by roughly the year's investment income on the liability (e.g. AY5 in the note's CY6 example: 44,000-16,000-29,000 = -1,000 before adding 2,190 of investment income), but an estimate redundant by more than that unwind would still show an excess, so 'every single year, whether or not the estimate was any good' is false as stated.
- source_rank: 2
- proposed_action: Soften to what the note supports (unadjusted comparison is biased toward deficiency by the discount unwind) or cite the source for the claim.
- applied: false
- fingerprint: 08700162528f

## [F-002] Annual Return requirement not in source
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- severity: minor
- status: open
- locus: ## The problem, first sentence
- claim: Runoff ... is the standard diagnostic ... and the [[Canadian Annual Return]] requires it to be shown.
- evidence: CIA PCFRC, Educational Note: Evaluation of the Runoff of P&C Claim Liabilities when the Liabilities are Discounted in Accordance with Accepted Actuarial Practice (Minor Amendment, June 2011, Document 211064), https://www.casact.org/sites/default/files/2021-03/6C_CIA_Runoff.pdf, sha256 632d770b86fd2789e0d437477439edbda78d4c1d25b2c0ca0ca519c14abb7f36: the note ties the runoff evaluation to 'a comprehensive report on the valuation of the policy liabilities' and 'the Appointed Actuary's report' (pp.3-4); the only return it mentions is 'the P&C-1 or P&C-2 exhibit 10.60' as the source of the default yield (p.5). It does not say the annual return requires the runoff to be shown. Claim is unsourced here (it may be true of the P&C-1, but that source was not checked in this pass).
- source_rank: 2
- proposed_action: Cite the return instruction that requires runoff disclosure, or attribute the requirement to the Appointed Actuary's report per the note.
- applied: false
- fingerprint: 3e43e6406b4e

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- status_set: verified
- confidence: medium
- checks_run: syllabus diff (C1, C5, June 2011 title - match); frontmatter vs title page and memo (June 2011, PCFRC, Doc 211064); outline built from bookmark outline then compared (sections 1, 1.1, 1.1(b), 1.2, 2, 3 all present); full-text read of all 8 pages incl. accident-year model and investment-income allocation; wiki links; Available-from URL fetched (200)
- sources_checked: CIA PCFRC, Educational Note: Evaluation of the Runoff of P&C Claim Liabilities when the Liabilities are Discounted in Accordance with Accepted Actuarial Practice (Minor Amendment, June 2011, Document 211064), https://www.casact.org/sites/default/files/2021-03/6C_CIA_Runoff.pdf, sha256 632d770b86fd2789e0d437477439edbda78d4c1d25b2c0ca0ca519c14abb7f36; CAS Exam 6C Content Outline Fall 2026, https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf, sha256 1bd4b2b802cf0976c797bc068c2903fa8deaf43d9366a85aadf5b34a568275c1
- note: Structure and the 'What the note does' bullets match the source. The page omits the Introduction (p.3), which is not a numbered section. Source-internal: the bookmark outline lists only 1.1(b) while the printed text has both (a) and (b) - the page follows the bookmark; not a vault error. Two minor findings open on authored framing; IFRS 17 section is interpretive commentary, not checked against this 2011 note.
