---
target: Concepts/Compensatory Damages.md
created: 2026-10-10
---

## [F-001] Links Canadian-framed punitive damages and collateral benefits pages
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- severity: minor
- status: open
- locus: Lead, Punitive damages bullet, collateral source rule '(see [[Collateral Benefits]])'
- claim: U.S. punitive-damage and collateral-source rules are linked to [[Punitive Damages]] and [[Collateral Benefits]].
- evidence: DISC-IA is a U.S. course. The linked page is written for Exam 6C: Concepts/Punitive Damages.md is built on Whiten v. Pilot, and Concepts/Collateral Benefits.md on Statutory Accident Benefits, Employment Insurance and provincial health care. The U.S. collateral source rule is LII Wex 'collateral source rule'.
- source_rank: 3
- proposed_action: Point both links at U.S. treatments; maintainer decision.
- applied: false
- fingerprint: 5d43ed1e9db4

## [F-002] Claim-valuation practices not found in a source
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- severity: minor
- status: open
- locus: General damages bullet and 'Factors affecting liability claim valuation' bullet
- claim: Adjusters often estimate general damages as a multiple of the medical specials; non-economic caps are most often in medical malpractice; the listed valuation factors (venue, claimant credibility, attorney experience, limits).
- evidence: No source read this run states these practices (LII 'compensatory damages', 'special damages', 'general damages', 'damages' are silent on them). They are plausible claims-practice statements, but unchecked.
- source_rank: 5
- proposed_action: Cite a claims-practice source (for example the Institutes' claim valuation text) or mark them as practice rather than rule.
- applied: false
- fingerprint: d5718e9e1c15

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: every definition, rule and list against the sources cited; worked examples recomputed; every [[link]] resolves; U.S. framing of links
- sources_checked: Cornell LII Wex, "compensatory damages", whole entry, sha256:92774229ad1d9384ec8fcb5661d421edc88df5736e2e901f042c3cf93c07a4d5 — https://www.law.cornell.edu/wex/compensatory_damages; Cornell LII Wex, "special damages", whole entry, sha256:50a0d567faf8e938120a8709acd04442ee0437f98dc5e175332ffb6f96c4f848 — https://www.law.cornell.edu/wex/special_damages; Cornell LII Wex, "general damages", whole entry, sha256:73b3dfcd9c5034fa1de640407d282759b73b3c8dd99c158ba6bee25aec98467d — https://www.law.cornell.edu/wex/general_damages; Cornell LII Wex, "damages", whole entry, sha256:e169e41ceee2e8068b1c0589dfe44e28f80a5083629db8514471dd451912586d — https://www.law.cornell.edu/wex/damages; Cornell LII Wex, "mitigation of damages", whole entry, sha256:bbeb6c3bbe7435cfc3bdde7b4b9c37374d4021ec944f3544c3213d37b070ce4e — https://www.law.cornell.edu/wex/mitigation_of_damages; Cornell LII Wex, "collateral source rule", whole entry, sha256:68039d6a72a6692b38df2497943d4749ae907b17351045a558d3eb2577fc71c6 — https://www.law.cornell.edu/wex/collateral_source_rule; Cornell LII Wex, "loss of consortium", whole entry, sha256:534bdcb801d6f77a49964d80edc3243aaf1ef9000140b8972bb1acb1da6c4a7f — https://www.law.cornell.edu/wex/loss_of_consortium; Cornell LII Wex, "punitive damages", whole entry, sha256:d7d3c177c6bb8aff7989985bdb69ed4452bf7457888735cde1ebf97b7586b7ec — https://www.law.cornell.edu/wex/punitive_damages; State Farm v. Campbell, 538 U.S. 408 (2003), syllabus via LII, syllabus point (2), sha256:1aa5960343fff7c168cb91204ea8295eab0b0edd9a87e3cc63b1eb3aad1853a8 — https://www.law.cornell.edu/supct/html/01-1289.ZS.html; PPG Industries v. Transamerica, 20 Cal. 4th 310 (1999) (Caselaw Access Project), public-policy discussion of insuring punitive damages, sha256:ef2c38bf2ecf125988034d0e1094372fb85140e3e5deb61d5912f8b7b556536d — https://static.case.law/cal-4th/20/cases/0310-01.json
- note: Special vs general damages, mitigation, collateral source rule, punitive damages and the single-digit ratio (Campbell syllabus point 2) agree. Example recomputed: 12,000/1.04^2=11,095; a20 at 4%=13.5903; 108,723; S=196,818; G=147,285; D=344,103; 0.75D=258,077; V=206,462; ratio 2,000,000/500,000=4. Open: two minor findings. The syllabus reading (The Institutes, Insurance Accounting, Coverage Analysis, Insurance Law, and Insurance Regulation, 2023) is sold, not published, and was not read; confidence is held at medium for that reason.
