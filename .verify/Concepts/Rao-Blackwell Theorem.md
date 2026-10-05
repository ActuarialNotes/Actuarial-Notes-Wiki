---
target: Concepts/Rao-Blackwell Theorem.md
created: 2026-10-05
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: Both examples recomputed in python before comparing: E[1{X1=0} | Y=y] = (4/5)^y derived independently, Y = 4 for data 0,2,1,0,1, (0.8)^4 = 0.4096, MLE e^{-0.8} = 0.4493; exponential E[X1|Y] = Y/8 = 1,500 with variance theta^2/8 vs theta^2. Variance identity is the law of total variance (Siegrist). Theorem statements, completeness definition, Lehmann-Scheffe, exponential-family completeness and the CRLB comparison checked against Siegrist. Links resolve; LaTeX balanced.
- sources_checked: Siegrist, Random, ch.6 §6 Sufficient, Complete and Ancillary Statistics: Rao-Blackwell theorem (E(V|U) a statistic because U is sufficient, unbiased, uniformly better); completeness definition (E_theta[r(U)] = 0 for all theta implies P_theta[r(U) = 0] = 1); Lehmann-Scheffe theorem and its proof via Rao-Blackwell; Poisson: Y = sum X_i complete and sufficient, UMVUE of P(X = 0) = e^-theta is ((n-1)/n)^Y; gamma with known shape: Y complete for the scale; exponential families: natural statistic sufficient and complete, sha256:4d7402f2a960ea2b4232e57e4ee5992ac29801b9269f300f17f8e83074d5a0e4 — https://www.randomservices.org/random/point/Sufficient.html; Siegrist, Random, ch.6 §5 Best Unbiased Estimators: UMVUE definition; an unbiased estimator attaining the Cramer-Rao lower bound must be a UMVUE, sha256:0d9765c5c7b5b8a54b29fc45c3a435d20e2a9200e027609658345087dedcd531 — https://www.randomservices.org/random/point/Unbiased.html; Siegrist, Random, ch.3 §7 Conditional Expected Value: var(Y) = E[var(Y|X)] + var[E(Y|X)], sha256:23e328f9ee55e32522905aba62841f2920eef0d32fb68d7fbb1f4e0b0eaf62f6 — https://www.randomservices.org/random/expect/Conditional.html; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), reading list PDF p.6: Hogg Domain B §§7.1-7.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; Hogg, McKean & Craig, Introduction to Mathematical Statistics 8th ed. (Global Ed.), publisher preview, contents PDF pp.6-8: §7.3 'Properties of a Sufficient Statistic', §7.4 'Completeness and Uniqueness' (p.444), §7.5 'The Exponential Class of Distributions' (p.449) (contents only), sha256:7fd80607a820477e03ff2c8f3469f5cfa57d095d766cbc29d39d723ef5a69a99 — https://api.pageplace.de/preview/DT0400.9781292264783_A39514650/preview-9781292264783_A39514650.pdf
