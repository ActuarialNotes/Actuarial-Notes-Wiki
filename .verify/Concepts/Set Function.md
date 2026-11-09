---
target: Concepts/Set Function.md
created: 2026-09-27
---

## [F-001] Die example omits the fair (equally likely) assumption behind 0.5
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- severity: minor
- status: open
- locus: Example: Probability as a Set Function, answer line 24
- claim: For example, when rolling a die, the probability of an even number is $P(\{2,4,6\}) = 0.5$.
- evidence: Grinstead & Snell Example 1.6 (pp.18-19, PDF pp.26-27): "Unless there is reason to believe the die is loaded, the natural assumption is that every outcome is equally likely", assigning m(i)=1/6; only then does P({2,4,6}) = m(2)+m(4)+m(6) = 1/2 (p.20). For a loaded die the value differs. Recomputed: fair die gives 3/6 = 0.5, matching the page once fairness is assumed. The sibling Event page states "A fair six-sided die".
- source_rank: 3
- proposed_action: State that the die is fair (outcomes equally likely).
- applied: false
- fingerprint: 18be2dac67a7

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- status_set: verified
- confidence: medium
- checks_run: Definition vs Encyclopedia of Mathematics: a set function is a mapping defined on a family of subsets of a set; EoM allows the extended real line or a vector space as target, the page restricts to R - narrower but correct for probability (EoM: a measure with mu(X)=1 is a probability measure, values in [0,1]); noted, not a finding. Syllabus 1a: define set functions and probability as a set function on a collection of events - consistent. Example recomputed: 3/6=0.5 = G&S P(E)=1/2 for a fair die; fairness unstated (F-001). Link Concepts/Event resolves; figure exists; LaTeX balanced.
- sources_checked: Encyclopedia of Mathematics (Springer/EMS), article Set function, fetched 2026-09-27, sha256:168f98c55dc240fde7643462ca01950c62077204b0253c44239d8d197c4a469a — https://encyclopediaofmath.org/wiki/Set_function; SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcome 1a (PDF p.2), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Definition 1.2 and Examples 1.6/1.8 (pp.18-20, PDF pp.26-28), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf
- note: Open minor F-001 (missing fair-die assumption in the example).

## [F-001/R] Die example now states the die is fair
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-001
- status: resolved
- note: Answer now reads "rolling a fair die (all six outcomes equally likely)" and shows 3/6 = 0.5, the assumption G&S Examples 1.6/1.8 (pp.18-20, PDF pp.26-28) make before computing P({2,4,6}) = 1/2.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- status_set: verified
- confidence: high
- checks_run: Re-verified after resolving F-001: definition = Encyclopedia of Mathematics (a mapping defined on a family of subsets of a set; the page takes the real-valued case); probability as a set function on events = syllabus 1a; example recomputed for a fair die 3/6 = 0.5 = G&S Example 1.8 (m(i) = 1/6, P({2,4,6}) = 1/2); S = {1,...,6} = G&S Example 1.6.
- sources_checked: Encyclopedia of Mathematics (Springer/EMS), article Set function, fetched 2026-09-28, sha256:b2e0e1232b723b52bdc147fe88ced0ad2f459b58ce633e882eb2b38a9ea7d3d2 — https://encyclopediaofmath.org/wiki/Set_function; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Examples 1.6 and 1.8 (pp.18-20, PDF pp.26-28), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcome 1a (PDF p.2), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-11-06T18:03Z/b32c
- date: 2026-11-06
- status_set: verified
- confidence: high
- checks_run: Definition: Zakon §7.4 Def. 1, a set function is a mapping whose domain is a set family (values real, extended-real, complex or vector); the page takes the real-valued case, as the prior pass recorded for Encyclopedia of Mathematics (EoM returned HTTP 502 this session, so Zakon was read instead). Additive = Zakon Def. 2 (finitely additive over disjoint unions). Count and probability as set functions: Siegrist Ch.1 §3 (probability is a function on the collection of events; counting measure); Exam P outcome 1a (probability as a set function on a collection of events). P(A)=n(A)/n(S) for equally likely outcomes = G&S Def. 1.3. Inclusion-exclusion = G&S Thm 1.4. Recomputed: 60+45−25=80, 20 neither; pieces 35/20/25/20 add to 100; g(A)=1{A≠∅} not additive (1+1≠1); 80/100; urban/rural system gives u_c−r_c=250, r_c=75; three products pieces AH-only 30, LH-only 25, H-only 60, A-only 100, L-only 40, AL-only 20, total 285; die 3/6. Links/embed resolve.
- sources_checked: Zakon, Mathematical Analysis (LibreTexts), §7.4 Set Functions. Additivity. Continuity, Definitions 1-2 (a set function is a mapping whose domain is a set family; real, extended-real, complex or vector valued; additive = finitely additive over disjoint unions; σ-additive = countably additive), read 2026-11-06, sha256:b7576cfefd9854cddf2318991ed41d91329929384b91ef4307ecf1eef865e4e9 — https://math.libretexts.org/Bookshelves/Analysis/Mathematical_Analysis_(Zakon)/07%3A_Volume_and_Measure/7.04%3A_Set_Functions._Additivity._Continuity; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Def. 1.1 sample space/outcomes/events, Def. 1.2 P(E)=Σ_{ω∈E} m(ω), Examples 1.6-1.9, set operations and Fig. 1.7, Thm 1.1 (P(E)≥0, P(Ω)=1, monotonicity, disjoint additivity, complement with proof), Thms 1.2-1.4 and Cor. 1.1 (pp.18-24, PDF pp.26-32), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, Ch.1 §3 Probability Measure (Kolmogorov axioms a-c, countable additivity; probability as a function on the collection of events), read 2026-11-06, sha256:381bc53d4a8e0bf0259a5ce1093eb2d759a56e205c38c362ddb3b1a03879c7e6 — https://www.randomservices.org/random/prob/Probability.html; SOA, Probability Exam (Exam P) syllabus, November 2026, introduction (calculus incl. series, differentiation, integration assumed, PDF p.1) and Topic 1 General Probability learning objective and outcomes a-g (PDF p.2), read 2026-11-06, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
- note: Rewritten page re-checked against Zakon (LibreTexts), Siegrist, G&S and the Exam P syllabus; every number recomputed and agrees. No findings.
