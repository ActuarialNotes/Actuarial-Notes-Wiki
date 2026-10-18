---
target: Resources/Books/Swiss Re Exposure Curves and the MBBEFD Distribution Class (Bernegger - 1997).md
created: 2026-10-18
---

## [F-001] MB/BE/FD correspondence misstated in section 3.2
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/0103
- date: 2026-10-18
- severity: major
- status: open
- locus: ## 3 The MBBEFD Class, 3.2 New parametrisation, third bullet
- claim: The cases b = 1 (a = -1), b = 0 or g = 1 (a = 0) and b·g = 1 (a = ∞) are special cases, as are b·g > 1 (a < 0) and b·g < 1 (a > 0), which correspond to the MB, the BE and the FD distribution respectively.
- evidence: Bernegger p.103 (page image), sha256:5c07f557257622c9dd5f1886705a55de9f368fef1839dd405c87a8550f8a7c89: 'cases b = 1 (i.e. a = -1), b = 0 or g = 1 (i.e. a = 0) and b·g = 1 (i.e. a = ∞) must be treated as special cases. The cases b·g = 1 (i.e. a = ∞), b·g > 1 (i.e. a < 0) and b·g < 1 (i.e. a > 0) correspond to the MB, the BE and the FD distribution, respectively (cf. figure 4.1).' The page dropped b·g = 1 from the second list, so it named three distributions for two cases and called b·g > 1 and b·g < 1 special cases, which they are not (they are the general case of (3.3)). Figure 4.1 (p.110) labels b = p (MB), b > p (BE), b < p (FD), consistent with the paper's text since b·g = 1 is b = p.
- source_rank: 2
- proposed_action: Restore the paper's two sentences: the three special cases, then the three cases b·g = 1, > 1, < 1 matched to MB, BE, FD.
- applied: true
- fingerprint: fa63296b7a28

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/0103
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Corrected in this pass by transcribing p.103: b·g = 1 → MB, b·g > 1 → BE, b·g < 1 → FD; only b = 1, b = 0 or g = 1, and b·g = 1 are special cases.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/0103
- date: 2026-10-18
- status_set: verified
- confidence: high
- checks_run: headings diffed against the paper's section and sub-section headings (no bookmark outline in the scan); every equation diffed against the page image; proper nouns (Daykin, Maxwell-Boltzmann, Bose-Einstein, Fermi-Dirac, Planck, Swiss Re Y1-Y4, Lloyd's) found in the text; frontmatter against p.99 header; syllabus callout against the Exam 9 outline; wiki-links resolve; resource_lint clean
- sources_checked: Bernegger, The Swiss Re Exposure Curves and the MBBEFD Distribution Class (ASTIN Bulletin 27(1), 1997), pp.99-111 (whole paper; every equation (2.1)-(4.6) and figure caption read from the page images, OCR text for the prose), sha256:5c07f557257622c9dd5f1886705a55de9f368fef1839dd405c87a8550f8a7c89 — https://www.casact.org/sites/default/files/2021-03/8_Bernegger.pdf; CAS Exam 9 Content Outline, Fall 2026, pp.3, 7 (task A1-A3, readings Clark and Bernegger), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf
- note: Sections 1-4, Conventions and References match the paper. Equations (2.1)-(2.6), (3.1a/b), (3.2), (3.3), (3.4)-(3.12), (4.1)-(4.6) agree with the page images, including b_c = e^{3.1-0.15(1+c)c}, g_c = e^{(0.78+0.12c)c} and c = 1.5, 2, 3, 4 for Y1-Y4 and c = 5 for the Lloyd's industrial curve. One misstatement in 3.2 (F-001) fixed in this pass. Exam 9 outline: Bernegger, ASTIN Bulletin Vol. 27 No. 1, May 1997, pp. 99-111, task A1, no exclusions.
