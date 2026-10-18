---
target: Resources/Books/From GLMs to Comprehensive Insurance Pricing: Techniques and Challenges (Chalk et al.).md
created: 2026-10-17
---

## [F-001] Two front-matter divisions missing from the outline
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-17T23:11Z/f01e
- date: 2026-10-17
- severity: nit
- status: open
- locus: headings before ## 1 Introduction
- claim: The page's divisions began at '## 1 Introduction', omitting the front matter the document lists.
- evidence: The printed contents (PDF p.5) opens 'Acknowledgments ... vii' and 'About the Authors ... viii' before '1. Introduction', and the PDF bookmark outline has the same two entries; both divisions are in the document (PDF pp.9-11).
- source_rank: 2
- proposed_action: Add '## Acknowledgments' and '## About the Authors' as bare headings before '## 1 Introduction'.
- applied: true
- fingerprint: 36eb29aae43d

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-17T23:11Z/f01e
- date: 2026-10-17
- resolves: F-001
- status: resolved
- note: Applied in this run: the two headings added, bare, as the standard asks for a division with nothing to add.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-17T23:11Z/f01e
- date: 2026-10-17
- status_set: verified
- confidence: high
- checks_run: Frontmatter (title, the four authors in title-page order, CAS, 2025, Monograph No. 16, print ISBN) against cover, title and copyright pages; lead against 1.1 Objectives and the cover's 'Commissioned by the Exam 8 Working Group'; every chapter, section and subsection heading (chapters 1-10, Bibliography) diffed mechanically against both the bookmark outline and the printed contents: all match (the bookmarks spell λ as 'lambda'); front-matter omission fixed (F-001). Syllabus bullet against outline p.5 (A7-A8, CAS Monograph #16, 1st edition). resource_lint clean.
- sources_checked: Chalk, Deacon, Guillen and Martinelli, From GLMs to Comprehensive Insurance Pricing: Techniques and Challenges, CAS Monograph Series Number 16 (Casualty Actuarial Society, copyright 2025; commissioned by the Exam 8 Working Group), 189 pp., PDF pp.1-15 read (cover, title, copyright page with ISBN 978-1-7370028-8-8 print, contents, acknowledgments, about the authors, chapters 1-2 opening) and the 147-entry bookmark outline, sha256:0b293634c3d6320eac9aca5d2f8ba4ca7954f20db8a462b24771c60b5e046d74 — https://www.casact.org/sites/default/files/2026-02/CAS_Monograph-16_From_GLMs.pdf; CAS, Exam Content Outline — Advanced Ratemaking – Exam 8, Fall 2026 (Exam_8_CO_2026_F v03 2026_6_22, 6 pp.), PDF pp.1-6 incl. link annotations, sha256:306e7a7b6351597e46fd82fd74c294fce3afc8b1f9227ea8c001f3b081964521 — https://www.casact.org/sites/default/files/2026-03/Exam_8_CO_2026_Fall.pdf
- note: Verified high after one transcription fix (F-001, nit).
