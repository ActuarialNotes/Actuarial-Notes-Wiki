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

## [F-001/R] Sanity check now forbids the inner variable, not the outer one
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-001
- status: resolved
- note: Step 4 now reads: the outer limits are always numbers; the inner limits may mention the outer variable but never the inner variable itself (the limits on dy never contain y). Consistent with step 3, the display formula, the page examples (y from x to 1; y from 2x to 1) and Pishro-Nik §5.2.1, whose normalisation integral runs y from 0 to x inside x from 0 to 1.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Re-verified after resolving F-001: region integral, marginal and conditional density formulas (Pishro-Nik §5.2.1, §5.2.3), factorisation criterion (G&S Thm 4.2). Examples recomputed: c = 2; f_Y(y) = 4y^3 integrates to 1; P(Y > 2X) = 1/2 - 1/4 = 0.25; f_X|Y = 2x/y^2 on 0 < x < y.
- sources_checked: Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.2.1 Joint Probability Density Function (probability as the double integral; marginal PDFs; normalisation with inner limit in the outer variable), web page as fetched 2026-09-28, sha256:256703bb60bfcdf98140e34bd6b476a7875aabd59ced22f8f881189b09ec8886 — https://www.probabilitycourse.com/chapter5/5_2_1_joint_pdf.php; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.2.3 Conditioning and Independence (f_X|Y = f_XY/f_Y; independence iff f_XY = f_X f_Y), web page as fetched 2026-09-28, sha256:a87cccc76b2d0a5139f26cd6a59fa1aac41b982e3e3d2d16bb353b9c41dac04c — https://www.probabilitycourse.com/chapter5/5_2_3_conditioning_independence.php; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Thm 4.2 (density factorisation iff independent, PDF p.173), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf

## [F-002] Two-variable expectation formula not in any source read
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-11-28T14:55Z/e368
- date: 2026-11-28
- severity: minor
- status: open
- locus: E[g(X,Y)] as a double integral
- claim: The expected value of g(X,Y) is the double integral of g(x,y) f(x,y) over the support.
- evidence: G&S Thm 6.11 (PDF p.278) gives E(phi(X)) for one variable only; Thm 6.12 gives E(XY) = E(X)E(Y) for independent variables. Pishro-Nik §5.2.1 does not state the two-variable form. The formula is the standard two-dimensional law of the unconscious statistician, but no excerpt read this session states it.
- source_rank: 5
- proposed_action: Cite a source that states the two-variable form (for example, the theorem following G&S Thm 6.11 in a multivariate treatment), or mark it as the standard result without a citation.
- applied: false
- fingerprint: b6f7723ec9cc

## [C-003] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-11-28T14:55Z/e368
- date: 2026-11-28
- status_set: in_review
- checks_run: Blind answers computed first, by exact hand integration and a numerical check (2000 x 2000 midpoint sum): C5 c = 2 (the integral of c(x+y) over 0<x<y<1 is c/2); C13 P(Y > 2X) = 0.25; C17 f_Y(y) = 4y^3; C21 f_{X|Y}(x|y) = 2x/y^2 on 0<x<y. The page's answers c = 2, 0.25, 4y^3 and 2x/y^2 all agree. Working line by line: the C5 inner integral line is wrong. The page gives ∫_x^1 (x+y) dy = x + 1/2 - 3x^2/5. The correct value is x(1-x) + (1-x^2)/2 = 1/2 + x - 3x^2/2; at x = 0.3 the true value is 0.665 and the page's formula gives 0.746. The page's next line, 'integrating over x gives 1/2 + 1/2 - 1/2 = 1/2', holds only for the correct inner integral (the page's own formula would give 4/5), so the final c = 2 is right but the printed step is not. C13 working (inner 4x - 16x^3, outer 1/2 - 1/4) checked by hand and numerically (0.25). C17 (x runs 0 to y, the integral 4y^3, check to 1) and C21 (8xy/(4y^3)) checked by hand. C1, C3, C7 (double-integral probability, normalisation, limits) checked against Pishro-Nik §5.2.1 eq. 5.15 and the normalisation paragraph. C15 (marginal f_X = integral of f over y, f_Y over x) against Pishro-Nik §5.2.1 'Marginal PDFs'. C18-C20 (conditional density f_{Y|X} = f/f_X) against Pishro-Nik §5.2.3. C22-C23 (independence iff the joint density is the product of the marginals) against G&S Thm 4.2 (PDF p.173). C24 (triangular support forces dependence) and C28 (trap) follow from Thm 4.2: a product of marginals has a rectangular support. Accepted as a direct consequence. C25-C27 (expected value of g(X,Y) as a double integral over the support): G&S Thm 6.11 (PDF p.278) gives the one-variable form only, and Thm 6.12 the product rule for independent variables; no source read this session gives the two-variable form. Pishro-Nik §5.2.1 was searched for it and does not state it. Listed as unsourced.
- sources_checked: Joint Probability Density Function | Joint Continuity | PDF, §5.2.1, eq. 5.15 (probability as double integral), normalisation, marginal PDFs, sha256:496f9d67cc9a2074503fd7ffa9d0c6e185a6744d7b60a86078a52ae60f225f22 — https://www.probabilitycourse.com/chapter5/5_2_1_joint_pdf.php; Conditioning and Independence | Law of Total Probability, §5.2.3, conditional PDF f_{Y|X}(y|x) = f_XY(x,y)/f_X(x), sha256:af73df7c214c87397f4ac78f80e7bc7445eb9254884adb06e45db6f5ea6ca2b4 — https://www.probabilitycourse.com/chapter5/5_2_3_conditioning_independence.php; https://math.dartmouth.edu/~prob/prob/prob.pdf, Thm 4.2 (PDF p.173); Thm 6.11 and 6.12 (PDF p.278), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e
