---
target: Concepts/Convolution.md
created: 2026-10-31
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T18:57Z/3d3b
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: Every formula block against LDA 5.2/5.3 (pmf form is the discrete analogue of the printed CDF recursion); discretization by rounding / local moment matching against ASTAM outcome 2b; both worked examples recomputed independently (0.872 and 0.16; 0.343, 0.2352, 0.25956, 0.83776) and the binomial-thinning check q=0.3 against LDA 5.5.2; exam-objective wording against the FAM and ASTAM syllabi; wiki-links resolve. Notation: LDA writes F^{*n} and S_N where the page writes f_X^{*k} and S.
- sources_checked: Frees et al., Loss Data Analytics (open text, openacttexts.github.io), ch.5 Aggregate Loss Models, 5.2 n-fold convolution recursion F^{*n}(x)=sum F^{*(n-1)}(x-y)f(y); 5.3 F_S = p0 + sum p_n F^{*n}; 5.3.2 net stop-loss premium E(S)-E(S^d); 5.4.1 recursive method for (a,b,0)/(a,b,1), discretize continuous severity, sha256:09489050a45e6eb2ee0d96804458eb22c936a61716227e08ad0398b9cba870d4 — https://openacttexts.github.io/Loss-Data-Analytics/ChapAggLossModels.html; SOA Exam ASTAM Syllabus, October 2026, Topic 2 Aggregate Models, outcomes a-b (convolution and recursive formulas; method of rounding and local moment matching), p.2, sha256:6d462aea25c09b15cc457176ecf2d5d6143df8fb88df9f366557de17ec1ec9ba — https://www.soa.org/globalassets/assets/files/edu/2026/astam/2026-fall-exam-astam-syllabus.pdf; SOA Exam FAM Syllabus, February 2027, Topic 2 outcomes i-l (convolution method, stop-loss expected payment), p.3, sha256:da98474b74b0a9e9153b8ce198f30195dfbe394b3e300e785e58f12663b447e4 — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-2-fam-syllabus.pdf
- note: No findings.
