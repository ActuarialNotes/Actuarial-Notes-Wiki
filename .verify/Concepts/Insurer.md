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
