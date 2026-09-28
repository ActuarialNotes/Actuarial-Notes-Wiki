---
target: Concepts/Coefficient of Variation.md
created: 2026-09-28
---

## [F-001] Positive-mean restriction unsourced
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: minor
- status: open
- locus: bullet 3, line 22
- claim: It is meaningful only when E[X] > 0
- evidence: CV = sigma/mu is confirmed by Anderson & Brown P-21-05 ("the coefficient of variation, which is the ratio of the standard deviation to the mean") and applied that way in SOA Exam P sample solution 252 (PDF p.74). Neither, nor any other source read this session, restricts it to E[X] > 0; the ratio is defined for any nonzero mean. Possibly a reasonable convention, but stated as fact without a source.
- source_rank: 1
- proposed_action: Cite a source for the restriction, or soften it to "requires E[X] != 0; normally used for positive quantities such as losses".
- applied: false
- fingerprint: 6d2e55365472

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: CV = sigma/mu = sqrt(Var X)/E[X] vs P-21-05 pooling section and SOA sample solution 252; dimensionless and relative-dispersion bullets follow from the definition; syllabus LO d. Example recomputed before reading the answer: 100/500 = 0.20, 300/2000 = 0.15, A more variable, agrees. Links and embed resolve; LaTeX well formed.
- sources_checked: Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), pooling section (CV = SD/mean; sqrt(n) sigma less than n sigma) and benefit-limit section (premium based primarily on expected claim payments), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf; SOA Exam P Sample Solutions (Aug 2026 revision), Q252 (PDF p.74), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; SOA Probability Exam syllabus, November 2026, univariate random variables learning objectives c) (expected values incl. moments, mode, median, percentiles) and d) (variance, standard deviation, coefficient of variation), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
- note: Definition and example confirmed; one minor open (unsourced E[X] > 0 restriction).
