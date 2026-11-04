---
target: Concepts/Probability.md
created: 2026-09-27
---

## [F-001] Equally-likely formula names event A on the left, E on the right
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- severity: nit
- status: open
- locus: formula box, line 17
- claim: P(A) = |E|/|S|
- evidence: The lead sentence (line 14), the text row below the box (number of outcomes in E) and the worked example (line 34, P(E) = |E|/|S|) all name the event E; the left side alone says A. G&S Def. 1.3 (uniform distribution, p.25, PDF p.33) and the historical remark on p.30 (PDF p.38: probability of an event = favourable outcomes / total outcomes) put the same event on both sides. Relabelled P(A) to P(E); no mathematics changed.
- source_rank: 3
- proposed_action: Change P(A) to P(E) on the left side.
- applied: true
- fingerprint: aa99b8ae4620

## [F-002] Typo in example prompt: a rolling
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- severity: nit
- status: open
- locus: example prompt, line 25
- claim: What is the probability of a rolling an even number on a fair 6-sided die?
- evidence: Stray article: "a rolling" should read "rolling". Cosmetic.
- source_rank: 4
- proposed_action: Delete the stray a.
- applied: true
- fingerprint: 299ebf9fccdf

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- resolves: F-001
- status: resolved
- note: Left side relabelled P(E); now matches line 19 and the worked example.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- resolves: F-002
- status: resolved
- note: Stray article removed.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- status_set: verified
- confidence: high
- checks_run: Definition as a set function on events valued in [0,1] satisfying the axioms: syllabus General Probability LO a (define probability as a set function, state the axioms) and G&S Thm 1.1. Equally-likely ratio |E|/|S|: G&S Def. 1.3 + p.30 (favourable/total). Example recomputed before reading: even on a fair die = 3/6 = 1/2, agrees. Common Trap (given result > 2, |S| becomes 4): reduced sample space as in G&S conditional die example (E = X > 4, P(F|E) computed on E), consistent. Links Set Function / Axioms of Probability resolve; Media/Figures/Probability.svg exists. Two nits fixed (F-001, F-002).
- sources_checked: SOA Probability Exam syllabus, November 2026, General Probability learning outcomes a, c-g, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Thm 1.1 pp.22-23 (PDF pp.30-31), Def. 1.3 p.25 (PDF p.33), historical remark p.30 (PDF p.38), §4.1 Examples 4.1/4.4 pp.133-135 (PDF pp.141-143), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-30T18:35Z/6484
- date: 2026-10-30
- status_set: verified
- confidence: high
- checks_run: diff vs 0287511f is additions only (new section above first example); each added claim read in G&S Ex 1.10/1.11/3.14 and §3.1 and Siegrist §2.3; example recomputed (sum 4 = 3/36 = 1/12); no exam-question numbers on page; prior content and sources unchanged
- sources_checked: SOA Probability Exam syllabus, November 2026, General Probability learning outcomes a, c-g, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Thm 1.1 pp.22-23 (PDF pp.30-31), Def. 1.3 p.25 (PDF p.33), historical remark p.30 (PDF p.38), §4.1 Examples 4.1/4.4 pp.133-135 (PDF pp.141-143), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Example 1.10 (p.24, PDF p.32: three coin tosses, eight equally likely paths), Example 1.11 (p.26, PDF p.34: ordered pairs, 36 equally likely outcomes, unordered pairs declined), §3.1 A Counting Technique (p.76, PDF p.84), Example 3.14 (p.107, PDF p.115), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, §2.3 Probability Measures, coin-tossing example (2^n bit strings, equally likely), sha256:381bc53d4a8e0bf0259a5ce1093eb2d759a56e205c38c362ddb3b1a03879c7e6 — https://www.randomservices.org/random/prob/Probability.html
- note: Re-pass after the G8 writer added passages (w0); checker is a different agent from the writer.

## [F-003] Out-of-range diagnosis names only one cause
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-11-04T01:05Z/b47c
- date: 2026-11-04
- severity: minor
- status: open
- locus: Exam traps, third bullet
- claim: A count of favourable outcomes larger than |S|, or a negative complement, means the numerator and denominator were counted in different sample spaces (for example ordered in one and unordered in the other).
- evidence: Counter-example in one sample space (rank-5 recomputation, falsifying): at least one 6 in eight rolls counted the page's own trap-2 way gives 8 x 6^7 favourable ordered outcomes against |S| = 6^8, a ratio of 8/6 = 1.333 > 1, with numerator and denominator both in the space of ordered 8-tuples. The excess is double counting of outcomes in more than one event, which G&S Thm 1.4 proof (p.24, PDF p.32) describes: an outcome in both A and B 'is added twice'. So a count above |S| does not by itself mean two sample spaces were mixed; 'means' overstates the diagnosis.
- source_rank: 3
- proposed_action: Qualify the bullet so double counting of overlapping outcomes (the trap just above it) is named as a cause alongside mixing sample spaces; writer to reword.
- applied: false
- fingerprint: 7501d1e45525

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-11-04T01:05Z/b47c
- date: 2026-11-04
- status_set: verified
- confidence: medium
- checks_run: diff only (b7493155 vs verified 2026-10-30 text): bullet→paragraph move of the equally-likely lead-in, wording identical. New bullets: |E|,|S| as counts = G&S Def 1.3 / Siegrist #(A)/#(S); non-equally-likely P(E)=sum of outcome probabilities = G&S Def 1.2, Siegrist general discrete case. Idea card: each outcome 1/|S| (Def 1.3), ordered outcomes for dice (Ex 1.11, p.30 Cardano 36 vs 21). Tip: objectives 1-2 = syllabus a-b (Exam P-1 page numbering); bank tag counts consistency-checked (rank 4, not sourced) with an exact-line grep for the wiki_link entry over questions/ on 2026-11-04: 74 exam-p, FAM 2, ALTAM 3, ASTAM 2, MAS-I 1, Exam 5 2 - all match; shapes spot-read in p-332, p-303, p-134, p-196 (tagged); hats/letters shapes exist on Exam P (p-389, p-193, SOA sample questions) though tagged Set Theory / Addition Rule, not this page. Traps recomputed in code: sum 4 = 3/36 vs 1/11; 4x(1/6)=2/3; 1-(5/6)^4 = 0.5177 -> .518 matches G&S Ex 1.3. Third trap overstates its diagnosis: F-003 (minor). Links Sample Space, Combinatorics resolve.
- sources_checked: SOA Probability Exam syllabus, November 2026, General Probability learning outcomes a, c-g, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Thm 1.1 pp.22-23 (PDF pp.30-31), Def. 1.3 p.25 (PDF p.33), historical remark p.30 (PDF p.38), §4.1 Examples 4.1/4.4 pp.133-135 (PDF pp.141-143), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Example 1.10 (p.24, PDF p.32: three coin tosses, eight equally likely paths), Example 1.11 (p.26, PDF p.34: ordered pairs, 36 equally likely outcomes, unordered pairs declined), §3.1 A Counting Technique (p.76, PDF p.84), Example 3.14 (p.107, PDF p.115), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, §2.3 Probability Measures, coin-tossing example (2^n bit strings, equally likely), sha256:381bc53d4a8e0bf0259a5ce1093eb2d759a56e205c38c362ddb3b1a03879c7e6 — https://www.randomservices.org/random/prob/Probability.html; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Def. 1.2 distribution function P(E)=Σm(ω) (p.19, PDF p.27), Def. 1.3 uniform m(ω)=1/n (p.25, PDF p.33), Example 1.11 36 ordered pairs (p.26, PDF p.34), Historical Remarks: 36 ordered vs 21 unordered pairs (p.30, PDF p.38); §1.1 Example 1.3 de Méré, at least one six in four rolls 1−(5/6)^4 = .518 (pp.4-5, PDF pp.12-13); Thm 1.1 (p.22, PDF p.30), Thm 1.4 proof (p.24, PDF p.32), read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, §2.3 Probability Measures (discrete case: P(A)=#(A)/#(S) for counting measure; general discrete P(A)=Σ_{x∈A} f(x)), fetched 2026-11-04, sha256:381bc53d4a8e0bf0259a5ce1093eb2d759a56e205c38c362ddb3b1a03879c7e6 — https://www.randomservices.org/random/prob/Probability.html; SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcomes a-g (PDF p.2; vault Exam P-1 page numbers them 1-7), re-read 2026-11-04, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-11-04T01:10Z/f2fe
- date: 2026-11-04
- resolves: F-003
- status: resolved
- note: Reworded in 5d72fdac: the bullet now names double counting (an outcome counted more than once) as a cause alongside mixing ordered and unordered sample spaces, with the example 8·6^7 favourable outcomes for at least one 6 in eight rolls. Recomputed in code: 8·6^7/6^8 = 4/3 = 8/6, as the page says (correct value 1−(5/6)^8 = 0.7674). G&S Thm 1.4 proof (p.24, PDF p.32): an outcome in both A and B 'is added twice'; G&S Historical Remarks (p.30, PDF p.38): ordered vs unordered pairs. Both causes now sourced.

## [C-004] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-11-04T01:10Z/f2fe
- date: 2026-11-04
- status_set: verified
- confidence: medium
- checks_run: diff only (HEAD~1..HEAD, 5d72fdac): Exam traps bullet 3 reworded; 8·6^7/6^8 recomputed = 4/3 (matches 8/6); double counting checked against G&S Thm 1.4 proof, mixed sample spaces against G&S p.30; rest of page and prior sources unchanged
- sources_checked: SOA Probability Exam syllabus, November 2026, General Probability learning outcomes a, c-g, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Thm 1.1 pp.22-23 (PDF pp.30-31), Def. 1.3 p.25 (PDF p.33), historical remark p.30 (PDF p.38), §4.1 Examples 4.1/4.4 pp.133-135 (PDF pp.141-143), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Example 1.10 (p.24, PDF p.32: three coin tosses, eight equally likely paths), Example 1.11 (p.26, PDF p.34: ordered pairs, 36 equally likely outcomes, unordered pairs declined), §3.1 A Counting Technique (p.76, PDF p.84), Example 3.14 (p.107, PDF p.115), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, §2.3 Probability Measures, coin-tossing example (2^n bit strings, equally likely), sha256:381bc53d4a8e0bf0259a5ce1093eb2d759a56e205c38c362ddb3b1a03879c7e6 — https://www.randomservices.org/random/prob/Probability.html; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Def. 1.2 distribution function P(E)=Σm(ω) (p.19, PDF p.27), Def. 1.3 uniform m(ω)=1/n (p.25, PDF p.33), Example 1.11 36 ordered pairs (p.26, PDF p.34), Historical Remarks: 36 ordered vs 21 unordered pairs (p.30, PDF p.38); §1.1 Example 1.3 de Méré, at least one six in four rolls 1−(5/6)^4 = .518 (pp.4-5, PDF pp.12-13); Thm 1.1 (p.22, PDF p.30), Thm 1.4 proof (p.24, PDF p.32), read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, §2.3 Probability Measures (discrete case: P(A)=#(A)/#(S) for counting measure; general discrete P(A)=Σ_{x∈A} f(x)), fetched 2026-11-04, sha256:381bc53d4a8e0bf0259a5ce1093eb2d759a56e205c38c362ddb3b1a03879c7e6 — https://www.randomservices.org/random/prob/Probability.html; SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcomes a-g (PDF p.2; vault Exam P-1 page numbers them 1-7), re-read 2026-11-04, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 difference A−B (p.21, PDF p.29), Thm 1.4 proof ('added twice') and Cor. 1.1 P(A)=P(A∩B)+P(A∩~B) (p.24, PDF p.32), Historical Remarks: 36 ordered vs 21 unordered pairs (p.30, PDF p.38), read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf

## [F-004] Tip splits the one three-coin question into two shapes
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-11-04T04:24Z/d5ff
- date: 2026-11-04
- severity: minor
- status: open
- locus: How it appears on the exam, second bullet
- claim: Equally likely outcomes are counted directly with dice and coins, such as three fair dice, three fair coins or a toss repeated until a success.
- evidence: Consistency (rank 4), checked by grep 2026-11-04: of the questions tagged Concepts/Probability in questions/exam-p, the only one mentioning coins is p-303, and it is a single shape: 'An experiment consists of tossing three fair coins and is deemed a success if the result is three heads or three tails. The experiment is repeated until a success occurs.' No tagged question has a single toss repeated until a success (the other tagged 'until' questions, p-197/p-201/p-214/p-926, are socks, patients, tornadoes and Poisson claims). The pre-7cfd9bb8 text 'three fair coins, the toss repeated until a success' described p-303 as one shape; the reworded list reads it as two, one of which ('a toss repeated until a success') is not in the bank.
- source_rank: 4
- proposed_action: Writer to restore p-303 as one item in the list (three fair coins tossed repeatedly until a success).
- applied: false
- fingerprint: 025bbcf22d8d

## [F-005] Idea card asserts counting is easy, unsourced and against the page's own traps
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-11-04T04:24Z/d5ff
- date: 2026-11-04
- severity: minor
- status: open
- locus: The idea card, first sentence
- claim: Counting the outcomes in an event is easy, but a count gives a probability only when every outcome is equally likely.
- evidence: Added in 7cfd9bb8 (not in the verified text). The second half is supported: G&S Def. 1.3/Thm 1.1 context (uniform m(ω)=1/n gives P(E)=|E|/n). The first half ('Counting ... is easy') appears in no source checked, and the same page's Exam traps list three counting errors (unequal sums, 'at least one' overcounted, out-of-range counts) and the card itself ends 'then in counting carefully'. An unsourced claim stated as fact that the page contradicts.
- source_rank: 3
- proposed_action: Drop the clause 'Counting the outcomes in an event is easy, but' (writer to recase the remaining sentence).
- applied: false
- fingerprint: 242c7dfe148d

## [C-005] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-11-04T04:24Z/d5ff
- date: 2026-11-04
- status_set: verified
- confidence: medium
- checks_run: diff only (wording pass, 7cfd9bb8): lead split into two sentences, unchanged; idea card |E|/|S| with each outcome 1/|S| = G&S Def 1.3/Thm 1.1, new first sentence → finding (minor); dice/coins and fair-die example reworded, numbers unchanged (3/36, 3/6); tip: bank count 74 unchanged, coin shape grep-checked → finding (minor, p-303 is one shape); traps: 1/11 vs 3/36, 1-(5/6)^4=0.518, 8·6^7/6^8=8/6 recomputed, overcount attribution now explicit (consistent with F-003/R, G&S Thm 1.4 proof); terminology 'probability' kept, no chance/odds
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 set operations and Venn Fig. 1.7, Thm 1.1-1.4 incl. Thm 1.4 proof 'added twice' (pp.21-24, PDF pp.29-32); Infinite Sample Spaces (pp.28-29, PDF pp.36-37), read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf

## [F-004/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-11-04T04:27Z/5881
- date: 2026-11-04
- resolves: F-004
- status: resolved
- note: Fixed in 6914f817: the tip now reads 'such as three fair dice, or three fair coins tossed repeatedly until a success' — one coin shape. Re-checked 2026-11-04 (rank 4, consistency): of the 74 questions/exam-p files tagging Concepts/Probability, the only coin question is p-303 ('tossing three fair coins ... The experiment is repeated until a success occurs'), now described as one item; 'three fair dice' matches p-317 ('Three fair dice are thrown').

## [F-005/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-11-04T04:27Z/5881
- date: 2026-11-04
- resolves: F-005
- status: resolved
- note: Fixed in 6914f817: the unsourced clause 'Counting the outcomes in an event is easy, but' was dropped; the card opens 'A count of outcomes gives a probability only when every outcome is equally likely.' Re-read 2026-11-04: G&S Def. 1.3 (p.25, PDF p.33) uniform m(ω)=1/n on an n-element Ω, giving P(E)=|E|/n; with unequal masses P(E)=Σ_{ω∈E} m(ω) (Def. 1.2, p.19), so the count ratio holds in the uniform case. The remaining sentence states nothing beyond that.

## [C-006] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-11-04T04:27Z/5881
- date: 2026-11-04
- status_set: verified
- confidence: medium
- checks_run: Job 1 re-check of F-004/F-005 rewording (6914f817): tip coin shape vs questions/exam-p p-303/p-317 grep; idea-card opening vs G&S Def. 1.2/1.3 (pp.19, 25); rest of page unchanged since pass 2026-11-04T04:24Z/d5ff; source list restored after a diff-only pass replaced it
- sources_checked: SOA Probability Exam syllabus, November 2026, General Probability learning outcomes a, c-g, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Thm 1.1 pp.22-23 (PDF pp.30-31), Def. 1.3 p.25 (PDF p.33), historical remark p.30 (PDF p.38), §4.1 Examples 4.1/4.4 pp.133-135 (PDF pp.141-143), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Example 1.10 (p.24, PDF p.32: three coin tosses, eight equally likely paths), Example 1.11 (p.26, PDF p.34: ordered pairs, 36 equally likely outcomes, unordered pairs declined), §3.1 A Counting Technique (p.76, PDF p.84), Example 3.14 (p.107, PDF p.115), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, §2.3 Probability Measures, coin-tossing example (2^n bit strings, equally likely), sha256:381bc53d4a8e0bf0259a5ce1093eb2d759a56e205c38c362ddb3b1a03879c7e6 — https://www.randomservices.org/random/prob/Probability.html; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Def. 1.2 distribution function P(E)=Σm(ω) (p.19, PDF p.27), Def. 1.3 uniform m(ω)=1/n (p.25, PDF p.33), Example 1.11 36 ordered pairs (p.26, PDF p.34), Historical Remarks: 36 ordered vs 21 unordered pairs (p.30, PDF p.38); §1.1 Example 1.3 de Méré, at least one six in four rolls 1−(5/6)^4 = .518 (pp.4-5, PDF pp.12-13); Thm 1.1 (p.22, PDF p.30), Thm 1.4 proof (p.24, PDF p.32), read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, §2.3 Probability Measures (discrete case: P(A)=#(A)/#(S) for counting measure; general discrete P(A)=Σ_{x∈A} f(x)), fetched 2026-11-04, sha256:381bc53d4a8e0bf0259a5ce1093eb2d759a56e205c38c362ddb3b1a03879c7e6 — https://www.randomservices.org/random/prob/Probability.html; SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcomes a-g (PDF p.2; vault Exam P-1 page numbers them 1-7), re-read 2026-11-04, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 difference A−B (p.21, PDF p.29), Thm 1.4 proof ('added twice') and Cor. 1.1 P(A)=P(A∩B)+P(A∩~B) (p.24, PDF p.32), Historical Remarks: 36 ordered vs 21 unordered pairs (p.30, PDF p.38), read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 set operations and Venn Fig. 1.7, Thm 1.1-1.4 incl. Thm 1.4 proof 'added twice' (pp.21-24, PDF pp.29-32); Infinite Sample Spaces (pp.28-29, PDF pp.36-37), read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf

## [C-007] Comment
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-11-04T04:27Z/5881
- date: 2026-11-04
- note: Correction to the F-004 resolution and pass of this run: the tagged question reading 'Three fair dice are thrown' is p-332, not p-317 (grep of the 74 questions/exam-p files tagging Concepts/Probability, 2026-11-04). The conclusion is unchanged.
