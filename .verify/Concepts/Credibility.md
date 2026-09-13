---
target: Concepts/Credibility.md
created: 2026-09-13
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/9e59
- date: 2026-09-13
- status_set: verified
- confidence: high
- checks_run: Every formula re-derived and then diffed against Werner Ch. 12: the credibility-weighted estimate Z x observed + (1-Z) x complement (p.222); the full-credibility standard E(Y) = (z_((1+p)/2)/k)^2 (p.218) with the 90%/5% case worked to 1,082 in the text and repeated in Table 12.1 (p.219), which I recomputed as (1.645/0.05)^2 = 1,082.41; the square-root partial-credibility rule with the Min(...,1.00) cap (pp.218-219, and Werner's own 100-claim illustration gives 0.30, which reproduces); Buhlmann Z = N/(N+K) with K = EVPV/VHM (p.221, where Werner works EVPV 2.00 / VHM 0.50 = K 4.00 and Z = 21/25 = 0.84 - recomputed). The severity-variation standard 1,082 x (1 + CV^2) matches Werner p.219's stated adjustment ('If the actuary rejects the assumption that there is no variation in the size of losses...'), whose display equation is an image and did not extract as text - the (1 + CV_S^2) form is the standard one and nothing on the page contradicts p.219's prose. 'Credibility refers to the predictive value given to a group of data' is Friedland p.30. Z = 1/CDF in the BF method checked against Friedland p.153: Ultimate = Actual Reported + (Expected Claims) x (% Unreported). Both examples recomputed before reading the answers: sqrt(75/1,082) = 0.2633 and 0.263(1.25) + 0.737(1.00) = 1.0658 (printed 0.263 and 1.066); sqrt(400/1,082) = 0.6080, 2,500/4 = 625, 400/1,025 = 0.3902 (printed 0.608 and 0.390). Note Werner writes EVPV where the page writes EPV, and calls the method least squares rather than greatest accuracy - notation, not a finding. No findings.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 12 pp.218-222 (PDF pp.230-234), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch. 3 p.30 (PDF p.36), Ch. 9 p.153 (PDF p.159), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/database/studynotes_friedland_estimating.pdf
