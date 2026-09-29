---
target: Concepts/Loans.md
created: 2026-09-28
---

## [F-001] Prospective/retrospective called loan repayment methods
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: paragraph after the bullet list
- claim: 'Loan repayment methods on Exam FM are primarily the prospective method (PV of future payments) and retrospective method (accumulated value of past payments) for computing the Outstanding Balance.'
- evidence: FIN p.333 names the loan repayment methods as the amortization method and the sinking fund method; FIN §37 p.334 calls prospective and retrospective 'two approaches used in finding the amount of the outstanding balance'. The sentence conflates the two. (The descriptions of the two approaches are themselves right, and the 2026 syllabus lists no sinking-fund outcome, SYL p.3.)
- source_rank: 3
- proposed_action: Maintainer: call them the two methods of computing the outstanding balance, not repayment methods.
- applied: false
- fingerprint: fd62166b450d

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Loan definition vs FIN p.333; term list vs SYL p.3; principal vs FIN §1 p.10; OB 'remaining principal' vs FIN §37 p.334 ('outstanding loan balance or unpaid principal'); example recomputed: a_360@0.5% = 166.792, P = 1199.10. Notation: 'i/12' for the nominal rate is the vault's shorthand for i^(12)/12 (NOTE usage) — noted, not an error. Links, figure resolve.
- sources_checked: SOA Financial Mathematics Exam syllabus, December 2026, Topic 3 Loans (15-25%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §1 The Meaning of Interest, PDF p.10, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), Part 'Loan Repayment Methods' introduction, PDF p.333, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §37 Finding the Loan Balance Using Prospective and Retrospective Methods, PDF p.334-335, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf

## [F-002] Example has no question; nominal rate written i/12
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- severity: nit
- status: open
- locus: example 'Monthly Mortgage Payment'
- claim: Prompt ends without asking for anything; answer writes the monthly rate as 'i/12 = 0.5%'.
- evidence: SOA, Notation and terminology used for Exam FM, p.1: the nominal rate payable m times per period is i^(m); i denotes the effective rate. i/12 with i = 6% effective would be a different monthly rate (1.06^(1/12) - 1 = 0.4868%). The prompt describes the loan but asks for nothing.
- source_rank: 1
- proposed_action: Add 'Find the monthly payment.'; write i^(12)/12 = 0.06/12 = 0.5%.
- applied: true
- fingerprint: 299db63f91eb

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-001
- status: resolved
- note: Paragraph rewritten per Finan p.334: prospective and retrospective are now 'two equivalent methods' of computing the outstanding balance, not loan repayment methods; the retrospective description, which read only 'accumulated value of past payments', now states Finan's definition (the loan accumulated to that date less the accumulated value of the payments already made). The term list gained Final Payment (drop/balloon) so it matches the syllabus's Topic 3 terms (SYL p.3: principal, interest, term of loan, outstanding balance, final payment (drop payment, balloon payment), amortization).

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-002
- status: resolved
- note: Prompt now asks 'Find the monthly payment.'; the rate reads i^(12)/12 = 0.06/12 = 0.5% (NOTE p.1 notation). Payment recomputed in python: a_360@0.5% = 166.7916, 200000/166.7916 = 1,199.10.
