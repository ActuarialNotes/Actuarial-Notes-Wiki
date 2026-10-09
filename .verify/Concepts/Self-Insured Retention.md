---
target: Concepts/Self-Insured Retention.md
created: 2026-09-13
---

## [F-001] Unsourced $250,000 threshold for a large deductible program
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/f8d9
- date: 2026-09-13
- severity: minor
- status: open
- locus: bullet 'Large deductible programs'
- claim: Large deductible programs are 'a policy written with a deductible of $250,000 or more'.
- evidence: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c. Ch.11 printed p.199 (PDF p.211): flat dollar deductibles 'may range from very small amounts (e.g., $100 or $250) on personal lines policies to very large deductibles (e.g., $100,000 or more) on large commercial policies'; the Ch.15 large-deductible worked example (printed p.304, PDF p.316) uses $500,000. Neither Werner nor Friedland states a $250,000 threshold, and full-text search of both for 'self-insured retention' returns zero hits, so no figure on this page's threshold claim is sourceable from the Exam 5 readings. The rest of the bullet IS confirmed by Werner printed p.304: the insurer 'will make the payments on all claims and will seek reimbursement for amounts below the deductible from the insured', with explicit provisions for deductible-processing cost and for credit risk where 'deductible recoveries will not be fully collateralized'.
- source_rank: 2
- proposed_action: Present the threshold as conventional/illustrative (Werner's own example figures are $100,000+ and $500,000), or cite the source that defines it.
- applied: false
- fingerprint: 2e3f3c54f2a2

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/f8d9
- date: 2026-09-13
- status_set: verified
- confidence: medium
- checks_run: Recomputed the layering example from scratch before reading it: ultimates 120+380+650+1,400+95 = 2,645K; retained sum min(X,500K) = 120+380+500+500+95 = 1,595K; excess sum max(X-500K,0) = 150+900 = 1,050K; 1,595+1,050 = 2,645 reconciles; retained share 1,595/2,645 = 60.3%, and two of five claims pierce -- all as stated. Both display formulas are the correct per-occurrence layer identities. Source support located for: self-insurers/captives/pools needing unpaid claim estimates (Friedland p.13, 'insurer' means any risk bearer including self-insured entities, pools, captives); exposure bases for self-insureds (p.35); retention changes distorting accident year data and 'retentions can also distort severities' (pp.41, 73); triangles built on claims limited to a fixed per-occurrence amount (p.73); and the large-deductible mechanics -- insurer pays and seeks reimbursement, deductible-processing cost, credit risk where recoveries are not fully collateralized (Werner p.304). Confidence is medium, not high, because the term 'self-insured retention' returns zero hits in Werner, Friedland and ASOP 43, so two claims are unconfirmed within the Exam 5 corpus: the $250,000 large-deductible threshold (F-001) and the SIR-vs-deductible statement that a deductible erodes the policy limit while the excess limit sits above an SIR -- true in market practice but not stated in any of these readings. LaTeX, table arithmetic, links and embed all check out.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.11 printed p.199 (PDF p.211) and Ch.15 large-deductible example printed p.304 (PDF p.316), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch.1 printed p.13 (PDF p.19), Ch.3 printed pp.35 and 41 (PDF pp.41, 47), Ch.5 printed p.73 (PDF p.79), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/database/studynotes_friedland_estimating.pdf

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-001
- status: resolved
- note: Werner Ch.15 p.303 (PDF p.315): a large deductible is one 'set high enough so that the insured is bearing significant risk', example $1 million per occurrence workers compensation; the Ch.15 example uses $500,000 CGL (p.304). The $250,000 threshold is deleted and the bullet rewritten to Werner's definition and examples, with his processing-cost, credit-risk and collateral points.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- status_set: verified
- confidence: medium
- checks_run: Rewrote to the sources the bullets the previous pass could not source: SIR-vs-deductible now rests on Friedland's self-insurance pool (retention with excess cover above, p.332) and Werner's large-deductible mechanics — the unsourced 'deductible erodes the policy limit' removed; reserving bullet on Friedland pp.73, 84, 332 and Werner p.197; data-volume bullet on Friedland's benchmark patterns and self-insurer exposure bases — 'adjusted to retention, exposure mix and jurisdiction' removed; ALAE bullet on Werner p.303; collateral/discounting bullet (unsourced: regulators sizing collateral, discounted basis) deleted, with Werner's collateral point kept in the large-deductible bullet and Friedland App. A on recoveries. Example recomputed: retained 1,595K, excess 1,050K, total 2,645K, 60.3% retained.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.15 pp.303-304 (PDF pp.315-316); Ch.11 p.197 (PDF p.209), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch.1 p.13 (PDF p.19); Ch.3 p.35 (PDF p.41); Ch.5 p.73 (PDF p.79); Ch.7 pp.84, 96 (PDF pp.90, 102); Ch.13 p.268 (PDF p.274); Ch.15 p.332 (PDF p.338); App. A p.426 (PDF p.432), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- note: F-001 fixed. Medium: example and tip are vault-authored.
