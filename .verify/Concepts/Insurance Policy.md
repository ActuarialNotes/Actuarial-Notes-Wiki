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

## [F-003] s.233 summary dropped 'knowingly'
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-17T23:49Z/b2b8
- date: 2026-10-17
- severity: minor
- status: open
- locus: Canadian law (Exam 6C) bullet, s.233 sentence
- claim: Ontario's Insurance Act s.233 makes an auto claim invalid and forfeits indemnity where the applicant misrepresents or fails to disclose a fact the application requires.
- evidence: Marshall, Fair Benefits Fairly Delivered (2017), PDF p.70, quoting Insurance Act s.233(1)(a)(ii): an applicant who 'knowingly misrepresents or fails to disclose in the application any fact required to be stated therein'. Without 'knowingly' the page turns a knowing-misrepresentation rule into one that voids a claim for any misstatement. Corrected in this run by inserting 'knowingly' (one word, transcribed from the source).
- source_rank: 2
- proposed_action: Insert 'knowingly' before 'misrepresents or fails to disclose'.
- applied: true
- fingerprint: 122149159096

## [F-004] s.233 summary omits the false-particulars ground
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-17T23:49Z/b2b8
- date: 2026-10-17
- severity: nit
- status: open
- locus: Canadian law (Exam 6C) bullet, s.233 sentence
- claim: s.233 invalidates a claim where the applicant knowingly misrepresents or fails to disclose, the insured breaks a term or commits fraud, or the insured wilfully makes a false statement in a claim.
- evidence: s.233(1)(a)(i) as quoted in Marshall PDF p.70 also covers an applicant who 'gives false particulars of the described automobile to be insured to the prejudice of the insurer'. The page lists the other grounds correctly; the omission makes the list incomplete, not wrong. Marshall's assigned pages for Exam 6C are pp.8-12 (Exam 6C outline PDF p.11), so p.70 is not examinable text.
- source_rank: 2
- proposed_action: Add the false-particulars ground, or say the list is not exhaustive (author's call).
- applied: false
- fingerprint: 2787f29fff9e

## [F-003/R] 'knowingly' restored
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-17T23:49Z/b2b8
- date: 2026-10-17
- resolves: F-003
- status: resolved
- note: Inserted 'knowingly' before 'misrepresents or fails to disclose' in the s.233 sentence, transcribed from s.233(1)(a)(ii) as quoted in Marshall PDF p.70 (sha256:326913d5117f8dc2cc937a10f31f2d6fa712b509e040cd63220c2a8843b9d8fc). One-word edit, no other content changed.

## [C-002] Re-verification after F-001/F-002 fixes
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-17T23:49Z/b2b8
- date: 2026-10-17
- status_set: verified
- confidence: high
- checks_run: all cached sources re-hashed against their sha256; every quote diffed against its source; retro example recomputed independently before reading the page's figures; Exam 8, 6C and 9 objective statements against the Fall 2026 outlines; wiki-links resolved
- sources_checked: Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.2 §1-3, PDF pp.21-26 (incl. footnote 5, p.22), sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.1 PDF pp.13-14, 17 (insurance as a promise over a specified period; fundamental insurance equation); Ch.2 PDF p.38 (claims-made vs occurrence trigger); Ch.3 PDF p.55 (policy year aggregation), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; SOA Exam P syllabus (November 2026), learning objective 2(e)-(f), PDF p.3, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf; Whiten v. Pilot Insurance Co., 2002 SCC 18, [2002] 1 S.C.R. 595, at 639-640, sha256:fa9bdddc4551ad4445af241523212e6199d687659c382a4ec0b337d7f283300a — https://decisions.scc-csc.ca/scc-csc/scc-csc/en/1956/1/document.do; Marshall, Fair Benefits Fairly Delivered (Ontario, Apr 2017), Insurance Act s.233 as quoted at PDF p.70; SABS as O. Reg. 34/10, PDF pp.3, 23, 90, sha256:326913d5117f8dc2cc937a10f31f2d6fa712b509e040cd63220c2a8843b9d8fc — https://www.casact.org/sites/default/files/2021-03/6C_Marshall.pdf; CAS, Statement of Principles Regarding Property and Casualty Insurance Ratemaking (May 1988; reinstated May 2021), Definitions PDF pp.1-2, Consideration 'Risk' PDF p.4, sha256:f240ea62dd033aac827c2073e56c0a4061d5c84531e5cf6be02d333a8f9f2140 — https://www.casact.org/sites/default/files/2021-05/Statement-Of-Principles-Ratemaking.pdf; CAS Exam 8 Content Outline, Fall 2026 (October 2026 administration), Domain A task 7 (PDF p.3), Experience Rating and Retrospective and Loss Sensitive Rating statements (PDF p.4), sha256:306e7a7b6351597e46fd82fd74c294fce3afc8b1f9227ea8c001f3b081964521 — https://www.casact.org/sites/default/files/2026-03/Exam_8_CO_2026_Fall.pdf; CAS Exam 6C Content Outline, Fall 2026, Domain A tasks and readings (PDF p.3), reading table: CIA Territories, FSCO Tech Notes, Marshall, Landmark Legal (PDF pp.9-11), sha256:1bd4b2b802cf0976c797bc068c2903fa8deaf43d9366a85aadf5b34a568275c1 — https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf; CAS Exam 9 Content Outline, Fall 2026, Domain C task 3 (PDF p.5), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf
- note: Recomputed: R1 = (30,000 + 1.10 x 70,000) x 1.04 = 107,000 x 1.04 = 111,280 (within 80,000-200,000), return 125,000 - 111,280 = 13,720; R2 = (30,000 + 1.10 x 150,000) x 1.04 = 195,000 x 1.04 = 202,800, capped at 200,000, charge 200,000 - 111,280 = 88,720, 2,800 absorbed by the maximum. Matches the page. Fisher Ch.2: guaranteed-cost premium 'fixed up front' (p.21), formula (B + cL) x T and min/max (pp.22, 25), 'typically first evaluated as of 6 months after the policy expiration (i.e. 18 months of development)', partial return then additional premium and credit risk (p.26), footnote 5 not NCCI/ISO-specific (p.22), exposure audit (p.25). Exam 8 outline 'adjust individual risk premium after policy expiration' (p.4). Exam P objective 2(e) deductibles, coinsurance, benefit limits (p.3). Whiten: breach of good faith 'independent of and in addition to the breach of contractual duty to pay the loss', an actionable wrong for punitive damages ([2002] 1 S.C.R. 639), 'mutual "good faith" obligation in insurance contracts' (640). Marshall s.233(1)-(2) and SABS = O. Reg. 34/10 (pp.70, 3, 23, 90); 'knowingly' restored (F-003, applied), one nit open (F-004). Statement of Principles quotes verbatim (p.4); Exam 9 C3 'Set prices for insurance policies on a risk-adjusted basis' (p.5). Lead definition, premium equation and policy-period bullet against Werner & Modlin Ch.1-3.
