---
target: Resources/Books/An Actuarial Note on the Credibility of Experience of a Single Private Passenger Car (Bailey and Simon - 1959).md
created: 2026-10-17
---

## [F-001] Appendix I model's first frequency is .05, not .06
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-17T23:11Z/f01e
- date: 2026-10-17
- severity: minor
- status: open
- locus: ## Appendix I, bullet
- claim: The page said Appendix I's model has '100,000 risks at a true claim frequency of .06'.
- evidence: Appendix I (PCAS XLVI p.164, PDF p.6, read as a page image) prints '100,000 risks have an inherent hazard, as measured by their true claim frequency, of .05', and its table's first row is 'Frequency .05': 100,000 / 95,123 / 90,484 / 86,071 claim-free and 5,000 claims in the next year. The PDF's OCR text layer misreads the prose figure as '.06', which is where the page's value came from. Rank-5 check agrees with the print: 100,000 x e^-0.05 = 95,123 and 100,000 x .05 = 5,000; with .06 the t=1 count would be 94,176.
- source_rank: 2
- proposed_action: Change .06 to .05.
- applied: true
- fingerprint: e6218c94eff6

## [F-002] Table 1 is as of June 30, 1959, not 1958
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-17T23:11Z/f01e
- date: 2026-10-17
- severity: minor
- status: open
- locus: ## Tables 1 to 4, Table 1 bullet
- claim: The page described Table 1 as 'policy years 1957 and 1958 as of June 30, 1958'.
- evidence: Table 1's heading (PCAS XLVI p.162, PDF p.4, read as a page image) prints 'Policy Years 1957 & 1958 as of June 30, 1959'. The OCR text layer reads '195s', which is where the page's 1958 came from.
- source_rank: 2
- proposed_action: Change June 30, 1958 to June 30, 1959.
- applied: true
- fingerprint: 861c206590ce

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-17T23:11Z/f01e
- date: 2026-10-17
- resolves: F-001
- status: resolved
- note: Applied in this run: Appendix I bullet now reads .05, as printed.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-17T23:11Z/f01e
- date: 2026-10-17
- resolves: F-002
- status: resolved
- note: Applied in this run: Table 1 bullet now reads 'as of June 30, 1959', as printed.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-17T23:11Z/f01e
- date: 2026-10-17
- status_set: verified
- confidence: high
- checks_run: Frontmatter (title, authors Robert A. Bailey and Leroy J. Simon, CAS, 1959) against the first page; the six-page length and p.159 start; lead and every bullet against the text: merit ratings A/X/Y/B and 65:80:90:100, premium base, Modification = ZR + (1 - Z) and Z = 1 - Modification at R = 0, Tables 2 and 3, square-root remark, Class 1B 1.044 and .043 vs .046, Table 4 losses, the three conclusions; Appendix I and II (m/(1 - e^-m), .087 -> 1.044, recomputed); Hazam discussion (premium-base caveats, k = 2074, theoretical 1.00/1.91/2.74 vs observed 1.00/1.48/1.74, recomputed from 100/2174, 200/2274, 300/2374). Two OCR-derived numbers checked against page images and fixed (F-001, F-002). Syllabus bullet against outline p.5 (A2-A4, Hazam PCAS XLVII 1960 pp.150-152). resource_lint clean.
- sources_checked: Bailey and Simon, 'An Actuarial Note on the Credibility of Experience of a Single Private Passenger Car', PCAS XLVI (1959) pp.159-164, CAS PDF (scan with OCR text layer), 6 pp. read in full, Table 1 heading (PDF p.4) and Appendix I (PDF p.6) also read as page images, sha256:3e44bb5b3d17e96aaae61b27b0d72889043c44feb049a3ca3444095101f456e2 — https://www.casact.org/sites/default/files/2021-03/8_Bailey_Simon.pdf; Hazam, discussion of Bailey and Simon, Discussions of Papers Read at the November 1959 Meeting, PCAS XLVII (1960) pp.150-152, 3 pp. read in full, sha256:48b8d420ffd358904509532447e15d50df0d5b1756c2026f81e8d058a02f09e4 — https://www.casact.org/sites/default/files/2021-03/8_Bailey_Simon_Discussion_of_Paper.pdf; CAS, Exam Content Outline — Advanced Ratemaking – Exam 8, Fall 2026 (Exam_8_CO_2026_F v03 2026_6_22, 6 pp.), PDF pp.1-6 incl. link annotations, sha256:306e7a7b6351597e46fd82fd74c294fce3afc8b1f9227ea8c001f3b081964521 — https://www.casact.org/sites/default/files/2026-03/Exam_8_CO_2026_Fall.pdf
- note: Verified high after two transcription fixes, both OCR misreads carried onto the page (F-001 .06 -> .05, F-002 1958 -> 1959).
