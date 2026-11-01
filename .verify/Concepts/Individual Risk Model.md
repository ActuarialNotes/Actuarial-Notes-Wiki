---
target: Concepts/Individual Risk Model.md
created: 2026-10-31
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T18:57Z/3d3b
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: Definition and moment formulas against LDA 5.2 verbatim; compound-Poisson comparison (extra sum q_j^2 mu_j^2) derived from LDA 5.2 and the 5.3 compound Poisson variance; lognormal moment-matching formulas solved from the SOA tables lognormal moments; both examples recomputed independently (E=130,000, Var=1.04715e10, premium 298,333; Var=5.85e8 vs 6.25e8, difference 4e7); FAM wording against Topic 2; Individual Risk Rating contrast checked for consistency only against the vault page (rank 4); wiki-links resolve.
- sources_checked: Frees et al., Loss Data Analytics (open text, openacttexts.github.io), ch.5, 5.1 individual vs collective (n fixed, mass at zero); 5.2 X_i=I_iB_i, E(S)=sum q_i mu_i, Var(S)=sum(q_i sigma_i^2+q_i(1-q_i)mu_i^2), fixed benefit term life sigma^2=0; 5.3.1 compound Poisson variance; 5.4 normal approximation, sha256:09489050a45e6eb2ee0d96804458eb22c936a61716227e08ad0398b9cba870d4 — https://openacttexts.github.io/Loss-Data-Analytics/ChapAggLossModels.html; SOA Tables for Exam FAM (Loss Models Appendices A and B excerpts), A.5.1.1 lognormal E[X^k]=exp(k mu + k^2 sigma^2/2), p.10, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf; SOA Exam FAM Syllabus, February 2027, Topic 2 outcomes i-j (collective and individual risk models; log-normal or normal approximation), p.3, sha256:da98474b74b0a9e9153b8ce198f30195dfbe394b3e300e785e58f12663b447e4 — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-2-fam-syllabus.pdf; Wiley, Loss Models 5th ed. — Table of Contents excerpt (PDF), 9.8 The Individual Risk Model: 9.8.1, 9.8.2 Parametric Approximation, 9.8.3 Compound Poisson Approximation, p.vii, sha256:814f18cfefff53b09b2f477c3d6fd8eb84d77ef1aea69a8a27beefc620f2afe3 — https://media.wiley.com/product_data/excerpt/88/11195237/1119523788-8.pdf
- note: No findings.
