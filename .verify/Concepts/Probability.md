---
target: Concepts/Probability.md
created: 2026-09-27
---

## [F-001] Equally-likely formula names event A on the left, E on the right
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- severity: nit
- status: open
- locus: formula box, line 17
- claim: P(A) = |E|/|S|
- evidence: The lead sentence (line 14), the text row below the box (number of outcomes in E) and the worked example (line 34, P(E) = |E|/|S|) all name the event E; the left side alone says A. G&S Def. 1.3 (uniform distribution, p.25, PDF p.33) and the historical remark on p.30 (PDF p.38: probability of an event = favourable outcomes / total outcomes) put the same event on both sides. Relabelled P(A) to P(E); no mathematics changed.
- source_rank: 3
- proposed_action: Change P(A) to P(E) on the left side.
- applied: true
- fingerprint: aa99b8ae4620

## [F-002] Typo in example prompt: a rolling
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- severity: nit
- status: open
- locus: example prompt, line 25
- claim: What is the probability of a rolling an even number on a fair 6-sided die?
- evidence: Stray article: "a rolling" should read "rolling". Cosmetic.
- source_rank: 4
- proposed_action: Delete the stray a.
- applied: true
- fingerprint: 299ebf9fccdf

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- resolves: F-001
- status: resolved
- note: Left side relabelled P(E); now matches line 19 and the worked example.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- resolves: F-002
- status: resolved
- note: Stray article removed.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- status_set: verified
- confidence: high
- checks_run: Definition as a set function on events valued in [0,1] satisfying the axioms: syllabus General Probability LO a (define probability as a set function, state the axioms) and G&S Thm 1.1. Equally-likely ratio |E|/|S|: G&S Def. 1.3 + p.30 (favourable/total). Example recomputed before reading: even on a fair die = 3/6 = 1/2, agrees. Common Trap (given result > 2, |S| becomes 4): reduced sample space as in G&S conditional die example (E = X > 4, P(F|E) computed on E), consistent. Links Set Function / Axioms of Probability resolve; Media/Figures/Probability.svg exists. Two nits fixed (F-001, F-002).
- sources_checked: SOA Probability Exam syllabus, November 2026, General Probability learning outcomes a, c-g, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Thm 1.1 pp.22-23 (PDF pp.30-31), Def. 1.3 p.25 (PDF p.33), historical remark p.30 (PDF p.38), §4.1 Examples 4.1/4.4 pp.133-135 (PDF pp.141-143), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf
