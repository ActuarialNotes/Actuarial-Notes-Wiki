---
target: Resources/Books/CIA Bias.md
created: 2026-09-25
---

## [F-001] Section 3.1 bias definition contradicts the source
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- severity: major
- status: open
- locus: ## Contents, Section 3 bullet 'Bias'
- claim: Bias - a systematic deviation of an estimate from the quantity being estimated. Statistical bias, data bias and societal bias are different things and the word is used for all three.
- evidence: CIA, Bias and Fairness in Pricing and Underwriting of Property and Casualty (P&C) Risks (April 2023, Document 223056), https://www.cia-ica.ca/publications/223056e/ (PDF dl_file.php?p=36259&fid=17085), sha256 558193e3d8344daf933360215a5e1463758c5d833da639bd91b280febfbf8bb2 s.3.1 p.8 defines: 'Bias in P&C pricing is any situation in which the outcomes of ratemaking models are systematically less favourable to individuals within a particular group and where there is no relevant difference between groups that justifies the difference in premiums or rates', building on the Bill C-27 (AIDA) 'biased output' definition (p.7). It then says the statistical definition ('expected value of an estimator differs from the true underlying value') 'should be considered an unrelated concept' and that in this document 'bias' does not refer to it. The page gives the excluded statistical definition as the document's definition. 'data bias' and 'societal bias' occur 0 times in the document.
- source_rank: 2
- proposed_action: Replace the bullet with the s.3.1 definition (p.8) and note the explicit exclusion of statistical bias. Needs authored prose - human edit.
- applied: false
- fingerprint: 9fe2c9b266e0

## [F-002] Section 3.3 fairness content misattributed
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- severity: major
- status: open
- locus: ## Contents, Section 3 bullet 'Fairness'
- claim: Fairness - has no single definition; the document sets out competing formalisations (group fairness, individual fairness, actuarial fairness) that cannot all be satisfied at once.
- evidence: CIA, Bias and Fairness in Pricing and Underwriting of Property and Casualty (P&C) Risks (April 2023, Document 223056), https://www.cia-ica.ca/publications/223056e/ (PDF dl_file.php?p=36259&fid=17085), sha256 558193e3d8344daf933360215a5e1463758c5d833da639bd91b280febfbf8bb2 s.3.3 p.9: 'No single definition or measure of fairness exists' (matches), then five harm questions (who is harmed, how much, size of pool, essential product, societal view) and the split into procedural fairness and distributive fairness. Group/individual fairness appear only in the Executive summary (p.3) and s.4.2 (p.11), outside the assigned Sections 1-3; 'actuarial fairness' appears once, in Section 2 (p.5); no statement that the formalisations 'cannot all be satisfied at once' was found. The page omits procedural vs distributive, which is the section's actual taxonomy.
- source_rank: 2
- proposed_action: Replace with the s.3.3 content: no single definition; the five harm questions; procedural vs distributive fairness (regulation focuses on procedural). Needs authored prose.
- applied: false
- fingerprint: c0735750b0fd

## [F-003] Section 2 summary does not match the assigned text
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- severity: major
- status: open
- locus: ## Contents, Section 2 bullet
- claim: Section 2 - How restrictions on rating variables arose, and why proxy discrimination through correlated variables (postal code, credit information, occupation) is the live problem rather than direct use of a prohibited variable.
- evidence: CIA, Bias and Fairness in Pricing and Underwriting of Property and Casualty (P&C) Risks (April 2023, Document 223056), https://www.cia-ica.ca/publications/223056e/ (PDF dl_file.php?p=36259&fid=17085), sha256 558193e3d8344daf933360215a5e1463758c5d833da639bd91b280febfbf8bb2 Section 2 (pp.5-7) covers fairness as an evolving social construct, the Globe and Mail 'Bias Behind Bars' Correctional Service Canada risk-score example, redlining, and gender rating with the SCC judgment in Zurich Insurance Co. v. Ontario (Human Rights Commission) [1992] (quoted p.7), then US NAIC references. Proxy/indirect discrimination is s.3.2 (p.8); 'occupation' occurs 0 times in the document; 'credit' occurs only in s.3.5 (p.10, Ontario ban on credit in auto rating); 'postal' first appears p.12 (Section 4). A candidate reading this page for the assigned Section 2 would miss Zurich, redlining and the prison example.
- source_rank: 2
- proposed_action: Rewrite the Section 2 bullet from pp.5-7 (social-construct framing, TGAM example, redlining, gender/Zurich v. Ontario). Needs authored prose.
- applied: false
- fingerprint: 3a95e70c6f29

## [F-004] Section 3.5 ethics framing contradicts source on law
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- severity: minor
- status: open
- locus: ## Contents, Section 3 bullet 'Ethics'
- claim: Ethics - the frame in which the trade-off gets resolved, since neither statistics nor law settles it.
- evidence: CIA, Bias and Fairness in Pricing and Underwriting of Property and Casualty (P&C) Risks (April 2023, Document 223056), https://www.cia-ica.ca/publications/223056e/ (PDF dl_file.php?p=36259&fid=17085), sha256 558193e3d8344daf933360215a5e1463758c5d833da639bd91b280febfbf8bb2 s.3.5 p.10 is built on the CIA Rules of Professional Conduct and 'Respect of the law: Practitioners have an unequivocal obligation to uphold the law', with examples (Quebec social condition, New Brunswick age, Ontario credit ban for auto). It does not say law fails to settle the question; it puts legal compliance first.
- source_rank: 2
- proposed_action: Restate s.3.5: Rules of Professional Conduct plus the unequivocal obligation to respect applicable law across jurisdictions.
- applied: false
- fingerprint: 76232cc110c5

## [F-005] Section 1 cross-reference content misattributed
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- severity: minor
- status: open
- locus: ## Contents, Section 1 bullet
- claim: Section 1 ... cross-references the CIA's Rules of Professional Conduct and the Consolidated Standards of Practice.
- evidence: CIA, Bias and Fairness in Pricing and Underwriting of Property and Casualty (P&C) Risks (April 2023, Document 223056), https://www.cia-ica.ca/publications/223056e/ (PDF dl_file.php?p=36259&fid=17085), sha256 558193e3d8344daf933360215a5e1463758c5d833da639bd91b280febfbf8bb2 s.1.3 'Cross-references' (p.5) is a generic clause (references include future amendments/successors); it names no document. The Rules of Professional Conduct are cited in s.3.5 (p.10); the Standards of Practice link ('closely linked with Section 1400') is on p.4 before Section 1. 'Educational note' occurs 0 times; the CIA site files it under 'Practice resource documents' (matches frontmatter Type).
- source_rank: 2
- proposed_action: Describe s.1.3 as the generic cross-reference clause; move the RPC/SOP references to where the source makes them.
- applied: false
- fingerprint: 40bcbcad7968

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- status_set: in_review
- checks_run: syllabus diff (A1, April 2023, Sections 1-3 only - match); frontmatter vs title page (title, April 2023, Doc 223056); outline from bookmark outline and printed TOC first, then page compared (headings 1.1-1.3, 2, 3.1-3.5, 4-7, appendices all accounted for); full-text search of every named term (group/individual/actuarial fairness, data/societal/statistical bias, postal, occupation, credit, proxy, Rules of Professional Conduct); read Sections 1-3 in full; wiki links; Available-from URL fetched (200)
- sources_checked: CIA, Bias and Fairness in Pricing and Underwriting of Property and Casualty (P&C) Risks (April 2023, Document 223056), https://www.cia-ica.ca/publications/223056e/ (PDF dl_file.php?p=36259&fid=17085), sha256 558193e3d8344daf933360215a5e1463758c5d833da639bd91b280febfbf8bb2; CAS Exam 6C Content Outline Fall 2026, https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf, sha256 1bd4b2b802cf0976c797bc068c2903fa8deaf43d9366a85aadf5b34a568275c1
- note: Section list and assigned-scope statement are correct, and 3.2 (direct/indirect) and 3.4 (bias vs fairness) are consistent with the source. Three major findings on the Section 2, 3.1 and 3.3 summaries block verification.
