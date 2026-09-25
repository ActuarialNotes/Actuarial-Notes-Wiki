---
target: Resources/Books/CIA Materiality.md
created: 2026-09-25
---

## [F-001] §7 summary contradicts the report: says actuarial materiality serves a different purpose from the auditor's
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- severity: major
- status: open
- locus: The argument, bullet 4 (Accounting versus actuarial materiality)
- claim: the auditor sets materiality ... usually as a percentage of a benchmark such as pre-tax income or equity. The actuary's standard serves a different purpose and may legitimately be tighter or looser.
- evidence: CIA Task Force on Materiality, Report: Materiality (October 2007, doc 207099), https://www.casact.org/sites/default/files/2021-03/6C_CIA_Materiality.pdf sha256:d3577342add2540b3be85d40ab119548467c5ca88e5f48f3168d75ebdac7233a §7, PDF p.10: 'An accountant or auditor working for the same entity would presumably base his or her selection of the materiality level on similar criteria. Some actuaries would argue that, at least in theory, the materiality level selected by the actuary would normally be close to that selected by the accountant or auditor given that the report was prepared for financial reporting purposes.' SOP 1630.10(e) is quoted requiring the actuary's level to be 'appropriate in relation to the enquiring professional's materiality level'. 'pre-tax' occurs nowhere in the report and §7 names no auditor benchmark (the §6 benchmark list, p.9-10, is statutory surplus/solvency ratio, net worth/net income/EPS, net income and net capital). The report's point is similar criteria plus communication, not a different purpose.
- source_rank: 2
- proposed_action: Delete the benchmark clause and the 'different purpose, tighter or looser' sentence (transcription-level deletion). An author may add the report's 'similar criteria / normally close in theory' point.
- applied: true
- fingerprint: c88f4d5a010e

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- resolves: F-001
- status: resolved
- note: Deleted the unsupported benchmark clause and the 'different purpose' sentence; the bullet now says only that the auditor sets FS materiality and the two levels need not agree but must be communicated (supported by §7, PDF p.11: 'If such materiality levels are not the same, good communication would facilitate the discussion').

## [F-002] §6 considerations list includes items not in §6 and omits several that are
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- severity: minor
- status: open
- locus: The argument, bullet 3 (Considerations in the determination, §6)
- claim: Considerations in the determination (§6) — the purpose of the work, the users and their needs, the entity's size and capital position, the nature of the item, and whether the effect accumulates with other items.
- evidence: CIA Task Force on Materiality, Report: Materiality (October 2007, doc 207099), https://www.casact.org/sites/default/files/2021-03/6C_CIA_Materiality.pdf sha256:d3577342add2540b3be85d40ab119548467c5ca88e5f48f3168d75ebdac7233a §6 summary list, PDF p.9-10: purposes and intended uses of the work (with per-purpose benchmarks), exclusive reliance on quantitative benchmarks inappropriate, and entity characteristics: size, access to capital, stage of organizational life cycle, type of business, net retention; plus financial strength (SOP 1340.04: more rigorous as the entity approaches a threshold) and single vs multiple materiality levels. 'Nature of the item' and accumulation of effects are not in §6 (the only 'aggregate of misstatements' text, p.14, is in the non-examinable Appendix).
- source_rank: 2
- proposed_action: Replace the list with §6's own considerations (purpose/intended use, entity size, access to capital, life-cycle stage, type of business, net retention, approach to a threshold). Requires rewording, left for an author.
- applied: false
- fingerprint: 94610aa72d3d

## [C-001] Source-internal: PDF bookmark outline does not match printed table of contents
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- note: The CAS-hosted PDF's bookmark outline has a single entry, 'ASOP No. 41, Actuarial Communications' -> p.15 (a reference inside the Appendix), whereas the printed table of contents (PDF p.3) lists sections 1-9 and the Appendix. The page's contents table follows the printed TOC exactly. Conflict is inside the source, not a vault error. Also noted: the report cites the 2007 SOP numbering (subsection 1340 for materiality, 1620/1630 for auditor relations); the page's reference to CSOP §1240 uses the current numbering and was not checked against the current CSOP in this pass.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- status_set: verified
- confidence: medium
- checks_run: syllabus diff (Oct 2007, C1/C5, Appendix excluded); contents built from printed TOC and bookmark outline (conflict logged); full-text search of asserted terms; section attribution; wiki-link check; frontmatter vs title page
- sources_checked: CIA Task Force on Materiality, Report: Materiality (October 2007, doc 207099), https://www.casact.org/sites/default/files/2021-03/6C_CIA_Materiality.pdf sha256:d3577342add2540b3be85d40ab119548467c5ca88e5f48f3168d75ebdac7233a — printed TOC p.3, §§5-8; CAS Exam 6C Content Outline Fall 2026, https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf sha256:1bd4b2b802cf0976c797bc068c2903fa8deaf43d9366a85aadf5b34a568275c1
- note: Title, date, doc, task-force authorship, 'for discretionary use by actuaries' and the Appendix exclusion all match. Contents table matches the printed TOC 1-9 + Appendix. F-001 (major, §7 misstatement) fixed by deletion; F-002 (minor, §6 list) left open for an author. Confidence medium: the CSOP §1240 attribution is to a different document and was not checked here.
