---
target: Concepts/Conditional Probability Function.md
created: 2026-09-28
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: high
- checks_run: f_X|Y = f(x,y)/f_Y(y) for f_Y(y) > 0: Pishro-Nik §5.2.3, G&S PDF p.290; discrete P(X=x|Y=y) = P(X=x,Y=y)/P(Y=y): Pishro-Nik §5.2.3 (P(A|B) = P(A∩B)/P(B), P(B)>0); example recomputed before reading the answer: 6(1-y) integrates to 1 on 0<=x<=y<=1, f_Y = 6y(1-y), f_X|Y = 1/y on [0,y] (uniform), agrees; discrete formula present for syllabus outcome b); links resolve
- sources_checked: Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.2.3 Conditioning and Independence (P(A|B)=P(A∩B)/P(B); f_X|Y = f_XY/f_Y; independence gives f_X|Y = f_X), web page as fetched 2026-09-28, sha256:440ec280d6efdc0929cc844b4e80449f095eeb361179491311b023da88395b95 — https://www.probabilitycourse.com/chapter5/5_2_3_conditioning_independence.php; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 Def. 4.3 and Ex. 4.12-4.13 (joint distribution function, marginal distributions, independence) pp.142-143 (PDF pp.150-151); §4.2 Def. 4.6, eq. (4.4), Def. 4.7, Thm 4.2 p.165 (PDF p.173); conditional density f_X|Y = f_X,Y/f_Y, PDF p.290; §7.2 Sum of Two Independent Exponential Random Variables (PDF p.300), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Probability Exam (Exam P) Syllabus, November 2026, Topic 3 Multivariate Random Variables, learning objective and outcomes a)-i), PDF p.4, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-30T18:36Z/7439
- date: 2026-10-30
- status_set: verified
- confidence: high
- checks_run: Diff against 0287511f read in full: additions only, no prior sentence changed; earlier content and its prior sources (re-cited) unchanged; new wiki-links resolve; LaTeX balanced; no question numbers, scenario or wording on the page (compared with the items' question files). Kernel bullet: conditional = joint / marginal of the conditioning variable, which is the normalizing constant (Siegrist 3.5, verbatim), so the conditional is proportional to the joint with y fixed.
- sources_checked: Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.2.3 Conditioning and Independence (P(A|B)=P(A∩B)/P(B); f_X|Y = f_XY/f_Y; independence gives f_X|Y = f_X), web page as fetched 2026-09-28, sha256:440ec280d6efdc0929cc844b4e80449f095eeb361179491311b023da88395b95 — https://www.probabilitycourse.com/chapter5/5_2_3_conditioning_independence.php; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 Def. 4.3 and Ex. 4.12-4.13 (joint distribution function, marginal distributions, independence) pp.142-143 (PDF pp.150-151); §4.2 Def. 4.6, eq. (4.4), Def. 4.7, Thm 4.2 p.165 (PDF p.173); conditional density f_X|Y = f_X,Y/f_Y, PDF p.290; §7.2 Sum of Two Independent Exponential Random Variables (PDF p.300), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Probability Exam (Exam P) Syllabus, November 2026, Topic 3 Multivariate Random Variables, learning objective and outcomes a)-i), PDF p.4, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 3.5 Conditional Distributions: g(x|y) = f(x,y)/h(y) on S for fixed y; the denominator is the normalizing constant, HTML fetched 2026-10-30, sha256:ad76250f09b0c4438869894ebb75a07a5cf0465944d7b5ff2b3c270fcc3b369e — https://www.randomservices.org/random/dist/Conditional.html
- note: Re-passed after the Exam P G8 additions (w6); new passages checked against the cited open sources and the short derivations re-done.

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-11-06T18:00Z/29d9
- date: 2026-11-06
- status_set: verified
- confidence: high
- checks_run: Recomputed: conditional rows (0.6,0.3,0.1)/(0.4,0.4,0.2), wrong-total 0.67 = P(X=1|Y=2) = 2/3, E[Y|X=1]=0.80, E[Y|X=0]=0.50, tower 0.65, Var(Y|X=1)=0.56; f=6x gives f_X|Y=2x/y^2 and E[X|Y]=2y/3 (sympy); kernel example exponential rate x; Try-its 1/y, litigated 0.216 and 0.4444, e^-2=0.1353. Formulas against Siegrist 3.5 (normalizing constant), Pishro-Nik 5.2.3 (f_X|Y, E[X|Y=y], Var(X|Y=y)), G&S §4.1. Links resolve.
- sources_checked: Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 3.5 Conditional Distributions: g(x|y) = f(x,y)/h(y) for fixed y; the denominator is the normalizing constant, HTML fetched 2026-11-06, sha256:ad76250f09b0c4438869894ebb75a07a5cf0465944d7b5ff2b3c270fcc3b369e — https://www.randomservices.org/random/dist/Conditional.html; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §5.2.3 Conditioning and Independence: f_X|Y = f_XY/f_Y; E[X|Y=y], Var(X|Y=y); independence gives f_X|Y = f_X, E[XY] = EX EY and E[g(X)h(Y)] = E[g(X)]E[h(Y)], HTML fetched 2026-11-06, sha256:5d697207bda40aa9ff1ce9a59db1231fe112d2fd061fed5ce08921d8c889c03a — https://www.probabilitycourse.com/chapter5/5_2_3_conditioning_independence.php; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 conditional probability with E as the new sample space (PDF p.141), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA Probability Exam (Exam P) syllabus, November 2026, Topic 3 outcomes b-d (PDF p.4), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
- note: Re-check of the rewritten page (teaching-style rewrite). Every claim and number checked; all prior findings remain closed.
