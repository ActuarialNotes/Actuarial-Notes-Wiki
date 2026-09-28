---
target: Concepts/Insurer.md
created: 2026-09-28
---

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: in_review
- checks_run: Definition vs P-21-05 §II (insurer pays claims for premium, pooling). Pooling formula SD(S_n/n) = sigma/sqrt(n) vs G&S p.274 and P-21-05 pp.4-5. Example 1 recomputed first: 2.576 x 4000 = 10304; /sqrt(400) = 515.20; /sqrt(40000) = 51.52 - agrees. Example 2 arithmetic recomputed: capital 300, strengthening 70, new capital 230, ratio 200% -> 153.3%, 70/300 = 23%, 700/300 = 2.33 - agrees. All wiki-links resolve.
- sources_checked: Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf — §II How insurance works PDF pp.2-3; §III pooling theorem, CV of the pool tends to zero PDF pp.4-5; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Ch.6: V(cX) = c^2 V(X) (PDF p.267), E((xbar - mu)^2) = sigma^2/n (PDF p.274), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf
- note: In review, not verified: the page is mostly Exam 9 / 6C / 6U material that no source reached this run supports - the frictional-cost bullet (double taxation, agency and distress costs), Forms of insurer, the Canada bullet (OSFI, Insurance Companies Act, MCT, PACICC, IFRS 17) with the 150% supervisory target used in Example 2, the United States bullet (state regulation, admitted vs surplus lines, RBC, IRIS, Schedule F, discounted tax reserves), and Assets = Liabilities + Capital. Needs the Exam 9 capital readings, the OSFI MCT Guideline and the 6U statutory-accounting readings. The z = 2.576 for 99.5% was taken as given, not diffed against the SOA normal table. No errors found in what was checked.

## [F-001] Exam 9, 6U and general insurer claims with no source
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- severity: minor
- status: open
- locus: formula block and bullets 2-5 (Assets = Liabilities + Capital, Why capital is costly, Forms, Canada, United States)
- claim: Frictional costs of capital (double taxation, agency and distress costs); forms of insurer (stock, mutual, reciprocal, Lloyds, captive, RRG); Canada bullet naming PACICC and IFRS 17; US bullet (state regulation, admitted vs surplus lines, RBC, IRIS, Schedule F, discounted tax reserves); Assets = Liabilities + Capital.
- evidence: The C-001 pass of this run found none of these supported by any source reached (P-21-05, Grinstead & Snell); they need the Exam 9 capital readings, the 6U statutory-accounting readings and OSFI guidance. None of those readings was reached this session apart from the OSFI MCT Guideline (2026), which supports only the capital-adequacy part of the Canada bullet.
- source_rank: 1
- proposed_action: Delete what no source supports; restate the Canada bullet from the MCT Guideline.
- applied: true
- fingerprint: e00f5e14bc6b

## [F-001/R] Unsourced bullets deleted; Canada bullet restated from the MCT Guideline
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-001
- status: resolved
- note: Deleted the Assets = Liabilities + Capital formula and the frictional-cost, Forms and United States bullets. Canada bullet rewritten to what the OSFI MCT Guideline (2026) preamble and Chapter 1 say: ICA 515(1) adequate capital, 608(1) adequate margin of assets in Canada for branches (BAAT), the guideline as the framework for the Superintendent, MCT ratio = capital available / minimum capital required, minimum = target-level requirements / 1.5, 100% minimum, 150% supervisory target as a cushion that facilitates early intervention. Added the self-insurance bullet from Friedland PDF p.19 and the independence criterion (stores and fire) from P-21-05 PDF p.6; Example 2 wording aligned with the guideline (minimum capital required; 100% minimum).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Re-verified after resolving F-001 (the C-001 in_review reasons): every remaining statement traced to P-21-05, Grinstead and Snell, the MCT Guideline (2026) or Friedland. z = 2.576 = table 2.5758 rounded. Example 1 recomputed: 2.576 x 4000 = 10304; /20 = 515.20; /200 = 51.52. Example 2 recomputed: 1200 - 700 - 200 = 300; 0.10 x 700 = 70; 230; 300/150 = 200%; 230/150 = 153.3%; 70/300 = 23%; 700/300 = 2.33. All wiki-links resolve. Medium: original worked examples; the OSFI page is hash-bound to its fetch.
- sources_checked: Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf — §II insurer pays claims for premium PDF p.2; §V losses should be reasonably independent, stores in one area against fire PDF p.6; §III CV of the pool tends to zero PDF pp.4-5; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Ch.6: V(cX) = c^2 V(X) (PDF p.267), E((xbar - mu)^2) = sigma^2/n (PDF p.274), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; OSFI, Minimum Capital Test Guideline (2026), Guideline A, dated November 20, 2025, effective January 1, 2026: preamble (ICA subsections 515(1) and 608(1), BAAT) and Chapter 1 §1.1 (target requirements divided by 1.5; MCT ratio = capital available over minimum capital required; 100% minimum; 150% supervisory target, cushion facilitating early intervention), fetched 2026-09-28, sha256:ea844a609d445629333542801b8a08562093647a1c69cf6865c10e17e35db864 — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2026; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS study note), insurers vs self-insurers (funded self-insured programs, captive insurers, pooling associations) PDF p.19, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; SOA Exam P normal distribution table (rev. 4/29/21), Pr(Z<z) = 0.995 at z = 2.5758, sha256:5dbd8a242813fe585c3eb085d32617ff14bcaa0517ca547b263e7b03541a8bcb — https://www.soa.org/globalassets/assets/files/edu/2021/p-1-table-rev-4-29-21.pdf

## [F-002] F-001's fix deleted Exam 9, 6C and 6U content outside this sweep's scope
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- severity: minor
- status: open
- locus: Assets formula; bullets Why capital is costly (Exam 9), Forms, Canada (Exam 6C) second half, United States (Exam 6U)
- claim: F-001/R deleted the Assets = Liabilities + Capital formula and the Exam 9, Forms and United States bullets, and cut the provincial, PACICC and IFRS 17 sentences from the Canada bullet
- evidence: This page is shared by Exam P, 5, 6C, 6U and 9. The Exam P sweep that opened F-001 had no Exam 9, 6C or 6U reading, so the deleted statements were unsourced in this sweep, not shown wrong: no source read in either Exam P run contradicts any of them. Deleting another exam's material because the Exam P sweep could not reach its readings removes content those exams' own sweeps should judge, and the page's C-001 in_review note already records exactly this gap.
- source_rank: 5
- proposed_action: Restore the deleted statements; keep the sourced rewrites (pooling, self-insurance, the MCT sentences of the Canada bullet); leave the page in_review until an Exam 9 / 6C / 6U sweep checks the restored statements against those readings.
- applied: true
- fingerprint: bdee63639358

## [F-002/R] Other exams' content restored; page back to in_review
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-002
- status: resolved
- note: Restored verbatim from the page before this run (commit 3322d0a7): the Assets = Liabilities + Capital formula, the Exam 9 frictional-cost bullet, the Forms bullet (minus its self-insured sentences, which the new sourced Self-insurance bullet covers), the United States (Exam 6U) bullet, and the Canada bullet's provincial-supervision, licensing, PACICC and IFRS 17 sentences (appended after the MCT sentences sourced to the OSFI MCT Guideline). The sourced rewrites from F-001/R stay. The restored statements are unverified: they belong to Exam 9, 6C and 6U readings no Exam P sweep reads.

## [C-003] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- status_set: in_review
- checks_run: Exam P content re-checked as in C-002 (P-21-05 pooling and independence; Grinstead & Snell variance of the mean; Examples 1 and 2 recomputed: 515.20, 51.52; 300 to 230, 200% to 153.3%). Restored text compared line by line with commit 3322d0a7.
- note: In review, not verified: the Exam P content (definition, pooling, self-insurance, MCT sentences, both examples) is sourced as recorded in C-002, but the restored Exam 9 frictional-cost, Forms, Canada provincial/PACICC/IFRS 17 and United States statements and the Assets identity have no source read in this sweep. They are left for an Exam 9 / 6C / 6U sweep rather than deleted. No open findings.
