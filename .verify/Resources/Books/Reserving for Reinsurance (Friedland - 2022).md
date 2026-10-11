---
target: Resources/Books/Reserving for Reinsurance (Friedland - 2022).md
created: 2026-10-11
---

## [C-001] Date of the document: a conflict inside the sources, already explained on the page
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rda
- date: 2026-10-11
- locus: frontmatter Year/date; Sources note
- note: The study note's copyright page (PDF p.2) reads '(c) 2023 Casualty Actuarial Society' and the document prints no other date; the Fall 2026 content outline (PDF p.5) cites it as 'Friedland, J. F., "Reserving for Reinsurance," CAS Study Note, 2022.' The page dates it 2023 from the document, keeps the outline's 2022 in the filename, and says so in its Sources note. Logged as a source-side conflict, not a vault error.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rda
- date: 2026-10-11
- status_set: verified
- confidence: high
- checks_run: outline built from the bookmarks and printed contents before re-reading the page; every heading diffed against both (the one difference, Bordereau Reporting in the bookmarks only, is noted on the page); every bullet checked against its section's text; every number recomputed (27M wildfire: 7+10+10, 5 ceded per risk, 2 over the 20 cat retention; Table 1.2 180%; 3-line surplus 75%; Table 3.4 3.00 vs 2.80-3.13; Table 3.5 SDs 0.50/0.84 and 0.73/2.91; Table 3.12 0.04-0.64; Table 3.15 2,986-400=2,586 x 70% = 1,810 capped at 1,500); frontmatter against title/copyright page; scope against the outline (A15-A17, whole note); related readings' citations located in the text; Available-from URL fetched
- sources_checked: Friedland, Reserving for Reinsurance (CAS Study Note — Exam 7, (c)2023 CAS; cited by the outline as 2022), PDF pp.1-77 (title, copyright, printed contents pp.3-5, bookmark outline, preface, Chapters 1-3 text and Tables 1.1-3.15), sha256:6da495a26206ececf40a3c3fc8fb3db04556c940242f5bcffe2b21b7e4445ceb — https://www.casact.org/sites/default/files/2022-11/Exam7_Study_Note_Friedland.pdf; CAS, Exam 7 Content Outline, Fall 2026 (Exam_7_CO_2026_F v04 2026_9_16), PDF pp.3-6 (task A.v.15-17; Friedland citation A.v.1-A.v.3), sha256:be1833c4f35a9344e33b1c48336dca9724d6556890997b3d8715f9de709ca5ed — https://www.casact.org/sites/default/files/2026-03/Exam_7_CO_2026_Fall.pdf
- note: Nothing wrong found. Chapter attribution of every point matches the source's own sections.
