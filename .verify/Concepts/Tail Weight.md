---
target: Concepts/Tail Weight.md
created: 2026-10-05
---

## [F-001] Mean-excess generalisation not supported by the sources read
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- severity: minor
- status: open
- locus: bullet 'Mean excess loss'
- claim: e(d) is 'increasing for distributions with tails heavier than the exponential'.
- evidence: The two specific cases are supported: the exponential's constant e(d) (Loss Data Analytics ch.3 ChapSeverity.html §3.4.1 Policy Deductibles example: if X is exponential with mean 1000 the excess-loss variable Y^P is exponential with the same mean, sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732) and the Pareto's linear e(d) (LDA ch.10 ChapPortMgt.html Example 10.3.9, TVaR = pi_q + (pi_q + theta)/(alpha - 1), with eq. 10.7 TVaR = pi_q + e(pi_q), sha256:0dcbdf4bb875807b9db33d06cff8a94770a74a940f660a89de13116ee829ed13). The general statement that every distribution with a heavier tail than the exponential has an increasing e(d) is in none of the sources read: LDA §10.2 classifies tails by moments and by the limiting ratio only, and Tse §2.4 (the syllabus reading on tail properties) is not freely available. As written it is a universal implication from 'heavier tail' to 'increasing e(d)', which needs a citation.
- source_rank: 3
- proposed_action: Cite Tse §2.4 (or another ranked source) for the statement, or restate it in the form the source gives.
- applied: false
- fingerprint: 4b8459a0c431

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: Both examples recomputed in python before comparing: (2/12)^3 = 0.0046296, e^-10 = 4.540e-5, ratio 101.97; h(d) = 3/(d + 2,000) = 0.0015/0.0010/0.00025 and e(d) = (d + 2,000)/2 = 1,000/1,500/6,000 at d = 0/1,000/10,000. Limiting ratio, moments, hazard-rate and Pareto/exponential mean-excess claims checked against LDA; E[(X-R)+] = S(R)e(R) follows from LDA eq. 10.7. One unsourced generalisation (finding). Links resolve; LaTeX balanced.
- sources_checked: Loss Data Analytics (Frees et al., open textbook), ch.10 §10.2.1 classification by moments (gamma and Weibull have all positive moments, light; Pareto heavier as alpha falls; lognormal has every moment but no MGF, so the methods can disagree), §10.2.2 Definition 10.2 limiting ratio (infinity heavier, constant proportionally equivalent, 0 lighter) and the density form by L'Hopital's rule, Pareto heavier than Weibull and gamma; eq. 10.7 and Example 10.3.9 (Pareto e(pi_q) = (pi_q + theta)/(alpha - 1)), sha256:0dcbdf4bb875807b9db33d06cff8a94770a74a940f660a89de13116ee829ed13 — https://openacttexts.github.io/Loss-Data-Analytics/ChapPortMgt.html; Loss Data Analytics, ch.3 §3.2.2 Pareto: f, F, E[X^k] exists iff alpha > k, hazard decreasing (heavy-tail indication); §3.2.3 Weibull: hazard decreasing for shape < 1, constant at 1, increasing for shape > 1; §3.4.1 Policy Deductibles example: excess loss of an exponential is exponential with the same mean, sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), reading list PDF p.6: Tse §2.4, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; Tse, Nonlife Actuarial Models (Cambridge 2009), publisher preview, printed contents PDF pp.10-13: §2.4 'Tail properties of claim severity' (contents only; body not freely available), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: Bullet 'Mean excess loss' restated in the form the sources give: the unsupported generalisation ('increasing for distributions with tails heavier than the exponential', and 'the benchmark from the other side') is deleted. It now says e(d) is constant for the exponential (by memorylessness the excess over any d is exponential with the same mean: Loss Data Analytics ch.3 §3.4.1 deductible example, ChapSeverity.html sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732) and rises linearly for the Pareto, e(d) = (d + theta)/(alpha - 1) when alpha > 1 (LDA ch.10 eq. 10.7 TVaR = pi_q + e(pi_q) with Example 10.3.9 TVaR = pi_q + (pi_q + theta)/(alpha - 1); E[X] finite iff alpha > 1, ch.3 §3.2.2; ChapPortMgt.html sha256:0dcbdf4bb875807b9db33d06cff8a94770a74a940f660a89de13116ee829ed13). Both pages re-fetched this session with unchanged hashes. Tse §2.4 still not reachable.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: Re-read the edited bullet and the whole page. Mean-excess statements re-checked against LDA §3.4.1 (exponential) and eq. 10.7 + Example 10.3.9 (Pareto), alpha > 1 against §3.2.2; limiting ratio, density form, moment classification, lognormal/MGF caveat and hazard-rate claims re-checked against LDA ch.10 §10.2 and ch.3 §§3.2.2-3.2.3 (both fetched this session, hashes unchanged). Both examples recomputed in python: (2/12)^3 = 0.0046296, e^-10 = 4.540e-5, ratio 101.97 (about 100 times); h(d) = 3/(d + 2,000) = 0.0015/0.0010/0.00025, e(d) = (d + 2,000)/2 = 1,000/1,500/6,000. Links resolve.
- sources_checked: Frees et al., Loss Data Analytics (open text), ch.10: §10.2.1 Definition 10.1 classification by moments (Examples 10.2.1-10.2.3: gamma and Weibull light, Pareto k* = alpha, heavier as alpha falls; lognormal has all moments but no MGF, so methods can disagree), §10.2.2 Definition 10.2 limiting ratio (infinity heavier, constant proportionally equivalent, 0 lighter) and density form by L'Hopital's rule, Pareto heavier than Weibull and gamma; eq. 10.7 TVaR = pi_q + e_X(pi_q) = pi_q + (E[X] - E[X ^ pi_q])/(1 - q); Example 10.3.9 Pareto TVaR = pi_q + (pi_q + theta)/(alpha - 1), sha256:0dcbdf4bb875807b9db33d06cff8a94770a74a940f660a89de13116ee829ed13 — https://openacttexts.github.io/Loss-Data-Analytics/ChapPortMgt.html; Frees et al., Loss Data Analytics (open text), ch.3: §3.2.2 Pareto (k-th moment exists iff alpha > k; hazard decreasing, an indication of a heavy tail); §3.2.3 Weibull (hazard decreasing for shape < 1, constant at 1, increasing for > 1); §3.4.1 deductible example (excess loss of an exponential with mean 1000 is exponential with the same mean, by memorylessness), sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), reading list PDF p.6: Tse §2.4 assigned, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; Tse, Nonlife Actuarial Models (Cambridge UP, 2009), publisher preview, printed Contents (PDF p.10): §2.4 Tail properties of claim severity (contents only), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf
- note: Resolve run: F-001 closed. Medium, not high: the assigned reading Tse §2.4 is not freely available; claims rest on Loss Data Analytics (rank 3). No open findings.
