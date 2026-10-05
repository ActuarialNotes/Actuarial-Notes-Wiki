---
target: Concepts/Compound Poisson Process.md
created: 2026-10-04
---

## [F-001] Figure: the X₁-X₃ markers span half of each jump
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: nit
- status: open
- locus: figure (Media/Figures/Compound_Poisson_Process.svg)
- claim: The orange arrows labelled X₁, X₂, X₃ beside the first three steps of the S(t) staircase mark the claim sizes.
- evidence: In the SVG the X₁ arrow runs y = 332.54 → 346 (13.5 px) while the first step (size 1.4 on a 0-12 axis spanning 346 → 115.23 px) is 26.9 px tall; X₂ is 29.8 px beside a 59.6 px step. The generator (scripts/figures_exam_mas_i.py, compound_poisson_process) draws each arrow from running + size/2 down to running, i.e. half the jump. Daniel Def. 1.8 (pp.6-7) and Siegrist ch.13 'Compound Poisson Processes' (poisson/Compound.html): each jump of S(t) is the whole severity X_j, so a reader who reads the marker as the claim reads half of it.
- source_rank: 2
- proposed_action: In compound_poisson_process(), draw each marker from ax.py(running) to ax.py(running + size) and regenerate the figure; the SVG is generated, so do not hand-edit it.
- applied: false
- fingerprint: 6c848fd19515

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: medium
- checks_run: both examples recomputed before reading answers: E[S(1)] = 100,000, Var = 4 × 10^8, SD = 20,000; λ' = 50e^{-0.5} = 30.33, E[S'] = 60,653 (page rounds to 60,650); skewness formula checked against Shevchenko eq. (66); figure checked against its generator and SVG coordinates; links and embed resolve; verify_check clean
- sources_checked: Daniel, "Poisson processes (and mixture distributions)", CAS Study Note (June 2008) — MAS-I syllabus reading, Def. 1.8 pp.6-7 (S(t) = Σ X_j, X_j iid and independent of N), Fact 1.11 p.7 (E[S] = E[N]E[X]; Var[S] = E[N]Var[X] + Var[N]E[X]² = E[N]E[X²]), Example 1.12 p.8 (normal approximation when E[N(t)] is large), §1.4.2 p.14 (sum of compound Poisson processes: rate λ1 + λ2, severity the rate-weighted mixture), Fact 1.13 p.9 (thinning), sha256:e345451e9daae82b400aed77f2da0c96c361ed4fbdfd22456b8f711ca0d50888 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_1.pdf; Siegrist, Random (randomservices.org, HTML fetched 2026-10-04), ch.13 The Poisson Process, 'Compound Poisson Processes' (definition; mean μrt, variance (μ² + σ²)rt; MGF exp(rt[G(s) − 1]); thinning as a compound process), sha256:6c5a27a1dc417fbb651a6271f8bb72c6e6f9790ae3c59c781f8f51c29961afd6 — https://www.randomservices.org/random/poisson/Compound.html; Siegrist, Random (randomservices.org, HTML fetched 2026-10-04), ch.13 The Poisson Process, 'The Exponential Distribution' (memoryless property: the excess over a deductible is again exponential), sha256:db0eebaa01377dfc5e07ca838f9ae6c3b06b9653e6d10032de301cb07c4aad63 — https://www.randomservices.org/random/poisson/Exponential.html; Huang, STAT 253/317 (U. Chicago, 2021) Lecture 11 slides, following Ross, Introduction to Probability Models ch.5, slides pp.13-16 (compound Poisson process, mean, variance λtE[Y²], CLT), sha256:a0e1f0472675b35264cff54d6a4223c90ad34df1381d76f2150b537b7b5b9e74 — https://www.stat.uchicago.edu/~yibi/teaching/stat317/2021/Lectures/Lecture11.pdf; Shevchenko, 'Calculation of aggregate loss distributions', J. Operational Risk 5(2) 2010 preprint (arXiv:1008.1108), Prop. 2.2 and §9.1.2 eq. (66) (compound Poisson skewness λE[X³]/(λE[X²])^{3/2} → 0 as λ grows), PDF pp.6, 29, sha256:65a87b5691014ce2feee6825e17e3f7af7e75b436e078c649e18518dcf638bd1 — https://arxiv.org/pdf/1008.1108; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain A tasks 1-2 and text references (Daniel A1-5; Ross 5.2.1-5.2.4, 5.3, 5.4.1, 5.4.2), PDF pp.3, 6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Linked from Exam MAS-I only. One nit on the figure (the X₁-X₃ markers are drawn half the jump height); the text has no findings. Medium because the MGF and skewness rest on rank-3 sources.

## [F-001/R] Compound Poisson figure markers span their full jumps
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: compound_poisson_process() in scripts/figures_exam_mas_i.py now draws each X1-X3 marker from ax.py(running) to ax.py(running + size), i.e. the whole jump, with the head at the top of the step (was running + size/2 down to running, half the jump). Regenerated Media/Figures/Compound_Poisson_Process.svg only. Checked in the SVG: X1 arrow y 346 -> 319.08 against the first step 346 -> 319.08; X2 319.08 -> 259.46 against step 319.08 -> 259.46; X3 259.46 -> 244.08 against step 259.46 -> 244.08 (each equal to its riser in the staircase polyline); rendered in headless Chromium. Daniel Def. 1.8 (each jump of S(t) is the whole severity X_j) as cited in F-001. scripts/test_figure_kit.py: 11 tests OK.
