---
target: Resources/Books/Generalized Linear Models for Insurance Rating (Goldburd et al. - 2020).md
created: 2026-10-17
---

## [F-001] Exam 8 bullet gives the wrong task codes
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-17T23:11Z/f01e
- date: 2026-10-17
- severity: minor
- status: open
- locus: > [!info] On the syllabus, Exam 8 bullet
- claim: The Exam 8 bullet said 'objectives A1, A4–A8', with no edition note.
- evidence: Exam 8 Fall 2026 outline p.5 (sha256:306e7a7b…1964521) prints Goldburd et al.'s Domains/Tasks as 'A1, A3-A5, -A9' and cites 'CAS Monograph #5, 2nd edition, 2025. Including errata.' The Exam 8 page reads the codes as 'A1, A3-A5, A9' and footnotes the stray hyphen. The page's A4-A8 drops A3 and A9 and adds A6-A8, none of which the outline assigns to this reading (A7-A8 are Chalk et al.'s).
- source_rank: 1
- proposed_action: Rewrite the bullet as the exam page reads the outline: 'objectives A1, A3–A5, A9 (the outline prints "A1, A3-A5, -A9"); 2nd edition, 2025, including errata.'
- applied: true
- fingerprint: 6d735ee1e5eb

## [F-002] Sources cites a superseded MAS-II outline
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-17T23:11Z/f01e
- date: 2026-10-17
- severity: nit
- status: open
- locus: ## Sources, MAS-II line
- claim: Sources cited 'CAS Exam MAS-II Content Outline, v04 (December 2024)' at casact.org 2023-06/MASII_Content_Outline.pdf.
- evidence: The current outline, the one quiz/src/data/examPdfLinks.ts and the CAS MAS-II page link, is 2026-01/MASII_Content_Outlines_2026.pdf, version 'MASII_CO_S_2026 v06 2026_1_13' (sha256:babf0548…0ea1b). It cites Goldburd et al. the same way ('2nd edition, 2020. - Chapter 7', C10-11), so the MAS-II bullet itself is unchanged.
- source_rank: 1
- proposed_action: Point the Sources line at the v06 outline.
- applied: true
- fingerprint: 647888b1dfe9

## [F-003] Year 2020 while the linked copy is the 2025 revision
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-17T23:11Z/f01e
- date: 2026-10-17
- severity: minor
- status: open
- locus: frontmatter Year/date; file name
- claim: Year and date are 2020 (and the file name says 2020), while Available from serves the Second Edition (2025 revision), which Exam 8 assigns.
- evidence: The Available from PDF (sha256:89b203ea…ff757) prints 'Second Edition (2025 revision)' on PDF pp.1 and 3 and 'Copyright 2025' on p.4. The 2020 printing (sha256:06f7c01d…46318) prints 'Copyright 2020'. MAS-II's v06 outline and PCPA's v.8 outline cite the 2nd edition, 2020; Exam 8's Fall 2026 outline cites the 2nd edition, 2025, including errata. The lead discloses that the hosted copy is the 2025 revision and that its contents and Chapter 7 match the 2020 printing page for page (confirmed: the two differ only on pp.1, 3, 4, 8, 22-23 and 48-49). This is the same question as Exam 8 (CAS).md F-001, raised here because the field lives on this page.
- source_rank: 1
- proposed_action: Maintainer: decide whether this page describes the 2025 revision (Year/date 2025, file name, links) or the 2020 printing with the revision noted, or whether Exam 8 needs its own page. Then close this and Exam 8 F-001 together.
- applied: false
- fingerprint: 15ac1893cc62

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-17T23:11Z/f01e
- date: 2026-10-17
- resolves: F-001
- status: resolved
- note: Applied in this run: the Exam 8 bullet now gives the exam page's reading of the outline's codes, with the outline's own wording in parentheses and its edition note.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-17T23:11Z/f01e
- date: 2026-10-17
- resolves: F-002
- status: resolved
- note: Applied in this run: the MAS-II Sources line now cites v06 (January 2026) at 2026-01/MASII_Content_Outlines_2026.pdf.

## [C-001] Three wording conflicts inside the document
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-17T23:11Z/f01e
- date: 2026-10-17
- note: Not vault errors. (1) Section 3.2 is 'Communication with Key Stakeholders' in the printed contents (PDF p.5) but 'Communicating with Key Stakeholders' in the body and the bookmarks; the page follows the body. (2) The bookmarks title 8.2 'Check Yourself Before You Wreck Yourself' and 8.3 'What Other Stakeholders Want'; the printed contents and the body say 'Check Yourself' and 'Stakeholder Management', which the page uses. (3) The 2025 revision's copyright page prints 'Copyright 2025' at the top and 'Copyright 2019' at its foot.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-17T23:11Z/f01e
- date: 2026-10-17
- status_set: verified
- confidence: medium
- checks_run: Frontmatter against the copyright pages of both printings (title; the four authors, including Guller, in both; CAS; 2nd edition; Monograph No. 5; print ISBN shared by both); lead against the abstract (PDF p.2); every heading of chapters 1-10, Bibliography and Appendix diffed mechanically against the printed contents and the bookmarks (all match; source-internal conflicts in a comment); Chapter 1 bullets and every Chapter 7 bullet (holdout, percentile buckets and log scale, lift and adverse selection, quantile-plot criteria, double lift sort ratio, loss ratio charts, Lorenz curve and Gini as twice the area, logistic validation, confusion matrix, AUROC 0.5 to 1.0 and AUROC = 0.5 x normalized Gini + 0.5) against the text; Related readings against the Bibliography (Frees, Derrig and Meyers chs. 5, 6, 15, 16; de Jong and Heller 2008; Werner and Modlin 2010); syllabus bullets: MAS-II C10-C11 Chapter 7 (v06), PCPA B1-B2 Chapter 7 (domain B has exactly tasks 1-2), Exam 8 fixed (F-001); 2020-vs-2025 page-by-page diff. resource_lint clean.
- sources_checked: Goldburd, Khare, Tevet and Guller, Generalized Linear Models for Insurance Rating, CAS Monograph Series Number 5, Second Edition (2025 revision) (Casualty Actuarial Society; copyright page prints 'Copyright 2025' and, at its foot, 'Copyright 2019'; ISBN 978-1-7333294-3-9 print), 122 pp., PDF pp.1-9 (cover, abstract, title, copyright, contents pp.5-7, acknowledgments), Chapter 1 (PDF p.11), Chapter 7 and the Bibliography read, plus the 104-entry bookmark outline, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; Same monograph, Second Edition 2020 printing (Copyright 2020, same four authors, same ISBNs), 122 pp., compared page by page with the 2025 revision: text differs only on PDF pp.1, 3, 4, 8 (edition label, copyright year, editorial board) and pp.22-23, 48-49; contents and Chapter 7 identical, sha256:06f7c01d4c80af9a9c6672cb0ace7814c533499b4662b783218f23d12cc46318 — https://www.casact.org/sites/default/files/database/monographs_papers_05-goldburd-khare-tevet.pdf; CAS, Errata, Generalized Linear Models for Insurance Rating, 2nd Edition (2025 revision), approved 1/28/2026, sha256:4622f59623aded645b229235ab0579a527823942ff35dce531033fe534b6735b — https://www.casact.org/sites/default/files/2026-02/Monograph_No_5_Errata_Sheet.pdf; CAS, Exam Content Outline — Advanced Ratemaking – Exam 8, Fall 2026 (Exam_8_CO_2026_F v03 2026_6_22, 6 pp.), PDF pp.1-6 incl. link annotations, sha256:306e7a7b6351597e46fd82fd74c294fce3afc8b1f9227ea8c001f3b081964521 — https://www.casact.org/sites/default/files/2026-03/Exam_8_CO_2026_Fall.pdf; CAS, Exam MAS-II Content Outline 2026 (MASII_CO_S_2026 v06 2026_1_13), text references (Goldburd et al., 2nd edition, 2020, Chapter 7, C10-11), sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf; CAS, PCPA Content Outline v.8 (updated 9.9.2026), Domain B tasks B1-B2 and text references (Goldburd et al., 2nd edition, 2020, Chapter 7, domain B), sha256:e22ce369f08e1feec88b1ed8a9273c67fd585b1c62193ea3105fe1fe8077189f — https://www.casact.org/sites/default/files/2024-05/Exam_PCPA_2025_F_Content_Outlines.pdf
- note: Verified medium. Two transcription fixes (F-001 minor, F-002 nit). F-003 stays open for the maintainer: the edition the page's Year describes is a choice between two syllabi, not a transcription. Medium rather than high because the page's frontmatter and its Available from describe different printings until that is settled.
