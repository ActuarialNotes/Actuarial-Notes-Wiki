---
target: Concepts/Bayes Theorem.md
created: 2026-09-27
---

## [F-001] Doubled article before the Law of Total Probability link
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- severity: nit
- status: open
- locus: definition bullet, line 15
- claim: The denominator $P(E)$ is computed via the [[The Law of Total Probability]]
- evidence: The link renders as the page name The Law of Total Probability, so the sentence reads via the The Law of Total Probability. Removing the extra article is a typo fix; no mathematical content changes.
- source_rank: 5
- proposed_action: Drop the article: via [[The Law of Total Probability]].
- applied: true
- fingerprint: 391853e25dcf

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- resolves: F-001
- status: resolved
- note: Removed the doubled article in this pass; the bullet now reads via The Law of Total Probability.

## [F-002] Independence bullet uses notation foreign to the page
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- severity: nit
- status: open
- locus: bullet list, line 22
- claim: If $A$ and $B$ are independent, then $P(A \mid B) = P(A)$
- evidence: The page defines only H, E and the partition {H_i}; A and B appear nowhere else on it. The statement itself is correct (Grinstead & Snell §4.1 Independent Events, p.139, PDF p.147) and is the same bullet as Concepts/Conditional Probability.md line 18, so it reads as a carry-over rather than a point about Bayes Theorem.
- source_rank: 3
- proposed_action: Remove the bullet, or restate it in the page notation (if H and E are independent, observing E leaves the prior unchanged: P(H|E) = P(H)).
- applied: false
- fingerprint: bea0a6183351

## [F-003] Credibility claim not supported by any source read
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- severity: minor
- status: open
- locus: bullet list, line 23
- claim: Bayes' Theorem is central to [[Credibility Theory]] and to [[Bayesian Credibility]], where the prior is the class assumption and the posterior is the experience-updated estimate
- evidence: None of the sources read this pass (Grinstead & Snell Ch.4, SOA Exam P syllabus Nov 2026, SOA Exam P sample solutions) covers credibility; it is a MAS-II topic (Exam MAS-II (CAS).md objective 1 links [[Bayesian Credibility]]). Unchecked: in Bayesian credibility the prior is usually a distribution over the risk parameter, so describing it as the class assumption may be loose.
- source_rank: 3
- proposed_action: Check the sentence against the MAS-II credibility reading and restate or cite it there.
- applied: false
- fingerprint: b61b081e102e

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- status_set: verified
- confidence: medium
- checks_run: P(H|E) = P(E|H)P(H)/P(E) and the partition form match G&S Bayes formula P(H_i|E) = P(H_i)P(E|H_i)/Σ_k P(H_k)P(E|H_k) (PDF p.154; partition = one and only one H_k occurs); denominator = P(E) by G&S eq. (4.3); independence bullet correct per G&S PDF p.147 (notation issue F-002); example recomputed first: P(C) = 0.40(0.20) + 0.10(0.80) = 0.16, P(H|C) = 0.08/0.16 = 0.50 = stated; matches syllabus outcome 1g; links (The Law of Total Probability, Credibility Theory, Bayesian Credibility) and Media/Figures/Bayes_Theorem.svg resolve; typo F-001 fixed; credibility sentence unchecked (F-003)
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 Bayes Probabilities pp.145-146 (PDF pp.153-154) eqs. (4.2)-(4.3) and Bayes formula; §4.1 Independent Events p.139 (PDF p.147), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Probability Exam (Exam P) syllabus, November 2026, p.1 learning outcome 1g, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf

## [F-002/R] Independence bullet restated in the page notation
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-002
- status: resolved
- note: Bullet now reads: if H and E are independent (with P(E) > 0), observing E leaves the prior unchanged, P(H | E) = P(H). G&S Def. 4.1 (p.139, PDF p.147).

## [F-003/R] Unsourced credibility sentence removed
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-003
- status: resolved
- note: Deleted the sentence on Bayes’ Theorem in Credibility Theory / Bayesian Credibility (prior as class assumption): no credibility reading was read this session to check it. A plain "See also [[Bayesian Credibility]]" link remains, with no claim attached.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- status_set: verified
- confidence: high
- checks_run: Re-verified after resolving F-002, F-003: prior P(H) to posterior P(H | E) given evidence E, with hypotheses H1..Hm pairwise disjoint covering the sample space = G&S Bayes formula (p.145); denominator = eq. (4.3); formula P(H | E) = P(E | H) P(H) / Σ P(E | Hi) P(Hi) = G&S Bayes formula; independence bullet = Def. 4.1; example recomputed P(C) = 0.40(0.20) + 0.10(0.80) = 0.16, P(H | C) = 0.08 / 0.16 = 0.50.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 Def. 4.1 (p.139, PDF p.147), Bayes formula and eqs. (4.2)-(4.3) (pp.145-146, PDF pp.153-154), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcome 1g (PDF p.2), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-30T18:35Z/14ca
- date: 2026-10-30
- status_set: verified
- confidence: medium
- checks_run: diff vs 0287511f is add-only (two ### subsections + one example); restricted-subset formula checked as G&S Bayes formula with evidence E∩(H_1∪…∪H_k), P(E'|H_i)=P(E|H_i) for i≤k else 0 (hypotheses disjoint); conditional-independence formulas checked against PN §1.4.4; P(B|A)=Σ P(B|C_i)P(C_i|A) holds since P(B|A∩C_i)=P(B|C_i); example recomputed (0.65, 0.445, 0.445/0.65≈0.685); no item question's numbers on page (p-408 is fair/two-headed, example fair/0.8); prior content unchanged
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 Def. 4.1 (p.139, PDF p.147), Bayes formula and eqs. (4.2)-(4.3) (pp.145-146, PDF pp.153-154), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcome 1g (PDF p.2), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §1.4.3 Bayes' Rule, sha256:c352ede4dc334d99bc724927ca8b51853cf8561e407a34f59f165b22ae00042a — https://www.probabilitycourse.com/chapter1/1_4_3_bayes_rule.php; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §1.4.4 Conditional Independence (definition (1.8) P(A∩B|C)=P(A|C)P(B|C); two-coin example P(A∩B)=Σ P(A|C)P(B|C)P(C) by LTP = 5/8 ≠ P(A)P(B)=9/16; 'if we know A has occurred … more likely that we have chosen Coin 2 … increases the conditional probability that B occurs'; conditional independence neither implies nor is implied by independence), sha256:ad951e9a3bf2fbaacbf4d3da76be9e02ed2c33627bed79427c4584355903b027 — https://www.probabilitycourse.com/chapter1/1_4_4_conditional_independence.php
- note: Confidence lowered to medium: the two-class strict inequality P(B|A)>P(B) when A and B are both more likely in the same class is stated by PN §1.4.4 only for its two-coin example; the general two-class statement rests on recomputation (P(A∩B)-P(A)P(B)=p(1-p)(a1-a2)(b1-b2)>0), which can falsify but not confirm. The algebra checks out; a rank-1-3 source stating it generally would restore high.

## [C-004] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-11-04T01:05Z/e16c
- date: 2026-11-04
- status_set: verified
- confidence: high
- checks_run: diff only: the first formula moved under the definition and the 'denominator' bullet now introduces the expanded formula — both lines unchanged; figure moved after the new idea card. Idea: likelihoods given, posteriors asked, posterior = share of P(E), small prior needs strong evidence = G&S PDF pp.153-155 incl. Ex. 4.17. Tip: objective 7 = syllabus 1g; Exam P shapes consistency-checked (p-546 test, p-547 symbol, p-306 policy in force, p-314 Poisson, p-150 discrete uniform); MAS-I four questions (masi-an-157/158 naive Bayes, masi-an-159 QDA, masi-an-011 mixing) and MAS-II four past-paper questions (masii-2018f-028/031, masii-2019f-019, masii-2019s-030) consistency-checked by grep; 'naive Bayes and QDA assign the class with the largest posterior' = ISLR 2nd ed. §4.4 p.142 (Bayes classifier, approximated by LDA/QDA/naive Bayes). Traps: likelihood ≠ posterior (G&S Ex 4.17; p-546 recomputed 0.08/0.62 = 0.129); dropping priors (formula); survival likelihood P(T>t) = SOA Q306 official solution (recomputed 0.4612). moved lines compared line-for-line between HEAD~1 and HEAD (only reordering; no existing sentence reworded); tip objective numbers checked against the SOA syllabus and the Exam P page's numbering; new wiki-links and LaTeX resolve/balance
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 Def. 4.1 (p.139, PDF p.147), Bayes formula and eqs. (4.2)-(4.3) (pp.145-146, PDF pp.153-154), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcome 1g (PDF p.2), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §1.4.3 Bayes' Rule, sha256:c352ede4dc334d99bc724927ca8b51853cf8561e407a34f59f165b22ae00042a — https://www.probabilitycourse.com/chapter1/1_4_3_bayes_rule.php; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §1.4.4 Conditional Independence (definition (1.8) P(A∩B|C)=P(A|C)P(B|C); two-coin example P(A∩B)=Σ P(A|C)P(B|C)P(C) by LTP = 5/8 ≠ P(A)P(B)=9/16; 'if we know A has occurred … more likely that we have chosen Coin 2 … increases the conditional probability that B occurs'; conditional independence neither implies nor is implied by independence), sha256:ad951e9a3bf2fbaacbf4d3da76be9e02ed2c33627bed79427c4584355903b027 — https://www.probabilitycourse.com/chapter1/1_4_4_conditional_independence.php; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 Bayes' Formula (PDF pp.153-154: hypotheses, evidence, prior and posterior; P(E|H_i) known, P(H_i|E) wanted; formula), Example 4.17 (PDF p.155: prior .001, P(+|cancer)=.99 gives posterior .019 — 'one has to be careful when the prior probabilities are small'), read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA Exam P Sample Solutions (2026-05 file), Q306 solution, PDF p.84 (Bayes with likelihoods P(T>1|H)=e^{-1/4}, P(T>1|A)=e^{-1/2}; 0.4612), sha256:e10d2649bdf708541f87849c85ef6cde195019cfc8a46ee9647f6733d74d04b2 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning (2nd ed., corrected June 2023 PDF from statlearning.com), §4.4 p.142 (PDF p.153): Bayes' theorem (4.15), the Bayes classifier classifies x to the class for which p_k(x) is largest, and LDA, QDA and naive Bayes plug estimates of f_k(x) into (4.15) to approximate it; §4.4.3 QDA p.152 (PDF p.163), sha256:7ed447d1a513c5dd95240a829603310f1d319a14a8079ddfb180c6a3d9d9a6ff — https://drive.google.com/uc?export=download&id=1--811-yIIvjT3dvnyFJM20rj_-tbB3bg; SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability learning outcomes a-g (PDF p.2) and Topic 2 learning outcome b (PDF p.3), read 2026-11-04 for the objective numbers in the exam tip, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
- note: Diff-only re-pass after the concept-page-standard restructure (idea card, exam tip, exam traps; content moved). Earlier sources re-cited from the block; new passages checked against sources read this run. Checker is a different agent from the writer.

## [C-005] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-11-04T04:24Z/62e6
- date: 2026-11-04
- status_set: verified
- confidence: high
- checks_run: diff only (wording pass, ceffe077): new bullet 'H gains probability iff P(E|H) > P(E); loses when less likely' = G&S Ex. 56 (H attracts E iff E attracts H, i.e. P(E|H)>P(E) iff P(H|E)>P(H)) with Gudder's 'repels' for the < case; also follows from Bayes' formula P(H|E)/P(H)=P(E|H)/P(E) (recomputed); sharpened from the old card's 'hypotheses that made the evidence more likely gain weight', consistent with it; idea card: likelihoods given, posteriors asked, posterior = share of P(E), small prior needs strong evidence = G&S PDF pp.153-155 (unchanged claims); 'categories' -> 'hypotheses' in the restricted-subset bullet is the page's own term; trap 'not an 80% probability of coming from a defective item' = likelihood vs posterior, same meaning; MAS-I four / MAS-II four counts unchanged; terminology (hypothesis, evidence, prior, posterior) kept
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 Bayes' formula (pp.145-146, PDF pp.153-154); Exercises 56 and 61 (pp.160-161, PDF pp.168-169): Gudder's 'A attracts B if P(B|A) > P(B) and repels B if P(B|A) < P(B)'; 'A attracts B if and only if B attracts A'; over a partition, attracting some B_i forces repelling some B_j, read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf
- note: Diff-only re-pass after the sentence-level wording pass by a different agent (writer); checker did not write the change. Every changed sentence compared old vs new; quoted sentences intact (qc.sh OK); LaTeX and wiki-links unchanged.

## [C-006] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-11-04T04:27Z/5881
- date: 2026-11-04
- status_set: verified
- confidence: high
- checks_run: source list restored after a diff-only pass replaced it; content unchanged since pass 2026-11-04T04:24Z/62e6
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 Def. 4.1 (p.139, PDF p.147), Bayes formula and eqs. (4.2)-(4.3) (pp.145-146, PDF pp.153-154), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcome 1g (PDF p.2), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §1.4.3 Bayes' Rule, sha256:c352ede4dc334d99bc724927ca8b51853cf8561e407a34f59f165b22ae00042a — https://www.probabilitycourse.com/chapter1/1_4_3_bayes_rule.php; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §1.4.4 Conditional Independence (definition (1.8) P(A∩B|C)=P(A|C)P(B|C); two-coin example P(A∩B)=Σ P(A|C)P(B|C)P(C) by LTP = 5/8 ≠ P(A)P(B)=9/16; 'if we know A has occurred … more likely that we have chosen Coin 2 … increases the conditional probability that B occurs'; conditional independence neither implies nor is implied by independence), sha256:ad951e9a3bf2fbaacbf4d3da76be9e02ed2c33627bed79427c4584355903b027 — https://www.probabilitycourse.com/chapter1/1_4_4_conditional_independence.php; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 Bayes' Formula (PDF pp.153-154: hypotheses, evidence, prior and posterior; P(E|H_i) known, P(H_i|E) wanted; formula), Example 4.17 (PDF p.155: prior .001, P(+|cancer)=.99 gives posterior .019 — 'one has to be careful when the prior probabilities are small'), read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA Exam P Sample Solutions (2026-05 file), Q306 solution, PDF p.84 (Bayes with likelihoods P(T>1|H)=e^{-1/4}, P(T>1|A)=e^{-1/2}; 0.4612), sha256:e10d2649bdf708541f87849c85ef6cde195019cfc8a46ee9647f6733d74d04b2 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning (2nd ed., corrected June 2023 PDF from statlearning.com), §4.4 p.142 (PDF p.153): Bayes' theorem (4.15), the Bayes classifier classifies x to the class for which p_k(x) is largest, and LDA, QDA and naive Bayes plug estimates of f_k(x) into (4.15) to approximate it; §4.4.3 QDA p.152 (PDF p.163), sha256:7ed447d1a513c5dd95240a829603310f1d319a14a8079ddfb180c6a3d9d9a6ff — https://drive.google.com/uc?export=download&id=1--811-yIIvjT3dvnyFJM20rj_-tbB3bg; SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability learning outcomes a-g (PDF p.2) and Topic 2 learning outcome b (PDF p.3), read 2026-11-04 for the objective numbers in the exam tip, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 Bayes' formula (pp.145-146, PDF pp.153-154); Exercises 56 and 61 (pp.160-161, PDF pp.168-169): Gudder's 'A attracts B if P(B|A) > P(B) and repels B if P(B|A) < P(B)'; 'A attracts B if and only if B attracts A'; over a partition, attracting some B_i forces repelling some B_j, read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf
