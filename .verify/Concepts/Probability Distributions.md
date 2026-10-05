---
target: Concepts/Probability Distributions.md
created: 2026-10-04
---

## [F-001] Relationships bullets are a pasted mix of rendered and raw LaTeX
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: Relationships, lines 32-34
- claim: Binomial -> Poisson: "As n→∞,p→0,np=λn \to \infty, p \to 0, np = \lambdan→∞,p→0,np=λ."; Binomial -> Normal: "As n→∞,np and $n(1−p)n \to \infty$, np \text{ and } n(1-p)n→∞,np and n(1−p) are large."; Poisson -> Normal: "As λ\lambdaλ becomes large."
- evidence: Each line holds the same condition three times: the rendered text, its LaTeX source outside any math delimiters (so \to, \infty, \text and \lambda print literally), and the rendered text again; the middle line wraps a fragment as $n(1−p)n \to \infty$, which renders as the wrong statement n(1-p)n -> infinity. The conditions the LaTeX source states are the ones the sources give: Binomial -> Poisson as n -> infinity, p -> 0, np = lambda (Grinstead & Snell §5.1 p.189; Siegrist, Poisson distribution); Binomial -> Normal when np and n(1-p) are large (Siegrist, rule of thumb both >= 5; Grinstead & Snell §9.1; Tse §1.3.1 PDF p.25); Poisson -> Normal as the parameter grows (Siegrist, Normal Approximation). Fix is mechanical: keep the LaTeX source each line already contains, delete the two rendered copies, and put the source in $...$.
- source_rank: 2
- proposed_action: Replace the three lines with: As $n \to \infty, p \to 0, np = \lambda$. / As $n \to \infty, np \text{ and } n(1-p)$ are large. / As $\lambda$ becomes large.
- applied: true
- fingerprint: 37aad1cf49b4

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- resolves: F-001
- status: resolved
- note: Applied in this change: each line now carries only the LaTeX source it already contained, in $...$ (no new wording). Renders as: n -> infinity, p -> 0, np = lambda; n -> infinity, np and n(1-p) are large; lambda becomes large.

## [F-002] Binomial labelled as a single coin flip
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: Probability Distributions list, 'Binomial (a Coin Flip)'
- claim: Binomial (a Coin Flip)
- evidence: A single coin flip is a Bernoulli trial; the binomial counts successes in n independent trials. Tse §1.3.1 eq. 1.17 (PDF p.25): BN(n, theta) is 'the probability of obtaining x successes in n independent trials each with probability of success theta'. Grinstead & Snell §9.1 (PDF p.333): S_n, the number of successes in n Bernoulli trials, has the binomial distribution b(n, p, j). The page's own '### Binomial' section says the same ('Tossing a coin n times, how likely to get k heads?'), so the list label contradicts the page. The neighbouring labels are loose analogies rather than definitions (Poisson as 'N Coins Flips', Normal as 'Many Coin Flips') and are not filed separately.
- source_rank: 2
- proposed_action: Relabel the binomial as n coin flips (number of heads), or name a single flip as Bernoulli.
- applied: false
- fingerprint: a8fcf0f5c837

## [F-003] Placeholder text and empty sections
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: nit
- status: open
- locus: list items 'Exponential ()', 'Gamma ()'; headings Poisson, Normal, Exponential
- claim: '- **Exponential** ()', '- **Gamma** ()', and the '### Poisson', '### Normal', '### Exponential' headings with nothing under them.
- evidence: Empty parentheses and empty sections are unfinished-draft placeholders: they state nothing to check and render as blank headings. The page is linked from Exam MAS-I (CAS).md five times (Domain A 'the named distributions', 'Distributions that arise', Domain B task 2, Domain C task 11 'distribution for the dependent variable'), so a MAS-I reader lands on it. Filling the sections is authoring and is not done here.
- source_rank: 4
- proposed_action: Fill in the analogies and sections, or remove the empty parentheses and empty headings.
- applied: false
- fingerprint: 200ae7526a20

## [C-001] F-003 evidence: link count
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- locus: list items and empty sections
- note: F-003 evidence says the page is linked from Exam MAS-I (CAS).md five times; the count is six (lines 25, 31, 45, 46, 67 and 108). Nothing else in F-003 changes.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: low
- checks_run: Three relationships (binomial -> Poisson, binomial -> normal, Poisson -> normal) against G&S §5.1 / §9.1, Siegrist and Tse §1.3.1 - conditions agree (after F-001 LaTeX fix). Exponential family: page form h(x) exp(eta(theta)T(x) - A(theta)) equals Larsen / Dobson & Barnett exp[a(y)b(theta) + c(theta) + d(y)] with h = e^d, T = a, eta = b, A = -c - a notation difference, not corrected. Distribution analogies: binomial label contradicts the sources (F-002). Placeholders and empty sections (F-003). External resources: probstats.org could not be reached (TLS failure, then HTTP 503); ProbOnto and SIPMath 3.0 were not read - unchecked. Figure (Poisson(6) bars with the N(6, 6) curve) is consistent with the Poisson -> normal bullet. No wiki links; figure embed exists. Only Exam MAS-I links the page (six times).
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., GNU FDL version), §5.1 Poisson distribution as the binomial limit with np = lambda, n large and p small, p.188-189 (PDF p.196-197); §9.1 Central Limit Theorem for Bernoulli trials, S_n binomial, p.325-326 (PDF p.333-334), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random), "The Poisson Distribution": binomial with n p_n -> a converges to Poisson; Normal Approximation as the parameter grows; binomial normal approximation when np and n(1-p) are large (both >= 5), sha256:cf3d0aacfdb40291bb729d32f6f7692b39e4c4a13a1e09f86ef8826bef61f688 — https://www.randomservices.org/random/poisson/Poisson.html; Tse, Nonlife Actuarial Models (Cambridge UP, 2009), publisher preview, §1.3.1 BN(n, theta) = x successes in n trials, "When n is large, X is approximately normally distributed" (PDF p.25), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf; Larsen, "Generalized Linear Models", CAS Study Note (Dec 2015, rev. June 2016), Exponential Family Formulas f(y; theta) = exp[a(y)b(theta) + c(theta) + d(y)] (PDF p.3), sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf
- note: F-001 (minor, garbled LaTeX in the Relationships bullets) fixed in this change. Open: F-002 minor (binomial labelled a single coin flip), F-003 nit (placeholders / empty sections). Low: the page is an unfinished stub and its external-resources list could not be checked.

## [F-004] Exponential-family formula written in Unicode, not LaTeX
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- severity: nit
- status: open
- locus: Exponential Family, formula line
- claim: f(x∣θ)=h(x)exp(η(θ)T(x)−A(θ)) inside $...$
- evidence: The formula is the right form (it equals Larsen p.3 exp[a(y)b(θ) + c(θ) + d(y)] with h = e^d, T = a, η = b, A = -c), but it is typed with Unicode ∣, θ, η and the minus sign U+2212, and a bare exp, which the vault LaTeX rules (actuarial-concept-definitions skill, LaTeX rules 4) exclude; it was also inline rather than a > $$ block like every other formula in the vault.
- proposed_action: Rewrite as > $$f(x \mid \theta) = h(x)\exp\big(\eta(\theta)\,T(x) - A(\theta)\big)$$.
- applied: true
- fingerprint: e29c8d90ce4f

## [F-005] External resource ProbStats cannot be reached or checked
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- severity: minor
- status: open
- locus: External Resources, item 1
- claim: [ProbStats](https://probstats.org/) for visual plots.
- evidence: probstats.org failed again this session: curl over HTTPS fails certificate verification (also with the extended CA bundles earlier agents built), HTTP returns 503, and a WebFetch returned HTTP 503 Service Unavailable. Run 8861 got the same (TLS failure, then 503). Nothing supports the description, and the link does not serve a page. The other two resources were checked this session: ProbOnto (sites.google.com/site/probonto, ProbOnto v2.5, the ontology and knowledge base of probability distributions, 228 relationships) and the SIPmath 3.0 Standard (probabilitymanagement.org/30-standard, an open JSON standard encoding streams of trials of a probability distribution).
- proposed_action: Remove the ProbStats line (it can be restored if the site comes back); link ProbOnto and the SIPmath 3.0 Standard to the pages read.
- applied: true
- fingerprint: 1e58d6e48a4d

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-002
- status: resolved
- note: The list now names a single coin flip as Bernoulli and the binomial as n flips: "- **Bernoulli** (a coin flip)" and "- **[[Binomial Distribution|Binomial]]** (the number of heads in $n$ coin flips)" (was "Binomial (a Coin Flip)"). Grinstead & Snell Def. 3.5 and Ex. 3.7, PDF p.104 (a Bernoulli trials process is a sequence of experiments with two outcomes and a constant success probability; a coin tossed ten times is one) and p.212 / PDF p.220 (a binomial variable is the sum of n independent 0-1 variables), sha256:763eab98…; Tse §1.3.1 eq. (1.17), publisher preview PDF p.25 (BN(n, θ) gives the probability of x successes in n independent trials), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404. The two neighbouring analogies were tightened to what the sources say: Poisson = "the number of heads in many flips of a coin that rarely lands heads" (G&S §5.1 p.189 / PDF p.197: binomial with n large, p small, np = λ) and Normal = "the number of heads in many coin flips, approximately" (G&S p.212 / PDF p.220, CLT; Tse PDF p.25).

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-003
- status: resolved
- note: Placeholders completed from sources read this session, and each list item now links its verified concept page. List: "Exponential ()" → "(the waiting time between events of a [[Poisson Process]])" and "Gamma ()" → "(the waiting time to the n-th event of a [[Poisson Process]])" — Daniel Fact 1.26 p.13 (homogeneous Poisson process: interevent times independent exponentials with mean 1/λ; T_n gamma with α = n, θ = 1/λ), sha256:e345451e…; "Uniform (a die roll)" kept — Daniel Ex. 1.16 pp.9-10 (a six-sided die gives a uniform variable on 1..6). Empty sections filled: Binomial pf, E = np, Var = np(1-p) (Tse eqs. (1.17), (1.19) PDF p.25; CAS MAS-I Tables Appendix B.2.1.3, PDF p.15); Poisson pf, E = Var = λ (Daniel Def. & Prop. 1.1 p.4; MAS-I Tables B.2.1.1); Normal density with μ the mean and σ the standard deviation (Grinstead & Snell §5.2 p.212 / PDF p.220); Exponential density, F(x) = 1 - e^{-x/θ}, E[X] = θ (MAS-I Tables A.3.3.1, PDF p.12, sha256:cb567413…) and its gamma links (Daniel Def. & Prop. 1.20 (4)-(5) p.11: α = 1 is the exponential; a sum of α (integer) independent exponentials with mean θ is gamma). Central Limit Theorem item now links [[Central Limit Theorem]]. Each formula checked numerically in Python (pf sums to 1, moments, densities, and Larsen p.3 rows for the normal, exponential and Poisson reproduce the same densities).

## [F-004/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-004
- status: resolved
- note: Applied in this change: the formula is now a display block in LaTeX, > $$f(x \mid \theta) = h(x)\exp\big(\eta(\theta)\,T(x) - A(\theta)\big)$$, under a heading that links [[Exponential Family]], with one bullet tying it to Larsen's form: exp[a(y)b(θ) + c(θ) + d(y)] with h = e^d, T = a, η = b, A = -c (Larsen, "Generalized Linear Models", CAS study note, Exponential Family Formulas, PDF p.3, sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd; Larsen states the formulas supplement Dobson & Barnett §3.2, whose text was not read — the Dobson preview ends before Ch.3, so the bullet attributes the form to Larsen only).

## [F-005/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-005
- status: resolved
- note: Applied in this change: the ProbStats line was removed (unreachable this session and in run 8861; it can be restored if the site returns). ProbOnto and SIPmath 3.0 now link the pages read this session: https://sites.google.com/site/probonto/ (ProbOnto v2.5, "the Ontology and Knowledge Base of Probability Distributions", 150 distributions, 228 relationships and re-parameterisation formulas; HTML sha256:ed52d75d7a5c627a29f572d32dc7663de1c9f479fe417def97287cd90531d0b9) and https://www.probabilitymanagement.org/30-standard (the open SIPmath 3.0 Standard wraps the 22 numbers that encode a stream of trials of a probability distribution in a JSON object; HTML sha256:a24e2d392925e624be4e85bfa19d16c3b423140ccd0bb544800c4a5fd4d42c0a). Their one-line descriptions are unchanged; the name is now written "SIPmath" as the standard spells it.

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: Every line of the rewritten page re-read against the sources above (Daniel, Larsen, Tse preview, G&S, Siegrist and the MAS-I tables re-fetched; hashes equal those logged). Formulas checked numerically in Python: Bin(10, 0.3) pf sums to 1, mean 3.0, var 2.1; Poi(3.6) mean = var = 3.6; N(1.5, 2^2) density integrates to 1 with mean 1.5 and sd 2.0; Larsen p.3 rows for the normal, exponential and Poisson reproduce the page densities; Exp(2.5) mean 2.5 and F(2) = 1 - e^{-0.8} = 0.5507; a sum of 3 Exp(2.5) has mean 7.5 and variance 18.75 (gamma alpha = 3, theta = 2.5) by simulation. The three Relationships bullets (unchanged) re-checked against G&S §5.1, Tse p.25 and Siegrist. External resources: ProbOnto and SIPmath 3.0 pages read; probstats.org unreachable (TLS failure, HTTP 503) and removed (F-005). 11 links + 1 figure embed resolve (vault_links exact); the figure (Poisson(6) bars under the N(6, 6) curve) matches its builder and the Poisson to Normal bullet. 5 display blocks, each one expression. verify_check clean.
- sources_checked: CAS Exam MAS-I Tables (version 01/15/2018; handed out with the exam), Loss Models appendix excerpts: A.3.3.1 Exponential f(x) = e^{-x/θ}/θ, F(x) = 1 - e^{-x/θ}, E[X^k] = θ^k k! (PDF p.12); B.2.1.1 Poisson p_k = e^{-λ}λ^k/k!, E = Var = λ and B.2.1.3 Binomial p_k = C(m,k) q^k (1-q)^{m-k}, E = mq, Var = mq(1-q) (PDF p.15), sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf; Daniel, "Poisson processes (and mixture distributions)", CAS Study Note (June 2008) — MAS-I syllabus reading, Def. & Prop. 1.1 p.4 (Poisson pf, E = Var = Λ), Ex. 1.16 pp.9-10 (a die roll is uniform on 1..6), Def. & Prop. 1.20 p.11 (gamma: α = 1 is exponential with mean θ; integer α is a sum of α independent exponentials), Fact 1.26 p.13 (interevent times exponential with mean 1/λ; T_n gamma with α = n, θ = 1/λ), sha256:e345451e9daae82b400aed77f2da0c96c361ed4fbdfd22456b8f711ca0d50888 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_1.pdf; Larsen, "Generalized Linear Models", CAS Study Note (Dec 2015, rev. June 2016) — MAS-I syllabus reading, Exponential Family Formulas f(y; θ) = exp[a(y)b(θ) + c(θ) + d(y)] and the table rows for the normal, Poisson and exponential (PDF p.3), sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf; Tse, Nonlife Actuarial Models (Cambridge UP, 2009), publisher preview, §1.3.1 eqs. (1.17)-(1.19): BN(n, θ) pf, mean nθ, variance nθ(1 - θ), x successes in n independent trials; approximately normal when n is large (PDF p.25), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., GNU FDL version), Def. 3.5 and Ex. 3.7 Bernoulli trials (a coin tossed ten times), b(n, p, j), PDF pp.104-105; §5.1 Poisson as the binomial limit with np = λ, n large and p small, p.189 (PDF p.197); §5.2 normal density with parameters μ and σ, binomial as a sum of n independent 0-1 variables, CLT, p.212 (PDF p.220), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Siegrist, Random (randomservices.org, HTML fetched 2026-10-05), ch.13 'The Poisson Distribution': binomial with n p_n → a converges to Poisson; Normal Approximation as the parameter grows; binomial normal approximation when np and n(1 - p) are large (both >= 5), sha256:cf3d0aacfdb40291bb729d32f6f7692b39e4c4a13a1e09f86ef8826bef61f688 — https://www.randomservices.org/random/poisson/Poisson.html; ProbOnto home page (sites.google.com/site/probonto, HTML fetched 2026-10-05): ProbOnto v2.5, the Ontology and Knowledge Base of Probability Distributions (150 distributions, 228 relationships and re-parameterisation formulas), sha256:ed52d75d7a5c627a29f572d32dc7663de1c9f479fe417def97287cd90531d0b9 — https://sites.google.com/site/probonto/; Probability Management, 'SIPmath 3.0 Standard' page (HTML fetched 2026-10-05): an open standard that wraps the Metalog parameters and HDR seeds encoding a stream of trials of a probability distribution in a JSON object, sha256:a24e2d392925e624be4e85bfa19d16c3b423140ccd0bb544800c4a5fd4d42c0a — https://www.probabilitymanagement.org/30-standard
- note: Resolve run: F-002 and F-003 closed, and two issues found while rewriting recorded and fixed (F-004 Unicode formula, F-005 unreachable ProbStats link). Confidence raised from low: the page is no longer a stub and every line now has a source — the formulas from the MAS-I tables (rank 1) and the syllabus readings Daniel, Larsen and Tse (rank 2); the normal density, the Bernoulli label and the Poisson to Normal relationship rest on Grinstead & Snell and Siegrist (rank 3), and the external-resource descriptions on the resources' own pages, so medium. No open findings.
