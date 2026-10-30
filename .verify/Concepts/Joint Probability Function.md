---
target: Concepts/Joint Probability Function.md
created: 2026-09-28
---

## [F-001] Conditional described as fixing one variable, without renormalising
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: minor
- status: open
- locus: bullet list, line 20
- claim: [[Conditional Probability Function]]s are obtained by fixing one variable
- evidence: Pishro-Nik §5.2.3 gives the conditional as the joint divided by the marginal of the conditioning variable, f_X|Y(x|y) = f_XY(x,y)/f_Y(y), from P(A|B) = P(A∩B)/P(B) with P(B) > 0; the linked page Conditional Probability Function gives the same discrete form. Fixing Y=1 in the example table on this page gives the slice (0.20, 0.10), which sums to 0.30, not 1; the conditional pmf of X given Y=1 is (2/3, 1/3). The bullet omits the division by p_Y(y), so a student reading it would take p(x,1) itself as the conditional.
- source_rank: 3
- proposed_action: Reword to: obtained by fixing one variable and dividing by its marginal, p_{X|Y}(x|y) = p(x,y)/p_Y(y).
- applied: false
- fingerprint: 62b0d109b750

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: p(x,y)=P(X=x,Y=y), p>=0 and double sum = 1: MIT 7a §3.1 p.2; marginals by summing out: MIT 7a §3.7 p.7 and SOA Q244 official solution (marginal by adding columns); example recomputed before reading the answer: table sums to 1.00, P(X=1,Y=1)=0.10, P(X=1)=0.30, agrees; discrete-only framing matches syllabus outcome a); links resolve; open minor F-001 (conditional bullet omits renormalisation) does not affect a formula
- sources_checked: Orloff & Bloom, MIT OCW 18.05 Introduction to Probability and Statistics (Spring 2022), Reading 7a: Joint Distributions, Independence — §3.1 joint pmf properties p.2, §3.2 joint pdf properties and constant-density area rule p.3, §3.4 joint cdf and f = d2F/dxdy p.5, §3.5 cdf properties p.6, §3.7 marginal pmf p.7, §3.8 marginal pdf p.8, §4 independence and Ex. 13 pp.9-10, sha256:12cf136bbcbef819e1a2530cbfcf15ea06ae83ec4f9ce6c0f6186c87b01d09f4 — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class07-prep-a.pdf; SOA Exam P Sample Solutions (Aug 2026 revision), Q244 (marginal by adding columns, PDF p.72), Q239 (discrete joint cdf, PDF p.71), Q410 (discrete joint cdf, PDF p.115), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.2.3 Conditioning and Independence (P(A|B)=P(A∩B)/P(B); f_X|Y = f_XY/f_Y; independence gives f_X|Y = f_X), web page as fetched 2026-09-28, sha256:440ec280d6efdc0929cc844b4e80449f095eeb361179491311b023da88395b95 — https://www.probabilitycourse.com/chapter5/5_2_3_conditioning_independence.php; SOA, Probability Exam (Exam P) Syllabus, November 2026, Topic 3 Multivariate Random Variables, learning objective and outcomes a)-i), PDF p.4, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf

## [F-001/R] Conditional now divides by the marginal
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-001
- status: resolved
- note: Bullet now reads: fixing one variable and dividing by its marginal, p_X|Y(x|y) = p(x,y)/p_Y(y) for p_Y(y) > 0, as Pishro-Nik §5.2.3 gives the discrete conditional PMF P_X|Y(x_i|y_j) = P_XY(x_i,y_j)/P_Y(y_j). Example answer adds the conditional from the table: P(X=1|Y=1) = 0.10/0.30 = 1/3 and P(X=0|Y=1) = 2/3 (recomputed).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Re-verified after resolving F-001: definition and properties (Pishro-Nik §5.1.1), marginals by summing out (Q244), conditional as joint over marginal (Pishro-Nik §5.2.3). Example recomputed: table sums to 1; P(X=1)=0.30; P(X=1|Y=1)=1/3.
- sources_checked: Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.1.1 Joint Probability Mass Function (sum of the joint PMF over its range = 1; marginal PMF), web page as fetched 2026-09-28, sha256:29a5a73be1d726200cac31415dba2c0cd3ec0184d5f6f81d333ac195ab3a707a — https://www.probabilitycourse.com/chapter5/5_1_1_joint_pmf.php; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.2.3 Conditioning and Independence (discrete conditional PMF P_X|Y = P_XY/P_Y), web page as fetched 2026-09-28, sha256:a87cccc76b2d0a5139f26cd6a59fa1aac41b982e3e3d2d16bb353b9c41dac04c — https://www.probabilitycourse.com/chapter5/5_2_3_conditioning_independence.php; SOA Exam P Sample Solutions (Aug 2026 revision), Q244 (marginal by adding columns, PDF p.72), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; SOA, Probability Exam (Exam P) Syllabus, November 2026, Topic 3 Multivariate Random Variables, learning objective and outcomes a)-i), PDF p.4, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-30T18:36Z/7439
- date: 2026-10-30
- status_set: verified
- confidence: medium
- checks_run: Diff against 0287511f read in full: additions only, no prior sentence changed; earlier content and its prior sources (re-cited) unchanged; new wiki-links resolve; LaTeX balanced; no question numbers, scenario or wording on the page (compared with the items' question files). Event sum P((X,Y) in A) (Pishro-Nik 5.1.1 verbatim); table reading and P(X+Y=s) = sum_x p(x,s-x) are that formula for the events named; p(x,s-x) = p_X(x)p(s-x|x) and P(X=x|X+Y=s) = p(x,s-x)/P(X+Y=s) from the conditional PMF definition (5.2.3). Multinomial PMF, ordering count, k=2 binomial and marginal binomial (Siegrist 11.5); k=3 form substituted; E[N_i]=np_i and P(N_i>=1)=1-(1-p_i)^n are the binomial mean and complement of P(N_i=0).
- sources_checked: Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.1.1 Joint Probability Mass Function (sum of the joint PMF over its range = 1; marginal PMF), web page as fetched 2026-09-28, sha256:29a5a73be1d726200cac31415dba2c0cd3ec0184d5f6f81d333ac195ab3a707a — https://www.probabilitycourse.com/chapter5/5_1_1_joint_pmf.php; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.2.3 Conditioning and Independence (discrete conditional PMF P_X|Y = P_XY/P_Y), web page as fetched 2026-09-28, sha256:a87cccc76b2d0a5139f26cd6a59fa1aac41b982e3e3d2d16bb353b9c41dac04c — https://www.probabilitycourse.com/chapter5/5_2_3_conditioning_independence.php; SOA Exam P Sample Solutions (Aug 2026 revision), Q244 (marginal by adding columns, PDF p.72), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; SOA, Probability Exam (Exam P) Syllabus, November 2026, Topic 3 Multivariate Random Variables, learning objective and outcomes a)-i), PDF p.4, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §5.1.1 Joint PMF: P((X,Y) in A) = sum of P_XY over (A cap R_XY); R_XY taken as R_X x R_Y with some P_XY zero; marginal PMF eq. (5.1), HTML fetched 2026-10-30, sha256:eeadad2f381a4b909be811c27c4f8b6e9e85b96678a9fa9a25bf57ade8bfbabf — https://www.probabilitycourse.com/chapter5/5_1_1_joint_pmf.php; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §5.2.3 Conditioning and Independence: f_{X|A}(x) = f_X(x)/P(A) on A, conditional expectation as the integral against f_{X|A}; independent X, Y have f_XY = f_X f_Y and E[g(X)h(Y)] = E[g(X)]E[h(Y)], HTML fetched 2026-10-30, sha256:b9e764e0b2adb7b888334dd58ee563d47c9c6cd66bd666fa4fa24c7d5e3b32a4 — https://www.probabilitycourse.com/chapter5/5_2_3_conditioning_independence.php; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 11.5 The Multinomial Distribution: each sequence with outcome i occurring j_i times has probability p_1^{j_1}...p_k^{j_k}, the number of such sequences is the multinomial coefficient; generalizes Bernoulli trials (k = 2); Y_i is binomial with parameters n and p_i, HTML fetched 2026-10-30, sha256:eee1779c2c22be3a73f51f9149c846395c8ba2cbe8609433afd865b3c9a50e2e — https://www.randomservices.org/random/bernoulli/Multinomial.html
- note: Re-passed after the Exam P G8 additions (w6); new passages checked against the cited open sources and the short derivations re-done.
