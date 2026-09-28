---
target: Concepts/Multivariate Distribution.md
created: 2026-09-28
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: high
- checks_run: joint distribution characterised by joint pmf (discrete) / joint density (continuous): G&S Def 4.3 and Def 4.6, MIT 7a §3.1-3.2; marginals by summing/integrating out: MIT 7a §3.7-3.8; covariance and correlation measure linear relationship: MIT 7b p.4 and correlation property 3; independence gives product of marginals: G&S §4.1 (Ex. 4.12 text) and Thm 4.2, MIT 7a §4; example recomputed before reading the answer: pmf sums to 1, X marginal (0.5, 0.5), Y marginal (0.4, 0.6), 0.1 vs 0.5x0.4=0.20 so dependent, agrees; syllabus Topic 3 objective covers discrete and continuous settings; all 7 wiki-links resolve; figure embed exists (generated, not reviewed)
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 Def. 4.3 and Ex. 4.12-4.13 (joint distribution function, marginal distributions, independence) pp.142-143 (PDF pp.150-151); §4.2 Def. 4.6, eq. (4.4), Def. 4.7, Thm 4.2 p.165 (PDF p.173); conditional density f_X|Y = f_X,Y/f_Y, PDF p.290; §7.2 Sum of Two Independent Exponential Random Variables (PDF p.300), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Orloff & Bloom, MIT OCW 18.05 Introduction to Probability and Statistics (Spring 2022), Reading 7a: Joint Distributions, Independence — §3.1 joint pmf properties p.2, §3.2 joint pdf properties and constant-density area rule p.3, §3.4 joint cdf and f = d2F/dxdy p.5, §3.5 cdf properties p.6, §3.7 marginal pmf p.7, §3.8 marginal pdf p.8, §4 independence and Ex. 13 pp.9-10, sha256:12cf136bbcbef819e1a2530cbfcf15ea06ae83ec4f9ce6c0f6186c87b01d09f4 — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class07-prep-a.pdf; Orloff & Bloom, MIT OCW 18.05 (Spring 2022), Reading 7b: Covariance and Correlation — covariance measures the linear relationship and Ex. 3 continuous covariance by double integral p.4, correlation property 3 p.5, sha256:71f8a7b5f3b2233de2e8722ec1372f5704195efc2a6fb72c50c8ef505f92c4dc — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class07-prep-b.pdf; SOA, Probability Exam (Exam P) Syllabus, November 2026, Topic 3 Multivariate Random Variables, learning objective and outcomes a)-i), PDF p.4, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
