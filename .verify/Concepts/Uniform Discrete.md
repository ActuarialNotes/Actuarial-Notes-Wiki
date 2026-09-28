---
target: Concepts/Uniform Discrete.md
created: 2026-09-28
---

## [F-001] Deductible example says a deductible of 4 removes 3.4, more than the 4
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: major
- status: open
- locus: example Deductible Applied to a Discrete Uniform Loss, closing sentence, line 45
- claim: the deductible removes 3.4, more than the 4 it nominally withholds, because it also zeroes out the four smallest losses entirely.
- evidence: Recomputed before reading: E[X]=5.5, E[Y]=E[(X-4)+]=21/10=2.1 (agrees with the page), so the amount removed is E[X]-E[Y]=E[min(X,4)]=(1+2+3+4x7)/10=3.4. 3.4 is less than 4, not more. Every loss has at most the deductible withheld: a loss below it has only its own amount withheld (Anderson & Brown, Risk and Insurance, SOA P-21-05, Deductibles section: if the loss is less than 500 the insurer will not pay; a loss of 2000 pays 1500). So the mean amount removed can never exceed the deductible, and zeroing out the small losses is why it falls below 4, not above. Rank-5 arithmetic falsifies the sentence; the 2.1 result survives.
- source_rank: 1
- proposed_action: Replace the clause more than the 4 it nominally withholds, because it also zeroes out the four smallest losses entirely with a statement that the removed amount E[min(X,4)] = 3.4 is less than 4 because losses of 1 to 3 lose only their own amount.
- applied: false
- fingerprint: 7ae8c56db57c

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: pmf 1/n on 1..n; E=(n+1)/2, Var=(n^2-1)/12 (G&S Ex 6.2.11); general range {a..b}: n=b-a+1, E=(a+b)/2, Var=(n^2-1)/12 by shift invariance (G&S Ex 6.2.10a); die example recomputed: 3.5, 35/12=2.9167 (agrees; G&S p.261); deductible example recomputed: E[Y]=2.1 (agrees), closing sentence wrong -> F-001; range 20..29 recomputed: 24.5, 99/12=8.25 (agrees); continuous-uniform comparison: 25/12=2.083 recomputed, but the (b-a)^2/12 formula itself was not checked against a source this session (it belongs to Uniform Continuous Distribution); link and figure embed exist
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 6.2 Exercise 11: X chosen at random from 1..n has E(X)=(n+1)/2, V(X)=(n-1)(n+1)/12, and Exercise 10(a) D(X+c)=D(X), p.264 (PDF p.272); die mean 7/2 and variance 35/12 p.261 (PDF p.269), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), Deductibles section, sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf
- note: Formulas for the discrete uniform agree with G&S; open major F-001 on the deductible example prose (result 2.1 is correct). The continuous-uniform variance cited for contrast was not source-checked this session.

## [F-001/R] Deductible remark corrected: 3.4 is less than the deductible of 4
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-001
- status: resolved
- note: Closing sentence now states the deductible removes E[min(X,4)] = (1+2+3+4x7)/10 = 3.4 on average, less than the full 4, because a loss of 1, 2 or 3 is withheld only up to its own amount. Recomputed: E[X] = 5.5, E[(X-4)+] = 21/10 = 2.1, 5.5 - 2.1 = 3.4. Anderson & Brown, P-21-05, Deductibles section (PDF p.7): a loss below the deductible is not paid, and a loss of 2000 with a 500 deductible pays 1500, so no loss has more than the deductible withheld.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Re-verified after resolving F-001: mean and variance on 1..n against G&S Ex. 11; die 3.5 and 35/12, range 20..29 mean 24.5 and variance 99/12 = 8.25, deductible example 2.1 and removed amount 3.4 all recomputed. The continuous-uniform variance comparison (25/12) was not re-read against its source this session, hence medium.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 6.2 Exercise 11: X chosen at random from 1..n has E(X) = (n+1)/2, V(X) = (n-1)(n+1)/12, p.264 (PDF p.272), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), Deductibles section (PDF p.7), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf
