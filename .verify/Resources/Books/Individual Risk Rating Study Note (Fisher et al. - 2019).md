---
target: Resources/Books/Individual Risk Rating Study Note (Fisher et al. - 2019).md
created: 2026-10-17
---

## [F-001] The four chapter Acknowledgments entries missing
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-17T23:11Z/f01e
- date: 2026-10-17
- severity: nit
- status: open
- locus: ## Chapter 1 - ## Chapter 4 lists
- claim: The chapter lists gave each chapter's numbered sections only.
- evidence: The printed contents (PDF pp.4-5) lists an 'Acknowledgments' entry at the end of every chapter: Chapter 1 (p.15), Chapter 2 (p.31, before 'Appendix to Chapter 2'), Chapter 3 (p.92) and Chapter 4 (p.96).
- source_rank: 2
- proposed_action: Add '- Acknowledgments' in each chapter's list where the contents prints it.
- applied: true
- fingerprint: 999502bf3440

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-17T23:11Z/f01e
- date: 2026-10-17
- resolves: F-001
- status: resolved
- note: Applied in this run: '- Acknowledgments' added to the four chapter lists in the contents' positions.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-17T23:11Z/f01e
- date: 2026-10-17
- status_set: verified
- confidence: high
- checks_run: Frontmatter (title, the four authors in title-page order, CAS, 2019, Study Note) and lead ('October 31, 2019'; the foreword's purpose and chapter summaries) against title page and foreword; every chapter title and section 1-10 / 1-10 / 1-6 / 1-3, the Chapter 2 appendix, Solutions to Chapter Questions and References against the printed contents (the bookmark outline is exported Word styles and also carries body text, so the printed contents is the authority; it spells 'Loss-Sensitive' with a hyphen where the contents does not, and the page follows the contents); the Acknowledgments omission fixed (F-001). Syllabus bullet against outline p.5 (B1-B6, Version 3, October 2019). resource_lint clean.
- sources_checked: Fisher, McTaggart, Petker and Pettingell, Individual Risk Rating, CAS Study Note, October 31, 2019 (© Casualty Actuarial Society, 2019), 123 pp., PDF pp.1-6 read (title page, contents pp.4-5, foreword) and the 135-entry bookmark outline, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf; CAS, Exam Content Outline — Advanced Ratemaking – Exam 8, Fall 2026 (Exam_8_CO_2026_F v03 2026_6_22, 6 pp.), PDF pp.1-6 incl. link annotations, sha256:306e7a7b6351597e46fd82fd74c294fce3afc8b1f9227ea8c001f3b081964521 — https://www.casact.org/sites/default/files/2026-03/Exam_8_CO_2026_Fall.pdf
- note: Verified high after one transcription fix (F-001, nit).
