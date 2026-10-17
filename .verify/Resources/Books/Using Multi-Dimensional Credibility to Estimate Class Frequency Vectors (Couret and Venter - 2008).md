---
target: Resources/Books/Using Multi-Dimensional Credibility to Estimate Class Frequency Vectors (Couret and Venter - 2008).md
created: 2026-10-17
---

## [F-001] No Available from, though the outline links a free CAS copy
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-17T23:11Z/f01e
- date: 2026-10-17
- severity: minor
- status: open
- locus: frontmatter
- claim: The page carried no 'Available from', so the card offered no way to read the paper.
- evidence: Exam 8 outline p.5 hyperlinks the citation to casact.org 2021-03/8_Couret_Venter.pdf (link annotations read with PyMuPDF); that file is the full article (sha256:ce50d8a0…ebba18, 13 pp.), and casact.org is on the PDF proxy allowlist. docs/resource-pages.md section 2.1 names 'the CAS or SOA copy' as an Available from.
- source_rank: 1
- proposed_action: Add Available from: "[casact.org](https://www.casact.org/sites/default/files/2021-03/8_Couret_Venter.pdf)" and list that copy under Sources.
- applied: true
- fingerprint: a6888758ec9e

## [F-002] References division missing
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-17T23:11Z/f01e
- date: 2026-10-17
- severity: nit
- status: open
- locus: after ## 3 Conclusions
- claim: The page's divisions ended at '## 3 Conclusions'.
- evidence: The paper closes with a 'REFERENCES' section after '3. CONCLUSIONS' (CAS copy PDF p.13).
- source_rank: 2
- proposed_action: Add a bare '## References' heading.
- applied: true
- fingerprint: f3825212836e

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-17T23:11Z/f01e
- date: 2026-10-17
- resolves: F-001
- status: resolved
- note: Applied in this run: Available from set to the CAS copy and a Sources line added for it ('the copy the Exam 8 content outline links').

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-17T23:11Z/f01e
- date: 2026-10-17
- resolves: F-002
- status: resolved
- note: Applied in this run: bare '## References' heading added.

## [C-001] Outline and paper disagree on the first page number
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-17T23:11Z/f01e
- date: 2026-10-17
- note: Inside the sources, not a vault error: the Exam 8 outline p.5 cites 'pp. 72-85', the paper's first page prints 'Astin Bulletin 38(1), 73-85'. The page's lead uses the paper's 73-85. Exam 8 page F-002 (its link name drops 'in Workers Compensation') still applies to this page's file name; the page's Title carries the full title.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-17T23:11Z/f01e
- date: 2026-10-17
- status_set: verified
- confidence: high
- checks_run: Frontmatter (full title, Jose Couret and Gary Venter, ASTIN Bulletin, 2008) against the first page; lead (73-85, the hold-out test against a seven-hazard-group system) against the abstract; Abstract bullets; section headings 1-3 against the paper; every bullet of sections 1-3 against the text (Buhlmann z = n/(n+k), k = v/a; reciprocal-variance weights; F/PT/major/minor ratios to TT; even reports 2, 4, 6 predicting odd 3, 5, 7; Tables A and B; quintiles test; Figures 1 and 2; conclusion); both copies compared. Omissions fixed (F-001 Available from, F-002 References). Syllabus bullet against outline p.5 (A2-A4). resource_lint clean.
- sources_checked: Couret and Venter, 'Using Multi-Dimensional Credibility to Estimate Class Frequency Vectors in Workers Compensation', ASTIN Bulletin 38(1), 73-85 (2008), CAS copy, 13 pp. read in full, sha256:ce50d8a0fbc395621d29dd153836b0303a269d94697bb1932b5f334b47ebba18 — https://www.casact.org/sites/default/files/2021-03/8_Couret_Venter.pdf; Same article, Cambridge Core PDF (doi:10.2143/AST.38.1.2030403), 13 pp., text compared word by word with the CAS copy: identical but for Cambridge's per-page download footer, sha256:a1e800e82d62e51f88291ea12c957b049de6c2ed2bff70df0c62795c4b6d6447 — https://www.cambridge.org/core/services/aop-cambridge-core/content/view/72B729B1DE0155A8D93A12F0AA216472/S0515036100015063a.pdf/using-multi-dimensional-credibility-to-estimate-class-frequency-vectors-in-workers-compensation.pdf; CAS, Exam Content Outline — Advanced Ratemaking – Exam 8, Fall 2026 (Exam_8_CO_2026_F v03 2026_6_22, 6 pp.), PDF pp.1-6 incl. link annotations, sha256:306e7a7b6351597e46fd82fd74c294fce3afc8b1f9227ea8c001f3b081964521 — https://www.casact.org/sites/default/files/2026-03/Exam_8_CO_2026_Fall.pdf
- note: Verified high after two fixes (F-001 minor, F-002 nit).
