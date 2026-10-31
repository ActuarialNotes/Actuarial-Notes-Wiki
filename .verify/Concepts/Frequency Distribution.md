---
target: Concepts/Frequency Distribution.md
created: 2026-10-31
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T18:57Z/3d3b
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: Table a, b, p0 against SOA FAM tables B.2; moments, (a,b,1) and zero-modified rules against B.3; exposure and deductible effects against LDA 5.5.1-5.5.2 (the binomial q->qv follows by evaluating the tables binomial pgf at LDA 1+v(z-1)); MLEs against LDA 2.4.2 and tables starting values; all three worked examples recomputed independently (beta=0.5, r=3, p3=0.109739; p1M=0.258495, p2M=0.193871, E[N]=1.1585; lambda-hat 0.54, variance 0.5684); exam-objective wording against FAM syllabus; wiki-links resolve.
- sources_checked: SOA Tables for Exam FAM (Loss Models Appendices A and B excerpts), Appendix B: B.1 factorial moments, B.2 (a,b,0) p0/a/b, mean (a+b)/(1-a), variance (a+b)/(1-a)^2, B.3.1 zero-truncated incl. logarithmic and ETNB r>-1, B.3.2 zero-modified p_k^M=(1-p0^M)p_k/(1-p0) and mean, pp.14-19, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf; Frees et al., Loss Data Analytics (open text, openacttexts.github.io), ch.2 Frequency Modeling, 2.2.3 over/underdispersion, 2.3 (a,b,0) recursion, 2.4.2 MLEs (lambda-hat = x-bar, L(m, x-bar/m), l(r, x-bar/r)), 2.5.1 (a,b,1) from k>=2, sha256:9239175ca12d9d16f2030297175d370842c7bf1e8ac232f9eefdf2f3fe5d4a4c — https://openacttexts.github.io/Loss-Data-Analytics/ChapFrequency-Modeling.html; Frees et al., Loss Data Analytics (open text, openacttexts.github.io), ch.5, 5.2 Table 5.1 closed under convolution (Bin sum m_i; NB sum r_i), 5.5.1 exposure: Poi(n lambda), NB(beta, nr); 5.5.2 deductible: P_{N^P}(z)=P_{N^L}(1+v(z-1)), Poi(lambda v), NB(beta v, r), sha256:09489050a45e6eb2ee0d96804458eb22c936a61716227e08ad0398b9cba870d4 — https://openacttexts.github.io/Loss-Data-Analytics/ChapAggLossModels.html; SOA Exam FAM Syllabus, February 2027, Topic 2 outcomes e-h, Topic 3 MLE, pp.3-4, sha256:da98474b74b0a9e9153b8ce198f30195dfbe394b3e300e785e58f12663b447e4 — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-2-fam-syllabus.pdf
- note: No findings.
