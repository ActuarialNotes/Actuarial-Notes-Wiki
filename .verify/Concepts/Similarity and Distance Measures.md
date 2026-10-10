---
target: Concepts/Similarity and Distance Measures.md
created: 2026-10-10
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv02
- date: 2026-10-10
- status_set: verified
- confidence: high
- checks_run: formulas vs SciPy docs and daisy; salary/age and online-retailer examples vs ISLR; Gower contributions vs daisy Details; both examples recomputed (3,000.0/500.6; 0.606/2.086; Manhattan 0.683/2.183; Gower 0.3375/0.38125); links resolve
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021, CAS-hosted copy), §4.7.6 PDF p.193 (salary/age, yen); §12.4.1-12.4.2 PDF pp.533-536 (dissimilarity choice, online retailer, scaling), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; SciPy docs, scipy.spatial.distance.cityblock, definition, sha256:3ad0c340b7d389773e926a5bc1b891f6f29bcf89336ec34e2413b5d8f286f525 — https://docs.scipy.org/doc/scipy/reference/generated/scipy.spatial.distance.cityblock.html; SciPy docs, scipy.spatial.distance.minkowski, definition, sha256:2e0f85829595334b2fa7ac2fa5137429d1ee038e07dd1b5cf4cbe39a4cb17725 — https://docs.scipy.org/doc/scipy/reference/generated/scipy.spatial.distance.minkowski.html; SciPy docs, scipy.spatial.distance.hamming, definition, sha256:5e9a00450e4fd2da1723c587ccc89769226e19b9abca60dd9e41382526a5f7b4 — https://docs.scipy.org/doc/scipy/reference/generated/scipy.spatial.distance.hamming.html; SciPy docs, scipy.spatial.distance.jaccard, definition, sha256:57059b5d873f3326934e15ef4e74216370f277483f313f5812fce96713c2ae18 — https://docs.scipy.org/doc/scipy/reference/generated/scipy.spatial.distance.jaccard.html; SciPy docs, scipy.spatial.distance.cosine, definition, sha256:eac484bb1120d904d8f1e5a0882da931350befa0ecd41b90dc2869945cb1fb75 — https://docs.scipy.org/doc/scipy/reference/generated/scipy.spatial.distance.cosine.html; R cluster::daisy help page, Arguments and Details (Gower), sha256:9ae15cbff8e5e321e7b12d3662dc4c219be38e1aa5d7c9b2fc158aed259e7763 — https://stat.ethz.ch/R-manual/R-devel/library/cluster/html/daisy.html
