---
target: questions/exam-mas-i/masi-an-001.md
created: 2026-10-10
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T19:00Z/masa
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: blind recomputation from the stem before reading answer/explanation; key compared with the blind answer; every distractor's arithmetic and rationale recomputed; option distinctness; explanation arithmetic line by line; wiki_link tags against what the question tests (all resolve; validate_content.py clean); learning_objective against the Exam MAS-I domain titles and the 2026 outline tasks; stated facts against the cited sources
- sources_checked: Daniel, "Poisson processes (and mixture distributions)", CAS Study Note (June 2008), MAS-I reading, Fact 1.26 (interevent times exponential mean 1/lambda; T_n gamma alpha=n, theta=1/lambda), PDF p.13; Example 1.7 (time from any x to next event, Pr[T(x)>t]=exp(-int lambda)), PDF p.6; Fact 1.13 thinning, PDF p.9; Example 1.22 and 1.24 (Poisson mixed over gamma is negative binomial r=alpha, beta=theta), PDF p.12, sha256:e345451e9daae82b400aed77f2da0c96c361ed4fbdfd22456b8f711ca0d50888 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_1.pdf; Huang, STAT 317 (U. Chicago, 2021) Lecture 10 slides, following Ross ch.5, slide 6 (5.3.5: given N(t)=1, T_1 ~ Uniform(0,t)) and slide 7 (Theorem 5.2), PDF pp.6-7, sha256:29c641b971d53ecd7b4438942a582cdb9fc2f709655f6710c512529eb326c0e2 — https://www.stat.uchicago.edu/~yibi/teaching/stat317/2021/Lectures/Lecture10.pdf; CAS Exam MAS-I Content Outline 2026, Domain A tasks 1-3 and readings (Daniel, Ross, Struppeck), PDF p.3, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Blind: a C (gamma), b A (thinned Poisson), c E (gamma-mixed Poisson = negative binomial), d B (exponential, memoryless), e D (uniform); key matches all five parts. Parts a-d confirmed in Daniel (MAS-I reading); part e (conditional arrival time uniform) confirmed only in Huang's slides reproducing Ross 5.3.5 Theorem 5.2 (Ross itself is commercial), hence medium. Tags each tested; LO Domain A (A1-A2).
