---
target: Concepts/Claims Processing Changes.md
created: 2026-10-31
---

## [F-001] BF listed as a method that does not depend on the recent diagonal
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:31Z/75be
- date: 2026-10-31
- severity: major
- status: open
- locus: example 'Two Changes at Once', answer item 2
- claim: Lean on methods that do not depend on the triangle's recent diagonal at all: the expected claims technique and BF with an externally derived ELR.
- evidence: Friedland Ch. 9 p. 158: BF ultimate = actual reported (or paid) claims + expected unreported (unpaid); in Scenario 3 'the reported Bornhuetter-Ferguson technique produces an estimate of IBNR that is greater than the actual IBNR' because the CDFs rise with case strengthening; Ch. 15 p. 349 table: BF-reported 458 vs true 253. Only the expected claims technique is unaffected (253). BF depends on the latest diagonal and on the distorted CDFs even with an external ELR.
- source_rank: 2
- proposed_action: Delete BF from that list (done).
- applied: true
- fingerprint: 2d2a5569edc1

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:31Z/75be
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Removed 'and [[Bornhuetter-Ferguson Method|BF]] with an externally derived ELR' from the list; the expected claims technique is the one method Friedland shows unaffected.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:31Z/75be
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: diagonal effect vs Ch. 6 p. 75 ('effect on the entire portfolio of outstanding claims'); disposal rate and avg case O/S as the two diagnostics vs Ch. 6 and Ch. 13; direction of bias vs Ch. 7 and Ch. 13 p. 291; method list vs Chs. 9 and 15; disposal-rate frequency-severity vs Ch. 11; links resolve
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch. 4 pp. 44-47; Ch. 6 pp. 68-76 (management reports, closed-to-reported, average values, CNP, footnote 29); Ch. 7 pp. 96-103; Ch. 9 p. 158; Ch. 11 p. 206; Ch. 13 pp. 283-293; Ch. 15 p. 349, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- note: One major error fixed (F-001). 'The intuitive answer is usually the wrong sign' is the page's own commentary.
