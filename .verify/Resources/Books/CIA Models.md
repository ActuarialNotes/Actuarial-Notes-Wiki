---
target: Resources/Books/CIA Models.md
created: 2026-09-25
---

## [F-001] Risk-rating summary does not match §1.4: the note's severity x likelihood framework is missing and most listed factors are not the note's
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- severity: major
- status: open
- locus: The organising idea, paragraph 1
- claim: §1.4 asks how much could go wrong: how material the output is, how complex the model, how novel its use, how well understood its limitations, and how much reliance is placed on it.
- evidence: CIA Educational Note, Use of Models (January 2017, doc 217007), https://www.casact.org/sites/default/files/2021-03/6C_CIA_Models.pdf sha256:45c5af8ea1cbe24ccff430365d8aa14be1b6d5be22be10744566267af0b5abb9 §1.4, PDF p.7-8: 'Model risk exposure can be considered along two scales: severity and likelihood of failure in a model.' Severity factors: financial significance of the results; importance of decisions made using the model and its contribution; frequency of use; non-financial impact (reputation, opportunity cost). Likelihood factors: complexity; required knowledge and expertise of users; adequacy of documentation; sufficiency of testing; independence of the validator from the developer; adequacy of peer review. 'Typically, the actuary has limited control over severity ... can exert considerable control on likelihood.' Only complexity overlaps with the page's list; novelty of use is §2.2, not a §1.4 rating factor.
- source_rank: 2
- proposed_action: Rewrite the paragraph around the two scales (severity: financial significance, decision importance, frequency of use, non-financial impact; likelihood: complexity, user expertise, documentation, testing, validator independence, peer review) and the point that the actuary controls likelihood more than severity. Requires authored prose.
- applied: false
- fingerprint: 9cc68e8f3923

## [F-002] Validation paragraph attributes techniques to §4.3 and §4.6 that those sections do not contain
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- severity: minor
- status: open
- locus: Validation, paragraph 1
- claim: Results validation includes back-testing, reasonableness against an independent estimate, and sensitivity testing (§2.5). §4.6 adds the specific hazards of stochastic models: too few scenarios, an unvalidated scenario generator, and treating simulation output as more precise than the assumptions behind it.
- evidence: CIA Educational Note, Use of Models (January 2017, doc 217007), https://www.casact.org/sites/default/files/2021-03/6C_CIA_Models.pdf sha256:45c5af8ea1cbe24ccff430365d8aa14be1b6d5be22be10744566267af0b5abb9: backtesting and comparison to other models are listed under §2.1 (new model testing), PDF p.10, not §4.3. §4.3 (PDF p.15) lists: outputs consistent with inputs; error counts within tolerance; results as expected in direction and magnitude; consistency with trend; consistency with sensitivity analysis; attribution analysis; out-of-sample predictive testing. §4.6 (PDF p.16-17) covers reasonableness of input distributions and correlations (including tail dependence), reviewing a sample of deterministic scenarios and the output distribution, and that a stochastic result is itself an estimate whose variance more scenarios reduce but cannot eliminate. An economic scenario generator appears only in hypothetical example 6.6.
- source_rank: 2
- proposed_action: Replace with §4.3's own checks and §4.6's own considerations, or move backtesting to §2.1. Rewording, left for an author.
- applied: false
- fingerprint: 68c88babfdcf

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- status_set: in_review
- checks_run: syllabus diff (Jan 2017, C5, no exclusions); contents built from PDF bookmark outline then compared; full-text search of asserted terms; section attribution; wiki-link check; frontmatter vs title page
- sources_checked: CIA Educational Note, Use of Models (January 2017, doc 217007), https://www.casact.org/sites/default/files/2021-03/6C_CIA_Models.pdf sha256:45c5af8ea1cbe24ccff430365d8aa14be1b6d5be22be10744566267af0b5abb9 — bookmark outline; §§1.4, 2.1, 4.3, 4.6, 5.3; CAS Exam 6C Content Outline Fall 2026, https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf sha256:1bd4b2b802cf0976c797bc068c2903fa8deaf43d9366a85aadf5b34a568275c1
- note: Contents table matches the bookmark outline one-for-one (sections 1-6 with every subsection, Appendices 1-2); date, doc and objective C5 match the Fall 2026 outline. Left in_review because F-001 (major: §1.4 risk-rating summary omits the severity/likelihood framework) is open; F-002 minor also open.
