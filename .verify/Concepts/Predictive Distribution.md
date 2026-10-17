---
target: Concepts/Predictive Distribution.md
created: 2026-10-11
---

## [C-001] Exam 7 block checked; MAS-II half not sourced
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7raa
- date: 2026-10-11
- note: The 'Unpaid claims (Exam 7)' bullet, its three sub-bullets and the 'How it appears on the exam' callout check clean: Verrall 2007 p. 59 (predictive process, RMSEP = prediction error, prediction variance = process + estimation variance), pp. 59-60, 62-63 (simulation, priors on factors or row levels, large variance -> chain ladder, very small -> BF); Shapland p. 12 incl. footnote 18; Meyers pp. 1-2, 7, 17-19; the outline's text references (A10 = A.iii.5 lies inside Meyers A.iii.4-A.iv.1, Shapland A.iii.4-A.iv.1 and Taylor A.iii.4-A.iv.2; Verrall is A.iii.4 and A.iv.3 = A9, A13). The definition, the prior predictive, the credibility-mean, the 'wider than plug-in' and the Gamma-Poisson / Beta-Bernoulli bullets and the example rest on MAS-II readings that this packet did not read; the example recomputes (E[N] = 1.0, Var = 1.5) but rank 5 cannot confirm. The page stays in_review until a MAS-II packet checks that half.

## [C-002] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7raa
- date: 2026-10-11
- status_set: in_review
- checks_run: Exam 7 bullet block and callout against Verrall, Shapland, Meyers and the Fall 2026 outline; MAS-II half not checked (no MAS-II source read)
- note: See the comment: the Exam 7 content is clean; the MAS-II content is unsourced in this pass.

## [F-001] 'Wider than plug-in' stated as a general rule
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7pd
- date: 2026-10-16
- severity: major
- status: open
- locus: bullet 3 (wider than plug-in)
- claim: It is wider than the conditional distribution f(x | theta-hat) at a plugged-in point estimate, because it carries parameter uncertainty as well as process variance.
- evidence: Mahler & Dean ch. 8 p. 8-98 (after Ex. 5.2.2) states the result for the Gamma-Poisson only: the Negative Binomial and the Poisson have the same mean 2.0 but the Negative Binomial's variance is larger, 'the uncertainty introduced by the random selection of an insured from the population has increased the variance'. As a general rule it fails (rank 5, falsifies only): for Beta-Bernoulli the predictive of the next trial is Bernoulli with p = posterior mean (Mahler & Dean Ex. 4.3.2(2), p. 8-90: the expected claims given one claim is E[theta | X=1] = 2/3), which is exactly the plug-in distribution at that estimate, not wider. Restated to the Gamma-Poisson result the source gives.
- source_rank: 3
- proposed_action: Restate to the source: mixing over the unknown parameter adds variance — the Gamma-Poisson's Negative Binomial has the Poisson's mean but a larger variance.
- applied: true
- fingerprint: bbc75bbec83e

## [F-002] Beta-Binomial predictive and 'always heavier tail' unsupported; the latter false
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7pd
- date: 2026-10-16
- severity: major
- status: open
- locus: bullet 4 (Gamma-Poisson / Beta-Bernoulli)
- claim: Gamma-Poisson gives a Negative Binomial predictive; Beta-Bernoulli gives a Beta-Binomial — mixing always produces a heavier tail than the component.
- evidence: Mahler & Dean p. 8-103 ('Predictive Distribution'): with a Gamma posterior the predictive is still Negative Binomial with alpha + C and p = (lambda + Y)/(lambda + 1 + Y) — the first half checks. p. 8-104 names Beta-Bernoulli (and Normal-Normal) only as further conjugate pairs; 'Beta-Binomial' occurs nowhere in the document (full-text search), and 'tail' occurs once, p. 8, unrelated. 'Always heavier tail' is false (rank 5): a Beta mixture of Bernoullis is again a Bernoulli (with p = E[theta]), no heavier-tailed than its components; the Beta-Binomial arises only for several future trials, which the page does not say.
- source_rank: 3
- proposed_action: Keep the Gamma-Poisson half (with the posterior parameters, as the source says); reduce the Beta-Bernoulli half to what the source states (another conjugate pair, with Normal-Normal) and delete 'mixing always produces a heavier tail'.
- applied: true
- fingerprint: f7ff79ce64a4

## [F-003] Pricing a limit or reinsurance layer: unsourced
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7pd
- date: 2026-10-16
- severity: minor
- status: open
- locus: bullet 5 (only the mean is needed)
- claim: Only the mean is needed for a credibility estimate, but the full distribution is what prices a limit or a reinsurance layer.
- evidence: Neither 'reinsurance' nor 'layer' occurs in Mahler & Dean ch. 8 (full-text search). What the source does say is that the whole distribution answers probability questions the mean cannot: p. 8-90 (Bayesian interval estimates, 'rather than just using the mean') and Ex. 5.3.3, pp. 8-103/104, which uses the predictive Negative Binomial (k = 9, p = 0.778) for P[2 or more claims] = 0.687.
- source_rank: 3
- proposed_action: Restate the second half to the source's use: the full distribution gives probabilities, such as the chance of two or more claims next year.
- applied: true
- fingerprint: 75254f337221

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7pd
- date: 2026-10-16
- resolves: F-001
- status: resolved
- note: Restated in this run to: 'Mixing over the unknown parameter adds variance: the Gamma-Poisson's Negative Binomial has the same mean as the Poisson but a larger variance, from the uncertainty of not knowing which risk was selected' (Mahler & Dean p. 8-98).

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7pd
- date: 2026-10-16
- resolves: F-002
- status: resolved
- note: Restated in this run to: 'Gamma-Poisson gives a Negative Binomial predictive, with the posterior Gamma's parameters in place of the prior's; Beta-Bernoulli and Normal-Normal are other conjugate pairs' (Mahler & Dean pp. 8-103, 8-104). Beta-Binomial and 'always a heavier tail' deleted.

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7pd
- date: 2026-10-16
- resolves: F-003
- status: resolved
- note: Restated in this run to: 'the full distribution gives probabilities, such as the chance of two or more claims next year' (Mahler & Dean Ex. 5.3.3, pp. 8-103/104).

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7pd
- date: 2026-10-16
- status_set: verified
- confidence: medium
- checks_run: MAS-II half against Mahler & Dean ch. 8 (rank 3): definition and integral (mixed distribution 5.2.3a with the posterior in place of the prior, p. 8-97, 8-103), prior predictive as the Bayes denominator (4.3.3, p. 8-89; 5.3.1, p. 8-100) and as the distribution for a risk selected at random (p. 8-98), credibility estimate as the posterior mean of the hypothetical means (pp. 8-80, 8-90), Gamma-Poisson -> Negative Binomial predictive (p. 8-103), overdispersion (p. 8-98); full-text search for Beta-Binomial, tail, reinsurance, layer (absent); example recomputed blind (Gamma alpha=2, scale 0.5: E[N]=1.0, Var=1.0+0.5=1.5) before reading the stated answer, then against Mahler & Dean's mean alpha/lambda and variance alpha(lambda+1)/lambda^2 with lambda=2 (p. 8-98): 1.0 and 1.5, agree; links and embed resolve. Exam 7 half carried forward from run 2026-10-11T02:10Z/e7raa (C-001): the Unpaid claims bullet, its Verrall/Shapland/Meyers sub-bullets and the exam callout against those readings and the Fall 2026 outline; that text is unchanged in this run.
- sources_checked: Mahler & Dean, Credibility, ch. 8 of Foundations of Casualty Actuarial Science, 4th ed. (CAS, 2001), prepublication copy, SOA study note C-21-01, §4.2-4.3 (pp. 8-80 to 8-90) and §5.2-5.3 (pp. 8-95 to 8-104), sha256:bccdb7968ae276e041bf7f6eb5aea3aea473f1dc7739bc64352419c8a6a0f3c5 — https://www.soa.org/globalassets/assets/files/edu/c-21-01.pdf; Verrall, Variance 1(1) 2007, Sections 1, 3, 5, 6.1 (pp. 53-60, 61-63, 65-66; PDF 1-8, 9-11, 13-14), sha256:da4a19ac50ec7756ad651c5632e73b71ff99f584d7db436772f94de1ec024506 — https://www.casact.org/sites/default/files/2021-03/7_Verrall.pdf; Shapland, CAS Monograph 4 (2016), Sections 1, 3.2-3.4, 4.1.1, 5.5.1, 6, 6.1 (pp. 1-3, 8-19, 21-22, 41-49; PDF 9-11, 16-27, 29-30, 49-57), sha256:51b072243c0fe839cd776d9dc77532c544e2d52e025a29610e1aaea2cff07abf — https://www.casact.org/sites/default/files/2021-03/7_Shapland.pdf; Meyers, Stochastic Loss Reserving Using Bayesian MCMC Models, 2nd ed., CAS Monograph 8 (2019), title/copyright and contents (PDF 1-5), Preface, Sections 1-12, References and Appendix, pp. 1-85 (PDF 11-98), sha256:3c01999f6c8a170dc412968658d4f7d673d637e74cb27d84b4173ea60532d2d1 — https://www.casact.org/sites/default/files/2021-02/08-Meyers.pdf; Exam 7 Content Outline, Fall 2026, PDF pp.4-6, readings list and complete text references, sha256:be1833c4f35a9344e33b1c48336dca9724d6556890997b3d8715f9de709ca5ed — https://www.casact.org/sites/default/files/2026-03/Exam_7_CO_2026_Fall.pdf
- note: Three claims in the MAS-II half were restated to Mahler & Dean (F-001-F-003, resolved). Confidence medium: the assigned MAS-II credibility reading, Tse, Nonlife Actuarial Models ch. 8 (Cambridge, commercial), was not read; Mahler & Dean is a rank-3 CAS textbook chapter, hosted free by the SOA as study note C-21-01, not a MAS-II syllabus reading, and uses the rate parameterisation of the Gamma (lambda = 1/theta) where the page uses the scale. The Exam 7 half is high-confidence per e7raa.
