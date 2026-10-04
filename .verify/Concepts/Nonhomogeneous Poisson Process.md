---
target: Concepts/Nonhomogeneous Poisson Process.md
created: 2026-10-04
---

## [F-001] Equal-length intervals said to always differ in mean unless λ is constant
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: bullet 1 (independent / stationary increments)
- claim: Independent increments still hold, but stationary increments do not: two intervals of the same length have different expected counts unless λ is constant there
- evidence: Siegrist, Random ch.13 'Non-homogeneous Poisson Processes' (poisson/Nonhomogeneous.html, Definition and Basic Properties): for λ(A) = λ(B), 'N(A) and N(B) will not in general have the same distribution, but of course they will have the same distribution if m(A) = m(B)'. Counterexample in the vault: the Intensity Function page's triangular intensity (t on [0,3], 6 − t on [3,6]) gives ∫_2^3 = ∫_3^4 = 2.5 (recomputed) - equal-length intervals, equal means, λ constant on neither. Stationary increments fail because the counts need not match, not because they always differ.
- source_rank: 3
- proposed_action: Replace 'have different expected counts unless λ is constant there' with 'can have different expected counts'.
- applied: false
- fingerprint: 053b65e6905c

## [F-002] Time change stated for 'any' NHPP without its condition
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: bullet 3 (time change)
- claim: Any NHPP can be turned into a rate-1 homogeneous process by the time change s = m(t)
- evidence: Siegrist, Random ch.13 'Non-homogeneous Poisson Processes' (poisson/Nonhomogeneous.html, 'Arrival Times and Time Change') proves M_u = N_{m^{-1}(u)} is a standard rate-1 Poisson process for a continuous rate function with m strictly increasing (the proof needs m^{-1}). Gallager, Discrete Stochastic Processes ch.2 §2.4, Thm 2.4.1 (book p.87), gives N(t) = N*(m(t)) for λ(t) right-continuous and bounded away from zero. Where λ = 0 on an interval m is flat and has no inverse, and where m(∞) < ∞ (a reporting intensity that decays to zero, one of the page's own listed uses) the time-changed process is rate-1 Poisson only on [0, m(∞)). Low consequence: MAS-I problems never invert m.
- source_rank: 3
- proposed_action: Qualify the bullet: 'When λ(t) > 0, so that m is strictly increasing, an NHPP becomes a rate-1 homogeneous process under the time change s = m(t).'
- applied: false
- fingerprint: fb33d28f8fed

## [F-003] Garbled comparison in 'Counts on a Later Interval': 26 called larger than 28
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: example 'Counts on a Later Interval', answer
- claim: The count is Poi(26) — larger than the 28 expected over the four earlier months' worth of exposure per month, because the rate is rising.
- evidence: Recomputed: ∫_4^6 (3 + 2u) du = 54 − 28 = 26 and m(4) = 28, so 26 is smaller than 28. The intended comparison is per month: 26/2 = 13 per month on (4, 6] against 28/4 = 7 per month on (0, 4], which the following sentence already states correctly ('a two-month window carrying nearly the same expected count as the first four months combined'). The answer Poi(26) is right: Daniel, Def. & Prop. 1.2(3) p.4, the increment N(b) − N(a) is Poisson with mean ∫_a^b λ(z) dz.
- source_rank: 2
- proposed_action: Make the clause a per-month comparison (13 per month against 7 per month over the first four months), or delete it and keep the next sentence.
- applied: false
- fingerprint: c5303cb3bb22

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: medium
- checks_run: both examples recomputed before reading answers: m(4) = 28, P(N(1) = 0) = e^{-4} = 0.0183, ∫_4^6 = 26 (numerical integration agrees); every bullet checked against Daniel / Siegrist / Gallager; figure checked against generator (λ(t) = 3 + 2t, m(4) shaded, arrivals denser as the rate climbs); links and embed resolve; verify_check clean
- sources_checked: Daniel, "Poisson processes (and mixture distributions)", CAS Study Note (June 2008) — MAS-I syllabus reading, Def. & Prop. 1.2 p.4 (rate function λ, increment Poisson with mean ∫λ, mean-value function m), Example 1.7 p.6 (P(T(x) > t) = exp(−∫λ); λ as a force / intensity), Fact 1.13 p.9 and §1.4.3 p.14 (thinning), sha256:e345451e9daae82b400aed77f2da0c96c361ed4fbdfd22456b8f711ca0d50888 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_1.pdf; Siegrist, Random (randomservices.org, HTML fetched 2026-10-04), ch.13 The Poisson Process, 'Non-homogeneous Poisson Processes' (independent but not stationary increments; mean function m, E = Var = m(t); infinitesimal characterisation; T_1 survival e^{-m(t)} and failure rate r; time change for strictly increasing m), sha256:ab27d84736959d91325dc48823d4e0df83bead12355c73830a28dc427de16aaf — https://www.randomservices.org/random/poisson/Nonhomogeneous.html; Huang, STAT 253/317 (U. Chicago, 2021) Lecture 11 slides, following Ross, Introduction to Probability Models ch.5, slide p.10 Definitions 5.4a/5.4b, sha256:a0e1f0472675b35264cff54d6a4223c90ad34df1381d76f2150b537b7b5b9e74 — https://www.stat.uchicago.edu/~yibi/teaching/stat317/2021/Lectures/Lecture11.pdf; Gallager, Discrete Stochastic Processes (MIT OCW 6.262, Spring 2011), ch.2 Poisson Processes, §2.4 Non-homogeneous Poisson processes, Thm 2.4.1 and Example 2.4.1 (M/G/∞ splitting), PDF pp.18-20 (book pp.86-88), sha256:22aca1e5891be88631806e7a32fe24ba6b4e4729d61b9217a4517a379ea9838f — https://ocw.mit.edu/courses/6-262-discrete-stochastic-processes-spring-2011/3a19ce0e02d0008877351bfa24f3716a_MIT6_262S11_chap02.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain A tasks 1-2 and text references (Daniel A1-5; Ross 5.2.1-5.2.4, 5.3, 5.4.1, 5.4.2), PDF pp.3, 6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Linked from Exam MAS-I only. Three minor findings, none affecting a formula or an answer: the stationarity bullet overstates (equal-length intervals can have equal means), the time-change bullet drops its condition (m strictly increasing), and the second example's prose calls 26 larger than 28. The applications bullet (hurricane season, reporting decay, exposure growth) is illustrative.
