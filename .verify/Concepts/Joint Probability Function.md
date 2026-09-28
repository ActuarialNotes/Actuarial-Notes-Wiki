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
