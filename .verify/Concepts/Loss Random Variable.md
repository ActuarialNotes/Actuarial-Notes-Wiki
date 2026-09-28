---
target: Concepts/Loss Random Variable.md
created: 2026-09-28
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: high
- checks_run: Definition (X = loss before policy provisions, Y = payment after them) against P-21-05 §VI PDF p.7 (loss vs claim payment; a 500 deductible pays 1500 on a 2000 loss, nothing below 500) and SOA sample solution Q101 (X = claim before the deductible, Y = claim payment after it); syllabus Topic 2 e-f names the loss random variable and the payment amount random variable; per-loss formula Y = 0 for X<=d, X-d for X>d against P-21-05 p.7; example recomputed before reading the answer: substituting y = x-500 gives e^-0.5 x 1000 = 606.53, agrees with stated 606.5, and with Tables A.3.3.1 (E[X] - E[X^500] = 1000 e^-0.5) and the Q101 solution (E[Y] = P(X>d) x mean, memoryless); 6 wiki-links and 1 embed resolve
- sources_checked: Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), §III theorem on S_n (PDF pp.4-5), §VI Deductibles (PDF p.7) and Benefit Limits (PDF pp.8-9), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf; SOA Exam P Sample Solutions (Aug 2026 revision), Q101 (PDF pp.30-31), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; SOA, Probability Exam (Exam P) Syllabus, November 2026, Topic 2 outcomes e-f (PDF p.3) and Topic 3 outcome i (PDF p.4), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf; SOA, Tables for Exam C (Fall 2009), A.3.3.1 Exponential (PDF p.11) and A.2.3.1 Pareto (PDF p.8), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf
