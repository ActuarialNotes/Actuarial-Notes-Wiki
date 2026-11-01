---
target: Concepts/Pure Endowment.md
created: 2026-10-31
---

## [F-001] Unsourced reading of FAM's objectives
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T18:44Z/0c7d
- date: 2026-10-31
- severity: minor
- status: open
- locus: bullet 'Part of an endowment', last sentence
- claim: In FAM's objectives, "endowment" covers both this survival benefit and the endowment insurance.
- evidence: The October 2026 FAM syllabus uses 'endowment' in 9(a) ('life insurance, endowment, and annuity payments') and 10(a) ('endowment insurance') without defining it, and the FAM notation note (November 2025) does not define it either; no source read states that the word in the objectives covers both. The sentence is an interpretation stated as fact.
- source_rank: 1
- proposed_action: Delete the sentence.
- applied: true
- fingerprint: add1193aa3b5

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T18:44Z/0c7d
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Applied in this run: the sentence is deleted; the bullet keeps the sourced decomposition and covariance.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T18:44Z/0c7d
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: Definition, Z = v^n on survival, nEx = A_{x:n}^{ 1} = v^n npx and the mnemonic (1 over the term) against Slud (4.5)-(4.6) and §4.1 p.101, and nEx against Perryman p.126; fixed payment time, so no m-thly/continuous versions, against Slud p.100 and (5.4) ('does not depend upon m'); Bernoulli mean/variance and m+nEx = mEx nE_{x+m} re-derived (rank 5); deferred annuity and A_x = A^1 + nE A_{x+n} against Slud (4.9); covariance of the parts against FAM-L Q4.12; SULT inputs (l45 99,033.9, l65 94,579.7, ä55:10 8.0192, 10E55 0.59342) against the SULT p.20; FAM bullets against FAM 9(a)-(d) (finding F-001 on the unsourced reading of 'endowment', fixed). Every worked example recomputed from scratch before comparing with the page's figures (rank 5, falsify only): all agree to the figures printed; one rounding artefact within the page's own stated intermediates, not a finding. 20E45 0.359937 (SULT 0.35994), EPV 35,993.70, SD 7,811.4 (7,811.1 unrounded - the page rounds 20p45 to 0.95502 first); X 135,135.3 vs 132,067.9, gap 3,067; 3.3% die (1 - l65/l55 = 0.0334). Links resolve.
- sources_checked: Slud, Actuarial Mathematics and Life-Table Statistics (Univ. of Maryland, 2001, author's posted text), §2.2 pp.39-44 (PDF 49-54: force of mortality, tpx = exp(-int mu), uniform, exponential, Weibull, Gompertz-Makeham, infant mortality); §3.2 pp.62-66 (PDF 72-76: UDD tqx = t qx and mu = q/(1-tq), constant force tpx = px^t, complete = curtate + 1/2, no simple model fits a whole life table); §4.1 pp.99-103 (PDF 109-113: term, pure endowment nEx = v^n npx, endowment = term + pure endowment, deferred = nEx A_{x+n}, d ä + A = 1); §4.2 pp.110-111 (PDF 120-121: Abar = (i/delta) A under UDD); §5.1 p.127 (PDF 137: i/i(m) on the term part only, pure endowment independent of m), sha256:dccaca6b0e9f58a2f472390538e901660d0a45eb816e2869657718735c2b80bb — https://www.math.umd.edu/~slud/s470/BookChaps/01Book.pdf; Perryman, International Actuarial Notation, PCAS XXXVI (1949), pp.124-130 (general principles of the four spaces; p, q, mu, e, A, E, a; trema, bar, ring, (m); numeral over the status; nEx; endowment assurance; selection [x]+t), sha256:819cf715537c2dd1dd6adbd72e41aa9c6dd7f4b8c5571ab6795f79182b2949d2 — https://www.casact.org/sites/default/files/database/proceed_proceed49_49123.pdf; SOA Tables for Exam FAM (2024-10), Standard Ultimate Life Table pp.20-21; Makeham's law formula p.22, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf; SOA Exam FAM-L sample solutions (2024-10), Q4.12 p.23 (Cov(Z1,Z2) = -E[Z1]E[Z2]), Q4.19 p.26, Q6.3-6.4 p.35 (second moments, variances), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf; SOA Exam FAM syllabus, October 2026, Topics 8-10 learning outcomes pp.6-7; Readings p.8 (AMLCR chapters), sha256:90172025d8bd9d69e18e974fdee447963e54258e5f0e419aa3ef5b7d3e55a00e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-fam-syllabus.pdf
