---
target: Resources/Books/CIA Reinsurance Treatment.md
created: 2026-09-25
---

## [F-001] Regulatory-capital position misstated
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- severity: major
- status: open
- locus: ## The task force's positions, bullet 'Regulatory capital formulae'
- claim: Regulatory capital formulae should not be the mechanism that determines the accounting treatment.
- evidence: CIA Task Force on the Appropriate Treatment of Reinsurance, Report (Document 207081, October 2007), https://www.casact.org/sites/default/files/2021-03/6C_CIA_Reinsurance_Treatment.pdf, sha256 9c41c17ab88467e61d49026825e1ea263634a0f9b5092fa6adf102806e7bb519 p.25, 'Regulatory Capital Formulae': 'as long as portions of regulatory capital formulae remain factor-based then they may not recognize the fact that risk transferred in a reinsurance contract is not always completely and permanently transferred ... the assessment of complete and permanent risk transfer should be left to the judgement of the Appointed Actuary when making regulatory capital calculations.' The recommendation is about how capital formulae treat incomplete risk transfer and who judges it, not about capital formulae driving accounting treatment; the page's sentence appears nowhere in the report.
- source_rank: 2
- proposed_action: Rewrite the bullet to state the p.25 recommendation (factor-based capital formulae may not recognise incomplete/impermanent risk transfer; leave that assessment to the Appointed Actuary's judgement in regulatory capital calculations). Needs authored prose - human edit.
- applied: false
- fingerprint: 0118cd314da5

## [F-002] ERD not mentioned in the report
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- severity: minor
- status: open
- locus: ## Why it is worth reading anyway, sentence 2
- claim: It ... explains why Canada has no ERD-style threshold test.
- evidence: CIA Task Force on the Appropriate Treatment of Reinsurance, Report (Document 207081, October 2007), https://www.casact.org/sites/default/files/2021-03/6C_CIA_Reinsurance_Treatment.pdf, sha256 9c41c17ab88467e61d49026825e1ea263634a0f9b5092fa6adf102806e7bb519: full-text search finds 0 occurrences of 'ERD' or 'expected reinsurer deficit'. The only threshold discussed is the US rule-of-thumb 'at least a 10% chance of at least a 10% loss' (p.9, US GAAP section), and the p.25 recommendation rejects a rules-based approach in general. The ERD attribution is not from this source.
- source_rank: 2
- proposed_action: Reword to what the report says (rejects a rules-based / bright-line test, p.25; cites the 10%/10% rule of thumb, p.9) or drop 'ERD-style'.
- applied: false
- fingerprint: a9451cc876db

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- status_set: in_review
- checks_run: syllabus diff (reading absent from Fall 2026 outline; CIA IFRS 1 and OSFI Reinsurance present - warning callout confirmed); frontmatter vs title page (title, Oct 2007, Doc 207081); printed TOC vs bookmark outline; page refs Key Principles p11 / Qualitative Assessment p13 / Limitations p15 / Other Issues p18-23 match printed pagination; full-text search of named positions (rules-based p25, mirroring p19-20 and p25, bifurcation p26, ERD); wiki links; Available-from URL fetched (200)
- sources_checked: CIA Task Force on the Appropriate Treatment of Reinsurance, Report (Document 207081, October 2007), https://www.casact.org/sites/default/files/2021-03/6C_CIA_Reinsurance_Treatment.pdf, sha256 9c41c17ab88467e61d49026825e1ea263634a0f9b5092fa6adf102806e7bb519; CAS Exam 6C Content Outline Fall 2026, https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf, sha256 1bd4b2b802cf0976c797bc068c2903fa8deaf43d9366a85aadf5b34a568275c1
- note: Mirroring, bifurcation and principle-vs-rules bullets match p.25-26. Open major F-001 (regulatory-capital bullet) blocks verification. Historical syllabus scope is consistent with the document's pagination but was not checked against a pre-2026 CAS syllabus. The PDF bookmark outline covers only the p.25-26 recommendations, not the printed TOC - a source-internal gap, not a vault error.
