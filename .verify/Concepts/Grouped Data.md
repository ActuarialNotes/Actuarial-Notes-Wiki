---
target: Concepts/Grouped Data.md
created: 2026-10-31
---

## [F-001] Two unsourced claims in the bullets
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T18:57Z/3d3b
- date: 2026-10-31
- severity: minor
- status: open
- locus: bullets "What grouping costs" and "Closed forms"
- claim: "so the grouped-data estimate has a larger variance than the individual-data estimate from the same losses", "claims reported only by size band are the usual source", and "With only two groups, the maximum sets F(c_1|theta) = n_1/n for any one-parameter model."
- evidence: LDA 4.3.1.1 and 3.5.2.1 state that grouped data record only the interval each observation fell in and that grouping is interval censoring, and give the grouped likelihood; neither, nor any other source read this session, states the variance comparison, the "usual source" of grouped data, or the two-group result. The two-group sentence is also overstated: it holds only where the model can reach n_1/n.
- source_rank: 3
- proposed_action: Delete the three clauses (transcription: keep what LDA states).
- applied: true
- fingerprint: 56f9b1adca0b

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T18:57Z/3d3b
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Deleted the three clauses in this change; the bullets now say only what LDA 4.3.1.1 / 3.5.2.1 state (grouped data record only the interval; grouping is interval censoring).

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T18:57Z/3d3b
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: Likelihood blocks, histogram and ogive formulas against LDA 4.3.1.1, 4.3.2.1, 3.5.2.1 (the page ogive form F_n(c_{j-1})+(x-c_{j-1})f_n(x) is algebraically the LDA interpolation); open last interval S(c_{k-1}) from c_k = infinity; both worked examples recomputed independently (p=55/140, theta-hat 1,070.31, fitted 60.7/23.9/15.4%; f(800)=0.0007, F(800)=0.51, F(1500)=0.7333); exam wording against FAM Topic 3; wiki-links resolve. Re-read after the F-001 deletion.
- sources_checked: Frees et al., Loss Data Analytics (open text, openacttexts.github.io), ch.4 Model Selection and Estimation, 4.3.1.1 grouped (interval-censored) likelihood prod [F(c_j)-F(c_{j-1})]^{n_j}; 4.3.2.1 ogive linear interpolation and its density, sha256:c5fe1ff26cec4dee6f8bcc285b75c840202c947246f7b5d5598f9b837ccad021 — https://openacttexts.github.io/Loss-Data-Analytics/ChapModelSelection.html; Frees et al., Loss Data Analytics (open text, openacttexts.github.io), ch.3 Modeling Loss Severity, 3.5.1 complete individual data likelihood; 3.5.2.1 grouped-data MLE, c_k often infinity, sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html; SOA Exam FAM Syllabus, February 2027, Topic 3 Parametric Estimation (individual, grouped, truncated or censored), p.4, sha256:da98474b74b0a9e9153b8ce198f30195dfbe394b3e300e785e58f12663b447e4 — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-2-fam-syllabus.pdf
- note: F-001 fixed in this change.
