---
target: Concepts/Joint Probability Density Function.md
created: 2026-09-28
---

## [F-001] Sanity-check step contradicts the slicing rule and the page own examples
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: major
- status: open
- locus: Setting up the limits, step 4, line 34
- claim: Sanity check: the outer limits are always numbers, the inner limits never mention the outer variable's *own* symbol.
- evidence: Step 3 of the same list says the inner limits may involve the outer variable, and the display formula under it integrates y from g1(x) to g2(x) with x outermost. The worked examples on the page use inner limits in the outer variable (y from x to 1; y from 2x to 1), and Pishro-Nik §5.2.1 Example 5.15 normalises with the integral over x from 0 to 1 of the integral over y from 0 to x of c x^2 y dy dx: an inner limit equal to the outer variable. Read literally, step 4 tells a student to reject exactly those limits, which pushes them back to rectangle limits (the error the page itself warns against). What must never appear in the inner limits is the inner variable.
- source_rank: 3
- proposed_action: Change to: the inner limits never mention the inner variable (the limits on dy never contain y).
- applied: false
- fingerprint: 2e7d4c5c89ca

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: P((X,Y) in A) = double integral of f over A: Pishro-Nik eq. 5.15; f_X = integral of f dy: Pishro-Nik §5.2.1, MIT 7a §3.8; f_Y|X = f/f_X: Pishro-Nik §5.2.3, G&S PDF p.290; f>=0 and total integral 1: MIT 7a §3.2, Pishro-Nik §5.2.1; independence iff f = f_X f_Y: G&S Thm 4.2, Pishro-Nik §5.2.3, product range MIT 7a §3.2 and Ex. 13; E[g(X,Y)] as a double integral against f: MIT 7b Ex. 3; examples recomputed before reading the answers: c = 2 (integral of x + 1/2 - 3x^2/2 over [0,1] = 1/2), f_Y = 4y^3 and the wrong-limit 4y integrates to 2, P(Y>2X) = integral of 4x - 16x^3 over [0,1/2] = 1/4, f_X|Y = 2x/y^2 on 0<x<y integrates to 1: all agree; open major F-001 is a procedural sentence, no formula affected; links resolve
- sources_checked: Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.2.1 Joint Probability Density Function (eq. 5.15, marginal PDFs, Example 5.15), web page as fetched 2026-09-28, sha256:c2ca39bee0f18d77474ce3ddaf824f6c191da3903c3f4a2ce4389c6ffae9bc94 — https://www.probabilitycourse.com/chapter5/5_2_1_joint_pdf.php; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.2.3 Conditioning and Independence (P(A|B)=P(A∩B)/P(B); f_X|Y = f_XY/f_Y; independence gives f_X|Y = f_X), web page as fetched 2026-09-28, sha256:440ec280d6efdc0929cc844b4e80449f095eeb361179491311b023da88395b95 — https://www.probabilitycourse.com/chapter5/5_2_3_conditioning_independence.php; Orloff & Bloom, MIT OCW 18.05 Introduction to Probability and Statistics (Spring 2022), Reading 7a: Joint Distributions, Independence — §3.1 joint pmf properties p.2, §3.2 joint pdf properties and constant-density area rule p.3, §3.4 joint cdf and f = d2F/dxdy p.5, §3.5 cdf properties p.6, §3.7 marginal pmf p.7, §3.8 marginal pdf p.8, §4 independence and Ex. 13 pp.9-10, sha256:12cf136bbcbef819e1a2530cbfcf15ea06ae83ec4f9ce6c0f6186c87b01d09f4 — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class07-prep-a.pdf; Orloff & Bloom, MIT OCW 18.05 (Spring 2022), Reading 7b: Covariance and Correlation — covariance measures the linear relationship and Ex. 3 continuous covariance by double integral p.4, correlation property 3 p.5, sha256:71f8a7b5f3b2233de2e8722ec1372f5704195efc2a6fb72c50c8ef505f92c4dc — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class07-prep-b.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 Def. 4.3 and Ex. 4.12-4.13 (joint distribution function, marginal distributions, independence) pp.142-143 (PDF pp.150-151); §4.2 Def. 4.6, eq. (4.4), Def. 4.7, Thm 4.2 p.165 (PDF p.173); conditional density f_X|Y = f_X,Y/f_Y, PDF p.290; §7.2 Sum of Two Independent Exponential Random Variables (PDF p.300), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf
