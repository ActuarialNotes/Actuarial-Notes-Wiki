---
target: Concepts/Rejection Method.md
created: 2026-10-05
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: algorithm, efficiency, uniform-g and discrete statements checked against Sigman; examples recomputed in python before comparing (f = 20x(1-x)^3 is Beta(2,4), c = 135/64 = 2.109 at x = 1/4 confirmed by grid search, 1/c = 0.474, f(Y)/c = 0.9756 (accept) and 0.1792 (reject); gamma f = x e^-x vs exponential mean 2: ratio maximised at x = 2, c = 4/e = 1.4715 by grid, acceptance e/4 = 0.680, Y = -2 ln 0.4 = 1.8326, threshold 0.9963, accepted); links resolve exactly
- sources_checked: Sigman, 'Acceptance-Rejection Method', Columbia IEOR 4703 notes (2007), PDF pp.1-2: algorithm (generate Y ~ g, U independent, accept if U <= f(Y)/(c g(Y))), sup f/g <= c, number of iterations N geometric with p = 1/c and E(N) = c, proof that an accepted value has distribution F, c should be minimal and close to 1; PDF p.4: uniform g gives c = sup f (beta example), gamma by exponential g with 1/lambda the gamma mean, discrete case accept if U <= p(Y)/(c q(Y)) with sup p(k)/q(k) <= c, sha256:0943071ab4e8a4db52e39cddce042690a2cb2944ad862423a39aa81e68000648 — http://www.columbia.edu/~ks20/4703-Sigman/4703-07-Notes-ARM.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Ross Sections 11.1, 11.2.1 and 11.2.2 assigned (Domain A), PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: All claims agree with Sigman's notes and every example number reproduces. Confidence medium: the assigned reading, Ross 12th ed. §11.2.2 'The Rejection Method', is not freely available, so the check is against a rank-3 reference. 'c is always at least 1' is not stated in so many words by Sigman; it follows from his p = 1/c being a probability.
