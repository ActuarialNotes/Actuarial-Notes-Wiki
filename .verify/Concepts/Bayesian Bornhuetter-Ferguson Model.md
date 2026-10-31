---
target: Concepts/Bayesian Bornhuetter-Ferguson Model.md
created: 2026-10-30
---

## [F-001] Multi-period projection procedure is not in Verrall
- entry_type: finding
- author: agent:validate-v1
- run_id: g8-cas7-chk-bs
- date: 2026-10-30
- severity: minor
- status: open
- locus: 'Beyond the next period' bullet, second sentence
- claim: To project further out, $D_{i,j-1}$ is the latest cumulative plus the increments already projected for the periods in between, and $Z_{ij}$, $\lambda_j$ and the BF share are each taken at the age being projected.
- evidence: Verrall (2007) §5, PDF p.10 (Variance vol.1 iss.1 p.62) gives only the mean of the next observation: 'Note that, if we are considering Cij, the data used here is Ci1,Ci2,...,Ci,j-1. Having obtained this distribution, the distribution of the next observation can be found as follows' (5.3), then the Z_ij credibility mean. Neither §5 nor §6 (PDF pp.11-14) states how to project two or more periods ahead. My own algebra (rank 5, cannot confirm) shows the recursion is equivalent to applying the posterior mean of x_i with the current Z to every future cell, so the sentence is not wrong; it is unsourced.
- source_rank: 2
- proposed_action: Keep only what Verrall says (the mean is for the next increment, given the data to j-1); a writer citing a source that states the multi-period method can add it back.
- applied: true
- fingerprint: bfbb5aaad843

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: g8-cas7-chk-bs
- date: 2026-10-30
- resolves: F-001
- status: resolved
- note: Deleted the unsourced second sentence; the bullet now reads '**The next period.** The mean above is for the next increment, $C_{ij}$, given the data $C_{i1}, \dots, C_{i,j-1}$.' — Verrall's note to (5.2)-(5.3), PDF p.10.

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: g8-cas7-chk-bs
- date: 2026-10-30
- status_set: in_review
- checks_run: delta check of commit 62d997ba: the added bullet read against Verrall §5 fetched this session; one unsourced sentence deleted (F-001); no question numbers or wording (rule 10)
- sources_checked: Verrall, Obtaining Predictive Distributions for Reserves Which Incorporate Expert Opinion (Variance 1:1, 2007), §5, PDF pp.9-11 (journal pp.61-63), sha256:da4a19ac50ec7756ad651c5632e73b71ff99f584d7db436772f94de1ec024506 — https://www.casact.org/sites/default/files/2021-03/7_Verrall.pdf
- note: The bullet now says only what Verrall says. The page has never had a full verified pass (unverified, no sources, no prior log), and the rest of it was not checked here — including the existing 'Credibility grows with maturity' claim that the posterior mean of x_i times y_j gives every future cell, which is not on Verrall's §5 pages read here — so it stays in_review.
