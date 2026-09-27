---
target: Concepts/Probability Multiplication Rule.md
created: 2026-09-27
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- status_set: verified
- confidence: high
- checks_run: P(A and B) = P(A)P(B|A) = P(B)P(A|B): G&S P(F|E) = P(F and E)/P(E) for P(E) > 0 and eq. (4.2). Independence simplification P(B|A) = P(B): G&S Def. 4.1 and Thm 4.1; SOA Q351 applies the multiplication rule for independent events. Chain rule: G&S Example 4.5 tree (second-stage branch weights are conditional probabilities, path probability is their product). Example recomputed first: 4/10*3/9 = 12/90 = 2/15 = 0.1333 (also C(4,2)/C(10,2) = 6/45), agrees. Link Independent Events resolves; figure exists.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 conditional probability p.134 (PDF p.142), Example 4.5/Fig. 4.1 p.135 (PDF p.143), Def. 4.1 + Thm 4.1 pp.139-140 (PDF pp.147-148), eq. (4.2) p.146 (PDF p.154), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA Exam P Sample Solutions (Aug 2026 revision), Q351 p.98 (multiplication rule for independent events), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf
