---
target: Exam FM-2 (SOA).md
created: 2026-09-28
---

## [F-001] Brown & Kopp reading line claims all of Chapters 5 and 6
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: major
- status: open
- locus: ## Source Material, Brown & Kopp reading line
- claim: Chapters 1–9, Ch. 2: sections 1–3 only; Ch. 4: sections 1, 3–5 only; Ch. 7: sections 1–2 only
- evidence: SOA FM syllabus, December 2026, Text References, PDF p.6 lists Brown & Kopp (2nd ed., 2024) as: Chapter 1, all sections; Chapter 2, sections 1, 2, 3; Chapter 3, all sections; Chapter 4, sections 1, 3, 4, 5; Chapter 5, sections 1, 2, 3; Chapter 6, sections 1, 2, 3, 4, 5, 6; Chapter 7, sections 1, 2; Chapter 8, all sections; Chapter 9, all sections. The vault line omits the Chapter 5 (sections 1-3 only) and Chapter 6 (sections 1-6 only) restrictions, so it tells a candidate the rest of Chapters 5 and 6 is examinable. The August and October 2026 syllabi are identical apart from the month.
- source_rank: 1
- proposed_action: Replace the line with the syllabus's own chapter/section list, word for word.
- applied: true
- fingerprint: fa01cab3c181

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- resolves: F-001
- status: resolved
- note: Reading line replaced with the December 2026 syllabus's list word for word: Chapter 1, all sections; Chapter 2, sections 1, 2, 3; Chapter 3, all sections; Chapter 4, sections 1, 3, 4, 5; Chapter 5, sections 1, 2, 3; Chapter 6, sections 1, 2, 3, 4, 5, 6; Chapter 7, sections 1, 2; Chapter 8, all sections; Chapter 9, all sections. Matches the Brown & Kopp resource page's own On-the-syllabus callout.

## [F-002] Required study note FM-24-17 missing from Source Material
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: major
- status: open
- locus: ## Source Material
- claim: Source Material lists the five suggested textbooks and nothing else.
- evidence: SOA FM syllabus, December 2026, Additional References, PDF p.7: 'There is one study note that is required reading for this examination ... FM-24-17 Using Duration and Convexity to Approximate Change in Present Value. Sections 1-4 are required reading for this examination.' (https://www.soa.org/globalassets/assets/Files/Edu/2017/fm-duration-convexity-present-value.pdf, Alps 2017, 19 pp., sha256:530436d4707ecadba3a7bef6e1a9661b8d9e9bb173486edfb6924bc4a4992040). It is the only reading the syllabus calls required — the five textbooks are 'representative' (PDF p.5) — and the vault has no resource page for it, so the page omits the one mandatory reading.
- source_rank: 1
- proposed_action: Write a Resources/Books page for FM-24-17 to docs/resource-pages.md (sections 1-4 on the syllabus) and add it to the Source Material callout with 'Sections 1–4 (required reading)'. Not auto-fixed: the reading line needs a page to link, which is authoring.
- applied: false
- fingerprint: 7dc4e437e322

## [F-003] Topic 2 learning objective missing
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: Annuities/Cash Flows callout, preamble
- claim: The Annuities/Cash Flows callout opens directly with outcome 1; the other four callouts open with their learning objective.
- evidence: SOA FM syllabus, December 2026, Topic 2, PDF p.3: 'Learning Objectives: The Candidate will be able to calculate present value, current value, and accumulated value for sequences of non-contingent payments.'
- source_rank: 1
- proposed_action: Add SOA's objective sentence to the callout preamble.
- applied: true
- fingerprint: 12189b6fe02c

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- resolves: F-003
- status: resolved
- note: Added the preamble 'Be able to calculate present value, current value, and accumulated value for sequences of non-contingent payments.' — SOA's sentence with 'The Candidate will' dropped, as the page does for the other four topics; present value, current value and accumulated value link their existing pages.

## [F-004] 'Cash flow and duration matching' linked as the Cash Flow page
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: General Cash Flows callout, outcome 1
- claim: [[Cash Flow]] and [[Duration Matching]]
- evidence: SOA FM syllabus, December 2026, Topic 5 outcome a, PDF p.5 lists the term 'cash flow and duration matching' — i.e. cash flow matching and duration matching (the topic's objective names 'cash flow matching and immunization'). The vault links the first half to Concepts/Cash Flow (a cash flow), not Concepts/Cash Flow Matching, which exists.
- source_rank: 1
- proposed_action: Link the term to Cash Flow Matching.
- applied: true
- fingerprint: 189cd3bd8d25

## [F-004/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- resolves: F-004
- status: resolved
- note: Now [[Cash Flow Matching|Cash Flow]] and [[Duration Matching]]; the text reads as before. Cash Flow stays a syllabus concept through outcome 2 and Topic 1 outcome 4, so the exam's concept set is unchanged.

## [F-005] Terms added to SOA's definition lists
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: Time Value of Money outcome 1; Annuities outcome 1; Loans outcome 1
- claim: Outcome lists include [[Fund Accumulation]] (Topic 1), [[Decreasing Annuity]] and [[Continuous Annuity]] (Topic 2) and [[Loan Repayment Comparison]] (Topic 3).
- evidence: SOA FM syllabus, December 2026: Topic 1 outcome a (PDF p.2) lists interest rate, simple interest, compound interest, accumulation function, future value, current value, present value, net present value, discount factor, discount rate, convertible m-thly, nominal rate, effective rate, inflation and real rate of interest, force of interest, equation of value — no 'fund accumulation'. Topic 2 outcome a (PDF p.3) ends '... geometric increasing/decreasing annuity, term of annuity' — decreasing annuities are already inside 'arithmetic/geometric increasing/decreasing', and 'continuous annuity' is not a listed term (it is covered by 'payable continuously'). Topic 3 outcome a (PDF p.3) is 'principal, interest, term of loan, outstanding balance, final payment (drop payment, balloon payment), amortization' — no 'loan repayment comparison'. The page presents these as SOA's words. Removing a link removes that concept from the app's Exam FM concept set (mastery, study plan, readiness), which is a maintainer's call.
- source_rank: 1
- proposed_action: Either delete the four added links, or move them to a marked editorial '*Key concepts:*' line under the outcome (as the Exam P page does), so SOA's list reads word for word.
- applied: false
- fingerprint: d99618dd15ac

## [F-006] Permitted earlier editions and Other Resources not stated
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: ## Source Material
- claim: The Broverman and Brown & Kopp lines name only the 2024 editions; SOA's Other Resources are not listed.
- evidence: SOA FM syllabus, December 2026, PDF p.6: 'Candidates may also use: Broverman ... (Seventh Edition), 2017 ... with the same sections' and 'Candidates may also use: Brown, R and Kopp, S ... First Edition, 2012 ... with the same chapters and sections'. PDF p.7 Other Resources: Notation and terminology used for Exam FM; released exam papers; Sample Questions and Solutions; calculator reviews for the BA-35 (FM-22-05) and BA II Plus (FM-23-05), with the BA II Plus strongly recommended; the online sample exam. None appears on the page; the Brown & Kopp resource page does state its First Edition allowance.
- source_rank: 1
- proposed_action: Add the edition allowances to the two reading lines and an 'Other resources' list after Source Material.
- applied: false
- fingerprint: 33aafcf1840e

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Exam format (2.5 hours, 30 multiple-choice, PDF p.1) matches. Five topic names and weights (5-15, 20-30, 15-25, 15-25, 20-30%) match PDF pp.2-5. Every learning objective and every outcome diffed phrase by phrase against PDF pp.2-5: all SOA terms present; additions filed (F-005); Topic 2 objective added (F-003); cash-flow-matching link fixed (F-004); bond-valuation-between-coupons exclusion and the callable-bond outcome match. Reading lines diffed against PDF pp.6-7: Broverman 8th ed. chapters 1-7 and every exclusion match; Vaaler-Harper-Daniel 3rd ed. chapters 1-6, 8 (8.3 only), 9 and every exclusion match; Francis & Ruckman 3rd ed. chapters 1-16 excluding 14.04-14.05 match; Chan & Tse 3rd ed. chapters 1-8 and every exclusion match; Brown & Kopp corrected (F-001). FM-24-17 missing (F-002). The August, October and December 2026 syllabi are identical apart from the month; the SOA study page lists no 2027 syllabus yet. syllabus_lint: 0 errors.
- sources_checked: SOA Financial Mathematics Exam syllabus, December 2026 (all pages), sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; SOA Financial Mathematics Exam syllabus, October 2026, sha256:949a2e9008bd5f8791b8852599e09f28aa30a9f53a5af05b2499907de1397b26 — https://www.soa.org/globalassets/assets/files/edu/2026/syllabi/2026-10-exam-fm-syllabus.pdf; SOA Financial Mathematics Exam syllabus, August 2026, sha256:a3af6f54e132f4439988cccc1d20ea3cb269c175c253d9b2b27c6f8d23bbbc5b — https://www.soa.org/globalassets/assets/files/edu/2026/spring/syllabi/2026-08-exam-fm-syllabus.pdf
- note: Medium: one open major (the required study note has no page) and two open minors; everything the page states is now what the syllabus states.

## [C-002] Topic 2 objective phrase linked
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- locus: Annuities/Cash Flows callout, preamble
- note: The objective added under F-003 left 'sequences of non-contingent payments' unlinked, which scripts/test_syllabus_lib.py (every noun phrase links a note) fails. It now reads [[Annuities|sequences of non-contingent payments]]; Annuities is already linked in outcome 2, so the exam's concept set is unchanged and the visible text is SOA's.

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Re-pass after linking the Topic 2 objective phrase (comment above); the visible text is unchanged, so every check in C-001 stands: format, weights, all objectives and outcomes and every reading line diffed against the December 2026 syllabus PDF pp.1-7. syllabus_lint 0 errors 0 warnings; test_syllabus_lib passes.
- sources_checked: SOA Financial Mathematics Exam syllabus, December 2026 (all pages), sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; SOA Financial Mathematics Exam syllabus, October 2026, sha256:949a2e9008bd5f8791b8852599e09f28aa30a9f53a5af05b2499907de1397b26 — https://www.soa.org/globalassets/assets/files/edu/2026/syllabi/2026-10-exam-fm-syllabus.pdf; SOA Financial Mathematics Exam syllabus, August 2026, sha256:a3af6f54e132f4439988cccc1d20ea3cb269c175c253d9b2b27c6f8d23bbbc5b — https://www.soa.org/globalassets/assets/files/edu/2026/spring/syllabi/2026-08-exam-fm-syllabus.pdf
- note: Medium: F-002 (required study note FM-24-17 has no page, major), F-005 and F-006 (minor) remain open.

## [F-007] Outcome text departs from SOA's punctuation in five places
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- severity: nit
- status: open
- locus: Loans outcome 1; Annuities outcome 1; Time Value of Money outcome 4; Annuities outcome 2 (level perpetuity); Bonds outcome 2 (yield rate; coupon; term of bond); General Cash Flows outcome 3 (second bullet)
- claim: Loans outcome 1 lists 'Final Payment, Drop Payment, Balloon Payment' as three peers; Annuities outcome 1 reads 'Annuity Immediate'; seven outcome lines end without SOA's closing period.
- evidence: SOA FM syllabus, December 2026: Topic 3 outcome a (PDF p.3) reads 'final payment (drop payment, balloon payment), amortization' — drop and balloon payments are the kinds of final payment, not further terms; Topic 2 outcome a (p.3) reads 'annuity-immediate'; Topic 1 d (p.2), Topic 2 b 'Level perpetuity.' (p.3), Topic 4 b 'Yield rate.', 'Coupon, coupon rate.', 'Term of bond, … accumulation of discount.' (p.4) and Topic 5 c 'Exactly match a set of liability cash flows.' (p.5) each end with a period. Found re-reading every outcome against pp.2-5 while resolving F-005.
- source_rank: 1
- proposed_action: Restore SOA's parenthetical and hyphen and the closing periods; the links (and so the exam's concept set) are unchanged.
- applied: true
- fingerprint: 0534c66cd491
