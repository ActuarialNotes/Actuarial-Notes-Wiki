---
target: Concepts/K-Means Clustering.md
created: 2026-10-18
---

## [F-001] Algorithm steps out of order: assign before any centroid exists
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:07Z/e-nn
- date: 2026-10-18
- severity: major
- status: open
- locus: K-Means algorithm, steps 2-3
- claim: After random initial assignment, step 2 assigns each observation to the nearest centroid and step 3 then computes centroids.
- evidence: ISLR Algorithm 12.2 p.518 (PDF 525): 1. randomly assign a cluster to each observation; 2. iterate: (a) compute each cluster's centroid, (b) assign each observation to the closest centroid. On the page, step 2 needs centroids that step 1 never made. A candidate asked for the order of the steps would answer wrong. Swapped steps 2 and 3 to the reading's order.
- source_rank: 2
- proposed_action: Swap to Algorithm 12.2's order (centroids, then reassign).
- applied: true
- fingerprint: 4254c50cef50

## [F-002] 'Predictors must be standardized' overstates the reading
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:07Z/e-nn
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullet 4
- claim: Predictors must be standardized since K-Means is distance-based.
- evidence: ISLR pp.528-530 (PDF 535-537): whether to scale the variables to standard deviation one 'depends on the application at hand'; the issue 'applies to K-means clustering as well'; it is listed as a decision under 'Small Decisions with Big Consequences'. Restated to: scaling matters, and the choice depends on the application.
- source_rank: 2
- proposed_action: Restate to the reading.
- applied: true
- fingerprint: 2bb421c405c5

## [F-003] Example writes 3 = 0
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:07Z/e-nn
- date: 2026-10-18
- severity: nit
- status: open
- locus: example answer, Assign line
- claim: '|x_2 - c_1| = 3 = |x_2 - c_2| = 0'
- evidence: Arithmetic: |5-2| = 3 and |5-5| = 0, so the relation is 3 > 0. The assignment x_2 ∈ C_2 is right. Changed '=' to '>'.
- source_rank: 5
- proposed_action: Change '=' to '>'.
- applied: true
- fingerprint: 53f4523ab54a

## [F-004] Claims beyond the reading: Lloyd's algorithm, elbow/silhouette for K, spherical/similar-size assumption
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:07Z/e-nn
- date: 2026-10-18
- severity: minor
- status: open
- locus: heading of the algorithm; bullets 2-3
- claim: The algorithm is called 'Lloyd's algorithm'; choose K by the elbow method or silhouette scores; K-means assumes roughly spherical clusters of similar size.
- evidence: Full-text search of ISLR 2nd ed.: 'Lloyd', 'silhouette' and 'spherical' occur 0 times. ISLR's 'elbow' is used only for the scree plot (p.508). On choosing K, ISLR p.519 says only that 'the problem of selecting K is far from simple'. The claims are standard, but no source read this session states them. ESL (hastie.su.domains) and the Penn State STAT 505 notes were tried and could not be fetched (connection reset; TLS failure).
- source_rank: 2
- proposed_action: Cite an open text for each claim (e.g. ESL §14.3.6/§14.3.11) or delete the clauses. Left open for the resolve run.
- applied: false
- fingerprint: 48e0060d377d

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:07Z/e-nn
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Steps 2 and 3 swapped to Algorithm 12.2's order in this run.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:07Z/e-nn
- date: 2026-10-18
- resolves: F-002
- status: resolved
- note: Restated to the reading in this run.

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:07Z/e-nn
- date: 2026-10-18
- resolves: F-003
- status: resolved
- note: Corrected to '>' in this run.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:07Z/e-nn
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: objective vs (12.15)-(12.18) (page's WCSS is half of ISLR's W(C_k), by identity 12.18: the same minimizer); Algorithm 12.2; local optimum and multiple random starts p.518-519; scaling pp.528-530; recomputed example
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §12.4, pp.516-531 (PDF 523-538), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf
- note: Medium: F-004 (claims beyond the reading) is open. The page's WCSS = Σ|C_k|Var(C_k) holds with Var the per-cluster population variance summed over features. Printed page = PDF page - 7.

## [C-002] Comment
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:07Z/e-nn
- date: 2026-10-18
- note: Page-number correction to this run's entries: in Chapter 12 of the CAS-hosted copy, printed page = PDF page − 6, not − 7. Every printed page cited above for Ch.12 is one too low: the PDF page numbers are right. Read: Algorithm 12.2 p.519 (PDF 525); Table 12.3 p.526 (PDF 532); PVE (12.8)-(12.10) pp.505-506 (PDF 511-512); choosing the number of PCs p.509 (PDF 515); scaling for clustering pp.529-530 (PDF 535-536).
