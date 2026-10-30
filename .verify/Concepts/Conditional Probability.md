---
target: Concepts/Conditional Probability.md
created: 2026-09-27
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- status_set: verified
- confidence: high
- checks_run: P(A|B) = P(A∩B)/P(B) with P(B) > 0 matches G&S §4.1 (PDF p.142, incl. the P(E) > 0 condition); independence implies P(A|B) = P(A) matches G&S §4.1 Independent Events (PDF p.147); definition matches syllabus outcome 1f; example recomputed before reading the answer: X ~ U(0,1000), P(X>700)/P(X>400) = 0.3/0.6 = 0.5 = stated 0.5 (conditioning on a continuous event as in G&S §4.2, PDF p.170); wiki-links Bayes Theorem and The Law of Total Probability resolve; Media/Figures/Conditional_Probability.svg exists; LaTeX well-formed
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 pp.133-134 (PDF pp.141-142) definition with P(E) > 0; §4.1 Independent Events pp.139-140 (PDF pp.147-148); §4.2 p.162 (PDF p.170) continuous conditional probability, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Probability Exam (Exam P) syllabus, November 2026, p.1 learning outcome 1f, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-30T18:35Z/14ca
- date: 2026-10-30
- status_set: verified
- confidence: high
- checks_run: diff vs 0287511f is add-only (five ### subsections + one example; no existing line changed); every added formula and bullet checked against PN §1.4.0/§1.4.2/§5.1.3/§5.2.3 and G&S Example 4.2; new example recomputed independently (C(4,2)C(3,1)/C(7,3)=18/35≈0.514); no item question's numbers or scenario on the page (p-233 is 2 diamonds/3 spades/5 hearts, example is 4/3/5 balls); prior content unchanged, prior G&S and syllabus sources still apply
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 pp.133-134 (PDF pp.141-142) definition with P(E) > 0 and Example 4.2 (woman aged 60 living to 80 as a conditional probability); §4.1 Independent Events pp.139-140 (PDF pp.147-148); §4.2 p.162 (PDF p.170) continuous conditional probability, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Probability Exam (Exam P) syllabus, November 2026, p.1 learning outcome 1f, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §1.4.0 Conditional Probability (conditional probability is a probability measure, Axiom 3 for disjoint unions given B, P(A^c|C)=1-P(A|C); equally likely outcomes P(A|B)=|A∩B|/|B|), sha256:c8061ae0b186a2655a22916fe53d09d9551ad8f170e533806480f8c86ced4c07 — https://www.probabilitycourse.com/chapter1/1_4_0_conditional_probability.php; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §1.4.2 Law of Total Probability (P(A)=Σ P(A∩B_i) over a partition), sha256:3f3ac7b3163c958cf94f52e1d3250235f12353a03aa086f2b90d4d03407a7b78 — https://www.probabilitycourse.com/chapter1/1_4_2_total_probability.php; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §5.1.3 Conditioning and Independence (conditional PMF P_{X|A}(x_i)=P(X=x_i and A)/P(A); E[X|A]=Σ x_i P_{X|A}(x_i)), sha256:f96cfc28220511431e9ae38905cb664d260d0c2d770fcc6d9a9288149ed138e0 — https://www.probabilitycourse.com/chapter5/5_1_3_conditioning_independence.php; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §5.2.3 Conditioning and Independence (F_{X|A}(x)=(F_X(x)-F_X(a))/(F_X(b)-F_X(a)) given a≤X≤b; endpoints immaterial for continuous X), sha256:b9e764e0b2adb7b888334dd58ee563d47c9c6cd66bd666fa4fa24c7d5e3b32a4 — https://www.probabilitycourse.com/chapter5/5_2_3_conditioning_independence.php
- note: G8 w1 re-check after writer additions. Added material: conditional rules (complement, disjoint union), intervals of one variable incl. survival-to-age-x conditioning, two-way tables, E[X|A], conditioning equally likely draws.
