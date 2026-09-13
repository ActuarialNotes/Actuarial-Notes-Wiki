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
