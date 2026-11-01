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

## [F-005] 'Can only lower the objective' is stronger than the reading
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T19:12Z/e10e
- date: 2026-10-31
- severity: nit
- status: open
- locus: bullet 'Pairwise equals twice the centroid form', last sentence
- claim: Recomputing the centroids and then moving each observation to its nearest centroid 'can only lower the objective'.
- evidence: ISLR §12.4.1 p.519 (PDF 525): step 2(b) 'can only improve (12.18)'… 'the objective of (12.17) will never increase'; a step may leave it unchanged (that is how the algorithm stops). Restated to 'can never raise the objective'.
- source_rank: 2
- proposed_action: Restate to 'can never raise the objective'.
- applied: true
- fingerprint: c95d1e12fb36

## [F-005/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T19:12Z/e10e
- date: 2026-10-31
- resolves: F-005
- status: resolved
- note: Restated to 'can never raise the objective' in this run, per ISLR p.519.

## [C-003] Comment
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T19:12Z/e10e
- date: 2026-10-31
- note: On F-004 (still open): the elbow method and the silhouette coefficient are now listed as methods for choosing k by Schwesinger's CPSC 558 'Clustering' slides (Kutztown, slide 12, sha256:a0221d38…) and GraphPad's K-means guide (maximum silhouette score 'one method (of many)'). 'Lloyd's algorithm' and the spherical/similar-size assumption remain unsourced, so F-004 stays open. Also, on the 'Choosing K' bullet: 'the total never rises as K grows and is zero at K = n' is stated by GraphPad's guide ('will always decrease as more clusters are used… until the number of clusters is equal to the number of observations, at which point the WCSS will equal exactly zero') and follows from (12.16)/(12.18); 'overfits' is the page's word for ISLR p.531's distinction between 'true subgroups in the data' and 'clustering the noise' — no source read uses the word 'overfit' (ISLR full-text: 0 hits in the clustering sections).

## [C-004] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T19:12Z/e10e
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: pairwise form (12.16)-(12.17) and identity (12.18) against ISLR; 'ordered pair' checked against the identity; worked example recomputed before reading it ((0,0),(2,0),(1,3): pairs 4,10,10 → 48/3 = 16; centroid (1,1): 2+2+4 = 8, ×2 = 16); Choosing-K bullet against ISLR pp.519-520, 531 and GraphPad; rest re-read
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021, CAS-hosted copy), §12.4.1 eqs (12.15)-(12.18), Algorithm 12.2, pp.517-520 (PDF 523-526); §12.4.3 pp.530-531 (PDF 536-537), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; GraphPad Prism Statistics Guide, K-means 'Tabular results', Within-cluster sum of squares, sha256:25fba4f68c7968816f2bb3f63f2b5d76cfbf7eea45061485c4e46a0d311ed764 — https://www.graphpad.com/guides/prism/latest/statistics/stat_kmeans_results_tabular_results.htm; Schwesinger, CPSC 558 lecture 'Clustering' (Kutztown University, Spring 2026), slide 12 'Choosing k', sha256:a0221d385bf130a18943c973c2213df48fa0e97d5296050aca322c78540cc728 — https://faculty.kutztown.edu/schwesin/spring2026/cpsc558/lectures/Clustering.pdf
- note: Delta pass after the SRM G8 writer's edits (commit 54b25be3b): every added passage read against the source at its locator; unchanged content was verified against the same source bytes in the prior pass in this log, re-read on the page for consistency with the new passages; wiki-links and figure embeds resolve. Checked by a different agent from the writer. F-005 (nit) fixed. F-004 (minor, unsourced Lloyd's/spherical) remains open, hence medium.
