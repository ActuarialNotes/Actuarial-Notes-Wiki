---
target: Concepts/Insurance Companies Act.md
created: 2026-09-27
---

## [F-001] Actuary provisions cited to the wrong sections of the Act
- entry_type: finding
- author: agent:resource-pages
- run_id: 2026-09-27T18:43Z/916d
- date: 2026-09-27
- severity: major
- status: open
- locus: bullets at lines 16 and 18; the example answer at line 45
- claim: The directors appoint the actuary under s. 357; the actuary's reporting duties are ss. 358–368.
- evidence: Insurance Companies Act (S.C. 1991, c. 47), Justice Laws full text (https://laws-lois.justice.gc.ca/eng/acts/I-11.8/FullText.html, sha256 641c5972f31d28a3458dfa45deda4260f3aeaa1fe91de33918f78ed68608f7dd): s. 357 is 'Notice of appointment' ('A company shall, forthwith after the appointment of the actuary of the company, notify the Superintendent'); ss. 358 and 359 are '[Repealed, 1997, c. 15, s. 236]'; revocation by the directors is s. 360(1); the report to the CEO and CFO is s. 369(1); the valuation duty is s. 365. Found while rewriting Resources/Books/ICA.md from the Act.
- source_rank: 1
- proposed_action: Re-cite each provision to the section that makes it (357 notice, 360 revocation, 365 valuation, 369 report to officers) and drop the repealed 358-359 range.
- applied: false
- fingerprint: 12560bd747de

## [F-002] Civil immunity cited to s. 361, which is 'ceasing to hold office'
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: major
- status: open
- locus: bullet 'Civil immunity (s. 361)' and Example 1 answer, item 3
- claim: The actuary is protected from civil liability under s. 361.
- evidence: ICA (2017 consolidation and current text): s. 361 is 'Ceasing to hold office' (resignation, ceasing to be an actuary, death, revocation by the directors). Qualified privilege is s. 370(1) and the civil-liability protection for a good-faith statement or report under s. 363 or s. 369 is s. 370(2); s. 366(2) protects persons who give the actuary information.
- source_rank: 1
- proposed_action: Re-cite to s. 370 and state it as the Act does.
- applied: true
- fingerprint: 2c45456d4bd7

## [F-003] s. 515 described as the statutory authority of the MCT guideline
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: bullet 'Adequacy of assets (s. 515)'
- claim: s. 515 ... this is the statutory authority under which the MCT guideline operates.
- evidence: OSFI MCT Guideline (2024), preamble: 'The Minimum Capital Test (MCT) Guideline is not made pursuant to subsections 515(2) and 608(3) of the Act. However, the minimum and supervisory target capital standards set out in this guideline provide the framework within which the Superintendent assesses whether a property and casualty company ... maintains adequate capital pursuant to subsection 515(1)'. ICA s. 515 is headed 'Adequacy of capital and liquidity', not adequacy of assets.
- source_rank: 1
- proposed_action: Restate per the MCT preamble and s. 515(1)-(3).
- applied: true
- fingerprint: b8851b1f3f05

## [F-004] Duty-to-report escalation order misstated
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: major
- status: open
- locus: bullet 'Reporting duties' and Example 1 answer, item 2
- claim: The actuary reports to the CEO and CFO and, if not adequately addressed, to the directors and then to OSFI.
- evidence: ICA s. 369(1)-(3): the actuary reports in writing to the CEO and CFO; s. 369(2) requires a copy to the directors 'forthwith' (not only if unaddressed); s. 369(3): if suitable action is not being taken, the actuary sends a copy to the Superintendent and advises the directors. OSFI E-15 restates the same order.
- source_rank: 1
- proposed_action: State the s. 369 sequence as the Act does.
- applied: true
- fingerprint: 1220735015bd

## [F-005] Departing actuary's statement and successor's duty misattributed
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: Example 1 last paragraph; Example 2 answer
- claim: On revocation 'the actuary may set out the reasons'; a successor 'is expected, under the Standards of Practice, to communicate with the predecessor'; quiet resignation leaves the deficiency undisclosed.
- evidence: ICA s. 363: an actuary who resigns or whose appointment is revoked 'shall submit to the directors ... and the Superintendent a written statement of the circumstances and reasons'; s. 364(1)-(3): no person shall accept the appointment before requesting and receiving that statement (or 15 days without reply), otherwise the appointment is void. The duty is the Act's, and resignation itself triggers disclosure to the Superintendent.
- source_rank: 1
- proposed_action: Cite ss. 363-364 and correct 'may' to the mandatory statement.
- applied: true
- fingerprint: 42a6f0940c68

## [F-006] Embedded figure labels the appointment s. 357 and immunity s. 361
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: major
- status: open
- locus: figure embed ![[Media/Figures/Insurance_Companies_Act.svg]]
- claim: The figure branches the Act into 'board s. 357', 'valuation s. 365', 'immunity s. 361', 'capital s. 515'.
- evidence: ICA: s. 357 is the company's notice of appointment to the Superintendent (the directors appoint under s. 49(1)); s. 361 is ceasing to hold office; immunity is s. 370. The SVG is generated by scripts/figures_exam_6c.py and cannot be hand-corrected.
- source_rank: 1
- proposed_action: Embed removed in this run; fix the figure's labels in scripts/figures_exam_6c.py (appointment s. 49 / notice s. 357, immunity s. 370) before re-embedding.
- applied: true
- fingerprint: b1127e5cada2

## [F-007] Two statements no source read supports
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: bullet 'Valuation (s. 365)' last sentence; last bullet on provincial insurers
- claim: s. 365 'is the hook that makes the CIA Standards of Practice effectively binding'; provincial Insurance Acts 'generally mirror these provisions'.
- evidence: Neither the ICA, OSFI E-15 nor the CIA educational note on the AA's role says either. The CIA note (Dec 2022, PDF p.6) says the AA 'will continue to be a reserved role as defined in the Insurance Companies Act (Canada) (ICA), the Québec Insurers Act (QIA) or other provincial Act', and footnote 1 that the AA's opinion in the financial statements is not required under the QIA - so the provincial statement can be made only in that narrower form.
- source_rank: 2
- proposed_action: Delete the 'effectively binding' sentence; restate the provincial bullet from the CIA note.
- applied: true
- fingerprint: 35f2d494ce92

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-001
- status: resolved
- note: Stands. Read the ICA (2017 consolidation, the Exam 6C version, and the current text): s. 357 is notice of appointment; ss. 358-359 are repealed; directors appoint at the first meeting (s. 49(1)), cannot delegate filling the office (s. 207(b)), fill a vacancy (s. 362) and revoke (s. 360(1)); s. 365 valuation in accordance with 'generally accepted actuarial practice'; s. 366 access; s. 367 report to shareholders/policyholders; s. 368 report to directors on financial position and, where directed, expected future financial condition; s. 369 report to CEO and CFO. Bullets re-cited section by section (ss. 49, 207, 357, 360-364; s. 365; ss. 366-369), the repealed 358-359 range dropped, 'accepted' corrected to the Act's 'generally accepted actuarial practice', and Example 1's escalation re-cited from s. 368 to s. 369.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-002
- status: resolved
- note: Bullet renamed 'Privilege and civil immunity (s. 370)' and stated per s. 370(1)-(2); Example 1 item 3 now cites s. 370.

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-003
- status: resolved
- note: Bullet renamed 'Adequacy of capital (s. 515)': s. 515(1) adequate capital and liquidity, s. 515(3) direction to increase capital, and the MCT preamble's own statement that the guideline is not made under s. 515(2) but is the framework for assessing s. 515(1).

## [F-004/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-004
- status: resolved
- note: Reporting bullet and Example 1 item 2 now give s. 369's order: written report to CEO and CFO, copy to the directors forthwith, and if suitable action is not being taken, a copy to the Superintendent with the directors advised.

## [F-005/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-005
- status: resolved
- note: Appointment bullet and both examples now cite s. 363 (mandatory written statement to directors and Superintendent) and s. 364 (successor must request and receive it; 15-day exception; appointment void otherwise). The 'resign quietly' paragraph replaced by the s. 363 consequence.

## [F-006/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-006
- status: resolved
- note: Embed line removed from the page. The SVG and its builder were not touched (outside this run's files); reported to the maintainer.

## [F-007/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-007
- status: resolved
- note: 'Effectively binding' sentence deleted; provincial bullet rewritten to the CIA note's words (reserved role under the Quebec Insurers Act or other provincial Act; the QIA does not require the AA's opinion in the financial statements).

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- status_set: verified
- confidence: medium
- checks_run: Every section number on the page read in the 2017 consolidation (phrase search for each provision) and in the current full text (Division XIV ss. 357-370, s. 49, s. 165(2), s. 207, s. 22, s. 440, s. 515 read in full); OSFI E-15 legal-requirements section read; MCT 2024 preamble read; CIA AA note p.6 read; wiki links resolve.
- sources_checked: Insurance Companies Act (S.C. 1991, c. 47), Justice Laws consolidation as of 12 December 2017 (the Exam 6C version), ss. 22, 49(1), 165(2), 207(b), 357, 358-359 (repealed), 359.1-359.2, 360-370, 440(1), 515(1)-(4), sha256:e3ff56e53382a462405acb34825e046a5c1c217efdfee98f175bd89c13b088ca — https://laws-lois.justice.gc.ca/eng/acts/I-11.8/20171212/P1TT3xt3.html; Insurance Companies Act (S.C. 1991, c. 47), Justice Laws full text current to 2026-09-21, ss. 49(1), 207(b), 357-370, 515 (same text as the 2017 consolidation for these sections), sha256:9c041a9b453cb6cd89fbe883b60546990c43aa794a458cf5fde014225b17b1a2 — https://laws-lois.justice.gc.ca/eng/acts/I-11.8/FullText.html; OSFI Guideline E-15, Appointed Actuary: Legal Requirements, Qualifications and Peer Review (2023), Legal requirements: appointment (49(1), 165(2)(i), 357), revocation (360), statements (363-364), valuation (365), report (367), financial position and FCT report (368), report to officers (369), sha256:013acdce02f8efaf144e9eb58a8d97518a58b67ded097261c9893338bcb39e50 — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/appointed-actuary-legal-requirements-qualifications-peer-review-guideline-2023; OSFI, Minimum Capital Test Guideline (2024), Guideline A, preamble (ICA ss. 515(1), 608(1)); §1.1.1, §1.1.2 (target-level requirements less diversification credit, divided by 1.5; MCT ratio = capital available / minimum capital required); §1.2.1 (100% minimum, 150% supervisory target, internal target); §4.2.1, §4.3.3.2, sha256:34c28477cae162661beec2d0b80b23314746df6b488fe6b959fe0606177fc60e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024; CIA, Educational Note: Role of the Appointed Actuary Under IFRS 17 (December 2022), PDF p.6, §1 What has not changed (reserved role under the ICA, the Quebec Insurers Act or other provincial Act; footnote 1), sha256:cef090fa90c49605ee6cc51e4bfb05243e192524bab1769762accf68d13f5e13 — https://www.casact.org/sites/default/files/2023-05/6C_CIA_Educational_Note_Role_of_the_Appointed_Actuary_Under_IFRS_17.pdf
- note: Medium: the two worked examples are vault-authored scenarios (their legal steps are each cited to a section). Section numbers are identical in the 2017 consolidation the syllabus cites and the 2026 text.
