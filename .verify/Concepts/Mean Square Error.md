---
target: Concepts/Mean Square Error.md
created: 2026-10-04
---

## [F-001] Only the estimator sense is given; MAS-I Domain C, MAS-II and Exam 7 readings use MSE for prediction error
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: major
- status: open
- locus: definition and decomposition (lines 14-22); inbound link from Exam MAS-II (CAS).md line 95
- claim: MSE(theta-hat) = E[(theta-hat - theta)^2] = Var(theta-hat) + Bias(theta-hat)^2, theta a fixed parameter - the page only definition.
- evidence: The estimator sense is right (Siegrist §6.1; PSU STAT 415 Def 2.3). But the page is reached in a second sense: Exam MAS-II (CAS).md line 95 links it as "[[Test Error|Test error]] measured by the [[Mean Square Error]]", and [[Test Error]], [[Mack Chain Ladder Model]] and the Mack (1994) / Mack (2000) resource pages link it for prediction error. ISLR §2.2.1 eq. (2.5) defines MSE = (1/n) sum (y_i - f-hat(x_i))^2 over observations, and §2.2.2 eq. (2.7) splits the expected test MSE into Var(f-hat(x0)) + [Bias(f-hat(x0))]^2 + Var(epsilon), an irreducible-error term this page two-term decomposition lacks. ISLR Ch 2 (excl. §2.2.3) is on the 2026 MAS-I outline Domain C (PDF p.6) and §2.2 on the 2026 MAS-II outline (PDF p.4-5). Mack (1994) pp.114-115, an Exam 7 reading, defines mse(C-hat_iI) = E[(C-hat_iI - C_iI)^2 | D] for a random target, = Var(C_iI | D) + (E(C_iI | D) - C-hat_iI)^2: process variance plus estimation error. A MAS-II or Exam 7 reader who applies this page Var + Bias^2 to a prediction leaves out the irreducible / process-variance term. Flagged, not reconciled: the sense differs by exam.
- source_rank: 2
- proposed_action: Add a short section on MSE as prediction error - ISLR (2.5) and the three-term (2.7), and Mack conditional mse = process variance + estimation error - or point those links at [[Test Error]] / [[Bias-Variance Tradeoff]]. Not applied: needs new prose.
- applied: false
- fingerprint: 6931552a1887

## [F-002] "The credibility estimator" minimises MSE only in Buhlmann (least-squares) credibility
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: bullet 4, line 27
- claim: "In actuarial credibility, the [[Credibility Theory|credibility estimator]] is chosen to minimize MSE".
- evidence: Werner & Modlin, Basic Ratemaking Ch.12 p.220 (PDF p.232): "Buhlmann credibility is commonly referred to as least squares credibility since the goal of this approach is to minimize the square of the error between the estimate and the true expected value of the quantity being estimated." The same chapter classical (limited fluctuation) credibility sets its full-credibility standard by a probability criterion (p.218, PDF p.230: a 90% probability of being within 5% gives 1,082 claims), not by minimising MSE. As written the bullet covers both.
- source_rank: 3
- proposed_action: Name it: "In Buhlmann (least-squares) credibility, the credibility estimator is chosen to minimize MSE".
- applied: false
- fingerprint: 69fcbe3b843a
