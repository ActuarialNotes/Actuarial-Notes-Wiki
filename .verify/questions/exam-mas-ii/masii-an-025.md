---
target: questions/exam-mas-ii/masii-an-025.md
created: 2026-10-18
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T18:25Z/7ded
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: blind recomputation before reading the key (ML statistic 1,847.2 - 1,842.6 = 4.6; 2 df for a 3-level factor; chi2_{2,0.95} = -2 ln 0.05 = 5.99; do not reject -> D); every number in the explanation recomputed (p = e^{-2.3} = 0.100; REML difference 9.8; chi2_1 p-value 0.032); option rationales A-E; wiki links resolve; validate_content; ontology topic/objective; outline task B4
- sources_checked: Bates, Mächler, Bolker & Walker, Fitting Linear Mixed-Effects Models using lme4, J. Stat. Softw. 67(1) 2015, §5.2, p.34: anova refits REML fits by ML, 'necessary in order to get sensible answers when comparing models that differ in their fixed effects', sha256:a9ae8934fbe46ac4c3a6d333a75c2c815f9d2ed7725d7613ddce1d5a5244bbff — https://www.jstatsoft.org/index.php/jss/article/download/v067i01/946; Bolker et al., GLMM FAQ, 'Testing significance of random effects': LRT conservative when the null value (sigma^2=0) is on the boundary of the feasible space (the mixture-reference case), sha256:53ab8a0c586ae5893841de85a84585e1cb46e79852c7c349c9e5bedb5c63d231 — https://bbolker.github.io/mixedmodels-misc/glmmFAQ.html; CAS Exam MAS-II Content Outline 2026, pp.2-4: Domain B task B4 (diagnostics and variable selection), reading West et al. 3rd ed., sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf
- note: Vault-authored question (no official key); key D agrees with independent recomputation and with the lme4 paper's rule that fixed-effect comparisons need ML fits. West is commercial, so confidence is held at medium per roadmap D7 (West ch.2 treats ML vs REML likelihood ratio tests). The explanation's aside that the final model is refitted by REML is standard practice not stated in the cited open sources; no finding.
