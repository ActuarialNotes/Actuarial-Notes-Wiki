---
target: Resources/Books/Risk and Insurance (SOA).md
created: 2026-09-27
---

## [F-001] Syllabus citation names a past sitting (July 2026)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- severity: minor
- status: open
- locus: ## Sources, second entry (line 85)
- claim: Sources cites 'SOA Exam P Syllabus, July 2026' (https://www.soa.org/globalassets/assets/files/edu/2026/july/syllabi/2026-07-p-syllabus.pdf) as the syllabus that names Risk and Insurance as background an Exam P candidate is expected to know.
- evidence: Fetched the cited URL this session (HTTP 200, 259,009 bytes, sha256:d441d15582c7f77a783a012ef25c09f07b9c4bdcf781b8f667b589c59fb1e719). Its Risk and Insurance wording ('the candidate is expected to be familiar with the concepts introduced in "Risk and Insurance"', p.1 purpose paragraph and p.7 REFERENCES > Other Resources, hyperlinked to https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf) is word for word the same in the current SOA Probability Exam syllabi: September 2026 (sha256:a67f56f7ef60ff673730e28b6b6361168d0889683c78373f29a1ed38c1e5d7e3), November 2026 (sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397) and January 2027 (sha256:252d07fc2b3be499bdee55caaf40f5bd610c2d9593bee2f0428b6614d4e14e2a). A full-text diff of all four PDFs differs only in the 'Probability Exam - <sitting>' title line. So the page's statement is still true, but the July 2026 sitting has passed, and docs/resource-pages.md section 2.4 wants scope from the current sitting's syllabus rather than another sitting's.
- source_rank: 1
- proposed_action: Re-point the entry to the current sitting's syllabus, e.g. [SOA Exam P Syllabus, November 2026](https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf): 'the candidate is expected to be familiar with the concepts introduced in "Risk and Insurance"' (p.1; REFERENCES > Other Resources, p.7). Not applied: it changes the page's statement of what it was written from, so it is re-sourcing rather than transcription.
- applied: false
- fingerprint: 1f538289baa6

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- status_set: verified
- confidence: high
- checks_run: outline built from the document before re-reading the page (no PDF bookmarks and no printed contents page; headings I-X, with DEDUCTIBLES and BENEFIT LIMITS under VI), diffed both ways: no missing, extra or misnumbered division; every bullet diffed against its section's text and checked for attribution; 110 terms and figures full-text searched, all found; rank-5 recomputation of every number (31%/11%, 750/2442, 3.26/0.326, 650, 610, +46%/+54%/+34%, 1.5/5.27/3.51/0.25, 0.91/4.17/182/146), all agree; frontmatter checked against the title page; Available from fetched with resource_extract.py; Jul/Sep/Nov 2026 and Jan 2027 syllabi diffed; resource_lint clean; 11 wiki-links and the cover embed resolve
- sources_checked: Anderson & Brown, Risk and Insurance (SOA Education and Examination Committee study note P-21-05, copyright 2005, second printing), 16 pp.: title page and Sections I-X read in full (text layer, plus page images of pp.4 and 12-14 for the math) — sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf; SOA Probability Exam syllabus, November 2026, p.1 (purpose paragraph) and p.7 (REFERENCES > Other Resources) — sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
- note: Available from URL fetched with resource_extract.py: byte-identical to the checked copy (same sha256). File metadata gives the author as 'Judy Anderson'; the title page's 'Judy Feldman Anderson' governs, and the page follows it. There is no 'On the syllabus' callout, which is correct under docs/resource-pages.md 2.3 and the lint's syllabus rule: no exam page's Source Material lists the note, and Exam P-1 (SOA).md lists it under Prerequisite knowledge. That matches the syllabus's p.1 wording ('expected to be familiar with the concepts introduced in "Risk and Insurance"'); the syllabus also lists it under REFERENCES > Other Resources, p.7. Whether the exam page should carry it in Source Material is that page's question. Nothing about this note changes in January 2027: that syllabus (sha256:252d07fc2b3be499bdee55caaf40f5bd610c2d9593bee2f0428b6614d4e14e2a) and September 2026 (sha256:a67f56f7ef60ff673730e28b6b6361168d0889683c78373f29a1ed38c1e5d7e3) differ from November 2026 only in the sitting line. Consistency note, not a finding here: the note uses 'coinsurance' broadly (any case where the policyholder covers part of the loss: maximum, minimum, percentage or per-type limit, p.7). The linked Concepts/Coinsurance.md defines only the percentage-share provision. Open: F-001 (minor, stale July 2026 syllabus citation).
