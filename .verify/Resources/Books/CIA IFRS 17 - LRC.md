---
target: Resources/Books/CIA IFRS 17 - LRC.md
created: 2026-09-25
---

## [F-001] States the PAA loss component is always discounted; IFRS 17.57 (quoted in §5.3.2) makes that conditional
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- severity: major
- status: open
- locus: The mechanics worth carrying into the exam, Discounting bullet
- claim: the loss component *is* measured on FCF and therefore is [discounted].
- evidence: CIA Educational Note, IFRS 17 – Actuarial Considerations Related to Liability for Remaining Coverage in P&C Insurance Contracts (June 2022, doc 222092), https://www.casact.org/sites/default/files/2023-05/6C_CIA_Educational_Note_IFRS_17_Actuarial_Considerations_Related_to_Liability.pdf sha256:a7e5ecea716dc20bffcc88045f20c950e71400ac3de3bfb1544736dac46a0333 §5.3.2, PDF p.29, quoting IFRS 17.57(b): the FCF relating to remaining coverage are measured applying paragraphs 33-37 and B36-B92, 'However, if, in applying paragraph 59(b), the entity does not adjust the liability for incurred claims for the time value of money and the effect of financial risk, it shall not include in the fulfilment cash flows any such adjustment.' So an insurer that does not discount its LIC (claims paid within one year) measures the loss component undiscounted; the page's unconditional 'therefore is' drops that condition.
- source_rank: 2
- proposed_action: Delete the clause (transcription-level deletion); an author may later add the 59(b) condition.
- applied: true
- fingerprint: 00e6101117ea

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- resolves: F-001
- status: resolved
- note: Deleted '; the loss component is measured on FCF and therefore is'. The bullet now states only the LRC rule, which §5.6.1 supports (no requirement to reflect time value unless a significant financing component exists).

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- status_set: verified
- confidence: high
- checks_run: syllabus diff (June 2022, C1-C2, Excel illustrations examinable, no exclusions); contents built from PDF bookmark outline then compared (all 8 sections + Appendix 1, every subsection 4.1-4.8, 5.1-5.6, 6.1-6.6, 8.1-8.4 present and correctly attributed); full-text check of each mechanics bullet; wiki-link check; frontmatter vs title page
- sources_checked: CIA Educational Note, IFRS 17 – Actuarial Considerations Related to Liability for Remaining Coverage in P&C Insurance Contracts (June 2022, doc 222092), https://www.casact.org/sites/default/files/2023-05/6C_CIA_Educational_Note_IFRS_17_Actuarial_Considerations_Related_to_Liability.pdf sha256:a7e5ecea716dc20bffcc88045f20c950e71400ac3de3bfb1544736dac46a0333 — bookmark outline and title page; §§5.1, 5.3.2, 5.6.1, 6.5.3, 8.2; CAS Exam 6C Content Outline Fall 2026, https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf sha256:1bd4b2b802cf0976c797bc068c2903fa8deaf43d9366a85aadf5b34a568275c1
- note: Contents table matches the bookmark outline one-for-one (GMM on page vs GMA in source is notation only). One major error fixed by deletion (F-001, resolved): unconditional claim that the PAA loss component is discounted. Remaining bullets (initial recognition per 17.55(a), onerous test on facts and circumstances, loss-recovery component at initial recognition / first onerous per 17.66A, §8 ELRs for MCT) agree with the note.
