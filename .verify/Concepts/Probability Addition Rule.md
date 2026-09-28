---
target: Concepts/Probability Addition Rule.md
created: 2026-09-27
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- status_set: verified
- confidence: high
- checks_run: Two-event rule: G&S Thm 1.4 eq. (1.1), which notes it reduces to disjoint additivity when A and B are disjoint and is generalised by Thm 3.8 (so the also-known-as-inclusion-exclusion bullet is the n=2 case). Three-event formula: G&S Thm 3.8 with n=3, and SOA Q1 p.2 applies exactly this expansion (0.28+0.29+0.19-0.14-0.10-0.12+0.08 = 0.48). Example recomputed first: 0.05+0.03-0.01 = 0.07, agrees. Link Mutually Exclusive Events resolves; figure exists.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Thm 1.1 property 4 pp.22-23 (PDF pp.30-31), Thm 1.4 p.24 (PDF p.32), Thm 3.8 Inclusion-Exclusion Principle p.104 (PDF p.112), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA Exam P Sample Solutions (Aug 2026 revision), Q1 and Q3 p.2, sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf
