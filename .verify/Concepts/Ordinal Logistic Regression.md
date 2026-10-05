---
target: Concepts/Ordinal Logistic Regression.md
created: 2026-10-05
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: sign convention: page's logit(gamma_j)=theta_j+x'beta is Rodriguez eq.6.20/6.24; latent form theta_j-x'beta* with beta*=-beta matches Rodriguez eq.6.23; the sign bullet and both examples use the + form consistently (beta=-1.1 lowers odds of 'j or below', moves mass to the large band); parameter counts (J-1)+p vs (J-1)(p+1); D&B sec.8.4 subsections against contents; both examples recomputed in python before reading answers (0.4256/0.3247/0.2497; unrepresented 0.690/0.210/0.100; OR e^-1.1=0.333 at both cut-points; 6 vs 12 params) - all agree; 4 links resolve; ordinal content not in ISLR, so the formulas rest on rank-3 Rodriguez (D&B body not available, contents only); no exam page links this page
- sources_checked: Rodriguez, GLM lecture notes (Princeton), ch.6 Multinomial Response Models, sha256:f559d07ae73bdf381de5c19a9f0621419c635e5c6495c0135af940ae36807cbb — https://grodri.github.io/glms/notes/c6.pdf, sec.6.5 Models for Ordinal Response Data, 6.5.1-6.5.3 (cumulative probabilities gamma_j, eq.6.20 g(gamma_ij)=theta_j+x'beta with no column of ones, cut-points theta_1<...<theta_J-1, latent variable with beta*=-beta, proportional odds name and odds lambda_j*exp(x'beta), 'not a log-linear model', continuation-ratio model) (PDF pp.15-19); Dobson & Barnett, An Introduction to Generalized Linear Models, 4th ed. (CRC 2018; MAS-I reading) — publisher eBook preview, sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a — https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf, printed contents Ch.8 (sec.8.4 Ordinal logistic regression: 8.4.1 cumulative logit, 8.4.2 proportional odds, 8.4.3 adjacent categories logit, 8.4.4 continuation ratio logit) (PDF p.11)
- note: Clean pass at medium: the model's formulas are confirmed by Rodriguez (rank 3); the rank-2 reading (Dobson & Barnett ch.8) could only be checked at the level of its contents.
