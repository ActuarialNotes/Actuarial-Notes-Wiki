---
target: Concepts/Sample Space.md
created: 2026-09-27
---

## [F-001] Enumerated form presented as general though the page allows an uncountable sample space
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- severity: minor
- status: open
- locus: formula block, line 19
- claim: $$S = \{\omega_1, \omega_2, \ldots\}$$ given as the form of a sample space, directly after "The sample space can be finite, countably infinite, or uncountably infinite".
- evidence: Grinstead & Snell pp.28-29 (PDF pp.36-37), Infinite Sample Spaces: a sample space is countably infinite if its elements can be put in one-to-one correspondence with the positive integers, and uncountably infinite otherwise; the listing Omega = {omega_1, omega_2, omega_3, ...} is given for the countably infinite case, and uncountable spaces "require new concepts (see Chapter 2)". An uncountable S (e.g. a continuous claim amount) has no such list.
- source_rank: 3
- proposed_action: Label the enumerated form as the finite / countably infinite case.
- applied: false
- fingerprint: 2b68911c4a15

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- status_set: verified
- confidence: medium
- checks_run: Definition (set of all possible outcomes) = G&S Def 1.1 and Pishro-Nik §1.3.1; notation S (Pishro-Nik) / Omega (G&S) both given; one outcome per trial and exhaustiveness follow from G&S Def 1.1-1.2 (the outcome X takes exactly one value in the set of all possible values; Example 1.9 one and only one wins); finite / countably / uncountably infinite = G&S pp.28-29; enumerated form valid only for countable S (F-001). Example recomputed before reading answer: no claim, claim <=1000, claim >1000 gives 3 outcomes - agrees. Currency shape: escaped dollar sits outside inline math, fine per vaultMath.ts header. Figure exists.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Definitions 1.1-1.2 and Example 1.9 (pp.18-20, PDF pp.26-28), Infinite Sample Spaces (pp.28-29, PDF pp.36-37), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.3.1 Random Experiments (sample space, outcome, event), fetched 2026-09-27, sha256:d93c82800caad31da983d799d5444d8627a5423b3338900bf22405af912bc7f4 — https://www.probabilitycourse.com/chapter1/1_3_1_random_experiments.php; SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcome 1a (PDF p.2), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
- note: Open minor F-001.

## [F-001/R] Enumerated form labelled as the finite or countable case
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-001
- status: resolved
- note: Added the bullet "When S is finite or countably infinite, its outcomes can be listed in sequence:" before the S = {ω1, ω2, ...} block. G&S Infinite Sample Spaces (p.28, PDF p.36): countably infinite means the elements can be put in one-to-one correspondence with the positive integers, uncountably infinite otherwise.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- status_set: verified
- confidence: high
- checks_run: Re-verified after resolving F-001: sample space = set of all possible outcomes (G&S p.18; Pishro-Nik §1.3.1); finite / countably infinite / uncountably infinite and the listing for the countable case = G&S p.28; one outcome per performance of the experiment (outcomes mutually exclusive and exhaustive) agrees with G&S p.18 (a random variable represents the outcome of the experiment) and Example 1.9 (one and only one candidate wins); claim example S = {No Claim, Small Claim, Large Claim} checked as a partition of the stated classification (no claim, claim ≤ 1,000, claim > 1,000).
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 sample space (p.18, PDF p.26), Example 1.9 (p.20, PDF p.28), Infinite Sample Spaces (p.28, PDF p.36), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.3.1 Random Experiments (outcome, sample space, event), fetched 2026-09-28, sha256:5ab5af0abfbf56905a0a023eb3242ae9749a17af50a5ff8581a6c69030ce29ad — https://www.probabilitycourse.com/chapter1/1_3_1_random_experiments.php; SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcome 1a (PDF p.2), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-30T18:35Z/6484
- date: 2026-10-30
- status_set: verified
- confidence: high
- checks_run: diff additions only; multiplication principle and 1/36 per ordered pair read in G&S §3.1 and Ex 1.11; example recomputed (10/100); no question numbers on page; prior content and sources unchanged
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 sample space (p.18, PDF p.26), Example 1.9 (p.20, PDF p.28), Infinite Sample Spaces (p.28, PDF p.36), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.3.1 Random Experiments (outcome, sample space, event), fetched 2026-09-28, sha256:5ab5af0abfbf56905a0a023eb3242ae9749a17af50a5ff8581a6c69030ce29ad — https://www.probabilitycourse.com/chapter1/1_3_1_random_experiments.php; SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcome 1a (PDF p.2), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Example 1.11 (p.26, PDF p.34: m((i,j)) = 1/36), §3.1 A Counting Technique and tree diagrams (p.76, PDF p.84: N = n1·n2·…·nr), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf
- note: Re-pass after the G8 writer added passages (w0); checker is a different agent from the writer.

## [F-002] Unsourced claim about what most counting errors trace back to
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-11-04T01:05Z/b47c
- date: 2026-11-04
- severity: minor
- status: open
- locus: idea card, second sentence clause after the semicolon
- claim: most counting errors trace back to a sample space whose outcomes overlap, leave a case out, or aren't equally likely.
- evidence: No source read says anything about the share of counting errors. G&S Historical Remarks (p.30, PDF p.38) say only that ordered vs unordered dice outcomes was 'a subtle point that was still causing problems much later' (one of the three error types, as history); G&S §1.2 (pp.18-27), §3.1 (p.76), Pishro-Nik §1.3.1 and the Exam P syllabus outcome a make no claim of frequency. 'Most' is a quantitative assertion with no source.
- source_rank: 3
- proposed_action: Delete the clause after the semicolon, or reword without the frequency claim ('a sample space whose outcomes overlap, leave a case out, or aren't equally likely is a common source of counting errors' would need a source too); writer's call.
- applied: false
- fingerprint: fc7c4b676b6d

## [C-004] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-11-04T01:05Z/b47c
- date: 2026-11-04
- status_set: verified
- confidence: medium
- checks_run: diff only (b7493155 vs verified 2026-10-30 text): lead-in 'When S is finite or countably infinite…' moved from a bullet into the definition paragraph, still directly qualifying the enumerated form (F-001/R intent kept); \text{where each ω_i = an elementary outcome} → bullet 'where each ω_i is an elementary outcome of the experiment' — '=' to 'is', meaning unchanged. Idea card: outcomes sum to 1 and P(event) = sum over its outcomes = G&S Def 1.2; 'most counting errors' unsourced → F-002 (minor). Tip: objective 1 = syllabus a; bank tag counts consistency-checked (rank 4, not sourced) with an exact-line grep for the wiki_link entry over questions/ on 2026-11-04: exactly 1 (p-153), and p-153's stem read: five worded events vs F∩G over a two-year auto policy — matches. Traps: 21 unordered vs 36 ordered = G&S p.30 and Ex 1.11 (21 = C(6,2)+6 recomputed); overlapping {Claim, Large Claim, No Claim} sums to 1 + P(Large) > 1 by Thm 1.1(4),(5); 10x9 = 90 per G&S §3.1 counting technique. Links Event resolves.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 sample space (p.18, PDF p.26), Example 1.9 (p.20, PDF p.28), Infinite Sample Spaces (p.28, PDF p.36), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.3.1 Random Experiments (outcome, sample space, event), fetched 2026-09-28, sha256:5ab5af0abfbf56905a0a023eb3242ae9749a17af50a5ff8581a6c69030ce29ad — https://www.probabilitycourse.com/chapter1/1_3_1_random_experiments.php; SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcome 1a (PDF p.2), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Example 1.11 (p.26, PDF p.34: m((i,j)) = 1/36), §3.1 A Counting Technique and tree diagrams (p.76, PDF p.84: N = n1·n2·…·nr), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Def. 1.1 sample space (p.18, PDF p.26), Def. 1.2 distribution function m(ω)≥0, Σm(ω)=1, P(E)=Σ_{ω∈E}m(ω) (p.19, PDF p.27), Thm 1.1 (p.22, PDF p.30), Historical Remarks: 36 ordered vs 21 unordered pairs (p.30, PDF p.38); §3.1 A Counting Technique (p.76, PDF p.84), read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcomes a-g (PDF p.2; vault Exam P-1 page numbers them 1-7), re-read 2026-11-04, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-11-04T01:10Z/f2fe
- date: 2026-11-04
- resolves: F-002
- status: resolved
- note: Reworded in 5d72fdac: the unsourced frequency clause ('most counting errors trace back to…') is gone, replaced by 'A mistake in the sample space carries into every probability computed from it: treat the 21 unordered results of two dice as equally likely and every answer is off.' G&S Historical Remarks (p.30, PDF p.38): the outcomes for two rolls 'should be taken to be the 36 ordered pairs (i, j) rather than the 21 unordered pairs', 'a subtle point that was still causing problems much later'. Recomputed in code over 47 standard two-dice events (sum = k, sum ≤ k, max/min = k, max ≤ k, at least one k, |i−j| = k or ≤ k, sum even): the 21-uniform model differs from the 36-ordered model on every one except the sure event. Literal exceptions exist only for contrived events (2 doubles + 5 non-doubles gives 7/21 = 12/36 = 1/3); 'every answer' is read as rhetorical, not filed.

## [C-005] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-11-04T01:10Z/f2fe
- date: 2026-11-04
- status_set: verified
- confidence: medium
- checks_run: diff only (HEAD~1..HEAD, 5d72fdac): idea card's last sentence replaced; 21 unordered vs 36 ordered pairs checked against G&S p.30; 21-uniform vs 36-uniform probabilities compared in code over 47 standard events (differ on all but the sure event); rest of page and prior sources unchanged
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 sample space (p.18, PDF p.26), Example 1.9 (p.20, PDF p.28), Infinite Sample Spaces (p.28, PDF p.36), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.3.1 Random Experiments (outcome, sample space, event), fetched 2026-09-28, sha256:5ab5af0abfbf56905a0a023eb3242ae9749a17af50a5ff8581a6c69030ce29ad — https://www.probabilitycourse.com/chapter1/1_3_1_random_experiments.php; SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcome 1a (PDF p.2), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Example 1.11 (p.26, PDF p.34: m((i,j)) = 1/36), §3.1 A Counting Technique and tree diagrams (p.76, PDF p.84: N = n1·n2·…·nr), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Def. 1.1 sample space (p.18, PDF p.26), Def. 1.2 distribution function m(ω)≥0, Σm(ω)=1, P(E)=Σ_{ω∈E}m(ω) (p.19, PDF p.27), Thm 1.1 (p.22, PDF p.30), Historical Remarks: 36 ordered vs 21 unordered pairs (p.30, PDF p.38); §3.1 A Counting Technique (p.76, PDF p.84), read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcomes a-g (PDF p.2; vault Exam P-1 page numbers them 1-7), re-read 2026-11-04, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 difference A−B (p.21, PDF p.29), Thm 1.4 proof ('added twice') and Cor. 1.1 P(A)=P(A∩B)+P(A∩~B) (p.24, PDF p.32), Historical Remarks: 36 ordered vs 21 unordered pairs (p.30, PDF p.38), read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf
