---
target: Concepts/Joint Cumulative Distribution Function.md
created: 2026-09-28
---

## [F-001] Right-continuity stated without a source
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: minor
- status: open
- locus: properties list, line 18
- claim: It is non-decreasing in each argument and right-continuous
- evidence: MIT 18.05 Reading 7a §3.5 p.6 lists the joint cdf properties as non-decreasing, 0 at the lower-left and 1 at the upper-right of the range; Pishro-Nik §5.2.2 lists F(inf,inf)=1, F(-inf,y)=F(x,-inf)=0, the marginal limits and the rectangle formula; Grinstead & Snell §4.2 Def. 4.6 gives the definition only. None of the three states right-continuity, so that half of the bullet is unsourced this session. It is a standard property: it needs a citation, not a correction.
- source_rank: 3
- proposed_action: Cite a source that states right-continuity of the joint cdf, or drop the clause.
- applied: false
- fingerprint: 074479fc7177

## [F-002] Only the continuous route is given; syllabus outcome a) is discrete joint CDFs
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: minor
- status: open
- locus: recovery formula (line 22) and example (lines 28-33)
- claim: For continuous jointly distributed variables, the joint PDF is recovered by f(x,y) = d2F(x,y)/dxdy; the only example uses independent Uniform[0,1] variables
- evidence: SOA Exam P syllabus (Nov 2026) Topic 3 outcome a), PDF p.4: Determine joint probability functions and joint cumulative distribution functions for discrete random variables. SOA sample Q239 gives a discrete joint cdf F(x,y) = [1-(0.5)^(x+1)][1-(0.2)^(y+1)] and the official solution (PDF p.71) recovers P(X=3,Y=3) = F(3,3)-F(2,3)-F(3,2)+F(2,2) = 0.9360-0.8736-0.9300+0.8680 = 0.0004 (recomputed: 0.9375x0.9984, 0.875x0.9984, 0.9375x0.992, 0.875x0.992 reproduce the four terms). Q410 (solution PDF p.115) evaluates a discrete F(2,3) = 0.92 + 0.05(0.75) = 0.9575 by adding cells. MIT 18.05 7a §3.4 p.5 gives the discrete form F(x,y) = sum over x_i<=x, y_j<=y of p(x_i,y_j). The page gives neither the double-sum form nor the rectangle recovery of p(x,y) from F, so the use the syllabus examines is absent.
- source_rank: 1
- proposed_action: Add the discrete form F(x,y) = sum_{x_i<=x} sum_{y_j<=y} p(x_i,y_j) and, for integer-valued X and Y, p(x,y) = F(x,y)-F(x-1,y)-F(x,y-1)+F(x-1,y-1), with a discrete worked example.
- applied: false
- fingerprint: 3fdfc40c639c

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: F(x,y)=P(X<=x,Y<=y): G&S Def 4.6, MIT 7a §3.4; non-decreasing and F(-inf,y)=F(x,-inf)=0, F(inf,inf)=1: MIT 7a §3.5, Pishro-Nik §5.2.2; f = d2F/dxdy: G&S eq. (4.4), MIT 7a §3.4, Pishro-Nik §5.2.2; independence iff F = F_X F_Y: G&S Def 4.7, MIT 7a §4; example recomputed before reading the answer: 0.4x0.6 = 0.24, agrees; open minors F-001 (right-continuity unsourced) and F-002 (no discrete treatment vs syllabus outcome a)) do not affect a stated formula; links resolve
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 Def. 4.3 and Ex. 4.12-4.13 (joint distribution function, marginal distributions, independence) pp.142-143 (PDF pp.150-151); §4.2 Def. 4.6, eq. (4.4), Def. 4.7, Thm 4.2 p.165 (PDF p.173); conditional density f_X|Y = f_X,Y/f_Y, PDF p.290; §7.2 Sum of Two Independent Exponential Random Variables (PDF p.300), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Orloff & Bloom, MIT OCW 18.05 Introduction to Probability and Statistics (Spring 2022), Reading 7a: Joint Distributions, Independence — §3.1 joint pmf properties p.2, §3.2 joint pdf properties and constant-density area rule p.3, §3.4 joint cdf and f = d2F/dxdy p.5, §3.5 cdf properties p.6, §3.7 marginal pmf p.7, §3.8 marginal pdf p.8, §4 independence and Ex. 13 pp.9-10, sha256:12cf136bbcbef819e1a2530cbfcf15ea06ae83ec4f9ce6c0f6186c87b01d09f4 — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class07-prep-a.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.2.2 Joint Cumulative Distribution Function (properties list; f = d2F/dxdy), web page as fetched 2026-09-28, sha256:fc19c160488ff9c1371e9f6493b4a7ae3ba62c1099de5298d9486ca71ed68b97 — https://www.probabilitycourse.com/chapter5/5_2_2_joint_cdf.php; SOA Exam P Sample Solutions (Aug 2026 revision), Q244 (marginal by adding columns, PDF p.72), Q239 (discrete joint cdf, PDF p.71), Q410 (discrete joint cdf, PDF p.115), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; SOA, Probability Exam (Exam P) Syllabus, November 2026, Topic 3 Multivariate Random Variables, learning objective and outcomes a)-i), PDF p.4, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf

## [F-001/R] Unsourced right-continuity clause removed
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-001
- status: resolved
- note: No source read this session states right-continuity of the joint cdf (MIT 18.05 7a §3.5 p.6 lists non-decreasing and the 0/1 limits; Pishro-Nik §5.2.2 the limits and the rectangle formula), so the clause was deleted; the bullet now says only that F is non-decreasing in each argument.

## [F-002/R] Discrete joint CDF form, cell recovery and a discrete example added
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-002
- status: resolved
- note: Added F(x,y) = sum over x_i <= x, y_j <= y of p(x_i,y_j) (MIT 18.05 7a §3.4 p.5, discrete case), the integer-valued recovery p(x,y) = F(x,y)-F(x-1,y)-F(x,y-1)+F(x-1,y-1) (SOA sample solution Q239, PDF p.71, page image read: P(X=3,Y=3) = F(3,3)-F(2,3)-F(3,2)+F(2,2); Pishro-Nik §5.2.2 rectangle formula) and a worked discrete example placed first: F(1,1) = 0.85, F(0,2) = 0.50, p(1,1) = 0.85-0.45-0.50+0.30 = 0.20, matching the table (recomputed).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Re-verified after resolving F-001, F-002: properties (MIT 7a §3.5; Pishro-Nik §5.2.2); discrete double sum (MIT 7a §3.4); rectangle recovery (Q239, recomputed 0.9360-0.8736-0.9300+0.8680 = 0.0004); mixed partial for densities (Pishro-Nik §5.2.2); factorisation (G&S Def. 4.7). Examples recomputed: 0.85, 0.50, 0.20; 0.4 x 0.6 = 0.24.
- sources_checked: Orloff & Bloom, MIT OCW 18.05 Introduction to Probability and Statistics (Spring 2022), Reading 7a: Joint Distributions, Independence — §3.4 joint cdf (discrete double sum; continuous double integral) p.5, §3.5 properties of the joint cdf p.6, sha256:12cf136bbcbef819e1a2530cbfcf15ea06ae83ec4f9ce6c0f6186c87b01d09f4 — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class07-prep-a.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.2.2 Joint Cumulative Distribution Function (limits, rectangle formula, f = d2F/dxdy), web page as fetched 2026-09-28, sha256:dbbb45db724d91c7f1eeede2524932e6babb38a906987d51550cb7a9990b73e0 — https://www.probabilitycourse.com/chapter5/5_2_2_joint_cdf.php; SOA Exam P Sample Solutions (Aug 2026 revision), Q239 (discrete joint cdf, rectangle recovery, PDF p.71), Q410 (discrete joint cdf by adding cells, PDF p.115), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Def. 4.7 (independence iff the joint cdf factors, PDF p.173), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Probability Exam (Exam P) Syllabus, November 2026, Topic 3 Multivariate Random Variables, learning objective and outcomes a)-i), PDF p.4, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
