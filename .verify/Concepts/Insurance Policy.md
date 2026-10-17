---
target: Concepts/Insurance Policy.md
created: 2026-10-17
---

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-17T23:22Z/5d3a
- date: 2026-10-17
- status_set: in_review
- checks_run: Exam 8 bullet and retro example checked against Fisher Ch.2; other bullets searched for in the Exam 8 and cached 6C readings; examples recomputed
- sources_checked: Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.2 §1-3, §7, PDF pp.21-26, 30, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf
- note: Left in_review. Checked: the after-expiration bullet against Fisher Ch.2 §1-3 (guaranteed cost fixed up front; incurred retro first evaluated about 6 months after expiration then annually; credit risk on additional premium; premium audit of exposures) and the retro example (111,280; return 13,720; 202,800 capped at 200,000; charge 88,720). Not checked this run: the policy-anatomy list, the Exam 6C Canadian-law bullet (utmost good faith, contra proferentem, deemed statutory conditions - not found in CAS Financial Reporting or Dutil) and the Exam 9 risk-adjusted pricing bullet; these need those exams' readings. Second example recomputed (1,020 and 1,090).

## [F-001] Retro evaluation timing attributed to the NCCI plan
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-17T23:22Z/5d3a
- date: 2026-10-17
- severity: minor
- status: open
- locus: After expiration (Exam 8) bullet, last sentence
- claim: Under the NCCI plan the first computation comes six months after expiration, with further ones annually.
- evidence: Fisher Ch.2 §3 (PDF p.26) says that for incurred loss retrospective rating plans losses are "typically" first evaluated 6 months after policy expiration (18 months of development) and then annually, and its footnote 5 says the chapter is not specific to NCCI's or ISO's plans. The NCCI attribution is not in the reading.
- source_rank: 2
- proposed_action: Attribute the timing to Fisher et al. ("typically") or cite NCCI's Retrospective Rating Plan Manual.
- applied: false
- fingerprint: 0e569f8ec847

## [F-002] Other-exam bullets not checked against their readings
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-17T23:22Z/5d3a
- date: 2026-10-17
- severity: minor
- status: open
- locus: Anatomy, Canadian law (Exam 6C) and Pricing (Exam 9) bullets
- claim: Policy anatomy (declarations, insuring agreement, definitions, exclusions, conditions, endorsements); Canadian courts read coverage broadly, exclusions narrowly and ambiguity against the drafter; statutory conditions deemed into policies; risk load set by capital consumed in the portfolio.
- evidence: None of these appears in the Exam 8 readings (Fisher, Bahnemann, Goldburd). Searches of the cached 6C readings (CAS Financial Reporting, Dutil) for "good faith", "contra proferentem", "ambiguity" and "statutory conditions" returned nothing. The Exam 6C, DISC-IA and Exam 9 readings that might support them were not read this run.
- source_rank: 2
- proposed_action: Verify each bullet in that exam's pass and cite the reading, or remove what no reading supports.
- applied: false
- fingerprint: eb544bc4e276

## [F-001/R] Retro timing attributed to Fisher
- entry_type: resolution
- author: agent:claude-code
- run_id: 2026-10-17T23:41Z/5923
- date: 2026-10-17
- resolves: F-001
- status: resolved
- note: Removed the NCCI attribution. The sentence now follows Fisher et al., Individual Risk Rating, Ch.2 §3 (PDF p.26, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81): for incurred loss retrospective plans losses are 'typically' first evaluated 6 months after expiration (18 months of development) and annually thereafter, with a typical partial return of premium at the first evaluation and additional premium later (footnote 5, PDF p.22: the chapter is not specific to NCCI's or ISO's plans).

## [F-002/R] Other-exam bullets sourced or removed
- entry_type: resolution
- author: agent:claude-code
- run_id: 2026-10-17T23:41Z/5923
- date: 2026-10-17
- resolves: F-002
- status: resolved
- note: Anatomy: the unsourced list of policy parts was replaced by pointers to the verified pages Insurance Policy Structure and Policy Provisions; the payment-function sentence now rests on the SOA Exam P syllabus (Nov 2026) objective e, PDF p.3 (sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf). Exam 6C: removed 'utmost good faith', the broad/narrow/contra proferentem reading rules and the deemed-statutory-conditions claim (no 6C reading found that states them). Replaced with (a) Whiten v. Pilot Insurance Co., 2002 SCC 18, [2002] 1 S.C.R. 595 at 639-640 (one of the Landmark Legal cases; https://decisions.scc-csc.ca/scc-csc/scc-csc/en/1956/1/document.do, sha256:fa9bdddc4551ad4445af241523212e6199d687659c382a4ec0b337d7f283300a): the insurer's duty of good faith and fair dealing is independent of and in addition to the duty to pay, and 'the mutual "good faith" obligation in insurance contracts'; (b) Ontario Insurance Act s.233 and s.233(2) as quoted in Marshall, Fair Benefits Fairly Delivered (2017), PDF p.70, and SABS as O. Reg. 34/10, PDF pp.23, 90 (https://www.casact.org/sites/default/files/2021-03/6C_Marshall.pdf, sha256:326913d5117f8dc2cc937a10f31f2d6fa712b509e040cd63220c2a8843b9d8fc). Exam 9: no free copy of the C3 readings (Mildenhall & Major; Cummins 2000) could be read, so the capital-consumption pricing bullet and its example 'Same Expected Loss, Different Price' were removed. The risk-load term is now sourced to the CAS Statement of Principles Regarding P&C Insurance Ratemaking, PDF p.4 (sha256:f240ea62dd033aac827c2073e56c0a4061d5c84531e5cf6be02d333a8f9f2140), with only a pointer to Risk-Adjusted Pricing for Exam 9 objective C3. Needs re-verification.
