---
target: Concepts/Maximum Likelihood Estimation.md
created: 2026-10-05
---

## [F-001] Score equation and large-sample properties stated without regularity conditions
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- severity: major
- status: open
- locus: bullets 2-3, lines 23-24
- claim: 'The MLE is found by solving the score equation l'(theta-hat) = 0' and 'MLEs are consistent, asymptotically normal, and asymptotically efficient (achieve the Cramer-Rao lower bound in large samples)' - no conditions on either.
- evidence: Siegrist, Random §6.3 (point/Likelihood.html): the calculus equations locate the maximum only at an interior point - 'the maximum value may occur at a boundary point of T, or may not exist at all'; for Uniform[0, h] the likelihood 1/h^n on h >= x_(n) is maximised at the boundary X_(n), where l'(h) = -n/h is not 0. The asymptotic properties need regularity conditions: Stanford STATS 200 Lecture 14 Theorem 14.1 (common support, interior theta0, differentiable log-likelihood, unique score root) and Lecture 15 p.15-4; PSU STAT 415 Lesson 7 §7.1 'subject to some regularity conditions'; Loss Data Analytics App. C §17.2.2. For the uniform, Siegrist §6.3 gives mse(X_(n)) = 2h^2/((n+1)(n+2)) (order 1/n^2) and §6.5 (Unbiased.html) says the Cramer-Rao theorem does not apply. A candidate who sets l' = 0 or uses 1/(nI) for a support-dependent model (uniform, single-parameter Pareto lower bound) gets it wrong.
- source_rank: 3
- proposed_action: Add 'when the maximum is interior and the likelihood is smooth' to the score bullet and 'under regularity conditions (support not depending on theta, ...)' to the properties bullet, with Uniform(0, theta) as the standard exception ([[Fisher Information]] already says this). Not applied - the fix is new wording.
- applied: false
- fingerprint: e1317911aa2f

## [F-002] Likelihood described as a probability
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- severity: nit
- status: open
- locus: lead sentence, line 14
- claim: the likelihood function - the probability of observing the given data as a function of the parameter
- evidence: Siegrist, Random §6.3 (point/Likelihood.html): the likelihood is the probability density function with the roles of x and theta reversed, L_x(theta) = f_theta(x) - a density for continuous data (the page's own exponential example), for which the probability of observing the exact data is 0. PSU STAT 415 Lesson 7 likewise writes L(theta) = prod f(x_i|theta).
- source_rank: 3
- proposed_action: Say 'the joint probability (discrete data) or density (continuous data) of the observed sample, read as a function of the parameter'. Not applied - the fix is new wording.
- applied: false
- fingerprint: 5ecc2b63fc72

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- status_set: verified
- confidence: low
- checks_run: Likelihood, log-likelihood, argmax (Siegrist §6.3; F-002 on 'probability'); score equation and asymptotic properties (F-001); invariance (Siegrist §6.3 theorem, which covers any function via the induced likelihood - PSU L7 states it for invertible g); censored S(c) and truncated f(x)/S(d) contributions (Loss Data Analytics §3.5.2). Example recomputed before comparing: theta-hat = x-bar = 20/5 = 4. Links resolve; figure generator maximum_likelihood_estimation() (Poisson l(lambda) = -80 lambda + 20 ln lambda, peak 0.25) checked. MAS-I Domain B task 8 and MAS-II (mixed models by ML/REML) usage match the definition.
- sources_checked: CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B tasks 1 (estimate mean and variance), 2 (sufficient statistic), 4 (critical values from a sampling distribution), 7 (order statistics), 8 (MLE; consistency, unbiasedness, sufficiency, efficiency, minimum variance, MSE; censoring and truncation), 9 (PDF p.4); Hogg Domain B §§4.1, 5.1, 6.1–6.5, 7.1–7.6 and Tse §§12.1, 12.3 (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; Siegrist, Random, §6.3 Maximum Likelihood (likelihood = pdf with roles reversed; log-likelihood; interior vs boundary maxima; invariance; Bernoulli/Poisson/normal/gamma MLEs; Uniform[0,h]: MLE X_(n), mse 2h²/((n+1)(n+2)), (n+1)X_(n)/n unbiased with var h²/(n(n+2)); Uniform[a,a+1]: MLE not unique), sha256:f8c94e3de84f7a025fd32395169938f37e7fd7958d5a8be9d56b54ed307d6ffd — https://www.randomservices.org/random/point/Likelihood.html; Siegrist, Random, §6.5 Best Unbiased Estimators (UMVUE; Cramér–Rao bound under the interchange assumption, support not depending on θ; (dλ/dθ)²/(n E[l²]) and the second-derivative form; equality iff h(X) = λ(θ) + u(θ)L1; Bernoulli, Poisson (θ/n), normal (M attains σ²/n), gamma; Uniform[0,a]: assumption fails, theorem does not apply), sha256:0d9765c5c7b5b8a54b29fc45c3a435d20e2a9200e027609658345087dedcd531 — https://www.randomservices.org/random/point/Unbiased.html; Penn State STAT 415, Lesson 7 §7.1 Properties of MLEs: consistency, equivariance, asymptotic normality 'subject to some regularity conditions'; Ex 7.1 normal MLEs x̄ and divisor-n variance (I(θ) written for the whole sample there), sha256:0c6afc848ae41251fc702348e0e8c603c5725f1f03c20b4731d789a61babbe0b — https://online.stat.psu.edu/stat415/Lesson07.html; Stanford STATS 200 (Autumn 2016), Lecture 14, Theorem 14.1 and its regularity conditions (common support, interior θ0, differentiable log-likelihood, unique score root); I(θ) per observation = Var[z] = −E[z′], pp.14-1–14-2, sha256:bca5236cb18dfe151c931cf0087de47939ab0795ef1a232ed782929f7fa34d7d — https://web.stanford.edu/class/archive/stats/stats200/stats200.1172/Lecture14.pdf; Stanford STATS 200 (Autumn 2016), Lecture 15, Theorem 15.4 (Var[T] ≥ 1/(nI(θ)) for unbiased T, 'certain mild regularity assumptions'; Var of the sample score = nI(θ)) and p.15-4 (efficient = attains the bound; MLE asymptotically efficient; MoM expected to have higher MSE than the MLE for large n; biased estimators can beat the bound at special θ), sha256:7e9d32d62f5b6fe7374924822c86b27c81b36ee2b25ea596ca774f7678287247 — https://web.stanford.edu/class/archive/stats/stats200/stats200.1172/Lecture15.pdf; Frees et al., Loss Data Analytics (open textbook), §3.5.2 MLE using modified data: a right-censored value contributes S(u), data truncated at d contribute f(x)/S(d), both S(u)/S(d), sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html; Frees et al., Loss Data Analytics, Appendix C §17.2.2 Asymptotic Properties of MLE: consistency, asymptotic normality and efficiency 'under certain regularity conditions'; variance estimated from the observed Fisher information (matrix inverse), sha256:3d597f08f5d5e9a3ec4283da37ed9b7f1a637796e1761aac8f977fe2f34a6211 — https://openacttexts.github.io/Loss-Data-Analytics/CAppC.html
- note: Open major F-001 (score equation and large-sample properties without regularity conditions) and nit F-002 (likelihood called a probability), hence low confidence. Hogg, McKean & Craig 8th ed. (the MAS-I reading) is not free; only its printed contents were read (topic placement), so formulas rest on rank-3 open references.
