---
target: Concepts/Stop-Loss Reinsurance.md
created: 2026-10-31
---

## [F-001] Interpolation identity for retentions between span points not found in any open source
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T18:57Z/3d3b
- date: 2026-10-31
- severity: minor
- status: open
- locus: fifth formula block; "Interpolation" bullet; example "A Retention Between Span Points"; tip "Retention between span points"; trap "Where interpolation fails"
- claim: E[(S-d)_+] = ((b-d)/(b-a)) E[(S-a)_+] + ((d-a)/(b-a)) E[(S-b)_+] for a <= d <= b with Pr(a<S<b)=0.
- evidence: LDA 5.3.2 gives E[(S-d)_+]=E(S)-E(S^d) and the span-h recursion E[(S-(j+1)h)_+]=E[(S-jh)_+]-h(1-F_S(jh)), but not the interpolation; the FAM-S sample questions/solutions (Q29) and the SOA tables do not state it either. The identity is correct by rank-5 reasoning (the derivative of E[(S-d)_+] in d is -(1-F_S(d)), constant where F_S is flat), and the second example recomputes to 0.60636, but rank 5 cannot confirm. It is Loss Models section 9.3.2 (Stop-Loss Insurance), on both the FAM and ASTAM reading lists, which could not be read free.
- source_rank: 3
- proposed_action: Check the identity against Loss Models 5th ed. section 9.3.2 (a reader with the book), or locate an open text that states it; if neither, decide whether to cut the block, bullet, example, tip and trap (a content decision, not made here).
- applied: false
- fingerprint: e2f7871cfff2

## [F-002] Two practice claims with no source
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T18:57Z/3d3b
- date: 2026-10-31
- severity: minor
- status: open
- locus: bullets "Why the whole distribution matters" and "Premium and protection"
- claim: "Retentions are usually set above E[S]" and "the reinsurer's charge adds expense and risk loadings to it".
- evidence: Neither LDA 5.3.2 / 3.4.4 nor any other source read this session says where retentions are usually set, or what a reinsurer loads onto the net stop-loss premium.
- source_rank: 3
- proposed_action: Source both from a reading (e.g. Brown & Lennox or LDA 3.4.4) or delete the clauses.
- applied: false
- fingerprint: 286ba318456e

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T18:57Z/3d3b
- date: 2026-10-31
- status_set: in_review
- checks_run: Blocks 1-4 against LDA 5.3.2 and FAM-S Q29; both examples recomputed independently (f_S 0.22313, 0.20082, 0.22425; E[(S-3)_+]=0.39527; 0.74708 and 0.60636); exam wording against FAM and ASTAM; wiki-links resolve.
- sources_checked: Frees et al., Loss Data Analytics (open text, openacttexts.github.io), ch.5, 5.3.2 Stop-loss Insurance: net stop-loss premium E[(S-d)_+]=E(S)-E(S^d), E(S^j)=sum_{x<j} x f(x)+j Pr(S>=j), recursion E[(S-(j+1)h)_+]=E[(S-jh)_+]-h(1-F_S(jh)), sha256:09489050a45e6eb2ee0d96804458eb22c936a61716227e08ad0398b9cba870d4 — https://openacttexts.github.io/Loss-Data-Analytics/ChapAggLossModels.html; SOA Exam FAM-S Sample Questions, Q29 stop-loss on a three-person group, p.24, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf; SOA Exam FAM-S Sample Solutions, Q29 solution, E(S)-E(S^1)=3-0.936=2.064, p.14, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf; SOA Exam ASTAM Syllabus, October 2026, Topic 3 outcome a (stop loss reinsurance among coverage modifications), p.3, sha256:6d462aea25c09b15cc457176ecf2d5d6143df8fb88df9f366557de17ec1ec9ba — https://www.soa.org/globalassets/assets/files/edu/2026/astam/2026-fall-exam-astam-syllabus.pdf; SOA Exam FAM Syllabus, February 2027, Topic 2 outcome l, p.3, sha256:da98474b74b0a9e9153b8ce198f30195dfbe394b3e300e785e58f12663b447e4 — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-2-fam-syllabus.pdf
- note: Left in_review: the interpolation identity (block 5 and everything built on it) is stated in no open source read this session -- it needs Loss Models 9.3.2 (F-001); two minor practice claims unsourced (F-002). Everything else checks.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T18:57Z/3d3b
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Searched for an open rank-1 statement of the interpolation: SOA Exam C sample questions (sha256 2e44cec5...) and solutions (de58b717...), SOA 2018 STAM sample solutions (1df8f66f...), the SOA ASTAM sample solutions Feb 2024 (c4206394...), and ASTAM written-answer solutions Spring 2023 (ac32f888...), Fall 2023, Spring 2024 (4f33d5c7...) and Fall 2024 -- full-text search for "interpolat" returns nothing in any of them, and every stop-loss solution in them (Exam C/STAM #107 = FAM-S Q29 d=1; Exam C #280 d=5; ASTAM sample Q d; ASTAM Spring 2024 (e) d=2) uses a retention at a support point via E[S]-E[S^d]. The FAM-S set and LDA 5.3.2 were already checked. No free source states the identity. Per D27 and the coordinator's instruction, cut formula block 5, the "Interpolation" bullet, the example "A Retention Between Span Points", the tip "Retention between span points" and the trap "Where interpolation fails". The page now carries only what LDA 5.3.2 and the SOA solutions state.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T18:57Z/3d3b
- date: 2026-10-31
- resolves: F-002
- status: resolved
- note: No source read states either claim (searched the same SOA solutions and LDA 3.4.4/5.3.2). Deleted "Retentions are usually set above E[S], where (E[S] - d)_+ is 0, but the reinsurer still pays in every year whose losses exceed d." and ", and the reinsurer's charge adds expense and risk loadings to it".

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T18:57Z/3d3b
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: After the F-001/F-002 cuts: remaining four formula blocks against LDA 5.3.2 and the SOA solutions (FAM-S Q29, Exam C #280, ASTAM Spring 2024 (e)); the remaining example recomputed independently (f_S 0.22313, 0.20082, 0.22425; E[S^3]=1.70473; E[(S-3)_+]=0.39527, page 0.39528 by rounding); exam wording against FAM and ASTAM; wiki-links resolve; re-read the whole page for references to the cut material (none left).
- sources_checked: Frees et al., Loss Data Analytics (open text, openacttexts.github.io), ch.5, 5.3.2 Stop-loss Insurance: net stop-loss premium E[(S-d)_+]=E(S)-E(S^d), E(S^j)=sum_{x<j} x f(x)+j Pr(S>=j), recursion E[(S-(j+1)h)_+]=E[(S-jh)_+]-h(1-F_S(jh)); 5.3 E(S)=E(N)E(X), sha256:09489050a45e6eb2ee0d96804458eb22c936a61716227e08ad0398b9cba870d4 — https://openacttexts.github.io/Loss-Data-Analytics/ChapAggLossModels.html; SOA Exam FAM-S Sample Questions, Q29 stop-loss on a three-person group, p.24, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf; SOA Exam FAM-S Sample Solutions, Q29 solution, E(S)-E(S^1)=3-0.936=2.064, p.14, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf; SOA Exam C Sample Solutions, Q280 aggregate stop-loss with deductible 5, p.97, sha256:de58b71716cce5fbbe82cd3b31d1533db67686a86cabe407844ae403534a9a4a — https://www.soa.org/globalassets/assets/files/edu/edu-exam-c-sample-sol.pdf; SOA ASTAM Spring 2024 Model Solutions, stop-loss part (e): E[(S-2)_+]=E[S]-E[S^2], E[S^2]=1f_S(1)+2Pr(S>1), p.7, sha256:4f33d5c7e1aa38fd23684a24eb5e1c6535973fa01492638db9ecc94b87ace259 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/solutions/spring-2024-astam-solutions.pdf; SOA Exam ASTAM Syllabus, October 2026, Topic 3 outcome a (stop loss reinsurance among coverage modifications), p.3, sha256:6d462aea25c09b15cc457176ecf2d5d6143df8fb88df9f366557de17ec1ec9ba — https://www.soa.org/globalassets/assets/files/edu/2026/astam/2026-fall-exam-astam-syllabus.pdf; SOA Exam FAM Syllabus, February 2027, Topic 2 outcome l, p.3, sha256:da98474b74b0a9e9153b8ce198f30195dfbe394b3e300e785e58f12663b447e4 — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-2-fam-syllabus.pdf
- note: F-001 and F-002 closed by deletion after a search of the SOA's published solutions found no statement of the interpolation.
