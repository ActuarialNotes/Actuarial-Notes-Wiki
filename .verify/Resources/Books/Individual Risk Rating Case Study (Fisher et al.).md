---
target: Resources/Books/Individual Risk Rating Case Study (Fisher et al.).md
created: 2026-10-17
---

## [C-001] The workbook prints no year
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-17T23:11Z/f01e
- date: 2026-10-17
- locus: frontmatter Year/date
- note: The workbook names no author or date on any sheet; its file properties say created 2016-06-30, modified 2021-03-10. The page's Year 2019 is therefore not read from the document. The page says so itself under Sources (the year of the study note's Version 3, October 2019, from the syllabus citation). That is a disclosed inference, so no edit; the verification is medium for that reason.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-17T23:11Z/f01e
- date: 2026-10-17
- status_set: verified
- confidence: medium
- checks_run: Title against the outline citation ('Case Study for "Individual Risk Rating Study Note" (Excel file)'); authors 'Fisher, G., et al.' from the same citation; lead against the Introduction sheet and the study note's foreword ('a single set of fictional claims data'); the Introduction bullet and each Step 1-10 bullet against that sheet's task cells (lognormal fit equivalent to MLE; ILFs at base limit 100,000 and the lognormal LEV; Maya Incorporated experience mod with development, trend, loss limit and Step 2 excess ratio; large deductible premium with no aggregate limit; retro parameters with no max/min and the 1x/0.5x/2x scenarios; vertical slicing at entry ratio 2.0 and $100k for 500 risks; horizontal slicing 0 to 4 by 0.1; Step 8 two scenarios; Steps 9-10 recalculations); syllabus bullet against outline p.5 (B1-B6, Excel file). resource_lint clean.
- sources_checked: CAS, Case Study for 'Individual Risk Rating Study Note' (Excel workbook, 21 sheets: Introduction, Step 1-10 and their answer sheets), Introduction and the ten Step sheets read cell by cell, docProps creator 'Liberty Mutual', created 2016-06-30, modified 2021-03-10, sha256:d1110d51591018fad4286d1c6bcb3dccfa9fbdac87422a044c707ed1f70b3350 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al_Case_Study.xlsx; Fisher, McTaggart, Petker and Pettingell, Individual Risk Rating, CAS Study Note, October 31, 2019 (© Casualty Actuarial Society, 2019), 123 pp., PDF pp.1-6 read (title page, contents pp.4-5, foreword) and the 135-entry bookmark outline, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf; CAS, Exam Content Outline — Advanced Ratemaking – Exam 8, Fall 2026 (Exam_8_CO_2026_F v03 2026_6_22, 6 pp.), PDF pp.1-6 incl. link annotations, sha256:306e7a7b6351597e46fd82fd74c294fce3afc8b1f9227ea8c001f3b081964521 — https://www.casact.org/sites/default/files/2026-03/Exam_8_CO_2026_Fall.pdf
- note: Verified medium: everything the page says is the workbook's or the outline's; only the Year is inferred, and the page discloses that (comment).
